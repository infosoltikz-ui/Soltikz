"use client";
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  Check,
  Eye,
  LayoutGrid,
  Monitor,
  ShieldCheck,
  FileText,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { RESUME_TEMPLATES } from '@/components/create-resume/templates/registry';
import { sampleResumeData, sampleProfileData, c2cSampleData } from '@/components/create-resume/templates/sampleData';

interface TemplateExtraMeta {
  bestFor: string;
  category: 'Full-Time (1-Page)' | 'Contract C2C (2-Page)';
  atsScore: string;
  highlights: string[];
}

const TEMPLATE_METADATA: Record<string, TemplateExtraMeta> = {
  classic: {
    bestFor: 'Software Engineers, DevOps & Cloud Architects',
    category: 'Full-Time (1-Page)',
    atsScore: '99% ATS Match',
    highlights: ['Strictly single-column', 'Zero parsing artifacts', 'High information density'],
  },
  modern: {
    bestFor: 'Full-Stack Developers, Frontend & Mobile',
    category: 'Full-Time (1-Page)',
    atsScore: '98% ATS Match',
    highlights: ['Centered teal accent header', '2-column skills matrix', 'Bolded keywords'],
  },
  banner: {
    bestFor: 'Product Managers, Tech Leads & Directors',
    category: 'Full-Time (1-Page)',
    atsScore: '97% ATS Match',
    highlights: ['Executive banner header', 'Serif typography', 'High-impact summary'],
  },
  certified: {
    bestFor: 'Cybersecurity, Cloud Specialists & Solutions Architects',
    category: 'Full-Time (1-Page)',
    atsScore: '98% ATS Match',
    highlights: ['Highlighted credentials badge', 'Dense certification grid', 'Structured borders'],
  },
  sidebar: {
    bestFor: 'Data Scientists, ML Engineers & Researchers',
    category: 'Full-Time (1-Page)',
    atsScore: '96% ATS Match',
    highlights: ['Left-aligned accent hierarchy', 'Indented bullet structure', 'Clean modern flow'],
  },
  c2c: {
    bestFor: 'US IT Staffing, Prime Vendors & W2/C2C Submissions',
    category: 'Contract C2C (2-Page)',
    atsScore: '99% Vendor Clearance',
    highlights: ['Dedicated skills matrix table', 'Client / Vendor columns', 'Dense tech stack'],
  },
  'c2c-banner': {
    bestFor: 'Senior Solutions Architects & Contract Leads',
    category: 'Contract C2C (2-Page)',
    atsScore: '98% Vendor Clearance',
    highlights: ['Professional colored banner', 'Strict C2C data mapping', '2-page vendor layout'],
  },
  'c2c-modern': {
    bestFor: 'Full-Stack Contractors & Cloud Consultants',
    category: 'Contract C2C (2-Page)',
    atsScore: '98% Vendor Clearance',
    highlights: ['Centered header with line dividers', 'Structured client experience matrix'],
  },
  'c2c-certified': {
    bestFor: 'Certified Security & Cloud Specialists on C2C',
    category: 'Contract C2C (2-Page)',
    atsScore: '99% Vendor Clearance',
    highlights: ['Grid-based credential table', 'High-volume staffing review standard'],
  },
  'c2c-sidebar': {
    bestFor: 'Enterprise Data Engineers & ERP Contractors',
    category: 'Contract C2C (2-Page)',
    atsScore: '97% Vendor Clearance',
    highlights: ['Left-aligned C2C structure', 'Readable multi-project hierarchy'],
  },
};

export function TemplatesSection() {
  const [filter, setFilter] = useState<'all' | 'full-time' | 'c2c'>('all');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('classic');
  const [viewMode, setViewMode] = useState<'spotlight' | 'grid'>('spotlight');

  const filteredTemplates = RESUME_TEMPLATES.filter((template) => {
    const isC2C = template.id.startsWith('c2c');
    if (filter === 'full-time') return !isC2C;
    if (filter === 'c2c') return isC2C;
    return true;
  });

  const activeTemplate =
    RESUME_TEMPLATES.find((t) => t.id === selectedTemplateId) || filteredTemplates[0] || RESUME_TEMPLATES[0];
  const activeIsC2C = activeTemplate.id.startsWith('c2c');
  const ActiveTemplateComponent = activeTemplate.component;
  const activeMeta = TEMPLATE_METADATA[activeTemplate.id] || {
    bestFor: 'All Technical Professionals',
    category: activeIsC2C ? 'Contract C2C (2-Page)' : 'Full-Time (1-Page)',
    atsScore: '98% ATS Match',
    highlights: ['Workday & Taleo compliant', 'Strict 2-line cadence', 'Word & PDF ready'],
  };

  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-200/80 overflow-hidden relative" id="templates">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 sm:mb-9 gap-4 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Recruiter-Tested Layouts
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-1.5 tracking-tight">
              10+ High-Conversion Resume Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-2xl">
              Single-column, Workday/Taleo-compliant layouts designed to pass bot filters and impress hiring managers.
            </p>
          </div>

          {/* Master Control Deck: Single Unified Line */}
          <div className="flex items-center flex-nowrap gap-1.5 p-1 bg-white border border-slate-200/90 rounded-2xl shadow-xs shrink-0 whitespace-nowrap overflow-x-auto max-w-full">
            {/* Category Filter Pills */}
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All (10)
            </button>
            <button
              onClick={() => setFilter('full-time')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'full-time'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Full-Time (5)
            </button>
            <button
              onClick={() => setFilter('c2c')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'c2c'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              C2C / Contract (5)
            </button>

            {/* Subtle Divider */}
            <div className="h-5 w-px bg-slate-200 mx-0.5" />

            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode('spotlight')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'spotlight'
                  ? 'bg-slate-100 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Spotlight Studio View"
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-600" />
              <span>Studio</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-slate-100 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Grid Gallery View"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW MODE 1: SPOTLIGHT STUDIO (INTERACTIVE HERO MODEL)     */}
        {/* ======================================================== */}
        {viewMode === 'spotlight' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Template Selector Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredTemplates.map((template) => {
                const isSelected = template.id === activeTemplate.id;
                const isC2C = template.id.startsWith('c2c');
                const meta = TEMPLATE_METADATA[template.id] || {
                  bestFor: 'General Tech Roles',
                  category: isC2C ? 'Contract C2C (2-Page)' : 'Full-Time (1-Page)',
                  atsScore: '98% ATS',
                  highlights: [],
                };

                return (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplateId(template.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-2 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-950 text-sm">{template.name}</h4>
                          {isC2C && (
                            <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/30">
                              C2C Matrix
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{meta.bestFor}</p>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                        {meta.atsScore}
                      </span>
                    </div>

                    <p className="text-[11.5px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                      <span className="text-[10.5px] font-semibold text-slate-500">
                        {meta.category}
                      </span>
                      <Link
                        href={`/dashboard/create?template=${template.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                          isSelected ? 'text-emerald-700 hover:text-emerald-800' : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        <span>Use This</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: High-Fidelity Studio Showcase Stage (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
              
              {/* Studio Stage Top Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                    {activeTemplate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-950 text-sm flex items-center gap-2">
                      <span>{activeTemplate.name}</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">
                        {activeMeta.category}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">{activeMeta.bestFor}</p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/create?template=${activeTemplate.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Customize Template</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              </div>

              {/* Verified Feature Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-3.5 text-[11px] font-bold text-slate-700">
                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Workday & Taleo AST Verified
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  Clean Word (.docx) & Vector PDF
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Strict 2-Line Bullets Standard
                </span>
              </div>

              {/* Resume Viewport Stage */}
              <div className="relative rounded-2xl bg-slate-100/80 border border-slate-200/90 overflow-hidden h-[440px] flex justify-center shadow-inner group">
                <div
                  className="absolute top-4 origin-top transition-transform duration-300 scale-[0.44] sm:scale-[0.52] shadow-2xl rounded-sm"
                  style={{ width: '850px' }}
                >
                  <Suspense fallback={<div className="w-[850px] h-[1100px] bg-white animate-pulse rounded-md" />}>
                    <ActiveTemplateComponent
                      resumeData={activeIsC2C ? c2cSampleData : sampleResumeData}
                      profileData={sampleProfileData}
                    />
                  </Suspense>
                </div>

                {/* Floating Preview Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors flex items-end justify-center pb-5 pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Link
                      href={`/dashboard/create?template=${activeTemplate.id}`}
                      className="pointer-events-auto px-5 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs shadow-xl flex items-center gap-2 border border-slate-700 hover:scale-105 transition-transform"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Open in Template Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 2: RESPONSIVE GRID GALLERY                      */}
        {/* ======================================================== */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const TemplateComponent = template.component;
              const isC2C = template.id.startsWith('c2c');
              const meta = TEMPLATE_METADATA[template.id] || {
                bestFor: 'Technical Roles',
                category: isC2C ? 'Contract C2C (2-Page)' : 'Full-Time (1-Page)',
                atsScore: '98% ATS',
                highlights: [],
              };

              return (
                <div
                  key={template.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-black text-slate-950 text-sm">{template.name}</h4>
                      <p className="text-[10.5px] text-slate-500 mt-0.5">{meta.bestFor}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {meta.atsScore}
                    </span>
                  </div>

                  {/* Resume Canvas Preview */}
                  <div className="relative rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden h-[340px] flex justify-center mb-3 group-hover:border-emerald-300 transition-colors">
                    <div
                      className="absolute top-2 origin-top transition-transform duration-300 scale-[0.34] shadow-md rounded-xs pointer-events-none"
                      style={{ width: '850px' }}
                    >
                      <Suspense fallback={<div className="w-[850px] h-[1100px] bg-white animate-pulse" />}>
                        <TemplateComponent
                          resumeData={isC2C ? c2cSampleData : sampleResumeData}
                          profileData={sampleProfileData}
                        />
                      </Suspense>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <Link
                    href={`/dashboard/create?template=${template.id}`}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-900 font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-slate-200 hover:border-slate-950 shadow-2xs"
                  >
                    <span>Use {template.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="text-center mt-8 pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All 10 templates pass Workday, Taleo, Greenhouse, and Lever AST parsing algorithms.</span>
          </div>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-950 hover:text-emerald-700 transition-colors bg-white border border-slate-200/90 px-4 py-2 rounded-full shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Customize Any Template in Resume Studio</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
        </div>

      </div>
    </section>
  );
}