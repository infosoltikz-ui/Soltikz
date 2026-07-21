"use client";
import { UserPlus, Sparkles, ShieldCheck, TrendingUp, FileText, Download } from 'lucide-react'
import { cn } from '@/utils/cn'

const steps = [
  {
    icon: <UserPlus className="w-6 h-6 text-primary" />,
    title: 'Add Information',
    description: 'Add your details, experience, skills and education',
    badge: '01',
    badgeColor: 'bg-primary'
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: 'AI Builds Resume',
    description: 'Our AI creates a professional resume for you',
    badge: '02',
    badgeColor: 'bg-accent'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: 'ATS Analysis',
    description: 'We analyze your resume for ATS compatibility',
    badge: '03',
    badgeColor: 'bg-primary'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: 'Optimize Content',
    description: 'Get AI suggestions and optimize your content',
    badge: '04',
    badgeColor: 'bg-accent'
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: 'Choose Template',
    description: 'Select a professional template you like',
    badge: '05',
    badgeColor: 'bg-primary'
  },
  {
    icon: <Download className="w-6 h-6 text-primary" />,
    title: 'Download & Apply',
    description: 'Download your resume and apply with confidence',
    badge: '06',
    badgeColor: 'bg-accent'
  }
]

export function FeaturesWorkflow() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-primary tracking-widest uppercase mb-4">
            How Our Features Work Together
          </h2>
        </div>

        {/* Workflow Stepper */}
        <div className="relative">
          {/* Connecting Dashed Line (Desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px border-t-2 border-dashed border-slate-200" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    {step.icon}
                  </div>
                  {/* Number Badge */}
                  <div className={cn(
                    "absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm",
                    step.badgeColor
                  )}>
                    {step.badge}
                  </div>
                </div>
                
                <h3 className="text-[13px] font-bold text-slate-900 mb-2 px-2">{step.title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
