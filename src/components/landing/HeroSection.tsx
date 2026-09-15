"use client";
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

function AnimatedScore({ targetScore }: { targetScore: number }) {
  const [score, setScore] = useState(0)

  useEffect(() => {
    setScore(0)
    let current = 0
    const interval = setInterval(() => {
      if (current < targetScore) {
        current += Math.ceil((targetScore - current) / 10) || 1
        if (current > targetScore) current = targetScore
        setScore(current)
      } else {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [targetScore])

  return (
    <div className="absolute top-12 right-0 md:-right-4 z-20 bg-white px-4 py-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in zoom-in duration-700 delay-300">
      <div className="relative w-[48px] h-[48px] flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
          <circle 
            cx="20" cy="20" r="16" fill="none" 
            className="stroke-[#00875A] transition-all duration-300 ease-out" 
            strokeWidth="4" 
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 100.5} 100.5`} 
          />
        </svg>
        <div className="absolute text-sm font-black text-slate-900">{score}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold text-slate-900 mb-0.5">Match score</div>
        <div className="text-xs text-[#00875A] font-medium">
          Up from 74
        </div>
      </div>
    </div>
  )
}

function AnimatedKeywords() {
  return (
    <div className="absolute bottom-16 left-0 md:-left-8 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex flex-col gap-2 animate-in fade-in slide-in-from-left-8 duration-700 delay-700 w-[240px]">
      <div className="text-sm font-bold text-slate-800 tracking-wide mb-1">
        Found in the posting
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['incident response', 'Splunk ES'].map(kw => (
          <div key={kw} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-medium">
            {kw}
          </div>
        ))}
        {['KQL', 'Sentinel'].map(kw => (
          <div key={kw} className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[11px] font-medium">
            {kw}
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    '/slide1.jpg',
    '/slide2.jpg',
    '/slide3.jpg',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

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
              One résumé won't get you{' '}
              <span className="text-accent relative inline-block">
                ten jobs.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Paste the job posting. Get a résumé rewritten for that specific role — plus a report showing exactly which words matched, which are missing, and what to fix before you send it.
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
            <div className="relative w-full aspect-square hover:scale-[1.02] transition-transform duration-500">
              {slides.map((slide, index) => (
                <img
                  key={slide}
                  src={slide}
                  alt={`AI Resume Builder Template ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Animated KPI Cards */}
              <AnimatedScore targetScore={91} />
              <AnimatedKeywords />
              
              {/* Slideshow indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-slate-900/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
