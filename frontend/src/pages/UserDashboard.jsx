import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { Home, Heart, Calendar, MessageSquare, ArrowRight, ShieldCheck, TrendingUp, Search } from 'lucide-react';

export default function UserDashboard() {
  const { userInfo } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 -translate-y-1/2 translate-x-1/3 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Welcome back, {userInfo.name ? userInfo.name.split(' ')[0] : 'User'}! 👋
          </h1>
          <p className="text-slate-500 font-medium text-lg">Here is an overview of your real estate journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Link to="/dashboard/saved" className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{userInfo.savedProperties?.length || 0}</p>
            <p className="text-sm font-bold text-slate-500">Saved Properties</p>
          </div>
        </Link>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">0</p>
            <p className="text-sm font-bold text-slate-500">Scheduled Tours</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 relative">
            <ShieldCheck className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 mb-1">Account Status</p>
            <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block">Verified</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between relative overflow-hidden group cursor-pointer" onClick={() => navigate('/properties')}>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all"></div>
        <div className="z-10 mb-6 sm:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-amber-500" />
            <h3 className="text-white font-bold text-xl">Find Your Dream Home</h3>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">Discover our handpicked collection of premium properties tailored to your taste.</p>
        </div>
        <div className="z-10 w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20">
            Browse Properties <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm h-full">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-400" /> Recent Inquiries
          </h3>
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-stone-300" />
            </div>
            <h4 className="text-lg font-bold text-slate-700 mb-2">No active inquiries yet</h4>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              When you contact agents or request information, it will show up here.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm h-full flex flex-col justify-between">
            <div>
             <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
               Profile Completeness
             </h3>
             <p className="text-slate-500 text-sm mb-6">Complete your profile to get better recommendations.</p>
             <div className="w-full bg-stone-100 rounded-full h-3 mb-4 overflow-hidden border border-stone-200">
               <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 w-[85%]"></div>
             </div>
             <div className="flex justify-between items-center text-sm font-bold">
               <span className="text-slate-700">85% Complete</span>
               <Link to="/dashboard/profile" className="text-amber-600 hover:text-amber-700 flex items-center">
                 Finish Setup <ArrowRight className="w-3 h-3 ml-1" />
               </Link>
             </div>
           </div>
           
           <div className="mt-8 pt-6 border-t border-stone-100">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Secure Account</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Your data is fully encrypted and securely stored. We prioritize your privacy above all else.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
