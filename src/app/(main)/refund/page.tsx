import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { RotateCcw, CheckCircle2, AlertCircle, Clock, CreditCard, Mail, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy - Soltkiz IT AI Resume Builder',
  description: 'Cancellation and Refund Policy for Soltkiz IT AI Resume Builder subscriptions and digital credits.',
};

export default function RefundPolicy() {
  const lastUpdated = "February 23, 2025";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center md:text-left relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
            <RotateCcw className="w-4 h-4" /> Customer Satisfaction
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            We are committed to delivering exceptional value. Here is our transparent policy regarding cancellations and refunds.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
            <span>Last Updated: <strong className="text-slate-700">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Money-Back Period: <strong className="text-slate-700">7 Days</strong></span>
            <span>•</span>
            <span>Refund Processing via: <strong className="text-slate-700">Razorpay (5-7 Business Days)</strong></span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-10 text-slate-700 leading-relaxed">

          {/* Section 1 - Cancellation */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-slate-900">Subscription Cancellation Policy</h2>
            </div>
            <p>
              You may cancel your <strong>Resume Builder One</strong> recurring subscription at any time without any hidden cancellation fees.
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3 text-sm">
              <div className="font-bold text-slate-900">How to Cancel:</div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
                <li>Log in to your account and navigate to <strong>Dashboard &gt; Account Settings &gt; Billing / Subscription</strong>.</li>
                <li>Click on <strong>&ldquo;Cancel Subscription&rdquo;</strong>.</li>
                <li>Alternatively, you can email our support team at <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a> from your registered email address with the subject line <em>&ldquo;Cancellation Request&rdquo;</em>.</li>
              </ul>
            </div>
            <p className="text-sm text-slate-600">
              Upon cancellation, your subscription will not renew for subsequent billing cycles. You will retain full uninterrupted access to all paid features and saved resumes until the end of your current active billing period.
            </p>
          </section>

          {/* Section 2 - 7-Day Money-Back Guarantee */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-slate-900">7-Day Money-Back Guarantee (Refund Eligibility)</h2>
            </div>
            <p>
              We want you to feel confident in choosing Soltkiz. We offer a <strong>100% money-back guarantee for 7 days</strong> on all first-time premium plan purchases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50/60 p-5 rounded-2xl border border-green-100 space-y-2">
                <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Eligible for Full Refund
                </div>
                <ul className="text-xs text-green-900 space-y-1.5 list-disc list-inside">
                  <li>First-time subscription purchase requested within 7 calendar days of payment.</li>
                  <li>Duplicate charges caused by payment gateway or network glitches.</li>
                  <li>Technical errors on our platform that prevented you from using core features (verified by our technical team).</li>
                </ul>
              </div>

              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Ineligible for Refund
                </div>
                <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                  <li>Requests submitted after the 7-day money-back guarantee window.</li>
                  <li>Subsequent automated renewal cycles of an active subscription.</li>
                  <li>One-time credit packs where credits have already been utilized.</li>
                  <li>Accounts suspended or terminated due to violations of our Terms of Service.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 - Razorpay Refund Processing SLA */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-slate-900">Refund Processing Timeline &amp; Method</h2>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/15 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <CreditCard className="w-5 h-5" /> Direct Reversal via Razorpay Payment Gateway
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                All approved refunds are initiated electronically via <strong>Razorpay</strong> and returned directly to your <strong>original source of payment</strong> (Bank Account, Credit Card, Debit Card, UPI ID, or Wallet).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-4 rounded-xl border border-primary/10">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Approval &amp; Initiation</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Within 24 to 48 Business Hours</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-primary/10">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Bank Credit Turnaround</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">5 to 7 Working Days</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                * Note: The exact reflection time depends on your issuing bank&apos;s settlement cycle.
              </p>
            </div>
          </section>

          {/* Section 4 - Step by Step Refund Request */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-slate-900">How to Request a Refund</h2>
            </div>
            <p className="text-sm">
              To request a refund, please send an email to <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a> with the following details:
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700">
              <p><strong>1. Subject Line:</strong> Refund Request - [Your Registered Email / Name]</p>
              <p><strong>2. Razorpay Payment ID / Order ID:</strong> (Found on your email receipt or billing tab)</p>
              <p><strong>3. Transaction Date &amp; Amount Paid:</strong> (e.g. ₹499 on DD/MM/YYYY)</p>
              <p><strong>4. Reason for Refund:</strong> (Brief explanation helping us improve our platform)</p>
            </div>
            <p className="text-xs text-slate-500">
              Our billing support team will review your request and reply within <strong>24 business hours</strong>.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-xl font-bold text-slate-900">Billing Support &amp; Queries</h2>
            </div>
            <p className="text-sm">
              If you have any questions regarding a charge or need assistance with billing, please contact us prior to initiating a dispute with your bank so we can resolve the issue swiftly:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm space-y-2">
              <p><strong>Support Email:</strong> <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a></p>
              <p><strong>Operating Entity:</strong> Soltkiz IT Services (Resume Builder One)</p>
              <p><strong>Turnaround Time:</strong> Response within 24 business hours (Monday – Friday)</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
