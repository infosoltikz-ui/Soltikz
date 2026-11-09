"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  UserCheck, 
  FileText, 
  Cpu, 
  Layers, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  Building2,
  Briefcase,
  ChevronRight,
  Share2
} from 'lucide-react'

const STEPS = [
  {
    id: 1,
    tabLabel: '1. Master Profile',
    title: 'Enter Your Career History Once',
    badge: 'Step 1: Your Career Database',
    subtitle: 'No more retyping your employment, skills, and education every time you apply.',
    description: 'Add your past jobs, achievements, technical tools, and degrees once (or import from LinkedIn). Soltkiz securely stores your Master Record as the single source of truth.',
    icon: UserCheck
  },
  {
    id: 2,
    tabLabel: '2. Paste Job & Select Type',
    title: 'Paste Any JD & Choose Resume Type',
    badge: 'Step 2: Role Targeting',
    subtitle: 'Switch between Corporate Full-Time (1-page) and Contract / C2C (2-page skills matrix).',
    description: 'Paste the target job description. Select Full-Time for corporate hiring or C2C / Contract for vendor staffing submissions. The engine automatically adapts the layout and summary formula.',
    icon: FileText
  },
  {
    id: 3,
    tabLabel: '3. AI Tailoring & ATS Scan',
    title: 'Instant Keyword Matching & Score Report',
    badge: 'Step 3: 90%+ ATS Guarantee',
    subtitle: 'See exactly what words matched, which are missing, and auto-rewrite weak bullets.',
    description: 'Our AI compares your profile against the employer requirements across keywords, seniority fit, and quantified outcomes. Missing keywords are surfaced with a one-click approved rewrite.',
    icon: Cpu
  },
  {
    id: 4,
    tabLabel: '4. Workspace Studio',
    title: 'Auto-Generated Cover Letter & Interview Prep',
    badge: 'Step 4: All-in-One Studio',
    subtitle: 'Get a role-specific Cover Letter and STAR behavioral answers from the same posting.',
    description: 'Inside your workspace, Soltkiz instantly creates a matching Cover Letter plus custom technical and HR interview questions (with complete STAR situation, task, action, result answers).',
    icon: MessageSquare
  },
  {
    id: 5,
    tabLabel: '5. 1-Click Export',
    title: 'Export Recruiter-Clean PDF or Word .DOCX',
    badge: 'Step 5: Recruiter Ready',
    subtitle: 'Guaranteed 0% parsing rejection on Workday, Taleo, Greenhouse, and Lever.',
    description: 'Download in pixel-perfect PDF with embedded searchable text or editable Word DOCX. You can also generate a verified private or public web link for recruiters.',
    icon: Download
  }
]

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1)
  const [isAutoCycling, setIsAutoCycling] = useState(true)

  useEffect(() => {
    if (!isAutoCycling) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= STEPS.length ? 1 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoCycling])

  const currentStep = STEPS[activeStep - 1]

  return (
    <section className="py-24 bg-[#0F2744] text-white relative overflow-hidden" id="how-it-works">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Complete End-to-End Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-tight mb-4">
            How Soltkiz Works <span className="text-amber-400">Inside the Platform</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Understand the complete process before you sign up. From entering your career record to landing the interview in 5 simple, automated steps.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {STEPS.map((step) => {
            const Icon = step.icon
            const isActive = activeStep === step.id
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(step.id)
                  setIsAutoCycling(false)
                }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-400 text-[#0F2744] border-amber-400 shadow-lg shadow-amber-400/20 scale-102'
                    : 'bg-[#163252]/80 text-slate-300 border-[#23456F] hover:bg-[#1D3E66] hover:text-white'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                  isActive ? 'bg-[#0F2744] text-amber-400' : 'bg-[#0F2744]/60 text-slate-300'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{step.tabLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive Step Showcase Screen */}
        <div className="bg-[#163252] border border-[#23456F] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Step Details & Explanation */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-4">
                  {currentStep.badge}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                  {currentStep.title}
                </h3>
                
                <p className="text-amber-200 text-sm font-semibold mb-4 leading-relaxed">
                  {currentStep.subtitle}
                </p>

                <p className="text-slate-300 text-[14px] leading-relaxed mb-6 font-normal">
                  {currentStep.description}
                </p>
              </div>

              {/* Step Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-[#23456F]">
                {activeStep === 1 && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>One-click LinkedIn import or manual entry</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Centralized storage: experience, degrees, projects &amp; certifications</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Never re-type your background again</span>
                    </div>
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Paste full text from LinkedIn, Indeed, or company portal</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Full-Time Mode: Tight 1-page executive summary</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>C2C Contract Mode: 2-page detailed technical matrix</span>
                    </div>
                  </>
                )}

                {activeStep === 3 && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Extracts hard requirements, tools, and seniority level</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Shows score breakdown: Keywords, Titles, Results with numbers</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Surfaces missing terms with 1-click rewrite approval</span>
                    </div>
                  </>
                )}

                {activeStep === 4 && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Matching Cover Letter created from same JD &amp; background</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>5 Technical questions with recommended answers</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>STAR behavioral scenarios (Situation, Task, Action, Result)</span>
                    </div>
                  </>
                )}

                {activeStep === 5 && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Pixel-perfect PDF with clean searchable typography</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Editable Word DOCX for staffing agencies</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Public sharing link with one-click revoke</span>
                    </div>
                  </>
                )}
              </div>

              {/* CTA link */}
              <div className="mt-8">
                <Link 
                  href="/register"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-black text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-400/20"
                >
                  Try This Workflow Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: High-Fidelity UI Screen Replica */}
            <div className="lg:col-span-7 bg-[#0F2744] border border-[#23456F] rounded-2xl p-5 sm:p-6 shadow-inner relative overflow-hidden">
              
              {/* Window Header Dots */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#23456F]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">soltkiz.app/dashboard/{activeStep === 1 ? 'profile' : activeStep === 2 ? 'create' : activeStep === 3 ? 'ats-report' : activeStep === 4 ? 'workspace' : 'export'}</span>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-[#163252] px-2.5 py-0.5 rounded-full border border-[#23456F]">
                  Live UI View
                </span>
              </div>

              {/* DYNAMIC SCREEN CONTENT */}
              <div className="min-h-[360px] flex flex-col justify-center">
                
                {/* SCREEN 1: Master Profile Replica */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-400 text-[#0F2744] font-black flex items-center justify-center text-base">
                          JS
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">John Smith, Senior Security Analyst</div>
                          <div className="text-xs text-slate-300">john.smith@example.com • Dallas, TX</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                        ✓ Master Record Active
                      </span>
                    </div>

                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F]">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">Verified Experience Timeline</div>
                      <div className="space-y-2">
                        <div className="bg-[#1D3E66] p-2.5 rounded-lg text-xs text-slate-200 flex justify-between">
                          <span>Senior Information Security Analyst — Public Sector</span>
                          <span className="text-slate-400">2026 - Present</span>
                        </div>
                        <div className="bg-[#1D3E66] p-2.5 rounded-lg text-xs text-slate-200 flex justify-between">
                          <span>Cyber Security Operations Analyst — Global E-Commerce</span>
                          <span className="text-slate-400">2023 - 2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#163252] p-3 rounded-xl border border-[#23456F]">
                      <div className="text-[11px] font-bold text-slate-300 mb-2">Core Skills Repository (28 skills recorded)</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Splunk ES', 'Microsoft Sentinel', 'KQL', 'CrowdStrike', 'NIST 800-53', 'SOAR Playbooks', 'Threat Hunting'].map(s => (
                          <span key={s} className="px-2 py-0.5 bg-[#1D3E66] border border-[#2C5588] rounded text-[10.5px] text-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 2: Target Job & Type Selector */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#1D3E66] border-2 border-amber-400 p-3.5 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">Full-Time Mode</span>
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        </div>
                        <p className="text-[11px] text-slate-300 leading-tight">Tight 1-page format with single connected narrative summary.</p>
                      </div>

                      <div className="bg-[#163252] border border-[#23456F] p-3.5 rounded-xl opacity-75">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">Contract / C2C Mode</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">2-page detailed technical matrix with 8-10 summary bullet points.</p>
                      </div>
                    </div>

                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F] space-y-3">
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 mb-1">Target Company &amp; Role</div>
                        <div className="bg-[#1D3E66] px-3 py-2 rounded-lg text-xs text-white font-semibold">
                          Amazon Web Services — Senior Detection Engineer
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold text-slate-400 mb-1">Pasted Job Description Text</div>
                        <div className="bg-[#1D3E66] p-3 rounded-lg text-xs text-slate-300 leading-relaxed font-mono">
                          "Looking for a Security Engineer with hands-on SIEM correlation searches, Falcon EDR, and KQL detection rules..."
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 3: AI Tailoring & ATS Report */}
                {activeStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-4 border-amber-400 flex items-center justify-center font-black text-xl text-white">
                          94
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Excellent ATS Match</div>
                          <div className="text-xs text-emerald-400 font-semibold">▲ Up from 68 on generic resume</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full">
                        Clears Automated Screening
                      </span>
                    </div>

                    {/* Missing Keywords Box with Fix Button */}
                    <div className="bg-[#163252] p-4 rounded-xl border-l-4 border-l-amber-400 border border-[#23456F]">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-bold text-white">2 Priority Terms Missing from your Profile</div>
                        <span className="text-[11px] text-amber-300 font-semibold">Auto-detected</span>
                      </div>
                      
                      <div className="flex gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded text-xs font-mono">
                          Microsoft Sentinel
                        </span>
                        <span className="px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded text-xs font-mono">
                          KQL Queries
                        </span>
                      </div>

                      <button className="bg-amber-400 hover:bg-amber-300 text-[#0F2744] text-xs font-black px-3.5 py-1.5 rounded-lg transition-colors">
                        Add &amp; Rewrite Bullet Points Automatically
                      </button>
                    </div>
                  </div>
                )}

                {/* SCREEN 4: Workspace Studio */}
                {activeStep === 4 && (
                  <div className="space-y-3.5 animate-in fade-in duration-300">
                    {/* Workspace mini-tabs */}
                    <div className="flex gap-2 border-b border-[#23456F] pb-2">
                      <span className="text-xs font-bold px-3 py-1 bg-amber-400 text-[#0F2744] rounded-lg">Cover Letter</span>
                      <span className="text-xs font-bold px-3 py-1 bg-[#163252] text-slate-300 rounded-lg">Tech Q&amp;A</span>
                      <span className="text-xs font-bold px-3 py-1 bg-[#163252] text-slate-300 rounded-lg">STAR Stories</span>
                    </div>

                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F] space-y-2">
                      <div className="text-xs font-bold text-amber-300">Matching Cover Letter (Tailored to Amazon Web Services)</div>
                      <p className="text-[12px] text-slate-300 leading-relaxed font-sans">
                        "Dear Hiring Team, I am writing to express my enthusiastic interest in the Senior Detection Engineer position. With 5+ years optimizing SIEM detections and reducing alert volume by 38%..."
                      </p>
                    </div>

                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F]">
                      <div className="text-xs font-bold text-emerald-400 mb-1">Generated Behavioral STAR Answer</div>
                      <div className="text-[11px] text-slate-200">
                        <strong className="text-amber-300">Situation:</strong> Faced a high-severity alert surge during system migration.<br />
                        <strong className="text-amber-300">Action:</strong> Authored automated SOAR playbooks in CrowdStrike.<br />
                        <strong className="text-amber-300">Result:</strong> Cut response time from 45 mins to 9 mins.
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 5: Export & Apply */}
                {activeStep === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="bg-[#163252] p-4 rounded-xl border border-[#23456F] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">John_Smith_AWS_Senior_Security_Analyst.pdf</div>
                        <div className="text-xs text-slate-400">PDF • 100% Vector Text • ATS Single Column Standard</div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-lg">
                        Ready to Send
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#1D3E66] border border-[#2C5588] p-4 rounded-xl text-center flex flex-col items-center justify-center">
                        <Download className="w-5 h-5 text-amber-400 mb-2" />
                        <span className="text-xs font-bold text-white">Download PDF</span>
                        <span className="text-[10px] text-slate-400">For direct job portals</span>
                      </div>

                      <div className="bg-[#1D3E66] border border-[#2C5588] p-4 rounded-xl text-center flex flex-col items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-400 mb-2" />
                        <span className="text-xs font-bold text-white">Download DOCX</span>
                        <span className="text-[10px] text-slate-400">For staffing recruiters</span>
                      </div>

                      <div className="bg-[#1D3E66] border border-[#2C5588] p-4 rounded-xl text-center flex flex-col items-center justify-center">
                        <Share2 className="w-5 h-5 text-emerald-400 mb-2" />
                        <span className="text-xs font-bold text-white">Public Link</span>
                        <span className="text-[10px] text-slate-400">Share with hiring manager</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* 3 Value Pillars Below Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#163252]/60 border border-[#23456F] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Master Profile Guarantee</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Your career history is saved once. You can tailor 50 different versions for 50 different jobs without re-entering dates or job titles.
            </p>
          </div>

          <div className="bg-[#163252]/60 border border-[#23456F] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">0% Formatting Rejection</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Tested against Workday, Taleo, Greenhouse, and Lever. No columns that scramble data, no tables that crash parsers.
            </p>
          </div>

          <div className="bg-[#163252]/60 border border-[#23456F] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Beyond Just Resumes</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              A resume only gets you in the door. We give you the Cover Letter and the exact behavioral STAR answers to pass the interview.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
