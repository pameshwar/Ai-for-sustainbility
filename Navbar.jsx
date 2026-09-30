import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Layers, 
  BarChart3, 
  CheckSquare, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  Building2, 
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ score = 71 }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, facility } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [facilityDropdownOpen, setFacilityDropdownOpen] = useState(false);

  const isLanding = location.pathname === '/';
  const isAuth = location.pathname.startsWith('/auth');

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Telemetry', path: '/telemetry', icon: BarChart3 },
    { name: 'Action Plan', path: '/action-plan', icon: CheckSquare },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-emerald-400 bg-emerald-950/80 border-emerald-500/30';
    if (val >= 60) return 'text-amber-400 bg-amber-950/80 border-amber-500/30';
    return 'text-rose-400 bg-rose-950/80 border-rose-500/30';
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-eco-600 via-eco-500 to-cyber-400 flex items-center justify-center shadow-glow-emerald transition-transform group-hover:scale-105">
              <Activity className="w-5 h-5 text-obsidian-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-white">EcoPulse</span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold bg-cyber-500/10 text-cyber-400 border border-cyber-500/20">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 hidden sm:block tracking-wider uppercase font-medium">Resource Anomaly Assistant</p>
            </div>
          </Link>

          {/* Navigation Links for Authenticated / App pages */}
          {!isLanding && !isAuth && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'text-eco-400 bg-eco-950/60 border border-eco-500/30 shadow-sm' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-eco-400' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Landing Page Nav Links */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-eco-400 transition-colors">Capabilities</a>
              <a href="#calculator" className="hover:text-eco-400 transition-colors">ROI Calculator</a>
              <a href="#how-it-works" className="hover:text-eco-400 transition-colors">Architecture</a>
              <a href="#pricing" className="hover:text-eco-400 transition-colors">Pricing</a>
            </nav>
          )}

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* EcoPulse Score Live Pill (When logged in) */}
            {!isLanding && !isAuth && (
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${getScoreColor(score)}`}>
                <div className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>EcoPulse:</span>
                <span className="font-mono text-sm">{score}/100</span>
              </div>
            )}

            {/* Facility Selector Dropdown (When logged in) */}
            {!isLanding && !isAuth && (
              <div className="relative">
                <button
                  onClick={() => setFacilityDropdownOpen(!facilityDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 hover:border-slate-600 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-eco-400" />
                  <span className="font-medium max-w-[120px] truncate">{facility?.name || 'Metropolis Tower'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {facilityDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-panel rounded-xl shadow-xl p-3 border border-slate-700/80 z-50 animate-in fade-in zoom-in-95">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Facility</p>
                    <div className="p-2.5 rounded-lg bg-eco-950/40 border border-eco-500/20 mb-2">
                      <p className="text-sm font-bold text-white">{facility?.name || 'Metropolis Tower One'}</p>
                      <p className="text-xs text-slate-400">{facility?.type || 'Commercial Office'} • 75,000 sq ft</p>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-eco-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>3 Telemetry Meters Online</span>
                      </div>
                    </div>
                    <Link
                      to="/onboarding"
                      onClick={() => setFacilityDropdownOpen(false)}
                      className="block text-center w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    >
                      + Onboard New Facility
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Auth CTA Buttons */}
            {isLanding && (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald transition-all transform hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Live App</span>
                </Link>
              </div>
            )}

            {/* Logout button when in app */}
            {!isLanding && !isAuth && (
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                title="Sign Out"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {!isLanding && !isAuth ? (
            <>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'text-eco-400 bg-eco-950/60' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
              >
                <Building2 className="w-4 h-4 text-eco-400" />
                Facility Onboarding
              </Link>
            </>
          ) : (
            <>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300">Capabilities</a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300">ROI Calculator</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300">Pricing</a>
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/auth/login" className="text-center py-2 rounded-lg bg-slate-800 text-sm font-medium">Sign In</Link>
                <Link to="/dashboard" className="text-center py-2 rounded-lg bg-eco-500 text-obsidian-950 font-semibold text-sm">Launch Live App</Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
