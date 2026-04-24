import { useState, useEffect } from 'react';
import { X, Home, MapPin, DollarSign, BedDouble, Bath, Maximize, Building2, Tag, User, FileText, Image, AlertCircle, Check } from 'lucide-react';

const STATUSES = ['Ready to Move', 'Under Construction', 'New Launch', 'Upcoming'];
const TYPES    = ['Apartment', 'Villa', 'Penthouse', 'Commercial', 'Plot'];
const CATEGORIES = ['Buy', 'Rent', 'Commercial'];

const EMPTY_FORM = {
  title: '', location: '', price: '', beds: '', baths: '',
  sqft: '', status: 'Ready to Move', type: 'Apartment',
  category: 'Buy', developer: '', rera: '', image: '',
};

export default function PropertyFormModal({ isOpen, onClose, onSave, property }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const isEdit = !!property?._id;

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccess(false);
      if (isEdit) {
        setForm({
          title:     property.title     || '',
          location:  property.location  || '',
          price:     property.price     || '',
          beds:      property.beds      ?? '',
          baths:     property.baths     ?? '',
          sqft:      property.sqft      || '',
          status:    property.status    || 'Ready to Move',
          type:      property.type      || 'Apartment',
          category:  property.category  || 'Buy',
          developer: property.developer || '',
          rera:      property.rera      || '',
          image:     property.image     || '',
        });
      } else {
        setForm(EMPTY_FORM);
      }
    }
  }, [isOpen, property]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        beds:  Number(form.beds)  || 0,
        baths: Number(form.baths) || 0,
        sqft:  Number(form.sqft)  || 0,
      };
      await onSave(payload, isEdit ? property._id : null);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); }, 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop with enhanced blur */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" />

      {/* Modal Container */}
      <div
        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Left Side: Live Preview (Hidden on small screens or shown as a small card) */}
        <div className="hidden lg:flex w-80 bg-stone-50 border-r border-stone-100 p-8 flex-col gap-6">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Preview</div>
          
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col group">
            <div className="h-44 overflow-hidden relative">
              <img 
                src={form.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80'} 
                alt="Preview" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tracking-widest">
                {form.category}
              </div>
            </div>
            <div className="p-5">
              <p className="font-black text-slate-900 text-sm truncate leading-tight">{form.title || 'Property Title'}</p>
              <p className="text-slate-400 text-[10px] font-bold mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {form.location || 'Location'}
              </p>
              <div className="mt-4 pt-4 border-t border-stone-50 flex items-center justify-between">
                <p className="font-black text-slate-900 text-base tracking-tighter">{form.price || '₹ 0.00'}</p>
                <div className="flex gap-2">
                   <div className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-[9px] font-bold text-slate-500">{form.beds || 0}</div>
                   <div className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-[9px] font-bold text-slate-500">{form.baths || 0}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10">
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1 italic">Drafting Mode</p>
            <p className="text-[11px] text-amber-900/60 leading-relaxed uppercase font-black">Changes are reflected in real-time as you input property specifications.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Header */}
          <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/10">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {isEdit ? 'Refine Asset' : 'Register New Asset'}
                </h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                  ID: {isEdit ? property._id.slice(-8).toUpperCase() : 'PENDING_REGISTRATION'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-stone-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900 active:scale-95">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-4 bg-red-50 border border-red-200 text-red-700 font-bold text-xs p-4 rounded-2xl animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="uppercase tracking-wider">Validation Error: {error}</p>
              </div>
            )}

            {/* Section 1: Core Identification */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">01. Core Identification</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField icon={<Home className="w-4 h-4" />} label="Asset Title" required>
                  <input name="title" value={form.title} onChange={handleChange}
                    placeholder="e.g. Lodha Altamount" required
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
                <FormField icon={<User className="w-4 h-4" />} label="Stakeholder / Developer" required>
                  <input name="developer" value={form.developer} onChange={handleChange}
                    placeholder="e.g. Lodha Group" required
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
              </div>
            </div>

            {/* Section 2: Location & Pricing */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">02. Valuation & Location</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField icon={<MapPin className="w-4 h-4" />} label="Geographic Location" required>
                  <input name="location" value={form.location} onChange={handleChange}
                    placeholder="e.g. BKC, Mumbai" required
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
                <FormField icon={<DollarSign className="w-4 h-4" />} label="Market Valuation" required>
                  <input name="price" value={form.price} onChange={handleChange}
                    placeholder="e.g. ₹4.50 Cr" required
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
              </div>
            </div>

            {/* Section 3: Technical Specifications */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">03. Technical Specifications</div>
              <div className="grid grid-cols-3 gap-5">
                <FormField icon={<BedDouble className="w-4 h-4" />} label="Bedrooms">
                  <input name="beds" type="number" min="0" value={form.beds} onChange={handleChange}
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
                <FormField icon={<Bath className="w-4 h-4" />} label="Bathrooms">
                  <input name="baths" type="number" min="0" value={form.baths} onChange={handleChange}
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
                <FormField icon={<Maximize className="w-4 h-4" />} label="SQ. FT Area" required>
                  <input name="sqft" type="number" min="1" value={form.sqft} onChange={handleChange}
                    placeholder="1200" required
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
              </div>
            </div>

            {/* Section 4: Classification */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">04. Classification</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Category</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none cursor-pointer">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Inventory Type</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none cursor-pointer">
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Operational Status</label>
                  <select name="status" value={form.status} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none cursor-pointer">
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 5: Media & Compliance */}
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">05. Media & Compliance</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField icon={<FileText className="w-4 h-4" />} label="RERA Registration">
                  <input name="rera" value={form.rera} onChange={handleChange}
                    placeholder="e.g. P519000123"
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
                <FormField icon={<Image className="w-4 h-4" />} label="Asset Image URL">
                  <input name="image" value={form.image} onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none text-slate-900 placeholder-slate-400 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </FormField>
              </div>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-8 bg-stone-50/50 border-t border-stone-100 flex gap-4">
            <button type="button" onClick={onClose}
              className="flex-1 py-4 border border-stone-200 hover:bg-white text-slate-600 font-black uppercase tracking-widest rounded-2xl transition-all text-[11px] active:scale-95 shadow-sm">
              Discard Changes
            </button>
            <button type="submit" onClick={handleSubmit} disabled={loading || success}
              className="flex-[2] py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-black uppercase tracking-widest rounded-2xl transition-all text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 active:scale-95">
              {success ? (
                <><Check className="w-4 h-4 text-emerald-400" /> Synchronization Complete</>
              ) : loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : (
                isEdit ? 'Update Asset Specifications' : 'Authorize Asset Creation'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ icon, label, required, children }) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}
