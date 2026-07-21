'use client'

import { X, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'

interface PlanConfigurationDrawerProps {
  planId: string | null;
  onClose: () => void;
}

export function PlanConfigurationDrawer({ planId, onClose }: PlanConfigurationDrawerProps) {
  const [isActive, setIsActive] = useState(true)

  if (!planId) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] z-[70] animate-in slide-in-from-right duration-300 flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="h-[72px] px-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-[#FAFAF8]">
          <div>
            <h2 className="text-[18px] font-black text-slate-900">Configure Plan</h2>
            <p className="text-[13px] font-medium text-slate-500 capitalize">{planId} Tier Configuration</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Status Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-slate-500">Status</span>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-11 h-6 rounded-full relative transition-colors ${isActive ? 'bg-primary' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isActive ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Core Details */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Core Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Plan Name</label>
                <Input defaultValue={planId === 'pro' ? 'Pro' : planId === 'free' ? 'Free' : 'Enterprise'} className="bg-[#FAFAF8] focus:bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Monthly Price (₹)</label>
                  <Input defaultValue={planId === 'pro' ? '499' : '0'} className="bg-[#FAFAF8] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Yearly Price (₹)</label>
                  <Input defaultValue={planId === 'pro' ? '4788' : '0'} className="bg-[#FAFAF8] focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Description</label>
                <textarea 
                  className="w-full h-24 px-4 py-3 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] text-slate-900 outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                  defaultValue={planId === 'pro' ? "Perfect for professionals seeking unlimited access to all AI tools." : ""}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Usage Limits */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Usage Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Max Resumes</label>
                <Input defaultValue={planId === 'pro' ? '-1' : '10'} type="number" placeholder="-1 for unlimited" className="bg-[#FAFAF8] focus:bg-white" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">ATS Reports</label>
                <Input defaultValue={planId === 'pro' ? '-1' : '10'} type="number" placeholder="-1 for unlimited" className="bg-[#FAFAF8] focus:bg-white" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Cloud Storage (MB)</label>
                <Input defaultValue={planId === 'pro' ? '5120' : '100'} type="number" className="bg-[#FAFAF8] focus:bg-white" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Cover Letters</label>
                <Input defaultValue={planId === 'pro' ? '-1' : '0'} type="number" className="bg-[#FAFAF8] focus:bg-white" />
              </div>
            </div>
            <p className="text-[11px] font-medium text-slate-400 mt-2">* Use -1 for unlimited access.</p>
          </div>

          {/* Feature Toggles */}
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-4">Feature Inclusions</h3>
            <div className="space-y-1 bg-white border border-slate-200 rounded-xl overflow-hidden">
              {[
                { name: 'AI Resume Optimization', active: true },
                { name: 'Premium Templates', active: planId !== 'free' },
                { name: 'Interview Preparation', active: planId !== 'free' },
                { name: 'Export to DOCX', active: planId !== 'free' },
                { name: 'Priority Support', active: planId === 'pro' || planId === 'enterprise' },
                { name: 'API Access', active: planId === 'enterprise' },
              ].map((feat, i) => (
                <label key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                  <span className="text-[13px] font-bold text-slate-700">{feat.name}</span>
                  <input type="checkbox" defaultChecked={feat.active} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-[#FAFAF8] grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={onClose} className="w-full text-[13px] h-11">
            Cancel
          </Button>
          <Button className="w-full text-[13px] h-11 shadow-sm shadow-primary/20">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>

      </div>
    </>
  )
}
