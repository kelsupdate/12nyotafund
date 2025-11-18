import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Placeholder for registration logic
      console.log('Register attempt:', formData);
      // You can integrate Supabase auth here later
      navigate('/application-form');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-red-50 min-h-screen flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 fade-in py-8">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-md w-full">
          <img
            src="/nyotafund.png"
            alt="NYOTA FUND Logo"
            className="w-20 h-20 mx-auto mb-6 rounded-full shadow-lg border border-gray-200"
          />

          <h1 className="text-4xl font-bold text-green-700 mb-2 tracking-wide">
            Create Account
          </h1>

          <p className="text-gray-600 mb-8 text-sm">
            Join OKASH LOANS today
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-red-500 disabled:bg-gray-400 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-700 hover:text-green-800 font-semibold transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">OKASH LOANS</span>. All rights reserved.
      </footer>
    </div>
  );
}
