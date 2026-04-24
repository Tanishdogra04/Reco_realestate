import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, MapPin, Building, IndianRupee, ArrowLeft } from 'lucide-react';

export default function PostProperty() {
  const [images, setImages] = useState([]);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-stone-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-extrabold text-slate-900">Post New Property</h1>
          </div>
          <div className="text-sm font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full uppercase tracking-wider">
            Free Listing
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <form className="space-y-8">
            {/* Section 1: Basic Information */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <Building className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-white">Basic Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property Title</label>
                  <input type="text" placeholder="e.g. Luxury Villa in Bandra West" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property Type</label>
                  <select className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors appearance-none">
                    <option>Apartment</option>
                    <option>Villa / Independent House</option>
                    <option>Penthouse</option>
                    <option>Commercial Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors appearance-none">
                    <option>Ready to Move</option>
                    <option>Under Construction</option>
                    <option>New Launch</option>
                  </select>
                </div>
                
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                  <textarea rows="4" placeholder="Describe the key features of the property..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors"></textarea>
                </div>
              </div>
            </section>

            {/* Section 2: Pricing & Metrics */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <IndianRupee className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-white">Pricing & Metrics</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="sm:col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Expected Price (₹)</label>
                  <input type="number" placeholder="25000000" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-slate-900 font-bold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Area (sqft)</label>
                  <input type="number" placeholder="3200" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-slate-900 font-bold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Bedrooms</label>
                  <input type="number" placeholder="3" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-slate-900 font-bold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Bathrooms</label>
                  <input type="number" placeholder="3" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-slate-900 font-bold transition-colors" />
                </div>
              </div>
            </section>

            {/* Section 3: Location */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-white">Location Details</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                  <input type="text" placeholder="Mumbai" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pincode</label>
                  <input type="text" placeholder="400050" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
                  <input type="text" placeholder="Street name and plot number..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-slate-900 font-medium transition-colors" />
                </div>
              </div>
            </section>

            {/* Section 4: Media Upload */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <Upload className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-white">Property Media</h2>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-stone-300 rounded-2xl bg-stone-50 p-10 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">Click to upload photos</h3>
                  <p className="text-sm text-slate-500 font-medium text-center">or drag and drop here <br/> (Max. 10 images, up to 5MB each)</p>
                </div>
              </div>
            </section>

            {/* Submit Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between sticky bottom-6 z-40">
              <p className="text-sm font-medium text-slate-500 hidden sm:block">By submitting, you agree to our Terms of Service.</p>
              <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all active:scale-95">
                Submit Property
              </button>
            </div>
            
          </form>

        </div>
      </main>
    </div>
  );
}
