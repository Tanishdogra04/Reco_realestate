import { Link } from 'react-router-dom';
import { Home, Building2, Map, Factory, ArrowRight, Sparkles } from 'lucide-react';

const homeCategories = [
  { id: 'residential', title: 'Residential', icon: <Home className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600' },
  { id: 'commercial', title: 'Commercial', icon: <Building2 className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
  { id: 'land', title: 'Plots & Land', icon: <Map className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600' },
  { id: 'industrial', title: 'Industrial', icon: <Factory className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' }
];

export default function BrowseByCategorySection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
           <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                 <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Discover by Type
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Refine Your Search by <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Property Categories</span>
              </h2>
           </div>
           <Link 
             to="/browse" 
             className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/20 active:scale-95 text-sm uppercase tracking-wider"
           >
             View All Categories 
             <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {homeCategories.map((cat) => (
             <Link 
               key={cat.id} 
               to={`/browse/${cat.id}`}
               className="group p-8 bg-stone-50 rounded-[2.5rem] border border-stone-200 hover:border-amber-400 hover:bg-white hover:shadow-2xl transition-all duration-500"
             >
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                   {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                <p className="text-slate-500 font-medium mb-6 italic text-sm">Explore specialized listings in this sector.</p>
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   Explore <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
           ))}
        </div>
      </div>
    </section>
  );
}
