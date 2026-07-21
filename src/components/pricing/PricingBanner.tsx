"use client";
import Link from 'next/link'
import { ArrowRight, FileCheck2, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PricingBanner() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-primary rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-xl shadow-primary/20">
          
          {/* Background overlay curve */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10" />

          {/* Left Icon */}
          <div className="shrink-0 relative z-10 hidden sm:block">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 border-4 border-primary/20">
              <FileCheck2 className="w-10 h-10 text-primary" />
              {/* Little check badge overlay */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">
              Not Sure Which Plan is Right for You?
            </h2>
            <p className="text-[13px] md:text-[14px] text-white/80 font-medium">
              Start with our free plan and upgrade anytime as your career grows.
            </p>
          </div>

          {/* Right Button & Plane */}
          <div className="shrink-0 relative z-10 flex items-center">
            <Link href="/register">
              <Button 
                size="lg" 
                pill 
                className="bg-white hover:bg-slate-50 text-primary text-[14px] font-bold shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 group border-none"
                rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              >
                Get Started Free
              </Button>
            </Link>

            {/* Orange Paper Plane */}
            <div className="absolute -right-8 -top-8 text-accent animate-bounce hidden lg:block">
              <Send className="w-6 h-6 -rotate-45" />
              {/* Dashed trail */}
              <svg className="absolute top-full right-full w-16 h-8 text-accent/50 -z-10" viewBox="0 0 100 50" fill="none">
                <path d="M100,0 Q50,50 0,25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
