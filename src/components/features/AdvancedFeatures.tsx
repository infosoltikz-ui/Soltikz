"use client";
import React from 'react';
import {
  FileSearch,
  Sparkles,
  Bot,
  FileEdit,
  UserCheck,
  Shield,
  ArrowUpRight,
  Check
} from 'lucide-react';

const ADVANCED_LIST = [
  {
    icon: FileSearch,
    title: 'Semantic Job Posting Scanner',
    desc: "Paste any job description from LinkedIn, Indeed, or company career portals. Soltkiz extracts the employer's exact required skills, tools, and seniority level.",
    tag: 'Keyword Matcher',
  },
  {
    icon: Sparkles,
    title: 'Recruiter Action Verb Engine',
    desc: 'Automatically replaces weak phrases like "responsible for" or "helped with" with high-leverage action verbs like "Architected", "Engineered", and "Spearheaded".',
    tag: 'Impact Language',
  },
  {
    icon: UserCheck,
    title: '1-Click Profile Sync',
    desc: 'Connect your LinkedIn or upload an old PDF resume once. Soltkiz automatically parses your employment history, certifications, and skills into your Master Profile.',
    tag: 'Zero Manual Typing',
  },
  {
    icon: Bot,
    title: 'Interview STAR Talking Points',
    desc: 'Turn every bullet on your resume into a complete Situation, Task, Action, and Result talking script ready for your technical and behavioral interview rounds.',
    tag: 'Interview Prep',
  },
  {
    icon: FileEdit,
    title: 'Matching Cover Letter Generator',
    desc: 'Create an employer-aligned cover letter with matching header typography, colors, and tone in under 30 seconds for every target job application.',
    tag: 'One-Click Match',
  },
  {
    icon: Shield,
    title: 'Encrypted Master Profile Vault',
    desc: 'Store your entire career timeline, projects, and multiple versions securely. Never start from scratch again when applying to diverse engineering or product roles.',
    tag: 'Private & Secure',
  },
];

export function AdvancedFeatures() {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            Advanced Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 mb-3 tracking-tight">
            More intelligent features to accelerate your job search.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Everything you need from your first application to your final salary negotiation.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ADVANCED_LIST.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                      <Icon className="w-5 h-5 text-slate-800 group-hover:text-emerald-700 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Integrated in Free Plan</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}