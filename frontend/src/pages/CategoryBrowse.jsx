import { Link } from 'react-router-dom';
import { Home, Building2, Map, Factory, ChevronRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mainCategories = [
  {
    id: 'residential',
    title: 'Residential',
    description: 'Find your dream home from our collection of apartments, villas, and luxury penthouses.',
    icon: <Home className="w-8 h-8 text-amber-500" />,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-500/20 to-amber-600/5',
    tag: 'Premium Living'
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Strategically located office spaces, retail shops, and corporate hubs for your business growth.',
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500/20 to-blue-600/5',
    tag: 'Modern Workspaces'
  },
  {
    id: 'land',
    title: 'Plots & Land',
    description: 'Invest in prime residential plots, agricultural land, and development sites in emerging hotspots.',
    icon: <Map className="w-8 h-8 text-emerald-500" />,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    color: 'from-emerald-500/20 to-emerald-600/5',
    tag: 'Safe Investment'
  },
  {
    id: 'industrial',
    title: 'Industrial',
    description: 'Versatile manufacturing units, warehouses, and cold storage facilities for seamless operations.',
    icon: <Factory className="w-8 h-8 text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-500/20 to-purple-600/5',
    tag: 'Process Ready'
  }
];

export default function CategoryBrowse() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Explore Collections
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              Browse Properties by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Global Category</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium leading-relaxed italic">
              "Whether you seek a sanctuary to live in or a strategic asset for growth, our curated categories guide you to the perfect acquisition."
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {mainCategories.map((cat) => (
              <Link 
                key={cat.id}
                to={`/browse/${cat.id}`}
                className="group relative h-[400px] rounded-[3rem] overflow-hidden border border-white shadow-xl hover:shadow-2xl transition-all duration-700"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-none`}></div>
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                   <div className="mb-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:scale-110 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-white/20">
                      {cat.icon}
                   </div>
                   
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">{cat.tag}</span>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                           <ChevronRight className="w-6 h-6" />
                        </div>
                     </div>
                     <h2 className="text-4xl font-extrabold text-white tracking-tight">{cat.title}</h2>
                     <p className="text-slate-300 text-lg font-medium max-w-md leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                       {cat.description}
                     </p>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
