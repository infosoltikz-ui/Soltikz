"use client";
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export function PricingHero() {
  const [isYearly, setIsYearly] = useState(true) // We'll manage state here for visual, but it usually needs to be passed down. For now, it's just visual in the Hero.

  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/4 -translate-x-1/4 -z-10" />

      {/* Subtle dotted background pattern */}
      <div className="absolute top-0 inset-x-0 h-64 opacity-20 -z-10" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-4 max-w-7xl relative">
        
        {/* CSS Graphics - Left Document */}
        <div className="hidden lg:block absolute left-4 top-12 w-64 h-64">
          <div className="relative w-full h-full animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl border border-slate-100 transform -rotate-6" />
            
            <div className="absolute top-6 left-6 right-6 space-y-4 transform -rotate-6">
              {/* Profile pic mock */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-2.5 bg-slate-200 rounded-full w-3/4" />
                  <div className="h-2 bg-slate-200 rounded-full w-1/2" />
                </div>
              </div>
              {/* Lines */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-primary/20 shrink-0" /><div className="h-2 bg-slate-200 rounded-full w-full" /></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-primary/20 shrink-0" /><div className="h-2 bg-slate-200 rounded-full w-5/6" /></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-primary/20 shrink-0" /><div className="h-2 bg-slate-200 rounded-full w-4/6" /></div>
              </div>
            </div>

            {/* Overlapping Green Check Badge */}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary rounded-full shadow-xl shadow-primary/30 flex items-center justify-center transform rotate-6 border-4 border-white">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
        </div>

        {/* CSS Graphics - Right Wallet */}
        <div className="hidden lg:block absolute right-4 top-16 w-56 h-48">
          <div className="relative w-full h-full animate-float" style={{ animationDelay: '1s' }}>
            {/* Wallet Body (Green) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A] to-[#14532d] rounded-3xl shadow-2xl transform rotate-6 border border-white/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Wallet Strap */}
            <div className="absolute top-1/2 left-0 right-0 h-12 bg-[#15803d] transform -translate-y-1/2 rotate-6 shadow-inner border-y border-white/10" />
            {/* Wallet Button */}
            <div className="absolute top-1/2 left-8 w-6 h-6 bg-[#22c55e] rounded-full transform -translate-y-1/2 rotate-6 border-2 border-[#14532d] shadow-sm" />
            
            {/* Gold Coins */}
            {/* Coin 1 */}
            <div className="absolute -top-8 right-12 w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-lg border-2 border-yellow-200 flex items-center justify-center transform rotate-12">
              <div className="w-10 h-10 border border-yellow-500 rounded-full flex items-center justify-center text-yellow-700 font-bold text-xl">$</div>
            </div>
            {/* Coin 2 (Stack) */}
            <div className="absolute -bottom-6 left-12 w-16 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-[50%] shadow-lg border border-yellow-300 transform -rotate-12 z-20" />
            <div className="absolute -bottom-4 left-12 w-16 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-[50%] shadow-lg border border-yellow-300 transform -rotate-12 z-10" />
            <div className="absolute -bottom-2 left-12 w-16 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-[50%] shadow-lg border border-yellow-300 transform -rotate-12" />
          </div>
        </div>

        {/* Center Content */}
        <div className="text-center max-w-3xl mx-auto relative z-10">
          
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-[13px] font-bold text-primary mb-6 tracking-wide">
            Affordable Plans for Every Career Stage
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>

          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto font-medium">
            Choose the plan that's right for you and start building your career today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[13px] font-bold text-slate-700 mb-16">
            {['No Hidden Charges', 'Cancel Anytime', 'Secure Payments'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                </div>
                {item}
              </div>
            ))}
          </div>

          {/* Toggle Switch */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-black text-slate-900 mb-4">Choose Your Plan</h3>
            
            <div className="relative inline-flex items-center">
              
              {/* Drawn Arrow pointing to Save 20% */}
              <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                  <path d="M5 35 Q 25 10 55 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  <path d="M50 12 L 57 21 L 46 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              <div className="bg-white border border-slate-200 rounded-full p-1.5 shadow-sm flex items-center relative z-10 w-64">
                <div 
                  className={cn(
                    "absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-primary rounded-full transition-transform duration-300 ease-out shadow-sm",
                    isYearly ? "translate-x-full" : "translate-x-0"
                  )} 
                />
                <button 
                  className={cn(
                    "flex-1 py-2 text-[14px] font-bold z-10 transition-colors duration-300",
                    !isYearly ? "text-white" : "text-slate-600"
                  )}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button 
                  className={cn(
                    "flex-1 py-2 text-[14px] font-bold z-10 transition-colors duration-300",
                    isYearly ? "text-white" : "text-slate-600"
                  )}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                </button>
              </div>

              {/* Save 20% Badge */}
              <div className="absolute -right-24 top-1/2 -translate-y-1/2">
                <div className="bg-accent/10 border border-accent/20 text-accent text-[11px] font-extrabold px-3 py-1 rounded-full whitespace-nowrap">
                  Save 20%
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
