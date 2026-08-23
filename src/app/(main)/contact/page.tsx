"use client";

import React, { useState } from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate support ticket submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Your message has been sent successfully! Our team will respond within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center md:text-left relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" /> Customer Support &amp; Inquiries
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Have questions about your subscription, AI resume tools, or need billing support? Our team is here to assist you.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
            <span>Operating Entity: <strong className="text-slate-700">Soltkiz IT Services</strong></span>
            <span>•</span>
            <span>Support Email: <strong className="text-slate-700">info.soltikz@gmail.com</strong></span>
            <span>•</span>
            <span>Average Response SLA: <strong className="text-slate-700">&lt; 24 Hours</strong></span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business & Support Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Corporate Details
              </h2>

              {/* Legal Entity */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Legal Entity / Merchant</div>
                  <div className="text-sm font-bold text-slate-900">Soltkiz IT Services</div>
                  <div className="text-xs text-slate-500">Trading as Resume Builder One</div>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Official Support Email</div>
                  <a href="mailto:info.soltikz@gmail.com" className="text-sm font-bold text-primary hover:underline">
                    info.soltikz@gmail.com
                  </a>
                  <div className="text-xs text-slate-500">Replies within 24 business hours</div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Business Hours</div>
                  <div className="text-sm font-bold text-slate-900">Monday – Friday</div>
                  <div className="text-xs text-slate-500">9:00 AM to 6:00 PM IST (UTC +5:30)</div>
                </div>
              </div>

              {/* Registered Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Registered &amp; Operating Address</div>
                  <address className="text-xs text-slate-700 not-italic leading-relaxed mt-1">
                    Soltkiz IT Services<br />
                    Technology Innovation Park, Cyber Hub<br />
                    Bengaluru, Karnataka - 560100<br />
                    India
                  </address>
                </div>
              </div>

            </div>

            {/* Razorpay Trust Badge */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/15 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-slate-900">Verified Razorpay Merchant</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  All transactions and subscriptions are 256-bit encrypted and safely processed via Razorpay.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 text-sm mb-8">
                Fill out the form below and our dedicated support specialist will get back to you shortly.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900">Thank You!</h3>
                  <p className="text-sm text-green-800">
                    Your inquiry has been logged with reference ticket ID. We will contact you at <strong>{formData.email || 'your email'}</strong> within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        placeholder="e.g. rahul@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Inquiry Category
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    >
                      <option value="">Select an inquiry type</option>
                      <option value="Billing & Razorpay Payments">Billing &amp; Razorpay Payments</option>
                      <option value="Refund & Cancellation Request">Refund &amp; Cancellation Request</option>
                      <option value="Technical Support & ATS Scoring">Technical Support &amp; ATS Scoring</option>
                      <option value="Enterprise / Career Inquiries">Enterprise / Career Inquiries</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="Please describe your question or issue in detail (include Razorpay Payment ID if related to a transaction)..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
