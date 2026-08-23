import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, FileText, CreditCard, Scale, HelpCircle, Mail, AlertCircle, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Soltkiz IT AI Resume Builder',
  description: 'Terms of Service and Conditions for Soltkiz IT AI Resume Builder & Career Suite.',
};

export default function TermsOfService() {
  const lastUpdated = "February 23, 2025";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center md:text-left relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
            <Scale className="w-4 h-4" /> Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Please read these Terms and Conditions carefully before using the Soltkiz IT AI Resume Builder platform.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
            <span>Last Updated: <strong className="text-slate-700">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Platform: <strong className="text-slate-700">Resume Builder One / Soltkiz IT</strong></span>
            <span>•</span>
            <span>Payment Processor: <strong className="text-slate-700">Razorpay</strong></span>
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
              <h2 className="text-xl font-bold text-slate-900">Introduction & Acceptance of Terms</h2>
            </div>
            <p>
              Welcome to <strong>Resume Builder One</strong>, operated by <strong>Soltkiz IT Services</strong> (&ldquo;Soltkiz&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). These Terms and Conditions govern your access to and use of our website, software platform, digital tools, APIs, and services (collectively, the &ldquo;Service&rdquo;).
            </p>
            <p>
              By accessing, browsing, registering for, or purchasing any service through our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>, <Link href="/refund" className="text-primary font-semibold hover:underline">Refund Policy</Link>, and <Link href="/shipping" className="text-primary font-semibold hover:underline">Shipping &amp; Delivery Policy</Link>. If you do not agree to these terms, you must discontinue using our services immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-slate-900">Description of Services</h2>
            </div>
            <p>
              Soltkiz provides a cloud-based Software-as-a-Service (SaaS) career enhancement platform offering:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Interactive AI-driven resume creation, editing, and formatting.</li>
              <li>Applicant Tracking System (ATS) compatibility analysis and scoring.</li>
              <li>AI-powered content optimization, bullet point generation, and cover letter crafting.</li>
              <li>High-resolution digital export in PDF, DOCX, and TXT formats.</li>
              <li>Subscription-based and credit-based access to premium features and templates.</li>
            </ul>
            <p className="text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600">
              <strong>Note:</strong> All services are delivered electronically via cloud infrastructure. No physical products or tangible items are shipped.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-slate-900">User Eligibility &amp; Account Responsibility</h2>
            </div>
            <p>
              To access our services, you must be at least 18 years of age or possess legal parental/guardian consent. By creating an account:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>You agree to provide true, accurate, current, and complete registration information.</li>
              <li>You are solely responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You agree to notify us immediately of any unauthorized access or breach of account security.</li>
              <li>Soltkiz will not be liable for any loss or damages resulting from unauthorized account access.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-slate-900">User Content &amp; Intellectual Property Rights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Your Content
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You retain complete 100% ownership of all personal resumes, cover letters, career history, and text data you input or generate on the platform. We do not sell or claim ownership of your personal content.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Our Platform Property
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All software code, UI templates, design algorithms, logos, trademarks, ATS analysis algorithms, and proprietary workflows belong exclusively to Soltkiz IT Services and are protected by applicable copyright laws.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Razorpay & Payments */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-xl font-bold text-slate-900">Payment Gateway &amp; Billing Terms</h2>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/15 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <CreditCard className="w-5 h-5" /> Secured by Razorpay Payment Gateway
              </div>
              <p className="text-sm text-slate-700">
                All payments, subscriptions, and financial transactions on our platform are processed securely via <strong>Razorpay Software Private Limited</strong>. By selecting a payment method (UPI, Netbanking, Credit/Debit Card, or Wallet), you authorize Razorpay and Soltkiz to charge the indicated amount.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li><strong>Pricing &amp; Currencies:</strong> All prices are displayed in Indian Rupees (INR ₹) or US Dollars (USD $) as specified on our <Link href="/pricing" className="text-primary font-semibold hover:underline">Pricing Page</Link>. Applicable taxes (such as GST) are included or calculated at checkout.</li>
              <li><strong>Billing Cycles:</strong> Subscriptions are billed on a recurring monthly or annual basis depending on your plan selection.</li>
              <li><strong>Auto-Renewal:</strong> Subscriptions renew automatically unless cancelled prior to the renewal date via your account settings.</li>
              <li><strong>Card Data Security:</strong> We do not store sensitive payment credentials (e.g. CVV, full card numbers, or UPI PINs) on our servers. All financial data is handled strictly in compliance with PCI-DSS standards by Razorpay.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                6
              </div>
              <h2 className="text-xl font-bold text-slate-900">Cancellation &amp; Refund Policy</h2>
            </div>
            <p>
              We want you to be completely satisfied with our service. You can cancel your subscription at any time directly through your dashboard.
            </p>
            <p>
              We offer a <strong>7-day money-back guarantee</strong> for first-time subscriptions. For complete terms, procedures, and timelines regarding refunds processed via Razorpay, please review our detailed <Link href="/refund" className="text-primary font-semibold hover:underline">Refund and Cancellation Policy</Link>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                7
              </div>
              <h2 className="text-xl font-bold text-slate-900">Prohibited Activities &amp; Fair Use</h2>
            </div>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li>Submit false, fraudulent, defamatory, or misleading employment or academic claims.</li>
              <li>Attempt to reverse-engineer, decompile, scrape, or extract source code, AI prompts, or proprietary data.</li>
              <li>Resell, sublicense, or rent your account credentials to third parties without prior written authorization.</li>
              <li>Introduce viruses, malware, or automate requests in a manner that degrades system performance.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                8
              </div>
              <h2 className="text-xl font-bold text-slate-900">Disclaimers &amp; Limitation of Liability</h2>
            </div>
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-amber-900 text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-700" /> Career Outcome Disclaimer
              </div>
              <p>
                Soltkiz provides AI-powered resume building and optimization tools designed to improve formatting and ATS readability. We do <strong>not</strong> guarantee employment, job offers, interview callbacks, or specific career outcomes. Hiring decisions remain entirely at the discretion of prospective employers.
              </p>
            </div>
            <p className="text-sm">
              The services are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. To the maximum extent permitted by applicable law, Soltkiz and its directors, employees, or partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                9
              </div>
              <h2 className="text-xl font-bold text-slate-900">Governing Law &amp; Dispute Resolution</h2>
            </div>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes, claims, or controversies arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts located in India.
            </p>
          </section>

          {/* Section 10 - Contact Info */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                10
              </div>
              <h2 className="text-xl font-bold text-slate-900">Contact &amp; Grievance Redressal</h2>
            </div>
            <p>
              If you have any questions, concerns, or grievances regarding these Terms of Service or our platform practices, please contact us:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm space-y-2">
              <p><strong>Entity Name:</strong> Soltkiz IT Services (Resume Builder One)</p>
              <p><strong>Official Support Email:</strong> <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a></p>
              <p><strong>Contact Page:</strong> <Link href="/contact" className="text-primary font-semibold hover:underline">https://resumebuilderone.com/contact</Link></p>
              <p><strong>Operating Country:</strong> India</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
