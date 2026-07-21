"use client";
import { FileText, ShieldCheck, Wand2, LayoutTemplate, PenTool, Download } from 'lucide-react'

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: 'AI Resume Builder',
    description: 'Generate ATS-optimized resumes in seconds'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'ATS Score Checker',
    description: 'Check your resume score and improve instantly'
  },
  {
    icon: <Wand2 className="w-8 h-8 text-primary" />,
    title: 'AI Optimization',
    description: 'Get smart suggestions to boost your profile'
  },
  {
    icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
    title: 'Professional Templates',
    description: '25+ recruiter-approved templates'
  },
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: 'Cover Letter Builder',
    description: 'Create personalized cover letters'
  },
  {
    icon: <Download className="w-8 h-8 text-primary" />,
    title: 'Export & Share',
    description: 'Download in PDF, DOCX or share online'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need to Build a <span className="text-primary">Standout Resume</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                {feature.icon}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent group-hover:animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
