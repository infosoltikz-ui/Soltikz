"use client";
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RESUME_TEMPLATES } from '@/components/create-resume/templates/registry'
import { sampleResumeData, sampleProfileData, c2cSampleData } from '@/components/create-resume/templates/sampleData'

export function TemplatesSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              5+ Professional Resume Templates
            </h2>
            <p className="text-slate-500 font-medium">Choose from a variety of professionally designed templates</p>
          </div>
          <Link href="/templates" className="inline-flex items-center gap-1.5 text-accent font-bold hover:text-accent-hover transition-colors">
            View All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Templates Display */}
        <div className="flex items-center gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {RESUME_TEMPLATES.filter(t => t.id !== 'c2c').map((template) => {
            const TemplateComponent = template.component
            return (
              <div key={template.id} className="shrink-0 w-[240px] sm:w-[280px] snap-center">
                <Link href="/templates">
                  <div className="relative rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden aspect-[1/1.4] hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group flex justify-center">
                    <div
                      className="absolute top-0 origin-top pointer-events-none"
                      style={{ width: '850px', transform: 'scale(0.32)' }}
                    >
                      <TemplateComponent
                        resumeData={template.id === 'c2c' ? c2cSampleData : sampleResumeData}
                        profileData={sampleProfileData}
                      />
                    </div>

                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-slate-900 text-sm font-bold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 duration-200">
                        Use Template
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
