import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoanNotification } from '../components/LoanNotification';

export function Verification() {
  const navigate = useNavigate();
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [error, setError] = useState('');

  const validateMpesaMessage = (message: string) => {
    // Get selected package data
    const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || '{}');
    const savingsAmount = selectedPackage.savings || 0;

    // Check if message contains required elements
    const hasAmount = message.includes(savingsAmount.toString());
    const hasTillName = message.toLowerCase().includes('GURUTECH INVESTORS') || message.toLowerCase().includes('fund');
    const hasMpesaCode = /([A-Z]{2}\d{9}[A-Z]{1})/.test(message); // M-Pesa transaction code format

    return {
      hasAmount,
      hasTillName,
      hasMpesaCode
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateMpesaMessage(mpesaMessage);

    if (!validation.hasAmount || !validation.hasTillName || !validation.hasMpesaCode) {
      setError('The message cannot be verified. Please check your M-Pesa confirmation message and try again.');
      return;
    }

    // Store Mpesa message if validation passes
    localStorage.setItem('mpesaMessage', mpesaMessage);
    navigate('/confirmation');
  };

  return (
    <div className="bg-gradient-to-br from-white via-[#37B9C7]/50 to-red-50 min-h-screen flex flex-col">
      <LoanNotification />
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nyotafund.png"
              alt="GURUTECH INVESTORS"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-[#37B9C7]">TALA HELA</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-[#37B9C7] mb-6 text-center">Verify Payment</h2>
            <p className="text-gray-600 mb-6 text-center">
              Please paste the M-Pesa confirmation message you received after making the payment.
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <textarea
                value={mpesaMessage}
                onChange={(e) => setMpesaMessage(e.target.value)}
                placeholder="Paste your M-Pesa message here..."
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent mb-6"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#37B9C7] to-red-500 hover:from-red-500 hover:to-[#37B9C7] transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
              >
                Verify Now
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-[#37B9C7]">TALA HELA</span>. All rights reserved.
      </footer>
    </div>
  );
}
