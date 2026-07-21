"use client";
import Link from 'next/link'
import { ArrowRight, FileCheck2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="py-8 bg-white px-4">
      <div className="container mx-auto max-w-[1200px] relative overflow-hidden rounded-[32px] bg-[#F6FBF7] border border-primary/10">
        
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Side: Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 z-10">
            {/* Dummy Resume Graphic matching mockup */}
            <div className="relative shrink-0 mt-2">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <FileCheck2 className="w-10 h-10 text-primary" strokeWidth={2} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="text-center sm:text-left pt-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                Ready to Build Your <span className="text-primary">Dream Career?</span>
              </h2>
              <p className="text-slate-600 font-medium text-base md:text-lg max-w-lg">
                Join 50,000+ job seekers who've already built their perfect resume.
              </p>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0 z-10">
            <Link href="/register" className="w-full sm:w-auto">
              <Button 
                size="xl" 
                className="w-full bg-primary text-white hover:bg-primary-hover font-bold px-6 shadow-sm shadow-primary/20 group"
                rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full bg-white text-accent hover:bg-orange-50 border-accent font-bold px-8 shadow-sm">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Decorative Dotted Lines (Subtle SVG in Background) */}
          <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none overflow-hidden opacity-50">
            {/* Top right dotted line and arrow */}
            <svg className="absolute -top-4 -right-4 w-64 h-64 text-primary" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50,150 Q 120,100 180,30" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" fill="transparent"/>
              <path d="M 175,20 L 190,25 L 180,40 Z" fill="currentColor"/>
            </svg>
            
            {/* Bottom left dotted line */}
            <svg className="absolute -bottom-8 -left-8 w-64 h-64 text-primary/40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20,180 Q 80,120 180,150" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" fill="transparent"/>
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}
