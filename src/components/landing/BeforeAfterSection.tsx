"use client";
import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Sliders,
  Eye,
  FileText,
  Check,
  Zap,
  ChevronRight,
  MoveHorizontal,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface CandidateProfile {
  id: string;
  roleName: string;
  targetCompany: string;
  badge: string;
  before: {
    score: number;
    status: string;
    headline: string;
    name: string;
    contact: string;
    summaryTitle: string;
    summaryText: string;
    summaryFlaw: string;
    expRole: string;
    expDate: string;
    expBullets: Array<{ text: string; flaw: string }>;
    skillsTitle: string;
    skillsText: string;
    skillsFlaw: string;
    critique: string;
  };
  after: {
    score: number;
    status: string;
    headline: string;
    name: string;
    contact: string;
    summaryTitle: string;
    summaryText: React.ReactNode;
    summaryGain: string;
    expRole: string;
    expDate: string;
    expBullets: Array<{ text: React.ReactNode; gain: string }>;
    skillsTitle: string;
    skillsText: string;
    skillsGain: string;
    praise: string;
  };
  metrics: {
    atsScore: { before: number; after: number; delta: string };
    parsingRate: { before: string; after: string; note: string };
    recruiterScan: { before: string; after: string; note: string };
    keywordsMatched: { before: string; after: string; note: string };
  };
}

const CANDIDATE_PROFILES: CandidateProfile[] = [
  {
    id: 'cybersecurity',
    roleName: 'Cybersecurity Analyst',
    targetCompany: 'AWS Cloud Security',
    badge: '🛡️ Cyber & Cloud Ops',
    before: {
      score: 58,
      status: 'Screening Rejected (Taleo ATS)',
      headline: 'Generic One-Size Resume',
      name: 'John D****',
      contact: 'Dallas, TX • john.xxxx@gmail.com',
      summaryTitle: 'Objective',
      summaryText: 'Motivated and hardworking professional looking for a challenging cybersecurity role in a fast-paced environment where I can grow.',
      summaryFlaw: 'Vague self-focused objective without security tools or achievements',
      expRole: 'Security Analyst',
      expDate: '2023 - Present',
      expBullets: [
        {
          text: 'Responsible for monitoring security alerts and escalating incidents to senior engineers.',
          flaw: 'Passive verb ("Responsible for"), 0 metrics, zero tooling specified'
        },
        {
          text: 'Assisted team with audits, patch management, and general daily IT duties.',
          flaw: 'Task checklist mentality that fails automated keyword filters'
        }
      ],
      skillsTitle: 'Skills',
      skillsText: 'JavaScript, HTML, CSS, Microsoft Word, Teamwork, Hard Working, Communication',
      skillsFlaw: 'Irrelevant web tags that dilute cybersecurity ranking score',
      critique: 'Passive wording, zero quantified metrics, missing Splunk / Falcon keywords, and generic filler phrases that trigger instant automated rejection.'
    },
    after: {
      score: 96,
      status: 'Shortlisted for Interview',
      headline: 'Tailored with Soltkiz AI',
      name: 'John Doe',
      contact: 'Dallas, TX • john.doe@email.com • linkedin.com/in/johndoe',
      summaryTitle: 'Executive Summary',
      summaryText: (
        <>
          Cybersecurity Operations Analyst with 5+ years specializing in cloud threat hunting and enterprise SIEM triage. Engineered automated <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">Incident Response</strong> playbooks reducing mean response time by <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">54%</strong>.
        </>
      ),
      summaryGain: 'Targeted title + 54% measured outcome + SIEM keyword',
      expRole: 'Senior Security Analyst',
      expDate: '2023 - Present',
      expBullets: [
        {
          text: (
            <>
              Tuned 45+ enterprise <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">Splunk ES</strong> correlation queries, driving a <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">38% reduction in false positives</strong> across 250k daily events.
            </>
          ),
          gain: 'Strict 2-line cadence with high-impact action verb and 38% metric'
        },
        {
          text: (
            <>
              Orchestrated zero-trust security controls mapped to <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">NIST 800-53</strong>, remediating 24 critical audit vulnerabilities in <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">AWS IAM</strong>.
            </>
          ),
          gain: '100% alignment with target job description compliance standards'
        }
      ],
      skillsTitle: 'Core Competencies',
      skillsText: 'Splunk ES • CrowdStrike Falcon • Microsoft Sentinel • KQL • Zero Trust • NIST 800-53 • AWS IAM • Python',
      skillsGain: 'Workday-indexed competency cluster matching 8/8 hard requirements',
      praise: 'Same authentic career history. Exactly 2-line bullets with measured percentage results, bolded employer keywords, zero typos, and 100% Workday parser compatibility.'
    },
    metrics: {
      atsScore: { before: 58, after: 96, delta: '+38 pts' },
      parsingRate: { before: '42% Failed', after: '100% Parsed', note: 'Workday AST' },
      recruiterScan: { before: '1.8s Dropped', after: '34s Review', note: 'Immediate Callback' },
      keywordsMatched: { before: '4 / 28 (14%)', after: '27 / 28 (96%)', note: 'Target Job Description' }
    }
  },
  {
    id: 'fullstack',
    roleName: 'Full-Stack Software Engineer',
    targetCompany: 'Stripe Fintech Core',
    badge: '💻 Cloud & Distributed Systems',
    before: {
      score: 61,
      status: 'Screening Rejected (Greenhouse ATS)',
      headline: 'Generic Software Dev Resume',
      name: 'Sarah C****',
      contact: 'San Francisco, CA • sarah.dev@gmail.com',
      summaryTitle: 'Professional Objective',
      summaryText: 'Passionate developer with hands-on experience in modern web technologies looking to contribute to a growing software engineering team.',
      summaryFlaw: 'Generic boilerplate statement without technical stack or scale metrics',
      expRole: 'Full Stack Developer',
      expDate: '2022 - Present',
      expBullets: [
        {
          text: 'Worked on frontend user interfaces using React and fixed backend bugs across the web application.',
          flaw: 'Weak verb ("Worked on"), vague scope, no latency or traffic stats'
        },
        {
          text: 'Helped maintain PostgreSQL database queries and assisted with deployment tasks.',
          flaw: 'Junior phrasing ("Helped maintain") that hides real engineering ownership'
        }
      ],
      skillsTitle: 'Technical Skills',
      skillsText: 'HTML5, CSS3, JavaScript, React, Git, Problem Solving, Quick Learner',
      skillsFlaw: 'Basic student-level tags missing TypeScript, Kafka, Docker, and Microservices',
      critique: 'Weak action verbs, missing distributed systems terminology, zero system scale metrics, and unoptimized layout that fails greenhouse ranking.'
    },
    after: {
      score: 98,
      status: 'Shortlisted for System Design',
      headline: 'Tailored with Soltkiz AI',
      name: 'Sarah Chen',
      contact: 'San Francisco, CA • sarah.chen@tech.io • github.com/sarahchen',
      summaryTitle: 'Executive Summary',
      summaryText: (
        <>
          Senior Full-Stack Engineer with 6+ years architecting event-driven microservices and fintech payment rails. Scaled ledger processing throughput by <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">3.2x</strong> while sustaining <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">99.99% uptime</strong> for 1.4M MAUs.
        </>
      ),
      summaryGain: 'Architectural scope + 3.2x throughput multiplier + 99.99% uptime proof',
      expRole: 'Senior Full Stack Engineer',
      expDate: '2022 - Present',
      expBullets: [
        {
          text: (
            <>
              Architected distributed transaction retry pipeline using <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">Node.js, Kafka, and PostgreSQL</strong>, slashing checkout drop-offs by <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">28%</strong>.
            </>
          ),
          gain: 'High-leverage engineering verb with exact distributed architecture stack'
        },
        {
          text: (
            <>
              Refactored customer billing frontend to <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">Next.js App Router</strong>, reducing First Contentful Paint by <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">420ms</strong> across global traffic.
            </>
          ),
          gain: 'Quantified frontend performance milestone matching Stripe expectations'
        }
      ],
      skillsTitle: 'Architecture & Tooling',
      skillsText: 'TypeScript • React 19 • Next.js • Node.js • Apache Kafka • PostgreSQL • Redis • Docker • CI/CD • AWS',
      skillsGain: 'Targeted tech stack matching 100% of Stripe senior job posting requirements',
      praise: 'Zero exaggerated claims. Exact 2-line recruiter format with quantified latency savings, clean technical terminology, and perfect ATS rank.'
    },
    metrics: {
      atsScore: { before: 61, after: 98, delta: '+37 pts' },
      parsingRate: { before: '38% Warning', after: '100% Clean', note: 'Greenhouse AST' },
      recruiterScan: { before: '2.1s Skipped', after: '41s Review', note: 'Interview Shortlist' },
      keywordsMatched: { before: '5 / 30 (16%)', after: '29 / 30 (97%)', note: 'FinTech Posting' }
    }
  },
  {
    id: 'product',
    roleName: 'Technical Product Lead',
    targetCompany: 'Enterprise AI SaaS',
    badge: '📊 Product & AI Systems',
    before: {
      score: 54,
      status: 'Archived Without Review',
      headline: 'Generic Product Manager Resume',
      name: 'Marcus R****',
      contact: 'Austin, TX • marcus.pm@email.com',
      summaryTitle: 'Summary',
      summaryText: 'Passionate and detail-oriented product manager with experience leading agile teams and delivering software projects on schedule.',
      summaryFlaw: 'Cliché phrases ("passionate", "detail-oriented") without revenue or product KPIs',
      expRole: 'Product Manager',
      expDate: '2021 - Present',
      expBullets: [
        {
          text: 'Managed sprint planning meetings, wrote user stories, and collaborated closely with software engineers.',
          flaw: 'Standard day-to-day admin tasks that any junior PM performs'
        },
        {
          text: 'Collected client feedback and communicated feature requests to senior company leadership.',
          flaw: 'Zero customer discovery metrics, no retention or conversion impact'
        }
      ],
      skillsTitle: 'Competencies',
      skillsText: 'Jira, Agile, Scrum, Product Roadmaps, Communication, Leadership, Wireframes',
      skillsFlaw: 'Generic soft skills and basic tools with zero product analytics depth',
      critique: 'Lacks business KPI metrics, enterprise ARR numbers, customer retention metrics, and competitive differentiation.'
    },
    after: {
      score: 95,
      status: 'Shortlisted for VP Interview',
      headline: 'Tailored with Soltkiz AI',
      name: 'Marcus Rivera',
      contact: 'Austin, TX • marcus.rivera@pro.com • linkedin.com/in/mrivera-pm',
      summaryTitle: 'Executive Summary',
      summaryText: (
        <>
          Technical Product Lead with 7+ years driving B2B SaaS analytics and AI workflow tooling. Spearheaded enterprise product line from <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">$0 to $4.8M ARR</strong> in 14 months with <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">124% net revenue retention</strong>.
        </>
      ),
      summaryGain: 'Elite executive hook with verified $4.8M ARR growth and retention metrics',
      expRole: 'Lead Product Manager',
      expDate: '2021 - Present',
      expBullets: [
        {
          text: (
            <>
              Spearheaded LLM workflow copilot roadmap across 4 cross-functional squads, increasing weekly active usage by <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">64%</strong> within <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">90 days of launch</strong>.
            </>
          ),
          gain: 'Clear leadership scope with verified adoption metrics and execution speed'
        },
        {
          text: (
            <>
              Revamped customer onboarding taxonomy based on <strong className="font-bold text-slate-950 bg-amber-100/90 dark:bg-amber-900/40 px-1 rounded">Mixpanel funnel telemetry</strong>, lifting 30-day enterprise user retention from <strong className="font-bold text-slate-950 bg-emerald-100/90 dark:bg-emerald-900/40 px-1 rounded">41% to 76%</strong>.
            </>
          ),
          gain: 'Rigorous analytical decision-making tied directly to business bottom line'
        }
      ],
      skillsTitle: 'Strategic Domain Expertise',
      skillsText: 'Enterprise SaaS • LLM Prompting • Mixpanel • SQL Analytics • Roadmap Prioritization • OKRs • GTM Strategy',
      skillsGain: 'High-signal product capabilities that trigger automated executive tier ranking',
      praise: 'Transforms routine task descriptions into quantifiable business and revenue impact that hiring executives immediately notice.'
    },
    metrics: {
      atsScore: { before: 54, after: 95, delta: '+41 pts' },
      parsingRate: { before: '51% Dropped', after: '100% Parsed', note: 'Taleo Enterprise' },
      recruiterScan: { before: '1.5s Ignored', after: '48s Review', note: 'VP Interview Call' },
      keywordsMatched: { before: '3 / 26 (11%)', after: '25 / 26 (96%)', note: 'Executive JD' }
    }
  }
];

export function BeforeAfterSection() {
  const [selectedRole, setSelectedRole] = useState<string>('cybersecurity');
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide' | 'bullets'>('slider');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const activeProfile = CANDIDATE_PROFILES.find((p) => p.id === selectedRole) || CANDIDATE_PROFILES[0];

  // Mouse & touch drag calculation for interactive split slider
  const handleMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-white via-slate-50/70 to-white border-t border-slate-200/80 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-500/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/8 blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            The Soltkiz Difference Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-950 mb-3.5 leading-[1.15] tracking-tight">
            The same candidate. The same career history.<br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Two completely different career outcomes.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            We don't invent fake experience. Soltkiz extracts your authentic achievements and translates them into the exact vocabulary, 2-line cadence, and measurable metrics that pass Workday and impress recruiters.
          </p>
        </div>

        {/* Master Control Deck: Role Picker + View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          
          {/* Candidate Role Selector */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-2 shrink-0">
              Role:
            </span>
            {CANDIDATE_PROFILES.map((profile) => {
              const isActive = selectedRole === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedRole(profile.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  <span>{profile.badge.split(' ')[0]}</span>
                  <span>{profile.roleName}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl w-full md:w-auto justify-center">
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MoveHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Split Slider</span>
            </button>
            <button
              onClick={() => setViewMode('sideBySide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'sideBySide'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('bullets')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'bullets'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Bullet Inspector</span>
            </button>
          </div>
        </div>

        {/* Live Transformation Telemetry HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
          
          {/* Metric 1: ATS Score */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs hover:border-slate-300 transition-all">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>ATS Match Score</span>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                {activeProfile.metrics.atsScore.delta}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-rose-600 line-through opacity-75">
                {activeProfile.metrics.atsScore.before}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xl sm:text-2xl font-black text-emerald-600">
                {activeProfile.metrics.atsScore.after}/100
              </span>
            </div>
            <div className="text-[10.5px] text-slate-600 mt-0.5 truncate">
              {activeProfile.targetCompany}
            </div>
          </div>

          {/* Metric 2: Parsing Reliability */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs hover:border-slate-300 transition-all">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Workday AST Parse</span>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                100% Pass
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-rose-600">
                {activeProfile.metrics.parsingRate.before}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-base sm:text-lg font-black text-slate-900">
                {activeProfile.metrics.parsingRate.after}
              </span>
            </div>
            <div className="text-[10.5px] text-slate-600 mt-0.5 truncate">
              {activeProfile.metrics.parsingRate.note}
            </div>
          </div>

          {/* Metric 3: Recruiter Scan */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs hover:border-slate-300 transition-all">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Recruiter 6-Sec Scan</span>
              <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                High Focus
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-rose-600">
                {activeProfile.metrics.recruiterScan.before}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-base sm:text-lg font-black text-slate-900">
                {activeProfile.metrics.recruiterScan.after}
              </span>
            </div>
            <div className="text-[10.5px] text-slate-600 mt-0.5 truncate">
              {activeProfile.metrics.recruiterScan.note}
            </div>
          </div>

          {/* Metric 4: Keyword Coverage */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs hover:border-slate-300 transition-all">
            <div className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Target Keywords</span>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                Top 2%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-rose-600">
                {activeProfile.metrics.keywordsMatched.before}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-base sm:text-lg font-black text-slate-900">
                {activeProfile.metrics.keywordsMatched.after}
              </span>
            </div>
            <div className="text-[10.5px] text-slate-600 mt-0.5 truncate">
              {activeProfile.metrics.keywordsMatched.note}
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* VIEW MODE 1: INTERACTIVE SPLIT SLIDER (CORE UNIQUE MODEL) */}
        {/* ======================================================== */}
        {viewMode === 'slider' && (
          <div className="flex flex-col items-center">
            
            {/* Quick Preset Buttons for Slider */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setSliderPosition(10)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  sliderPosition <= 20
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Show 100% Generic (58 Score)
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  sliderPosition > 35 && sliderPosition < 65
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                50 / 50 Comparison
              </button>
              <button
                onClick={() => setSliderPosition(90)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  sliderPosition >= 80
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Show 100% Soltkiz AI (96+ Score)
              </button>
            </div>

            {/* Interactive Slider Stage */}
            <div
              ref={sliderContainerRef}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleMove(e.clientX)}
              className="relative w-full rounded-3xl overflow-hidden border-2 border-slate-300/80 shadow-xl bg-white select-none cursor-ew-resize min-h-[580px] sm:min-h-[520px]"
            >
              
              {/* LAYER 1: AFTER RESUME (SOLTKIZ AI - 96+) (FULL WIDTH BASE) */}
              <div className="w-full h-full p-5 sm:p-7 bg-white flex flex-col justify-between">
                
                {/* Soltkiz AI Header */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-2xl text-white shadow-md shadow-emerald-600/20">
                        {activeProfile.after.score}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-950 text-sm">{activeProfile.after.headline}</h4>
                          <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Shortlisted
                          </span>
                        </div>
                        <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span>{activeProfile.after.status}</span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Workday & Taleo Validated</span>
                    </div>
                  </div>

                  {/* Candidate Resume Sheet Preview */}
                  <div className="bg-slate-50/50 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
                    <div className="mb-3.5">
                      <h3 className="text-base font-black text-slate-950">{activeProfile.after.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{activeProfile.after.contact}</p>
                    </div>

                    {/* Summary */}
                    <div className="mb-3.5">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-0.5 mb-1">
                        <h4 className="text-[10.5px] font-black text-slate-900 tracking-wider uppercase">
                          {activeProfile.after.summaryTitle}
                        </h4>
                        <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                          ATS Hook
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-800 leading-relaxed">
                        {activeProfile.after.summaryText}
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="mb-3.5">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-0.5 mb-1.5">
                        <h4 className="text-[10.5px] font-black text-slate-900 tracking-wider uppercase">
                          Professional Experience
                        </h4>
                        <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                          Strict 2-Line Cadence
                        </span>
                      </div>
                      <div className="mb-1 text-[11px] flex justify-between font-bold text-slate-950">
                        <span>{activeProfile.after.expRole}</span>
                        <span className="text-slate-500 font-normal">{activeProfile.after.expDate}</span>
                      </div>
                      <ul className="list-disc pl-4 text-[11px] text-slate-800 leading-snug space-y-2">
                        {activeProfile.after.expBullets.map((bullet, idx) => (
                          <li key={idx}>{bullet.text}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-0.5 mb-1">
                        <h4 className="text-[10.5px] font-black text-slate-900 tracking-wider uppercase">
                          {activeProfile.after.skillsTitle}
                        </h4>
                        <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                          100% Workday Matched
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                        {activeProfile.after.skillsText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Praise bottom note */}
                <div className="mt-3 flex gap-2 text-xs text-emerald-950 font-semibold items-center bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />
                  <p className="text-[11px] leading-tight">{activeProfile.after.praise}</p>
                </div>
              </div>

              {/* LAYER 2: BEFORE RESUME (GENERIC - 58) (OVERLAY CLIPPED TO SLIDER POSITION) */}
              <div
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                className="absolute inset-0 w-full h-full p-5 sm:p-7 bg-slate-100 flex flex-col justify-between border-r border-rose-300 pointer-events-none"
              >
                <div>
                  {/* Before Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center font-black text-2xl text-rose-600 shadow-2xs">
                        {activeProfile.before.score}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-800 text-sm">{activeProfile.before.headline}</h4>
                          <span className="text-[10px] font-black text-rose-700 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full">
                            Screening Rejected
                          </span>
                        </div>
                        <p className="text-xs text-rose-600 font-bold">
                          {activeProfile.before.status}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/90 border border-rose-200 px-3 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Filtered by Bot Algorithm</span>
                    </div>
                  </div>

                  {/* Candidate Resume Sheet Preview (Dull & Rejected) */}
                  <div className="bg-white/80 border border-dashed border-rose-300 rounded-2xl p-4 sm:p-5 shadow-2xs opacity-90">
                    <div className="mb-3.5">
                      <h3 className="text-base font-black text-slate-700">{activeProfile.before.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{activeProfile.before.contact}</p>
                    </div>

                    {/* Summary */}
                    <div className="mb-3.5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-0.5 mb-1">
                        <h4 className="text-[10.5px] font-black text-slate-500 tracking-wider uppercase">
                          {activeProfile.before.summaryTitle}
                        </h4>
                        <span className="text-[9.5px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                          Flag: Vague Objective
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed bg-rose-50/80 p-1 rounded border border-rose-100">
                        {activeProfile.before.summaryText}
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="mb-3.5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-0.5 mb-1.5">
                        <h4 className="text-[10.5px] font-black text-slate-500 tracking-wider uppercase">
                          Experience
                        </h4>
                        <span className="text-[9.5px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                          Missing Keywords
                        </span>
                      </div>
                      <div className="mb-1 text-[11px] flex justify-between font-bold text-slate-700">
                        <span>{activeProfile.before.expRole}</span>
                        <span className="text-slate-400 font-normal">{activeProfile.before.expDate}</span>
                      </div>
                      <ul className="list-disc pl-4 text-[11px] text-slate-600 leading-snug space-y-2">
                        {activeProfile.before.expBullets.map((bullet, idx) => (
                          <li key={idx} className="bg-rose-50/80 p-1 rounded border border-rose-100">
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-0.5 mb-1">
                        <h4 className="text-[10.5px] font-black text-slate-500 tracking-wider uppercase">
                          {activeProfile.before.skillsTitle}
                        </h4>
                        <span className="text-[9.5px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                          Unranked
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed bg-rose-50/80 p-1 rounded border border-rose-100">
                        {activeProfile.before.skillsText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Critique bottom note */}
                <div className="mt-3 flex gap-2 text-xs text-rose-900 font-semibold items-center bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <p className="text-[11px] leading-tight">{activeProfile.before.critique}</p>
                </div>
              </div>

              {/* SLIDER VERTICAL SCRUBBER LINE & HANDLE */}
              <div
                style={{ left: `${sliderPosition}%` }}
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 via-indigo-600 to-emerald-500 -translate-x-1/2 shadow-lg pointer-events-none"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 text-white border-2 border-white shadow-xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

            </div>

            {/* Slider Drag Hint */}
            <p className="text-xs text-slate-600 mt-2.5 flex items-center gap-1.5 font-medium">
              <MoveHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span>Drag the slider left or right to reveal the full transformation</span>
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 2: SIDE-BY-SIDE DIFF (DETAILED COMPARISON)      */}
        {/* ======================================================== */}
        {viewMode === 'sideBySide' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* BEFORE COLUMN (Generic Resume - Rejected) */}
            <div className="flex flex-col bg-white border border-rose-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center font-black text-2xl text-rose-600 shadow-2xs">
                    {activeProfile.before.score}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">{activeProfile.before.headline}</h4>
                    <p className="text-xs text-rose-600 font-bold">{activeProfile.before.status}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  Screening Rejected
                </span>
              </div>

              {/* Resume Preview */}
              <div className="flex-1 bg-slate-50/70 border border-dashed border-rose-200/90 rounded-2xl p-5 mb-4 flex flex-col font-sans">
                <div className="mb-4">
                  <h3 className="text-base font-black text-slate-700">{activeProfile.before.name}</h3>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">{activeProfile.before.contact}</p>
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[10px] font-black text-slate-500 tracking-wider uppercase border-b border-slate-200 pb-0.5">
                      {activeProfile.before.summaryTitle}
                    </h4>
                    <span className="text-[9.5px] text-rose-600 font-bold">Self-Centered</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-rose-100/70 text-rose-950 p-2 rounded-lg border border-rose-200">
                    {activeProfile.before.summaryText}
                  </p>
                  <p className="text-[10px] text-rose-700 font-semibold mt-1">
                    {activeProfile.before.summaryFlaw}
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-4 flex-1 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-[10px] font-black text-slate-500 tracking-wider uppercase border-b border-slate-200 pb-0.5">
                      Experience
                    </h4>
                    <span className="text-[9.5px] text-rose-600 font-bold">Unranked Bullets</span>
                  </div>
                  <div className="text-[11px] flex justify-between font-bold text-slate-700">
                    <span>{activeProfile.before.expRole}</span>
                    <span className="text-slate-400 font-normal">{activeProfile.before.expDate}</span>
                  </div>
                  <ul className="space-y-2">
                    {activeProfile.before.expBullets.map((bullet, idx) => (
                      <li key={idx} className="bg-rose-100/70 text-rose-950 p-2 rounded-lg border border-rose-200 text-[10.5px] leading-relaxed">
                        <p>{bullet.text}</p>
                        <p className="text-[9.5px] text-rose-700 font-bold mt-1">Issue: {bullet.flaw}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[10px] font-black text-slate-500 tracking-wider uppercase border-b border-slate-200 pb-0.5">
                      {activeProfile.before.skillsTitle}
                    </h4>
                    <span className="text-[9.5px] text-rose-600 font-bold">Diluted Match</span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 bg-rose-100/70 text-rose-950 p-2 rounded-lg border border-rose-200">
                    {activeProfile.before.skillsText}
                  </p>
                  <p className="text-[10px] text-rose-700 font-semibold mt-1">
                    {activeProfile.before.skillsFlaw}
                  </p>
                </div>
              </div>

              {/* Bottom Critique */}
              <div className="flex gap-2.5 text-xs text-rose-900 font-semibold items-start bg-rose-50 border border-rose-200 p-3 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p>{activeProfile.before.critique}</p>
              </div>
            </div>

            {/* AFTER COLUMN (Tailored with Soltkiz AI - Shortlisted) */}
            <div className="flex flex-col bg-white border-2 border-emerald-500/80 rounded-3xl p-6 shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:border-emerald-500 transition-all relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-2xl text-white shadow-md shadow-emerald-600/20">
                    {activeProfile.after.score}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-950 text-sm">{activeProfile.after.headline}</h4>
                    <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>{activeProfile.after.status}</span>
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Shortlisted for Interview
                </span>
              </div>

              {/* Resume Preview */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 mb-4 flex flex-col font-sans shadow-xs">
                <div className="mb-4">
                  <h3 className="text-base font-black text-slate-950">{activeProfile.after.name}</h3>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">{activeProfile.after.contact}</p>
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[10px] font-black text-slate-900 tracking-wider uppercase border-b border-slate-900 pb-0.5">
                      {activeProfile.after.summaryTitle}
                    </h4>
                    <span className="text-[9.5px] text-emerald-700 font-bold">Recruiter Approved</span>
                  </div>
                  <p className="text-[11px] text-slate-800 leading-relaxed bg-emerald-50/50 p-2 rounded-lg border border-emerald-200">
                    {activeProfile.after.summaryText}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    Gain: {activeProfile.after.summaryGain}
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-4 flex-1 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-[10px] font-black text-slate-900 tracking-wider uppercase border-b border-slate-900 pb-0.5">
                      Professional Experience
                    </h4>
                    <span className="text-[9.5px] text-emerald-700 font-bold">Strict 2-Line Bullets</span>
                  </div>
                  <div className="text-[11px] flex justify-between font-bold text-slate-950">
                    <span>{activeProfile.after.expRole}</span>
                    <span className="text-slate-500 font-normal">{activeProfile.after.expDate}</span>
                  </div>
                  <ul className="space-y-2">
                    {activeProfile.after.expBullets.map((bullet, idx) => (
                      <li key={idx} className="bg-emerald-50/50 text-slate-900 p-2 rounded-lg border border-emerald-200 text-[10.5px] leading-relaxed">
                        <p>{bullet.text}</p>
                        <p className="text-[9.5px] text-emerald-700 font-bold mt-1">Gain: {bullet.gain}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[10px] font-black text-slate-900 tracking-wider uppercase border-b border-slate-900 pb-0.5">
                      {activeProfile.after.skillsTitle}
                    </h4>
                    <span className="text-[9.5px] text-emerald-700 font-bold">Indexed Keywords</span>
                  </div>
                  <p className="text-[10.5px] text-slate-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-200 font-medium">
                    {activeProfile.after.skillsText}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    Gain: {activeProfile.after.skillsGain}
                  </p>
                </div>
              </div>

              {/* Bottom Praise */}
              <div className="flex gap-2.5 text-xs text-emerald-950 font-semibold items-start bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
                <p>{activeProfile.after.praise}</p>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 3: BULLET-BY-BULLET INSPECTOR                   */}
        {/* ======================================================== */}
        {viewMode === 'bullets' && (
          <div className="space-y-4">
            
            {/* Card 1: Summary Transformation */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center">
                    01
                  </span>
                  <h4 className="text-sm font-black text-slate-900">
                    Executive Summary / Objective Transformation
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Action Hook Injected
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Raw Generic Bullet (Rejected)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{activeProfile.before.summaryText}"
                  </p>
                  <p className="text-[10.5px] text-rose-700 font-semibold mt-2">
                    {activeProfile.before.summaryFlaw}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Soltkiz AI Rewrite (Shortlisted)</span>
                  </div>
                  <p className="text-xs text-slate-900 leading-relaxed font-medium">
                    "{activeProfile.after.summaryText}"
                  </p>
                  <p className="text-[10.5px] text-emerald-700 font-bold mt-2">
                    {activeProfile.after.summaryGain}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Experience Bullet 1 */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center">
                    02
                  </span>
                  <h4 className="text-sm font-black text-slate-900">
                    Primary Achievement Bullet (Strict 2-Line Rule)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Quantified Impact Added
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Raw Generic Bullet (Rejected)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{activeProfile.before.expBullets[0].text}"
                  </p>
                  <p className="text-[10.5px] text-rose-700 font-semibold mt-2">
                    {activeProfile.before.expBullets[0].flaw}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Soltkiz AI Rewrite (Shortlisted)</span>
                  </div>
                  <p className="text-xs text-slate-900 leading-relaxed font-medium">
                    "{activeProfile.after.expBullets[0].text}"
                  </p>
                  <p className="text-[10.5px] text-emerald-700 font-bold mt-2">
                    {activeProfile.after.expBullets[0].gain}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Skills Indexing */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center">
                    03
                  </span>
                  <h4 className="text-sm font-black text-slate-900">
                    Technical Core Competencies Alignment
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Workday Indexed
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Raw Generic Skills (Rejected)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{activeProfile.before.skillsText}"
                  </p>
                  <p className="text-[10.5px] text-rose-700 font-semibold mt-2">
                    {activeProfile.before.skillsFlaw}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Soltkiz AI Rewrite (Shortlisted)</span>
                  </div>
                  <p className="text-xs text-slate-900 leading-relaxed font-medium">
                    "{activeProfile.after.skillsText}"
                  </p>
                  <p className="text-[10.5px] text-emerald-700 font-bold mt-2">
                    {activeProfile.after.skillsGain}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA Conversion Strip */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-slate-800">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Ready to see your own resume difference?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your resume or paste a job posting to get your free ATS score and bullet rewrite.
              </p>
            </div>
          </div>
          <Link
            href="/signup"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Scan My Resume Free</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}