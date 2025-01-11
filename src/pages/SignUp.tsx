import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Mail, Lock, User, Github, Twitter, CheckCircle2 } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [platforms, setPlatforms] = useState({
    youtube: false,
    instagram: false,
    tiktok: false,
    twitter: false,
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    toast.success('Account created successfully!');
    navigate('/signin');
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
          <h2 className="text-center text-3xl font-bold text-[#2a1959]">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start your content creation journey
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium text-[#2a1959] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6e43cb] focus:border-[#6e43cb] sm:text-sm mt-1"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium text-[#2a1959] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6e43cb] focus:border-[#6e43cb] sm:text-sm mt-1"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <div className="mt-1 flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i < passwordStrength ? 'bg-[#6e43cb]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-[#2a1959] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6e43cb] focus:border-[#6e43cb] sm:text-sm mt-1"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#2a1959] block mb-2">Select Platforms</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(platforms).map(([platform, checked]) => (
                  <label
                    key={platform}
                    className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-[#f5f3fc]"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#6e43cb] focus:ring-[#6e43cb] border-gray-300 rounded"
                      checked={checked}
                      onChange={(e) => setPlatforms({ ...platforms, [platform]: e.target.checked })}
                    />
                    <span className="ml-2 capitalize">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#6e43cb] focus:ring-[#6e43cb] border-gray-300 rounded"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I accept the{' '}
                <button type="button" className="text-[#6e43cb] hover:text-[#4d2e8e]">
                  terms and conditions
                </button>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#6e43cb] hover:bg-[#4d2e8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6e43cb] transition-colors"
          >
            Create Account
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="font-medium text-[#6e43cb] hover:text-[#4d2e8e]"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;