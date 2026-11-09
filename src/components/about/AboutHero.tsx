"use client";
import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  Users,
  Award,
  TrendingUp,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export function AboutHero() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-b border-slate-200/80">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Top Eyebrow Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Our Mission & Purpose
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-950 mb-4 leading-[1.12] tracking-tight">
            Built to end the black hole of<br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              job application rejections.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Every year, 75% of qualified candidates are silently filtered out by automated ATS bots before a human recruiter ever sees their name. Soltkiz IT was founded to give job seekers algorithmic equality with authentic achievements.
          </p>
        </div>

        {/* Hero Interactive Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          
          {/* Main Story Box (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl -z-10" />
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
                  The Problem
                </span>
                <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                  75% of Resumes Dropped Unread
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-3 leading-snug">
                Recruiting software isn't reading your story. It's parsing tokens.
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Systems like Workday, Taleo, and Greenhouse parse resumes into abstract syntax trees. If your achievements lack the employer's exact required phrasing, seniority markers, and measurable percentage outcomes, your application ends up in the rejected queue - regardless of your real talent.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                At Soltkiz, we do not believe in fake experience or keyword stuffing. We believe in high-fidelity translation: taking your real career milestones and structuring them into the exact 2-line cadence and verified vocabulary that hiring algorithms reward.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Hallucinations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recruiter 6-Sec Cadence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Data Privacy</span>
              </div>
            </div>
          </div>

          {/* Key Impact Stats Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Platform Impact
                  </span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Live Telemetry
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">50,000+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Resumes tailored & exported across US, UK & Canada</div>
                </div>

                <div className="h-px bg-slate-800/80" />

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.4%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Automated screening pass rate through Workday & Taleo</div>
                </div>

                <div className="h-px bg-slate-800/80" />

                <div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400">3.4x</div>
                  <div className="text-xs text-slate-400 mt-0.5">Higher interview callback rate compared to generic resumes</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Backed by Soltkiz IT Services</span>
              <Link
                href="/register"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
              >
                <span>Join Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}