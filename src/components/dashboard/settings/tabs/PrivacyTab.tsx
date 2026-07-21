import { Download, Trash2, Mail, Link as LinkIcon, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PrivacyTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Connected Accounts */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Connected Accounts</h3>
        
        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-0.5">Google</div>
                <div className="text-[13px] font-medium text-primary flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Connected
                </div>
              </div>
            </div>
            <button className="text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              Disconnect
            </button>
          </div>

          <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-0.5">LinkedIn</div>
                <div className="text-[13px] font-medium text-primary flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Connected
                </div>
              </div>
            </div>
            <button className="text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
              Disconnect
            </button>
          </div>

          <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-0.5">GitHub</div>
                <div className="text-[13px] text-slate-500">
                  Not connected
                </div>
              </div>
            </div>
            <button className="text-[13px] font-bold text-slate-900 hover:text-slate-600 transition-colors flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5" /> Connect
            </button>
          </div>

        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Data Management</h3>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="text-[14px] font-bold text-slate-900 mb-1">Download My Data</div>
              <div className="text-[13px] text-slate-500 max-w-lg">
                Get a copy of all your personal data, resumes, and account history in JSON and PDF format.
              </div>
            </div>
            <Button variant="outline" className="h-10 px-6 text-[13px] font-bold rounded-xl border-slate-200 shrink-0">
              <Download className="w-4 h-4 mr-2" /> Request Data Archive
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-[14px] font-bold text-slate-900 mb-1">Export Resume Data</div>
              <div className="text-[13px] text-slate-500 max-w-lg">
                Export all your saved resume content and raw text data.
              </div>
            </div>
            <Button variant="outline" className="h-10 px-6 text-[13px] font-bold rounded-xl border-slate-200 shrink-0">
              <Download className="w-4 h-4 mr-2" /> Export JSON
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl pointer-events-none"></div>
        
        <h3 className="text-[16px] font-black text-red-600 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h3>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-[14px] font-bold text-slate-900 mb-1">Delete Account</div>
            <div className="text-[13px] text-slate-500 max-w-lg">
              Permanently delete your account and all of your data. This action cannot be undone.
            </div>
          </div>
          <Button variant="outline" className="h-10 px-6 text-[13px] font-bold rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 shrink-0">
            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
          </Button>
        </div>
      </div>

    </div>
  )
}
