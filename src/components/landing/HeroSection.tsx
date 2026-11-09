"use client";
import React from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Rocket,
  LayoutGrid,
  Check,
  Zap,
  Target,
  FileText,
  Briefcase,
  Bot,
  GraduationCap,
  Award,
  CheckCircle2,
  Star,
  User,
  Layers,
} from 'lucide-react'

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #f0f4ff 0%, #eef2ff 25%, #f5f0ff 60%, #fff0f7 100%)',
        paddingTop: '48px',
        paddingBottom: '48px',
      }}
    >
      {/* Soft blob glows behind content */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '5%',
          right: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(147,112,219,0.13) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(100,149,237,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* MAIN GRID: LEFT CONTENT + RIGHT RESUME VISUAL              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center mb-10">

          {/* ───────────────────────────────────────────────────────── */}
          {/* LEFT COLUMN                                               */}
          {/* ───────────────────────────────────────────────────────── */}
          <div className="text-left">

            {/* Purple Pill Badge */}
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                background: 'rgba(139,92,246,0.10)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: '999px',
                padding: '6px 14px',
              }}
            >
              <Sparkles style={{ width: 14, height: 14, color: '#7c3aed' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6d28d9', letterSpacing: '0.01em' }}>
                Next-Gen AI Resume &amp; ATS Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.13,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
              }}
            >
              Build an ATS-Friendly<br />
              Resume.{' '}
              <span
                style={{
                  color: '#f97316',
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                Get Hired Faster.
                {/* Orange underline squiggle */}
                <svg
                  viewBox="0 0 280 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    left: 0,
                    width: '100%',
                    height: 8,
                  }}
                >
                  <path
                    d="M2 6 C40 2, 80 9, 120 5 C160 1, 200 8, 240 4 C260 2, 270 5, 278 4"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontSize: 15,
                color: '#475569',
                lineHeight: 1.65,
                maxWidth: 480,
                marginBottom: 24,
                fontWeight: 400,
              }}
            >
              Create a professional, ATS-optimized resume in minutes, match it
              with the right jobs, and increase your interview chances with
              AI-powered insights.
            </p>

            {/* 4 Feature Icon Blocks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                marginBottom: 28,
                maxWidth: 480,
              }}
            >
              {[
                { icon: <Zap style={{ width: 18, height: 18 }} />, label: 'Create Resume', sub: 'in Minutes' },
                { icon: <Target style={{ width: 18, height: 18 }} />, label: 'ATS Score', sub: '& Feedback' },
                { icon: <FileText style={{ width: 18, height: 18 }} />, label: 'Cover Letter', sub: 'Generator' },
                { icon: <Briefcase style={{ width: 18, height: 18 }} />, label: 'Job Match', sub: '& Suggestions' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'rgba(109,40,217,0.07)',
                      border: '1px solid rgba(109,40,217,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6d28d9',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ lineHeight: 1.2 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#1e293b' }}>{item.label}</div>
                    <div style={{ fontSize: 10, fontWeight: 500, color: '#64748b' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <Link href="/register">
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '13px 26px',
                    borderRadius: 12,
                    background: '#0f172a',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    boxShadow: '0 4px 16px rgba(15,23,42,0.22)',
                    transition: 'background 0.18s, transform 0.14s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e293b' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0f172a' }}
                >
                  <Rocket style={{ width: 16, height: 16, color: '#a78bfa' }} />
                  Create My Free Resume Now →
                </button>
              </Link>

              <Link href="/#templates">
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '13px 22px',
                    borderRadius: 12,
                    background: '#fff',
                    color: '#1e293b',
                    fontWeight: 700,
                    fontSize: 14,
                    border: '1.5px solid #e2e8f0',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'border-color 0.18s, background 0.18s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#94a3b8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0' }}
                >
                  <LayoutGrid style={{ width: 16, height: 16, color: '#475569' }} />
                  Browse Templates
                </button>
              </Link>
            </div>

            {/* Trust Checks */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['No credit card needed', '20+ Free templates', 'Download PDF & DOCX'].map((text) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#475569' }}>
                  <Check style={{ width: 14, height: 14, color: '#22c55e' }} strokeWidth={3} />
                  {text}
                </span>
              ))}
            </div>

          </div>

          {/* ───────────────────────────────────────────────────────── */}
          {/* RIGHT COLUMN: 3D Layered Resume Visual                   */}
          {/* ───────────────────────────────────────────────────────── */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 40,
              paddingBottom: 40,
              paddingLeft: 60,
              paddingRight: 60,
            }}
          >
            {/* ── Ghost layers for 3-D depth ── */}
            <div
              style={{
                position: 'absolute',
                inset: 40,
                background: 'rgba(255,255,255,0.65)',
                borderRadius: 24,
                border: '1px solid rgba(203,213,225,0.5)',
                boxShadow: '0 8px 30px rgba(15,39,68,0.08)',
                transform: 'rotate(3deg) scale(0.97) translate(6px,6px)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 40,
                background: 'rgba(255,255,255,0.35)',
                borderRadius: 24,
                border: '1px solid rgba(167,139,250,0.3)',
                boxShadow: '0 4px 20px rgba(15,39,68,0.05)',
                transform: 'rotate(-2deg) scale(0.94) translate(-4px,10px)',
                zIndex: 0,
              }}
            />

            {/* ── Main Resume Card ── */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #e2e8f0',
                boxShadow: '0 20px 60px -10px rgba(15,39,68,0.14)',
                padding: '20px 22px',
                width: '100%',
                maxWidth: 400,
              }}
            >
              {/* Resume Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  paddingBottom: 14,
                  marginBottom: 14,
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    flexShrink: 0,
                    background: '#f1f5f9',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                    alt="Jonathan Davis"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                    JONATHAN DAVIS
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', marginTop: 2 }}>
                    Full Stack Developer
                  </div>
                  <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 3, lineHeight: 1.4 }}>
                    jonathan@email.com &nbsp;•&nbsp; +91 98765 43210 &nbsp;•&nbsp; Bengaluru, India
                  </div>
                </div>
              </div>

              {/* Resume Body: 2 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '0 14px' }}>

                {/* Left col */}
                <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: 10, display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* Skills */}
                  <div>
                    <SectionHeader icon={<Zap style={{ width: 10, height: 10, color: '#2563eb' }} />} label="Skills" />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 5 }}>
                      {['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'TypeScript'].map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: 8,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: '#eff6ff',
                            color: '#1d4ed8',
                            border: '1px solid #bfdbfe',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <SectionHeader icon={<GraduationCap style={{ width: 10, height: 10, color: '#2563eb' }} />} label="Education" />
                    <div style={{ marginTop: 4 }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: '#1e293b' }}>B.Tech – CSE</div>
                      <div style={{ fontSize: 8, color: '#64748b', lineHeight: 1.4 }}>ABR Institute of Science &amp; Technology</div>
                      <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 500 }}>2020 – 2024</div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <SectionHeader icon={<Award style={{ width: 10, height: 10, color: '#2563eb' }} />} label="Certifications" />
                    <ul style={{ marginTop: 4, paddingLeft: 12, listStyle: 'disc', fontSize: 8, color: '#475569', lineHeight: 1.6 }}>
                      <li>React Professional</li>
                      <li>AWS Fundamentals</li>
                    </ul>
                  </div>

                </div>

                {/* Right col */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 2 }}>

                  {/* Summary */}
                  <div>
                    <SectionHeader icon={<User style={{ width: 10, height: 10, color: '#2563eb' }} />} label="Professional Summary" />
                    <p style={{ fontSize: 8, color: '#475569', lineHeight: 1.5, marginTop: 4 }}>
                      Full Stack Developer with expertise in React, Node.js, and cloud systems delivering scalable solutions.
                    </p>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <SectionHeader icon={<Briefcase style={{ width: 10, height: 10, color: '#2563eb' }} />} label="Work Experience" />
                    <ul style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {['Built Next.js APIs reducing query latency by 42%.', 'Automated Docker CI/CD pipelines ensuring 99.9% uptime.'].map((txt, i) => (
                        <li key={i} style={{ display: 'flex', gap: 5, fontSize: 8, color: '#475569', lineHeight: 1.4 }}>
                          <span style={{ width: 4, height: 4, background: '#2563eb', borderRadius: '50%', marginTop: 3, flexShrink: 0 }} />
                          <span>{txt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Projects */}
                  <div>
                    <SectionHeader icon={<Layers style={{ width: 10, height: 10, color: '#2563eb' }} />} label="Projects" />
                    <ul style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {['Enterprise SaaS Platform with real-time analytics.', 'AI Resume Engine achieving 94%+ ATS match rates.'].map((txt, i) => (
                        <li key={i} style={{ display: 'flex', gap: 5, fontSize: 8, color: '#475569', lineHeight: 1.4 }}>
                          <span style={{ width: 4, height: 4, background: '#2563eb', borderRadius: '50%', marginTop: 3, flexShrink: 0 }} />
                          <span>{txt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════ */}
            {/* FLOATING BADGES                                        */}
            {/* ══════════════════════════════════════════════════════ */}

            {/* 1. Left floating pill: AI-Powered Resume Builder */}
            <div
              style={{
                position: 'absolute',
                left: -4,
                top: '44%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #e9d5ff',
                  borderRadius: 14,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  boxShadow: '0 6px 24px rgba(109,40,217,0.12)',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: '#f3e8ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot style={{ width: 15, height: 15, color: '#7c3aed' }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>AI-Powered</div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>Resume Builder</div>
                </div>
              </div>
              {/* Curved purple arrow pointing right toward resume */}
              <svg width="40" height="36" viewBox="0 0 40 36" fill="none" style={{ marginLeft: -2 }}>
                <path
                  d="M2 18 C10 18, 22 10, 36 6"
                  stroke="#7c3aed"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="36,2 40,8 33,8" fill="#7c3aed" />
              </svg>
            </div>

            {/* 2. Top-Right floating card: ATS Match Score */}
            <div
              style={{
                position: 'absolute',
                top: 2,
                right: -2,
                zIndex: 10,
                background: '#fff',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 28px rgba(15,39,68,0.12)',
                padding: '12px 14px',
                textAlign: 'center',
                width: 130,
              }}
            >
              {/* Golden sparkles */}
              <div style={{ position: 'absolute', top: -8, right: 8, fontSize: 16, lineHeight: 1 }}>✦</div>
              <div style={{ position: 'absolute', top: 2, right: -4, fontSize: 10, color: '#fbbf24', lineHeight: 1 }}>✦</div>

              <div style={{ fontSize: 10, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>ATS Match Score</div>

              {/* Circle ring */}
              <div style={{ position: 'relative', width: 60, height: 60, margin: '0 auto 8px' }}>
                <svg width="60" height="60" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="94, 100"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 900,
                    color: '#0f172a',
                  }}
                >
                  94%
                </div>
              </div>

              {/* ATS Ready pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 999,
                  padding: '3px 10px',
                  fontSize: 9,
                  fontWeight: 800,
                  color: '#15803d',
                }}
              >
                <Check style={{ width: 10, height: 10, color: '#16a34a' }} strokeWidth={3} />
                ATS Ready
              </div>
            </div>

            {/* 3. Middle-Right floating card: Checklist */}
            <div
              style={{
                position: 'absolute',
                top: '48%',
                right: -6,
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: '#fff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                boxShadow: '0 6px 22px rgba(15,39,68,0.10)',
                padding: '12px 14px',
                width: 148,
              }}
            >
              {[
                'Keyword Match',
                'Format & Structure',
                'ATS Compatibility',
                'Improvement Tips',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7, fontSize: 10, fontWeight: 700, color: '#1e293b' }}>
                  <CheckCircle2
                    style={{ width: 14, height: 14, color: '#22c55e', flexShrink: 0 }}
                  />
                  {item}
                </div>
              ))}
            </div>

            {/* 4. Bottom-Right floating pill: Professional Templates */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 0,
                zIndex: 10,
                background: '#fff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                boxShadow: '0 6px 22px rgba(15,39,68,0.10)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles style={{ width: 14, height: 14, color: '#7c3aed' }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>Professional Templates</div>
                  <div style={{ fontSize: 9, color: '#94a3b8', lineHeight: 1.2 }}>(20+ Designs)</div>
                </div>
              </div>
              {/* Fanned mini cards */}
              <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative', width: 32, height: 36 }}>
                <div style={{ position: 'absolute', left: 0, bottom: 0, width: 20, height: 28, background: '#1e3a5f', borderRadius: 3, border: '1px solid #fff', transform: 'rotate(-8deg)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }} />
                <div style={{ position: 'absolute', left: 6, bottom: 0, width: 20, height: 28, background: '#e2e8f0', borderRadius: 3, border: '1px solid #fff', transform: 'rotate(2deg)', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
                <div style={{ position: 'absolute', left: 12, bottom: 0, width: 20, height: 28, background: '#064e3b', borderRadius: 3, border: '1px solid #fff', transform: 'rotate(10deg)', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }} />
              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* BOTTOM SOCIAL PROOF STRIP                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          style={{
            background: 'rgba(255,255,255,0.90)',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 12px rgba(15,39,68,0.06)',
            padding: '14px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* Stars + rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map((s) => (
                <Star key={s} style={{ width: 16, height: 16, fill: '#f59e0b', color: '#f59e0b' }} />
              ))}
            </div>
            <div>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>4.9 / 5.0</span>
              <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>
                Trusted by <strong style={{ color: '#0f172a' }}>50,000+</strong> job seekers worldwide
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: '#e2e8f0', flexShrink: 0 }} className="hidden lg:block" />

          {/* Logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', whiteSpace: 'nowrap' }}>
              Candidates placed at:
            </span>

            {/* Google */}
            <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </span>

            {/* Amazon */}
            <span style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
              amazon
            </span>

            {/* Microsoft */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, width: 14, height: 14, flexShrink: 0 }}>
                <span style={{ background: '#F25022', borderRadius: 1 }} />
                <span style={{ background: '#7FBA00', borderRadius: 1 }} />
                <span style={{ background: '#00A4EF', borderRadius: 1 }} />
                <span style={{ background: '#FFB900', borderRadius: 1 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>Microsoft</span>
            </div>

            {/* Deloitte */}
            <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>
              Deloitte<span style={{ color: '#86BC25' }}>.</span>
            </span>

            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 16, color: '#0668E1', fontWeight: 900, lineHeight: 1 }}>∞</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>Meta</span>
            </div>

            {/* Salesforce */}
            <span style={{ fontSize: 12, fontWeight: 700, color: '#00A1E0', display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 14 }}>☁</span> salesforce
            </span>

            {/* Goldman Sachs */}
            <span style={{ fontSize: 11, fontWeight: 900, color: '#1a3a6e', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
              Goldman Sachs
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─── small helper ─── */
function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 900, color: '#0f172a' }}>
      {icon}
      <span>{label}</span>
    </div>
  )
}
