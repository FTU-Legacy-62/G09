import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MetricCardProps {
  title: string;
  value: string | number;
  label?: string;
  message: string;
  status: 'red' | 'yellow' | 'orange' | 'green' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, label, message, status, icon, description }) => {
  const statusConfig = {
    red: { border: 'border-rose-100', text: 'text-rose-600', bg: 'bg-rose-50', badge: 'bg-rose-100 text-rose-700' },
    orange: { border: 'border-amber-100', text: 'text-amber-600', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
    yellow: { border: 'border-amber-100', text: 'text-amber-600', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
    green: { border: 'border-emerald-100', text: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
    neutral: { border: 'border-slate-100', text: 'text-indigo-600', bg: 'bg-indigo-50/30', badge: 'bg-indigo-50 text-indigo-700' },
  };

  const config = statusConfig[status];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-8 glass-card border-none transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 relative",
      )}
    >
      {/* Decorative background circle with its own overflow clipping */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-110 transition-transform", config.bg)}></div>
      </div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 min-h-[20px]">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{title}</h3>
            {description && (
              <div className="group/tooltip relative inline-block">
                <div className="p-1 -m-1 cursor-help">
                  <Info size={12} className="text-slate-300 hover:text-indigo-500 transition-colors" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[280px] p-3.5 bg-slate-900/95 backdrop-blur-md text-white text-[11px] rounded-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 shadow-2xl pointer-events-none font-medium leading-relaxed text-center">
                  {description}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900/95"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={cn("p-2 rounded-xl shrink-0", config.bg, config.text)}>
          {icon || <AlertCircle size={14} />}
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight">{value}</span>
          {label && (
            <span className={cn("text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-lg", config.badge)}>
              {label}
            </span>
          )}
        </div>
        <p className="text-[11px] leading-relaxed font-medium text-slate-400 capitalize">{message}</p>
      </div>
    </motion.div>
  );
};
