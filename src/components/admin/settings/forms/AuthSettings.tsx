'use client'

import { Input } from '@/components/ui/Input'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export function AuthSettings() {
  const [emails, setEmails] = useState(['admin@soltikz.com', 'founder@soltikz.com'])
  const [rememberMe, setRememberMe] = useState(true)

  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">Authentication</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Manage how administrators securely access the portal.</p>
      </div>

      <div className="space-y-8">
        
        {/* Method */}
        <div>
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Login Method</h3>
          <div className="bg-[#FAFAF8] border border-slate-200 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-slate-900">Email OTP (Magic Link)</div>
              <div className="text-[12px] font-medium text-slate-500 mt-0.5">Admins receive a secure code via email to login. Passwordless.</div>
            </div>
            <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-wider rounded-md">Active</span>
          </div>
        </div>

        {/* Whitelist */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Allowed Admin Emails</h3>
          <div className="space-y-3">
            {emails.map((email, i) => (
              <div key={i} className="flex items-center gap-3">
                <Input value={email} readOnly className="h-10 bg-slate-50 text-slate-700 border-slate-200" />
                <button className="w-10 h-10 shrink-0 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <Input placeholder="Enter new admin email..." className="h-10 bg-white border-slate-200 focus:border-primary" />
              <button className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Session */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Session Management</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Session Timeout (Minutes)</label>
              <Input type="number" defaultValue="120" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Max Login Attempts</label>
              <Input type="number" defaultValue="5" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
            </div>
          </div>

          <label className="flex items-center justify-between p-4 bg-[#FAFAF8] border border-slate-200 rounded-xl cursor-pointer">
            <div>
              <div className="text-[13px] font-bold text-slate-900">Remember Login Toggle</div>
              <div className="text-[12px] font-medium text-slate-500 mt-0.5">Allow admins to stay logged in for 30 days.</div>
            </div>
            <button 
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-11 h-6 rounded-full relative transition-colors ${rememberMe ? 'bg-primary' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${rememberMe ? 'left-6' : 'left-1'}`}></div>
            </button>
          </label>
        </div>

      </div>
    </div>
  )
}
