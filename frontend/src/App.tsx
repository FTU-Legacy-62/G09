import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  AreaChart, Area, PieChart as RePieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Info, ShieldCheck, Zap, 
  ChevronRight, RefreshCw, Layers, TrendingDown, TrendingUp,
  Home, PieChart as PieChartIcon, LayoutDashboard, Star, Play, Target,
  Plus, Trash2, ArrowRight, CheckCircle2, Sparkles, BrainCircuit, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioForm } from './components/PortfolioForm';
import { MetricCard } from './components/MetricCard';
import { AnalysisResponse, PortfolioItem } from './types';
import finfolioWelcomeHero from './assets/images/finfolio_welcome_hero_1780461028405.png';

const normalizeTicker = (ticker: string): string => {
  if (!ticker) return '';
  const t = ticker.trim().toUpperCase();
  if (t === 'VNINDEX' || t === '^VNINDEX') {
    return '^VNINDEX';
  }
  
  // Popular benchmarks/known foreign assets
  const knownForeign = ['^GSPC', 'EEM', 'GC=F', 'GLD', '^NDX', 'BTC-USD', 'SPY', 'QQQ', 'DIA', 'IWM', '^VNINDEX', 'VNM'];
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

type TabType = 'home' | 'input' | 'dashboard' | 'evaluation' | 'simulation' | 'optimization';
type SimulatedStock = { ticker: string; shares: number; weight: number };
type DisplayCurrency = 'VND' | 'USD';

const USD_VND_RATE = 25400;

const isVNStock = (ticker: string) => {
  if (!ticker) return false;
  const t = ticker.trim().toUpperCase();
  if (t === 'VNINDEX' || t === '^VNINDEX' || t === 'VNM') {
    return false;
  }
  if (t.endsWith('.VN')) return true;
  if (!t.includes('.') && !t.startsWith('^') && !t.includes('=') && !t.includes('-')) {
    return t.length === 3 || t.startsWith('FUE') || t.startsWith('E1VF');
  }
  return false;
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Lifted state from PortfolioForm
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { ticker: 'FPT.VN', weight: 50, shares: 500 },
    { ticker: 'HPG.VN', weight: 50, shares: 1000 },
  ]);
  const [benchmark, setBenchmark] = useState('VNM');
  const [startDate, setStartDate] = useState('2023-05-12');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [displayCurrency, setDisplayCurrency] = useState<DisplayCurrency>('VND');

  // Track if user explicitly changed benchmark
  const [isBenchmarkOverridden, setIsBenchmarkOverridden] = useState(false);

  React.useEffect(() => {
    if (!isBenchmarkOverridden) {
      const validItems = portfolioItems.filter(item => item.ticker && item.ticker.trim());
      if (validItems.length === 0) {
        setBenchmark('VNM');
        return;
      }
      
      const hasVN = validItems.some(item => {
        const t = item.ticker.trim().toUpperCase();
        if (t.endsWith('.VN')) return true;
        if (!t.includes('.') && !t.startsWith('^') && !t.includes('=') && !t.includes('-')) {
          if (t.length === 3 || t.startsWith('FUE') || t.startsWith('E1VF')) {
            return true;
          }
        }
        return false;
      });
      
      const hasForeign = validItems.some(item => {
        const t = item.ticker.trim().toUpperCase();
        const isVN = t.endsWith('.VN') || (!t.includes('.') && !t.startsWith('^') && !t.includes('=') && !t.includes('-') && (t.length === 3 || t.startsWith('FUE') || t.startsWith('E1VF')));
        return !isVN;
      });

      if (hasVN && !hasForeign) {
        setBenchmark('VNM');
      } else if (!hasVN && hasForeign) {
        setBenchmark('SPY');
      } else {
        setBenchmark('EEM');
      }
    }
  }, [portfolioItems, isBenchmarkOverridden]);

  const handleSetBenchmark = (val: string) => {
    setIsBenchmarkOverridden(true);
    setBenchmark(val);
  };

  // Simulation state
  const [simTicker, setSimTicker] = useState(''); 
  const [simSharesInput, setSimSharesInput] = useState('100');
  const [simQuote, setSimQuote] = useState<{ ticker: string; price: number; currency: string; loading: boolean } | null>(null);
  const [simProjection, setSimProjection] = useState<{
    ticker: string;
    weight: number;
    totalValueVND: number;
    positions: { ticker: string; shares: number; weight: number; valueVND: number }[];
    loading: boolean;
  } | null>(null);
  const [simulatedStocks, setSimulatedStocks] = useState<SimulatedStock[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // Dashboard quick edit states
  const [showAddMini, setShowAddMini] = useState(false);
  const [miniTicker, setMiniTicker] = useState('');
  const [miniWeight, setMiniWeight] = useState(10);

  React.useEffect(() => {
    setIsMounted(true);
    setSimulatedStocks([]);
    setSimTicker('');
  }, []);

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiAnalysing, setIsAiAnalysing] = useState(false);
  const [optTarget, setOptTarget] = useState<'sharpe' | 'volatility'>('sharpe');
  const [optConstraints, setOptConstraints] = useState({ min: 5, max: 60 });
  const [preOptData, setPreOptData] = useState<any>(null);
  const [preSimData, setPreSimData] = useState<any>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const benchmarks = [
    { label: 'VN-Index (đại diện VNM)', value: 'VNM' },
    { label: 'S&P 500 ETF (SPY)', value: 'SPY' },
    { label: 'MSCI thị trường mới nổi (EEM)', value: 'EEM' },
  ];

  const getBenchmarkLabel = (val: string) => {
    return benchmarks.find(b => b.value === val)?.label || val;
  };

  const generateAIAnalysis = async (portfolioData: any) => {
    if (!portfolioData) return;
    setIsAiAnalysing(true);
    try {
      const response = await fetch("/api/gemini/generate-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          portfolioData, 
          benchmark: getBenchmarkLabel(benchmark) 
        }),
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      setAiAnalysis(result.text);
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setAiAnalysis(null);
    } finally {
      setIsAiAnalysing(false);
    }
  };

  const handleAnalyze = async (customParams?: any) => {
    setLoading(true);
    setGlobalError(null);

    if (!customParams?.isOptimizing && !customParams?.isSimulating) {
       setActiveTab('dashboard');
    }
    const params = customParams || {
      tickers: portfolioItems.map(i => i.ticker.trim().toUpperCase()),
      weights: portfolioItems.map(i => Number(i.weight)),
      benchmark,
      startDate,
      endDate
    };

    console.log("Analyzing with params:", params);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...params, riskFreeRate: 4 }),
      });
      const result = await response.json();
      if (result.error) {
        setGlobalError(result.error);
        return;
      }
      
      // Ensure data is really updated
      setData(result);
      generateAIAnalysis(result);
      
      if (!customParams?.isOptimizing && !customParams?.isSimulating) setActiveTab('dashboard');
    } catch (error) {
      console.error(error);
      setGlobalError("Đã xảy ra lỗi khi phân tích dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!data) return;
    setLoading(true);
    setGlobalError(null);
    
    // Store current data as "pre-optimization" data
    setPreOptData({
      ...JSON.parse(JSON.stringify(data)),
      originalItems: JSON.parse(JSON.stringify(portfolioItems))
    });

    const tickers = portfolioItems.map(i => i.ticker.trim().toUpperCase());
    const weights = portfolioItems.map(i => i.weight);
    
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tickers,
          weights,
          startDate,
          endDate,
          benchmark,
          riskFreeRate: 4,
          optTarget,
          optConstraints
        })
      });
      
      const result = await response.json();
      if (result.error) {
        setGlobalError(result.error);
        setLoading(false);
        return;
      }

      const { optimizedWeights, tickers: serverTickers } = result;

      const optimizedItems = portfolioItems.map((item, idx) => {
        const cleanClientTicker = item.ticker.trim().toUpperCase().split('.')[0];
        const serverIdx = serverTickers ? serverTickers.findIndex((t: string) => {
          const cleanServerTicker = t.trim().toUpperCase().split('.')[0];
          return cleanServerTicker === cleanClientTicker;
        }) : idx;

        const finalWeight = (serverIdx !== -1 && optimizedWeights && optimizedWeights[serverIdx] !== undefined)
          ? optimizedWeights[serverIdx]
          : (optimizedWeights && optimizedWeights[idx] !== undefined ? optimizedWeights[idx] : item.weight);

        return {
          ...item,
          weight: finalWeight
        };
      });

      setPortfolioItems(optimizedItems);
      await handleAnalyze({
        tickers,
        weights: optimizedItems.map(i => i.weight),
        benchmark,
        startDate,
        endDate,
        isOptimizing: true
      });
    } catch (error) {
      console.error(error);
      setGlobalError("Đã xảy ra lỗi khi tối ưu hóa danh mục.");
      setLoading(false);
    }
  };

  const formatPercent = (val: number | undefined | null) => {
    if (val === undefined || val === null) return '---%';
    return `${(val * 100).toFixed(2)}%`;
  };
  const formatNum = (val: number | undefined | null) => {
    if (val === undefined || val === null) return '---';
    return val.toFixed(2);
  };

  const SidebarItem = ({ icon: Icon, label, tab }: { icon: any, label: string, tab: TabType }) => (
    <div className="px-3 py-1">
      <button 
        onClick={() => setActiveTab(tab)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-350 ${
          activeTab === tab 
            ? 'bg-white text-indigo-700 shadow-[0_4px_12px_rgba(92,112,90,0.08)] font-bold border border-slate-200/50' 
            : 'text-slate-650 hover:bg-white/50 hover:text-slate-900 font-semibold'
        }`}
      >
        <div className={`p-1.5 rounded-full transition-colors duration-300 ${activeTab === tab ? 'bg-indigo-55 text-indigo-605' : 'bg-slate-100 text-slate-550'}`}>
          <Icon size={14} />
        </div>
        <span className="text-[13px] tracking-tight">{label}</span>
        {tab === 'input' && portfolioItems.length > 0 && (
           <span className="ml-auto w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
        )}
      </button>
    </div>
  );

  const fetchCurrentPrice = async (ticker: string) => {
    const fallbackCurrency = isVNStock(ticker) ? 'VND' : 'USD';
    const fallbackPrice = isVNStock(ticker) ? 135000 : 150;

    try {
      const res = await fetch(`/api/price?ticker=${encodeURIComponent(ticker)}`);
      if (!res.ok) throw new Error("Price not found");
      const quote = await res.json();
      return {
        price: Number(quote.price) || fallbackPrice,
        currency: quote.currency || fallbackCurrency
      };
    } catch (error) {
      console.error(`Lỗi khi lấy giá cho ${ticker}`, error);
      return {
        price: fallbackPrice,
        currency: fallbackCurrency
      };
    }
  };

  const getPositionValueVND = async (ticker: string, shares = 0) => {
    const quote = await fetchCurrentPrice(ticker);
    const rawValue = Math.max(0, Math.floor(Number(shares) || 0)) * quote.price;
    return quote.currency === 'USD' ? rawValue * USD_VND_RATE : rawValue;
  };

  const parseShareInput = (value: string) => Math.max(0, Math.floor(Number(value) || 0));

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `≈ $${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} USD`;
    }
    return `≈ ${amount.toLocaleString('vi-VN')} VND`;
  };

  const formatConvertedValue = (amountVND: number, currency: DisplayCurrency) => {
    if (currency === 'VND') {
      return `${amountVND.toLocaleString('vi-VN')} VND`;
    }

    const amountUSD = amountVND / USD_VND_RATE;
    return `$${amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  };

  React.useEffect(() => {
    const ticker = normalizeTicker(simTicker.trim());
    if (!ticker) {
      setSimQuote(null);
      return;
    }

    let cancelled = false;
    setSimQuote(prev => ({
      ticker,
      price: prev?.ticker === ticker ? prev.price : 0,
      currency: prev?.ticker === ticker ? prev.currency : isVNStock(ticker) ? 'VND' : 'USD',
      loading: true
    }));

    fetchCurrentPrice(ticker).then(quote => {
      if (cancelled) return;
      setSimQuote({
        ticker,
        price: quote.price,
        currency: quote.currency,
        loading: false
      });
    });

    return () => {
      cancelled = true;
    };
  }, [simTicker]);

  const normalizeWeightsFromValues = (positions: { ticker: string; shares: number; valueVND: number }[]) => {
    if (positions.length === 0) return [];

    const totalValue = positions.reduce((sum, item) => sum + item.valueVND, 0);
    if (totalValue <= 0) {
      return positions.map(item => ({
        ticker: item.ticker,
        shares: item.shares,
        weight: Number((100 / positions.length).toFixed(1))
      }));
    }

    const weighted = positions.map(item => ({
      ticker: item.ticker,
      shares: item.shares,
      weight: Number(((item.valueVND / totalValue) * 100).toFixed(1))
    }));

    const currentTotal = weighted.reduce((sum, item) => sum + item.weight, 0);
    const diff = Number((100 - currentTotal).toFixed(1));
    if (diff !== 0 && weighted.length > 0) {
      let maxIdx = 0;
      weighted.forEach((item, idx) => {
        if (item.weight > weighted[maxIdx].weight) maxIdx = idx;
      });
      weighted[maxIdx].weight = Number((weighted[maxIdx].weight + diff).toFixed(1));
    }

    return weighted;
  };

  const getSimulatedPositionsWithValues = async (currentSimStocks: SimulatedStock[]) => {
    // If we have preSimData.originalItems, use it as baseline. Otherwise use current portfolioItems.
    const baseItems = preSimData?.originalItems || portfolioItems;
    const simTickers = currentSimStocks.map(s => s.ticker.trim().toUpperCase());

    const basePositions = baseItems
      .filter((item: PortfolioItem) => !simTickers.includes(item.ticker.trim().toUpperCase()))
      .map((item: PortfolioItem) => ({
        ticker: item.ticker,
        shares: Math.max(0, Math.floor(Number(item.shares ?? 100) || 0))
      }));

    const simulatedPositions = currentSimStocks.map(s => ({
      ticker: s.ticker,
      shares: Math.max(0, Math.floor(Number(s.shares) || 0))
    }));

    return Promise.all(
      [...basePositions, ...simulatedPositions].map(async position => ({
        ...position,
        valueVND: await getPositionValueVND(position.ticker, position.shares)
      }))
    );
  };

  const getSimulatedWeights = async (currentSimStocks: SimulatedStock[]) => {
    const positionsWithValues = await getSimulatedPositionsWithValues(currentSimStocks);
    return normalizeWeightsFromValues(positionsWithValues);
  };

  React.useEffect(() => {
    const ticker = normalizeTicker(simTicker.trim());
    const shares = parseShareInput(simSharesInput);

    if (!ticker || shares <= 0) {
      setSimProjection(null);
      return;
    }

    let cancelled = false;
    setSimProjection(prev => ({
      ticker,
      weight: prev?.ticker === ticker ? prev.weight : 0,
      totalValueVND: prev?.ticker === ticker ? prev.totalValueVND : 0,
      positions: prev?.ticker === ticker ? prev.positions : [],
      loading: true
    }));

    const nextStocks = [...simulatedStocks];
    const existingIdx = nextStocks.findIndex(s => s.ticker.toUpperCase() === ticker.toUpperCase());
    if (existingIdx !== -1) {
      nextStocks[existingIdx] = { ...nextStocks[existingIdx], shares };
    } else {
      nextStocks.push({ ticker, shares, weight: 0 });
    }

    getSimulatedPositionsWithValues(nextStocks).then(positionsWithValues => {
      if (cancelled) return;
      const weightedPositions = normalizeWeightsFromValues(positionsWithValues);
      const targetWeight = weightedPositions.find(item => item.ticker.trim().toUpperCase() === ticker.toUpperCase())?.weight ?? 0;
      const totalValueVND = positionsWithValues.reduce((sum, item) => sum + item.valueVND, 0);
      const projectedPositions = positionsWithValues.map(position => {
        const weighted = weightedPositions.find(item => item.ticker.trim().toUpperCase() === position.ticker.trim().toUpperCase());
        return {
          ticker: position.ticker,
          shares: position.shares,
          valueVND: position.valueVND,
          weight: weighted?.weight ?? 0
        };
      });

      setSimProjection({
        ticker,
        weight: targetWeight,
        totalValueVND,
        positions: projectedPositions,
        loading: false
      });
    });

    return () => {
      cancelled = true;
    };
  }, [simTicker, simSharesInput, simulatedStocks, portfolioItems, preSimData]);

  const handleSimulate = async (currentSimulatedStocks = simulatedStocks) => {
    if (!data) return;
    
    // Store current data as "pre-simulation" data ONLY if it hasn't been set yet
    if (!preSimData) {
      setPreSimData({
        ...JSON.parse(JSON.stringify(data)),
        originalItems: JSON.parse(JSON.stringify(portfolioItems))
      });
    }

    const newItems = await getSimulatedWeights(currentSimulatedStocks);
    setPortfolioItems(newItems);
    handleAnalyze({
      tickers: newItems.map(i => i.ticker.trim().toUpperCase()),
      weights: newItems.map(i => i.weight),
      benchmark,
      startDate,
      endDate,
      isSimulating: true
    });
  };

  const handleResetSimulation = () => {
    if (!preSimData) return;
    setPortfolioItems(preSimData.originalItems);
    setData(preSimData);
    setPreSimData(null);
    setSimulatedStocks([]);
  };

  const handleAddSimStock = async () => {
    const raw = simTicker.trim();
    if (!raw) {
      setGlobalError("Vui lòng nhập mã cổ phiếu cần mô phỏng.");
      return;
    }
    const norm = normalizeTicker(raw);
    const normalizedShares = parseShareInput(simSharesInput);
    if (normalizedShares <= 0) {
      setGlobalError("Khối lượng mô phỏng phải lớn hơn 0.");
      return;
    }

    const nextStocks = [...simulatedStocks];
    const existingIdx = nextStocks.findIndex(s => s.ticker.toUpperCase() === norm.toUpperCase());
    
    if (existingIdx !== -1) {
      nextStocks[existingIdx].shares = normalizedShares;
    } else {
      nextStocks.push({ ticker: norm, shares: normalizedShares, weight: 0 });
    }

    const weightedStocks = await getSimulatedWeights(nextStocks);
    const weightedSimStocks = nextStocks.map(stock => {
      const weighted = weightedStocks.find(item => item.ticker.trim().toUpperCase() === stock.ticker.trim().toUpperCase());
      return {
        ...stock,
        weight: weighted?.weight ?? 0
      };
    });
    
    setSimulatedStocks(weightedSimStocks);
    
    // Reset inputs
    setSimTicker('');
    setSimSharesInput('100');
    
    // Run simulation automatically with new stocks list
    await handleSimulate(weightedSimStocks);
  };

  const handleRemoveSimStock = async (tickerToRemove: string) => {
    const nextStocks = simulatedStocks.filter(s => s.ticker.toUpperCase() !== tickerToRemove.toUpperCase());
    if (nextStocks.length === 0) {
      setSimulatedStocks([]);
      handleResetSimulation();
    } else {
      const weightedStocks = await getSimulatedWeights(nextStocks);
      const weightedSimStocks = nextStocks.map(stock => {
        const weighted = weightedStocks.find(item => item.ticker.trim().toUpperCase() === stock.ticker.trim().toUpperCase());
        return {
          ...stock,
          weight: weighted?.weight ?? 0
        };
      });
      setSimulatedStocks(weightedSimStocks);
      await handleSimulate(weightedSimStocks);
    }
  };

  const handleDashboardAddStock = async () => {
    if (!miniTicker.trim()) return;
    if (miniWeight <= 0 || miniWeight >= 100) {
      setGlobalError("Tỷ trọng mã mới phải lớn hơn 0% và nhỏ hơn 100%.");
      return;
    }
    const norm = normalizeTicker(miniTicker);
    const exists = portfolioItems.some(i => i.ticker.trim().toUpperCase() === norm.toUpperCase());
    if (exists) {
      setGlobalError(`Mã cổ phiếu ${norm} đã tồn tại trong danh mục.`);
      return;
    }

    const scale = (100 - miniWeight) / 100;
    const scaledItems = portfolioItems.map(item => ({
      ...item,
      weight: Number((item.weight * scale).toFixed(1))
    }));
    
    const updatedItems = [...scaledItems, { ticker: norm, weight: miniWeight }];
    const total = updatedItems.reduce((acc, i) => acc + i.weight, 0);
    const diff = Number((100 - total).toFixed(1));
    
    if (diff !== 0 && scaledItems.length > 0) {
      scaledItems[0].weight = Number((scaledItems[0].weight + diff).toFixed(1));
    }
    
    const finalItems = [...scaledItems, { ticker: norm, weight: miniWeight }];
    setPortfolioItems(finalItems);
    setShowAddMini(false);
    setMiniTicker('');
    
    await handleAnalyze({
      tickers: finalItems.map(i => i.ticker.trim().toUpperCase()),
      weights: finalItems.map(i => i.weight),
      benchmark,
      startDate,
      endDate
    });
  };

  const handleDashboardRemoveStock = async (ticker: string) => {
    if (portfolioItems.length <= 1) {
      setGlobalError("Danh mục phải giữ lại ít nhất 1 mã cổ phiếu.");
      return;
    }
    const filtered = portfolioItems.filter(i => i.ticker.trim().toUpperCase() !== ticker.trim().toUpperCase());
    const sum = filtered.reduce((acc, i) => acc + i.weight, 0);
    let updatedItems = [];
    if (sum === 0) {
      const eq = Number((100 / filtered.length).toFixed(1));
      updatedItems = filtered.map(item => ({ ...item, weight: eq }));
    } else {
      const scale = 100 / sum;
      updatedItems = filtered.map(item => ({
        ...item,
        weight: Number((item.weight * scale).toFixed(1))
      }));
    }
    const total = updatedItems.reduce((acc, i) => acc + i.weight, 0);
    const diff = Number((100 - total).toFixed(1));
    if (diff !== 0 && updatedItems.length > 0) {
      updatedItems[0].weight = Number((updatedItems[0].weight + diff).toFixed(1));
    }
    
    setPortfolioItems(updatedItems);
    await handleAnalyze({
      tickers: updatedItems.map(i => i.ticker.trim().toUpperCase()),
      weights: updatedItems.map(i => i.weight),
      benchmark,
      startDate,
      endDate
    });
  };

  const splitChartData = React.useMemo(() => {
    if (!data?.chartData) return [];
    if (!data?.boundaryDate) {
      return data.chartData.map((d: any) => ({
        ...d,
        portfolio_is: d.portfolio,
        portfolio_oos: null,
      }));
    }
    return data.chartData.map((d: any) => {
      const isBeforeOrEqual = d.date <= data.boundaryDate;
      const isAfterOrEqual = d.date >= data.boundaryDate;
      return {
        ...d,
        portfolio_is: isBeforeOrEqual ? d.portfolio : null,
        portfolio_oos: isAfterOrEqual ? d.portfolio : null,
      };
    });
  }, [data?.chartData, data?.boundaryDate]);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f2efe7]/50 border-r border-slate-200 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 pb-8 flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm">
            <Activity size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-slate-800">FinFolio</span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-700">Nhóm 9 - Danh mục đầu tư</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          <div className="px-6 py-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">Tổng quan</span>
          </div>
          <SidebarItem icon={Home} label="Trang chủ" tab="home" />
          <SidebarItem icon={Plus} label="Nhập danh mục" tab="input" />
          
          <div className="px-6 py-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">Phân tích chuyên sâu</span>
          </div>
          <SidebarItem icon={LayoutDashboard} label="Bảng điều khiển" tab="dashboard" />
          <SidebarItem icon={Star} label="Đánh giá danh mục" tab="evaluation" />
          <SidebarItem icon={Play} label="Mô phỏng tài sản" tab="simulation" />
          <SidebarItem icon={Target} label="Tối ưu hóa tỷ trọng" tab="optimization" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen relative">
        {globalError && (
          <div className="fixed top-6 right-6 z-50 max-w-sm bg-rose-50 border border-rose-100 p-4 rounded-2xl shadow-xl animate-fadeIn text-rose-700 text-xs font-bold flex justify-between items-center gap-4">
            <span className="flex items-center gap-2">⚠️ {globalError}</span>
            <button type="button" onClick={() => setGlobalError(null)} className="text-slate-400 hover:text-slate-600 font-bold">
              Đóng
            </button>
          </div>
        )}
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-12 max-w-5xl"
            >
              <div className="space-y-6 pt-20">
                <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-800 tracking-tight leading-tight">
                  FinFolio <br />
                  <span className="text-indigo-650 italic">Hành Trình Tài Chính</span>
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-[24px] border border-slate-200/50 shadow-[0_4px_24px_rgba(141,165,137,0.06)]">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-lg text-indigo-650 font-bold leading-relaxed">
                      Trang web phân tích, đánh giá và tối ưu danh mục đầu tư cá nhân chuyên sâu
                    </p>
                    <div className="text-slate-500 leading-relaxed text-xs sm:text-sm">
                      Công cụ hỗ trợ bạn theo dõi hiệu suất đầu tư lịch sử, phân tích rủi ro biến động, kiểm định độc lập trong mẫu và ngoài mẫu (In-Sample/Out-of-Sample), đồng thời tìm kiếm tỷ trọng phân bổ vốn phù hợp dựa trên kinh tế lượng tài chính hiện đại.
                    </div>
                    <div className="pt-2">
                      <button 
                        onClick={() => setActiveTab('input')}
                        className="px-8 py-3.5 bg-indigo-600 text-white rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 hover:shadow-xl active:scale-95 transition-all text-sm shadow-md"
                      >
                        Bắt đầu ngay <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-48 h-48 rounded-full bg-indigo-50/50 flex items-center justify-center p-4">
                      <img 
                        src={finfolioWelcomeHero} 
                        alt="Linh vật FinFolio"
                        className="w-full h-full object-contain rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-20">
                   {[
                     { icon: LayoutDashboard, title: 'Phân tích danh mục', text: 'Tính toán các chỉ số tài chính quan trọng như CAGR, Sharpe Ratio, Volatility và Max Drawdown.' },
                     { icon: Layers, title: 'So sánh Benchmark', text: 'Đối chiếu hiệu suất danh mục của bạn với các chỉ số thị trường như VN-Index hoặc S&P 500.' },
                     { icon: Star, title: 'Đánh giá dễ hiểu', text: 'Nhận những nhận xét trực quan, thân thiện bằng tiếng Việt về sức khỏe danh mục đầu tư.' },
                     { icon: Zap, title: 'Tối ưu danh mục', text: 'Tìm kiếm tỷ trọng phân bổ vốn tối ưu để đạt lợi nhuận cao nhất hoặc rủi ro thấp nhất.' },
                   ].map((item, i) => (
                     <div key={i} className="glass-card p-8 flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <item.icon size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'input' && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-12 max-w-4xl"
            >
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Nhập danh mục đầu tư</h2>
                <div className="glass-card p-10">
	                  <PortfolioForm 
	                    items={portfolioItems}
	                    setItems={setPortfolioItems}
	                    displayCurrency={displayCurrency}
	                    setDisplayCurrency={setDisplayCurrency}
	                    benchmark={benchmark}
                    setBenchmark={handleSetBenchmark}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    onSubmit={handleAnalyze} 
                    loading={loading} 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {(activeTab === 'dashboard' || activeTab === 'evaluation' || activeTab === 'simulation' || activeTab === 'optimization') && !data && activeTab !== 'home' && (
             <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-soft flex items-center justify-center border border-slate-100 italic font-serif text-slate-200 group relative">
                    <PieChartIcon className="text-slate-100 group-hover:scale-110 transition-transform" size={40} />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Cần dữ liệu để phân tích</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">Vui lòng nhập danh mục của bạn tại phần "Nhập danh mục" để bắt đầu.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('input')}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-tight"
                >
                  Nhập dữ liệu ngay
                </button>
             </div>
          )}

          {data && activeTab === 'dashboard' && (
            <motion.div 
               key="dashboard"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="p-12 space-y-12"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Bảng điều khiển phân tích danh mục</h2>
                <p className="text-slate-500">Dữ liệu từ quá khứ ({data.portfolioMetrics?.years?.toFixed(1) || '---'} năm) so với Benchmark: <span className="font-bold text-slate-700">{getBenchmarkLabel(benchmark)}</span></p>
                {benchmark === 'E1VFVN30.VN' && startDate === '2025-01-15' && (
                  <div className="p-4 bg-amber-50 border border-amber-200/50 rounded-2xl text-amber-800 text-xs font-bold leading-relaxed shadow-sm flex items-center gap-2.5 animate-fadeIn mt-2">
                    <span className="text-sm shrink-0">⚠️</span>
                    <span>Tính năng thử nghiệm: Benchmark VN30 ETF chỉ có dữ liệu ổn định từ 15/01/2025. Ngày bắt đầu đã được điều chỉnh tự động.</span>
                  </div>
                )}
                 <div className="flex flex-wrap items-center gap-2 mt-3 text-xs mb-3">
                   {portfolioItems.map(item => (
                     <span key={item.ticker} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-[11px] font-black text-slate-700 rounded-xl uppercase hover:bg-slate-100/80 transition-all shadow-sm">
                       <span>{item.ticker} ({item.weight}%)</span>
                       <button 
                         onClick={() => handleDashboardRemoveStock(item.ticker)} 
                         className="p-0.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                         title={`Xóa ${item.ticker} khỏi danh mục`}
                       >
                         <Plus size={12} className="rotate-45" />
                       </button>
                     </span>
                   ))}
                   
                   {!showAddMini ? (
                     <button 
                       onClick={() => setShowAddMini(true)} 
                       className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 font-bold border border-indigo-100 rounded-xl transition-all cursor-pointer shadow-sm"
                       title="Thêm nhanh mã so sánh"
                     >
                       <Plus size={13} />
                       <span>Thêm so sánh</span>
                     </button>
                   ) : (
                     <div className="inline-flex items-center gap-2 p-1.5 bg-indigo-50/50 border border-indigo-100 rounded-xl animate-fadeIn">
                       <input 
                         type="text" 
                         placeholder="MÃ CK" 
                         value={miniTicker}
                         onChange={(e) => setMiniTicker(e.target.value)}
                         className="w-20 px-2 py-1 text-[11px] font-bold bg-white border border-slate-200 rounded-lg uppercase focus:outline-none focus:border-indigo-400"
                       />
                       <div className="flex items-center gap-1">
                         <input 
                           type="number" 
                           placeholder="%" 
                           value={miniWeight}
                           onChange={(e) => setMiniWeight(Number(e.target.value))}
                           className="w-12 px-2 py-1 text-[11px] font-bold bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400"
                         />
                         <span className="text-[10px] font-bold text-slate-400">%</span>
                       </div>
                       <button 
                         onClick={handleDashboardAddStock}
                         className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-lg transition shadow-sm"
                       >
                         Thêm
                       </button>
                       <button 
                         onClick={() => { setShowAddMini(false); setMiniTicker(''); }}
                         className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-650"
                       >
                         <Plus size={12} className="rotate-45" />
                       </button>
                     </div>
                   )}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  title="Tổng lợi nhuận"
                  value={data.portfolioMetrics ? formatPercent(data.portfolioMetrics.cumulativeReturn) : '---'}
                  label={data.evaluation?.details?.cagr?.label || '---'}
                  message={`Benchmark: ${formatPercent(data.benchmarkMetrics?.cumulativeReturn || 0)}`}
                  status={data.evaluation?.details?.cagr?.status || 'neutral'}
                  description="Tổng mức sinh lời của danh mục trong toàn bộ khoảng thời gian phân tích."
                />
                <MetricCard 
                  title="CAGR"
                  value={data.portfolioMetrics ? formatPercent(data.portfolioMetrics.cagr) : '---'}
                  label={data.evaluation?.details?.cagr?.label || '---'}
                  message={`Benchmark: ${formatPercent(data.benchmarkMetrics?.cagr || 0)}`}
                  status={data.evaluation?.details?.cagr?.status || 'neutral'}
                  description="Tỷ lệ tăng trưởng kép hàng năm, cho biết mức lợi nhuận trung bình mỗi năm."
                />
                <MetricCard 
                  title="Volatility"
                  value={data.portfolioMetrics ? formatPercent(data.portfolioMetrics.volatility) : '---'}
                  label={data.evaluation?.details?.volatility?.label || '---'}
                  message={`Benchmark: ${formatPercent(data.benchmarkMetrics?.volatility || 0)}`}
                  status={data.evaluation?.details?.volatility?.status || 'neutral'}
                  icon={<Activity size={18} />}
                  description="Độ lệch chuẩn của tỷ suất sinh lời, đo lường mức độ rủi ro và biến động của danh mục."
                />
                <MetricCard 
                  title="Sharpe Ratio"
                  value={data.portfolioMetrics ? formatNum(data.portfolioMetrics.sharpe) : '---'}
                  label={data.evaluation?.details?.sharpe?.label || '---'}
                  message={`Benchmark: ${formatNum(data.benchmarkMetrics?.sharpe || 0)}`}
                  status={data.evaluation?.details?.sharpe?.status || 'neutral'}
                  icon={<ShieldCheck size={18} />}
                  description="Chỉ số đo lường lợi nhuận vượt trội trên mỗi đơn vị rủi ro. Càng cao càng tốt."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <MetricCard 
                    title="Sortino Ratio" 
                    value={formatNum(data.portfolioMetrics?.sortino)} 
                    message={`Benchmark: ${formatNum(data.benchmarkMetrics?.sortino || 0)}`}
                    status="neutral"
                    description="Đo lường lợi nhuận trên rủi ro chiều xuống (downside risk), bỏ qua biến động tích cực."
                 />
                 <MetricCard 
                    title="Max Drawdown" 
                    value={formatPercent(data.portfolioMetrics?.maxDrawdown)} 
                    message={`Benchmark: ${formatPercent(data.benchmarkMetrics?.maxDrawdown || 0)}`}
                    status={Math.abs(data.portfolioMetrics?.maxDrawdown || 0) > 0.3 ? 'red' : 'green'}
                    description="Mức sụt giảm lớn nhất từ đỉnh đến đáy của danh mục. Đo lường rủi ro 'tuyệt đỉnh' trong quá khứ."
                 />
                 <MetricCard 
                    title="VaR 95%" 
                    value={formatPercent(data.portfolioMetrics?.var95)} 
                    message={`Benchmark: ${formatPercent(data.benchmarkMetrics?.var95 || 0)}`}
                    status="neutral"
                    description="Mức lỗ tối đa dự kiến trong 1 ngày với xác suất 95%. Với 95% tin cậy, thiệt hại một ngày sẽ không vượt quá con số này."
                 />
                 <MetricCard 
                    title="CVaR 95%" 
                    value={formatPercent(data.portfolioMetrics?.cvar95)} 
                    message={`Benchmark: ${formatPercent(data.benchmarkMetrics?.cvar95 || 0)}`}
                    status="neutral"
                    description="Kỳ vọng tổn thất trung bình trong 5% trường hợp xấu nhất (đuôi rủi ro). Cho biết nếu xui xẻo vượt ngưỡng VaR, mức lỗ trung bình sẽ là bao nhiêu."
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <MetricCard 
                    title="Beta" 
                    value={formatNum(data.portfolioMetrics?.beta)} 
                    message={`Benchmark: 1.00`}
                    status="neutral"
                    description="Độ nhạy của danh mục so với thị trường. Beta > 1 nghĩa là danh mục biến động mạnh hơn thị trường."
                 />
                 <MetricCard 
                    title="Alpha" 
                    value={formatPercent(data.portfolioMetrics?.alpha)} 
                    message={`Benchmark: 0.00%`}
                    status={(data.portfolioMetrics?.alpha || 0) > 0 ? 'green' : 'red'}
                    description="Lợi nhuận vượt trội so với kỳ vọng (dựa trên rủi ro Beta). Alpha dương cho thấy kỹ năng quản lý tốt."
                 />
                 <MetricCard 
                    title="Tracking Error" 
                    value={formatPercent(data.portfolioMetrics?.trackingError)} 
                    message={`Benchmark: 0.00%`}
                    status="neutral"
                    description="Mức độ sai lệch giữa lợi nhuận danh mục và Benchmark. Càng thấp nghĩa là càng bám sát chỉ số tham chiếu."
                 />
                 <MetricCard 
                    title="Information Ratio" 
                    value={formatNum(data.portfolioMetrics?.informationRatio)} 
                    message={`Benchmark: 0.00`}
                    status={(data.portfolioMetrics?.informationRatio || 0) > 0 ? 'green' : 'red'}
                    description="Lợi nhuận vượt trội trên mỗi đơn vị rủi ro chủ động. Đo lường hiệu quả của việc đi ngược thị trường."
                 />
              </div>

              {/* So sánh In-Sample và Out-of-Sample */}
              {(() => {
                const getMonthDuration = (s: string, e: string): number => {
                  const d1 = new Date(s);
                  const d2 = new Date(e);
                  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
                };
                const monthsCount = getMonthDuration(startDate, endDate);

                return (
                  <div className="space-y-6">
                    {monthsCount < 9 && (
                      <div className="bg-rose-50/75 border border-rose-200/50 rounded-2xl p-5 text-rose-800 text-xs leading-relaxed flex items-start gap-3">
                        <span className="p-1 px-1.5 bg-rose-200/60 text-rose-800 rounded font-bold text-[9px] uppercase tracking-wider shrink-0 mt-0.5">LƯU Ý MẪU NGẮN</span>
                        <div>
                          <p className="font-bold text-rose-950 mb-0.5">Khoảng thời gian backtest quá ngắn ({monthsCount.toFixed(1)} tháng)!</p>
                          <p>Tổng khoảng thời gian backtest ít hơn 9 tháng. Việc tách chu kỳ và kiểm thử ngoài mẫu (Out-of-Sample - OOS) có thể thiếu độ tin cậy thống kê và dễ gặp hiện tượng quá khớp (overfitting) dữ liệu ngắn hạn.</p>
                        </div>
                      </div>
                    )}

                    {data.inSampleMetrics && data.outOfSampleMetrics && (
                      <div className="bg-gradient-to-br from-indigo-50/30 to-slate-50/50 border border-slate-200/60 rounded-3xl p-8 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Kiểm thử hai mẫu độc lập (In-Sample và Out-of-Sample)</h3>
                            <p className="text-xs text-slate-500 mt-1">
                              Mốc ranh giới phân tách (lùi về 6 tháng cuối): <span className="font-bold text-indigo-600 underline">{data.boundaryDate || 'Không xác định'}</span>
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 text-[11px] font-bold">
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              Trong mẫu (In-Sample - IS)
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 text-[11px] font-bold">
                              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                              Ngoài mẫu (Out-of-Sample - OOS)
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* In-Sample Card */}
                          <div className="bg-gradient-to-br from-indigo-50/30 to-indigo-50/10 rounded-2xl p-6 border border-indigo-100/80 shadow-sm space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-indigo-100/60">
                              <span className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                                Trong mẫu (In-Sample - IS)
                              </span>
                              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
                                Dữ liệu tối ưu hóa
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 bg-white border border-indigo-100/50 rounded-xl text-center shadow-xs">
                                <span className="text-[10px] text-indigo-600 font-bold block mb-1">CAGR IS</span>
                                <span className="text-base font-black text-indigo-950">{formatPercent(data.inSampleMetrics.cagr)}</span>
                                <span className="text-[9px] text-indigo-400 block mt-1 font-medium">Benchmark: {formatPercent(data.inSampleBenchmarkMetrics?.cagr || 0)}</span>
                              </div>
                              <div className="p-3 bg-white border border-indigo-100/50 rounded-xl text-center shadow-xs">
                                <span className="text-[10px] text-indigo-600 font-bold block mb-1">VOL IS</span>
                                <span className="text-base font-black text-indigo-950">{formatPercent(data.inSampleMetrics.volatility)}</span>
                                <span className="text-[9px] text-indigo-400 block mt-1 font-medium">Benchmark: {formatPercent(data.inSampleBenchmarkMetrics?.volatility || 0)}</span>
                              </div>
                              <div className="p-3 bg-white border border-indigo-100/50 rounded-xl text-center shadow-xs">
                                <span className="text-[10px] text-indigo-600 font-bold block mb-1">SHARPE IS</span>
                                <span className="text-base font-black text-indigo-950 font-mono">{formatNum(data.inSampleMetrics.sharpe)}</span>
                                <span className="text-[9px] text-indigo-400 block mt-1 font-medium">Benchmark: {formatNum(data.inSampleBenchmarkMetrics?.sharpe || 0)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Out-of-Sample Card */}
                          <div className="bg-gradient-to-br from-amber-50/40 to-amber-100/20 rounded-2xl p-6 border border-amber-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-amber-200/60">
                              <span className="font-bold text-amber-950 text-sm flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
                                Ngoài mẫu (Out-of-Sample - OOS)
                              </span>
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                                Thực nghiệm độc lập
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 bg-white border border-amber-200/50 rounded-xl text-center shadow-xs">
                                <span className="text-[10px] text-amber-700 font-bold block mb-1">CAGR OOS</span>
                                <span className="text-base font-black text-amber-950">{formatPercent(data.outOfSampleMetrics.cagr)}</span>
                                <span className="text-[9px] text-amber-500/80 block mt-1 font-medium">Benchmark: {formatPercent(data.outOfSampleBenchmarkMetrics?.cagr || 0)}</span>
                              </div>
                              <div className="p-3 bg-white border border-amber-200/50 rounded-xl text-center shadow-xs">
                                <span className="text-[10px] text-amber-700 font-bold block mb-1">VOL OOS</span>
                                <span className="text-base font-black text-amber-950">{formatPercent(data.outOfSampleMetrics.volatility)}</span>
                                <span className="text-[9px] text-amber-500/80 block mt-1 font-medium">Benchmark: {formatPercent(data.outOfSampleBenchmarkMetrics?.volatility || 0)}</span>
                              </div>
                              <div className="p-3 bg-white border border-amber-200/50 rounded-xl text-center shadow-xs">
                                <span className="text-[10px] text-amber-700 font-bold block mb-1">SHARPE OOS</span>
                                <span className="text-base font-black text-amber-950 font-mono">{formatNum(data.outOfSampleMetrics.sharpe)}</span>
                                <span className="text-[9px] text-amber-500/80 block mt-1 font-medium">Benchmark: {formatNum(data.outOfSampleBenchmarkMetrics?.sharpe || 0)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ghi chú phân tích overfitting */}
                        <div className="text-[11px] text-slate-500 leading-relaxed bg-white/50 border border-slate-200/40 p-4 rounded-xl">
                          <strong>Phân tích quá khớp (Overfitting):</strong> Nếu kết quả hiệu suất trong mẫu (In-Sample Sharpe đạt {formatNum(data.inSampleMetrics.sharpe)}) vượt xa đáng kể so với hiệu suất ngoài mẫu (Out-of-Sample Sharpe đạt {formatNum(data.outOfSampleMetrics.sharpe)}), danh mục có thể đang bị tối ưu quá đà trên dữ liệu quá khứ và khó duy trì kết quả sinh lời thực tế trong tương lai.
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="glass-card p-8 bg-white h-[500px]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                   <h3 className="font-bold text-slate-900">Lợi nhuận tích lũy (%)</h3>
                   <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#0ea5e9' }}></div>
                        <span>Danh mục - IS (Trong mẫu)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                        <span>Danh mục - OS (Ngoài mẫu)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#cc7871' }}></div>
                        <span>Benchmark đối chiếu</span>
                      </div>
                   </div>
                </div>
                <div className="h-[380px] w-full">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={splitChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        minTickGap={100}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickFormatter={(val) => `${val}%`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                        labelStyle={{ fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}
                        formatter={(value: number, name: string) => {
                          let label = name;
                          if (name === 'portfolio_is') label = 'Danh mục (Trong mẫu - IS)';
                          if (name === 'portfolio_oos') label = 'Danh mục (Ngoài mẫu - OS)';
                          if (name === 'benchmark') label = 'Benchmark';
                          return [`${value.toFixed(2)}%`, label];
                        }}
                      />
                      {data.boundaryDate && (
                        <ReferenceLine 
                          x={data.boundaryDate} 
                          stroke="#cbd5e1" 
                          strokeWidth={1.5} 
                          strokeDasharray="4 4" 
                          label={{ value: 'Ranh giới OOS', fill: '#64748b', fontSize: 9, position: 'top' }} 
                        />
                      )}
                      <Line type="monotone" dataKey="portfolio_is" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                      <Line type="monotone" dataKey="portfolio_oos" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                      <Line type="monotone" dataKey="benchmark" stroke="#cc7871" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="glass-card p-8 bg-white h-[400px] flex flex-col">
                    <h3 className="font-bold text-slate-900 text-center mb-8">Phân bổ danh mục</h3>
                    <div className="flex-1 min-h-[300px]">
                      <ResponsiveContainer width="100%" height={300}>
                        <RePieChart>
                          <Pie
                            data={portfolioItems}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="weight"
                            nameKey="ticker"
                          >
                            {portfolioItems.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#718a6e', '#abc0a7', '#eed98b', '#e29f95', '#f1f4f0'][index % 5]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
                 <div className="glass-card p-8 bg-white">
                    <h3 className="font-bold text-slate-900 mb-8">Ma trận tương quan</h3>
                    <div className="overflow-x-auto">
                       <table className="w-full text-sm">
                          <thead>
                             <tr className="text-slate-400 bg-slate-50">
                                <th className="p-3 text-left font-semibold border border-slate-100">Mã</th>
                                {portfolioItems.map(item => (
                                   <th key={item.ticker} className="p-3 text-center font-semibold border border-slate-100">{item.ticker}</th>
                                ))}
                             </tr>
                          </thead>
                          <tbody>
                             {portfolioItems.map((row, i) => (
                                <tr key={row.ticker}>
                                   <td className="p-3 font-bold text-slate-900 border border-slate-100 bg-white">{row.ticker}</td>
                                   {portfolioItems.map((col, j) => {
                                      const corr = data.correlationMatrix?.[normalizeTicker(row.ticker)]?.[normalizeTicker(col.ticker)] || (i === j ? 1 : 0.5);
                                      return (
                                         <td 
                                          key={col.ticker} 
                                          className={`p-3 text-center border border-slate-100 ${i === j ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'}`}
                                         >
                                            {corr?.toFixed(2) || '1.00'}
                                         </td>
                                      )
                                   })}
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {data && activeTab === 'evaluation' && (
            <motion.div 
              key="evaluation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 space-y-12 max-w-6xl"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900">Đánh Giá Danh Mục Đầu Tư</h2>
                <div className="flex items-center gap-2">
                  <p className="text-slate-500">Phân tích và nhận xét chi tiết hiệu quả danh mục của bạn bằng ngôn ngữ dễ hiểu.</p>
                  {isAiAnalysing && <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold animate-pulse">
                    <BrainCircuit size={12} /> AI đang phân tích...
                  </div>}
                </div>
              </div>

              {aiAnalysis && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Summary Card */}
                  <div className="p-10 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-[32px] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-indigo-400 opacity-20 group-hover:scale-110 transition-transform duration-700">
                      <Sparkles size={120} />
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                            <Bot size={24} className="text-indigo-300" />
                         </div>
                         <div>
                            <h3 className="text-xl font-bold">Cố vấn phân tích AI</h3>
                            <p className="text-indigo-300 text-xs font-medium uppercase tracking-widest">Phân tích chuyên sâu bằng Gemini AI</p>
                         </div>
                      </div>
                      
                      <div className="text-xl text-indigo-50 leading-relaxed font-medium">
                        {(() => {
                          try {
                            const parsed = JSON.parse(aiAnalysis);
                            return parsed.overallSummary;
                          } catch (e) {
                            return aiAnalysis;
                          }
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Metrics Insights */}
                  {(() => {
                    try {
                      const parsed = JSON.parse(aiAnalysis);
                      if (!parsed.metricInsights) return null;
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {parsed.metricInsights.map((insight: any, idx: number) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{insight.metric}</span>
                                <span className="text-lg font-black text-indigo-600">{insight.value}</span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                {insight.comment}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      );
                    } catch (e) {
                      return null;
                    }
                  })()}

                  {/* Advice & Comparison */}
                  {(() => {
                    try {
                      const parsed = JSON.parse(aiAnalysis);
                      return (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2 p-8 bg-indigo-50 border border-indigo-100 rounded-[32px] space-y-6">
                            <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                               <ShieldCheck size={20} className="text-indigo-500" /> Lời khuyên chiến lược
                            </h3>
                            <div className="space-y-4">
                              {parsed.strategicAdvice?.map((advice: string, idx: number) => (
                                <div key={idx} className="flex gap-4 items-start">
                                  <div className="mt-1 w-6 h-6 shrink-0 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                    {idx + 1}
                                  </div>
                                  <p className="text-indigo-800 font-medium leading-relaxed">{advice}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[32px] space-y-6">
                            <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                               <TrendingUp size={20} className="text-emerald-500" /> So với thị trường
                            </h3>
                            <p className="text-emerald-800 font-medium leading-relaxed">
                              {parsed.marketComparison}
                            </p>
                          </div>
                        </div>
                      );
                    } catch (e) {
                      return null;
                    }
                  })()}
                </motion.div>
              )}

              <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-4">
                 <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                    <Info size={18} /> Nhận xét tổng quan
                 </h3>
                 <p className="text-lg text-indigo-700 leading-relaxed font-medium">
                    {data.evaluation?.summary}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {Object.entries(data.evaluation?.details || {}).map(([key, detail]: [string, any]) => (
                   <div key={key} className={`p-8 border-l-4 rounded-2xl bg-white shadow-soft transition-all hover:-translate-y-1 ${
                     detail.status === 'green' ? 'border-emerald-500' :
                     detail.status === 'red' ? 'border-rose-500' :
                     'border-amber-500'
                   }`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-lg uppercase tracking-tight">
                             {key === 'cagr' ? 'Tỷ suất sinh lời kép (CAGR)' :
                              key === 'sharpe' ? 'Chỉ số Sharpe (Sharpe Ratio)' :
                              key === 'volatility' ? 'Hệ số biến động (Volatility)' :
                              key === 'maxDrawdown' ? 'Mức sụt giảm lớn nhất (Max Drawdown)' :
                              key === 'alpha' ? 'Hệ số Alpha (Alpha)' :
                              key === 'beta' ? 'Hệ số Beta (Beta)' :
                              key.toUpperCase()}
                           </h4>
                          <div className="text-3xl font-black text-slate-900">
                             {key === 'sharpe' ? formatNum(data.portfolioMetrics?.sharpe || 0) : 
                              key === 'cagr' ? formatPercent(data.portfolioMetrics?.cagr || 0) :
                              key === 'volatility' ? formatPercent(data.portfolioMetrics?.volatility || 0) :
                              key === 'maxDrawdown' ? formatPercent(data.portfolioMetrics?.maxDrawdown || 0) :
                              key === 'alpha' ? formatPercent(data.portfolioMetrics?.alpha || 0) :
                              formatNum(data.portfolioMetrics?.beta || 0)}
                          </div>
                        </div>
                        <span className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                           detail.status === 'green' ? 'bg-emerald-50 text-emerald-600' :
                           detail.status === 'red' ? 'bg-rose-50 text-rose-600' :
                           'bg-amber-50 text-amber-600'
                        }`}>
                           {detail.status === 'green' ? 'Tốt' : detail.status === 'red' ? 'Kém' : 'Trung bình'} {detail.label ? `• ${detail.label}` : ''}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{detail.message}</p>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {data && activeTab === 'simulation' && (
            <motion.div 
              key="simulation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 space-y-12 max-w-5xl"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900">Mô Phỏng Danh Mục</h2>
                <p className="text-slate-500">Kiểm tra tác động của việc thêm cổ phiếu mới vào danh mục hiện tại của bạn.</p>
              </div>

              <div className="glass-card p-10 bg-white space-y-8">
                 <h3 className="font-bold text-slate-900">Thêm cổ phiếu mới vào mô phỏng</h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mã cổ phiếu</label>
                       <input 
                        type="text" 
                        value={simTicker} 
                        onChange={(e) => setSimTicker(e.target.value)}
                        placeholder="Ví dụ: MWG.VN, FPT.VN"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-all font-bold uppercase"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Khối lượng (Số CP)</label>
                       <input 
                        type="number" 
                        min={1}
                        step={1}
                        value={simSharesInput} 
                        onChange={(e) => setSimSharesInput(e.target.value)}
                        placeholder="Ví dụ: 100"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 transition-all font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giá trị ước lượng</label>
                       <div className="w-full px-4 py-3 min-h-[52px] bg-slate-50 border border-slate-200 rounded-xl flex items-center font-bold text-slate-650">
                        {simQuote?.loading && simTicker.trim() ? (
                          <span className="text-slate-300 flex items-center gap-2 animate-pulse">
                            <RefreshCw size={14} className="animate-spin" /> Đang tải...
                          </span>
                        ) : simQuote && simTicker.trim() ? (
                          <span>{formatCurrency(parseShareInput(simSharesInput) * simQuote.price, simQuote.currency)}</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                       </div>
                    </div>
                    <div className="flex items-end gap-3 font-semibold">
                       <button 
                        onClick={handleAddSimStock}
                        className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 cursor-pointer"
                       >
                         Mô phỏng <Play size={16} fill="currentColor" />
                       </button>
                       {preSimData && (
                         <button 
                          onClick={handleResetSimulation}
                          className="px-6 py-4 bg-slate-100 text-slate-650 rounded-xl font-bold hover:bg-slate-200 transition-all cursor-pointer border border-slate-200/50"
                          title="Khôi phục danh mục gốc"
                         >
                           Đặt lại
                         </button>
                       )}
                    </div>

                    {(() => {
                      const target = normalizeTicker(simTicker.trim());
                      if (!target) return null;

                      return (
                        <div className="col-span-1 md:col-span-4 border-t border-slate-100 pt-5 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tỷ trọng dự kiến mới của từng cổ phiếu</span>
                              <h4 className="text-sm font-black text-slate-900">Danh mục sau khi thêm mã</h4>
                            </div>
                            <div className="md:text-right">
                              <div className="flex flex-wrap md:justify-end items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Giá trị danh mục dự kiến</span>
                                <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200">
                                  {(['VND', 'USD'] as const).map(currency => (
                                    <button
                                      key={currency}
                                      type="button"
                                      onClick={() => setDisplayCurrency(currency)}
                                      className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all ${
                                        displayCurrency === currency
                                          ? 'bg-white text-indigo-700 shadow-sm'
                                          : 'text-slate-400 hover:text-slate-700'
                                      }`}
                                    >
                                      {currency}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <span className="text-lg font-black text-slate-800">
                                {simProjection?.loading ? (
                                  <span className="text-slate-300 text-sm inline-flex items-center gap-2">
                                    <RefreshCw size={12} className="animate-spin" /> Đang tính...
                                  </span>
                                ) : simProjection ? (
                                  formatConvertedValue(simProjection.totalValueVND, displayCurrency)
                                ) : (
                                  '—'
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  <th className="px-4 py-3">Mã</th>
                                  <th className="px-4 py-3 text-right">Khối lượng</th>
                                  <th className="px-4 py-3 text-right">Giá trị quy đổi</th>
                                  <th className="px-4 py-3 text-right text-indigo-600">Tỷ trọng mới</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {simProjection?.loading ? (
                                  <tr>
                                    <td colSpan={4} className="px-4 py-4 text-sm font-bold text-slate-300">
                                      <span className="inline-flex items-center gap-2">
                                        <RefreshCw size={13} className="animate-spin" /> Đang tính tỷ trọng dự kiến...
                                      </span>
                                    </td>
                                  </tr>
                                ) : simProjection?.positions.length ? (
                                  simProjection.positions.map(position => (
                                    <tr key={position.ticker} className={position.ticker.trim().toUpperCase() === target.toUpperCase() ? 'bg-indigo-50/50' : ''}>
                                      <td className="px-4 py-3 font-black text-slate-900 uppercase">{position.ticker}</td>
                                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-650">{position.shares.toLocaleString('vi-VN')} CP</td>
                                      <td className="px-4 py-3 text-right font-bold text-slate-500">≈ {formatConvertedValue(position.valueVND, displayCurrency)}</td>
                                      <td className="px-4 py-3 text-right font-mono font-black text-indigo-700">{position.weight.toFixed(1)}%</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={4} className="px-4 py-4 text-sm font-bold text-slate-300">—</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                    
                    {simulatedStocks.length > 0 && (
                      <div className="col-span-1 md:col-span-4 pt-6 border-t border-slate-100/80 space-y-3">
                        <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest block">Danh sách mã đang mô phỏng ({simulatedStocks.length})</label>
                        <div className="flex flex-wrap gap-2.5">
                          {simulatedStocks.map(s => (
                            <span key={s.ticker} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-bold text-indigo-750 uppercase hover:bg-indigo-100/60 transition-all shadow-sm">
                              <span>{s.ticker} ({s.shares.toLocaleString('vi-VN')} CP, {s.weight.toFixed(1)}%)</span>
                              <button 
                                onClick={() => handleRemoveSimStock(s.ticker)} 
                                className="p-0.5 rounded-full hover:bg-rose-50 text-indigo-400 hover:text-rose-600 transition cursor-pointer"
                                title={`Xóa ${s.ticker}`}
                              >
                                <Plus size={14} className="rotate-45" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alert if asset already exists in original portfolio */}
                    {(() => {
                      const target = normalizeTicker(simTicker.trim());
                      if (!target) return null;
                      const baseItems = preSimData?.originalItems || portfolioItems;
                      const existingItem = baseItems.find((item: PortfolioItem) => item.ticker.trim().toUpperCase() === target);
                      if (existingItem) {
                        return (
                          <div className="col-span-1 md:col-span-4 p-5 bg-amber-50/60 border border-amber-200/40 rounded-2xl flex flex-col md:flex-row items-stretch md:items-start gap-4 animate-fadeIn">
                            <div className="p-2 h-fit w-fit rounded-xl bg-amber-500/10 text-amber-600 mt-0.5 shrink-0">
                              <Info size={18} />
                            </div>
                            <div className="space-y-3 flex-1">
                              <div className="space-y-1">
                                <p className="text-sm font-bold text-amber-950">
                                  Tài sản đã tồn tại trong danh mục ban đầu ({existingItem.ticker})
                                </p>
                                <p className="text-xs text-amber-700 leading-relaxed">
                                  Mã chứng khoán này hiện đang chiếm <span className="font-bold text-amber-900">{existingItem.weight}%</span> tỷ trọng.
                                  Mô phỏng sẽ dùng <span className="font-bold text-indigo-905">{parseShareInput(simSharesInput).toLocaleString('vi-VN')} cổ phiếu</span> làm khối lượng mới, sau đó tự tính lại tỷ trọng theo giá trị thị trường.
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="col-span-1 md:col-span-4 p-5 bg-indigo-50/60 border border-indigo-200/40 rounded-2xl flex flex-col md:flex-row items-stretch md:items-start gap-4 animate-fadeIn">
                            <div className="p-2 h-fit w-fit rounded-xl bg-indigo-500/10 text-indigo-600 mt-0.5 shrink-0">
                              <Info size={18} />
                            </div>
                            <div className="space-y-1 flex-1">
                              <p className="text-sm font-bold text-indigo-900">
                                Thêm tài sản mới hoàn toàn: <span className="font-mono bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-700">{target}</span>
                              </p>
                              <p className="text-xs text-indigo-750 leading-relaxed">
                                Mã này chưa tồn tại trong danh mục ban đầu. Mô phỏng sẽ thêm <span className="font-bold">{parseShareInput(simSharesInput).toLocaleString('vi-VN')} cổ phiếu</span>, định giá theo thị trường hiện tại và tự tính tỷ trọng mới cho toàn bộ danh mục.
                              </p>
                            </div>
                          </div>
                        );
                      }
                    })()}
                 </div>
              </div>

              {preSimData && !loading && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900">So sánh hiệu suất PnL</h3>
                    <div className="flex gap-4 text-xs font-bold font-sans">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#cc7871' }}></div>
                         <span>Danh mục hiện tại</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#718a6e' }}></div>
                         <span>Danh mục sau mô phỏng</span>
                       </div>
                    </div>
                  </div>

                  <div className="glass-card p-8 bg-white h-[400px]">
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={data.chartData.map((d: any, idx: number) => ({
                        ...d,
                        original: preSimData.chartData[idx]?.portfolio
                      }))}>
                        <defs>
                          <linearGradient id="colorOrig" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#cc7871" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#cc7871" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#718a6e" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#718a6e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          formatter={(v: number, name: string) => [
                            `${v.toFixed(2)}%`, 
                            name === 'portfolio' ? `Danh mục sau mô phỏng` : 'Danh mục hiện tại'
                          ]}
                        />
                        <Area type="monotone" dataKey="original" stroke="#cc7871" fillOpacity={1} fill="url(#colorOrig)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        <Area type="monotone" dataKey="portfolio" stroke="#718a6e" fillOpacity={1} fill="url(#colorSim)" strokeWidth={3} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { 
                        label: 'Tổng lợi nhuận (%)', 
                        before: preSimData.portfolioMetrics.cumulativeReturn * 100, 
                        after: data.portfolioMetrics.cumulativeReturn * 100, 
                        status: data.portfolioMetrics.cumulativeReturn >= preSimData.portfolioMetrics.cumulativeReturn ? 'better' : 'worse' 
                      },
                      { 
                        label: 'Biến động (Volatility) (%)',
                        before: preSimData.portfolioMetrics.volatility * 100, 
                        after: data.portfolioMetrics.volatility * 100, 
                        status: data.portfolioMetrics.volatility <= preSimData.portfolioMetrics.volatility ? 'better' : 'worse' 
                      },
                      { 
                        label: 'Sharpe Ratio', 
                        before: preSimData.portfolioMetrics.sharpe, 
                        after: data.portfolioMetrics.sharpe, 
                        status: data.portfolioMetrics.sharpe >= preSimData.portfolioMetrics.sharpe ? 'better' : 'worse' 
                      },
                      { 
                        label: 'Max Drawdown (%)', 
                        before: preSimData.portfolioMetrics.maxDrawdown * 100, 
                        after: data.portfolioMetrics.maxDrawdown * 100, 
                        status: Math.abs(data.portfolioMetrics.maxDrawdown) <= Math.abs(preSimData.portfolioMetrics.maxDrawdown) ? 'better' : 'worse' 
                      },
                    ].map((res, i) => (
                      <div key={i} className="glass-card p-6 bg-white flex flex-col gap-2 border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.label}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-slate-400 line-through text-xs">{res.before.toFixed(2)}</span>
                          <span className="text-lg font-bold text-slate-900">{res.after.toFixed(2)}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${res.status === 'better' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {res.status === 'better' ? 'Tốt hơn' : 'Kém hơn'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

               {preSimData && !loading && (
                 <>
                   <div className="space-y-8 animate-fade-in">
                     <h3 className="text-2xl font-bold text-slate-900 italic">Tỷ trọng dự kiến sau mô phỏng</h3>
                     <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
                       <table className="w-full text-left">
                         <thead>
                           <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest text-[11px]">
                             <th className="px-8 py-5">Mã cổ phiếu</th>
                             <th className="px-8 py-5">Tỷ trọng hiện tại</th>
                             <th className="px-8 py-5 text-indigo-600">Tỷ trọng mới</th>
                             <th className="px-8 py-5">Thay đổi</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                           {portfolioItems.map((item, idx) => {
                             const original = preSimData?.originalItems?.find((p: any) => p.ticker.trim().toUpperCase() === item.ticker.trim().toUpperCase());
                             const originalWeight = original ? original.weight : 0;
                             const diff = item.weight - originalWeight;
                             return (
                               <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-8 py-5 font-bold text-slate-900 uppercase tracking-tight">{item.ticker}</td>
                                 <td className="px-8 py-5 text-slate-500 font-medium">{originalWeight?.toFixed(1) || '0.0'}%</td>
                                 <td className="px-8 py-5 font-black text-indigo-600">{item.weight?.toFixed(1) || '0.0'}%</td>
                                 <td className={`px-8 py-5 font-bold ${diff > 0 ? 'text-emerald-500' : diff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                                   {diff > 0 ? '+' : ''}{diff?.toFixed(1) || '0.0'}%
                                 </td>
                               </tr>
                             );
                           })}
                         </tbody>
                       </table>
                     </div>
                   </div>

                   <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-indigo-900">Nhận xét tác động mô phỏng</h3>
                        <span className="px-3 py-1 bg-white rounded-full text-[11px] font-bold text-indigo-600 border border-indigo-100">Gợi ý</span>
                      </div>
                      <p className="text-indigo-700 leading-relaxed font-medium">
                        {(() => {
                          const baseItems = preSimData?.originalItems || portfolioItems;
                          const latestSimulatedStock = simulatedStocks[simulatedStocks.length - 1];
                          const target = latestSimulatedStock?.ticker || simTicker.trim().toUpperCase();
                          const targetWeight = latestSimulatedStock?.weight ?? portfolioItems.find(item => item.ticker.trim().toUpperCase() === target)?.weight ?? 0;
                          const targetShares = latestSimulatedStock?.shares ?? parseShareInput(simSharesInput);
                          const exists = baseItems.some((item: any) => item.ticker.trim().toUpperCase() === target);
                          const displayTicker = baseItems[0]?.ticker || 'FPT.VN';
                          
                          if (exists) {
                            return `Việc điều chỉnh khối lượng của ${target} thành ${targetShares.toLocaleString('vi-VN')} cổ phiếu khiến tỷ trọng mới xấp xỉ ${targetWeight.toFixed(1)}%, giúp tái cân bằng cấu trúc danh mục và quản trị rủi ro tổng quát so với phân bổ ban đầu.`;
                          } else {
                            return `Việc thêm ${targetShares.toLocaleString('vi-VN')} cổ phiếu ${target} khiến tỷ trọng mới xấp xỉ ${targetWeight.toFixed(1)}%, giúp đa dạng hóa rổ tài sản, song cần lưu ý độ tương quan hệ thống với các cổ phiếu xương sống sẵn có như ${displayTicker}.`;
                          }
                        })()}
                      </p>
                   </div>
                 </>
               )}
            </motion.div>
          )}

          {data && activeTab === 'optimization' && (
            <motion.div 
              key="optimization"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-12 space-y-12 max-w-5xl"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900">Tối Ưu Hóa Danh Mục</h2>
                <p className="text-slate-500">Tìm kiếm tỷ trọng phân bổ vốn tối ưu cho danh mục của bạn.</p>
              </div>

              <div className="glass-card p-10 bg-white space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                      onClick={() => setOptTarget('sharpe')}
                      className={`p-8 border-2 rounded-3xl relative group cursor-pointer transition-all ${
                        optTarget === 'sharpe' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200'
                      }`}
                    >
                       <ShieldCheck className={optTarget === 'sharpe' ? 'text-indigo-600 mb-4' : 'text-slate-400 mb-4'} size={32} />
                       <h4 className="font-bold text-slate-900 text-lg">Tối đa Sharpe Ratio</h4>
                       <p className="text-slate-500 text-sm">Lợi nhuận trên rủi ro cao nhất</p>
                       {optTarget === 'sharpe' && (
                         <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            <CheckCircle2 size={16} />
                         </div>
                       )}
                    </div>
                    <div 
                      onClick={() => setOptTarget('volatility')}
                      className={`p-8 border-2 rounded-3xl relative group cursor-pointer transition-all ${
                        optTarget === 'volatility' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200'
                      }`}
                    >
                       <Activity className={optTarget === 'volatility' ? 'text-indigo-600 mb-4' : 'text-slate-400 mb-4'} size={32} />
                       <h4 className="font-bold text-slate-900 text-lg">Tối thiểu hóa biến động (Volatility)</h4>
                       <p className="text-slate-500 text-sm">Mức độ rủi ro thấp nhất</p>
                       {optTarget === 'volatility' && (
                         <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            <CheckCircle2 size={16} />
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">Ràng buộc tỷ trọng (%)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tối thiểu mỗi mã</label>
                          <input 
                            type="number" 
                            value={optConstraints.min} 
                            onChange={(e) => setOptConstraints({ ...optConstraints, min: Number(e.target.value) })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tối đa mỗi mã</label>
                          <input 
                            type="number" 
                            value={optConstraints.max} 
                            onChange={(e) => setOptConstraints({ ...optConstraints, max: Number(e.target.value) })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" 
                          />
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={handleOptimize}
                  disabled={loading}
                  className={`w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                  }`}
                 >
                    {loading ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} />
                        Đang tối ưu...
                      </>
                    ) : (
                      'Chạy tối ưu hóa'
                    )}
                 </button>
              </div>

              {preOptData && !loading && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-slate-900">Kết quả Tối ưu</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { 
                        label: 'CAGR (%)', 
                        before: preOptData.portfolioMetrics.cagr * 100, 
                        after: data.portfolioMetrics.cagr * 100, 
                        status: data.portfolioMetrics.cagr >= preOptData.portfolioMetrics.cagr ? 'better' : 'worse' 
                      },
                      { 
                        label: 'Biến động (Volatility) (%)',
                        before: preOptData.portfolioMetrics.volatility * 100, 
                        after: data.portfolioMetrics.volatility * 100, 
                        status: data.portfolioMetrics.volatility <= preOptData.portfolioMetrics.volatility ? 'better' : 'worse' 
                      },
                      { 
                        label: 'Sharpe Ratio', 
                        before: preOptData.portfolioMetrics.sharpe, 
                        after: data.portfolioMetrics.sharpe, 
                        status: data.portfolioMetrics.sharpe >= preOptData.portfolioMetrics.sharpe ? 'better' : 'worse' 
                      },
                      { 
                        label: 'Max Drawdown (%)', 
                        before: preOptData.portfolioMetrics.maxDrawdown * 100, 
                        after: data.portfolioMetrics.maxDrawdown * 100, 
                        status: Math.abs(data.portfolioMetrics.maxDrawdown) <= Math.abs(preOptData.portfolioMetrics.maxDrawdown) ? 'better' : 'worse' 
                      },
                    ].map((res, i) => (
                      <div key={i} className="glass-card p-6 bg-white flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.label}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-slate-400 line-through text-sm">{res.before.toFixed(2)}</span>
                          <span className="text-xl font-bold text-slate-900">{res.after.toFixed(2)}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${res.status === 'better' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {res.status === 'better' ? 'Tốt hơn' : 'Kém hơn'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-slate-900">So sánh hiệu suất PnL (Tối ưu hóa)</h3>
                      <div className="flex gap-4 text-xs font-bold">
                         <div className="flex items-center gap-2">
                           <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#cc7871' }}></div>
                           <span>Trước tối ưu</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <div className="w-3 h-1 rounded-full" style={{ backgroundColor: '#718a6e' }}></div>
                           <span>Sau tối ưu</span>
                         </div>
                      </div>
                    </div>

                    <div className="glass-card p-8 bg-white h-[400px]">
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={data.chartData.map((d: any, idx: number) => ({
                          date: d.date,
                          original: preOptData?.chartData?.[idx]?.portfolio ?? 0,
                          optimized: d.portfolio
                        }))}>
                          <defs>
                            <linearGradient id="colorOrigOpt" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#cc7871" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#cc7871" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#718a6e" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#718a6e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="date" hide />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(v: number, name: string) => [
                              `${v.toFixed(2)}%`, 
                              name === 'optimized' ? 'Sau tối ưu' : 'Trước tối ưu'
                            ]}
                          />
                          <Area type="monotone" dataKey="original" stroke="#cc7871" fillOpacity={1} fill="url(#colorOrigOpt)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                          <Area type="monotone" dataKey="optimized" stroke="#718a6e" fillOpacity={1} fill="url(#colorOptimized)" strokeWidth={3} dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Chi tiết thay đổi tỷ trọng</h3>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                            <th className="px-8 py-5">Mã cổ phiếu</th>
                            <th className="px-8 py-5">Tỷ trọng ban đầu</th>
                            <th className="px-8 py-5 text-indigo-600">Tỷ trọng tối ưu</th>
                            <th className="px-8 py-5">Thay đổi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {portfolioItems.map((item, idx) => {
                            const original = preOptData?.originalItems?.find((p: any) => p.ticker === item.ticker);
                            const originalWeight = original ? original.weight : 0;
                            const diff = item.weight - originalWeight;
                            return (
                              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5 font-bold text-slate-900 uppercase tracking-tight">{item.ticker}</td>
                                <td className="px-8 py-5 text-slate-500 font-medium">{originalWeight?.toFixed(1)}%</td>
                                <td className="px-8 py-5 font-black text-indigo-600">{item.weight?.toFixed(1)}%</td>
                                <td className={`px-8 py-5 font-bold ${diff > 0 ? 'text-emerald-500' : diff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                                  {diff > 0 ? '+' : ''}{diff?.toFixed(1)}%
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <RefreshCw className="text-indigo-600 animate-spin" size={48} />
              <div className="text-center">
                <p className="font-bold text-slate-900 text-xl tracking-tight">Đang tính toán ma lực tài chính...</p>
                <p className="text-slate-400 text-sm">Vui lòng chờ trong giây lát</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
