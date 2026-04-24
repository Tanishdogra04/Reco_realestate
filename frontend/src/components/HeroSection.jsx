import { useState } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (location) queryParams.set('location', location);
    if (propertyType) queryParams.set('type', propertyType);

    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="relative h-[90vh] min-h-[680px] w-full mt-[112px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/60 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full container mx-auto px-4 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-sm tracking-wide">Premium Properties Available</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-xl text-white">

            Discover Homes That Define
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">Your Lifestyle</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-lg leading-relaxed shadow-sm font-medium">
            Explore handpicked premium properties in the most desirable locations, designed for comfort, elegance, and modern living.
          </p>

          {/* Quick Search Widget */}
          <form
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-2xl shadow-2xl backdrop-blur-md max-w-xl flex flex-col sm:flex-row shadow-slate-900/40 border border-stone-200/50"
          >
            <div className="flex-1 flex items-center px-4 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r border-stone-200 focus-within:bg-stone-50 transition-colors rounded-t-xl sm:rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none">
              <MapPin className="h-5 w-5 text-amber-500 mr-3" />
              <input
                type="text"
                placeholder="Location, City, or Pincode"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm font-bold"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 sm:py-0 sm:border-r border-stone-200 focus-within:bg-stone-50 transition-colors">
              <Building2 className="h-5 w-5 text-amber-500 mr-3" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-900 text-sm font-bold cursor-pointer appearance-none"
              >
                <option value="">Property Type</option>
                <option value="house">House / Villa</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white p-4 sm:px-8 sm:py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-2 sm:mt-0 active:scale-95">
              <Search className="h-5 w-5" />
              <span className="sm:hidden">Search</span>
            </button>
          </form>

          {/* Stats / Trust indicators */}
          <div className="mt-12 flex gap-10 relative z-10">
            <div>
              <p className="text-4xl font-extrabold text-white">10K+</p>
              <p className="text-sm font-bold text-amber-500 mt-1 uppercase tracking-widest leading-none">Properties</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">5K+</p>
              <p className="text-sm font-bold text-amber-500 mt-1 uppercase tracking-widest leading-none">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
