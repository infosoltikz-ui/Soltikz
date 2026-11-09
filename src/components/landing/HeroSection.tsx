"use client";
import Link from 'next/link'
import { CheckCircle2, Sparkles, Shield, ArrowRight, Star, Building2, Award, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

const DEMO_ROLES = [
  {
    title: 'Cybersecurity Analyst',
    score: 94,
    prevScore: 71,
    company: 'Cloudflare / CrowdStrike',
    keywords: ['incident response', 'Splunk ES', 'Sentinel', 'KQL', 'SOC Triage'],
    slide: '/slide1.jpg'
  },
  {
    title: 'Full Stack Engineer',
    score: 97,
    prevScore: 68,
    company: 'AWS / Stripe / Vercel',
    keywords: ['Next.js 16', 'TypeScript', 'Supabase', 'Tailwind', 'REST APIs'],
    slide: '/slide2.jpg'
  },
  {
    title: 'Product Manager',
    score: 92,
    prevScore: 73,
    company: 'Microsoft / FinTech',
    keywords: ['Agile Roadmap', 'Product Discovery', 'User Metrics', 'KPIs', 'Sprint Planning'],
    slide: '/slide3.jpg'
  }
]

const HIRING_COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Deloitte', 'Meta', 'Salesforce', 'Goldman Sachs'
]

function AnimatedScore({ targetScore, prevScore }: { targetScore: number; prevScore: number }) {
  const [score, setScore] = useState(prevScore)

  useEffect(() => {
    setScore(prevScore)
    let current = prevScore
    const interval = setInterval(() => {
      if (current < targetScore) {
        current += Math.ceil((targetScore - current) / 6) || 1
        if (current > targetScore) current = targetScore
        setScore(current)
      } else {
        clearInterval(interval)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [targetScore, prevScore])

  return (
    <div className="absolute top-6 sm:top-10 right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(15,39,68,0.15)] border border-slate-200/90 flex items-center gap-3.5 animate-in fade-in zoom-in duration-500">
      <div className="relative w-[50px] h-[50px] flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
          <circle 
            cx="20" cy="20" r="16" fill="none" 
            className="stroke-secondary transition-all duration-300 ease-out" 
            strokeWidth="4" 
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 100.5} 100.5`} 
          />
        </svg>
        <div className="absolute text-sm font-black text-slate-900 tracking-tight">{score}</div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-slate-900">ATS Match Score</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="text-[11px] text-secondary font-black flex items-center gap-1 mt-0.5">
          <span>▲ Up from {prevScore} (Verified)</span>
        </div>
      </div>
    </div>
  )
}

function AnimatedKeywords({ keywords }: { keywords: string[] }) {
  return (
    <div className="absolute bottom-8 sm:bottom-12 left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_10px_30px_rgba(15,39,68,0.15)] border border-slate-200/90 flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-6 duration-500 w-[220px] sm:w-[250px]">
      <div className="text-xs font-black text-slate-900 tracking-wide flex items-center justify-between border-b border-slate-100 pb-1.5">
        <span>Matched in Posting</span>
        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">100% Match</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw, idx) => (
          <div 
            key={kw} 
            className={idx % 2 === 0 
              ? "bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md text-[11px] font-bold" 
              : "bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md text-[11px] font-bold"}
          >
            {kw}
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % DEMO_ROLES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentRole = DEMO_ROLES[activeRoleIndex]

  return (
    <section 
      className="relative overflow-hidden pt-10 md:pt-16 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/70"
      style={{ 
        background: 'linear-gradient(135deg, #FBFBF9 0%, #F5F7FA 50%, #EEF4FA 100%)',
      }}
    >
      {/* Background Subtlest Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 -z-10" 
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 39, 68, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient Radial Gradient Flares */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
        <div className="w-[850px] h-[850px] rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4">
        <div className="w-[650px] h-[650px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none mx-auto">
            
            {/* Top Micro-Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-primary text-xs font-black shadow-xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                Next-Gen AI Resume &amp; ATS Platform
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs font-black shadow-xs">
                <Shield className="w-3 h-3 text-secondary" />
                99.8% ATS Verification Rate
              </span>
            </div>

            {/* Main Headline with High-End SaaS Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-slate-900 tracking-tight leading-[1.06] mb-6">
              One résumé won't get you{' '}
              <span className="text-secondary relative inline-block">
                ten jobs.
                <svg className="absolute w-full h-3.5 -bottom-1.5 left-0 text-secondary/35" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Paste the job posting. Get a custom résumé rewritten specifically for that employer in 30 seconds — with verified ATS keyword scores, matching Cover Letters, and interview STAR talking points.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                'Tailored to exact Job Requirements',
                'Guaranteed 90%+ ATS Score',
                'Full-Time & C2C / Contract Modes',
                'Built-in Matching Cover Letter Studio',
                'Download in Clean Vector PDF & DOCX',
                'Workday & Taleo Parser Verification',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 font-semibold text-[13.5px]">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" strokeWidth={2.4} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-5">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto font-black px-8 py-4 rounded-xl shadow-xl shadow-primary/25 bg-primary hover:bg-primary-hover text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                >
                  Create My Free Resume Now
                </Button>
              </Link>
              <Link href="/templates" className="w-full sm:w-auto">
                <Button size="xl" variant="outline" className="w-full sm:w-auto font-bold px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-2xs">
                  Browse Templates
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[12px] font-bold text-slate-500 mb-8 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> No credit card needed
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" /> 20 Free tailored resumes
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" /> Instant PDF download
              </span>
            </div>

            {/* Social Proof Star Ratings & Top Employers Strip */}
            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 15}`}
                      alt={`User ${i}`}
                      className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 object-cover shadow-2xs"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[12px] font-black text-slate-900 ml-1">4.9 / 5.0</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Trusted by <span className="font-bold text-slate-900">50,000+</span> job seekers worldwide
                  </div>
                </div>
              </div>

              {/* Recruiter Placement Companies */}
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidates placed at:</span>
                {HIRING_COMPANIES.map((company) => (
                  <span 
                    key={company} 
                    className="text-[11px] font-bold text-slate-600 bg-white/70 border border-slate-200/80 px-2 py-0.5 rounded-md shadow-2xs"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: High-End Studio Mockup with 3D Ring */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative flex flex-col items-center justify-center">
            
            {/* Interactive Role Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-900/5 mb-5 z-20">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2.5 hidden sm:inline-block">Select Role:</span>
              {DEMO_ROLES.map((role, idx) => (
                <button
                  key={role.title}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeRoleIndex === idx
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-102'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {role.title}
                </button>
              ))}
            </div>

            {/* Elevated Studio Bezel Frame */}
            <div className="relative w-full aspect-square max-w-[500px] rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,39,68,0.12)] p-4 flex items-center justify-center group">
              
              {/* Target Company Tag (Top Left of Frame) */}
              <div className="absolute top-4 left-4 z-20 bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-md">
                <Building2 className="w-3 h-3 text-amber-400" />
                <span>Target: {currentRole.company}</span>
              </div>

              {/* Template Slide Image */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                {DEMO_ROLES.map((role, index) => (
                  <img
                    key={role.slide}
                    src={role.slide}
                    alt={`AI Resume Template for ${role.title}`}
                    className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-700 ${
                      index === activeRoleIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
              
              {/* Floating Dynamic Badges */}
              <AnimatedScore targetScore={currentRole.score} prevScore={currentRole.prevScore} />
              <AnimatedKeywords keywords={currentRole.keywords} />
              
              {/* Progress Bar Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-slate-900/70 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md">
                {DEMO_ROLES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveRoleIndex(index)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      index === activeRoleIndex ? 'bg-amber-400 w-5' : 'bg-white/40 w-1.5 hover:bg-white/70'
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
