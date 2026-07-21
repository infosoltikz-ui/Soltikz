"use client";
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="shrink-0 w-[240px] sm:w-[280px] snap-center">
              <div className="relative rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden aspect-[1/1.4] hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                {/* Dummy Template Visualization */}
                <div className="w-full h-full flex flex-col p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                    <div>
                      <div className="w-20 h-2 bg-slate-800 rounded-full mb-1.5" />
                      <div className="w-12 h-1.5 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-primary/20 rounded-full mb-4" />
                  <div className="flex gap-4 flex-1">
                    <div className="w-1/3 space-y-2">
                      <div className="w-full h-1.5 bg-slate-200 rounded-full" />
                      <div className="w-5/6 h-1.5 bg-slate-200 rounded-full" />
                      <div className="w-full h-1.5 bg-slate-200 rounded-full" />
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div>
                        <div className="w-1/2 h-2 bg-slate-800 rounded-full mb-1" />
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-0.5" />
                        <div className="w-4/5 h-1.5 bg-slate-200 rounded-full" />
                      </div>
                      <div>
                        <div className="w-1/2 h-2 bg-slate-800 rounded-full mb-1" />
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-0.5" />
                        <div className="w-3/4 h-1.5 bg-slate-200 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
