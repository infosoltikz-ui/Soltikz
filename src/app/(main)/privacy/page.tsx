import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, Server, UserCheck, Mail, Database, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Soltkiz IT AI Resume Builder',
  description: 'Privacy Policy and Data Protection measures for Soltkiz IT AI Resume Builder.',
};

export default function PrivacyPolicy() {
  const lastUpdated = "February 23, 2025";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center md:text-left relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Data Protection & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Your privacy is of utmost importance to us. Learn how we collect, safeguard, and process your personal and resume data.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
            <span>Last Updated: <strong className="text-slate-700">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Entity: <strong className="text-slate-700">Soltkiz IT Services</strong></span>
            <span>•</span>
            <span>Compliance: <strong className="text-slate-700">IT Act (India) &amp; PCI-DSS</strong></span>
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
              <h2 className="text-xl font-bold text-slate-900">Introduction</h2>
            </div>
            <p>
              <strong>Soltkiz IT Services</strong> (&ldquo;Soltkiz&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates <strong>Resume Builder One</strong>. We are committed to protecting the privacy and security of your personal information. This Privacy Policy explains what information we collect, how we process and store it, and your privacy rights under applicable data protection laws.
            </p>
            <p>
              By accessing our website or using our services, you consent to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
            </div>
            <p>We collect only the minimum necessary data to provide our resume building and ATS scoring services:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" /> Account &amp; Identity Data
                </h3>
                <p className="text-xs text-slate-600">
                  Full name, email address, phone number, authentication provider identifiers (such as Google OAuth profile), and account preferences.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" /> Resume &amp; Career Information
                </h3>
                <p className="text-xs text-slate-600">
                  Employment history, job titles, education, certifications, skill sets, project descriptions, cover letters, and custom text inputs entered by you.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" /> Payment &amp; Transaction Identifiers
                </h3>
                <p className="text-xs text-slate-600">
                  Razorpay payment transaction IDs, subscription tier, invoice amount, and purchase timestamps. <em>(Note: We do not store credit card or UPI details on our servers).</em>
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-primary" /> Technical &amp; Usage Logs
                </h3>
                <p className="text-xs text-slate-600">
                  IP address, browser type, operating system, device characteristics, pages visited, and interaction timestamps for service monitoring.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 - Razorpay Payment Security */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-slate-900">Payment Security &amp; Razorpay Processing</h2>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/15 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Lock className="w-5 h-5" /> Zero Financial Data Storage on Soltkiz Servers
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                When you make a payment or purchase a subscription, the transaction is processed directly through <strong>Razorpay Software Private Limited</strong>, our certified PCI-DSS compliant payment gateway partner.
              </p>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                <li>Soltkiz never receives, stores, or accesses your sensitive credit/debit card numbers, CVV, Netbanking passwords, or UPI PINs.</li>
                <li>All payment data is encrypted in transit and handled directly by Razorpay under strict banking and Reserve Bank of India (RBI) security regulations.</li>
                <li>We only receive a confirmation token and transaction ID to activate your purchased plan or digital credits.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <p>We process your personal information strictly for legitimate business purposes:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li>To provide, operate, and maintain our AI resume builder, editor, and export services.</li>
              <li>To perform ATS analysis and deliver real-time resume optimization scores.</li>
              <li>To process payments, verify billing, and issue digital receipts.</li>
              <li>To send essential transactional notifications (account activation, password resets, payment confirmations).</li>
              <li>To provide customer support, troubleshoot technical issues, and resolve queries.</li>
              <li>To prevent fraud, malicious activity, and enforce our Terms of Service.</li>
            </ul>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600">
              <strong>Data Privacy Guarantee:</strong> We do NOT sell, rent, or trade your personal resume data or contact information to advertisers, recruiters, or data brokers.
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-xl font-bold text-slate-900">Third-Party Service Providers</h2>
            </div>
            <p>
              We share data only with trusted, secure infrastructure partners necessary for operating our platform:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li><strong>Razorpay:</strong> Payment processing and invoice management.</li>
              <li><strong>Supabase:</strong> Encrypted cloud database storage and authentication services.</li>
              <li><strong>OpenAI / AI Engine:</strong> Secure, isolated processing for resume content enhancement and ATS evaluation.</li>
              <li><strong>Vercel:</strong> Cloud hosting infrastructure and content delivery network.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                6
              </div>
              <h2 className="text-xl font-bold text-slate-900">Cookies &amp; Tracking Technologies</h2>
            </div>
            <p className="text-sm">
              We use essential cookies and session storage to keep you logged in, save your active resume draft, and remember your interface preferences. You can adjust your browser settings to refuse cookies, though some features of the platform may not function properly without them.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                7
              </div>
              <h2 className="text-xl font-bold text-slate-900">Data Security &amp; Retention</h2>
            </div>
            <p className="text-sm">
              We implement industry-standard administrative, technical, and physical safeguards to protect your personal information against unauthorized access, loss, or misuse:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li>256-bit SSL/TLS encryption for all data in transit across the web.</li>
              <li>Row-Level Security (RLS) ensuring each user can only access their own resume data.</li>
              <li>Encrypted database backups and automated threat monitoring.</li>
            </ul>
            <p className="text-sm">
              We retain your resume data for as long as your account remains active. You may delete your resumes or account at any time from your settings.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                8
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your Privacy Rights</h2>
            </div>
            <p className="text-sm">
              Depending on applicable laws, you possess the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li><strong>Right of Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Edit or correct inaccurate or incomplete data anytime via your dashboard.</li>
              <li><strong>Right to Erasure:</strong> Request the permanent deletion of your account and all associated resume records.</li>
              <li><strong>Right to Data Portability:</strong> Export your resumes in PDF or DOCX format at any time.</li>
            </ul>
          </section>

          {/* Section 9 - Grievance Redressal */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                9
              </div>
              <h2 className="text-xl font-bold text-slate-900">Grievance Redressal &amp; Privacy Officer</h2>
            </div>
            <p className="text-sm">
              In accordance with the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the contact details of our Grievance Officer are provided below:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm space-y-2">
              <p><strong>Designation:</strong> Grievance Redressal &amp; Privacy Officer</p>
              <p><strong>Entity:</strong> Soltkiz IT Services (Resume Builder One)</p>
              <p><strong>Email:</strong> <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a></p>
              <p><strong>Response Timeline:</strong> Acknowledgement within 48 hours; resolution within 30 days.</p>
              <p><strong>Country:</strong> India</p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                10
              </div>
              <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
            </div>
            <p className="text-sm">
              For any questions regarding this Privacy Policy or data protection practices, please contact our support team at <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a> or visit our <Link href="/contact" className="text-primary font-semibold hover:underline">Contact Us</Link> page.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
