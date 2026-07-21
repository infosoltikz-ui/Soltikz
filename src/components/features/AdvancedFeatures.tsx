"use client";
import { Target, Search, BarChart3, Star, CheckCircle, GraduationCap, Briefcase, Eye } from 'lucide-react'

const features = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: 'Job Targeting',
    description: 'Customize your resume for specific job positions'
  },
  {
    icon: <Search className="w-6 h-6 text-accent" />,
    title: 'Keyword Optimizer',
    description: 'Find and add relevant keywords to beat ATS systems'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: 'Real-time Analysis',
    description: 'Get real-time feedback while you build your resume'
  },
  {
    icon: <Star className="w-6 h-6 text-accent" />,
    title: 'Skills Suggestions',
    description: 'AI suggests relevant skills for your target role'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-accent" />,
    title: 'Content Suggestions',
    description: 'Smart content suggestions to improve your resume'
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-slate-700" />,
    title: 'Education Formatter',
    description: 'Auto format education section the right way'
  },
  {
    icon: <Briefcase className="w-6 h-6 text-accent" />,
    title: 'Experience Optimizer',
    description: 'Optimize your experience descriptions with AI'
  },
  {
    icon: <Eye className="w-6 h-6 text-primary" />,
    title: 'Live Preview',
    description: 'See changes in real-time with live preview'
  }
]

export function AdvancedFeatures() {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px bg-slate-200 flex-1 max-w-[100px] border-t border-dashed border-slate-300" />
          <h2 className="text-sm font-black text-primary tracking-widest uppercase">
            Advanced Features
          </h2>
          <div className="h-px bg-slate-200 flex-1 max-w-[100px] border-t border-dashed border-slate-300" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center mb-5 relative group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-[15px] font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
