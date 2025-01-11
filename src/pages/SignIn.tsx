import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Mail, Lock, Github, Twitter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      username: 'demouser',
      email: credentials.email,
      firstName: 'Demo',
      lastName: 'User',
    });
    toast.success('Signed in successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f3fc] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-[#6e43cb] hover:text-[#4d2e8e] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          <h2 className="text-center text-3xl font-bold text-[#2a1959]">Welcome back</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your content
          </p>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Github className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <span className="text-sm">Twitter</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-[#2a1959] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6e43cb] focus:border-[#6e43cb] sm:text-sm mt-1"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-[#2a1959] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6e43cb] focus:border-[#6e43cb] sm:text-sm mt-1"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#6e43cb] focus:ring-[#6e43cb] border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-[#6e43cb] hover:text-[#4d2e8e]"
                onClick={() => toast.error('Feature coming soon!')}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#6e43cb] hover:bg-[#4d2e8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e43cb] transition-colors"
          >
            Sign in
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-medium text-[#6e43cb] hover:text-[#4d2e8e]"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;