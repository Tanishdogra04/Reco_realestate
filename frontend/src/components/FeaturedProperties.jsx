import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Maximize, Bath, BedDouble, MapPin, Share2, ArrowRight, Download, Check } from 'lucide-react';
import { fetchProperties, toggleSaveProperty } from '../api';

// PropertyCard is kept as a pure presentational component
export function PropertyCard({ property }) {
  const [isLiked, setIsLiked] = useState(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return userInfo.savedProperties?.includes(property._id || property.id) || false;
  });
  const [showShareToast, setShowShareToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    try {
      const res = await toggleSaveProperty(property._id || property.id, token);
      setIsLiked(!isLiked);
      
      // Update userInfo in localStorage to keep sync
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      userInfo.savedProperties = res.savedProperties;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      // Dispatch event for other components to listen (like Dashboard count)
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Like error:', err);
      // Fallback: if it fails, maybe toast an error
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const shareData = {
      title: property.title,
      text: `Check out this amazing property: ${property.title} by ${property.developer}`,
      url: window.location.href, // This should ideally be a property detail page link
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Share error:', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-stone-200 flex flex-col relative h-full">
      {showShareToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-2 animate-bounce shadow-xl">
          <Check className="w-3 h-3 text-emerald-400" /> Link Copied!
        </div>
      )}

      <div className="relative h-72 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm uppercase tracking-wide">
          {property.status}
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={handleLike} disabled={loading}
            className={`p-2.5 backdrop-blur-md rounded-full ${isLiked ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/40 text-white hover:text-rose-500 hover:bg-white'}`}>
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''} ${loading ? 'animate-pulse' : ''}`} />
          </button>
          <button onClick={handleShare}
            className="p-2.5 bg-white/40 backdrop-blur-md rounded-full text-white hover:text-blue-500 hover:bg-white">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 text-2xl font-extrabold text-white drop-shadow-md">
          {property.price}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-4 min-h-[3rem]">
          <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 flex-1" title={property.title}>{property.title}</h3>
          <p className="text-sm font-medium text-slate-500 flex items-center whitespace-nowrap bg-stone-100 px-2 py-1 rounded-md shrink-0">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> <span className="truncate max-w-[100px] sm:max-w-xs">{property.location}</span>
          </p>
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <a href="#" className="font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors truncate pr-2" title={property.developer}>
            By {property.developer}
          </a>
          <span className="text-slate-400 font-mono text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100">
            RERA: {property.rera}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8 bg-stone-50 p-3 rounded-xl border border-stone-100">
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <BedDouble className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-bold text-slate-700">{property.beds} Beds</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center border-x border-stone-200">
            <Bath className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-bold text-slate-700">{property.baths} Baths</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <Maximize className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-bold text-slate-700">{property.sqft} sqft</span>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <Link to={`/project/${property._id || property.id}`} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 text-center">
            View Project <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="flex-1 bg-white border-2 border-stone-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Brochure
          </button>
        </div>
      </div>
    </div>
  );
}

// Skeleton card for loading state
function PropertySkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 animate-pulse">
      <div className="h-72 bg-stone-200" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-stone-200 rounded-lg w-3/4" />
        <div className="h-4 bg-stone-100 rounded-lg w-1/2" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-14 bg-stone-100 rounded-xl" />
          <div className="h-14 bg-stone-100 rounded-xl" />
          <div className="h-14 bg-stone-100 rounded-xl" />
        </div>
        <div className="flex gap-3">
          <div className="h-12 bg-stone-200 rounded-xl flex-1" />
          <div className="h-12 bg-stone-100 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties()
      .then(data => setProperties(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Featured Projects</h2>
            <p className="text-slate-600 max-w-xl text-lg">
              Explore our handpicked selection of premium developments, offering luxury, comfort, and state-of-the-art amenities.
            </p>
          </div>
          <Link to="/properties" className="hidden sm:inline-block px-6 py-3 border border-slate-900 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map(i => <PropertySkeleton key={i} />)
            : properties.map(p => <PropertyCard key={p._id || p.id} property={p} />)
          }
        </div>
      </div>
    </section>
  );
}
