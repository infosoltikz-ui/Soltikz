"use client";
import Link from 'next/link'
import { CheckCircle2, ShieldCheck, Zap, Lock, Headset, Send, Globe, ChevronDown } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Templates', href: '/templates' },
    { label: 'ATS Checker', href: '/ats-checker' },
    { label: 'AI Optimization', href: '/ai-optimization' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Updates', href: '/updates' },
    { label: 'Roadmap', href: '/roadmap' },
  ],
  resources: [
    { label: 'Resume Examples', href: '/examples' },
    { label: 'Resume Tips', href: '/tips' },
    { label: 'Career Blog', href: '/blog' },
    { label: 'Help Center', href: '/help' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'Webinars', href: '/webinars' },
    { label: 'Download eBooks', href: '/ebooks' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Affiliate Program', href: '/affiliates' },
    { label: 'Press Kit', href: '/press' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Support', href: '/contact' },
    { label: 'Feature Request', href: '/request' },
    { label: 'Report a Bug', href: '/bug' },
    { label: 'Status', href: '/status' },
    { label: 'System Requirements', href: '/requirements' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-6 px-4">
      <div className="container mx-auto max-w-[1400px]">
        {/* Top Main Footer Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          {/* Brand & Socials & Trusted Box */}
          <div className="lg:col-span-1 pr-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              </div>
              <span className="font-black text-[22px] tracking-tight text-slate-900 leading-none">
                ATS
                <span className="block text-[11px] font-bold text-slate-600 tracking-normal mt-0.5">Resume Builder</span>
              </span>
            </Link>
            
            <p className="text-slate-600 text-[13px] mb-6 leading-relaxed">
              AI-powered resume builder that helps you create ATS-optimized resumes and land your dream job faster.
            </p>
            
            <div className="flex items-center gap-3 mb-8">
              {[
                { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>, name: 'Facebook' },
                { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>, name: 'Twitter' },
                { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.156-.12-.311-.18-.474 2.115-.972 3.66-2.605 4.193-4.569zM12 4.11c1.284 0 2.476.32 3.493.882-.511 1.761-1.921 3.238-3.832 4.14-1.956-1.026-3.77-2.67-4.45-4.475C8.75 4.316 10.312 4.11 12 4.11zm-5.59 1.7c.655 1.572 2.302 3.036 4.041 3.993-1.42 1.408-3.155 2.15-4.814 2.13-1.127.02-2.138-.13-3.13-.374a8.497 8.497 0 013.903-5.75zM3.483 14.86c1.12.19 2.21.26 3.29.17 1.503-.13 3.003-.683 4.332-1.572.235.534.463 1.077.671 1.62-1.944 1.341-3.955 2.502-5.908 3.535A8.528 8.528 0 013.483 14.86zm10.74 3.738c-1.396-1.173-2.888-2.585-4.394-4.256.554-.108 1.134-.14 1.745-.102 2.709.18 5.23 1.17 7.023 2.65-1.01 1.073-2.427 1.706-4.374 1.708z"/></svg>, name: 'Linkedin' },
                { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.156-.12-.311-.18-.474 2.115-.972 3.66-2.605 4.193-4.569zM12 4.11c1.284 0 2.476.32 3.493.882-.511 1.761-1.921 3.238-3.832 4.14-1.956-1.026-3.77-2.67-4.45-4.475C8.75 4.316 10.312 4.11 12 4.11zm-5.59 1.7c.655 1.572 2.302 3.036 4.041 3.993-1.42 1.408-3.155 2.15-4.814 2.13-1.127.02-2.138-.13-3.13-.374a8.497 8.497 0 013.903-5.75zM3.483 14.86c1.12.19 2.21.26 3.29.17 1.503-.13 3.003-.683 4.332-1.572.235.534.463 1.077.671 1.62-1.944 1.341-3.955 2.502-5.908 3.535A8.528 8.528 0 013.483 14.86zm10.74 3.738c-1.396-1.173-2.888-2.585-4.394-4.256.554-.108 1.134-.14 1.745-.102 2.709.18 5.23 1.17 7.023 2.65-1.01 1.073-2.427 1.706-4.374 1.708z"/></svg>, name: 'Instagram' }
              ].map((item, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="bg-primary/5 rounded-xl p-4 flex items-start gap-3 border border-primary/10">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <div>
                <div className="text-sm font-bold text-slate-900 mb-1">Trusted & Secure</div>
                <div className="text-xs text-slate-600 leading-tight">Your data is safe with us.<br/>We never share your information.</div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-1">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide mb-2 uppercase">Product</h4>
            <div className="w-6 h-0.5 bg-primary mb-6" />
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-slate-600 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide mb-2 uppercase">Resources</h4>
            <div className="w-6 h-0.5 bg-primary mb-6" />
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-slate-600 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide mb-2 uppercase">Company</h4>
            <div className="w-6 h-0.5 bg-primary mb-6" />
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-slate-600 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide mb-2 uppercase">Support</h4>
            <div className="w-6 h-0.5 bg-primary mb-6" />
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-slate-600 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info Blocks (Middle Footer) */}
        <div className="border-t border-slate-100 py-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">ATS Optimized</div>
              <div className="text-[13px] text-slate-500">Pass ATS with confidence</div>
            </div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">AI Powered</div>
              <div className="text-[13px] text-slate-500">Smart suggestions that work</div>
            </div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">100% Secure</div>
              <div className="text-[13px] text-slate-500">Your data is fully protected</div>
            </div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Headset className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">24/7 Support</div>
              <div className="text-[13px] text-slate-500">We're here to help anytime</div>
            </div>
          </div>
        </div>

        {/* Bottom Green Banner */}
        <div className="bg-primary text-white rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             {/* Wave decoration */}
             <svg viewBox="0 0 1000 100" className="w-full h-full object-cover" preserveAspectRatio="none">
               <path d="M0,50 C250,100 750,0 1000,50 L1000,100 L0,100 Z" fill="white" />
             </svg>
          </div>

          <div className="text-[13px] font-medium relative z-10">
            © 2024 ATS Resume Builder. All rights reserved.
          </div>

          <div className="flex items-center gap-4 lg:gap-8 text-[13px] font-medium relative z-10">
            <Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <span className="text-white/30">|</span>
            <Link href="/terms" className="hover:text-white/80 transition-colors">Terms of Service</Link>
            <span className="text-white/30">|</span>
            <Link href="/cookies" className="hover:text-white/80 transition-colors">Cookies Policy</Link>
            
            <button className="flex items-center gap-2 border border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors ml-4">
              <Globe className="w-4 h-4" />
              English
              <ChevronDown className="w-3 h-3 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
