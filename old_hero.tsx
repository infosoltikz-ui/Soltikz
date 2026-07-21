"use client";
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
        <div className="w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Column: Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                AI-Powered
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                ATS-Optimized
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Recruiter Approved
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Build ATS-Optimized Resumes That Get You{' '}
              <span className="text-accent relative inline-block">
                Hired Faster
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Create professional resumes with AI suggestions, check ATS score and land your dream job with confidence.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto lg:mx-0">
              {[
                'AI Resume Optimization',
                'Real-time Suggestions',
                'ATS Score Checker',
                'Cover Letter Builder',
                '25+ Professional Templates',
                'Download in PDF & DOCX',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full sm:w-auto font-bold px-8 shadow-lg shadow-primary/25">
                  Get Started Free
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/templates" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full sm:w-auto font-bold px-8 bg-white hover:bg-slate-50 border-slate-200">
                  View Templates
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt={`User ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 object-cover"
                  />
                ))}
              </div>
              <div className="text-sm font-medium text-slate-600">
                Trusted by <span className="font-bold text-slate-900">50,000+</span> job seekers worldwide
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative">
            <div className="relative rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 sm:p-4 rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Dummy Resume Visual */}
              <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex aspect-[4/3] sm:aspect-[16/10]">
                {/* Left sidebar of resume */}
                <div className="w-1/3 bg-primary/5 p-4 sm:p-6 border-r border-primary/10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white shadow-sm">
                     <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full w-3/4 mx-auto mb-2" />
                  <div className="h-2 bg-slate-400 rounded-full w-1/2 mx-auto mb-8" />
                  
                  <div className="space-y-4">
                    <div>
                      <div className="h-3 bg-primary rounded-full w-1/2 mb-2" />
                      <div className="h-2 bg-slate-300 rounded-full w-full mb-1" />
                      <div className="h-2 bg-slate-300 rounded-full w-4/5 mb-1" />
                      <div className="h-2 bg-slate-300 rounded-full w-5/6" />
                    </div>
                    <div>
                      <div className="h-3 bg-primary rounded-full w-1/2 mb-2" />
                      <div className="flex gap-1 mb-1">
                        <div className="h-2 bg-slate-300 rounded-full w-1/3" />
                        <div className="h-2 bg-primary rounded-full w-2/3" />
                      </div>
                      <div className="flex gap-1 mb-1">
                        <div className="h-2 bg-slate-300 rounded-full w-1/2" />
                        <div className="h-2 bg-primary rounded-full w-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right body of resume */}
                <div className="w-2/3 p-4 sm:p-6 bg-white">
                  <div className="h-3 bg-primary rounded-full w-1/3 mb-3" />
                  <div className="space-y-2 mb-8">
                    <div className="h-2 bg-slate-200 rounded-full w-full" />
                    <div className="h-2 bg-slate-200 rounded-full w-full" />
                    <div className="h-2 bg-slate-200 rounded-full w-3/4" />
                  </div>

                  <div className="h-3 bg-primary rounded-full w-1/3 mb-3" />
                  <div className="mb-4">
                    <div className="h-2.5 bg-slate-800 rounded-full w-1/2 mb-1" />
                    <div className="h-2 bg-slate-400 rounded-full w-1/3 mb-2" />
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                      <div className="h-1.5 bg-slate-200 rounded-full w-5/6" />
                    </div>
                  </div>
                  <div>
                    <div className="h-2.5 bg-slate-800 rounded-full w-1/2 mb-1" />
                    <div className="h-2 bg-slate-400 rounded-full w-1/3 mb-2" />
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-200 rounded-full w-full" />
                      <div className="h-1.5 bg-slate-200 rounded-full w-4/5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badges */}
              <div className="absolute -right-6 top-8 sm:-right-12 sm:top-12 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 sm:p-4 flex flex-col items-center gap-1 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-primary" strokeWidth="3" strokeDasharray="95, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold text-slate-900 leading-none">95</span>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-primary">Excellent</span>
              </div>

              <div className="absolute -left-4 bottom-16 sm:-left-8 sm:bottom-24 bg-white rounded-xl shadow-xl border border-slate-100 p-3 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">12</div>
                  <div className="text-[10px] text-slate-500">AI Suggestions</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
