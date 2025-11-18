import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface Package {
  name: string;
  savings: number;
  loanAmount: number;
  description: string;
}

export function TrackingDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loanStatus, setLoanStatus] = useState<'Pending' | 'Disbursed'>('Pending');

  useEffect(() => {
    const data = localStorage.getItem('applicationData');
    if (data) {
      setFormData(JSON.parse(data));
    }
    const pkg = localStorage.getItem('selectedPackage');
    if (pkg) {
      setSelectedPackage(JSON.parse(pkg));
    }
    // Loan status remains pending
  }, []);

  if (!formData || !selectedPackage) {
    return <div>Loading...</div>;
  }

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
        </div>
      </header>

      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Loan Tracking Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Details</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>ID Number:</strong> {formData.idNumber}</p>
                <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
                <p><strong>Loan Type:</strong> {formData.loanType}</p>
                {formData.isCitizen && <p><strong>County:</strong> {formData.county}</p>}
                <p><strong>Monthly Earnings:</strong> KES {formData.earnings.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Loan Details</h3>
              <div className="space-y-2">
                <p><strong>Package:</strong> {selectedPackage.name}</p>
                <p><strong>Loan Amount:</strong> KES {selectedPackage.loanAmount.toLocaleString()}</p>
                <p><strong>Savings Paid:</strong> KES {selectedPackage.savings.toLocaleString()}</p>
                <p><strong>Status:</strong>
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                    loanStatus === 'Disbursed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {loanStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
            <p className="text-gray-600 mb-4">
              {loanStatus === 'Disbursed'
                ? 'Your loan has been disbursed! You will receive a confirmation SMS shortly.'
                : 'Your application is being processed. We will notify you once the loan is disbursed.'
              }
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-green-600 to-red-500 hover:from-red-500 hover:to-green-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
            >
              Back to Dashboard
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
