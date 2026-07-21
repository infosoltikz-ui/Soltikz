"use client";
import { Target } from 'lucide-react'

export function AboutMission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-primary/5 rounded-[2rem] p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
          {/* Left Content */}
          <div className="flex-1 flex gap-6 md:gap-10 relative z-10 max-w-2xl">
            <div className="shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl shadow-primary/10 flex items-center justify-center border border-primary/20">
                <Target className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-[15px] md:text-base font-bold text-slate-700 leading-relaxed">
                To empower every student and professional with the skills, exposure, and opportunities they need to thrive in the technology industry — while helping businesses build strong, capable teams.
              </p>
            </div>
          </div>

          {/* Right Content - CSS Mountain Illustration */}
          <div className="hidden lg:block w-80 h-48 relative shrink-0 opacity-80">
            {/* Sun */}
            <div className="absolute top-4 right-12 w-12 h-12 rounded-full bg-primary/20 blur-sm" />
            
            {/* Back Mountain */}
            <div className="absolute bottom-0 right-10 w-48 h-32 bg-primary/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            
            {/* Front Mountain */}
            <div className="absolute bottom-0 right-0 w-64 h-40 bg-primary/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              {/* Snow Peak */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[84px] h-12 bg-white/60" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 30% 80%, 50% 100%, 70% 80%, 100% 100%)' }} />
            </div>

            {/* Flag Pole */}
            <div className="absolute top-2 right-[126px] w-1 h-12 bg-primary" />
            {/* Flag */}
            <div className="absolute top-2 right-[86px] w-10 h-6 bg-primary" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}
