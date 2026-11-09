"use client";
import Link from 'next/link'
import { ArrowRight, FileCheck2, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-[#FBFBF9] px-4">
      <div className="container mx-auto max-w-[1240px] relative overflow-hidden rounded-[36px] bg-[#0F2744] border border-[#23456F] shadow-2xl p-8 sm:p-12 lg:p-16 text-white">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Column */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Start For Free Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.1] mb-4 text-white">
              Ready to Land More Interviews <br className="hidden sm:inline" />
              with a <span className="text-amber-400">Tailored Resume?</span>
            </h2>

            <p className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              Join 50,000+ job seekers who stopped sending generic resumes and started beating ATS automated screenings.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> 20 Free Tailored Resumes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Cover Letter &amp; STAR Prep
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> No Credit Card Required
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
            <Link href="/register" className="w-full sm:w-auto">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-amber-400 text-[#0F2744] hover:bg-amber-300 font-black px-8 py-4 rounded-2xl shadow-xl shadow-amber-400/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
              >
                Create My Resume Free
              </Button>
            </Link>

            <Link href="/pricing" className="w-full sm:w-auto">
              <Button 
                size="xl" 
                variant="outline" 
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border-white/20 font-bold px-7 py-4 rounded-2xl backdrop-blur-sm shadow-sm"
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
