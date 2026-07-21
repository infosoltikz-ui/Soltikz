'use client'

import { Input } from '@/components/ui/Input'
import { Mail, Edit3 } from 'lucide-react'
import { useState } from 'react'

export function EmailSettings() {
  const [toggles, setToggles] = useState({
    newUser: true,
    premium: true,
    resume: false,
    errors: true
  })

  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">Email & Notifications</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Configure SMTP settings, templates, and admin notification triggers.</p>
      </div>

      <div className="space-y-8">
        
        {/* Provider */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">SMTP Provider</label>
            <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
              <option>SendGrid</option>
              <option>AWS SES</option>
              <option>Mailgun</option>
              <option>Postmark</option>
              <option>Custom SMTP</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Sender Name</label>
            <Input defaultValue="Soltikz Platform" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Sender Email</label>
            <Input defaultValue="noreply@soltikz.com" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
          <div>
            <label className="block text-[13px] font-black text-slate-900 mb-2">Reply-To Email</label>
            <Input defaultValue="support@soltikz.com" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
          </div>
        </div>

        {/* Templates */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Email Templates</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl flex flex-col justify-between group">
              <div>
                <Mail className="w-5 h-5 text-slate-400 mb-3" />
                <div className="text-[13px] font-bold text-slate-900">OTP Login Template</div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5 mb-4">Transactional email containing magic link codes.</div>
              </div>
              <button className="h-9 w-full bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <Edit3 className="w-3.5 h-3.5" /> Edit Template
              </button>
            </div>
            <div className="p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl flex flex-col justify-between group">
              <div>
                <Mail className="w-5 h-5 text-slate-400 mb-3" />
                <div className="text-[13px] font-bold text-slate-900">Welcome Email</div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5 mb-4">Sent to new users upon successful registration.</div>
              </div>
              <button className="h-9 w-full bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <Edit3 className="w-3.5 h-3.5" /> Edit Template
              </button>
            </div>
          </div>
        </div>

        {/* Notification Toggles */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Admin Notification Toggles</h3>
          <div className="space-y-1 bg-white border border-slate-200 rounded-xl overflow-hidden">
            {[
              { key: 'newUser', label: 'New User Registration', desc: 'Alert when a new user joins.' },
              { key: 'premium', label: 'Premium Purchase', desc: 'Alert when a user upgrades to Pro.' },
              { key: 'resume', label: 'Resume Generated', desc: 'Alert on every resume generation.' },
              { key: 'errors', label: 'System Errors', desc: 'Alert on critical backend failures.' },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                <div>
                  <div className="text-[13px] font-bold text-slate-900">{item.label}</div>
                  <div className="text-[12px] font-medium text-slate-500 mt-0.5">{item.desc}</div>
                </div>
                <button 
                  type="button"
                  onClick={() => setToggles({...toggles, [item.key]: !toggles[item.key as keyof typeof toggles]})}
                  className={`w-11 h-6 rounded-full relative transition-colors ${toggles[item.key as keyof typeof toggles] ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles[item.key as keyof typeof toggles] ? 'left-6' : 'left-1'}`}></div>
                </button>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
