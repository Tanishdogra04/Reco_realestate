import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { adminLogin } from '../api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-amber-200">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-stone-50 p-8 sm:p-12 lg:p-24 relative">
        <Link to="/" className="absolute top-8 left-8 text-2xl font-extrabold text-slate-900 tracking-tighter hover:opacity-80 transition-opacity">
          Reco<span className="text-amber-500">.</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            Admin Portal
          </div>

          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Admin Access
            </h1>
            <p className="text-slate-500 font-medium">
              Sign in to manage properties, listings, and site content.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 font-semibold text-sm px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                  placeholder="admin@reco.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all shadow-lg active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Not an admin?{' '}
            <Link to="/" className="text-amber-600 font-bold hover:text-amber-700">
              Back to Home
            </Link>
          </p>
        </div>
      </div>

      {/* Right Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 text-center p-16 max-w-lg">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Shield className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            reco<span className="text-amber-500">.</span> Admin
          </h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Manage premium property listings, track inquiries, and maintain the curated portfolio that defines excellence.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[['Add', 'New Listings'], ['Edit', 'Live Properties'], ['Delete', 'Stale Entries']].map(([action, label]) => (
              <div key={action} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-amber-400 font-black text-sm">{action}</p>
                <p className="text-slate-400 text-xs font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
