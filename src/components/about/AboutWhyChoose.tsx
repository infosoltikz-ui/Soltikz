"use client";
import { GraduationCap, Briefcase, UserCheck, Handshake, ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

const reasons = [
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: 'Student-Focused\nLearning',
    description: 'Training programs designed around real industry needs, not just theory',
    iconBg: 'bg-primary/5',
    iconBorder: 'border-primary/20'
  },
  {
    icon: <Briefcase className="w-6 h-6 text-accent" />,
    title: 'Career-First\nApproach',
    description: "We don't just train or recruit; we invest in your career journey",
    iconBg: 'bg-accent/5',
    iconBorder: 'border-accent/20'
  },
  {
    icon: <UserCheck className="w-6 h-6 text-primary" />,
    title: 'Personalized\nSupport',
    description: 'Every profile, every learner, and every client gets individual attention',
    iconBg: 'bg-primary/5',
    iconBorder: 'border-primary/20'
  },
  {
    icon: <Handshake className="w-6 h-6 text-accent" />,
    title: 'Industry\nConnect',
    description: 'Strong relationships with employers looking for fresh, trained talent',
    iconBg: 'bg-accent/5',
    iconBorder: 'border-accent/20'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: 'Trust &\nIntegrity',
    description: 'Honest guidance at every step, from learning to landing the job',
    iconBg: 'bg-primary/5',
    iconBorder: 'border-primary/20'
  }
]

export function AboutWhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px bg-slate-200 flex-1 max-w-[100px] border-t border-dashed border-slate-300" />
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            Why Choose <span className="text-primary">Soltikz IT?</span>
          </h2>
          <div className="h-px bg-slate-200 flex-1 max-w-[100px] border-t border-dashed border-slate-300" />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border shadow-sm transition-transform duration-300 group-hover:scale-110",
                reason.iconBg,
                reason.iconBorder
              )}>
                {reason.icon}
              </div>
              <h3 className="text-[13px] font-bold text-slate-900 mb-3 whitespace-pre-line leading-tight">
                {reason.title}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed border-l-2 border-slate-100 pl-3 py-1">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
