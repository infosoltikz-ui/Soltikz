"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Sparkles,
  ShieldCheck,
  Download,
  Layers,
  Cpu,
  Check,
  ArrowRight,
  Flame,
  FileCheck,
  SlidersHorizontal,
  CheckCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export function BentoFeaturesSection() {
  const [activeFormat, setActiveFormat] = useState<"fulltime" | "c2c">("fulltime");

  return (
    <section
      className="py-10 sm:py-12 bg-[#FBFBF9] dark:bg-[#0B132B] border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors duration-300"
      id="features"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-amber-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0F2744] dark:text-amber-400" />
            Purpose-Built For Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 dark:text-white tracking-tight leading-[1.15] mb-4">
            Everything you need to turn job postings into{" "}
            <span className="bg-gradient-to-r from-[#0F2744] via-indigo-700 to-amber-600 dark:from-sky-400 dark:via-indigo-300 dark:to-amber-300 bg-clip-text text-transparent">
              interviews.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            No generic templates or arbitrary numbers. Soltkiz extracts employer vocabulary and
            reformats your career achievements with recruiter-approved precision.
          </p>
        </div>

        {/* ── BENTO GRID LAYOUT (2 ROWS × BALANCED CARDS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* CARD 1: Strict 2-Line Bullets & Bold Keywords (COL 7)       */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Recruiter Gold Standard
                </span>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                  6-Second Scan Tested
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                Strict 2-Line Bullets with Bolded Keywords
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-6">
                Recruiters spend 6 seconds skimming before rejecting. Our engine enforces exactly two
                full printed lines per bullet with bolded keywords so your top achievements are
                instantly seen.
              </p>
            </div>

            {/* Visual Example Inspector Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2.5">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Senior Software Engineer • TechFlow Inc.
                </span>
                <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-[11px]">
                  Ideal 2-Line Quota ✓
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2744] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <p className="text-[12px] sm:text-[13px] leading-relaxed">
                    Architected distributed{" "}
                    <strong className="font-black text-slate-950 dark:text-white bg-amber-500/10 dark:bg-amber-400/20 px-1 rounded text-amber-900 dark:text-amber-200">
                      Next.js 16
                    </strong>{" "}
                    &amp;{" "}
                    <strong className="font-black text-slate-950 dark:text-white bg-amber-500/10 dark:bg-amber-400/20 px-1 rounded text-amber-900 dark:text-amber-200">
                      TypeScript
                    </strong>{" "}
                    microservices reducing p99 latency by{" "}
                    <strong className="font-black text-slate-950 dark:text-white">42%</strong> across{" "}
                    <strong className="font-black text-slate-950 dark:text-white">2.4M monthly transactions</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F2744] dark:bg-amber-400 mt-1.5 shrink-0" />
                  <p className="text-[12px] sm:text-[13px] leading-relaxed">
                    Streamlined automated{" "}
                    <strong className="font-black text-slate-950 dark:text-white bg-amber-500/10 dark:bg-amber-400/20 px-1 rounded text-amber-900 dark:text-amber-200">
                      CI/CD Pipelines
                    </strong>{" "}
                    on{" "}
                    <strong className="font-black text-slate-950 dark:text-white bg-amber-500/10 dark:bg-amber-400/20 px-1 rounded text-amber-900 dark:text-amber-200">
                      AWS ECS
                    </strong>
                    , slashing deployment failure rates from{" "}
                    <strong className="font-black text-slate-950 dark:text-white">14% down to 0.4%</strong>.
                  </p>
                </div>
              </div>

              {/* Eye Tracking Metric Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-semibold">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  High Skimmability Score
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  3.4x Higher Recruiter Engagement
                </span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* CARD 2: Direct Word (.docx) & Vector PDF Export (COL 5)     */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-sky-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full">
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  Multi-Format Ready
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  100% Vector Quality
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                Clean Word (.docx) &amp; Vector PDF
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Staffing agencies require editable Word documents; corporate portals prefer PDFs.
                Export both instantly with zero layout shifts, right-aligned dates, and embedded fonts.
              </p>
            </div>

            {/* Visual File Formats Showcase */}
            <div className="grid grid-cols-2 gap-3.5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
              {/* Word Box */}
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-2xs group-hover:border-blue-400/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center font-black text-sm mb-2 border border-blue-200 dark:border-blue-800">
                  DOCX
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white">Microsoft Word</div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Editable &amp; Agency Ready
                </div>
                <div className="mt-2 text-[10px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/40 py-0.5 px-2 rounded-full inline-block">
                  Native Tables
                </div>
              </div>

              {/* PDF Box */}
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-2xs group-hover:border-rose-400/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center font-black text-sm mb-2 border border-rose-200 dark:border-rose-800">
                  PDF
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white">Vector PDF</div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  Pixel-Perfect Print
                </div>
                <div className="mt-2 text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 py-0.5 px-2 rounded-full inline-block">
                  Selectable Text
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* CARD 3: Corporate Full-Time & C2C / Contract Modes (COL 5)  */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Dual Career Modes
                </span>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                  1-Click Format Swap
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                Full-Time &amp; C2C Contract Modes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Switch effortlessly between 1-page corporate applications and 2-page vendor staffing
                submissions with dedicated skills matrices and billing environments.
              </p>
            </div>

            {/* Segmented Mode Selector Visual */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
              <button
                type="button"
                onClick={() => setActiveFormat("fulltime")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  activeFormat === "fulltime"
                    ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-xs ring-2 ring-indigo-500/20"
                    : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeFormat === "fulltime" ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Corporate Full-Time
                    </div>
                    <div className="text-[10px] text-slate-500">1-Page High-Impact Concise</div>
                  </div>
                </div>
                <span className="text-[10.5px] font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                  Direct Hire
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFormat("c2c")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  activeFormat === "c2c"
                    ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-xs ring-2 ring-indigo-500/20"
                    : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeFormat === "c2c" ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Contract &amp; C2C Submissions
                    </div>
                    <div className="text-[10px] text-slate-500">2-Page Skills Matrix + Clearances</div>
                  </div>
                </div>
                <span className="text-[10.5px] font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                  Staffing &amp; Corp
                </span>
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* CARD 4: ATS Verification & Enterprise Clearance (COL 7)    */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Parser Clearance Guaranteed
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  99.8% Average Pass
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-2.5">
                Tested Against Workday, Taleo, Greenhouse &amp; Lever
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-6">
                Every template utilizes single-column semantic markup, standard font encodings, and
                universal headers-guaranteeing automated HR parsers extract every skill without
                scrambling your experience.
              </p>
            </div>

            {/* ATS Systems 4-Column Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
              {[
                { name: "Workday", category: "Enterprise HR", rate: "99.8% Pass", pass: "Field Validated" },
                { name: "Greenhouse", category: "Tech Scale-Ups", rate: "99.9% Pass", pass: "Zero Scramble" },
                { name: "Taleo (Oracle)", category: "Fortune 500", rate: "99.4% Pass", pass: "Skills Parsed" },
                { name: "Lever", category: "Modern ATS", rate: "99.8% Pass", pass: "Chronology OK" },
              ].map((sys) => (
                <div
                  key={sys.name}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs group-hover:border-emerald-400/40 transition-colors"
                >
                  <div className="text-xs font-black text-slate-900 dark:text-white">{sys.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{sys.category}</div>
                  <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 mt-1.5">
                    {sys.rate}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                    {sys.pass}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
