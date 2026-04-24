import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle, ShieldCheck, RefreshCw, Check, Circle, X } from 'lucide-react';
import { requestSignupOTP, verifySignupOTP, adminLogin } from '../api';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    specialChar: false,
    upperCase: false,
    number: false,
  });

  const validatePassword = (pass) => {
    setPasswordValidation({
      length: pass.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<> ]/.test(pass),
      upperCase: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow digits and limit to 10
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === 'password') {
        validatePassword(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Validation Rules ---
    const nameRegex = /^[A-Z]/;
    
    if (formData.phone.length !== 10) {
      setError('Phone Number must be exactly 10 digits.');
      return;
    }

    if (!nameRegex.test(formData.name.trim())) {
      setError('Full Name must start with a CAPITAL letter (e.g., "Suman").');
      return;
    }

    if (!passwordValidation.length || !passwordValidation.specialChar || !passwordValidation.upperCase || !passwordValidation.number) {
      setError('Please meet all password requirements.');
      return;
    }

    setLoading(true);
    try {
      // First, check if this is an admin attempting to "login" from the signup page
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
        // Not an admin login, request OTP for user signup
        await requestSignupOTP(formData);
        setStep(2); // Move to OTP step
      }
    } catch (err) {
      setError(err.message || 'Verification request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const data = await verifySignupOTP({ ...formData, otp: otpCode });
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      
      // Clear all admin data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Verification failed. Incorrect or expired code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await requestSignupOTP(formData);
      setOtp(['', '', '', '', '', '']);
      // Alert with simple toast-like feedback could go here
    } catch (err) {
      setError(err.message || 'Resend failed.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-amber-200">
      {/* Right Image Section (Swapped side for contrast) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-20">
          <div className="max-w-md">
            <h2 className="text-4xl font-extrabold text-white mb-4 line-clamp-3 leading-tight tracking-tight">Join the elite network of real estate luxury.</h2>
            <p className="text-stone-200 text-lg font-medium mb-4">Access exclusive pre-market listings, direct developer connections, and curated property analyses.</p>
          </div>
        </div>
      </div>

      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-stone-50 p-8 sm:p-12 lg:p-24 relative overflow-y-auto">
        <Link to="/" className="absolute top-8 right-8 text-2xl font-extrabold text-slate-900 tracking-tighter hover:opacity-80 transition-opacity">
          Reco<span className="text-amber-500">.</span>
        </Link>
        
        <div className="w-full max-w-md my-8">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              {step === 1 ? 'Create Account' : 'Verify Email'}
            </h1>
            <p className="text-slate-500 font-medium">
              {step === 1 
                ? 'Join us to start curating your property portfolio.' 
                : `Enter the code sent to ${formData.email.replace(/(.{3})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + '*'.repeat(gp3.length))}`}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 font-semibold text-sm px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

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
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <div className="absolute inset-y-0 left-9 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold text-sm border-r border-stone-200 pr-2">+91</span>
                  </div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-20 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                    placeholder="98765 43210"
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
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl outline-none text-slate-900 placeholder-slate-400 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                {/* Password Validation "Watermarks" */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ValidationItem 
                    label="Min 8 characters" 
                    isValid={passwordValidation.length} 
                  />
                  <ValidationItem 
                    label="Special character" 
                    isValid={passwordValidation.specialChar} 
                  />
                  <ValidationItem 
                    label="Uppercase letter" 
                    isValid={passwordValidation.upperCase} 
                  />
                  <ValidationItem 
                    label="One number" 
                    isValid={passwordValidation.number} 
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all shadow-lg active:scale-[0.98] mt-4">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form className="space-y-8" onSubmit={handleVerify}>
              <div className="flex justify-between gap-2 sm:gap-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-2xl font-black bg-white border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all"
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all shadow-xl active:scale-[0.98]">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Join Reco<span className="text-amber-500">.</span>
                      <ShieldCheck className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                <div className="text-center">
                  <button 
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    {resending ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
                    {resending ? 'Sending new code...' : "Didn't receive a code? Resend"}
                  </button>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-8">
                   <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-slate-700 py-3 rounded-xl font-bold text-sm transition-all"
                  >
                    Change Details
                  </button>
                </div>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-slate-900 font-bold hover:text-amber-600 ml-1 transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function ValidationItem({ label, isValid }) {
  return (
    <div className={`flex items-center gap-2 group transition-all duration-300 ${isValid ? 'text-emerald-600' : 'text-slate-400'}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${isValid ? 'bg-emerald-100' : 'bg-slate-100'}`}>
        {isValid ? (
          <Check className="w-3 h-3 stroke-[3px]" />
        ) : (
          <Circle className="w-3 h-3 fill-slate-300 text-transparent" />
        )}
      </div>
      <span className="text-xs font-bold tracking-tight">{label}</span>
    </div>
  );
}
