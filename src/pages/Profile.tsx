import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  idNumber: string;
  dateOfBirth: string;
  phone: string;
  maritalStatus: string;
  loanType: string;
  isCitizen: boolean;
  county: string;
  earnings: number;
}

export function Profile() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('applicationData');
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
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
            <h1 className="text-xl font-bold text-green-700">TALA HELA</h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <button
                onClick={handleDashboard}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={handleApplications}
                className="text-gray-700 hover:text-green-700 transition-colors font-medium"
              >
                Applications
              </button>
              <button
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
            <button
              onClick={handleDashboard}
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={handleApplications}
              className="text-gray-700 hover:text-green-700 transition-colors font-medium"
            >
              Applications
            </button>
            <button
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

      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">User Profile</h2>

          {formData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <p><strong>Full Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>ID Number:</strong> {formData.idNumber}</p>
                  <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
                  <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
                  <p><strong>Loan Type:</strong> {formData.loanType}</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Citizenship:</strong> {formData.isCitizen ? 'Kenyan' : 'Non-Kenyan'}</p>
                  {formData.isCitizen && <p><strong>County:</strong> {formData.county}</p>}
                  <p><strong>Monthly Earnings:</strong> KES {formData.earnings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Profile Information</h3>
              <p className="text-gray-600 mb-6">Complete your application to view your profile information.</p>
              <button
                onClick={() => navigate('/application-form')}
                className="bg-gradient-to-r from-green-600 to-red-500 hover:from-red-500 hover:to-green-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
              >
                Start Application
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">TALA HELA</span>. All rights reserved.
      </footer>
    </div>
  );
}
