import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import * as yahooFinanceModule from 'yahoo-finance2';
import * as math from 'mathjs';
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";

const yahooFinanceCandidates = [
  yahooFinanceModule,
  (yahooFinanceModule as any).default,
  (yahooFinanceModule as any).default?.default,
];

const createYahooFinanceClient = () => {
  const options = {
    validation: {
      logErrors: false,
      logOptionsErrors: false,
      allowAdditionalProps: true,
    },
  };

  for (const candidate of yahooFinanceCandidates) {
    if (typeof candidate === 'function') {
      try {
        const instance = new candidate(options);
        if (typeof instance?.quote === 'function' && typeof instance?.chart === 'function') {
          return instance;
        }
      } catch (error) {
        console.log("Could not instantiate yahoo-finance2 candidate:", error);
      }
    }

    if (typeof candidate?.quote === 'function' && typeof candidate?.chart === 'function') {
      return candidate;
    }
  }

  return null;
};

const yahooFinance = createYahooFinanceClient();

if (!yahooFinance) {
  throw new Error("yahoo-finance2 did not expose the expected quote/chart API.");
}

const formatDateOnly = (d: any): string => {
  if (!d) return '';
  const dateObj = d instanceof Date ? d : new Date(d);
  if (isNaN(dateObj.getTime())) return '';
  // Shift by 12 hours to avoid timezone shifts near midnight boundaries (such as TCBS 17:00 vs Yahoo 00:00)
  const shifted = new Date(dateObj.getTime() + 12 * 60 * 60 * 1000);
  return shifted.toISOString().split('T')[0];
};

const normalizeTicker = (ticker: string): string => {
  if (!ticker) return '';
  const t = ticker.trim().toUpperCase();
  if (t === 'VNINDEX' || t === '^VNINDEX') {
    return '^VNINDEX';
  }
  
  // Popular benchmarks/known foreign assets
  const knownForeign = ['^GSPC', 'EEM', 'GC=F', 'GLD', '^NDX', 'BTC-USD', 'SPY', 'QQQ', 'DIA', 'IWM', 'VNM', '^VNINDEX'];
  if (knownForeign.includes(t)) {
    return t;
  }
  
  // If it's a standard 3-letter stock or common ETF and has no dot/character or other specials
  if (!t.includes('.') && !t.startsWith('^') && !t.includes('=') && !t.includes('-')) {
    if (t.length === 3 || t.startsWith('FUE') || t.startsWith('E1VF')) {
      return t + '.VN';
    }
  }
  return t;
};

const fetchHistoricalSafe = async (ticker: string, p1: string, p2: string) => {
  const tNorm = ticker.trim().toUpperCase();

  const tryFetch = async (t: string) => {
    // Using chart instead of historical as it is more robust and works for more symbols
    const result = await yahooFinance.chart(t, {
      period1: p1,
      period2: p2,
      interval: '1d'
    });
    
    if (!result || !result.quotes || result.quotes.length === 0) {
      throw new Error(`Không tìm thấy dữ liệu trên Yahoo Finance cho mã ${t}`);
    }

    return result.quotes.map((q: any) => ({
      date: q.date,
      adjClose: q.adjclose || q.close
    })).filter((q: any) => q.adjClose != null);
  };

  try {
    return await tryFetch(tNorm);
  } catch (err: any) {
    console.error(`Yahoo Finance primary fetch failed for ${tNorm}: ${err.message}`);
    
    // Fallback if some ticker fails: try suffix fallback if user didn't write it or typed it differently
    if (!tNorm.includes('.') && !tNorm.startsWith('^') && !tNorm.includes('=') && !tNorm.includes('-')) {
      const suffixes = ['.VN', '.HM', '.HS'];
      for (const suffix of suffixes) {
        try {
          console.log(`Trying fallback suffix ${suffix} for ${tNorm}...`);
          return await tryFetch(tNorm + suffix);
        } catch (e: any) {
          // continue
        }
      }
    }
    
    throw new Error(`Không thể tìm thấy dữ liệu cho mã ${ticker} trên Yahoo Finance. Vui lòng kiểm tra lại mã.`);
  }
};

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API routes
app.get("/api/price", async (req, res) => {
  try {
    const { ticker } = req.query;
    if (!ticker || typeof ticker !== 'string') {
      return res.status(400).json({ error: "Thiếu ticker" });
    }
    const norm = normalizeTicker(ticker);
    const q = await yahooFinance.quote(norm);
    if (q) {
      const price = q.regularMarketPrice ?? q.regularMarketPreviousClose ?? null;
      const currency = q.currency ?? (norm.endsWith('.VN') ? 'VND' : 'USD');
      return res.json({ price, currency, ticker: norm });
    } else {
      return res.status(404).json({ error: `Không tìm thấy thông tin cho mã ${norm}` });
    }
  } catch (error: any) {
    console.error(`Error in /api/price:`, error.message);
    return res.status(500).json({ error: `Lỗi tải giá cho mã: ${error.message}` });
  }
});

app.post("/api/analyze", async (req, res) => {
  try {
    let { tickers, weights, startDate, endDate, benchmark, riskFreeRate = 4 } = req.body as {
      tickers: string[];
      weights: number[];
      startDate: string;
      endDate: string;
      benchmark: string;
      riskFreeRate?: number;
    };

    tickers = tickers.map((t: string) => normalizeTicker(t));
    benchmark = normalizeTicker(benchmark);

    const allTickers = [...new Set([...tickers, benchmark])];
    
    const portfolioTickers = [...new Set(tickers)];
    const historicalData: Record<string, any[]> = {};

    // Fetch data for each portfolio ticker in parallel to optimize processing time significantly
    try {
      await Promise.all(
        portfolioTickers.map(async (ticker) => {
          try {
            historicalData[ticker] = await fetchHistoricalSafe(ticker, startDate, endDate);
          } catch (err: any) {
            console.error(`Error fetching portfolio stock ${ticker}:`, err);
            throw new Error(ticker);
          }
        })
      );
    } catch (err: any) {
      const failedTicker = err.message;
      return res.status(404).json({ 
        error: `Không tìm thấy dữ liệu cho mã ${failedTicker}. Vui lòng kiểm tra lại.` 
      });
    }

    // Now safely fetch the benchmark
    let fetchedBenchmark: any[] = [];
    try {
      console.log(`Fetching benchmark: ${benchmark}`);
      fetchedBenchmark = await fetchHistoricalSafe(benchmark, startDate, endDate);
    } catch (err: any) {
      return res.status(404).json({ 
        error: `Không tìm thấy dữ liệu cho mã ${benchmark}. Vui lòng kiểm tra lại.` 
      });
    }

    // Align dates of portfolio tickers only (which are all Vietnamese stocks trading on Ho Chi Minh exchange!)
    const commonDates = historicalData[portfolioTickers[0]]
      .map(d => formatDateOnly(d.date))
      .filter(date => {
        return date !== '' && portfolioTickers.every(t => historicalData[t] && historicalData[t].some(d => formatDateOnly(d.date) === date));
      });

    if (commonDates.length < 2) {
      return res.status(400).json({ error: "Không đủ dữ liệu lịch sử chung giữa các mã cổ phiếu." });
    }

    const priceMatrix: Record<string, number[]> = {};
    
    // Populate portfolio price matrix
    portfolioTickers.forEach(t => {
      priceMatrix[t] = commonDates.map(date => {
        const found = historicalData[t].find(d => formatDateOnly(d.date) === date);
        return found ? (found.adjClose || 1) : 1;
      });
    });

    if (!fetchedBenchmark || fetchedBenchmark.length < 2) {
      return res.status(400).json({ 
        error: `Không đủ dữ liệu cho chỉ số benchmark "${benchmark}" trên Yahoo Finance.` 
      });
    }

    // Map benchmark price using closest preceding or same-day date to solve timezone offset holiday discrepancies
    priceMatrix[benchmark] = commonDates.map(dateString => {
      const exactMatch = fetchedBenchmark.find(d => formatDateOnly(d.date) === dateString);
      if (exactMatch) {
        return exactMatch.adjClose;
      }

      const targetTime = new Date(dateString).getTime();
      let closestItem = null;
      let minDiff = Infinity;
      
      for (const item of fetchedBenchmark) {
        const diff = Math.abs(targetTime - item.date.getTime());
        if (diff < minDiff) {
          minDiff = diff;
          closestItem = item;
        }
      }
      
      return closestItem ? closestItem.adjClose : 100;
    });

    // Calculate daily returns
    const returnsMatrix: Record<string, number[]> = {};
    allTickers.forEach(t => {
      const prices = priceMatrix[t];
      const returns: number[] = [];
      for (let i = 1; i < prices.length; i++) {
        returns.push(prices[i] / prices[i - 1] - 1);
      }
      returnsMatrix[t] = returns;
    });

    // Portfolio Returns
    const portfolioReturns: number[] = [];
    const numDays = returnsMatrix[tickers[0]].length;
    for (let i = 0; i < numDays; i++) {
      let dailyRet = 0;
      tickers.forEach((t, idx) => {
        dailyRet += returnsMatrix[t][i] * (weights[idx] / 100);
      });
      portfolioReturns.push(dailyRet);
    }

    const benchmarkReturns = returnsMatrix[benchmark];

    // Helper functions
    const TRADING_DAYS = 252;
    
    const calculateCAGR = (returns: number[]) => {
      const cumulativeReturn = returns.reduce((acc, r) => acc * (1 + r), 1);
      const years = returns.length / TRADING_DAYS;
      return Math.pow(cumulativeReturn, 1 / years) - 1;
    };

    const calculateVolatility = (returns: number[]) => {
      return (math.std(returns) as unknown as number) * Math.sqrt(TRADING_DAYS);
    };

    const calculateMaxDrawdown = (returns: number[]) => {
      let peak = 1;
      let current = 1;
      let maxDD = 0;
      returns.forEach(r => {
        current *= (1 + r);
        if (current > peak) peak = current;
        const dd = (current / peak) - 1;
        if (dd < maxDD) maxDD = dd;
      });
      return maxDD;
    };

    const calculateSharpe = (cagr: number, vol: number) => {
      return vol === 0 ? 0 : (cagr - riskFreeRate / 100) / vol;
    };

    const calculateSortino = (returns: number[], cagr: number) => {
        const dailyRf = Math.pow(1 + riskFreeRate / 100, 1 / TRADING_DAYS) - 1;
        const downsideReturns = returns.filter(r => r < dailyRf);
        const downsideVol = (math.std(downsideReturns) as unknown as number) * Math.sqrt(TRADING_DAYS);
        return downsideVol === 0 ? 0 : (cagr - riskFreeRate / 100) / downsideVol;
    };

    const calculateVaR = (returns: number[]) => {
        const sorted = [...returns].sort((a, b) => a - b);
        const index = Math.floor(0.05 * sorted.length);
        return -sorted[index];
    };

    const calculateCVaR = (returns: number[]) => {
        const sorted = [...returns].sort((a, b) => a - b);
        const index = Math.floor(0.05 * sorted.length);
        const tail = sorted.slice(0, index + 1);
        return - (math.mean(tail) as unknown as number);
    };

    const calculateBetaAlpha = (pRet: number[], bRet: number[], pCagr: number, bCagr: number) => {
        const pMean = math.mean(pRet) as unknown as number;
        const bMean = math.mean(bRet) as unknown as number;
        const cov = math.mean(pRet.map((r, i) => (r - pMean) * (bRet[i] - bMean))) as unknown as number;
        const bVar = math.variance(bRet) as unknown as number;
        const beta = bVar === 0 ? 1 : cov / bVar;
        const alpha = pCagr - ((riskFreeRate / 100) + beta * (bCagr - (riskFreeRate / 100)));
        return { beta, alpha };
    };

    const pCagr = calculateCAGR(portfolioReturns);
    const pVol = calculateVolatility(portfolioReturns);
    const bCagr = calculateCAGR(benchmarkReturns);
    const bVol = calculateVolatility(benchmarkReturns);
    const pCum = portfolioReturns.reduce((acc, r) => acc * (1 + r), 1) - 1;
    const bCum = benchmarkReturns.reduce((acc, r) => acc * (1 + r), 1) - 1;
    const years = portfolioReturns.length / TRADING_DAYS;
    const trackingError = (math.std(portfolioReturns.map((r, i) => r - benchmarkReturns[i])) as unknown as number) * Math.sqrt(TRADING_DAYS);

    const { beta, alpha } = calculateBetaAlpha(portfolioReturns, benchmarkReturns, pCagr, bCagr);

    const metrics = {
      cumulativeReturn: pCum,
      cagr: pCagr,
      volatility: pVol,
      sharpe: calculateSharpe(pCagr, pVol),
      sortino: calculateSortino(portfolioReturns, pCagr),
      maxDrawdown: calculateMaxDrawdown(portfolioReturns),
      var95: calculateVaR(portfolioReturns),
      cvar95: calculateCVaR(portfolioReturns),
      beta,
      alpha,
      trackingError,
      informationRatio: trackingError === 0 ? 0 : (pCagr - bCagr) / trackingError,
      correlation: math.corr(portfolioReturns, benchmarkReturns) as unknown as number,
      years
    };

    const bMetrics = {
        cumulativeReturn: bCum,
        cagr: bCagr,
        volatility: bVol,
        sharpe: calculateSharpe(bCagr, bVol),
        sortino: calculateSortino(benchmarkReturns, bCagr),
        maxDrawdown: calculateMaxDrawdown(benchmarkReturns),
        var95: calculateVaR(benchmarkReturns),
        cvar95: calculateCVaR(benchmarkReturns),
        beta: 1.0,
        alpha: 0.0,
        trackingError: 0.0,
        informationRatio: 0.0,
        correlation: 1.0,
        years
    };

    // Subperiod partitioning: OOS is defined as the last 6 months counting back from end date
    const lastDateStr = commonDates[commonDates.length - 1];
    const lastD = new Date(lastDateStr);
    const boundaryD = new Date(lastD);
    boundaryD.setMonth(boundaryD.getMonth() - 6);
    
    let splitIndex = commonDates.findIndex(d => new Date(d) >= boundaryD);
    if (splitIndex < 2 || splitIndex > commonDates.length - 3) {
      splitIndex = Math.floor(commonDates.length / 2);
    }

    const inSampleReturns = portfolioReturns.slice(0, splitIndex);
    const inSampleBenchmarkReturns = benchmarkReturns.slice(0, splitIndex);
    
    const outOfSampleReturns = portfolioReturns.slice(splitIndex);
    const outOfSampleBenchmarkReturns = benchmarkReturns.slice(splitIndex);

    const getPeriodMetrics = (pRet: number[], bRet: number[]) => {
      if (pRet.length < 2) return null;
      const pc = calculateCAGR(pRet);
      const pv = calculateVolatility(pRet);
      const bc = calculateCAGR(bRet);
      const bv = calculateVolatility(bRet);
      const pC = pRet.reduce((acc, r) => acc * (1 + r), 1) - 1;
      const bC = bRet.reduce((acc, r) => acc * (1 + r), 1) - 1;
      const yrs = pRet.length / TRADING_DAYS;
      const te = (math.std(pRet.map((r, idx) => r - bRet[idx])) as unknown as number) * Math.sqrt(TRADING_DAYS);
      const { beta: bt, alpha: al } = calculateBetaAlpha(pRet, bRet, pc, bc);
      
      return {
        cumulativeReturn: pC,
        cagr: pc,
        volatility: pv,
        sharpe: calculateSharpe(pc, pv),
        sortino: calculateSortino(pRet, pc),
        maxDrawdown: calculateMaxDrawdown(pRet),
        var95: calculateVaR(pRet),
        cvar95: calculateCVaR(pRet),
        beta: bt,
        alpha: al,
        trackingError: te,
        informationRatio: te === 0 ? 0 : (pc - bc) / te,
        correlation: math.corr(pRet, bRet) as unknown as number,
        years: yrs
      };
    };

    const getBenchmarkPeriodMetrics = (bRet: number[]) => {
      if (bRet.length < 2) return null;
      const bc = calculateCAGR(bRet);
      const bv = calculateVolatility(bRet);
      const bC = bRet.reduce((acc, r) => acc * (1 + r), 1) - 1;
      const yrs = bRet.length / TRADING_DAYS;
      return {
        cumulativeReturn: bC,
        cagr: bc,
        volatility: bv,
        sharpe: calculateSharpe(bc, bv),
        sortino: calculateSortino(bRet, bc),
        maxDrawdown: calculateMaxDrawdown(bRet),
        var95: calculateVaR(bRet),
        cvar95: calculateCVaR(bRet),
        beta: 1.0,
        alpha: 0.0,
        trackingError: 0.0,
        informationRatio: 0.0,
        correlation: 1.0,
        years: yrs
      };
    };

    const inSampleMetrics = getPeriodMetrics(inSampleReturns, inSampleBenchmarkReturns);
    const outOfSampleMetrics = getPeriodMetrics(outOfSampleReturns, outOfSampleBenchmarkReturns);
    const inSampleBenchmarkMetrics = getBenchmarkPeriodMetrics(inSampleBenchmarkReturns);
    const outOfSampleBenchmarkMetrics = getBenchmarkPeriodMetrics(outOfSampleBenchmarkReturns);

    // Chart Data
    let pValue = 100;
    let bValue = 100;
    const chartData = commonDates.slice(1).map((date, i) => {
        pValue *= (1 + portfolioReturns[i]);
        bValue *= (1 + benchmarkReturns[i]);
        return {
            date,
            portfolio: pValue - 100,
            benchmark: bValue - 100
        };
    });

    // Evaluation Engine
    const evaluateMetric = (key: string, val: number, bVal?: number) => {
        if (key === 'sharpe') {
            if (val < 1) return { status: 'red', label: 'Underperforming', message: 'Returns do not sufficiently compensate for the portfolio risk (Sharpe < 1).' };
            if (val < 2) return { status: 'yellow', label: 'Acceptable', message: 'Risk-adjusted return is at an average level (Sharpe 1-2).' };
            return { status: 'green', label: 'Excellent', message: 'Exceptional investment performance relative to drawdown and volatility.' };
        }
        if (key === 'cagr') {
            const diff = val - (bVal || 0);
            if (diff > 0.02) return { status: 'green', label: 'Outperforming', message: `Annualized return exceeds the benchmark by ${ (diff * 100).toFixed(2) }%/year.` };
            if (diff < -0.02) return { status: 'red', label: 'Underperforming', message: `Annualized return trails the benchmark by ${ (Math.abs(diff) * 100).toFixed(2) }%/year.` };
            return { status: 'yellow', label: 'Benchmark-Matching', message: 'Annualized return is highly comparable to the specified benchmark.' };
        }
        return { status: 'neutral', label: 'Moderate', message: 'Metric behaves within stable ranges.' };
    };

    const evaluation = {
        overallRating: metrics.sharpe < 1 ? "Needs Improvement" : "Strong Performance",
        summary: "Based on historical backtesting, your portfolio " + (metrics.sharpe < 1 ? "is currently taking on high levels of volatility relative to returns." : "demonstrates highly efficient risk-adjusted performance."),
        details: {
            cagr: evaluateMetric('cagr', metrics.cagr, bMetrics.cagr),
            sharpe: evaluateMetric('sharpe', metrics.sharpe),
            volatility: { status: metrics.volatility > bMetrics.volatility ? 'orange' : 'green', label: metrics.volatility > bMetrics.volatility ? 'High' : 'Low', message: `Annualized volatility is ${(metrics.volatility * 100).toFixed(2)}%.` },
            maxDrawdown: { status: Math.abs(metrics.maxDrawdown) > 0.35 ? 'red' : 'green', label: Math.abs(metrics.maxDrawdown) > 0.35 ? 'Dangerous' : 'Healthy', message: `Maximum historic peak-to-trough drawdown recorded at ${(metrics.maxDrawdown * 100).toFixed(1)}%.` }
        }
    };

    // Correlation Matrix
    const correlationMatrix: Record<string, Record<string, number>> = {};
    allTickers.forEach(t1 => {
        correlationMatrix[t1] = {};
        allTickers.forEach(t2 => {
            if (t1 === t2) {
                correlationMatrix[t1][t2] = 1;
            } else {
                correlationMatrix[t1][t2] = math.corr(returnsMatrix[t1], returnsMatrix[t2]) as unknown as number;
            }
        });
    });

    // Individual Asset Metrics
    const assetMetrics: Record<string, { cagr: number; volatility: number; sharpe: number }> = {};
    tickers.forEach(t => {
      const aCagr = calculateCAGR(returnsMatrix[t]);
      const aVol = calculateVolatility(returnsMatrix[t]);
      assetMetrics[t] = {
        cagr: aCagr,
        volatility: aVol,
        sharpe: calculateSharpe(aCagr, aVol)
      };
    });

    res.json({
      portfolioMetrics: metrics,
      benchmarkMetrics: bMetrics,
      inSampleMetrics,
      outOfSampleMetrics,
      inSampleBenchmarkMetrics,
      outOfSampleBenchmarkMetrics,
      boundaryDate: commonDates[splitIndex],
      assetMetrics,
      correlationMatrix,
      evaluation,
      chartData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xử lý dữ liệu tài chính." });
  }
});

app.post("/api/optimize", async (req, res) => {
  try {
    let { tickers, weights, startDate, endDate, benchmark, riskFreeRate = 4, optTarget = 'sharpe', optConstraints = { min: 5, max: 60 } } = req.body as {
      tickers: string[];
      weights?: number[];
      startDate: string;
      endDate: string;
      benchmark: string;
      riskFreeRate?: number;
      optTarget?: 'sharpe' | 'volatility';
      optConstraints?: { min: number; max: number };
    };

    benchmark = normalizeTicker(benchmark);

    // Map and aggregate weights of identical tickers to resolve duplicated entries elegantly
    const tickerWeightsMap: Record<string, number> = {};
    tickers.forEach((t, index) => {
      const norm = normalizeTicker(t);
      const incomingWeight = weights && weights[index] ? Number(weights[index]) : 0;
      tickerWeightsMap[norm] = (tickerWeightsMap[norm] || 0) + incomingWeight;
    });

    const portfolioTickers = Object.keys(tickerWeightsMap);
    const n = portfolioTickers.length;

    const historicalData: Record<string, any[]> = {};
    
    // Fetch data for each portfolio ticker in parallel
    try {
      await Promise.all(
        portfolioTickers.map(async (ticker) => {
          try {
            historicalData[ticker] = await fetchHistoricalSafe(ticker, startDate, endDate);
          } catch (err: any) {
            console.error(`Error fetching portfolio stock ${ticker}:`, err);
            throw new Error(ticker);
          }
        })
      );
    } catch (err: any) {
      const failedTicker = err.message;
      return res.status(404).json({ 
        error: `Không tìm thấy dữ liệu cho mã ${failedTicker}. Vui lòng kiểm tra lại.` 
      });
    }

    // Align dates with high resilience
    const commonDates = historicalData[portfolioTickers[0]]
      .map(d => formatDateOnly(d.date))
      .filter(date => {
        return date !== '' && portfolioTickers.every(t => historicalData[t] && historicalData[t].some(d => formatDateOnly(d.date) === date));
      });

    if (commonDates.length < 2) {
      return res.status(400).json({ error: "Không đủ dữ liệu lịch sử chung để tối ưu danh mục." });
    }

    const priceMatrix: Record<string, number[]> = {};
    portfolioTickers.forEach(t => {
      priceMatrix[t] = commonDates.map(date => {
        const found = historicalData[t].find(d => formatDateOnly(d.date) === date);
        return found ? (found.adjClose || 1) : 1;
      });
    });

    const returnsMatrix: Record<string, number[]> = {};
    portfolioTickers.forEach(t => {
      const prices = priceMatrix[t];
      const returns: number[] = [];
      for (let i = 1; i < prices.length; i++) {
        const prev = prices[i - 1];
        const curr = prices[i];
        if (prev === 0 || isNaN(prev) || isNaN(curr)) {
          returns.push(0);
        } else {
          returns.push(curr / prev - 1);
        }
      }
      returnsMatrix[t] = returns;
    });

    const numDays = commonDates.length - 1;

    // Helpers
    const TRADING_DAYS = 252;
    const calculateCAGR = (returns: number[]) => {
      const cumulativeReturn = returns.reduce((acc, r) => acc * (1 + (isNaN(r) ? 0 : r)), 1);
      const years = returns.length / TRADING_DAYS;
      const val = Math.pow(cumulativeReturn, 1 / (years <= 0 ? 0.001 : years)) - 1;
      return isNaN(val) ? 0 : val;
    };

    const calculateVolatility = (returns: number[]) => {
      const cleaned = returns.map(r => isNaN(r) ? 0 : r);
      if (cleaned.length < 2) return 0.001;
      const stdVal = math.std(cleaned) as unknown as number;
      const val = (isNaN(stdVal) ? 0.001 : stdVal) * Math.sqrt(TRADING_DAYS);
      return val <= 0 ? 0.001 : val;
    };

    const calculateSharpe = (cagr: number, vol: number) => {
      const safeVol = vol <= 0 ? 0.001 : vol;
      const score = (cagr - riskFreeRate / 100) / safeVol;
      return isNaN(score) ? 0 : score;
    };

    const calculatePortfolioStats = (w: number[]) => {
      const portReturns: number[] = [];
      for (let i = 0; i < numDays; i++) {
        let dailyRet = 0;
        portfolioTickers.forEach((t, idx) => {
          const ret = returnsMatrix[t][i];
          dailyRet += (isNaN(ret) ? 0 : ret) * (w[idx] / 100);
        });
        portReturns.push(dailyRet);
      }
      const cagr = calculateCAGR(portReturns);
      const vol = calculateVolatility(portReturns);
      const sharpe = calculateSharpe(cagr, vol);
      return { return: cagr, vol, sharpe };
    };

    const getScore = (stats: { return: number, vol: number, sharpe: number }) => {
      const rawScore = optTarget === 'sharpe' ? stats.sharpe : -stats.vol;
      return isNaN(rawScore) ? -999 : rawScore;
    };

    const normalize = (w: number[]) => {
      let current = [...w];
      const min = optConstraints.min;
      const max = optConstraints.max;
      
      const adjustedMin = Math.min(min, 100 / n);
      const adjustedMax = Math.max(max, 100 / n);

      for (let iter = 0; iter < 15; iter++) {
        const sum = current.reduce((a, b) => a + b, 0);
        if (sum > 0) {
          current = current.map(v => (v / sum) * 100);
        }
        current = current.map(v => Math.max(adjustedMin, Math.min(adjustedMax, v)));
      }
      
      let finalSum = current.reduce((a, b) => a + b, 0);
      let attempts = 0;
      while (Math.abs(100 - finalSum) > 0.01 && attempts < 30) {
        const diff = 100 - finalSum;
        const step = diff / n;
        for (let i = 0; i < n; i++) {
          const newVal = current[i] + step;
          if (newVal >= adjustedMin && newVal <= adjustedMax) {
            current[i] = newVal;
          }
        }
        finalSum = current.reduce((a, b) => a + b, 0);
        attempts++;
      }
      return current;
    };

    // Initialize with mapped aggregated weights or equal weights
    let totalMappedWeight = Object.values(tickerWeightsMap).reduce((acc, val) => acc + val, 0);
    let initialWeights = portfolioTickers.map(t => {
      if (totalMappedWeight < 1) return 100 / n;
      return tickerWeightsMap[t];
    });

    let bestWeights = normalize(initialWeights);
    let bestStats = calculatePortfolioStats(bestWeights);
    let bestScore = getScore(bestStats);

    // 1. Global search (Random sampling with constraints)
    for (let k = 0; k < 3000; k++) {
      let testWeights = portfolioTickers.map(() => Math.random() * 100);
      testWeights = normalize(testWeights);
      
      const stats = calculatePortfolioStats(testWeights);
      const score = getScore(stats);
      
      if (score > bestScore) {
        bestScore = score;
        bestWeights = testWeights;
      }
    }

    // 2. Local refinement (Hill climbing with constraints)
    for (let k = 0; k < 2000; k++) {
      const idx1 = Math.floor(Math.random() * n);
      const idx2 = Math.floor(Math.random() * n);
      if (idx1 === idx2) continue;
      
      const shift = (Math.random() - 0.5) * 5; // random shift up to 5%
      const nextWeights = [...bestWeights];
      nextWeights[idx1] += shift;
      nextWeights[idx2] -= shift;
      
      const finalWeights = normalize(nextWeights);
      
      const stats = calculatePortfolioStats(finalWeights);
      const score = getScore(stats);
      if (score > bestScore) {
        bestScore = score;
        bestWeights = finalWeights;
      }
    }

    const optimizedWeights = bestWeights.map(v => Number(v.toFixed(1)));
    
    // Ensure 100% total after rounding
    const currentTotal = optimizedWeights.reduce((acc, val) => acc + val, 0);
    const diff = Number((100 - currentTotal).toFixed(1));
    if (diff !== 0) {
      optimizedWeights[0] = Number((optimizedWeights[0] + diff).toFixed(1));
    }

    res.json({
      optimizedWeights,
      tickers: portfolioTickers
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi tối ưu hóa danh mục đầu tư." });
  }
});

function generateRuleBasedAnalysis(portfolioData: any, benchmark: string) {
  const pMetrics = portfolioData.portfolioMetrics;
  const bMetrics = portfolioData.benchmarkMetrics || {};
  
  const formatPercent = (v: number) => `${(v * 100).toFixed(2)}%`;
  const formatNum = (v: number) => v.toFixed(2);
  
  const overallSummary = `Danh mục đầu tư có tỷ suất sinh lời lũy kế đạt ${formatPercent(pMetrics.cumulativeReturn)} so với ${formatPercent(bMetrics.cumulativeReturn || 0)} của benchmark ${benchmark}. Chỉ số Sharpe đạt ${formatNum(pMetrics.sharpe)} thể hiện hiệu quả sử dụng vốn điều chỉnh theo rủi ro ở mức ${pMetrics.sharpe >= 1 ? 'tốt và tối ưu' : 'cần cải thiện thông qua tái phân bổ tỉ trọng các lớp tài sản'}.`;
  
  const metricInsights = [
    {
      metric: "CAGR",
      value: formatPercent(pMetrics.cagr),
      comment: pMetrics.cagr > (bMetrics.cagr || 0)
        ? `Lợi nhuận gộp hằng năm vượt trội so với benchmark (${formatPercent(bMetrics.cagr || 0)}), khẳng định sự tối ưu trong tỷ trọng nhóm cổ phiếu lựa chọn.`
        : `Tỷ suất tăng trưởng hằng năm đang kém hiệu quả hơn so với chỉ số tham chiếu thị trường, đề xuất rà soát kỹ để tối ưu hóa giá trị tích lũy dài hạn.`
    },
    {
      metric: "Volatility",
      value: formatPercent(pMetrics.volatility),
      comment: pMetrics.volatility < (bMetrics.volatility || 0.25)
        ? `Mức độ dao động và biến động chung thấp hơn thị trường, giúp bảo toàn danh mục ổn định hơn trước những cơn sóng gió ngắn hạn.`
        : `Biên độ dao động giá tương đối lớn so với thị trường chung, đòi hỏi nhà đầu tư cần có tầm nhìn trung-dài hạn tốt.`
    },
    {
      metric: "Sharpe Ratio",
      value: formatNum(pMetrics.sharpe),
      comment: pMetrics.sharpe >= 1.0
        ? `Chỉ số Sharpe đạt ${formatNum(pMetrics.sharpe)} là mức hiệu quả xuất sắc, phản ánh lợi nhuận vượt trội thu về tương xứng trên mỗi đơn vị rủi ro gánh chịu.`
        : `Hiệu suất điều chỉnh theo rủi ro (${formatNum(pMetrics.sharpe)}) ở mức vừa phải, có thể nâng cao thông qua việc tối ưu biên giới hiệu quả.`
    },
    {
      metric: "Max Drawdown",
      value: formatPercent(pMetrics.maxDrawdown),
      comment: Math.abs(pMetrics.maxDrawdown) < 0.20
        ? `Mức sụt giảm từ đỉnh lịch sử được kiểm soát tốt dưới 20%, giúp bảo vệ dòng vốn và giảm áp lực tâm lý giao dịch.`
        : `Tỷ lệ sụt giảm lịch sử tương đối cao (${formatPercent(pMetrics.maxDrawdown)}), khuyến nghị gia tăng thêm một số mã phòng thủ/cổ tức ổn định.`
    }
  ];
  
  const strategicAdvice = [
    `Cân nhắc đa dạng hóa một phần vốn sang các nhóm ngành ít tương quan khác (như Năng lượng, Tiêu dùng thiết yếu) nhằm giảm thiểu rủi ro hệ thống.`,
    pMetrics.sharpe < 1 
      ? `Gia tăng tỷ trọng các mã có lợi thế cạnh tranh bền vững (Moat) nhằm củng cố chỉ số Sharpe tổng thể.`
      : `Duy trì chiến lược hiện tại và xem xét tái cân bằng bán bớt một phần khi tỷ trọng các mã nóng vượt quá hạn mức mục tiêu.`,
    `Triển khai tái cân bằng danh mục định kỳ (Hằng quý hoặc Hằng bán niên) giúp liên tục chốt lời thặng dư và mua tích trữ rải đều dòng tiền.`
  ];
  
  const marketComparison = pMetrics.cagr > (bMetrics.cagr || 0)
    ? `Danh mục hoạt động xuất sắc đánh bại chỉ số tham chiếu ${benchmark}. Hiệu suất thặng dư Alpha đạt ${formatPercent(pMetrics.alpha || 0)} mỗi năm.`
    : `Mức độ tăng trưởng đang thấp hơn ${benchmark}. Alpha âm (${formatPercent(pMetrics.alpha || 0)}) phản ánh việc phân bổ tài sản chưa mang lại thặng dư tương xứng so với rủi ro thị trường gánh chịu.`;

  return {
    overallSummary,
    metricInsights,
    strategicAdvice,
    marketComparison
  };
}

app.post("/api/gemini/generate-analysis", async (req, res) => {
  const { portfolioData, benchmark } = req.body;
  if (!portfolioData) {
    return res.status(400).json({ error: "Missing portfolioData" });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const formatPercent = (v: number) => `${(v * 100).toFixed(2)}%`;
    const formatNum = (v: number) => v.toFixed(2);

    const prompt = `
      You are an experienced senior investment analyst specializing in Vietnamese and global equities.
      Analyze the provided portfolio performance and benchmark comparison, and then generate highly professional and insightful commentary in VIETNAMESE.
      
      Respond STRICTLY with a valid JSON object matching the schema below. Do NOT wrap the JSON in Markdown code blocks (like \`\`\`json ... \`\`\`), backticks, or any non-JSON wrapping.
      
      Schema:
      {
        "overallSummary": "A concise, elegant 2-sentence summary in VIETNAMESE covering historical return quality, risk efficiency, and correlation profile.",
        "metricInsights": [
          { "metric": "CAGR", "value": "x%", "comment": "Commentary in VIETNAMESE analyzing what the compound growth rate tells about this allocation." },
          { "metric": "Volatility", "value": "x%", "comment": "Commentary in VIETNAMESE analyzing risk profile." },
          { "metric": "Sharpe Ratio", "value": "x", "comment": "Commentary in VIETNAMESE analyzing risk-adjusted efficiency." },
          { "metric": "Max Drawdown", "value": "x%", "comment": "Commentary in VIETNAMESE analyzing historically worst downside draw." }
        ],
        "strategicAdvice": [
          "VIETNAMESE constructive advice item 1 - on weights rebalancing or high asset correlation reduction.",
          "VIETNAMESE constructive advice item 2 - on protective hedge or growth diversification.",
          "VIETNAMESE constructive advice item 3 - on dollar cost average or exit strategy."
        ],
        "marketComparison": "In-depth analysis in VIETNAMESE on the portfolio's active outperformance/underperformance versus benchmark index."
      }

      DATASET:
      Benchmark Symbol: ${benchmark}
      - Cumulative Return: ${formatPercent(portfolioData.portfolioMetrics.cumulativeReturn)}
      - CAGR: ${formatPercent(portfolioData.portfolioMetrics.cagr)}
      - Volatility: ${formatPercent(portfolioData.portfolioMetrics.volatility)}
      - Sharpe Ratio: ${formatNum(portfolioData.portfolioMetrics.sharpe)}
      - Max Drawdown: ${formatPercent(portfolioData.portfolioMetrics.maxDrawdown)}
      - Beta (systematic risk): ${formatNum(portfolioData.portfolioMetrics.beta)}
      - Alpha (excess return): ${formatPercent(portfolioData.portfolioMetrics.alpha)}
      - Tracking Error: ${formatPercent(portfolioData.portfolioMetrics.trackingError)}
      - Information Ratio: ${formatNum(portfolioData.portfolioMetrics.informationRatio)}
    `;

    let responseText = "";
    let success = false;
    const activeModels = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    
    for (const modelToTry of activeModels) {
      try {
        console.log(`Attempting Gemini AI analysis using model: ${modelToTry}`);
        const response = await ai.models.generateContent({
          model: modelToTry,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        if (response && response.text) {
          responseText = response.text;
          success = true;
          console.log(`Successfully generated analysis with model: ${modelToTry}`);
          break;
        }
      } catch (err: any) {
        console.log(`Model ${modelToTry} failed: ${err.message}`);
      }
    }

    if (success) {
      res.json({ text: responseText });
    } else {
      console.log("All server-side Gemini models failed or key is denied access. Executing rule-based high quality Vietnamese fallback.");
      const fallbackData = generateRuleBasedAnalysis(portfolioData, benchmark);
      res.json({ text: JSON.stringify(fallbackData) });
    }
  } catch (outerError: any) {
    console.error("Outer error during generate-analysis: ", outerError.message);
    const fallbackData = generateRuleBasedAnalysis(portfolioData, benchmark);
    res.json({ text: JSON.stringify(fallbackData) });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
