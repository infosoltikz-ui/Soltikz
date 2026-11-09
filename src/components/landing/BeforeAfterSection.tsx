"use client";
import React from 'react';
import { AlertTriangle, Check, XCircle, CheckCircle2, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export function BeforeAfterSection() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-200/80 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Side-By-Side Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 mb-4 leading-[1.12] tracking-tight">
            The same candidate. The same jobs.<br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Two completely different career results.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We don't invent fake experience. Soltkiz extracts your authentic achievements and translates them into the employer's exact required vocabulary and metrics.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* BEFORE COLUMN (Generic Resume - Rejected) */}
          <div className="flex flex-col bg-white border border-rose-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
            
            {/* Top Score Bar */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center font-black text-2xl text-rose-600 shadow-2xs">
                  58
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Generic One-Size Resume</h4>
                  <p className="text-xs text-rose-600 font-bold">Filtered out by Taleo / Workday</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Screening Rejected
              </span>
            </div>

            {/* Resume Sheet Preview (Dull & Flawed) */}
            <div className="flex-1 bg-slate-50/70 border border-dashed border-rose-200/90 rounded-2xl p-5 mb-5 flex flex-col font-sans">
              <div className="mb-4">
                <h3 className="text-base font-black text-slate-700">John D****</h3>
                <p className="text-[10.5px] text-slate-400 mt-0.5">Dallas, TX • john.xxxx@gmail.com</p>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h4 className="text-[10px] font-black text-slate-500 tracking-wider mb-1 uppercase border-b border-slate-200 pb-0.5">Objective</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <span className="bg-rose-100 text-rose-950 px-1 py-0.5 rounded text-[10.5px]">
                    Motivated and hardworking professional looking for a challenging cybersecurity role in a fast-paced environment.
                  </span>
                </p>
              </div>

              {/* Experience */}
              <div className="mb-4 flex-1 space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-500 tracking-wider mb-1 uppercase border-b border-slate-200 pb-0.5">Experience</h4>
                
                <div>
                  <div className="flex justify-between items-baseline mb-0.5 text-[11px]">
                    <span className="font-bold text-slate-800">Security Analyst</span>
                    <span className="text-slate-400">2023 – Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10.5px] text-slate-600 leading-relaxed space-y-1">
                    <li><span className="bg-rose-100 text-rose-950 px-1 py-0.5 rounded">Responsible for monitoring security alerts and escalating incidents to seniors.</span></li>
                    <li><span className="bg-rose-100 text-rose-950 px-1 py-0.5 rounded">Assisted team with audits and general daily IT duties.</span></li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 tracking-wider mb-1 uppercase border-b border-slate-200 pb-0.5">Skills</h4>
                <p className="text-[10.5px] text-slate-600">
                  <span className="bg-rose-100 text-rose-950 px-1 py-0.5 rounded">
                    JavaScript, HTML, CSS, Microsoft Word, Teamwork, Hard Working (Irrelevant keywords)
                  </span>
                </p>
              </div>
            </div>

            {/* Critique Bottom Line */}
            <div className="flex gap-2.5 text-xs text-rose-900 font-semibold items-start bg-rose-50/80 border border-rose-200/90 p-3.5 rounded-2xl">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p>Vague responsibilities, zero quantified impact metrics, missing security tooling keywords, and generic filler phrases that trigger automated rejection.</p>
            </div>
          </div>

          {/* AFTER COLUMN (Tailored with Soltkiz AI - Shortlisted) */}
          <div className="flex flex-col bg-white border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 relative group">
            
            {/* Top Score Bar */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-2xl text-white shadow-md shadow-emerald-600/20">
                  96
                </div>
                <div>
                  <h4 className="font-black text-slate-950 text-sm">Tailored with Soltkiz AI</h4>
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>+38% ATS match for AWS Security</span>
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Shortlisted for Interview
              </span>
            </div>

            {/* Resume Sheet Preview (Crisp & High-Impact) */}
            <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-5 mb-5 flex flex-col font-sans shadow-xs">
              <div className="mb-4">
                <h3 className="text-base font-black text-slate-950">John Doe</h3>
                <p className="text-[10.5px] text-slate-500 mt-0.5">Dallas, TX • john.doe@email.com • linkedin.com/in/johndoe</p>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h4 className="text-[10px] font-black text-slate-900 tracking-wider mb-1 uppercase border-b border-slate-900 pb-0.5">Executive Summary</h4>
                <p className="text-[11px] text-slate-800 leading-relaxed font-normal">
                  Cybersecurity Operations Analyst with 5+ years specializing in cloud threat hunting and enterprise SIEM triage. Engineered automated <strong className="font-bold text-slate-950 bg-amber-100/70 px-1 rounded">Incident Response</strong> playbooks reducing mean response time by <strong className="font-bold text-slate-950 bg-amber-100/70 px-1 rounded">54%</strong>.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-4 flex-1 space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-900 tracking-wider mb-1 uppercase border-b border-slate-900 pb-0.5">Professional Experience</h4>
                
                <div>
                  <div className="flex justify-between items-baseline mb-0.5 text-[11px]">
                    <span className="font-extrabold text-slate-950">Senior Security Analyst</span>
                    <span className="text-slate-500 font-bold">2023 – Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10.5px] text-slate-800 leading-snug space-y-1.5">
                    <li>
                      Tuned 45+ enterprise <strong className="font-bold text-slate-950 bg-amber-100/70 px-1 rounded">Splunk ES</strong> correlation queries, driving a <strong className="font-bold text-slate-950 bg-amber-100/70 px-1 rounded">38% reduction in false positives</strong> across 250k daily events.
                    </li>
                    <li>
                      Orchestrated zero-trust security controls mapped to <strong className="font-bold text-slate-950 bg-amber-100/70 px-1 rounded">NIST 800-53</strong>, remediating 24 critical audit vulnerabilities.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-black text-slate-900 tracking-wider mb-1 uppercase border-b border-slate-900 pb-0.5">Core Competencies</h4>
                <p className="text-[10.5px] text-slate-800 font-medium">
                  Splunk ES • CrowdStrike Falcon • Microsoft Sentinel • KQL • Zero Trust • NIST 800-53 • Python
                </p>
              </div>
            </div>

            {/* Praise Bottom Line */}
            <div className="flex gap-2.5 text-xs text-emerald-950 font-semibold items-start bg-emerald-50/90 border border-emerald-200/90 p-3.5 rounded-2xl">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
              <p>Same authentic career history. Exactly 2-line bullets with measured percentage results, bolded employer keywords, zero typos, and 100% Workday parser compatibility.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
