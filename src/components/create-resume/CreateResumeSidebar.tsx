import { ShieldCheck, CheckCircle2, Sparkles, ScanLine, LayoutTemplate, Star } from 'lucide-react'

export function CreateResumeSidebar() {
  return (
    <div className="space-y-6">
      
      {/* Resume Preview Block (Glassmorphic & Animated) */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/20 p-6 relative overflow-hidden group">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16 pointer-events-none transition-colors duration-500" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-emerald-600" />
            <h3 className="text-[16px] font-black text-slate-900 tracking-tight">AI Layout Engine</h3>
          </div>
          <div className="flex gap-1.5 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
          </div>
        </div>
        
        {/* Skeleton UI for Resume - Now with an animated "Scanning Laser" */}
        <div className="relative border border-slate-200/80 rounded-2xl p-5 bg-slate-50/50 shadow-inner flex flex-col items-center overflow-hidden">
          
          {/* Animated Scanning Laser */}
          <div className="absolute inset-x-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)] animate-[scan_3s_ease-in-out_infinite]" />

          <div className="w-16 h-16 rounded-full bg-slate-200/80 mb-3 flex items-center justify-center relative">
            <UserIconSkeleton />
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="w-36 h-3 bg-slate-300/80 rounded-md mb-2"></div>
          <div className="w-24 h-2 bg-slate-200/80 rounded-md mb-5"></div>
          
          <div className="w-full flex justify-center gap-3 mb-6">
            <div className="w-16 h-1.5 bg-slate-200/80 rounded-full"></div>
            <div className="w-20 h-1.5 bg-slate-200/80 rounded-full"></div>
          </div>

          <div className="w-full space-y-4">
            <div>
              <div className="w-20 h-2 bg-slate-300/80 rounded-md mb-2"></div>
              <div className="w-full h-1.5 bg-slate-200/80 rounded-full mb-1"></div>
              <div className="w-full h-1.5 bg-slate-200/80 rounded-full mb-1"></div>
              <div className="w-3/4 h-1.5 bg-slate-200/80 rounded-full"></div>
            </div>
            
            <div className="pt-3 border-t border-slate-200/80">
              <div className="flex justify-between items-center mb-2">
                <div className="w-24 h-2 bg-slate-300/80 rounded-md"></div>
                <div className="w-12 h-1.5 bg-slate-200/80 rounded-full"></div>
              </div>
              <div className="w-32 h-1.5 bg-slate-300/50 rounded-full mb-3"></div>
              
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-0.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></div>
                  <div className="w-full h-1.5 bg-slate-200/80 rounded-full mt-1"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-0.5 rounded-full bg-emerald-400 shrink-0 animate-pulse delay-75"></div>
                  <div className="w-11/12 h-1.5 bg-slate-200/80 rounded-full mt-1"></div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80">
              <div className="flex justify-between items-center mb-2">
                <div className="w-20 h-2 bg-slate-300/80 rounded-md"></div>
                <div className="w-16 h-1.5 bg-slate-200/80 rounded-full"></div>
              </div>
              <div className="w-40 h-1.5 bg-slate-300/50 rounded-full mb-2"></div>
              <div className="w-24 h-1.5 bg-slate-200/80 rounded-full mb-1"></div>
            </div>

            <div className="pt-3 border-t border-slate-200/80">
              <div className="w-12 h-2 bg-slate-300/80 rounded-md mb-2"></div>
              <div className="flex gap-2">
                <div className="w-12 h-3.5 rounded-md bg-emerald-100"></div>
                <div className="w-10 h-3.5 rounded-md bg-emerald-100"></div>
                <div className="w-14 h-3.5 rounded-md bg-teal-100"></div>
                <div className="w-12 h-3.5 rounded-md bg-slate-200/80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium ATS Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl shadow-inner shrink-0 text-emerald-400">
            <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-[15px] font-black text-white mb-1 tracking-tight flex items-center gap-1.5">
              100% ATS Optimized
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            </h4>
            <p className="text-[12.5px] font-medium text-slate-400 leading-relaxed">
              Your generated resume is automatically formatted to bypass Workday, Taleo, and Greenhouse applicant tracking systems.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

function UserIconSkeleton() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-slate-300" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}
