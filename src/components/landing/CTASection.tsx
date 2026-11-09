"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-8 sm:py-10 bg-transparent px-4 border-t border-slate-200/80 dark:border-slate-800">
      <div className="container mx-auto max-w-5xl relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F2744] via-[#16365C] to-[#0F2744] border border-blue-500/20 shadow-xl px-6 py-7 sm:px-10 sm:py-8 text-white">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Start For Free Today
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2 text-white">
              Ready to Land More Interviews <br className="hidden sm:inline" />
              with a Tailored Resume?
            </h2>

            <p className="text-slate-300 font-normal text-xs sm:text-sm leading-relaxed mb-4 max-w-lg">
              Join 50,000+ job seekers who stopped sending generic resumes and started beating ATS automated screenings.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                20 Free Tailored Resumes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Cover Letter &amp; STAR Prep
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                No Credit Card Required
              </span>
            </div>
          </div>

          {/* Right Column: Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <Link href="/register" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0F2744] font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Create My Resume Free</span>
                <ArrowRight className="w-4 h-4 text-[#0F2744]" />
              </button>
            </Link>

            <Link href="/pricing" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl backdrop-blur-sm transition-all cursor-pointer"
              >
                <span>View Pro Plans</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
