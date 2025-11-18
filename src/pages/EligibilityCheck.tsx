import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanNotification } from '../components/LoanNotification';

export function EligibilityCheck() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate CRB check with progress counter
    const duration = 12000; // 12 seconds
    const interval = 120; // Update every 120ms for smooth progress
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.round(newProgress));

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => navigate('/loan-packages'), 500); // Small delay after reaching 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-red-50 min-h-screen flex flex-col">
      <LoanNotification />
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nyotafund.png"
              alt="OKASH LOANS"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-green-700">OKASH LOANS</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Checking Eligibility</h2>
          <p className="text-gray-600 mb-4">Please wait while we verify your information with CRB...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-green-600 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{progress}% Complete</p>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">OKASH LOANS</span>. All rights reserved.
      </footer>
    </div>
  );
}
