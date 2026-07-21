'use client'

import { LayoutTemplate, IndianRupee, Users, BrainCircuit, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function SettingsRightSidebar() {
  return (
    <aside className="w-[300px] shrink-0 border-l border-slate-100 bg-white flex flex-col h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
      
      {/* Quick Links */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link href="/admin/pricing" className="flex items-center gap-3 p-3 bg-[#FAFAF8] hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors group">
            <IndianRupee className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[13px] font-bold text-slate-700">Manage Pricing</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 p-3 bg-[#FAFAF8] hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors group">
            <Users className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[13px] font-bold text-slate-700">User Management</span>
          </Link>
          <button className="w-full flex items-center gap-3 p-3 bg-[#FAFAF8] hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors group">
            <BrainCircuit className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[13px] font-bold text-slate-700">AI Configuration</span>
          </button>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Platform Statistics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-500">Total Users</span>
            <span className="text-[13px] font-black text-slate-900">12,450</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-500">Premium Users</span>
            <span className="text-[13px] font-black text-slate-900">2,184</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-500">Storage Used</span>
            <span className="text-[13px] font-black text-slate-900">45 GB</span>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Version Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">Platform Version</span>
            <span className="text-[12px] font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">v2.4.1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">Database Version</span>
            <span className="text-[12px] font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">PG-15</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-500">API Status</span>
            <span className="flex items-center gap-1 text-[12px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
            </span>
          </div>
        </div>
        <a href="#" className="mt-6 flex items-center justify-center gap-2 text-[12px] font-bold text-primary hover:underline">
          View Changelog <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </aside>
  )
}
