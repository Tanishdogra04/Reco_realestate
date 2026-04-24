import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Plus, Pencil, Trash2, LogOut,
  Search, RefreshCw, Home, BedDouble, MapPin, Tag,
  TrendingUp, CheckCircle, Clock, Sparkles, AlertTriangle, X, Shield
} from 'lucide-react';
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '../api';
import PropertyFormModal from '../components/PropertyFormModal';

const STATUS_COLORS = {
  'Ready to Move':      'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Under Construction': 'bg-blue-100 text-blue-700 border-blue-200',
  'New Launch':         'bg-amber-100 text-amber-700 border-amber-200',
  'Upcoming':           'bg-purple-100 text-purple-700 border-purple-200',
};

const CATEGORY_COLORS = {
  'Buy':        'bg-slate-900 text-white',
  'Rent':       'bg-teal-600 text-white',
  'Commercial': 'bg-orange-500 text-white',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState('');
  const [filterCat, setFilterCat]       = useState('All');
  const [modalOpen, setModalOpen]       = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab]       = useState('dashboard');
  const [toast, setToast]               = useState(null);

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
  const token     = localStorage.getItem('adminToken');

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) navigate('/admin/login', { replace: true });
  }, [token, navigate]);

  const loadProperties = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProperties();
      setProperties(data);
    } catch {
      showToast('Failed to load properties.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProperties(); }, [loadProperties]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login', { replace: true });
  };

  const handleOpenAdd = () => { setEditProperty(null); setModalOpen(true); };
  const handleOpenEdit = (p) => { setEditProperty(p); setModalOpen(true); };

  const handleSave = async (formData, id) => {
    if (id) {
      await updateProperty(id, formData, token);
      showToast('Property updated successfully!');
    } else {
      await createProperty(formData, token);
      showToast('Property created successfully!');
    }
    await loadProperties();
  };

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id, token);
      setProperties(prev => prev.filter(p => p._id !== id));
      showToast('Property deleted.');
    } catch {
      showToast('Failed to delete property.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Filtered display list
  const displayed = properties.filter(p => {
    const matchesCat = filterCat === 'All' || p.category === filterCat;
    const q = search.toLowerCase();
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.developer.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Stats
  const stats = {
    total:      properties.length,
    buy:        properties.filter(p => p.category === 'Buy').length,
    rent:       properties.filter(p => p.category === 'Rent').length,
    commercial: properties.filter(p => p.category === 'Commercial').length,
    ready:      properties.filter(p => p.status === 'Ready to Move').length,
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 glass-dark flex-col sticky top-0 h-screen z-30 border-r border-white/5">
        <div className="p-8 flex flex-col gap-1">
          <Link to="/" className="text-3xl font-extrabold text-white tracking-tighter flex items-center gap-2 group">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Sparkles className="w-6 h-6 text-slate-900" />
            </div>
            <span>Reco<span className="text-amber-400">.</span></span>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-white/5">v2.0.4 Premium</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Main Menu</div>
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard Hub" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<Building2 className="w-5 h-5" />} 
            label="Property Inventory" 
            active={activeTab === 'properties'} 
            onClick={() => setActiveTab('properties')} 
          />
          
          <div className="pt-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">External</div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold group">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
              <Home className="w-4 h-4" />
            </div>
            Public Portal
          </Link>
        </nav>

        <div className="p-6 mt-auto">
          <div className="glass-dark border border-white/10 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Shield className="w-5 h-5 text-slate-900" />
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-bold truncate">{adminInfo.name || 'Admin User'}</p>
                <p className="text-slate-500 text-xs truncate">System Administrator</p>
              </div>
            </div>
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all text-xs font-bold">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header with Glassmorphism */}
        <header className="glass border-b border-stone-200/60 px-8 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm backdrop-blur-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Admin</span>
              <span className="text-slate-300">/</span>
              <span className="text-amber-600">{activeTab === 'dashboard' ? 'Overview' : 'Inventory'}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {activeTab === 'dashboard' ? 'Executive Dashboard' : 'Property Inventory'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full border border-stone-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">System Live</span>
            </div>
            
            <button onClick={loadProperties} className="p-3 bg-white hover:bg-stone-50 border border-stone-200 rounded-2xl transition-all text-slate-500 shadow-sm hover:shadow-md active:scale-95" title="Refresh Data">
              <RefreshCw className="w-4 h-4" />
            </button>
            
            {activeTab === 'properties' && (
              <button onClick={handleOpenAdd}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                <Plus className="w-4 h-4" /> Add Property
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {activeTab === 'dashboard' ? (
            <div className="space-y-8 animate-in fade-in duration-700">
              {/* Stats Cards with Gradients */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Inventory', value: stats.total,      icon: <Building2 className="w-6 h-6" />, color: 'from-slate-800 to-slate-900', shadow: 'shadow-slate-200' },
                  { label: 'Properties for Sale', value: stats.buy,        icon: <Tag className="w-6 h-6" />,      color: 'from-blue-600 to-indigo-700', shadow: 'shadow-blue-100' },
                  { label: 'Rental Listings',   value: stats.rent,       icon: <TrendingUp className="w-6 h-6" />,color: 'from-emerald-500 to-teal-700', shadow: 'shadow-emerald-100' },
                  { label: 'Ready for Possession', value: stats.ready,      icon: <CheckCircle className="w-6 h-6" />,color: 'from-amber-400 to-orange-600', shadow: 'shadow-amber-100' },
                ].map(({ label, value, icon, color, shadow }) => (
                  <div key={label} className={`relative overflow-hidden bg-white rounded-[2rem] border border-stone-200/60 p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                    <div className={`w-14 h-14 bg-gradient-to-br ${color} text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mt-1">{label}</p>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      {icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Hub Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-stone-200/60 p-10 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-amber-500/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center animate-float">
                        <Sparkles className="w-8 h-8 text-amber-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome to the Command Center</h2>
                        <p className="text-slate-500 font-medium">Your premium real estate portfolio is currently performing optimally.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200/50 hover:bg-white hover:border-amber-200 transition-all cursor-default">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Quick Insight</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          You have <span className="font-bold text-slate-900">{stats.ready}</span> units move-in ready. 
                          Construction updates are needed for <span className="font-bold text-slate-900">{properties.length - stats.ready}</span> properties.
                        </p>
                      </div>

                      <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200/50 hover:bg-white hover:border-emerald-200 transition-all cursor-default">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                            <Shield className="w-4 h-4 text-emerald-600" />
                          </div>
                          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Security Status</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Role-based access is active. Latest RERA compliance checks passed for 98% of your inventory listings.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('properties')} 
                      className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:translate-x-1 transition-all shadow-xl shadow-slate-900/10"
                    >
                      Audit Inventory <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="glass-dark rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                  
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Services</span>
                    </div>
                    <h3 className="text-xl font-black mb-6 tracking-tight">Operational Resources</h3>
                    <ul className="space-y-6">
                      {[
                        { icon: <CheckCircle className="text-emerald-400" />, label: 'Market Feed: Connected' },
                        { icon: <Clock className="text-blue-400" />, label: 'Analytics: Syncing' },
                        { icon: <AlertTriangle className="text-amber-400" />, label: 'System Health: 99.8%' },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 group cursor-default">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                            {item.icon}
                          </div>
                          <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Build Identifier</p>
                    <p className="text-xs font-mono text-slate-400">RC-ALPHA-7720-X</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Filters */}
              <div className="bg-white rounded-3xl border border-stone-200/60 p-4 flex flex-col md:flex-row gap-4 shadow-sm items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text" value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by title, location, developer..."
                    className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-sm font-medium focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  {['All', 'Buy', 'Rent', 'Commercial'].map(cat => (
                    <button key={cat} onClick={() => setFilterCat(cat)}
                      className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border whitespace-nowrap ${filterCat === cat ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20' : 'bg-white text-slate-500 border-stone-200 hover:border-slate-400'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-[2rem] border border-stone-200/60 shadow-sm overflow-hidden">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-6">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full" />
                      <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Fetching Assets...</p>
                  </div>
                ) : displayed.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-6 text-center px-6">
                    <div className="w-20 h-20 bg-stone-100 rounded-[2.5rem] flex items-center justify-center animate-bounce">
                      <Sparkles className="w-10 h-10 text-stone-300" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-black text-xl tracking-tight">Inventory Empty</p>
                      <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">No assets match your current search parameters or filters.</p>
                    </div>
                    <button onClick={handleOpenAdd}
                      className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:translate-y-1 transition-all">
                      <Plus className="w-4 h-4" /> Initialize New Asset
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-stone-100 bg-stone-50/50">
                            <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-8 py-5">Property Details</th>
                            <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 py-5">Classification</th>
                            <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 py-5">Current Status</th>
                            <th className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-6 py-5">Valuation</th>
                            <th className="text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-8 py-5">Options</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                          {displayed.map(p => (
                            <tr key={p._id} className="hover:bg-amber-50/30 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-5">
                                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-stone-200/60 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover"
                                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&q=60'; }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 text-sm tracking-tight leading-tight mb-1">{p.title}</p>
                                    <div className="flex items-center gap-3 text-xs font-medium">
                                      <p className="text-slate-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {p.location}
                                      </p>
                                      <span className="w-1 h-1 rounded-full bg-stone-300" />
                                      <p className="text-amber-600 font-bold uppercase tracking-wider text-[10px]">{p.developer}</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-6">
                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${CATEGORY_COLORS[p.category] || 'bg-stone-200 text-slate-700'} shadow-sm`}>
                                  {p.category}
                                </span>
                              </td>
                              <td className="px-6 py-6">
                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${STATUS_COLORS[p.status] || 'bg-stone-100 text-slate-600 border-stone-200'}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="px-6 py-6">
                                <p className="font-black text-slate-900 text-base tracking-tighter">{p.price}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{p.sqft?.toLocaleString()} SQ. FT</p>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                  <button onClick={() => handleOpenEdit(p)}
                                    className="p-2.5 bg-white hover:bg-amber-500 hover:text-white text-slate-500 rounded-xl transition-all border border-stone-200 shadow-sm">
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => setDeleteConfirm(p)}
                                    className="p-2.5 bg-white hover:bg-red-500 hover:text-white text-slate-500 rounded-xl transition-all border border-stone-200 shadow-sm">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="md:hidden divide-y divide-stone-100">
                      {displayed.map(p => (
                        <div key={p._id} className="p-6 flex flex-col gap-4">
                          <div className="flex gap-4">
                            <img src={p.image} alt={p.title}
                              className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-stone-200"
                              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&q=60'; }} />
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <p className="font-black text-slate-900 text-sm truncate uppercase tracking-tight">{p.title}</p>
                              <p className="text-slate-400 text-[11px] font-medium mt-1 truncate">{p.location}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${CATEGORY_COLORS[p.category] || 'bg-stone-200 text-slate-700'}`}>{p.category}</span>
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-stone-200 text-slate-500`}>{p.status}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Valuation</p>
                                <p className="font-black text-slate-900 text-lg tracking-tighter">{p.price}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleOpenEdit(p)} className="p-3 bg-stone-100 text-slate-600 rounded-2xl border border-stone-200 active:scale-95 transition-all"><Pencil className="w-4 h-4" /></button>
                              <button onClick={() => setDeleteConfirm(p)} className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 active:scale-95 transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Property Form Modal */}
      <PropertyFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        property={editProperty}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-100">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Authorize Deletion?</h3>
            <p className="text-slate-500 font-medium text-sm text-center mb-8 px-4">
              Permanent removal of <span className="font-black text-slate-900">"{deleteConfirm.title}"</span> from the inventory. This action is irreversible.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-4 border border-stone-200 hover:bg-stone-50 text-slate-600 font-black uppercase tracking-widest rounded-2xl transition-all text-[11px]">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm._id)}
                className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all text-[11px] shadow-xl shadow-red-500/20 active:scale-95">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest transition-all animate-in slide-in-from-bottom-5
          ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}>
          {toast.type === 'error' ? <X className="w-5 h-5" /> : <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></div>}
          {toast.message}
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer group
      ${active ? 'bg-white/10 text-white shadow-lg shadow-black/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${active ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
        {icon}
      </div>
      {label}
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
    </div>
  );
}
