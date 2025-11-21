import { useState } from 'react';
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

export function ApplicationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    idNumber: '',
    dateOfBirth: '',
    phone: '',
    maritalStatus: '',
    loanType: '',
    isCitizen: true,
    county: '',
    earnings: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage or pass via state
    localStorage.setItem('applicationData', JSON.stringify(formData));
    navigate('/eligibility-check');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }));
  };

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
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-[#37B9C7] mb-6 text-center">Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder="12345678"
                  required
                  maxLength={8}
                  pattern="[0-9]{8}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Enter 8 digits</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🇰🇪 +254</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="712345678"
                    required
                    maxLength={9}
                    className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter the last 9 digits (without 0)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                >
                  <option value="">Select loan type</option>
                  <option value="business">Business Loan</option>
                  <option value="emergency">Emergency Loan</option>
                  <option value="salary-advance">Salary Advance</option>
                  <option value="personal">Personal Loan</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isCitizen"
                    checked={formData.isCitizen}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Are you a Kenyan citizen?</span>
                </label>
              </div>

              {formData.isCitizen && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                  >
                    <option value="">Select your county</option>
                    <option value="Baringo">Baringo</option>
                    <option value="Bomet">Bomet</option>
                    <option value="Bungoma">Bungoma</option>
                    <option value="Busia">Busia</option>
                    <option value="Elgeyo-Marakwet">Elgeyo-Marakwet</option>
                    <option value="Embu">Embu</option>
                    <option value="Garissa">Garissa</option>
                    <option value="Homa Bay">Homa Bay</option>
                    <option value="Isiolo">Isiolo</option>
                    <option value="Kajiado">Kajiado</option>
                    <option value="Kakamega">Kakamega</option>
                    <option value="Kericho">Kericho</option>
                    <option value="Kiambu">Kiambu</option>
                    <option value="Kilifi">Kilifi</option>
                    <option value="Kirinyaga">Kirinyaga</option>
                    <option value="Kisii">Kisii</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Kitui">Kitui</option>
                    <option value="Kwale">Kwale</option>
                    <option value="Laikipia">Laikipia</option>
                    <option value="Lamu">Lamu</option>
                    <option value="Machakos">Machakos</option>
                    <option value="Makueni">Makueni</option>
                    <option value="Mandera">Mandera</option>
                    <option value="Marsabit">Marsabit</option>
                    <option value="Meru">Meru</option>
                    <option value="Migori">Migori</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Murang'a">Murang'a</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Nandi">Nandi</option>
                    <option value="Narok">Narok</option>
                    <option value="Nyamira">Nyamira</option>
                    <option value="Nyandarua">Nyandarua</option>
                    <option value="Nyeri">Nyeri</option>
                    <option value="Samburu">Samburu</option>
                    <option value="Siaya">Siaya</option>
                    <option value="Taita-Taveta">Taita-Taveta</option>
                    <option value="Tana River">Tana River</option>
                    <option value="Tharaka-Nithi">Tharaka-Nithi</option>
                    <option value="Trans Nzoia">Trans Nzoia</option>
                    <option value="Turkana">Turkana</option>
                    <option value="Uasin Gishu">Uasin Gishu</option>
                    <option value="Vihiga">Vihiga</option>
                    <option value="Wajir">Wajir</option>
                    <option value="West Pokot">West Pokot</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Earnings (KES)</label>
                <input
                  type="number"
                  name="earnings"
                  value={formData.earnings || ''}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="Enter your monthly earnings"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#37B9C7] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#37B9C7] to-red-500 hover:from-red-500 hover:to-[#37B9C7] transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
              >
                Submit Application
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
