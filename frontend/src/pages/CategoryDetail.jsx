import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, LayoutGrid, Home, Building2, Map, Factory, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categoryData = {
  residential: {
    title: 'Residential',
    icon: <Home className="w-8 h-8 text-amber-500" />,
    banner: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    subCategories: [
      { id: 'apartment', name: 'Apartments', desc: 'Modern living in the heart of the city.', count: '120+', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
      { id: 'villa', name: 'Villas', desc: 'Luxury independent homes with private spaces.', count: '45+', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' },
      { id: 'builder-floor', name: 'Builder Floors', desc: 'Exclusive independent floor residences.', count: '30+', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80' },
      { id: 'studio', name: 'Studios', desc: 'Compact and efficient living for professionals.', count: '15+', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  commercial: {
    title: 'Commercial',
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    subCategories: [
      { id: 'office', name: 'Office Spaces', desc: 'Corporate headquarters and flexible workspace.', count: '80+', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { id: 'retail', name: 'Retail Shops', desc: 'High-visibility storefronts and retail outlets.', count: '60+', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  land: {
    title: 'Plots & Land',
    icon: <Map className="w-8 h-8 text-emerald-500" />,
    banner: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    subCategories: [
      { id: 'residential-plot', name: 'Residential Plots', desc: 'Build your own home on gated land.', count: '90+', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
      { id: 'agricultural', name: 'Agricultural Land', desc: 'Expansive land for farming or investment.', count: '25+', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  industrial: {
    title: 'Industrial',
    icon: <Factory className="w-8 h-8 text-purple-500" />,
    banner: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    subCategories: [
      { id: 'warehouse', name: 'Warehouses', desc: 'Storage and logistics facilities.', count: '40+', image: 'https://images.unsplash.com/photo-1586528116311-ad861f185458?auto=format&fit=crop&w=800&q=80' },
      { id: 'factory', name: 'Factories', desc: 'Manufacturing units and industrial plants.', count: '15+', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
    ]
  }
};

export default function CategoryDetail() {
  const { mainCategory } = useParams();
  const data = categoryData[mainCategory] || categoryData.residential;

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Dynamic Header / Hero */}
        <div className="relative h-[450px] w-full mb-20 overflow-hidden">
          <img 
            src={data.banner} 
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute inset-0 container mx-auto px-4 lg:px-8 flex flex-col justify-center">
             <Link to="/browse" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 font-bold text-sm">
                <ChevronLeft className="w-4 h-4" /> Back to Categories
             </Link>
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                   {data.icon}
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">{data.title}</h1>
             </div>
             <p className="text-slate-300 text-xl max-w-2xl font-medium leading-relaxed italic">
               "Refining your search within the {data.title.toLowerCase()} sector to find specific property architectures."
             </p>
          </div>
        </div>

        {/* Sub-Categories Grid */}
        <div className="container mx-auto px-4 lg:px-8">
           <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Select Property Type</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-slate-500 font-bold text-xs uppercase tracking-widest border border-stone-200">
                 <LayoutGrid className="w-4 h-4" /> {data.subCategories.length} Types Found
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.subCategories.map((sub) => (
                <Link 
                  key={sub.id}
                  to={`/properties/${mainCategory}/${sub.id}`}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-stone-200 hover:border-amber-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                >
                   <div className="h-56 relative overflow-hidden">
                      <img 
                        src={sub.image} 
                        alt={sub.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                         {sub.count} Units
                      </div>
                   </div>
                   
                   <div className="p-8 flex flex-col flex-1">
                      <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest mb-4">
                         <Sparkles className="w-3.5 h-3.5" /> Curated Collection
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{sub.name}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 italic flex-1">
                         "{sub.desc}"
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-auto">
                         <span className="text-sm font-bold text-slate-800">Explore Now</span>
                         <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-amber-500 transition-colors shadow-lg shadow-slate-950/10">
                            <ArrowRight className="w-5 h-5" />
                         </div>
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
