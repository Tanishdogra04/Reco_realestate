import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { userLogin, adminLogin } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Validation Rules (matching signup policy) ---
    const passwordLengthRegex = /^.{7,8}$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!passwordLengthRegex.test(formData.password)) {
      setError('Password must be exactly 7 to 8 characters long.');
      return;
    }
    if (!specialCharRegex.test(formData.password)) {
      setError('Password must contain at least one special character (e.g., !@#$%^&*).');
      return;
    }

    setLoading(true);
    
    try {
      // First attempt User Login
      try {
        const userData = await userLogin(formData.email, formData.password);
        localStorage.setItem('userToken', userData.token);
        localStorage.setItem('userInfo', JSON.stringify(userData.user));
        // Clear all admin data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/', { replace: true });
        return;
      } catch (userErr) {
        // If user login fails, try Admin login
        try {
          const adminData = await adminLogin(formData.email, formData.password);
          localStorage.setItem('adminToken', adminData.token);
          localStorage.setItem('adminInfo', JSON.stringify(adminData.admin));
          // Clear all user data
          localStorage.removeItem('userToken');
          localStorage.removeItem('userInfo');
          navigate('/admin/dashboard', { replace: true });
          return;
        } catch (adminErr) {
          // If both fail, throw the original user error or a generic one
          throw new Error('Invalid email or password.');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
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
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Log in to access your saved properties and inquiries.</p>
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="font-bold border-b border-white text-sm text-amber-600 hover:text-amber-700 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all shadow-lg active:scale-[0.98]">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-amber-600 font-bold hover:text-amber-700 ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-20">
          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold text-white mb-4 line-clamp-3 leading-tight tracking-tight">"Finding a home here was the most elevated experience of my life."</h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-amber-500 shadow-xl">
                 <img src="https://i.pravatar.cc/150?img=33" alt="Avatar" />
              </div>
              <div>
                <p className="text-white font-bold tracking-wide">Eleanor Pena</p>
                <p className="text-stone-300 text-sm font-medium">Homeowner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
