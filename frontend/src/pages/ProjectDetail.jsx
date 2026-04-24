import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, BedDouble, Bath, Maximize, CheckCircle2, 
  Download, Calendar, ShieldCheck, Star, 
  ArrowLeft, Share2, Heart, MessageSquare, Phone, 
  Waves, Dumbbell, Car, Trees, Wind, Coffee 
} from 'lucide-react';
import { fetchPropertyById, toggleSaveProperty } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    fetchPropertyById(id)
      .then(data => {
        setProject(data);
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        setIsLiked(userInfo.savedProperties?.includes(data._id) || false);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return;
    try {
      const res = await toggleSaveProperty(project._id, token);
      setIsLiked(!isLiked);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      userInfo.savedProperties = res.savedProperties;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Project not found</h2>
      <Link to="/properties" className="text-amber-600 font-bold hover:underline">Back to listings</Link>
    </div>
  );

  // Luxury amenities mock
  const amenities = [
    { icon: <Waves className="w-5 h-5" />, label: 'Swimming Pool' },
    { icon: <Dumbbell className="w-5 h-5" />, label: 'State-of-the-art Gym' },
    { icon: <ShieldCheck className="w-5 h-5" />, label: '24/7 Security' },
    { icon: <Car className="w-5 h-5" />, label: 'Covered Parking' },
    { icon: <Trees className="w-5 h-5" />, label: 'Landscaped Gardens' },
    { icon: <Wind className="w-5 h-5" />, label: 'Central Cooling' },
    { icon: <Coffee className="w-5 h-5" />, label: 'Resident Lounge' },
    { icon: <Star className="w-5 h-5" />, label: 'Concierge Service' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Gallery Section */}
      <section className="pt-24 pb-12 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/properties" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explorations
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="lg:col-span-3 lg:row-span-2 relative group h-full">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="bg-amber-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">Featured Project</span>
                <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-2">{project.title}</h1>
                <p className="flex items-center text-lg font-medium text-stone-200">
                  <MapPin className="w-5 h-5 mr-2 text-amber-400" /> {project.location}
                </p>
              </div>
            </div>
            <div className="hidden lg:block relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" alt="Interior" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="hidden lg:block relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80" alt="Detail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="text-white font-bold bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">+12 More Photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content */}
            <div className="flex-1 lg:max-w-[calc(100%-400px)]">
              {/* Quick Glance */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 bg-stone-50 border border-stone-200 p-8 rounded-3xl shadow-sm">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fixed Cost</p>
                  <p className="text-xl font-black text-slate-900">{project.price}</p>
                </div>
                <div className="space-y-1 border-l border-stone-200 pl-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Area</p>
                  <p className="text-xl font-black text-slate-900">{project.sqft.toLocaleString()} sqft</p>
                </div>
                <div className="space-y-1 border-l border-stone-200 pl-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Configurations</p>
                  <p className="text-xl font-black text-slate-900">{project.beds} BHK</p>
                </div>
                <div className="space-y-1 border-l border-stone-200 pl-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
                  <p className="text-xl font-black text-amber-600">{project.status}</p>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Project Narrative</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed space-y-4">
                    <p>
                      Experience luxury living redefine at {project.title}. Designed by world-renowned architects, this development 
                      seamlessly blends contemporary design with timeless elegance. Every detail—from the soaring ceilings to the 
                      hand-picked materials—has been curated for a lifestyle of unparalleled sophistication.
                    </p>
                    <p>
                      Located in the heart of {project.location}, the project offers breathtaking views and effortless connectivity 
                      to the city's key financial hubs, premium shopping, and elite educational institutions. Built with a vision by 
                      {project.developer}, this is more than a residence; it is a landmark of prestige.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">World-Class Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-amber-400 hover:shadow-lg transition-all group cursor-default">
                        <div className="mb-3 text-slate-400 group-hover:text-amber-500 transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-700 text-center">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Architectural Floor Plans</h2>
                  <div className="bg-stone-50 rounded-3xl border border-dashed border-stone-300 p-12 flex flex-col items-center justify-center group hover:bg-stone-100 transition-colors cursor-pointer">
                    <Maximize className="w-12 h-12 text-stone-300 group-hover:scale-110 transition-transform mb-4" />
                    <p className="text-slate-700 font-bold mb-1">Interactive Floor Plan View</p>
                    <p className="text-slate-400 text-sm text-center">Detailed layouts for {project.beds} BHK + Den available in PDF & 3D Interactive mode.</p>
                    <button className="mt-8 flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-stone-200 text-sm font-bold text-slate-700 shadow-sm hover:shadow transition-shadow">
                      <Download className="w-4 h-4" /> Download Brochure
                    </button>
                  </div>
                </div>

                <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black tracking-tight mb-4">Prime Connectivity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-1">
                        <p className="text-slate-400 text-[10px] font-black uppercase">Education Hub</p>
                        <p className="font-bold text-lg">5 mins walk</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-[10px] font-black uppercase">Financial District</p>
                        <p className="font-bold text-lg">12 mins drive</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-[10px] font-black uppercase">International Airport</p>
                        <p className="font-bold text-lg">25 mins drive</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="lg:w-[360px]">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-[2rem] border border-stone-200 shadow-xl p-8 sticky z-30">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Reserve a Tour</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Direct Developer Link</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleLike} className={`p-3 rounded-full ${isLiked ? 'bg-rose-500 text-white' : 'bg-stone-100 text-slate-400 hover:text-rose-500'}`}>
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-3 bg-stone-100 rounded-full text-slate-400 hover:text-blue-500">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-sm font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Connect At</label>
                      <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-sm font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Message</label>
                      <textarea rows="3" placeholder="I am interested in..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 text-sm font-medium resize-none" />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                      Submit Request <MessageSquare className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-stone-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Hotline Support</p>
                      <p className="text-sm font-black text-slate-900">+91 1800-RECO-ESTATE</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
                    <div>
                      <p className="font-bold text-amber-900 text-sm">Verified Excellence</p>
                      <p className="text-amber-700/70 text-xs mt-1">This property is Reco. Verified, ensuring data accuracy and RERA compliance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
