import { Sparkles, ArrowRight, ShieldCheck, Zap, Send } from 'lucide-react';

export default function EliteMembership() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl shadow-slate-900/40">
          
          <div className="flex-1 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> Join the Network
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Unlock Elite Membership <br /> & Access <span className="text-amber-500 italic decoration-amber-500 underline underline-offset-8">Off-Market Projects</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">Instant Property Alerts</h4>
                  <p className="text-slate-400 text-sm font-medium">Be the first to see new high-value listings.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">Investment Analysis</h4>
                  <p className="text-slate-400 text-sm font-medium">Receive quarterly market growth reports.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md relative z-10">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">Become a Member Today</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-2xl outline-none focus:border-amber-500 focus:bg-white/20 transition-all text-white placeholder-slate-500 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-2xl outline-none focus:border-amber-500 focus:bg-white/20 transition-all text-white placeholder-slate-500 font-medium"
                  />
                </div>
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-amber-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 mt-4 group">
                  Apply for Membership <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              <p className="mt-6 text-center text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                No spam. Only high-value insights.
              </p>
            </div>
          </div>

          {/* Large Abstract Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
