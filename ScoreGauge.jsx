import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function ScoreGauge({ score = 71, previousScore = 65, size = 180 }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  let color = {
    stroke: '#10b981',
    gradientStart: '#10b981',
    gradientEnd: '#06b6d4',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/30',
    status: 'Optimal Efficiency',
    icon: ShieldCheck
  };

  if (progress < 60) {
    color = {
      stroke: '#f43f5e',
      gradientStart: '#f43f5e',
      gradientEnd: '#fb7185',
      text: 'text-rose-400',
      bg: 'bg-rose-950/40',
      border: 'border-rose-500/30',
      status: 'High Inefficiency / Critical Leakage',
      icon: AlertCircle
    };
  } else if (progress < 80) {
    color = {
      stroke: '#f59e0b',
      gradientStart: '#f59e0b',
      gradientEnd: '#fbbf24',
      text: 'text-amber-400',
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/30',
      status: 'Moderate Inefficiencies Detected',
      icon: AlertTriangle
    };
  }

  const Icon = color.icon;
  const delta = score - previousScore;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div 
        className="absolute w-44 h-44 rounded-full filter blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: color.stroke }}
      />

      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <defs>
            <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color.gradientStart} />
              <stop offset="100%" stopColor={color.gradientEnd} />
            </linearGradient>
          </defs>

          {/* Background circle track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="11"
            className="text-slate-800/80"
            fill="transparent"
          />

          {/* Animated active progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#scoreGaugeGrad)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Value Display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-display font-extrabold text-4xl text-white tracking-tight">
            {score}
          </span>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest -mt-0.5">
            / 100
          </span>
          {delta !== 0 && (
            <div className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{delta} pts</span>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Status Tag */}
      <div className={`mt-4 px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 text-xs font-semibold ${color.text} ${color.bg} ${color.border}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{color.status}</span>
      </div>

      <p className="text-xs text-slate-400 text-center mt-2.5 max-w-[240px]">
        Dynamic AI rating calibrated across Energy, Water, and Solid Waste telemetry streams.
      </p>
    </div>
  );
}
