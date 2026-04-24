import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BookOpen, Newspaper, Play, Search, Clock, ArrowRight, ChevronRight, Filter } from 'lucide-react';

const insightsData = [
  {
    id: 1,
    category: "Insight Report",
    title: "Q1 2026: The Rise of Sustainable Luxury in Mumbai",
    summary: "A deep dive into how green certifications are driving value in Altamount and Malabar Hill.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    icon: <BookOpen className="w-4 h-4 text-amber-500" />,
    readTime: "12 min read",
    date: "Mar 12, 2026",
    featured: true
  },
  {
    id: 2,
    category: "Editorial Chronicle",
    title: "The Architecture of Serenity: Designing for Quietude",
    summary: "Exploring how modern developers are integrating acoustical engineering into premium high-rises.",
    image: "https://images.unsplash.com/photo-1600585154340-be6199f7d209?auto=format&fit=crop&w=800&q=80",
    icon: <Newspaper className="w-4 h-4 text-emerald-500" />,
    readTime: "8 min read",
    date: "Mar 10, 2026"
  },
  {
    id: 3,
    category: "Cinematic Showcase",
    title: "A Glimpse into the Penthouse at DLF The Camellias",
    summary: "Take a virtual cinematic tour through the most exclusive residence in Gurugram.",
    image: "https://images.unsplash.com/photo-1512918766671-5600cb1d7cf2?auto=format&fit=crop&w=800&q=80",
    icon: <Play className="w-4 h-4 text-rose-500" />,
    readTime: "4:20 video",
    date: "Mar 08, 2026"
  },
  {
    id: 4,
    category: "Insight Report",
    title: "Bengaluru Tech Hubs: Predicting the Next High-Value Corridor",
    summary: "An analytical study on which suburban areas will yield the highest appreciation in the coming decade.",
    image: "https://images.unsplash.com/photo-1590674867571-88dc3656110c?auto=format&fit=crop&w=800&q=80",
    icon: <BookOpen className="w-4 h-4 text-amber-500" />,
    readTime: "15 min read",
    date: "Feb 28, 2026"
  },
  {
    id: 5,
    category: "Editorial Chronicle",
    title: "The Return of the Veranda: Modern Indian Living Spaces",
    summary: "Why open balconies and traditional verandas are making a comeback in modern apartment designs.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    icon: <Newspaper className="w-4 h-4 text-emerald-500" />,
    readTime: "6 min read",
    date: "Feb 22, 2026"
  },
  {
    id: 6,
    category: "Cinematic Showcase",
    title: "The Art of Hospitality at Lodha Altamount",
    summary: "From private chefs to 24/7 concierge—see how ultra-luxury living is redefined.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    icon: <Play className="w-4 h-4 text-rose-500" />,
    readTime: "5:45 video",
    date: "Feb 15, 2026"
  }
];

const categories = ["All", "Insight Report", "Editorial Chronicle", "Cinematic Showcase"];

export default function Insights() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = insightsData.filter((item) => {
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredInsight = insightsData.find(item => item.featured);

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-32 pb-16 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Intelligence & Insights</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Market Intelligence <br/> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Expert Insights</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
              Unlock the deep data and creative stories behind the world's most exclusive real estate markets. From technical reports to architectural showcases.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Insight Section (Only shows when search is empty/filter is All) */}
      {(activeFilter === "All" && searchQuery === "") && featuredInsight && (
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <Link to={`/insights/${featuredInsight.id}`} className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 flex flex-col lg:flex-row hover:shadow-2xl transition-all duration-500">
              <div className="lg:w-2/3 h-80 lg:h-[450px] overflow-hidden relative">
                <img 
                  src={featuredInsight.image} 
                  alt={featuredInsight.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-white/20">
                   <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                   <span className="text-xs font-bold text-slate-900 uppercase tracking-widest leading-none mt-0.5">Featured Insight</span>
                </div>
              </div>
              <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">
                  <Clock className="w-4 h-4" /> {featuredInsight.readTime}
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-amber-500 transition-colors">
                  {featuredInsight.title}
                </h2>
                <p className="text-slate-500 italic mb-8 text-lg font-medium">"{featuredInsight.summary}"</p>
                <div className="mt-auto flex items-center gap-3 text-slate-900 font-bold group-hover:gap-5 transition-all">
                  Read Full Insight <ArrowRight className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Filter & Search Bar Section */}
      <div className="sticky top-20 z-30 bg-stone-50/80 backdrop-blur-md py-6 border-b border-stone-200/50 mb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Filter Tabs */}
            <div className="flex bg-white p-1 rounded-2xl border border-stone-200 shadow-sm overflow-x-auto w-full lg:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeFilter === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search headlines, summaries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium text-slate-900 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Archive Grid */}
      <div className="container mx-auto px-4 lg:px-8 pb-32">
        {filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredInsights.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-sm border border-stone-200">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm border border-white/20">
                    {item.icon}
                    <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest leading-none mt-0.5">{item.category}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase mb-3 tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {item.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-2 italic">
                    "{item.summary}"
                  </p>
                  <div className="flex items-center text-slate-900 font-bold text-sm underline decoration-stone-300 decoration-2 underline-offset-4 group-hover:decoration-amber-500 group-hover:text-amber-600 transition-all">
                    View Full Story
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No matching insights found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>

      {/* Footer Branding fix integration */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="mb-6 text-3xl font-extrabold text-white tracking-widest uppercase">reco<span className="text-amber-500">.</span></p>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">&copy; {new Date().getFullYear()} Reco Real Estate. Expert market intelligence for the luxury connoisseur.</p>
        </div>
      </footer>
    </div>
  );
}
