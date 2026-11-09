"use client";
import React, { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RESUME_TEMPLATES } from '@/components/create-resume/templates/registry'
import { sampleResumeData, sampleProfileData, c2cSampleData } from '@/components/create-resume/templates/sampleData'

export function TemplatesSection() {
  return (
    <section className="py-20 bg-[#FBFBF9] border-t border-slate-100 overflow-hidden" id="templates">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              5+ Professional Resume Templates
            </h2>
            <p className="text-slate-500 font-medium">Choose from a variety of professionally designed templates</p>
          </div>
          <Link href="/dashboard/create" className="inline-flex items-center gap-1.5 text-accent font-bold hover:text-accent-hover transition-colors">
            View All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Templates Display */}
        <div className="flex items-center gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {RESUME_TEMPLATES.filter(t => t.id !== 'c2c').map((template) => {
            const TemplateComponent = template.component
            return (
              <div key={template.id} className="shrink-0 w-[240px] sm:w-[280px] snap-center">
                <Link href={`/dashboard/create?template=${template.id}`}>
                  <div className="relative rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden aspect-[1/1.4] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex justify-center">
                    
                    {/* Resume Canvas with Smooth Hover Zoom-Out Effect */}
                    <div
                      className="absolute top-2 origin-top pointer-events-none transition-transform duration-500 ease-out scale-[0.32] group-hover:scale-[0.245] sm:scale-[0.33] sm:group-hover:scale-[0.255]"
                      style={{ width: '850px' }}
                    >
                      <Suspense fallback={<div className="w-[850px] h-[1100px] bg-slate-50 animate-pulse" />}>
                        <TemplateComponent
                          resumeData={template.id === 'c2c' ? c2cSampleData : sampleResumeData}
                          profileData={sampleProfileData}
                        />
                      </Suspense>
                    </div>

                    {/* Bottom Floating "Use Template" Button (Doesn't block resume content) */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-end justify-center pb-3 pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-primary text-white text-[12px] font-black px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 border border-white/20">
                        Use Template <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
        </div>
      </div>
    </section>
  )
}
