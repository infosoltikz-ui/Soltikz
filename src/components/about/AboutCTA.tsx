"use client";
import Link from 'next/link'
import { ArrowRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-accent/10 rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 -z-10" />

          {/* Dotted curve trail for paper plane */}
          <svg className="absolute top-1/2 right-12 md:right-32 w-48 h-32 -translate-y-1/2 text-accent/20 -z-10 pointer-events-none hidden md:block" viewBox="0 0 200 100" fill="none">
            <path d="M10,90 Q50,10 190,40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>

          {/* Paper Plane Icon */}
          <div className="absolute top-8 right-8 md:top-1/4 md:right-24 text-accent animate-bounce hidden md:block">
            <Send className="w-8 h-8 -rotate-45" />
          </div>

          {/* Left Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
              Let's Build Your Future Together
            </h2>
            <p className="text-[15px] font-medium text-slate-700 max-w-xl mx-auto md:mx-0">
              Whether you're a student, professional, or organization, Soltikz IT is here to guide you forward.
            </p>
          </div>

          {/* Right Content - Button */}
          <div className="shrink-0 z-10">
            <Link href="/register">
              <Button 
                size="xl" 
                pill 
                className="bg-accent hover:bg-accent-hover text-white text-[15px] font-bold shadow-lg shadow-accent/25 transition-all hover:scale-105 active:scale-95 group"
                rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              >
                Get Started Free
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
