"use client";
import { Check, Users, BarChart2, LayoutTemplate, Headset } from 'lucide-react'
import { cn } from '@/utils/cn'

const stats = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    value: '50,000+',
    label: 'Happy Users',
    sublabel: 'Worldwide',
    bgColor: 'bg-primary/5'
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-accent" />,
    value: '95%',
    label: 'Users Get Better',
    sublabel: 'ATS Score',
    bgColor: 'bg-accent/5'
  },
  {
    icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
    value: '25+',
    label: 'Professional',
    sublabel: 'Templates',
    bgColor: 'bg-primary/5'
  },
  {
    icon: <Headset className="w-8 h-8 text-accent" />,
    value: '24/7',
    label: 'Customer',
    sublabel: 'Support',
    bgColor: 'bg-accent/5'
  }
]

const checklist = [
  'AI-powered resume building',
  'ATS-optimized for better scores',
  'Trusted by 50,000+ job seekers',
  'Regular updates and new features',
  'Secure, fast & easy to use'
]

export function FeaturesStats() {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column - Content */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-[11px] font-black text-primary tracking-widest uppercase mb-4">
              Why Choose ATS Resume Builder?
            </h3>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
              Smart Features for<br />
              <span className="text-primary">Better Opportunities</span>
            </h2>
            
            <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0 grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4", stat.bgColor)}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">{stat.label}</div>
                <div className="text-[11px] font-medium text-slate-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
