import React, { useState } from 'react';
import { User, Shield, Lock, Mail, ArrowRight, Store, UserPlus, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginGate() {
  const { login, register } = useAuth();
  
  // Exactly 2 top-level role options: 'user' or 'admin'
  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'admin'

  // Inside User: 'login' or 'register' (Create Account)
  const [userMode, setUserMode] = useState('login'); // 'login' | 'register'

  // User Login Form State
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // User Register (Create Account) Form State
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Admin Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Handle User Login
  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    const res = await login(userEmail.trim(), userPassword);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Login failed. Please check your email and password.');
    }
  };

  // 2. Handle User Create Account (Registration)
  const handleUserRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!regFullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!regPassword || regPassword.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    const username = regUsername.trim() || regEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

    setLoading(true);
    const res = await register({
      fullName: regFullName.trim(),
      username: username || 'customer',
      email: regEmail.trim(),
      password: regPassword
    });
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Registration failed. Please try again.');
    }
  };

  // 3. Handle Admin Login (Strictly mhmd@gmail.com and 1234)
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    const emailInput = adminEmail.trim().toLowerCase();
    if (emailInput !== 'mhmd@gmail.com' && emailInput !== 'admin@shopio.com' && emailInput !== 'admin') {
      setError('Invalid Admin Email. Admin email must be: mhmd@gmail.com');
      return;
    }
    if (adminPassword !== '1234' && adminPassword !== 'admin123') {
      setError('Invalid Admin Password. Admin password must be: 1234');
      return;
    }

    setLoading(true);
    const res = await login(emailInput, adminPassword);
    setLoading(false);
    if (!res.success) {
      setError(res.message || 'Admin authentication failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] via-[#F4EFE6] to-[#ECE5D8] flex flex-col justify-between selection:bg-amber-400 selection:text-neutral-900 font-sans">
      
      {/* Top Status Bar */}
      <div className="bg-neutral-900 text-white py-2.5 px-6 text-center text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 shadow-xs">
        <Store size={15} className="text-amber-400" />
        <span>SHOPIO E-COMMERCE PORTAL ACCESS</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-neutral-200/80 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Logo & Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
              Shopio<span className="text-amber-500 font-black">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              Please choose your role to log in and proceed
            </p>
          </div>

          {/* EXACTLY 2 OPTIONS: USER OR ADMIN */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-100 rounded-2xl mb-8">
            {/* OPTION 1: USER */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('user');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition ${
                selectedRole === 'user'
                  ? 'bg-white text-neutral-900 shadow-md ring-1 ring-neutral-200'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              <User size={16} className={selectedRole === 'user' ? 'text-neutral-900' : 'text-neutral-400'} />
              <span>User</span>
            </button>

            {/* OPTION 2: ADMIN */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition ${
                selectedRole === 'admin'
                  ? 'bg-white text-amber-600 shadow-md ring-1 ring-amber-200'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/50'
              }`}
            >
              <Shield size={16} className={selectedRole === 'admin' ? 'text-amber-500' : 'text-neutral-400'} />
              <span>Admin</span>
            </button>
          </div>

          {error && (
            <div className="p-3 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. USER SECTION (LOGIN & CREATE ACCOUNT) */}
          {/* ========================================================= */}
          {selectedRole === 'user' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Header with Sub-tabs for User: Sign In vs Create Account */}
              <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Customer Portal
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-1">
                    {userMode === 'login' ? 'Sign In as User' : 'Create New Account'}
                  </h3>
                </div>

                {/* Switcher Pills */}
                <div className="flex bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMode('login');
                      setError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      userMode === 'login'
                        ? 'bg-white text-neutral-900 shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMode('register');
                      setError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 ${
                      userMode === 'register'
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    <UserPlus size={13} />
                    <span>Create Account</span>
                  </button>
                </div>
              </div>

              {/* USER MODE A: SIGN IN FORM */}
              {userMode === 'login' ? (
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <p className="text-xs text-neutral-500">
                    Sign in to access your shopping bag, order history, and wishlist.
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="e.g. sophia@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-neutral-900 outline-none transition bg-neutral-50/50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-neutral-900 outline-none transition bg-neutral-50/50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Quick autofill helper */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserEmail('sophia@gmail.com');
                        setUserPassword('customer123');
                      }}
                      className="text-[11px] text-neutral-500 hover:text-neutral-900 underline"
                    >
                      Autofill demo user
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setUserMode('register');
                        setError('');
                      }}
                      className="text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center space-x-1"
                    >
                      <span>Create account</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-center space-x-2 mt-2"
                  >
                    <span>{loading ? 'Signing In...' : 'Sign In as User'}</span>
                    <ArrowRight size={14} />
                  </button>

                  {/* Create Account Banner for new user */}
                  <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
                    <p className="text-xs text-neutral-500">
                      New to Shopio?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setUserMode('register');
                          setError('');
                        }}
                        className="font-bold text-neutral-900 hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Create an account here</span>
                        <UserPlus size={13} className="text-amber-500" />
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* USER MODE B: CREATE ACCOUNT FORM */
                <form onSubmit={handleUserRegister} className="space-y-3.5">
                  <p className="text-xs text-neutral-500">
                    Create an account to browse electronics, furniture, bags & place orders.
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-neutral-900 outline-none transition bg-neutral-50/50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. alex@example.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-neutral-900 outline-none transition bg-neutral-50/50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Username (Optional)
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        placeholder="e.g. alexjohnson (or auto-generated)"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-neutral-900 outline-none transition bg-neutral-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="At least 4 characters"
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-neutral-900 outline-none transition bg-neutral-50/50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-900 text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-center space-x-2 mt-2"
                  >
                    <UserPlus size={15} />
                    <span>{loading ? 'Creating Account...' : 'Create Account & Enter Store'}</span>
                  </button>

                  <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
                    <p className="text-xs text-neutral-500">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setUserMode('login');
                          setError('');
                        }}
                        className="font-bold text-neutral-900 hover:underline"
                      >
                        Sign In here
                      </button>
                    </p>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 2. ADMIN SECTION (STRICTLY mhmd@gmail.com and 1234) */}
          {/* ========================================================= */}
          {selectedRole === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4 animate-fadeIn">
              <div className="border-b border-neutral-100 pb-3 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Administrator Portal
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1.5">Sign in as Administrator</h3>
                <p className="text-xs text-neutral-500">Manage catalog products, update prices, and view all orders.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="mhmd@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-amber-500 outline-none transition bg-neutral-50/50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="1234"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:border-amber-500 outline-none transition bg-neutral-50/50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Quick helper for Admin */}
              <button
                type="button"
                onClick={() => {
                  setAdminEmail('mhmd@gmail.com');
                  setAdminPassword('1234');
                }}
                className="text-[11px] text-amber-700 hover:text-amber-900 underline block"
              >
                Autofill admin (mhmd@gmail.com / 1234)
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-neutral-900 text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Authenticating Admin...' : 'Sign In as Admin'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-neutral-400 border-t border-neutral-200/80">
        Shopio E-Commerce Platform • Secure Role-Based Authentication
      </div>

    </div>
  );
}
