"use client";
import { Search, BarChart3, GraduationCap } from 'lucide-react'
import { cn } from '@/utils/cn'

const pillars = [
  {
    icon: <Search className="w-6 h-6 text-primary" />,
    iconBg: 'bg-primary/10',
    title: 'Recruitment Solutions',
    titleColor: 'text-primary',
    borderColor: 'border-primary',
    description: 'We help companies find the right people and help professionals find the right roles. Our recruitment process is built on precision, transparency, and a deep understanding of both technical and human potential.'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-accent" />,
    iconBg: 'bg-accent/10',
    title: 'Profile Marketing',
    titleColor: 'text-accent',
    borderColor: 'border-accent',
    description: "In today's competitive job market, visibility matters as much as skill. We help individuals build and market their professional profiles that get noticed by the right employers."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    iconBg: 'bg-primary/10',
    title: 'Technology Training',
    titleColor: 'text-primary',
    borderColor: 'border-primary',
    description: 'We equip students and working professionals with in-demand technical skills through practical, industry-relevant training programs designed to make learners job-ready.'
  }
]

export function AboutWhatWeDo() {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px bg-slate-200 flex-1 max-w-[60px] border-t border-dashed border-slate-300" />
            <h2 className="text-3xl font-black text-slate-900">
              What <span className="text-primary">We Do</span>
            </h2>
            <div className="h-px bg-slate-200 flex-1 max-w-[60px] border-t border-dashed border-slate-300" />
          </div>
          <p className="text-[15px] font-medium text-slate-600">
            Our three core pillars that drive your success
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className={cn(
                "bg-white rounded-3xl p-10 text-center shadow-lg shadow-slate-200/50 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden border border-slate-100",
              )}
            >
              {/* Colored Line at the bottom inside card */}
              <div className={cn("absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full", pillar.borderColor.replace('border', 'bg'))} />

              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", pillar.iconBg)}>
                {pillar.icon}
              </div>
              
              <h3 className={cn("text-[17px] font-bold mb-6", pillar.titleColor)}>
                {pillar.title}
              </h3>
              
              <p className="text-[14px] text-slate-600 leading-relaxed pb-4">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
