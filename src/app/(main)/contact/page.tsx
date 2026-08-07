import React from 'react';

export default function ContactUs() {
  return (
    <div className="container mx-auto max-w-4xl py-20 px-4">
      <h1 className="text-4xl font-black mb-8 text-slate-900">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="prose prose-slate max-w-none mb-8">
            <p>We'd love to hear from you. Please fill out the form below or reach out to us using the contact information provided.</p>
            
            <h3>Our Office</h3>
            <p>
              [YOUR FULL NAME / LEGAL ENTITY]<br />
              [YOUR FLAT/HOUSE NUMBER, STREET NAME]<br />
              [YOUR CITY, STATE, PIN CODE]<br />
              India
            </p>
            
            <h3>Email</h3>
            <p>info.soltikz@gmail.com</p>
            
            <h3>Phone</h3>
            <p>[YOUR PHONE NUMBER]</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@resumebuilderone.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
