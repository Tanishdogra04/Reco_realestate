import { Link } from 'react-router-dom';
import { Facebook, X, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Column 1: Branding */}
          <div className="space-y-8">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1 group">
              Reco<span className="text-amber-500 group-hover:scale-125 transition-transform">.</span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs italic">
              "Redefining luxury real estate through artificial intelligence and unparalleled market expertise. Your dream home, curated with precision."
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-500 transition-all shadow-lg shadow-white/5">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-500 transition-all shadow-lg shadow-white/5">
                <X className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-500 transition-all shadow-lg shadow-white/5">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-500 transition-all shadow-lg shadow-white/5">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em]">Intelligence Hub</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/properties" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all flex items-center gap-2">
                Properties <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </Link>
              <Link to="/projects" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Projects</Link>
              <Link to="/insights" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Archived Insights</Link>
              <Link to="/technologies" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Our Technology</Link>
              <Link to="/events" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Luxury Events</Link>
            </nav>
          </div>

          {/* Column 3: Professional Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em]">Corporate</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/about" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Who We Are</Link>
              <Link to="/careers" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Careers & Growth</Link>
              <Link to="/press" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Global Newsroom</Link>
              <Link to="/legal" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Legal Vetting</Link>
              <Link to="/privacy" className="text-slate-400 text-sm font-bold hover:text-amber-500 hover:translate-x-2 transition-all">Privacy Excellence</Link>
            </nav>
          </div>

          {/* Column 4: Contact Infomation */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em]">Connect</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Send an Inquiry</p>
                  <p className="text-white text-sm font-bold">concierge@reco.estate</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Global Concierge</p>
                  <p className="text-white text-sm font-bold">+91 82787 13791</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Regional HQ</p>
                  <p className="text-white text-sm font-bold whitespace-nowrap">Dharamshala, Himachal Pradesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
            &copy; {currentYear} Reco Real Estate Portfolio. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-amber-500 transition-colors">Site Map</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Cookie Strategy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
