"use client";
import React from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  Download,
  Check,
  TrendingUp,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export function CoreFeatures() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Flagship Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 mb-3 tracking-tight">
            Engineered around recruiter psychology & bot algorithms.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Every feature in Soltkiz addresses a specific failure point where candidates get filtered out by applicant tracking systems.
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: ATS Scoring Engine (Large 7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950 text-base">Real-Time ATS Score Checker</h3>
                    <p className="text-xs text-slate-500 font-medium">Workday, Taleo & Greenhouse AST parser</p>
                  </div>
                </div>
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  96/100 Score
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Our engine parses your resume using the exact tokenization rules that enterprise ATS platforms use. It breaks down your score across three distinct layers: Hard Skill Keywords, Title Alignment, and Measured Metric Density.
              </p>

              {/* Mini parser demo */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Hard Skill Keyword Coverage</span>
                  <span className="font-black text-emerald-700">27 / 28 Matched (96%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[96%]" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Role Title & Seniority Alignment</span>
                  <span className="font-black text-emerald-700">100% Match</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[100%]" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Quantified Business Metrics</span>
                  <span className="font-black text-indigo-700">92% High Density</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[92%]" />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Guaranteed 100% Workday AST Clearance
              </span>
            </div>
          </div>

          {/* Card 2: Strict 2-Line Bullets (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950 text-base">Strict 2-Line Bullets</h3>
                    <p className="text-xs text-slate-500 font-medium">Recruiter 6-second skim standard</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Gold Standard
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Recruiters don't read resumes line by line; they skim in an F-pattern. 1-line bullets look thin; 3-line bullets get skipped. Soltkiz enforces exactly two printed lines per bullet with bolded keywords.
              </p>

              {/* Bullet point demonstration */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-snug space-y-2">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">Example Output:</div>
                <p>
                  Tuned 45+ enterprise <strong className="font-bold text-slate-950 bg-amber-100/90 px-1 rounded">Splunk ES</strong> correlation queries, driving a <strong className="font-bold text-slate-950 bg-emerald-100/90 px-1 rounded">38% reduction in false positives</strong> across 250k daily events.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-700">
              <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
              <span>Bolded employer keywords + quantified outcomes</span>
            </div>
          </div>

          {/* Card 3: Full-Time vs Contract C2C Matrix (6 Cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950 text-base">Full-Time vs C2C Dual Engine</h3>
                    <p className="text-xs text-slate-500 font-medium">1-Page Executive or 2-Page Skills Matrix</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  Dual Format
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Corporate direct-hire recruiters reject multi-page resumes, while US IT staffing vendors demand a detailed 2-page skills matrix with vendor client columns. Switch formats with one click.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900 mb-1">Full-Time (1-Page)</div>
                  <p className="text-[11px] text-slate-500">Concise executive summary, tight experience bullets, clean single-column hierarchy.</p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-200 text-xs">
                  <div className="font-bold text-indigo-950 mb-1">Contract / C2C (2-Page)</div>
                  <p className="text-[11px] text-indigo-900">Dedicated skills matrix table with Client, Role, Tech Stack, and Responsibilities.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-700">
              <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
              <span>Built specifically for the US IT recruiting workflow</span>
            </div>
          </div>

          {/* Card 4: Word (.docx) & Vector PDF Export (6 Cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
                    <Download className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950 text-base">True Word (.docx) & Vector PDF</h3>
                    <p className="text-xs text-slate-500 font-medium">Native document generation, zero rasterization</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  Dual Download
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Many recruiters explicitly demand a Microsoft Word (.docx) file so their agency can re-format dates or insert their header. Soltkiz generates true native XML .docx documents alongside crystal-clear selectable Vector PDFs.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Clean Word (.docx)</div>
                    <div className="text-[10.5px] text-slate-500">100% editable XML format</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-3">
                  <FileText className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Vector PDF</div>
                    <div className="text-[10.5px] text-slate-500">Pixel-perfect text layer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-700">
              <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
              <span>Right-aligned tab stops and clean single-column flow</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}