import React from 'react';
import { Zap, Droplets, Trash2, Leaf, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function MetricCard({
  category = 'energy_hvac',
  title = 'Energy Consumption',
  value = '462.8',
  unit = 'kWh',
  trend = '+14.2%',
  trendDirection = 'up',
  status = 'Spike Alert',
  statusType = 'warning',
  subtext = 'Peak load during off-hours'
}) {
  const config = {
    energy_hvac: {
      icon: Zap,
      accentColor: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderGlow: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/20 text-amber-400',
      badge: 'Energy / HVAC'
    },
    water_plumbing: {
      icon: Droplets,
      accentColor: 'text-cyber-400',
      bgGlow: 'bg-cyber-500/10',
      borderGlow: 'hover:border-cyber-500/40',
      iconBg: 'bg-cyber-500/20 text-cyber-400',
      badge: 'Water / Plumbing'
    },
    waste_management: {
      icon: Trash2,
      accentColor: 'text-eco-400',
      bgGlow: 'bg-eco-500/10',
      borderGlow: 'hover:border-eco-500/40',
      iconBg: 'bg-eco-500/20 text-eco-400',
      badge: 'Solid Waste'
    },
    carbon_offset: {
      icon: Leaf,
      accentColor: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderGlow: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      badge: 'Carbon Footprint'
    }
  };

  const active = config[category] || config.energy_hvac;
  const Icon = active.icon;

  const isWarning = statusType === 'warning' || statusType === 'danger';

  return (
    <div className={`p-5 rounded-2xl glass-card transition-all relative overflow-hidden group ${active.borderGlow}`}>
      {/* Subtle top indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isWarning ? 'bg-amber-500' : 'bg-eco-500'}`} />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider block">
              {active.badge}
            </span>
            <h3 className="text-sm font-semibold text-white -mt-0.5">{title}</h3>
          </div>
        </div>

        {/* Status Pill */}
        <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border ${
          isWarning 
            ? 'bg-amber-950/70 border-amber-500/30 text-amber-400' 
            : 'bg-emerald-950/70 border-emerald-500/30 text-emerald-400'
        }`}>
          {isWarning ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
          <span>{status}</span>
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display font-bold text-3xl text-white tracking-tight">
          {value}
        </span>
        <span className="text-sm font-medium text-slate-400">{unit}</span>

        {/* Trend Indicator */}
        <div className={`ml-auto flex items-center gap-1 text-xs font-semibold ${
          trendDirection === 'down' ? 'text-emerald-400' : 'text-rose-400'
        }`}>
          {trendDirection === 'down' ? (
            <TrendingDown className="w-3.5 h-3.5" />
          ) : (
            <TrendingUp className="w-3.5 h-3.5" />
          )}
          <span>{trend}</span>
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-400 truncate">{subtext}</p>
    </div>
  );
}
