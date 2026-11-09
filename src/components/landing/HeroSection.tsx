"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Rocket,
  CheckCircle2,
  Zap,
  Target,
  Briefcase,
  Star,
  Layers,
  ArrowRight,
  Check,
  Download,
  Flame,
  SlidersHorizontal,
  RefreshCw,
  Eye,
  CheckCheck,
} from "lucide-react";

// ── ROLE PROFILES FOR INTERACTIVE LIVING DEMO ─────────────────────────
type RoleKey = "fullstack" | "ai" | "product";

interface RoleProfile {
  name: string;
  role: string;
  location: string;
  targetCompany: string;
  atsScore: number;
  workdayPass: string;
  keywordsMatched: number;
  avatar: string;
  skills: string[];
  summary: string;
  experience: {
    title: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  };
}

const ROLES: Record<RoleKey, RoleProfile> = {
  fullstack: {
    name: "Jonathan Davis",
    role: "Senior Full-Stack Engineer",
    location: "Bengaluru, India • Remote",
    targetCompany: "Google / Stripe Calibrated",
    atsScore: 98,
    workdayPass: "Workday & Taleo Passed",
    keywordsMatched: 24,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
    skills: ["React 19", "Next.js", "Node.js", "PostgreSQL", "Kafka", "AWS EKS", "Docker"],
    summary:
      "Full-stack engineer with 6+ years architecting high-concurrency cloud systems, reducing API latencies, and delivering high-impact SaaS features.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "CloudScale Technologies",
        period: "2022 – Present",
        bullets: [
          "Architected real-time event pipeline using Next.js & Kafka, cutting p95 query latency by 42% across 1.4M daily active users.",
          "Automated Docker & Kubernetes deployment pipelines on AWS, maintaining 99.99% uptime and saving $140,000 in cloud compute.",
        ],
      },
      {
        title: "Software Engineer",
        company: "Apex Systems",
        period: "2020 – 2022",
        bullets: [
          "Built customer-facing React & TypeScript micro-frontends with 100% test coverage, accelerating release cycles from bi-weekly to daily.",
        ],
      },
    ],
    education: {
      degree: "B.Tech in Computer Science",
      school: "Indian Institute of Information Technology",
      year: "2016 – 2020",
    },
  },
  ai: {
    name: "Priya Sharma",
    role: "Lead AI & ML Systems Engineer",
    location: "Hyderabad, India • Remote",
    targetCompany: "Anthropic / OpenAI Calibrated",
    atsScore: 99,
    workdayPass: "Greenhouse & Lever Passed",
    keywordsMatched: 28,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face",
    skills: ["PyTorch", "LLM Fine-Tuning", "LangChain", "Vector DBs", "RAG Pipelines", "FastAPI"],
    summary:
      "Machine learning engineer specializing in enterprise RAG systems, domain LLM fine-tuning, and scalable low-latency model inference.",
    experience: [
      {
        title: "Staff Machine Learning Engineer",
        company: "CognitiveAI Labs",
        period: "2022 – Present",
        bullets: [
          "Fine-tuned domain LLMs with LoRA & vLLM, elevating token accuracy from 78% to 94.6% and slashing token inference costs by 36%.",
          "Engineered low-latency RAG pipeline serving 600+ req/sec using Pinecone vector embeddings with sub-45ms retrieval.",
        ],
      },
      {
        title: "AI Research Engineer",
        company: "DeepData Corp",
        period: "2020 – 2022",
        bullets: [
          "Trained distributed Transformer models on multi-GPU clusters, publishing 2 patent applications on semantic search algorithms.",
        ],
      },
    ],
    education: {
      degree: "M.Tech in Artificial Intelligence",
      school: "National Institute of Technology",
      year: "2018 – 2020",
    },
  },
  product: {
    name: "Marcus Sterling",
    role: "Principal Product Manager",
    location: "London, UK • Hybrid",
    targetCompany: "Fintech Unicorn Calibrated",
    atsScore: 97,
    workdayPass: "Taleo & iCIMS Passed",
    keywordsMatched: 22,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face",
    skills: ["PLG Strategy", "Cohort Analytics", "A/B Testing", "SQL / BigQuery", "Roadmapping"],
    summary:
      "Product leader with 7+ years driving PLG growth loops, monetizing developer platforms, and translating user friction into enterprise ARR.",
    experience: [
      {
        title: "Principal Product Manager",
        company: "PayFlow International",
        period: "2022 – Present",
        bullets: [
          "Spearheaded enterprise self-serve onboarding, driving a 34% surge in Day-30 user activation and unlocking $3.8M incremental ARR.",
          "Directed cross-functional team of 22 engineers and designers, launching AI Workflow Builder adopted by 88% of enterprise accounts.",
        ],
      },
      {
        title: "Senior Growth Product Manager",
        company: "VentureScale",
        period: "2019 – 2022",
        bullets: [
          "Executed 45+ iterative A/B experiment cycles on checkout funnel, raising organic trial-to-paid conversion by 27.4%.",
        ],
      },
    ],
    education: {
      degree: "B.Sc in Economics & Computing",
      school: "London School of Economics",
      year: "2015 – 2019",
    },
  },
};

export function HeroSection() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>("fullstack");
  const [resumeMode, setResumeMode] = useState<"fulltime" | "c2c">("fulltime");
  const [isScanning, setIsScanning] = useState(true);
  const [scanPulse, setScanPulse] = useState(0);

  const current = ROLES[selectedRole];

  // Auto-trigger periodic pulse for laser scanning effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPulse((p) => p + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FBFBF9] dark:bg-[#0B132B] pt-6 sm:pt-8 pb-8 lg:pt-10 lg:pb-10 transition-colors duration-300">
      {/* ── BACKGROUND AMBIENT GRADIENTS & GRID PATTERN ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.45] dark:opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Top Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-tr from-blue-500/12 via-indigo-500/10 to-amber-500/12 blur-[120px] rounded-full" />
        <div className="absolute top-1/4 -right-24 w-[480px] h-[480px] bg-emerald-500/8 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 -left-20 w-[420px] h-[420px] bg-amber-500/8 blur-[110px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* HERO GRID: LEFT VALUE PROP + RIGHT LIVING ATS SHOWCASE       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-8 sm:mb-10">
          {/* ───────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN: CONVERSION COPY & ACTION (COL-span-7)        */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* 1. Real-time Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs mb-5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0F2744] dark:text-amber-400" />
                AI ATS 2.0 Engine • Calibrated for 2026 Recruiter Filters
              </span>
            </div>

            {/* 2. Magnetic Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-950 dark:text-white leading-[1.10] tracking-tight mb-5">
              Build an ATS-Flawless Resume.{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="bg-gradient-to-r from-[#0F2744] via-indigo-700 to-amber-600 dark:from-sky-400 dark:via-indigo-300 dark:to-amber-300 bg-clip-text text-transparent">
                  Get 3.4x More
                </span>
                <span className="relative inline-block ml-2 text-amber-600 dark:text-amber-400">
                  Interviews.
                  {/* Fluid Hand-drawn Underline */}
                  <svg
                    viewBox="0 0 280 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2.5 left-0 w-full h-3 text-amber-500"
                  >
                    <path
                      d="M3 8 C50 3, 110 11, 170 5 C210 2, 250 8, 277 4"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* 3. High-Converting Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-7 font-normal">
              Stop getting filtered out by Workday, Taleo, and Greenhouse. Soltkiz extracts employer
              vocabulary, structures <strong className="text-slate-900 dark:text-white font-semibold">strict 2-line bullets</strong> with bolded keywords, and exports recruiter-ready <strong className="text-slate-900 dark:text-white font-semibold">Word (.docx) &amp; Vector PDF</strong> formats in seconds.
            </p>

            {/* 4. Value Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-7">
              {[
                {
                  icon: <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
                  title: "98% ATS Pass",
                  sub: "Workday & Taleo",
                  bg: "bg-emerald-500/10 border-emerald-500/20",
                },
                {
                  icon: <Zap className="w-4 h-4 text-[#0F2744] dark:text-sky-400" />,
                  title: "Strict 2-Line",
                  sub: "Recruiter Standard",
                  bg: "bg-blue-500/10 border-blue-500/20",
                },
                {
                  icon: <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Full-Time & C2C",
                  sub: "Contractor Matrix",
                  bg: "bg-indigo-500/10 border-indigo-500/20",
                },
                {
                  icon: <Download className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
                  title: "Word & PDF",
                  sub: "1-Click Direct Save",
                  bg: "bg-amber-500/10 border-amber-500/20",
                },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all duration-200"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${pill.bg}`}
                  >
                    {pill.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 dark:text-slate-100 truncate">
                      {pill.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
                      {pill.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 5. Primary & Secondary CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link href="/register" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-white bg-[#0F2744] hover:bg-[#16365C] dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <Rocket className="w-4 h-4 text-amber-400 dark:text-slate-950 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Build My Recruiter-Ready Resume Free</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-900 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>

              <Link href="/#templates" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>Preview 20+ Templates</span>
                </button>
              </Link>
            </div>

            {/* 6. Risk Reversal Checkmarks */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                Instant PDF &amp; DOCX exports
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                Guaranteed 95%+ ATS pass rate
              </span>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: INTERACTIVE LIVING ATS RESUME PREVIEW (COL-5) */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            {/* Top Interactive Controls Bar */}
            <div className="w-full max-w-lg mb-3 flex items-center justify-between gap-2 px-1">
              {/* Role Switcher Pill Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700 shadow-2xs">
                {(
                  [
                    { key: "fullstack", label: "Full-Stack" },
                    { key: "ai", label: "AI Engineer" },
                    { key: "product", label: "Product Lead" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedRole(tab.key)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                      selectedRole === tab.key
                        ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Format Toggle: Full-Time vs C2C */}
              <button
                type="button"
                onClick={() => setResumeMode((m) => (m === "fulltime" ? "c2c" : "fulltime"))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-500/50 transition-all cursor-pointer shadow-2xs"
                title="Toggle between Full-Time (1-page) and C2C/Contractor (Skills Matrix) format"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                <span>{resumeMode === "fulltime" ? "Full-Time (1-Pg)" : "C2C Matrix"}</span>
              </button>
            </div>

            {/* ── MAIN RESUME CARD CONTAINER ── */}
            <div className="relative w-full max-w-lg group">
              {/* Background 3D Perspective Stack Backdrops */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-amber-500/15 rounded-3xl blur-md -z-10 transform rotate-1 scale-[0.98]" />
              <div className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 rounded-2xl transform -rotate-1 scale-[0.99] border border-slate-300/40 dark:border-slate-800 -z-10" />

              {/* Main Card Shell */}
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_50px_rgba(15,39,68,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* ── CARD TOP BAR (SIMULATING ATS REAL-TIME SCANNER) ── */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200/80 dark:border-slate-800 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-black text-slate-800 dark:text-slate-200">
                      Soltkiz ATS Engine
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                      • {current.targetCompany}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsScanning((s) => !s)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        isScanning
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-200 text-slate-600 border border-slate-300"
                      }`}
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${isScanning ? "animate-spin text-emerald-600" : ""}`}
                      />
                      <span>{isScanning ? "Scanner Active" : "Paused"}</span>
                    </button>
                  </div>
                </div>

                {/* ── LASER SCANNING BEAM (ACTIVE EFFECT) ── */}
                {isScanning && (
                  <div
                    key={scanPulse}
                    className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_16px_#10b981] z-30 animate-laser"
                  />
                )}

                {/* ── RESUME PAPER CONTENT ── */}
                <div className="p-5 sm:p-6 text-slate-800 dark:text-slate-200 select-none">
                  {/* Resume Header */}
                  <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                      />
                      <div>
                        <div className="text-base font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-1.5">
                          {current.name}
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        </div>
                        <div className="text-xs font-bold text-blue-600 dark:text-sky-400">
                          {current.role}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {current.location}
                        </div>
                      </div>
                    </div>

                    {/* Mode Tag */}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                      {resumeMode === "fulltime" ? "1-Page Standard" : "C2C Matrix"}
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-1.5">
                      <Briefcase className="w-3 h-3 text-[#0F2744] dark:text-sky-400" />
                      Professional Summary
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {current.summary}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[10.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-amber-500" />
                        ATS-Optimized Core Competencies
                      </span>
                      <span className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-bold lowercase">
                        +{current.keywordsMatched} keywords matched
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {current.skills.map((skill, idx) => (
                        <span
                          key={skill}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                            idx < 3
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience - Showing Strict 2-Line Bullets */}
                  <div>
                    <div className="flex items-center justify-between text-[10.5px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3 h-3 text-rose-500" />
                        Work Experience (Strict 2-Line Bullets)
                      </span>
                      <span className="text-[9.5px] font-bold text-blue-600 dark:text-sky-400">
                        Recruiter 6-Sec Scan Approved
                      </span>
                    </div>

                    <div className="space-y-3">
                      {current.experience.slice(0, 1).map((exp, i) => (
                        <div key={i} className="text-[11px]">
                          <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-xs mb-1">
                            <span>
                              {exp.title} • <span className="text-slate-500">{exp.company}</span>
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">
                              {exp.period}
                            </span>
                          </div>
                          <ul className="space-y-1.5 pl-3 border-l-2 border-emerald-500/40">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-snug"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── CARD FOOTER: EXPORT & FORMAT CHIPS ── */}
                <div className="px-5 py-3 bg-slate-50/90 dark:bg-slate-800/90 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCheck className="w-3.5 h-3.5" />
                      100% ATS Compatible
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-slate-500 font-medium">Export: .DOCX &amp; .PDF</span>
                  </div>

                  <Link href="/register">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#0F2744] dark:text-amber-400 hover:underline cursor-pointer">
                      Use This Template →
                    </span>
                  </Link>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════ */}
              {/* FLOATING OVERLAY MICRO-BADGES (RESPONSIVE & DYNAMIC)    */}
              {/* ════════════════════════════════════════════════════════ */}

              {/* 1. TOP-RIGHT FLOATING BADGE: LIVE ATS SCORE DIAL */}
              <div className="absolute -top-4 -right-2 sm:-right-6 z-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-xl p-3 text-center w-28 sm:w-32 animate-float-slow backdrop-blur-md">
                <div className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  ATS Score
                </div>

                {/* Gauge with number */}
                <div className="relative w-14 h-14 mx-auto my-1.5 flex items-center justify-center">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray={`${current.atsScore}, 100`}
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-slate-950 dark:text-white">
                    {current.atsScore}%
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-700 dark:text-emerald-300">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                  {current.workdayPass}
                </div>
              </div>

              {/* 2. BOTTOM-LEFT FLOATING BADGE: RECRUITER METRIC */}
              <div className="absolute -bottom-4 -left-2 sm:-left-6 z-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-xl p-3 flex items-center gap-3 animate-float-reverse backdrop-blur-md max-w-[210px]">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-slate-900 dark:text-white leading-tight">
                    3.4x Interview Rate
                  </div>
                  <div className="text-[9.5px] text-slate-500 font-semibold leading-tight">
                    Based on 50k+ placements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* BOTTOM SOCIAL PROOF: RATINGS & PRESTIGIOUS COMPANY LOGOS    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-5 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Rating Summary */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="flex gap-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-black text-slate-950 dark:text-white text-sm">4.9 / 5.0</span>
              <span className="text-slate-500 dark:text-slate-400 ml-1.5">
                Verified by <strong className="text-slate-900 dark:text-white font-bold">50,000+</strong> candidates worldwide
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-8 bg-slate-200 dark:bg-slate-800" />

          {/* Logos Marquee / Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Candidates Placed At:
            </span>

            {/* Google */}
            <span className="font-black text-sm tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>

            {/* Amazon */}
            <span className="font-black text-sm text-slate-900 dark:text-white tracking-tight">
              amazon
            </span>

            {/* Microsoft */}
            <div className="flex items-center gap-1.5">
              <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                <span className="bg-[#F25022] rounded-xs" />
                <span className="bg-[#7FBA00] rounded-xs" />
                <span className="bg-[#00A4EF] rounded-xs" />
                <span className="bg-[#FFB900] rounded-xs" />
              </div>
              <span className="font-bold text-xs text-slate-900 dark:text-white">Microsoft</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold text-xs">
              <span className="text-[#0668E1] text-sm font-black">∞</span>
              <span>Meta</span>
            </div>

            {/* Deloitte */}
            <span className="font-black text-xs text-slate-900 dark:text-white">
              Deloitte<span className="text-[#86BC25]">.</span>
            </span>

            {/* Goldman Sachs */}
            <span className="font-black text-[11px] text-[#1a3a6e] dark:text-sky-300 tracking-wider uppercase">
              Goldman Sachs
            </span>

            {/* Salesforce */}
            <span className="font-bold text-xs text-[#00A1E0] flex items-center gap-1">
              <span>☁</span> salesforce
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
