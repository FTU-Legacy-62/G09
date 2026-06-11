import React, { useState } from 'react';
import { Plus, Trash2, ChevronRight, RefreshCw, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioFormProps {
  items: PortfolioItem[];
  setItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  displayCurrency: 'VND' | 'USD';
  setDisplayCurrency: React.Dispatch<React.SetStateAction<'VND' | 'USD'>>;
  benchmark: string;
  setBenchmark: (val: string) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  onSubmit: (data?: any) => void;
  loading: boolean;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({ 
  items, 
  setItems, 
  displayCurrency,
  setDisplayCurrency,
  benchmark, 
  setBenchmark, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate, 
  onSubmit, 
  loading 
}) => {
  const [isCustomBenchmark, setIsCustomBenchmark] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Cache for stock prices: { [ticker]: { price, currency, loading, error } }
  const [priceCache, setPriceCache] = useState<Record<string, { price: number; currency: string; loading?: boolean; error?: boolean }>>({});

  const benchmarks = [
    { label: 'VN-Index (VNM Proxy)', value: 'VNM' },
    { label: 'S&P 500 ETF (SPY)', value: 'SPY' },
    { label: 'MSCI Emerging Markets (EEM)', value: 'EEM' },
  ];

  const isVNStock = (ticker: string) => {
    if (!ticker) return false;
    const t = ticker.trim().toUpperCase();
    if (t === 'VNINDEX' || t === '^VNINDEX' || t === 'VNM') {
      return false;
    }
    if (t.endsWith('.VN')) return true;
    if (!t.includes('.') && !t.startsWith('^') && !t.includes('=') && !t.includes('-')) {
      if (t.length === 3 || t.startsWith('FUE') || t.startsWith('E1VF')) {
        return true;
      }
    }
    return false;
  };

  const getRecommendation = () => {
    const validItems = items.filter(item => item.ticker && item.ticker.trim());
    if (validItems.length === 0) return 'EEM';
    
    const hasVN = validItems.some(item => isVNStock(item.ticker));
    const hasForeign = validItems.some(item => !isVNStock(item.ticker));
    
    if (hasVN && !hasForeign) {
      return 'VNM';
    }
    if (!hasVN && hasForeign) {
      return 'SPY';
    }
    return 'EEM';
  };

  const recommendedVal = getRecommendation();
  const isCurrentlyRecommended = benchmark === recommendedVal;

  const fetchPrice = async (ticker: string) => {
    const cleanTicker = ticker.trim().toUpperCase();
    if (!cleanTicker) return;
    if (priceCache[cleanTicker]?.price !== undefined && !priceCache[cleanTicker]?.error) return; // Already cached

    setPriceCache(prev => ({
      ...prev,
      [cleanTicker]: { price: 0, currency: '', loading: true }
    }));

    try {
      const res = await fetch(`/api/price?ticker=${encodeURIComponent(cleanTicker)}`);
      if (!res.ok) throw new Error("Price not found");
      const data = await res.json();
      setPriceCache(prev => ({
        ...prev,
        [cleanTicker]: { price: data.price, currency: data.currency, loading: false }
      }));
    } catch (e) {
      console.error(`Failed to fetch price for ${cleanTicker}`, e);
      const isVN = isVNStock(cleanTicker);
      setPriceCache(prev => ({
        ...prev,
        [cleanTicker]: {
          price: isVN ? 135000 : 150, // default fallback during error
          currency: isVN ? 'VND' : 'USD',
          loading: false,
          error: true
        }
      }));
    }
  };

  // USD to VND conversion rate for mixing stocks on a single base
  const USD_VND_RATE = 25400;

  const getPriceAndCurrency = (ticker: string) => {
    const clean = ticker.trim().toUpperCase();
    const cached = priceCache[clean];
    if (cached && !cached.loading) {
      return { price: cached.price, currency: cached.currency, loading: false };
    }
    const isVN = isVNStock(ticker);
    return {
      price: isVN ? 135000 : 150,
      currency: isVN ? 'VND' : 'USD',
      loading: cached?.loading ?? true
    };
  };

  // Pre-calculate prices and weights
  const itemsWithValues = items.map(item => {
    const { price, currency, loading } = getPriceAndCurrency(item.ticker);
    const sharesNum = Number(item.shares ?? 0);
    const itemValue = sharesNum * price;
    const valInVND = currency === 'USD' ? itemValue * USD_VND_RATE : itemValue;

    return {
      ...item,
      shares: sharesNum,
      price,
      currency,
      itemValue,
      valInVND,
      loading
    };
  });

  const totalValueVND = itemsWithValues.reduce((acc, item) => acc + item.valInVND, 0);

  // Compute normalized weights out of 100%
  const recalculatedItems = itemsWithValues.map(item => {
    const computedWeight = totalValueVND > 0 
      ? Number(((item.valInVND / totalValueVND) * 100).toFixed(1))
      : 0;
    return {
      ...item,
      weight: computedWeight
    };
  });

  // Math rounding correction to ensure the sum is exactly 100.0%
  const currentTotalWeight = recalculatedItems.reduce((acc, i) => acc + i.weight, 0);
  const diffFrom100 = 100 - currentTotalWeight;
  if (Math.abs(diffFrom100) > 0.01 && recalculatedItems.length > 0) {
    let maxIdx = 0;
    let maxW = -1;
    recalculatedItems.forEach((item, idx) => {
      if (item.weight > maxW) {
        maxW = item.weight;
        maxIdx = idx;
      }
    });
    recalculatedItems[maxIdx].weight = Number((recalculatedItems[maxIdx].weight + diffFrom100).toFixed(1));
  }

  // Pre-fetch prices of existing items on change
  React.useEffect(() => {
    items.forEach(item => {
      const clean = item.ticker.trim().toUpperCase();
      if (clean && !priceCache[clean]) {
        fetchPrice(item.ticker);
      }
    });
  }, [items]);

  // Sync weights to parent state without forcing the quantity field while the user is editing.
  React.useEffect(() => {
    let needsUpdate = false;
    const nextItems = items.map((item, idx) => {
      const recalc = recalculatedItems[idx];
      const weightVal = recalc ? recalc.weight : item.weight;

      if (Math.abs(item.weight - weightVal) > 0.05) {
        needsUpdate = true;
      }
      return {
        ...item,
        weight: weightVal
      };
    });

    if (needsUpdate) {
      setItems(nextItems);
    }
  }, [items, priceCache]);

  const handleAddItem = () => {
    setItems([...items, { ticker: '', weight: 0, shares: 100 }]);
  };

  const handleRemoveItem = (index: number) => {
    const remainingItems = items.filter((_, i) => i !== index);
    setItems(remainingItems);
  };

  const handleChange = (index: number, field: 'ticker' | 'shares', value: string | number) => {
    const nextItems = items.map((item, idx) => {
      if (idx === index) {
        if (field === 'shares') {
          return { ...item, shares: value === '' ? undefined : Math.max(0, Math.floor(Number(value))) };
        }
        return { ...item, [field]: value };
      }
      return item;
    });

    if (field === 'ticker') {
      const clean = String(value).trim().toUpperCase();
      if (clean && !priceCache[clean]) {
        fetchPrice(clean);
      }
    }

    setItems(nextItems);
  };

  const displayTotalValue = () => {
    const validItems = items.filter(item => item.ticker.trim() !== '');
    if (validItems.length === 0) return displayCurrency === 'VND' ? '0 VND' : '$0.00 USD';
    if (displayCurrency === 'VND') {
      return `${totalValueVND.toLocaleString('vi-VN')} VND`;
    }

    const totalUSD = totalValueVND / USD_VND_RATE;
    return `$${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return `≈ $${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} USD`;
    }
    return `≈ ${amount.toLocaleString('vi-VN')} VND`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const validItems = items.map(i => ({
      ticker: i.ticker.trim().toUpperCase(),
      weight: Number(i.weight),
      shares: Number(i.shares ?? 0)
    }));

    if (validItems.some(i => !i.ticker)) {
      setLocalError("Vui lòng nhập đầy đủ mã cổ phiếu.");
      return;
    }

    if (validItems.some(i => i.shares <= 0)) {
      setLocalError("Khối lượng cổ phiếu phải lớn hơn 0.");
      return;
    }

    if (!benchmark.trim()) {
      setLocalError("Vui lòng nhập benchmark.");
      return;
    }

    onSubmit({
      tickers: validItems.map(i => i.ticker),
      weights: validItems.map(i => i.weight),
      benchmark: benchmark.trim(),
      startDate,
      endDate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {localError && (
        <div id="portfolio-form-error" className="bg-rose-50 border border-slate-100 p-4 rounded-2xl text-rose-700 text-xs font-bold flex justify-between items-center animate-fadeIn shadow-sm">
          <span className="flex items-center gap-2">⚠️ {localError}</span>
          <button type="button" onClick={() => setLocalError(null)} className="text-slate-400 hover:text-slate-600 font-bold ml-4">
            Đóng
          </button>
        </div>
      )}
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Danh sách cổ phiếu</h3>
        
        {/* PC and Mobile columns header labels */}
        <div className="hidden sm:flex items-center gap-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
          <div className="flex-1">Mã cổ phiếu</div>
          <div className="w-32 text-right">Khối lượng (Số CP)</div>
          <div className="w-48 text-right">Giá trị ước lượng</div>
          <div className="w-16 text-right font-mono">Tỷ trọng</div>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const clean = item.ticker.trim().toUpperCase();
            const { price, currency, loading } = getPriceAndCurrency(item.ticker);
            const sharesVal = Number(item.shares ?? 0);
            const itemVal = sharesVal * price;

            return (
              <div key={index} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center group bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:border-indigo-200 focus-within:bg-white transition-all shadow-sm">
                
                {/* Ticker Input */}
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 sm:hidden">Mã cổ phiếu</label>
                  <input
                    type="text"
                    placeholder="Ticker (e.g. FPT)"
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-300 focus:outline-none font-bold uppercase tracking-tight text-sm"
                    value={item.ticker}
                    onChange={(e) => handleChange(index, 'ticker', e.target.value)}
                    onBlur={() => fetchPrice(item.ticker)}
                  />
                </div>

                {/* Shares quantity input */}
                <div className="w-full sm:w-32 flex items-center shrink-0">
                  <div className="w-full">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 sm:hidden">Khối lượng</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        placeholder="Số CP"
                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-300 focus:outline-none font-mono font-bold text-left sm:text-right text-sm"
                        value={item.shares ?? ''}
                        onChange={(e) => handleChange(index, 'shares', e.target.value === '' ? '' : Number(e.target.value))}
                      />
                      <span className="text-slate-400 font-bold text-xs shrink-0 select-none">CP</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Value */}
                <div className="sm:w-48 shrink-0">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 sm:hidden">Giá trị hiện tại</label>
                  <span className="text-xs font-bold text-slate-600 block sm:text-right">
                    {loading && clean ? (
                      <span className="text-slate-300 flex items-center justify-start sm:justify-end gap-1 px-1 animate-pulse">
                        <RefreshCw size={10} className="animate-spin" /> Đang tải...
                      </span>
                    ) : clean ? (
                      formatCurrency(itemVal, currency)
                    ) : (
                      '—'
                    )}
                  </span>
                </div>

                {/* Real-time calculated percent */}
                <div className="sm:w-16 shrink-0">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 sm:hidden font-mono">Tỷ trọng</label>
                  <span className="text-xs font-black text-indigo-600 block sm:text-right font-mono">
                    {loading && clean ? (
                      <span className="text-slate-300">...</span>
                    ) : clean ? (
                      `${(item.weight ?? 0).toFixed(1)}%`
                    ) : (
                      '0.0%'
                    )}
                  </span>
                </div>

                {/* Remove button */}
                <div className="flex justify-end sm:justify-center w-full sm:w-10">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all sm:opacity-0 sm:group-hover:opacity-100"
                    title="Xóa mã này"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-[13px] hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Thêm tài sản mới
        </button>

        {/* 📚 Hướng dẫn nhập mã chứng khoán (1.1) */}
        <div className="bg-gradient-to-br from-indigo-50/40 to-slate-50 border border-slate-200/50 rounded-2xl p-5 text-slate-600 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div className="font-bold flex items-center gap-2 text-xs uppercase tracking-wider text-slate-800">
            <span className="p-1 px-1.5 bg-indigo-100 text-indigo-700 rounded text-[9px] font-black">INFO</span>
            Hướng dẫn định dạng mã chứng khoán:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed">
            <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <span className="font-semibold text-slate-900 block">📌 Cổ phiếu Việt Nam:</span>
              <span>Ứng dụng hỗ trợ các mã cổ phiếu trên sàn Việt Nam (HOSE, HNX, UPCOM). Bạn có thể nhập mã 3 chữ cái viết liền (VD: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">FPT</span>, <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">HPG</span>) hoặc nhập đầy đủ với hậu tố <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">.VN</span> (VD: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">FPT.VN</span>, <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">HPG.VN</span>).</span>
            </div>
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <span className="font-semibold text-slate-900 block">📌 Cổ phiếu Quốc tế:</span>
              <span>Ứng dụng hỗ trợ đầy đủ mã cổ phiếu toàn cầu từ Yahoo Finance. Nhập trực tiếp mã ticker của cổ phiếu Mỹ (VD: <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">AAPL</span>, <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">MSFT</span>, <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold">TSLA</span>). Bạn hoàn toàn có thể <strong>trộn lẫn cổ phiếu Việt Nam và Quốc tế</strong> trong cùng một danh mục để tối ưu hóa hiệu quả phân bổ tài sản!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-sans">Benchmark đối chiếu</label>
            <button
              type="button"
              onClick={() => {
                setIsCustomBenchmark(false);
                setBenchmark(recommendedVal);
              }}
              title="Đề xuất benchmark phù hợp tự động dựa theo phân bổ tài sản hiện tại của danh mục"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ${
                isCurrentlyRecommended 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-200 active:scale-95 cursor-pointer'
              }`}
            >
              <span>💡 Đề xuất: {recommendedVal === 'VNM' ? 'VN-Index (VNM)' : recommendedVal === 'SPY' ? 'S&P 500 (SPY)' : 'MSCI (EEM)'}</span>
              {isCurrentlyRecommended && <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-md font-black">Mặc định</span>}
            </button>
          </div>
          <div className="relative">
            <select
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-2xl focus:outline-none focus:border-indigo-400 appearance-none transition-all"
              value={isCustomBenchmark ? 'custom' : benchmark}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustomBenchmark(true);
                } else {
                  setIsCustomBenchmark(false);
                  setBenchmark(e.target.value);
                }
              }}
            >
              {benchmarks.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
          {isCustomBenchmark && (
            <input
              type="text"
              placeholder="Yahoo Finance ticker..."
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-400 font-mono text-sm uppercase"
              value={benchmark}
              onChange={(e) => setBenchmark(e.target.value)}
            />
          )}


        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-sans">Từ ngày</label>
            <input
              type="date"
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-2xl focus:outline-none focus:border-indigo-400 transition-all text-xs"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-sans">Đến ngày</label>
            <input
              type="date"
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-2xl focus:outline-none focus:border-indigo-400 transition-all text-xs"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 📊 Dòng tổng kết danh mục đầu tư */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-indigo-950 opacity-50 pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block">Tổng giá trị danh mục</span>
            <div className="inline-flex rounded-full bg-white/10 p-1 border border-white/10">
              {(['VND', 'USD'] as const).map(currency => (
                <button
                  key={currency}
                  type="button"
                  onClick={() => setDisplayCurrency(currency)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                    displayCurrency === currency
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight block">
            {displayTotalValue()}
          </span>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Tổng tỷ trọng</span>
            <span className="text-2xl font-black text-emerald-400 tracking-tight block font-mono">
              100.0%
            </span>
          </div>
          <div className="h-10 w-px bg-slate-800 hidden sm:block" />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-10 py-4 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-indigo-600 active:scale-95 disabled:bg-slate-850 disabled:text-slate-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-950/40 text-xs cursor-pointer"
          >
            {loading ? (
               <RefreshCw className="animate-spin" size={16} />
            ) : (
              <>Phân tích ngay <ArrowRight size={16}/></>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
