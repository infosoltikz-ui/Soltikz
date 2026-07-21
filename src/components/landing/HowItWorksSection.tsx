"use client";
import { UserPlus, FileEdit, BrainCircuit, Activity, Download } from 'lucide-react'

const steps = [
  {
    icon: <UserPlus className="w-6 h-6 text-primary" />,
    title: 'Create Account',
    description: 'Sign up for free and create your account'
  },
  {
    icon: <FileEdit className="w-6 h-6 text-primary" />,
    title: 'Fill Your Details',
    description: 'Add your information in our easy forms'
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    title: 'AI Optimization',
    description: 'Get AI suggestions to optimize your content'
  },
  {
    icon: <Activity className="w-6 h-6 text-primary" />,
    title: 'ATS Score Check',
    description: 'Check your ATS score and improve your match'
  },
  {
    icon: <Download className="w-6 h-6 text-primary" />,
    title: 'Download & Apply',
    description: 'Download your resume and start applying'
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-slate-500 font-medium">Build your perfect resume in 5 simple steps</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] border-t-2 border-dashed border-slate-200 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step Number Badge */}
                <div className="absolute -top-3 z-10 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {idx + 1}
                </div>
                
                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-primary transition-colors relative z-0">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 max-w-[150px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
