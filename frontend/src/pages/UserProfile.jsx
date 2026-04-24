import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { User, Mail, Phone, Lock, Save, ArrowRight, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';
import { updateUserProfile } from '../api';

export default function UserProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setFormData({ name: userInfo.name || '', email: userInfo.email || '', phone: userInfo.phone || '', password: '' });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow digits and limit to 10
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      showToast('Phone Number must be exactly 10 digits.', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      // only send password if user typed something
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      
      const data = await updateUserProfile(updateData, token);
      localStorage.setItem('userToken', data.token); // update token if needed
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      setFormData((prev) => ({ ...prev, password: '' })); // clear password
      showToast('Profile updated successfully!');
      
      // Update top navbar dynamically event trigger if needed, or window reload
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      showToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Edit Profile Settings</h1>
        <p className="text-slate-500 font-medium text-lg">Update your personal information and security details.</p>
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-stone-100 pb-4 flex items-center gap-2">
           <ShieldCheck className="w-6 h-6 text-amber-500" /> Account Security
        </h3>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none bg-stone-50 focus:bg-white" required />
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
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full pl-20 pr-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none bg-stone-50 focus:bg-white" maxLength={10} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none bg-stone-50 focus:bg-white" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">New Password <span className="text-slate-400 font-normal text-xs ml-1">(Leave blank to keep current)</span></label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none bg-stone-50 focus:bg-white" placeholder="••••••••" />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button type="submit" disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-slate-900/10 active:scale-95">
              {loading ? <div className="w-4 h-4 border-2 border-slate-500/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl font-bold text-sm transition-all animate-bounce
          ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-stone-900 text-white border border-stone-700'}`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5 text-amber-400" />}
          {toast.message}
        </div>
      )}
    </div>
  );
}
