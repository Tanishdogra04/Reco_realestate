import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Users, Briefcase, Globe, Newspaper, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Corporate() {
  const location = useLocation();
  const path = location.pathname;

  // Determine content based on path
  let content = {
    title: "Who We Are",
    subtitle: "Pioneers in the AI-driven luxury real estate landscape.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        title: "Our Vision",
        description: "To connect the world's most discerning families with the architecture of their dreams using precision intelligence.",
        icon: <Globe className="w-6 h-6 text-amber-500" />
      },
      {
        title: "The Team",
        description: "A global collective of real estate veterans, data scientists, and architectural connoisseurs.",
        icon: <Users className="w-6 h-6 text-blue-500" />
      }
    ]
  };

  if (path === '/careers') {
    content = {
      title: "Careers & Growth",
      subtitle: "Join the vanguard of the real estate revolution.",
      heroImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
      sections: [
        {
          title: "Global Mobility",
          description: "Opportunities to work across our satellite offices in Mumbai, London, and New York.",
          icon: <Briefcase className="w-6 h-6 text-emerald-500" />
        },
        {
          title: "Innovation First",
          description: "Work with state-of-the-art AI and VR stacks to redefine property discovery.",
          icon: <ShieldCheck className="w-6 h-6 text-amber-500" />
        }
      ]
    };
  } else if (path === '/press') {
    content = {
      title: "Global Newsroom",
      subtitle: "The latest milestones and market analyses from Reco.",
      heroImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
      sections: [
        {
          title: "Market Reports",
          description: "Monthly deep dives into HNI migration patterns and luxury inventory shifts.",
          icon: <Newspaper className="w-6 h-6 text-amber-500" />
        },
        {
          title: "Announcements",
          description: "Press releases regarding our latest strategic global partnerships.",
          icon: <Globe className="w-6 h-6 text-blue-500" />
        }
      ]
    };
  } else if (path === '/legal' || path === '/privacy') {
    content = {
      title: path === '/legal' ? "Legal Vetting" : "Privacy Excellence",
      subtitle: "Uncompromising standards in security and compliance.",
      heroImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80",
      sections: [
        {
          title: "RERA Compliance",
          description: "Ensuring every project on our portal is 100% verified and legally sound.",
          icon: <ShieldCheck className="w-6 h-6 text-rose-500" />
        },
        {
          title: "Data Sovereignty",
          description: "Your information is protected by bank-grade encryption and strict confidentiality.",
          icon: <CheckCircle2 className="w-6 h-6 text-amber-500" />
        }
      ]
    };
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Dynamic Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <img 
            src={content.heroImage} 
            alt={content.title}
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
          
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight animate-fade-in-up">
              {content.title}
            </h1>
            <p className="text-slate-300 text-xl md:text-2xl font-medium max-w-3xl mx-auto italic leading-relaxed">
              "{content.subtitle}"
            </p>
          </div>
        </section>

        {/* Informational Grid */}
        <section className="py-24 container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {content.sections.map((section, idx) => (
              <div key={idx} className="group p-12 bg-stone-50 rounded-[3rem] border border-stone-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                  {section.icon}
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  {section.title}
                </h3>
                <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">
                  {section.description}
                </p>
                <div className="flex items-center gap-3 text-amber-600 font-bold text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                  Explore Depth <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Presence Callout */}
        <section className="container mx-auto px-4 lg:px-8 pb-24">
          <div className="relative overflow-hidden bg-slate-900 rounded-[4rem] p-16 text-center">
            {/* Background Grain/Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Our <span className="text-amber-500">Global</span> Hubs
              </h2>
              <div className="flex flex-wrap justify-center gap-12 text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">
                <span className="hover:text-white transition-colors">Mumbai</span>
                <span className="hover:text-white transition-colors">London</span>
                <span className="hover:text-white transition-colors">New York</span>
                <span className="hover:text-white transition-colors">Dubai</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
