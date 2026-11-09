import React from 'react';
import { AlertTriangle, Check, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-[#FBFBF9] border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
            Real Application Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 mb-4 leading-[1.1] tracking-tight max-w-3xl">
            The same candidate. The same jobs.<br />
            <span className="text-secondary">Two completely different results.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
            We don't invent fake experience. Soltkiz extracts your real achievements and translates them into the employer's specific vocabulary and required metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* BEFORE COLUMN (Generic Resume) */}
          <div className="flex flex-col bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative">
            
            {/* Top Score Bar */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight">74</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Before Optimization</h4>
                  <p className="text-xs text-slate-500 font-medium">Generic single resume sent everywhere</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Screening Rejected
              </span>
            </div>

            {/* Resume Sheet Preview */}
            <div className="flex-1 bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6 mb-6 flex flex-col font-sans">
              <div className="mb-4">
                <h3 className="text-lg font-black text-slate-900">John S****</h3>
                <p className="text-[10.5px] text-slate-400 mt-0.5">Dallas, TX • john.xxxx@gmail.com</p>
              </div>

              {/* Summary */}
              <div className="mb-5">
                <h4 className="text-[10px] font-black text-slate-800 tracking-wider mb-1.5 uppercase border-b border-slate-200 pb-1">Summary</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <span className="bg-rose-100/80 text-rose-950 px-1.5 py-0.5 rounded border border-rose-200">
                    Motivated and detail-oriented professional with a passion for cybersecurity and a proven track record of success in fast-paced environments.
                  </span>
                </p>
              </div>

              {/* Experience */}
              <div className="mb-5 flex-1 space-y-3">
                <h4 className="text-[10px] font-black text-slate-800 tracking-wider mb-1 uppercase border-b border-slate-200 pb-1">Experience</h4>
                
                <div>
                  <div className="flex justify-between items-baseline mb-1 text-[11px]">
                    <span className="font-bold text-slate-900">Information Security Analyst</span>
                    <span className="text-slate-400">2026 – Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10.5px] text-slate-600 leading-relaxed space-y-1">
                    <li><span className="bg-rose-100/80 text-rose-950 px-1.5 py-0.5 rounded border border-rose-200">Responsible for monitoring security alerts and escalating incidents.</span></li>
                    <li><span className="bg-rose-100/80 text-rose-950 px-1.5 py-0.5 rounded border border-rose-200">Assisted with compliance activities and audit preparation.</span></li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1 text-[11px]">
                    <span className="font-bold text-slate-900">Cyber Security Analystr</span>
                    <span className="text-slate-400">2023 - 2026</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10.5px] text-slate-600 leading-relaxed space-y-1">
                    <li><span className="bg-rose-100/80 text-rose-950 px-1.5 py-0.5 rounded border border-rose-200">Worked with various security tools on a daily basis.</span></li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-black text-slate-800 tracking-wider mb-1 uppercase border-b border-slate-200 pb-1">Skills</h4>
                <p className="text-[11px] text-slate-600">
                  <span className="bg-rose-100/80 text-rose-950 px-1.5 py-0.5 rounded border border-rose-200">JavaScript, React.js, Node.js, TypeScript, Figma (irrelevant to security role)</span>
                </p>
              </div>
            </div>

            {/* Critique Bottom Line */}
            <div className="flex gap-2.5 text-xs text-slate-600 font-medium items-start bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>Vague buzzwords instead of outcomes, irrelevant software engineering skills, and an unnoticed spelling typo in the job title.</p>
            </div>
          </div>

          {/* AFTER COLUMN (Tailored with Soltkiz) */}
          <div className="flex flex-col bg-white border-2 border-primary rounded-3xl p-6 sm:p-8 shadow-xl shadow-primary/5 hover:shadow-2xl transition-all relative">
            
            {/* Top Score Bar */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-primary tracking-tight">94</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">After Soltkiz AI Tailoring</h4>
                  <p className="text-xs text-emerald-700 font-bold">▲ Tailored specifically to AWS Security JD</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Cleared All ATS Filters
              </span>
            </div>

            {/* Resume Sheet Preview */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 mb-6 flex flex-col font-sans shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-black text-slate-900">John Smith</h3>
                <p className="text-[10.5px] text-slate-500 mt-0.5">Dallas, TX • john.smith@email.com • linkedin.com/in/johnsmith</p>
              </div>

              {/* Summary */}
              <div className="mb-5">
                <h4 className="text-[10px] font-black text-slate-900 tracking-wider mb-1.5 uppercase border-b border-slate-900 pb-1">Professional Summary</h4>
                <p className="text-[11.5px] text-slate-700 leading-relaxed font-normal">
                  Security operations analyst with five years specializing in cloud detection and financial estates. Runs <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">incident response</span> end-to-end and tunes <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">SIEM</span> correlations analysts trust.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-5 flex-1 space-y-3">
                <h4 className="text-[10px] font-black text-slate-900 tracking-wider mb-1 uppercase border-b border-slate-900 pb-1">Experience</h4>
                
                <div>
                  <div className="flex justify-between items-baseline mb-1 text-[11px]">
                    <span className="font-bold text-slate-900">Information Security Analyst — Public Sector</span>
                    <span className="text-slate-500 font-medium">2026 – Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10.5px] text-slate-700 leading-relaxed space-y-1">
                    <li>Tuned 40+ <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">Splunk ES</span> searches, reducing false positives by 38%.</li>
                    <li>Mapped controls to <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">NIST 800-53</span>, closing 23 of 27 findings before audit.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1 text-[11px]">
                    <span className="font-bold text-slate-900">Cyber Security Operations Analyst — Global E-Commerce</span>
                    <span className="text-slate-500 font-medium">2023 - 2026</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10.5px] text-slate-700 leading-relaxed space-y-1">
                    <li>Investigated ~150 alerts monthly in <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">CrowdStrike Falcon</span>.</li>
                    <li>Built <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">SOAR</span> playbooks cutting phishing response from 45 mins to 9.</li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-black text-slate-900 tracking-wider mb-1 uppercase border-b border-slate-900 pb-1">Technical Skills</h4>
                <p className="text-[11px] text-slate-800 font-medium">
                  Splunk ES • CrowdStrike Falcon • Microsoft Sentinel • KQL • Nessus • NIST 800-53 • Python
                </p>
              </div>
            </div>

            {/* Praise Bottom Line */}
            <div className="flex gap-2.5 text-xs text-emerald-900 font-medium items-start bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
              <p>Same real jobs &amp; dates. Every bullet ends with a measured percentage result, employer vocabulary matches 100%, and errors are eliminated.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
