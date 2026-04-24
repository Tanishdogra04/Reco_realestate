import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { PropertyCard } from '../components/FeaturedProperties';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, SlidersHorizontal, ChevronRight, Sparkles, MapPin, Building2, LayoutGrid } from 'lucide-react';
import { fetchProperties } from '../api';

const heroConfigs = {
  residential: {
    title: 'Elite Residences',
    subtitle: 'Luxury apartments and palatial villas designed for the discerning few.',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    accent: 'text-amber-500'
  },
  commercial: {
    title: 'Corporate Landmarks',
    subtitle: 'Strategic office spaces and retail hubs in the heart of commercial excellence.',
    bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    accent: 'text-blue-500'
  },
  land: {
    title: 'Prime Estates',
    subtitle: 'Invest in the future with premium residential and agricultural lands.',
    bg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    accent: 'text-emerald-500'
  },
  industrial: {
    title: 'Industrial Frontiers',
    subtitle: 'State-of-the-art warehouses and manufacturing facilities.',
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    accent: 'text-purple-500'
  },
  default: {
    title: 'Proprietary Collection',
    subtitle: 'Curating the finest elite properties across the most prestigious locations.',
    bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    accent: 'text-slate-500'
  }
};

function PropertySkeleton() {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-200 animate-pulse">
      <div className="h-72 bg-stone-200" />
      <div className="p-8 space-y-4">
        <div className="h-6 bg-stone-200 rounded-lg w-3/4" />
        <div className="h-4 bg-stone-100 rounded-lg w-1/2" />
        <div className="grid grid-cols-3 gap-2">
           <div className="h-12 bg-stone-100 rounded-xl"></div>
           <div className="h-12 bg-stone-100 rounded-xl"></div>
           <div className="h-12 bg-stone-100 rounded-xl"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-12 bg-stone-200 rounded-xl flex-1" />
          <div className="h-12 bg-stone-100 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyListing() {
  const { category, type, status, mainCategory, subCategory } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  const [properties, setProperties]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [localSearch, setLocalSearch] = useState('');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Build Hero Data
  const currentMainCat = mainCategory || category || 'default';
  const hero = heroConfigs[currentMainCat.toLowerCase()] || heroConfigs.default;
  
  // Build Page Title
  let displayTitle = hero.title;
  if (subCategory || type) {
    const sub = subCategory || type;
    displayTitle = `${sub.charAt(0).toUpperCase() + sub.slice(1)}s Collection`;
  } else if (searchQuery) {
    displayTitle = `Search: ${searchQuery}`;
  }

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (category)    params.category = category;
    if (type)        params.type = type;
    if (mainCategory) {
       // Map mainCategory to DB category if needed
       if (mainCategory === 'residential') params.category = 'Buy'; // Default for residential
       else if (mainCategory === 'commercial') params.category = 'Commercial';
    }
    if (subCategory) {
       // subCategory maps to property type
       const map = {
          'apartment': 'Apartment',
          'villa': 'Villa',
          'penthouse': 'Penthouse',
          'office': 'Commercial',
          'retail': 'Commercial',
          'plot': 'Plot'
       };
       params.type = map[subCategory.toLowerCase()] || subCategory;
    }
    if (status) {
      const statusMap = { ready: 'Ready to Move', new: 'New Launch', 'under-construction': 'Under Construction' };
      params.status = statusMap[status] || status;
    }

    fetchProperties(params)
      .then(setProperties)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchQuery, category, type, status, mainCategory, subCategory]);

  // Client-side filtering
  const filtered = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(localSearch.toLowerCase()) || 
                          p.location.toLowerCase().includes(localSearch.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    
    // Simple price filter logic (example)
    let matchesPrice = true;
    if (filterPrice !== 'all') {
      const numericPrice = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
      if (filterPrice === 'low') matchesPrice = numericPrice < 5; // Under 5 Cr
      if (filterPrice === 'mid') matchesPrice = numericPrice >= 5 && numericPrice <= 15;
      if (filterPrice === 'high') matchesPrice = numericPrice > 15;
    }
    
    return matchesSearch && matchesStatus && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="pb-24">
        {/* Premium Hero Header */}
        <div className="relative h-[550px] w-full mb-16 overflow-hidden">
          <img 
            src={hero.bg} 
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-950/60 to-transparent"></div>
          
          <div className="absolute inset-0 container mx-auto px-4 lg:px-8 flex flex-col justify-end pb-20">
             <div className="max-w-4xl space-y-6">
                <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-[0.4em]">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link> 
                  <ChevronRight className="w-3 h-3" /> 
                  <Link to="/browse" className="hover:text-white transition-colors">Discovery</Link>
                  {mainCategory && (
                    <>
                      <ChevronRight className="w-3 h-3" /> 
                      <Link to={`/browse/${mainCategory}`} className="hover:text-white transition-colors uppercase">{mainCategory}</Link>
                    </>
                  )}
                  <ChevronRight className="w-3 h-3" /> 
                  <span className="text-white">Collection</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
                  {displayTitle}
                </h1>
                <p className="text-slate-300 text-xl font-medium leading-relaxed italic max-w-2xl bg-black/20 backdrop-blur-md p-4 rounded-xl border-l-4 border-amber-500 shadow-2xl">
                  "{hero.subtitle}"
                </p>
             </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          {/* Enhanced Search & Filters Bar */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-stone-200 mb-16 -mt-28 relative z-20 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Search by city, locality, or project name..."
                className="w-full pl-14 pr-6 py-5 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all text-sm font-bold text-slate-700"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
               <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-3">Price</span>
                  <select 
                    value={filterPrice}
                    onChange={e => setFilterPrice(e.target.value)}
                    className="bg-transparent outline-none text-sm font-bold text-slate-700 px-3 py-2 cursor-pointer"
                  >
                     <option value="all">Any Price</option>
                     <option value="low">Under 5 Cr</option>
                     <option value="mid">5 - 15 Cr</option>
                     <option value="high">15 Cr+</option>
                  </select>
               </div>

               <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-3">Status</span>
                  <select 
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="bg-transparent outline-none text-sm font-bold text-slate-700 px-3 py-2 cursor-pointer"
                  >
                     <option value="all">Any Status</option>
                     <option value="Ready to Move">Ready to Move</option>
                     <option value="Under Construction">Under Construction</option>
                     <option value="New Launch">New Launch</option>
                  </select>
               </div>

               <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-wider hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                  <SlidersHorizontal className="w-4 h-4" /> Finalize
               </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-12 px-2">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                   <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Results Catalog</p>
                   <p className="text-lg font-bold text-slate-900 leading-none">Showing <span className="text-amber-500">{filtered.length}</span> curated properties</p>
                </div>
             </div>
             
             <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-500" /> Premium Listings Only
             </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => <PropertySkeleton key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filtered.map(p => <PropertyCard key={p._id || p.id} property={p} />)}
            </div>
          ) : (
            <div className="py-40 text-center bg-white rounded-[3rem] border border-stone-200 shadow-inner">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 text-stone-300">
                <Search className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">No Properties Match Your Refinement</h2>
              <p className="text-slate-500 text-lg font-medium max-w-md mx-auto italic mb-10">
                "Precision sometimes yields no results. Try broadening your criteria or exploring other specialized categories."
              </p>
              <button 
                onClick={() => { setLocalSearch(''); setFilterPrice('all'); setFilterStatus('all'); }}
                className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
