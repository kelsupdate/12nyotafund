import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanNotification } from '../components/LoanNotification';

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
  percentage: number;
  loanAmount: number;
  savings: number;
}

export function Confirmation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [mpesaMessage, setMpesaMessage] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('applicationData');
    const pkg = localStorage.getItem('selectedPackage');
    const msg = localStorage.getItem('mpesaMessage');

    if (data) setFormData(JSON.parse(data));
    if (pkg) setSelectedPackage(JSON.parse(pkg));
    if (msg) setMpesaMessage(msg);
  }, []);

  if (!formData || !selectedPackage) {
    return <div>Loading...</div>;
  }

  const repaymentDuration = 12; // months
  const interestRate = 5; // %
  const totalInterest = selectedPackage.loanAmount * (interestRate / 100);
  const totalRepayment = selectedPackage.loanAmount + totalInterest;

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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Application Confirmed</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>ID Number:</strong> {formData.idNumber}</p>
                  <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
                  <p><strong>Loan Type:</strong> {formData.loanType}</p>
                  <p><strong>Citizen:</strong> {formData.isCitizen ? 'Yes' : 'No'}</p>
                  {formData.isCitizen && <p><strong>County:</strong> {formData.county}</p>}
                  <p><strong>Earnings:</strong> KES {formData.earnings.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Selected Package</h3>
                <div className="space-y-2">
                  <p><strong>Package:</strong> {selectedPackage.percentage}%</p>
                  <p><strong>Loan Amount:</strong> KES {selectedPackage.loanAmount.toLocaleString()}</p>
                  <p><strong>Savings Paid:</strong> KES {selectedPackage.savings.toLocaleString()}</p>
                  <p><strong>Repayment Duration:</strong> {repaymentDuration} months</p>
                  <p><strong>Interest Rate:</strong> {interestRate}%</p>
                  <p><strong>Total Interest:</strong> KES {totalInterest.toLocaleString()}</p>
                  <p><strong>Total Repayment:</strong> KES {totalRepayment.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Verification</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>M-Pesa Message:</strong></p>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">{mpesaMessage}</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-green-700 font-semibold mb-6">
                Your application has been successfully processed. You will receive further instructions via SMS.
              </p>
              <button
                onClick={() => navigate('/tracking-dashboard')}
                className="bg-gradient-to-r from-green-600 to-red-500 hover:from-red-500 hover:to-green-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
              >
                View Tracking Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">OKASH LOANS</span>. All rights reserved.
      </footer>
    </div>
  );
}
