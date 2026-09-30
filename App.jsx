import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Telemetry from './pages/Telemetry';
import ActionPlan from './pages/ActionPlan';
import Reports from './pages/Reports';

export default function App() {
  const [globalScore, setGlobalScore] = useState(71);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 font-sans selection:bg-eco-500 selection:text-white">
          <Navbar score={globalScore} />
          
          <main className="flex-1">
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Authentication */}
              <Route path="/auth/login" element={<Login initialMode="login" />} />
              <Route path="/auth/signup" element={<Login initialMode="signup" />} />

              {/* Facility Onboarding Wizard */}
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Central Sustainability Command Center */}
              <Route 
                path="/dashboard" 
                element={<Dashboard onScoreUpdate={setGlobalScore} />} 
              />

              {/* Resource Telemetry Explorer */}
              <Route path="/telemetry" element={<Telemetry />} />

              {/* Prioritized AI Action Checklist */}
              <Route 
                path="/action-plan" 
                element={<ActionPlan onScoreUpdate={setGlobalScore} />} 
              />

              {/* Executive Reports */}
              <Route path="/reports" element={<Reports />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
