import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Zap, Droplets, Trash2, Calendar, Filter } from 'lucide-react';

export default function TelemetryChart({ telemetryData = [], onInjectSpike }) {
  const [selectedDomain, setSelectedDomain] = useState('energy_hvac');
  const [chartType, setChartType] = useState('area'); // 'area' | 'bar'
  const [timeRange, setTimeRange] = useState('7d');

  // Filter telemetry by domain
  const filtered = telemetryData.filter(d => d.resource_type === selectedDomain);

  // Format data for Recharts
  const chartData = (filtered.length ? filtered : []).map(item => {
    const dateObj = new Date(item.recorded_at);
    return {
      timestamp: item.recorded_at,
      displayTime: dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
                   dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      value: Number(item.metric_value),
      unit: item.metric_unit,
      isSimulated: item.metadata?.simulated_event || false,
      note: item.metadata?.note || ''
    };
  });

  const domainConfigs = {
    energy_hvac: {
      name: 'Energy (HVAC & Power)',
      unit: 'kWh',
      icon: Zap,
      color: '#f59e0b',
      gradientId: 'gradEnergy',
      baseline: 300
    },
    water_plumbing: {
      name: 'Water & Plumbing Flow',
      unit: 'Liters',
      icon: Droplets,
      color: '#06b6d4',
      gradientId: 'gradWater',
      baseline: 650
    },
    waste_management: {
      name: 'Solid Waste Stream',
      unit: 'kg',
      icon: Trash2,
      color: '#10b981',
      gradientId: 'gradWaste',
      baseline: 40
    }
  };

  const activeConfig = domainConfigs[selectedDomain] || domainConfigs.energy_hvac;

  // Custom Glassmorphic Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="glass-panel p-3.5 rounded-xl border border-slate-700 shadow-2xl text-xs max-w-xs">
          <p className="font-mono text-slate-400 mb-1">{dataPoint.displayTime}</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeConfig.color }} />
            <span className="text-slate-200 font-medium">{activeConfig.name}:</span>
            <span className="font-display font-bold text-base text-white">
              {dataPoint.value} {dataPoint.unit}
            </span>
          </div>
          {dataPoint.isSimulated && (
            <div className="mt-2 p-1.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[11px] font-semibold">
              ⚠️ Injected Anomaly: {dataPoint.note || 'Off-Hours Spike'}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl glass-card">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span>Resource Telemetry Time-Series</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Live Stream
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous submeter ingestion with AI anomaly detection thresholds.
          </p>
        </div>

        {/* Domain Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(domainConfigs).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const isSelected = selectedDomain === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedDomain(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-100 text-obsidian-950 shadow-md font-bold'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isSelected ? '#000' : cfg.color }} />
                <span>{cfg.unit}</span>
              </button>
            );
          })}

          {/* Quick Simulation Injector Button */}
          {onInjectSpike && (
            <button
              onClick={() => onInjectSpike(selectedDomain)}
              title="Inject a realistic telemetry anomaly spike to test AI detection"
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1"
            >
              <span>+ Inject Spike</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={activeConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeConfig.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={activeConfig.color} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="displayTime" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                minTickGap={40}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                unit={` ${activeConfig.unit}`} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={activeConfig.color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${activeConfig.gradientId})`}
                activeDot={{ r: 6, fill: activeConfig.color, stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="displayTime" stroke="#64748b" fontSize={11} tickLine={false} minTickGap={40} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit={` ${activeConfig.unit}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={activeConfig.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer stats below chart */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: activeConfig.color }} />
            <span>Monitored Sensor: Primary Submeter Riser</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-500">•</span>
            <span>Sampling: Every 60 Minutes</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType('area')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium ${chartType === 'area' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Area View
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium ${chartType === 'bar' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Bar View
          </button>
        </div>
      </div>
    </div>
  );
}
