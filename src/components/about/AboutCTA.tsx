"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/70 to-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Subtle Ambient Radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Start For Free Today
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2.5 leading-snug">
              Stop letting bot filters dictate your career.
            </h2>
            
            <p className="text-sm text-slate-400 leading-relaxed font-normal mb-4">
              Join 50,000+ ambitious job seekers who stopped sending generic resumes and started landing 3.4x more interview callbacks.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                20 Free Tailored Generations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Instant Word & PDF Export
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No Credit Card Required
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 group cursor-pointer"
            >
              <span>Build My Resume Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}