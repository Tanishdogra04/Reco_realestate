import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, ShieldCheck, Zap, Globe, Cpu, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function InformationPage() {
  const { type, topic } = useParams();
  const location = useLocation();
  const path = location.pathname;

  // Determine content based on path
  let title = "Our Expertise";
  let subtitle = "Solutions for every real estate ambition.";
  let icon = <Sparkles className="w-12 h-12 text-amber-500" />;
  let features = [
    { title: "Strategic Advisory", desc: "Expert guidance for high-value acquisitions." },
    { title: "Market Intelligence", desc: "Data-driven insights for smarter investments." },
    { title: "Elite Networking", desc: "Access to off-market premium listings." }
  ];

  if (path.includes('technologies')) {
    title = "Advanced Technologies";
    subtitle = "Revolutionizing property discovery with AI and VR.";
    icon = <Cpu className="w-12 h-12 text-blue-500" />;
    features = [
      { title: "AI Valuations", desc: "Real-time pricing accuracy using machine learning." },
      { title: "Virtual Tours", desc: "Immersive 3D walkthroughs from anywhere in the world." },
      { title: "Smart Home Tech", desc: "Integrating IoT for the modern luxury experience." }
    ];
  } else if (path.includes('events')) {
    title = "Luxury Real Estate Events";
    subtitle = "Exclusive access to global property summits and expos.";
    icon = <Calendar className="w-12 h-12 text-rose-500" />;
    features = [
      { title: "International Expos", desc: "Showcasing global luxury in major cities." },
      { title: "Private Webinars", desc: "One-on-one sessions with industry giants." },
      { title: "Property Fairs", desc: "Direct access to pre-launch opportunities." }
    ];
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-stone-50 rounded-3xl mb-8 shadow-inner">
            {icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Detailed Grid */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <div key={idx} className="group bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 border border-stone-100 group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-slate-300 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {feature.desc}
                </p>
                <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Callout */}
          <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] relative overflow-hidden shadow-2xl">
             {/* Background glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to elevate your journey?</h2>
                  <p className="text-slate-400 font-medium text-lg italic">"Connecting you to the future of global luxury living."</p>
                </div>
                <button className="px-10 py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-95 uppercase tracking-widest text-sm">
                  Contact Our Concierge
                </button>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
