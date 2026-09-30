import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Leaf, Droplets, TrendingUp, Sparkles, ArrowRight, Building, Gauge } from 'lucide-react';

export default function SavingsCalculator() {
  const [sqft, setSqft] = useState(85000);
  const [facilityType, setFacilityType] = useState('office');
  const [powerCost, setPowerCost] = useState(0.16); // $/kWh

  const multipliers = {
    office: { rate: 0.72, carbonRate: 1.15, waterRate: 4.8, baseScore: 68 },
    industrial: { rate: 1.15, carbonRate: 2.10, waterRate: 7.2, baseScore: 62 },
    healthcare: { rate: 1.40, carbonRate: 2.45, waterRate: 9.6, baseScore: 59 },
    retail: { rate: 0.65, carbonRate: 0.95, waterRate: 3.4, baseScore: 71 },
    education: { rate: 0.58, carbonRate: 0.88, waterRate: 4.2, baseScore: 74 },
  };

  const currentMultiplier = multipliers[facilityType] || multipliers.office;

  // Real-time calculations
  const annualSavingsUsd = Math.round(sqft * currentMultiplier.rate * (powerCost / 0.14));
  const annualCarbonTons = Math.round((sqft * currentMultiplier.carbonRate * 0.001) * 10) / 10;
  const annualWaterKl = Math.round((sqft * currentMultiplier.waterRate * 0.001) * 10) / 10;
  const potentialScore = Math.min(96, currentMultiplier.baseScore + 24);
  const paybackMonths = Math.max(1.8, Math.round((2800 / (annualSavingsUsd / 12)) * 10) / 10);

  return (
    <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-eco-500/10 filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyber-500/10 filter blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-eco-500/10 text-eco-400 border border-eco-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive ROI & Carbon Forecaster</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Calculate Your Facility's Untapped Savings
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            See how much energy leakage, off-hour water weep, and peak demand charges EcoPulse AI can eliminate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Facility Type Selector */}
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2">
                Facility Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'office', label: 'Commercial Office' },
                  { id: 'industrial', label: 'Manufacturing' },
                  { id: 'healthcare', label: 'Hospital / Clinic' },
                  { id: 'retail', label: 'Retail Mall' },
                  { id: 'education', label: 'Campus' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFacilityType(item.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
                      facilityType === item.id
                        ? 'bg-gradient-to-r from-eco-500 to-cyber-500 text-obsidian-950 shadow-md font-bold'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Square Footage Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                  Total Floor Area (Sq Ft)
                </label>
                <span className="font-display font-bold text-lg text-eco-400">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-eco-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>10,000 sq ft</span>
                <span>250,000 sq ft</span>
                <span>500,000+ sq ft</span>
              </div>
            </div>

            {/* Utility Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                  Blended Electricity Tariff ($/kWh)
                </label>
                <span className="font-mono font-bold text-sm text-slate-200">
                  ${powerCost.toFixed(2)} / kWh
                </span>
              </div>
              <input
                type="range"
                min="0.08"
                max="0.35"
                step="0.01"
                value={powerCost}
                onChange={(e) => setPowerCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyber-500"
              />
            </div>

          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-700/60 shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Projected Annual Operational Recapture
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-eco-400 via-emerald-300 to-cyber-400">
                  ${annualSavingsUsd.toLocaleString()}
                </span>
                <span className="text-slate-400 font-medium text-sm">/ year</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Derived from AI HVAC deadband correction, peak demand shaving, and continuous water leak resolution.
              </p>
            </div>

            {/* Impact Metric Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-cyber-400 font-mono">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Carbon Abated</span>
                </div>
                <p className="font-display font-bold text-xl text-white mt-1">
                  {annualCarbonTons} <span className="text-xs font-normal text-slate-400">Tons CO2e</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-eco-400 font-mono">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Water Saved</span>
                </div>
                <p className="font-display font-bold text-xl text-white mt-1">
                  {annualWaterKl} <span className="text-xs font-normal text-slate-400">kL / yr</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Payback Period</span>
                </div>
                <p className="font-display font-bold text-xl text-white mt-1">
                  {paybackMonths} <span className="text-xs font-normal text-slate-400">Months</span>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Target Score</span>
                </div>
                <p className="font-display font-bold text-xl text-white mt-1">
                  {potentialScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                </p>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to="/onboarding"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 flex items-center justify-center gap-2 shadow-glow-emerald transition-all transform hover:scale-[1.01]"
              >
                <span>Deploy Free Audit On Your Facility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                No meter rewiring required. Plug-and-play BACnet, Modbus, & CSV telemetry ingest.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
