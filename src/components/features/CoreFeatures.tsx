"use client";
import { Wand2, ShieldCheck, Brain, LayoutTemplate, FileEdit, Download, Globe2, Cloud } from 'lucide-react'

const features = [
  {
    icon: <Wand2 className="w-8 h-8 text-primary" />,
    title: 'AI Resume Builder',
    description: 'Generate professional resumes in seconds with AI technology'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'ATS Score Checker',
    description: 'Check your resume score and get instant improvement tips'
  },
  {
    icon: <Brain className="w-8 h-8 text-accent" />,
    title: 'AI Optimization',
    description: 'Get AI suggestions to optimize content, keywords & skills'
  },
  {
    icon: <LayoutTemplate className="w-8 h-8 text-primary" />,
    title: 'Professional Templates',
    description: '25+ recruiter-approved templates for every industry'
  },
  {
    icon: <FileEdit className="w-8 h-8 text-accent" />,
    title: 'Cover Letter Builder',
    description: 'Create personalized cover letters that make you stand out'
  },
  {
    icon: <Download className="w-8 h-8 text-primary" />,
    title: 'Export & Download',
    description: 'Download in PDF, DOCX or share online'
  },
  {
    icon: <Globe2 className="w-8 h-8 text-primary" />,
    title: 'Multiple Language',
    description: 'Build resumes in multiple languages'
  },
  {
    icon: <Cloud className="w-8 h-8 text-accent" />,
    title: 'Cloud Storage',
    description: 'Securely save and access your resumes anywhere'
  }
]

export function CoreFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px bg-slate-200 flex-1 max-w-[100px] border-t border-dashed border-slate-300" />
          <h2 className="text-sm font-black text-primary tracking-widest uppercase">
            Core Features
          </h2>
          <div className="h-px bg-slate-200 flex-1 max-w-[100px] border-t border-dashed border-slate-300" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300">
                {feature.icon}
                <div className="absolute -bottom-2 w-6 h-1 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
