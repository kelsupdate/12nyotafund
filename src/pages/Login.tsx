import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Placeholder for authentication logic
      console.log('Login attempt:', { email, password });
      // You can integrate Supabase auth here later
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-red-50 min-h-screen flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 fade-in">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-md w-full">
          <img
            src="/nyotafund.png"
            alt="NYOTA FUND Logo"
            className="w-20 h-20 mx-auto mb-6 rounded-full shadow-lg border border-gray-200"
          />

          <h1 className="text-4xl font-bold text-green-700 mb-2 tracking-wide">
            Welcome
          </h1>

          <p className="text-gray-600 mb-8 text-sm">
            Sign in to your OKASH LOANS account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-red-500 disabled:bg-gray-400 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-sm mb-4">
              Don't have an account?
            </p>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-700 font-semibold px-8 py-3 rounded-full shadow-lg"
            >
              Create Account
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
