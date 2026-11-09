"use client";
import { Star, CheckCircle, Quote, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    quote: "I sent 40 generic resumes with zero replies. After tailoring my resume to the JD using this builder, my ATS score went from 62 to 94. I got three callbacks in one week and landed my Senior SRE role!",
    author: "Priya S.",
    role: "Senior Site Reliability Engineer",
    company: "Hired at Cloudflare",
    outcome: "ATS: 62 → 94",
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    quote: "The C2C format is game changing. For contract submissions, staffing vendors demand an exact tech skills matrix and bullet format. This generated exactly what recruiters asked for without manual formatting.",
    author: "Rahul Verma",
    role: "Enterprise Data Architect",
    company: "Contract Placed in 14 Days",
    outcome: "4 Offers Received",
    avatar: "https://i.pravatar.cc/100?img=11"
  },
  {
    quote: "Most tools give you a random percentage score and stop there. This builder actually told me which four KQL keywords were missing and rewrote my bullets with measurable metrics.",
    author: "Ananya Patel",
    role: "Lead Product Designer",
    company: "Hired at FinTech Unicorn",
    outcome: "ATS: 71 → 96",
    avatar: "https://i.pravatar.cc/100?img=9"
  },
  {
    quote: "Passed Taleo automated filters on my very first try. The interview prep tab with STAR stories gave me the exact talking points for my final technical interview.",
    author: "David Chen",
    role: "Principal Systems Engineer",
    company: "Hired at Microsoft Partner",
    outcome: "Cleared Enterprise ATS",
    avatar: "https://i.pravatar.cc/100?img=33"
  }
]

const marqueeItems = [
  ...testimonials,
  ...testimonials,
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#FBFBF9] border-t border-slate-200 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Verified Job Offers &amp; Interviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight mb-3">
            Loved by <span className="text-primary">50,000+ Job Seekers</span>
          </h2>
          <p className="text-slate-600 text-[15px] font-medium leading-relaxed">
            Real outcomes from engineers, managers, and consultants who switched from generic templates to tailored ATS optimization.
          </p>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-hidden relative w-full -mx-4 px-4 sm:mx-0 sm:px-0 py-2">
          {/* Edge gradient mask */}
          <div className="hidden sm:block absolute top-0 left-0 w-36 h-full bg-gradient-to-r from-[#FBFBF9] to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute top-0 right-0 w-36 h-full bg-gradient-to-l from-[#FBFBF9] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
            {marqueeItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 w-[380px] shrink-0 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar: Stars + Result Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      {item.outcome}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-slate-700 font-medium text-[13.5px] leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img 
                    src={item.avatar} 
                    alt={item.author} 
                    className="w-11 h-11 rounded-full object-cover bg-slate-100 border border-slate-200" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-slate-900 truncate flex items-center gap-1.5">
                      {item.author}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium truncate">
                      {item.role}
                    </div>
                    <div className="text-[11px] text-primary font-bold truncate">
                      {item.company}
                    </div>
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
