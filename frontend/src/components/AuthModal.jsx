import React, { useState, useEffect } from 'react';
import { X, User, LogIn, UserPlus, Package, LogOut, Shield, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchUserOrders } from '../api/client';

export default function AuthModal({ isOpen, onClose, onOpenAdmin, onLogout, onOpenTracking }) {
  const { user, login, register, logout, switchToAdmin, switchToCustomer } = useAuth();
  
  const [tab, setTab] = useState(user ? 'profile' : 'login'); // 'login', 'register', 'profile', 'orders'
  
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('sophia');
  const [loginPassword, setLoginPassword] = useState('customer123');
  
  // Register State
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');
  
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user?.id && (tab === 'orders' || tab === 'profile')) {
      loadOrders();
    }
  }, [user?.id, tab]);

  const loadOrders = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const orders = await fetchUserOrders(user.id);
      setUserOrders(orders);
    } catch (err) {
      console.warn('Could not fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    const res = await login(loginIdentifier, loginPassword);
    setLoading(false);
    if (res.success) {
      setTab('profile');
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    const res = await register({
      username: regUsername,
      email: regEmail,
      password: regPassword,
      fullName: regFullName
    });
    setLoading(false);
    if (res.success) {
      setTab('profile');
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-forme-cream rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-200/70 text-neutral-500 hover:text-neutral-900 transition"
        >
          <X size={20} />
        </button>

        {/* Tab Switcher Header */}
        <div className="flex border-b border-forme-border/60 pb-4 mb-6 space-x-6 text-xs uppercase tracking-widest font-medium">
          {user ? (
            <>
              <button
                onClick={() => setTab('profile')}
                className={`py-1 transition ${tab === 'profile' ? 'text-forme-navy font-bold border-b-2 border-forme-navy' : 'text-neutral-500'}`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setTab('orders')}
                className={`py-1 transition ${tab === 'orders' ? 'text-forme-navy font-bold border-b-2 border-forme-navy' : 'text-neutral-500'}`}
              >
                Order History ({userOrders.length})
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setTab('login')}
                className={`py-1 transition ${tab === 'login' ? 'text-forme-navy font-bold border-b-2 border-forme-navy' : 'text-neutral-500'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`py-1 transition ${tab === 'register' ? 'text-forme-navy font-bold border-b-2 border-forme-navy' : 'text-neutral-500'}`}
              >
                Register
              </button>
            </>
          )}
        </div>

        {message.text && (
          <div className={`p-3 rounded-xl mb-4 text-xs ${message.type === 'error' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            {message.text}
          </div>
        )}

        {/* 1. SIGN IN TAB */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-forme-terracotta font-semibold">
                Welcome to FORME Studio
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 mt-1">Sign In to Your Account</h3>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-600 mb-1 font-medium">Username or Email</label>
              <input
                type="text"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-neutral-300 bg-white outline-none focus:border-forme-navy"
                placeholder="e.g. sophia or sophia@forme.com"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-neutral-600 mb-1 font-medium">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-neutral-300 bg-white outline-none focus:border-forme-navy"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-forme-navy hover:bg-forme-navy-dark text-white text-xs uppercase tracking-widest font-semibold transition shadow-md active:scale-95"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            {/* Demo Helper Switcher */}
            <div className="pt-4 border-t border-forme-border/60 text-center space-y-2">
              <span className="text-[11px] text-neutral-500">Quick Switch Demo Accounts:</span>
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('sophia');
                    setLoginPassword('customer123');
                  }}
                  className="px-3 py-1 bg-white border border-forme-border rounded-full text-xs text-neutral-700 hover:border-forme-terracotta"
                >
                  Customer (sophia)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('admin');
                    setLoginPassword('admin123');
                  }}
                  className="px-3 py-1 bg-white border border-forme-border rounded-full text-xs text-neutral-700 hover:border-forme-navy"
                >
                  Admin (admin)
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 2. REGISTER TAB */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-forme-terracotta font-semibold">
                New Collector Registration
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 mt-1">Create an Account</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-600 mb-1 font-medium">Username</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-neutral-300 bg-white outline-none focus:border-forme-navy"
                  placeholder="alex_v"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-600 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-neutral-300 bg-white outline-none focus:border-forme-navy"
                  placeholder="Alex Vance"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-600 mb-1 font-medium">Email Address</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-neutral-300 bg-white outline-none focus:border-forme-navy"
                placeholder="alex@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-neutral-600 mb-1 font-medium">Password (min 6 chars)</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-neutral-300 bg-white outline-none focus:border-forme-navy"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-forme-terracotta hover:bg-forme-terracotta-hover text-white text-xs uppercase tracking-widest font-semibold transition shadow-md active:scale-95"
            >
              {loading ? 'Registering...' : 'Register Account'}
            </button>
          </form>
        )}

        {/* 3. PROFILE TAB */}
        {tab === 'profile' && user && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-forme-navy text-white flex items-center justify-center font-serif text-xl font-bold">
                {user.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-serif text-xl text-neutral-900">{user.fullName}</h3>
                <p className="text-xs text-neutral-500">@{user.username} • {user.email}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-forme-sand text-forme-navy">
                  {user.role} Member
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-forme-border/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping Address:</span>
                <span className="font-medium text-neutral-800">{user.address || '742 Evergreen Blvd, NY'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Contact Telephone:</span>
                <span className="font-medium text-neutral-800">{user.phone || '+1 555-0142'}</span>
              </div>
            </div>


            <div className="flex items-center justify-between pt-4 border-t border-forme-border/60">
              {user.role === 'ADMIN' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="px-4 py-2 rounded-full bg-forme-navy text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Open Admin Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  if (onLogout) {
                    onLogout();
                  } else {
                    logout();
                    setTab('login');
                  }
                }}
                className="inline-flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-800 font-medium ml-auto"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. ORDERS TAB */}
        {tab === 'orders' && user && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-neutral-900">Your Acquisition History</h3>
            {userOrders.length === 0 ? (
              <div className="py-12 text-center text-neutral-500 space-y-2">
                <Package size={36} className="stroke-[1] mx-auto text-neutral-400" />
                <p className="font-serif text-base text-neutral-700">No past orders yet</p>
                <p className="text-xs text-neutral-400">Your order confirmations and tracking will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {userOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-white rounded-2xl border border-forme-border/60 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-neutral-800">{order.orderNumber}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-800">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-neutral-600">
                      {order.items?.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{it.productName} ({it.productModelNumber}) × {it.quantity}</span>
                          <span className="font-medium text-neutral-900">${Number(it.subtotal).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <div className="font-serif font-bold text-neutral-900 text-sm">
                        <span>Total: ${Number(order.totalAmount).toFixed(2)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onOpenTracking) onOpenTracking(order);
                        }}
                        className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                        title="View live shipment milestones"
                      >
                        <Truck size={12} />
                        <span>Track Package</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
