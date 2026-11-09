"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Headset,
  Globe,
  ArrowRight,
  CheckCheck,
  Sparkles,
} from "lucide-react";

interface FooterLinkItem {
  label: string;
  href: string;
  isNew?: boolean;
  isHot?: boolean;
}

const footerLinks: {
  product: FooterLinkItem[];
  resources: FooterLinkItem[];
  company: FooterLinkItem[];
} = {
  product: [
    { label: "AI Resume Builder", href: "/dashboard/create", isNew: true },
    { label: "ATS Score Checker", href: "/features" },
    { label: "Strict 2-Line Bullets", href: "/#features" },
    { label: "Full-Time Templates", href: "/#templates" },
    { label: "C2C Contractor Matrix", href: "/#templates", isHot: true },
    { label: "Word & PDF Export", href: "/#features" },
    { label: "Pricing Plans", href: "/pricing" },
  ],
  resources: [
    { label: "Resume Templates", href: "/#templates" },
    { label: "Workday & Taleo Guide", href: "/features" },
    { label: "Before & After Results", href: "/#before-after" },
    { label: "Interview STAR Prep", href: "/features" },
    { label: "Cover Letter Generator", href: "/features" },
    { label: "Frequently Asked Questions", href: "/#faq" },
  ],
  company: [
    { label: "About Soltkiz", href: "/about" },
    { label: "Contact Support", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Cookies Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8 sm:pt-14 sm:pb-10 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── TOP SECTION: BRAND & NAVIGATION COLUMNS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-10 border-b border-slate-800/80">
          {/* Brand Column (Span 2 on large screens) */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-6">
            <Link href="/" className="inline-block mb-4 group">
              <div className="bg-white px-3 py-1.5 rounded-xl inline-flex items-center shadow-xs group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] group-hover:scale-[1.02] transition-all duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/LOGO.png"
                  alt="Soltkiz Resume Builder"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-sm mb-5">
              Next-gen AI resume and ATS optimization engine engineered to bypass recruiter filters
              and land 3.4x more interview callbacks.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 mb-6 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-200 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational • 99.9% ATS Parsing Uptime</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  name: "LinkedIn",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                },
                {
                  name: "Twitter / X",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(255,255,255,0.12)] transition-all duration-200 cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              Product
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-xs text-slate-400 hover:text-white transition-colors duration-200 py-1"
                  >
                    {/* Glowing Micro-Dot / Indicator that blooms on hover */}
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-0 -ml-3 mr-2 scale-0 group-hover:opacity-100 group-hover:ml-0 group-hover:scale-100 transition-all duration-200 ease-out shadow-[0_0_8px_#f59e0b] shrink-0" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200 ease-out">
                      {link.label}
                    </span>
                    {link.isNew && (
                      <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 group-hover:border-amber-400/60 transition-colors">
                        New
                      </span>
                    )}
                    {link.isHot && (
                      <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 group-hover:border-emerald-400/60 transition-colors">
                        Hot
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              Resources
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-xs text-slate-400 hover:text-white transition-colors duration-200 py-1"
                  >
                    {/* Glowing Micro-Dot / Indicator that blooms on hover */}
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 opacity-0 -ml-3 mr-2 scale-0 group-hover:opacity-100 group-hover:ml-0 group-hover:scale-100 transition-all duration-200 ease-out shadow-[0_0_8px_#38bdf8] shrink-0" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200 ease-out">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
              Company
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-xs text-slate-400 hover:text-white transition-colors duration-200 py-1"
                  >
                    {/* Glowing Micro-Dot / Indicator that blooms on hover */}
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0 -ml-3 mr-2 scale-0 group-hover:opacity-100 group-hover:ml-0 group-hover:scale-100 transition-all duration-200 ease-out shadow-[0_0_8px_#818cf8] shrink-0" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200 ease-out">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── MIDDLE STRIP: SECURITY & ACCREDITATION (WITH HOVER CARDS) ── */}
        <div className="py-6 border-b border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all duration-200 flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs group-hover:text-white transition-colors">
                256-Bit SSL
              </div>
              <div className="text-[11px] text-slate-500">Bank-Grade Encryption</div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-200 flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 flex items-center justify-center text-blue-400 shrink-0 transition-colors">
              <CheckCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs group-hover:text-white transition-colors">
                ATS Calibrated
              </div>
              <div className="text-[11px] text-slate-500">Workday &amp; Taleo Safe</div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 hover:bg-slate-900/80 transition-all duration-200 flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs group-hover:text-white transition-colors">
                100% Private
              </div>
              <div className="text-[11px] text-slate-500">Zero Data Resale</div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-sky-500/30 hover:bg-slate-900/80 transition-all duration-200 flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-sky-500/50 flex items-center justify-center text-sky-400 shrink-0 transition-colors">
              <Headset className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs group-hover:text-white transition-colors">
                24/7 Support
              </div>
              <div className="text-[11px] text-slate-500">Dedicated Helpdesk</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR: COPYRIGHT & LEGAL DISCLOSURES ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Soltkiz. All rights reserved. Built for ambitious candidates worldwide.
          </div>

          <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-150"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-150"
            >
              Terms
            </Link>
            <span>•</span>
            <Link
              href="/refund"
              className="hover:text-white transition-colors duration-150"
            >
              Refunds
            </Link>
            <span>•</span>
            <Link
              href="/shipping"
              className="hover:text-white transition-colors duration-150"
            >
              Shipping
            </Link>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-400 bg-slate-900 hover:text-white hover:border-slate-700 px-2.5 py-1 rounded-md border border-slate-800 transition-colors cursor-pointer">
              <Globe className="w-3 h-3 text-slate-400" />
              <span>English (US)</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
