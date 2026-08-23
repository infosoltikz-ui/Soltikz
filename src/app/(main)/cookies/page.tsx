import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Cookie, ShieldCheck, CheckCircle2, Settings, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy - Soltkiz IT AI Resume Builder',
  description: 'Learn how Soltkiz IT AI Resume Builder uses cookies and local storage.',
};

export default function CookiePolicy() {
  const lastUpdated = "February 23, 2025";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center md:text-left relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
            <Cookie className="w-4 h-4" /> Cookies &amp; Storage
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Understand what cookies we use and how they help us provide a seamless resume building experience.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
            <span>Last Updated: <strong className="text-slate-700">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Entity: <strong className="text-slate-700">Soltkiz IT Services</strong></span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-10 text-slate-700 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-slate-900">What Are Cookies?</h2>
            </div>
            <p>
              Cookies are small text files stored on your computer, tablet, or mobile device when you visit a website. They enable the website to recognize your browser, remember your active login state, save resume drafts, and provide a secure, personalized user experience.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-slate-900">Types of Cookies We Use</h2>
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Lock className="w-4 h-4 text-primary" /> 1. Strictly Necessary &amp; Authentication Cookies
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies are vital for the core operation of <strong>Resume Builder One</strong>. They maintain your secure authentication session (powered by Supabase and Google OAuth), secure CSRF protection, and keep your work saved while you navigate between pages.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Settings className="w-4 h-4 text-primary" /> 2. Functional &amp; Preference Cookies
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies remember your interface preferences, such as selected theme (Dark/Light mode), active resume template choices, and font size selections.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-primary" /> 3. Payment &amp; Security Verification
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Razorpay uses cookies to prevent fraud, verify checkout security tokens, and handle two-factor authentication seamlessly during payment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-slate-900">Managing Your Cookie Preferences</h2>
            </div>
            <p className="text-sm">
              You can control and disable cookies through your browser settings. However, please note that blocking strictly necessary authentication cookies will prevent you from logging into your account or saving your resumes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-slate-900">Questions?</h2>
            </div>
            <p className="text-sm">
              If you have any questions regarding our use of cookies or data privacy, please contact us at <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
