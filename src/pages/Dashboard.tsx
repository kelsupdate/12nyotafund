import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeApplications, setActiveApplications] = useState(0);
  const [approvedApplications, setApprovedApplications] = useState(0);
  const [totalFunded, setTotalFunded] = useState(0);

  useEffect(() => {
    // Check if there's an active application in localStorage
    const applicationData = localStorage.getItem('applicationData');
    const selectedPackage = localStorage.getItem('selectedPackage');
    const mpesaMessage = localStorage.getItem('mpesaMessage');

    if (applicationData && selectedPackage && mpesaMessage) {
      setActiveApplications(1); // User has completed the application process
      // Keep approved as 0 - application is pending approval
      // Set undisbursed amount to the loan amount
      const pkg = JSON.parse(selectedPackage);
      setTotalFunded(pkg.loanAmount);
    }
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleApplications = () => {
    const applicationData = localStorage.getItem('applicationData');
    if (applicationData) {
      navigate('/tracking-dashboard');
    } else {
      navigate('/application-form');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-red-50 min-h-screen flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nyotafund.png"
              alt="NYOTA FUND"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-green-700">OKASH LOANS</h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-green-700 transition-colors font-medium">
                Dashboard
              </a>
              <button
                onClick={handleApplications}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Applications
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Profile
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center"
          >
            <Menu className="w-6 h-6 text-green-700" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 flex flex-col gap-3">
            <a href="#" className="text-gray-700 hover:text-green-700 transition-colors font-medium">
              Dashboard
            </a>
            <button
              onClick={handleApplications}
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              Applications
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors font-medium w-full justify-center"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="flex-grow px-6 py-12 fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-green-700 mb-4 tracking-wide">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-600 text-lg">
              Manage your funding applications and business ventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Active Applications</h3>
              <p className="text-4xl font-bold text-green-700">{activeApplications}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-red-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pending Approval</h3>
              <p className="text-4xl font-bold text-red-600">{activeApplications}</p>
              <p className="text-sm text-red-600 mt-2">Application under review</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Undisbursed</h3>
              <p className="text-4xl font-bold text-gray-600">KES {totalFunded.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">Awaiting approval</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Start Your Journey</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ready to apply for funding? Click the button below to start your application process.
              Our team is ready to help you turn your business vision into reality.
            </p>
            <button
              onClick={() => navigate('/application-form')}
              className="bg-gradient-to-r from-green-600 to-red-500 hover:from-red-500 hover:to-green-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
            >
              Start New Application
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">OKASH LOANS</span>. All rights reserved.
      </footer>
    </div>
  );
}
