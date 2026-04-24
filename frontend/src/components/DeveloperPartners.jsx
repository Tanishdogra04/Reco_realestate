export default function DeveloperPartners() {
  const partners = [
    { name: "Lodha", tag: "Luxury Residencies" },
    { name: "DLF", tag: "Premium Estates" },
    { name: "Prestige", tag: "Golf Living" },
    { name: "Sobha", tag: "Artisan Quality" },
    { name: "Emaar", tag: "Global ICON" },
    { name: "Oberoi", tag: "Urban Elite" },
    { name: "Godrej", tag: "Heritage Trust" },
    { name: "Hiranandani", tag: "Township King" }
  ];

  // We duplicate the list to ensure a seamless infinite scroll
  const scrollingPartners = [...partners, ...partners];

  return (
    <section className="py-24 bg-white border-b border-stone-100 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-16 text-center">
        <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4">Strategic Real Estate Alliances</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Collaborating with Industry <span className="text-stone-300">Architects</span>
        </h2>
      </div>
      
      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 group hover:pause">
          {scrollingPartners.map((partner, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center min-w-[200px] h-32 bg-stone-50/50 border border-stone-100 rounded-3xl p-6 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-amber-500/5 group/logo"
            >
              <div className="text-2xl font-black text-slate-400 tracking-tighter uppercase italic group-hover/logo:text-slate-900 transition-colors">
                {partner.name}
              </div>
              <div className="text-[8px] font-bold text-stone-300 uppercase tracking-widest mt-2 group-hover/logo:text-amber-500 transition-colors">
                {partner.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="mt-16 h-px w-48 bg-stone-100 mx-auto"></div>
    </section>
  );
}
