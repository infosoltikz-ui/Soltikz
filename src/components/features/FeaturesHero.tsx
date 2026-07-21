"use client";
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function FeaturesHero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-bold text-primary mb-6 uppercase tracking-wider">
              Powerful Features
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Everything You Need to Build a <span className="text-primary">Perfect Resume</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Our AI-powered platform provides all the tools you need to create ATS-optimized resumes that get you hired.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  pill 
                  className="w-full sm:w-auto text-base font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 group"
                  rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/templates" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  pill 
                  variant="outline" 
                  className="w-full sm:w-auto text-base font-bold transition-all hover:bg-slate-50 border-accent text-accent hover:text-accent-hover hover:border-accent-hover"
                >
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-700">
              {['AI-Powered', 'ATS-Optimized', 'Recruiter Approved'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10 perspective-1000">
            <div className="relative rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-500 hover:rotate-0">
              
              {/* Dashboard Sidebar & Topbar fake UI */}
              <div className="flex h-[500px]">
                {/* Sidebar */}
                <div className="w-48 bg-[#0F2922] p-4 flex flex-col gap-4 text-white/70 text-sm font-medium">
                  <div className="flex items-center gap-2 mb-4 text-white">
                    <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm" />
                    </div>
                    Dashboard
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-white/10 text-white flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/20" /> Resumes
                  </div>
                  <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/20" /> Templates
                  </div>
                  <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/20" /> ATS Checker
                  </div>
                  <div className="py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/20" /> Cover Letters
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-slate-50 p-8 relative">
                  {/* Resume Header */}
                  <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                      <img src="https://i.pravatar.cc/100?img=11" alt="John Smith" className="w-16 h-16 rounded-full border-4 border-white shadow-sm" />
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">John Smith</h3>
                        <p className="text-slate-500 font-medium">Software Engineer</p>
                      </div>
                    </div>
                  </div>

                  {/* Resume Sections */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 tracking-wider mb-3">SUMMARY</h4>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded w-full" />
                        <div className="h-2 bg-slate-200 rounded w-5/6" />
                        <div className="h-2 bg-slate-200 rounded w-4/6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 tracking-wider mb-3">EXPERIENCE</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="h-3 bg-slate-300 rounded w-1/3 mb-2" />
                          <div className="space-y-2">
                            <div className="h-2 bg-slate-200 rounded w-full" />
                            <div className="h-2 bg-slate-200 rounded w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating ATS Score Badge */}
                  <div className="absolute top-12 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#16A34A" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="14.135" strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-900 leading-none">95</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">ATS Score</span>
                      </div>
                    </div>
                    <div className="w-full space-y-2 text-xs font-bold text-slate-600">
                      <div className="text-primary mb-3">Good Match</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Keywords</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Format</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Content</div>
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Skills</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* Dot pattern background */}
            <div className="absolute -inset-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10 mix-blend-multiply rounded-3xl" />
          </div>

        </div>
      </div>
    </section>
  )
}
