import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanNotification } from '../components/LoanNotification';

interface Package {
  name: string;
  savings: number;
  loanAmount: number;
  description: string;
}

export function Payment() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPackageDropdown, setShowPackageDropdown] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const pkg = localStorage.getItem('selectedPackage');
    if (pkg) {
      setSelectedPackage(JSON.parse(pkg));
    }
    const data = localStorage.getItem('applicationData');
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleVerifyNow = () => {
    navigate('/verification');
  };

  const tillNumber = '4991032';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handlePackageChange = (pkg: Package) => {
    setSelectedPackage(pkg);
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    setShowPackageDropdown(false);
  };

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

  return (
    <div className="bg-gradient-to-br from-white via-[#37B9C7]/50 to-red-50 min-h-screen flex flex-col">
      <LoanNotification />
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nyotafund.png"
              alt="NYOTA FUND"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-[#37B9C7]">TALA HELA</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#37B9C7] mb-4">Complete Your Savings</h2>
              <p className="text-gray-700 text-lg">
                Based on the selected package, you are required to save{' '}
                <span className="font-bold text-[#37B9C7]">
                  Ksh {selectedPackage ? selectedPackage.savings.toLocaleString() : '0'}
                </span>{' '}
                to your okash account.
              </p>
              <p className="text-gray-600 mt-2">
                You build a future-ready safety net while unlocking access to meaningful financial support.
              </p>
              <p className="font-bold text-[#37B9C7] mt-2">
                Note: Savings is withdrawable exclusively upon repayment of the first Loan awarded.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative">
                <button
                  onClick={() => setShowPackageDropdown(!showPackageDropdown)}
                  className="bg-white border-2 border-[#37B9C7] text-[#37B9C7] hover:bg-[#37B9C7]/10 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  Change Savings Plan
                  <span className={`transform transition-transform duration-200 ${showPackageDropdown ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {showPackageDropdown && (
                  <div className="absolute top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <h4 className="font-semibold text-gray-900 mb-3 px-2">Select a Package</h4>
                      {packages.map((pkg, index) => (
                        <button
                          key={index}
                          onClick={() => handlePackageChange(pkg)}
                          className={`w-full text-left p-3 rounded-md mb-1 transition-colors ${
                            selectedPackage?.name === pkg.name
                              ? 'bg-[#37B9C7]/10 border border-[#37B9C7]/20'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{pkg.name}</div>
                          <div className="text-sm text-gray-600">
                            Savings: Ksh {pkg.savings.toLocaleString()} • Loan: Ksh {pkg.loanAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{pkg.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">How to Save</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <p className="font-medium text-gray-900">Go to M-Pesa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <p className="font-medium text-gray-900">Select Lipa na M-Pesa → Buy Goods & Services</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">3️⃣</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">Enter Till Number: <span className="font-bold text-[#37B9C7] bg-gray-100 px-2 py-1 rounded text-lg">{tillNumber}</span></p>
                    <button
                      onClick={() => copyToClipboard(tillNumber)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        copied
                          ? 'bg-[#37B9C7]/10 text-[#37B9C7] border border-[#37B9C7]/20'
                          : 'bg-blue-50 text-blue-600 border border-blue-300 hover:bg-blue-100'
                      }`}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">4️⃣</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      Enter Amount: Ksh <span className="font-bold text-[#37B9C7]">
                        {selectedPackage ? selectedPackage.savings.toLocaleString() : '0'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">5️⃣</span>
                  <div>
                    <p className="font-medium text-gray-900">Complete Payment: Enter M-Pesa PIN and confirm.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleVerifyNow}
              className="w-full bg-gradient-to-r from-[#37B9C7] to-red-500 hover:from-red-500 hover:to-[#37B9C7] transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
            >
              Confirm Payment
            </button>


          </div>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">TALA HELA</span>. All rights reserved.
      </footer>

      <a
        href="https://wa.me/254117675726"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#37B9C7] hover:bg-[#37B9C7]/80 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        title="Needing Help?"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      </a>
    </div>
  );
}
