"use client";
import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react'
import { RESUME_TEMPLATES } from '@/components/create-resume/templates/registry'
import { sampleResumeData, sampleProfileData, c2cSampleData } from '@/components/create-resume/templates/sampleData'

export function TemplatesSection() {
  const [filter, setFilter] = useState<'all' | 'full-time' | 'c2c'>('all')

  const filteredTemplates = RESUME_TEMPLATES.filter(template => {
    const isC2C = template.id.startsWith('c2c')
    if (filter === 'full-time') return !isC2C
    if (filter === 'c2c') return isC2C
    return true
  })

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-t border-slate-200/80 overflow-hidden relative" id="templates">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Recruiter-Tested Designs
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-2 tracking-tight">
              10+ High-Conversion Resume Templates
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-normal">
              Single-column, Workday/Taleo-compliant layouts designed to pass bot filters and impress hiring managers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All (10)
            </button>
            <button
              onClick={() => setFilter('full-time')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filter === 'full-time'
                  ? 'bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Full-Time (5)
            </button>
            <button
              onClick={() => setFilter('c2c')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filter === 'c2c'
                  ? 'bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              C2C / Contract (5)
            </button>
          </div>
        </div>

        {/* Templates Display Grid / Horizontal Scroll */}
        <div className="flex items-center gap-6 overflow-x-auto pb-8 pt-2 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredTemplates.map((template) => {
            const TemplateComponent = template.component
            const isC2C = template.id.startsWith('c2c')

            return (
              <div key={template.id} className="shrink-0 w-[260px] sm:w-[290px] snap-center">
                <Link href={`/dashboard/create?template=${template.id}`}>
                  <div className="relative rounded-3xl bg-white shadow-md hover:shadow-2xl border border-slate-200/90 overflow-hidden aspect-[1/1.4] transition-all duration-300 hover:-translate-y-2 cursor-pointer group flex justify-center">
                    
                    {/* Top Template Label Tag */}
                    <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md shadow-sm">
                        {template.name}
                      </span>
                      {isC2C && (
                        <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold shadow-sm">
                          C2C
                        </span>
                      )}
                    </div>

                    {/* Resume Canvas with Hover Zoom Effect */}
                    <div
                      className="absolute top-10 origin-top pointer-events-none transition-transform duration-500 ease-out scale-[0.31] group-hover:scale-[0.25] sm:scale-[0.33] sm:group-hover:scale-[0.26]"
                      style={{ width: '850px' }}
                    >
                      <Suspense fallback={<div className="w-[850px] h-[1100px] bg-slate-50 animate-pulse" />}>
                        <TemplateComponent
                          resumeData={isC2C ? c2cSampleData : sampleResumeData}
                          profileData={sampleProfileData}
                        />
                      </Suspense>
                    </div>

                    {/* Bottom Floating "Use Template" CTA */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-950/10 transition-colors flex items-end justify-center pb-4 pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] text-white text-[12px] font-black px-5 py-2.5 rounded-full shadow-xl transform translate-y-3 group-hover:translate-y-0 flex items-center gap-1.5 border border-white/20">
                        <span>Use This Template</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Bottom Action */}
        <div className="text-center mt-6">
          <Link 
            href="/dashboard/create" 
            className="inline-flex items-center gap-2 text-sm font-black text-slate-900 hover:text-emerald-700 transition-colors bg-white border border-slate-200/90 px-6 py-3 rounded-full shadow-xs hover:shadow-md cursor-pointer"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Customize Any Template in Resume Studio</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>

      </div>
    </section>
  )
}
