import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Sparkles, Lock, Mail, Building, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ initialMode = 'login' }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();
  const { loginWithDemo, loginWithSupabase, signUpWithSupabase, isSupabaseActive } = useAuth();

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithDemo();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        await signUpWithSupabase(email, password, { facility_name: facilityName });
        setSuccessMsg('Account registered! Signing you into the command center...');
        setTimeout(() => navigate('/onboarding'), 1000);
      } else {
        await loginWithSupabase(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. You can also use the Demo login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-eco-600 to-cyber-400 flex items-center justify-center shadow-glow-emerald">
              <Activity className="w-5 h-5 text-obsidian-950 stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-2xl text-white">EcoPulse AI</span>
          </Link>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {isSignUp ? 'Create Facility Account' : 'Welcome to Command Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {isSignUp 
              ? 'Connect utility telemetry meters & initiate real-time AI anomaly audits' 
              : 'Sign in to monitor real-time resource telemetry and active remediations'}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl space-y-6">
          
          {/* Quick Demo Access Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-eco-950/70 via-slate-900 to-cyber-950/70 border border-eco-500/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-eco-400 uppercase tracking-wider block">
                  Instant Facility Access
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Demo facility with pre-populated telemetry & anomalies
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-sm shrink-0 transition-transform active:scale-95"
              >
                1-Click Demo
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[11px] font-mono text-slate-500 uppercase">Or Supabase Auth</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isSignUp && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Facility Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="e.g. Apex Innovation Tower"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@facility.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 hover:bg-white text-obsidian-950 flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-50"
            >
              <span>{isSignUp ? 'Register & Continue to Onboarding' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Toggle between Login and Signup */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-xs text-slate-400 hover:text-eco-400 transition-colors"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have a facility account? Register here"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
