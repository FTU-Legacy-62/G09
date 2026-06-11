export interface PortfolioItem {
  ticker: string;
  weight: number; // 0 to 100
  shares?: number; // quantity of shares / khối lượng
}

export interface AnalysisRequest {
  tickers: string[];
  weights: number[];
  startDate: string;
  endDate: string;
  benchmark: string;
  riskFreeRate: number;
}

export interface MetricDetail {
  status: 'red' | 'yellow' | 'orange' | 'green' | 'neutral';
  label: string;
  message: string;
}

export interface PortfolioMetrics {
  cumulativeReturn: number;
  cagr: number;
  volatility: number;
  sharpe: number;
  sortino: number;
  maxDrawdown: number;
  var95: number;
  cvar95: number;
  beta: number;
  alpha: number;
  trackingError: number;
  informationRatio: number;
  correlation: number;
  years: number;
}

export interface AnalysisResponse {
  portfolioMetrics: PortfolioMetrics;
  benchmarkMetrics: Partial<PortfolioMetrics>;
  inSampleMetrics?: PortfolioMetrics | null;
  outOfSampleMetrics?: PortfolioMetrics | null;
  inSampleBenchmarkMetrics?: Partial<PortfolioMetrics> | null;
  outOfSampleBenchmarkMetrics?: Partial<PortfolioMetrics> | null;
  boundaryDate?: string | null;
  assetMetrics: Record<string, { cagr: number; volatility: number; sharpe: number }>;
  correlationMatrix: Record<string, Record<string, number>>;
  evaluation: {
    overallRating: string;
    summary: string;
    details: {
      cagr: MetricDetail;
      sharpe: MetricDetail;
      volatility: MetricDetail;
      maxDrawdown: MetricDetail;
    };
  };
  chartData: {
    date: string;
    portfolio: number;
    benchmark: number;
  }[];
}
