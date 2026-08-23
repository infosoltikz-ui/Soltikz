import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Zap, Clock, Download, CheckCircle2, AlertCircle, Mail, Globe, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy - Soltkiz IT AI Resume Builder',
  description: 'Shipping & Delivery (Digital Fulfillment) Policy for Soltkiz IT AI Resume Builder.',
};

export default function ShippingDeliveryPolicy() {
  const lastUpdated = "February 23, 2025";

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center md:text-left relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
            <Zap className="w-4 h-4" /> Digital Service Fulfillment
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Resume Builder One provides 100% digital cloud-based services and instant digital downloads.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
            <span>Last Updated: <strong className="text-slate-700">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Product Type: <strong className="text-slate-700">Digital SaaS / Software</strong></span>
            <span>•</span>
            <span>Delivery Time: <strong className="text-slate-700">Instant (Within Minutes)</strong></span>
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
              <h2 className="text-xl font-bold text-slate-900">Digital Nature of Services (No Physical Shipping)</h2>
            </div>
            <p>
              <strong>Resume Builder One</strong> (operated by <strong>Soltkiz IT Services</strong>) is a cloud-based Software-as-a-Service (SaaS) web application. We specialize exclusively in digital software tools, including AI resume generation, ATS scoring algorithms, cover letter authoring, and digital document exports.
            </p>
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/15 space-y-2 text-sm">
              <div className="flex items-center gap-2 font-bold text-primary">
                <CheckCircle2 className="w-4 h-4" /> No Tangible Goods or Physical Shipping Required
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Because all our offerings are digital goods and software services, <strong>no physical shipments, parcels, or courier deliveries will be dispatched</strong> to your postal address.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-slate-900">Delivery Method &amp; Access Timeline</h2>
            </div>
            <p className="text-sm">
              All digital services, subscriptions, and credit balances are delivered electronically and activated instantly upon successful payment confirmation via Razorpay:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Clock className="w-4 h-4 text-primary" /> Delivery Timeframe
                </div>
                <p className="text-xs text-slate-600">
                  <strong>Instant / Real-time:</strong> Premium features, AI optimization limits, and subscription benefits are activated immediately (within 1-2 minutes) upon receiving successful payment confirmation.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Download className="w-4 h-4 text-primary" /> Delivery Mode
                </div>
                <p className="text-xs text-slate-600">
                  Direct online dashboard access, instant browser downloads (PDF, DOCX formats), and automated payment receipts / invoices delivered to your registered email address.
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
              <h2 className="text-xl font-bold text-slate-900">Confirmation &amp; Invoicing</h2>
            </div>
            <p className="text-sm">
              Upon successful completion of your transaction processed through Razorpay:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-slate-600">
              <li>You will receive an automated transaction confirmation and tax invoice via email to your registered email address.</li>
              <li>Your account status on the dashboard will immediately reflect the upgraded plan tier or updated credit balance.</li>
              <li>Your downloaded resume files will be saved in your account for 24/7 online access from any compatible browser.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-slate-900">Troubleshooting Digital Delivery Delays</h2>
            </div>
            <p className="text-sm">
              In rare instances where a payment is debited from your bank but network latency delays account upgrade:
            </p>
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-amber-900 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-amber-700" /> What to do if access is not granted instantly:
              </div>
              <ol className="list-decimal list-inside space-y-1 pl-1">
                <li>Log out and log back in to your dashboard to refresh your authentication session.</li>
                <li>Check your email spam/junk folder for the Razorpay payment confirmation receipt.</li>
                <li>If your account does not reflect the upgrade within 15 minutes, email our support team with your Razorpay Payment ID at <a href="mailto:info.soltikz@gmail.com" className="font-bold underline">info.soltikz@gmail.com</a>.</li>
              </ol>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-xl font-bold text-slate-900">Contact for Delivery Inquiries</h2>
            </div>
            <p className="text-sm">
              For any questions regarding service activation, digital file downloads, or billing confirmation, please reach out to:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm space-y-2">
              <p><strong>Entity Name:</strong> Soltkiz IT Services (Resume Builder One)</p>
              <p><strong>Support Email:</strong> <a href="mailto:info.soltikz@gmail.com" className="text-primary font-semibold hover:underline">info.soltikz@gmail.com</a></p>
              <p><strong>Support Operating Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM IST</p>
              <p><strong>Support SLA:</strong> Guaranteed response within 24 business hours</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
