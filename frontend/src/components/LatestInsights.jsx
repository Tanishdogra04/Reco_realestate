import { Link } from 'react-router-dom';
import { BookOpen, Newspaper, Play, ArrowRight, Clock, Sparkles } from 'lucide-react';

const insights = [
  {
    id: 3,
    category: "Cinematic Showcase",
    title: "A Glimpse into the Penthouse at DLF The Camellias",
    summary: "Take a virtual cinematic tour through the most exclusive residence in Gurugram.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80",
    icon: <Play className="w-4 h-4 text-rose-500" />,
    readTime: "4:20 video",
    trending: true
  },
  {
    id: 4,
    category: "Market Forecast",
    title: "Bengaluru 2030: The Tech Corridor Appreciation",
    summary: "Predictive analysis on properties along the new peripheral ring road.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    icon: <BookOpen className="w-4 h-4 text-amber-500" />,
    readTime: "15 min read",
    trending: false
  },
  {
    id: 5,
    category: "Design Trends",
    title: "Biophilic Living: Bringing the Forest to the Foyer",
    summary: "How vertical gardens and indoor waterfalls are becoming standard in elite skyscrapers.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    icon: <Newspaper className="w-4 h-4 text-emerald-500" />,
    readTime: "10 min read",
    trending: true
  }
];

export default function LatestInsights() {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 animate-fade-in">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" /> Industry Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The <span className="text-amber-600">Market</span> Pulse
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Curated perspectives and deep analyses on the evolving landscape of Indian premium real estate.
            </p>
          </div>
          <Link 
            to="/insights" 
            className="group flex items-center gap-3 px-8 py-4 bg-white border border-stone-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            Explore Archive <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {insights.map((item, index) => (
            <div 
              key={item.id} 
              className="group cursor-pointer opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              {/* Image Container with Floating Badges */}
              <div className="relative h-72 rounded-[2.5rem] overflow-hidden mb-8 shadow-sm border border-stone-200 group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Category Badge - Glassmorphism */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 transition-transform group-hover:scale-105">
                  <div className="group-hover:animate-pulse">{item.icon}</div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.category}</span>
                </div>

                {/* Trending Badge */}
                {item.trending && (
                  <div className="absolute top-6 right-6 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Textual Content */}
              <div className="px-2 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Clock className="w-4 h-4 text-amber-500" /> {item.readTime}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed italic line-clamp-2 transition-all group-hover:text-slate-600">
                  "{item.summary}"
                </p>
                
                <div className="pt-4 flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest group/btn">
                  <span className="relative">
                    Continue Reading
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-500"></span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-3 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}

