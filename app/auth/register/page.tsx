'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type UserRole = 'student' | 'landlord' | null;

export default function RegisterPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (userRole === 'landlord' && !fullName) {
      setError('Full name is required');
      return false;
    }
    return true;
  };

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role: 'student',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('authToken', data.token);
      router.push('/find');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleLandlordRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          role: 'landlord',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('authToken', data.token);
      router.push('/add');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/google-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: userRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Google registration failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('authToken', data.token);
      const redirectPath = userRole === 'landlord' ? '/add' : '/find';
      router.push(redirectPath);
    } catch (err) {
      setError('An error occurred with Google registration. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-indigo-600 block mb-2">
              StudentNest
            </Link>
            <p className="text-gray-600">Create your account</p>
          </div>

          {/* Role Selection */}
          {!userRole ? (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4 text-center">
                What describes you best?
              </p>
              <div className="space-y-3 mb-6">
                {/* Student Option */}
                <button
                  onClick={() => setUserRole('student')}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition text-left"
                >
                  <div className="font-semibold text-gray-900">👨‍🎓 I'm a Student</div>
                  <p className="text-sm text-gray-600">Looking for housing near my university</p>
                </button>

                {/* Landlord Option */}
                <button
                  onClick={() => setUserRole('landlord')}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition text-left"
                >
                  <div className="font-semibold text-gray-900">🏠 I'm a Landlord</div>
                  <p className="text-sm text-gray-600">I want to list my property</p>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-semibold">{error}</p>
                </div>
              )}

              {/* Back Button */}
              <button
                onClick={() => {
                  setUserRole(null);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setFullName('');
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold mb-4 flex items-center gap-1"
              >
                ← Change role
              </button>

              {userRole === 'student' ? (
                <form onSubmit={handleStudentRegister} className="space-y-4 mb-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 border-gray-300 rounded cursor-pointer mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-indigo-600 hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-indigo-600 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition ${
                      loading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLandlordRegister} className="space-y-4 mb-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 text-gray-900 placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 border-gray-300 rounded cursor-pointer mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-indigo-600 hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-indigo-600 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition ${
                      loading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-600">Or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Google Register */}
              <button
                onClick={handleGoogleRegister}
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition disabled:bg-gray-100 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? 'Signing up...' : 'Sign up with Google'}
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm mt-6">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Login here
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6">
          By registering, you agree to our{' '}
          <a href="#" className="underline hover:no-underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:no-underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
