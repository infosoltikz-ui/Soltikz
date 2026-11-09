"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Check,
  Download,
  Target,
  UserCheck,
  Layers,
  FileCheck,
  SlidersHorizontal,
  CheckCheck,
  FileText,
  UploadCloud,
  Briefcase,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface StepData {
  step: string;
  stepNum: string;
  category: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  footerText: string;
}

const STEPS: StepData[] = [
  {
    step: "01",
    stepNum: "Step 01",
    category: "Master Profile",
    badge: "1-Click Sync",
    badgeColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-sky-300 border-blue-200 dark:border-blue-800",
    title: "Enter Career History Once",
    description:
      "Add your employment history, tools, and achievements once - or sync directly from LinkedIn or your old PDF. Soltkiz securely stores your Master Profile as the single source of truth.",
    footerText: "Single Source of Truth • Never Re-type Again",
  },
  {
    step: "02",
    stepNum: "Step 02",
    category: "Target Job",
    badge: "Workday & Taleo",
    badgeColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    title: "Paste Any Target Job Posting",
    description:
      "Paste the job requirements and select Full-Time (1-page) or C2C / Contract (2-page skills matrix). Our engine extracts the employer vocabulary, seniority, and required metrics in seconds.",
    footerText: "Semantic AI Extraction • Zero Guesswork",
  },
  {
    step: "03",
    stepNum: "Step 03",
    category: "Recruiter Ready",
    badge: "98% ATS Pass",
    badgeColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    title: "Export in Word (.docx) or PDF",
    description:
      "Download your recruiter-ready resume with strict 2-line bullets and bolded keywords. Plus, get an auto-generated matching Cover Letter and STAR interview talking points.",
    footerText: "Direct Multi-Format Save • 100% Recruiter Ready",
  },
];

export function HowItWorksSection() {
  const [selectedFormat, setSelectedFormat] = useState<"fulltime" | "c2c">("fulltime");

  return (
    <section
      className="py-10 sm:py-12 bg-[#FBFBF9] dark:bg-[#0B132B] border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors duration-300"
      id="how-it-works"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[480px] bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-amber-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0F2744] dark:text-amber-400" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 dark:text-white tracking-tight leading-[1.12] mb-4">
            How Soltkiz lands you more{" "}
            <span className="bg-gradient-to-r from-[#0F2744] via-indigo-700 to-amber-600 dark:from-sky-400 dark:via-indigo-300 dark:to-amber-300 bg-clip-text text-transparent">
              interviews.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            From generic career history to targeted, recruiter-ready resume in under 60 seconds.
          </p>
        </div>

        {/* ── 3-STEP CARDS WITH CONNECTED VISUAL FLOW ── */}
        <div className="relative">
          {/* Subtle Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-28 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch relative z-10">
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* STEP 1: Enter Career History Once                           */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Step Top Bar: Single Line guaranteed */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0F2744] dark:text-sky-300 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center font-black text-xs font-mono shadow-2xs shrink-0">
                      01
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap truncate">
                      {STEPS[0].category}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 ${STEPS[0].badgeColor}`}>
                    {STEPS[0].badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                  {STEPS[0].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                  {STEPS[0].description}
                </p>

                {/* Visual Preview: Master Profile & Sync Card */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        in
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          LinkedIn Sync
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          Imported in 2.4s
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      Profile Active ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <div className="text-xs font-black text-slate-900 dark:text-white">6</div>
                      <div className="text-[9px] text-slate-400">Roles</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <div className="text-xs font-black text-slate-900 dark:text-white">18</div>
                      <div className="text-[9px] text-slate-400">Projects</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                      <div className="text-xs font-black text-slate-900 dark:text-white">32</div>
                      <div className="text-[9px] text-slate-400">Skills</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{STEPS[0].footerText}</span>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* STEP 2: Paste Any Target Job Posting                        */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Step Top Bar: Single Line guaranteed */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 flex items-center justify-center font-black text-xs font-mono shadow-2xs shrink-0">
                      02
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap truncate">
                      {STEPS[1].category}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 ${STEPS[1].badgeColor}`}>
                    {STEPS[1].badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                  {STEPS[1].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                  {STEPS[1].description}
                </p>

                {/* Visual Preview: Job Description Scanner & Matrix Switcher */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 mb-6">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="truncate max-w-[150px]">Target: Lead Engineer</span>
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold">+24 Extracted</span>
                  </div>

                  {/* Mode Selector Preview */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[10.5px]">
                    <button
                      type="button"
                      onClick={() => setSelectedFormat("fulltime")}
                      className={`py-1 px-2 rounded-lg font-bold text-center transition-all ${
                        selectedFormat === "fulltime"
                          ? "bg-[#0F2744] text-white"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      Full-Time (1-Pg)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFormat("c2c")}
                      className={`py-1 px-2 rounded-lg font-bold text-center transition-all ${
                        selectedFormat === "c2c"
                          ? "bg-[#0F2744] text-white"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      C2C Matrix (2-Pg)
                    </button>
                  </div>

                  {/* Keyword Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Next.js", "Kafka", "AWS EKS", "System Design"].map((kw) => (
                      <span
                        key={kw}
                        className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{STEPS[1].footerText}</span>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* STEP 3: Export in Word (.docx) or PDF                       */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Step Top Bar: Single Line guaranteed */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center font-black text-xs font-mono shadow-2xs shrink-0">
                      03
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap truncate">
                      {STEPS[2].category}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 ${STEPS[2].badgeColor}`}>
                    {STEPS[2].badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                  {STEPS[2].title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6">
                  {STEPS[2].description}
                </p>

                {/* Visual Preview: Multi-Format Instant Export Hub */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 mb-6">
                  {/* Score Callout */}
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs">
                        ✓
                      </div>
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        ATS Score: 98%
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                      Workday Ready
                    </span>
                  </div>

                  {/* Dual Format Download Buttons Preview */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-[11px] font-bold text-blue-700 dark:text-sky-300">
                      <Download className="w-3.5 h-3.5" />
                      <span>Word (.docx)</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-[11px] font-bold text-rose-700 dark:text-rose-300">
                      <Download className="w-3.5 h-3.5" />
                      <span>Vector PDF</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-slate-500 dark:text-slate-400 font-medium">
                    + Matching Cover Letter &amp; STAR Prep Included
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{STEPS[2].footerText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM HIGH-IMPACT CTA ── */}
        <div className="text-center mt-7 sm:mt-8 flex flex-col items-center">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#0F2744] hover:bg-[#16365C] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-sm tracking-wide shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400 dark:text-slate-950 group-hover:rotate-12 transition-transform duration-200" />
            <span>Try It Free - 20 Generations Included</span>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-900 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-3">
            No credit card required • Instant Word &amp; PDF downloads • Free forever plan
          </p>
        </div>
      </div>
    </section>
  );
}
