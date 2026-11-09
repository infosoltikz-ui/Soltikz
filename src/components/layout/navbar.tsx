"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const MAIN_NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Templates', href: '/#templates', badge: '10+' },
  { label: 'Pricing', href: '/pricing' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════ */}
      {/* FLOATING GLASS CAPSULE NAVBAR                                */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 pt-2 sm:pt-2.5 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto pointer-events-auto transition-all duration-300 rounded-2xl sm:rounded-full border ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-lg shadow-slate-900/5 py-1.5 px-3.5 sm:px-5'
              : 'bg-white/85 backdrop-blur-md border-slate-200/70 shadow-xs py-2 px-4 sm:px-6'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            
            {/* ── Left: Brand Identity (Enlarged Logo) ── */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 group transition-transform duration-150 hover:scale-[1.02]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/LOGO.png"
                  alt="ResumeBuilderOne.com"
                  className="h-11 sm:h-12 md:h-13 w-auto object-contain transition-all"
                />
              </Link>

              {/* High-Tech Operational Status Badge */}
              <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-semibold text-slate-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>ATS AI Active</span>
              </div>
            </div>

            {/* ── Center: Desktop Navigation Dock ── */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1 rounded-full border border-slate-200/60 shadow-2xs">
              {MAIN_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-2xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Auth & CTA Micro-Bar ── */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Log In Button */}
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100/90 transition-all border border-transparent hover:border-slate-200/80 cursor-pointer"
              >
                Log In
              </Link>

              {/* Get Started Free CTA */}
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-black text-white bg-slate-950 hover:bg-slate-900 border border-slate-800 shadow-sm shadow-slate-900/10 hover:shadow-md transition-all group cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-400" />
              </Link>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200/80 transition-colors border border-slate-200 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* MOBILE DRAWER (SLEEK FROSTED GLASS SHEET)                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs pt-20 px-4 pb-6 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-5 flex flex-col gap-3 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Identity in Mobile Sheet */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Navigation
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ATS AI Engine Active
              </span>
            </div>

            {/* Core Links */}
            <div className="flex flex-col gap-1">
              {MAIN_NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-xl text-xs font-black text-white bg-slate-950 hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}