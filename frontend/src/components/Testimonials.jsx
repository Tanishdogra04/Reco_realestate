import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Tech Entrepreneur",
    text: "The AI valuation tool was spot-on. Reco helped me find a high-yield property in Bengaluru before it even hit the public market.",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Menon",
    role: "Interior Architect",
    text: "Working with Reco's legal concierge made my first home purchase in Mumbai seamless. Their attention to detail and RERA compliance is unmatched.",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Sethi",
    role: "Investment Banker",
    text: "The cinematic tours saved me weeks of travel. I could practically feel the space in Gurugram from my office in London. Highly recommended.",
    image: "https://i.pravatar.cc/150?img=59",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-200/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16 px-4">
          <p className="text-[10px] font-extrabold text-amber-500 uppercase tracking-[0.4em] mb-4">Curated Collection of Success</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted by the Most <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700 underline decoration-amber-500/20 underline-offset-8">Discerning Clients</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-200/60 relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-stone-100 group-hover:text-amber-50 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-600 text-lg font-medium leading-relaxed italic mb-10 relative z-10">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-stone-100 pt-8">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/20 shadow-lg">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-none mb-1 text-lg">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
