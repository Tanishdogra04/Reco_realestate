import { Brain, Maximize2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "AI-Driven Valuation",
    description: "Get real-time market data and value predictions for any property, analyzed through our proprietary machine learning algorithms.",
    icon: <Brain className="w-8 h-8 text-amber-500" />,
    tag: "Data Insights"
  },
  {
    id: 2,
    title: "Immersive Virtual Tours",
    description: "Experience your future home from any location with our cinematic 4K virtual tours and ultra-high-definition property walkthroughs.",
    icon: <Maximize2 className="w-8 h-8 text-emerald-500" />,
    tag: "Visual Experience"
  },
  {
    id: 3,
    title: "Legal & Financial Concierge",
    description: "Our dedicated legal experts and financial advisors ensure every transaction is vetted, secure, and structured for maximum efficiency.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    tag: "Legal Security"
  }
];

export default function BespokeServices() {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-200/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Luxury Services
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Bespoke Approach to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Property Excellence</span>
          </h2>
          <p className="max-w-2xl text-slate-500 text-lg font-medium leading-relaxed">
            Beyond just listings, we provide a full-spectrum luxury ecosystem designed to simplify and elevate every step of your real estate journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-slate-900">
                {/* Clone the icon and change its color on hover? No, let's keep it simple or use CSS */}
                <div className="group-hover:text-white transition-colors">
                  {service.icon}
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{service.tag}</span>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">
                  "{service.description}"
                </p>
                
                <div className="pt-6 flex items-center gap-2 text-slate-900 font-bold text-sm cursor-pointer group/btn">
                  Learn More 
                  <ArrowRight className="w-4 h-4 text-amber-500 group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center relative overflow-hidden">
           {/* Subtle background decoration */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
           
           <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight relative z-10 leading-tight">
             Ready to experience a more <br className="hidden sm:block" /> refined perspective on real estate?
           </h3>
           <button className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-amber-500/20 active:scale-95 relative z-10 uppercase tracking-wider text-sm">
             Schedule a Consultation
           </button>
        </div>
      </div>
    </section>
  );
}
