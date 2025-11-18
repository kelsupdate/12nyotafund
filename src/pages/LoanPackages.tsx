import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanNotification } from '../components/LoanNotification';

interface FormData {
  name: string;
  phone: string;
  maritalStatus: string;
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

export function LoanPackages() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('applicationData');
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const packages: Package[] = [
    {
      name: 'Package 1',
      savings: 100,
      loanAmount: 1500,
      description: 'Flexible terms • Fast approval'
    },
    {
      name: 'Package 2',
      savings: 150,
      loanAmount: 2500,
      description: 'Competitive rates • Quick processing'
    },
    {
      name: 'Package 3',
      savings: 250,
      loanAmount: 5300,
      description: 'Extended terms • Low interest'
    },
    {
      name: 'Package 4',
      savings: 450,
      loanAmount: 8500,
      description: 'Maximum benefit • Premium service'
    },
    {
      name: 'Package 5',
      savings: 650,
      loanAmount: 10500,
      description: 'Enhanced savings • Superior benefits'
    },
    {
      name: 'Package 6',
      savings: 860,
      loanAmount: 19500,
      description: 'Premium access • Exclusive features'
    },
  ];

  const handleSelectPackage = (pkg: Package) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate('/payment');
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-red-50 min-h-screen flex flex-col">
      <LoanNotification />
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Choose Your Loan Package</h2>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-green-700 mb-2">OKASH LOANS × NSSF Partnership</h3>
              <p className="text-gray-700 leading-relaxed">
                OKASH LOANS Project, in collaboration with NSSF, empowers Kenya's youth to save smart and grow strong.
                Through the Haba Haba Savings Scheme, you build a future-ready safety net while unlocking access to meaningful financial support.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-green-700">{pkg.name}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700"><strong>Savings:</strong> Ksh {pkg.savings.toLocaleString()}</p>
                  <p className="text-gray-700"><strong>Loan:</strong> Ksh {pkg.loanAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                </div>
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className="w-full bg-gradient-to-r from-green-600 to-red-500 hover:from-red-500 hover:to-green-600 transition-all text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-2xl"
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">OKASH LOANS</span>. All rights reserved.
      </footer>
    </div>
  );
}
