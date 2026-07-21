"use client";
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-12 pb-16 lg:pt-16 lg:pb-24" style={{ background: 'linear-gradient(135deg, #f0f7f4 0%, #e8f5ee 40%, #f5f5f0 100%)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
        <div className="w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
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
                '5+ Professional Templates',
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
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto font-bold px-8 shadow-lg shadow-primary/25"
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  }
                >
                  Get Started Free
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
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative flex items-center justify-center">
            <div className="relative w-full hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/ChatGPT Image Jul 21, 2026, 03_32_11 PM.png"
                alt="AI Resume Builder Preview"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
