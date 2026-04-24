import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PropertyCard } from '../components/FeaturedProperties';
import { fetchSavedProperties } from '../api';
import { Heart, Search } from 'lucide-react';

export default function SavedProperties() {
  const { userInfo } = useOutletContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        fetchSavedProperties(token)
          .then(setProperties)
          .catch(console.error)
          .finally(() => setLoading(false));
      }
    };

    loadProperties();
    window.addEventListener('storage', loadProperties);
    return () => window.removeEventListener('storage', loadProperties);
  }, []);

  return (
    <div className="space-y-10 animate-fade-in text-slate-900">
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" /> Saved Properties
        </h1>
        <p className="text-slate-500 font-medium text-lg">Your personal collection of dream homes and investments.</p>
        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-stone-200"></div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map(p => (
            <PropertyCard key={p._id || p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-20 border border-stone-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-200">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Saved Properties</h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">
            You haven't saved any properties yet. Start exploring and click the heart icon to save your favorites!
          </p>
        </div>
      )}
    </div>
  );
}
