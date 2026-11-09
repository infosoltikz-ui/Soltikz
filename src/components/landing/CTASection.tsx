"use client";
import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-white px-4 border-t border-slate-100">
      <div className="container mx-auto max-w-6xl relative overflow-hidden rounded-3xl bg-[#0F2744] shadow-2xl p-8 sm:p-12 lg:p-16 text-white">
        
        {/* Subtle Ambient Blue Radial Glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Column */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Start For Free Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.12] mb-4 text-white">
              Ready to Land More Interviews <br className="hidden sm:inline" />
              with a Tailored Resume?
            </h2>

            <p className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              Join 50,000+ job seekers who stopped sending generic resumes and started beating ATS automated screenings.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 20 Free Tailored Resumes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cover Letter &amp; STAR Prep
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Credit Card Required
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Clean Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto shrink-0">
            <Link href="/register" className="w-full sm:w-auto">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-white text-[#0F2744] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1 text-[#0F2744]" />}
              >
                Create My Resume Free
              </Button>
            </Link>

            <Link href="/pricing" className="w-full sm:w-auto">
              <Button 
                size="xl" 
                variant="outline" 
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border-white/20 font-bold px-7 py-3.5 rounded-xl backdrop-blur-sm shadow-sm cursor-pointer"
              >
                View Pro Plans
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}
