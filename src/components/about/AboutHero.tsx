"use client";
import Link from 'next/link'
import { CheckCircle2, ArrowRight, UserCheck, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutHero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Subtle dotted background pattern on left */}
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-30 -z-10" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              About <span className="text-primary">Soltikz IT</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-snug">
              <span className="text-primary">Empowering Talent.</span> Building Careers. Transforming Futures.
            </h2>
            
            <p className="text-[15px] text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              At Soltikz IT, we believe that talent deserves the right opportunity, and businesses deserve the right talent. We bridge the gap between ambitious individuals and the ever-evolving world of technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  pill 
                  className="w-full sm:w-auto text-[15px] font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 group"
                  rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/features" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  pill 
                  variant="outline" 
                  className="w-full sm:w-auto text-[15px] font-bold transition-all hover:bg-slate-50 border-accent text-accent hover:text-accent-hover hover:border-accent-hover"
                >
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-[13px] font-bold text-slate-700">
              {['Student Focused', 'Trusted by 10,000+', 'Industry Connect'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image and Badges */}
          <div className="flex-1 w-full relative z-10">
            {/* Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/5 to-accent/5 rounded-[4rem] -rotate-6 -z-10 blur-xl" />
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 aspect-[4/3] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="Team collaborating" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Top Right Badge */}
            <div className="absolute -top-6 -right-6 md:top-4 md:-right-8 bg-white p-3 pr-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <UserCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="text-[13px] font-bold text-slate-800 leading-tight">
                Connecting Talent<br />
                <span className="text-slate-500 font-medium text-[11px]">with Opportunity</span>
              </div>
            </div>

            {/* Bottom Right Badge */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-4 md:-right-8 bg-white p-3 pr-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <Rocket className="w-5 h-5 text-accent" />
              </div>
              <div className="text-[13px] font-bold text-slate-800 leading-tight">
                Building Skills for<br />
                <span className="text-slate-500 font-medium text-[11px]">a Better Tomorrow</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
