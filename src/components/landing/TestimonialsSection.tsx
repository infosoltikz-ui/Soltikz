"use client";
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: "The AI suggestions are amazing! My ATS score improved from 65 to 92. Got more interviews in just a few weeks.",
    author: "Priya Singh",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    quote: "Best resume builder I've ever used. The templates are modern and very easy to customize.",
    author: "Rahul Verma",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/100?img=11"
  },
  {
    quote: "It helped me land my dream job! The cover letter builder is a fantastic bonus.",
    author: "Ananya Patel",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/100?img=9"
  }
]
const marqueeItems = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export function TestimonialsSection() {
  const displayItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Loved by <span className="text-primary">Job Seekers</span> Worldwide
          </h2>
        </div>

        <div className="overflow-hidden relative w-full -mx-4 px-4 sm:mx-0 sm:px-0 py-4">
          {/* Gradient fade on edges for better effect */}
          <div className="hidden sm:block absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
            {displayItems.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 w-[350px] shrink-0">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
