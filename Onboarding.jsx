import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Layers, 
  Clock, 
  Target, 
  Zap, 
  Droplets, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setFacility } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    facility_name: 'Pacific Heights Tower',
    facility_type: 'Commercial Office',
    square_footage: 65000,
    operating_hours: '08:00 - 18:00 (Mon-Fri)',
    target_goals: ['Reduce Peak Demand', 'Eliminate Leaks'],
    meters: {
      energy: true,
      water: true,
      waste: true
    },
    baseline_energy_kwh: 380,
    baseline_water_liters: 720,
    baseline_waste_kg: 140
  });

  const availableGoals = [
    { id: 'Reduce Peak Demand', label: 'Reduce Peak Demand', desc: 'Prevent expensive 15-minute utility demand ratchet penalties' },
    { id: 'Eliminate Leaks', label: 'Eliminate Leaks', desc: 'Identify off-hour zero-flow violations in cooling towers & risers' },
    { id: 'Improve Recycling Ratio', label: 'Improve Recycling Ratio', desc: 'Boost cardboard & clean plastics diversion to 65%+' },
    { id: 'Net Zero Carbon', label: 'Net Zero Carbon Roadmap', desc: 'Align facility telemetry with GHG Protocol Scope 1 & 2 targets' }
  ];

  const handleGoalToggle = (goalId) => {
    setFormData(prev => {
      const exists = prev.target_goals.includes(goalId);
      return {
        ...prev,
        target_goals: exists 
          ? prev.target_goals.filter(g => g !== goalId)
          : [...prev.target_goals, goalId]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create seed baseline telemetry items for immediate visualization
      const now = Date.now();
      const baselineTelemetry = [];

      for (let i = 48; i >= 0; i--) {
        const time = new Date(now - i * 3600000);
        const hour = time.getHours();
        const isWork = hour >= 8 && hour <= 18;

        baselineTelemetry.push({
          resource_type: 'energy_hvac',
          metric_value: isWork ? Number(formData.baseline_energy_kwh) + (Math.random() * 80) : 180 + (Math.random() * 40),
          metric_unit: 'kWh',
          recorded_at: time.toISOString()
        });

        baselineTelemetry.push({
          resource_type: 'water_plumbing',
          metric_value: isWork ? Number(formData.baseline_water_liters) + (Math.random() * 180) : 210 + (Math.random() * 50),
          metric_unit: 'Liters',
          recorded_at: time.toISOString()
        });

        baselineTelemetry.push({
          resource_type: 'waste_management',
          metric_value: hour === 19 ? Number(formData.baseline_waste_kg) : 10,
          metric_unit: 'kg',
          recorded_at: time.toISOString()
        });
      }

      await api.saveOnboarding({
        facility_name: formData.facility_name,
        facility_type: formData.facility_type,
        square_footage: Number(formData.square_footage),
        operating_hours: formData.operating_hours,
        target_goals: formData.target_goals,
        baseline_telemetry: baselineTelemetry
      });

      setFacility({
        name: formData.facility_name,
        type: formData.facility_type,
        area: `${Number(formData.square_footage).toLocaleString()} sq ft`
      });

      // Generate initial AI assessment automatically!
      await api.triggerAudit();

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 max-w-3xl mx-auto">
      
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-eco-400 uppercase tracking-widest block mb-1">
          Facility Setup Wizard
        </span>
        <h1 className="font-display font-extrabold text-3xl text-white">
          Configure Your Facility & Resource Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Calibrate facility dimensions, meter ingestion channels, and sustainability reduction targets.
        </p>

        {/* Step Indicator */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {[
            { num: 1, label: 'Profile' },
            { num: 2, label: 'Goals & Meters' },
            { num: 3, label: 'Baselines' }
          ].map(s => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num
                  ? 'bg-gradient-to-r from-eco-500 to-cyber-500 text-obsidian-950 shadow-glow-emerald'
                  : step > s.num
                  ? 'bg-eco-950 text-eco-400 border border-eco-500/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}>
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${step === s.num ? 'text-white' : 'text-slate-500'}`}>
                {s.label}
              </span>
              {s.num < 3 && <div className="w-6 sm:w-10 h-0.5 bg-slate-800" />}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Wizard Form Card */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl">
        
        {/* STEP 1: Facility Profile Metadata */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-eco-400" />
                <span>Facility Metadata & Geometry</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter building identifiers and primary operating schedules.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Facility Name</label>
              <input
                type="text"
                required
                value={formData.facility_name}
                onChange={(e) => setFormData({ ...formData, facility_name: e.target.value })}
                placeholder="e.g. Metropolis Tower One"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Industry / Facility Type</label>
                <select
                  value={formData.facility_type}
                  onChange={(e) => setFormData({ ...formData, facility_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm bg-slate-900 text-white"
                >
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Industrial Manufacturing">Industrial Manufacturing</option>
                  <option value="Retail Center">Retail Center</option>
                  <option value="Healthcare">Healthcare & Hospital</option>
                  <option value="Educational Campus">Educational Campus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Total Area (Square Feet)</label>
                <input
                  type="number"
                  required
                  min="500"
                  value={formData.square_footage}
                  onChange={(e) => setFormData({ ...formData, square_footage: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">Standard Operating Hours</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.operating_hours}
                  onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
                  placeholder="e.g. 08:00 - 18:00 (Mon-Fri)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Gemini uses operating hours to detect off-hours HVAC cycling and overnight water leaks.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald flex items-center gap-2"
              >
                <span>Next: Goals & Meter Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Target Goals & Meter Connections */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-eco-400" />
                <span>Target Sustainability Objectives</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your facility's priority reduction targets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableGoals.map(goal => {
                const isSelected = formData.target_goals.includes(goal.id);
                return (
                  <div
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-eco-950/60 border-eco-500/60 shadow-glow-emerald'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-sm text-white">{goal.label}</span>
                      <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-eco-400' : 'text-slate-600'}`} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{goal.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="font-display font-semibold text-sm text-white mb-3">
                Telemetry Meter Interfaces To Activate
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'energy', label: 'Energy (kWh)', icon: Zap, color: 'text-amber-400' },
                  { key: 'water', label: 'Water (Liters)', icon: Droplets, color: 'text-cyber-400' },
                  { key: 'waste', label: 'Waste (kg)', icon: Trash2, color: 'text-eco-400' },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <div key={m.key} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${m.color}`} />
                      <span className="text-xs font-semibold text-slate-200">{m.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald flex items-center gap-2"
              >
                <span>Next: Baseline Calibration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Baseline Readings Calibration */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-eco-400" />
                <span>Baseline Telemetry Calibration</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure baseline average usage metrics. EcoPulse AI uses these benchmarks to train anomaly sensitivity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Average Working-Hour Energy Draw</span>
                  </label>
                  <span className="font-mono text-sm font-bold text-white">
                    {formData.baseline_energy_kwh} kWh
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="10"
                  value={formData.baseline_energy_kwh}
                  onChange={(e) => setFormData({ ...formData, baseline_energy_kwh: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-cyber-400 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4" />
                    <span>Average Working-Hour Water Consumption</span>
                  </label>
                  <span className="font-mono text-sm font-bold text-white">
                    {formData.baseline_water_liters} Liters/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={formData.baseline_water_liters}
                  onChange={(e) => setFormData({ ...formData, baseline_water_liters: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyber-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-eco-400 flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4" />
                    <span>Average Daily Solid Waste Generation</span>
                  </label>
                  <span className="font-mono text-sm font-bold text-white">
                    {formData.baseline_waste_kg} kg / day
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="600"
                  step="10"
                  value={formData.baseline_waste_kg}
                  onChange={(e) => setFormData({ ...formData, baseline_waste_kg: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-eco-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-eco-950/40 border border-eco-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-eco-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                Clicking <strong>Complete Onboarding</strong> creates your facility profile in Supabase PostgreSQL, seeds telemetry readings, and runs the initial Google Gemini 2.5 sustainability audit.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald flex items-center gap-2 disabled:opacity-50 transition-all transform hover:scale-[1.02]"
              >
                <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Initializing Facility Telemetry...' : 'Complete Onboarding & Run AI Audit'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
