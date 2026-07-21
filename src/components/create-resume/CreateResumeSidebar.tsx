import { ShieldCheck, CheckCircle2 } from 'lucide-react'

export function CreateResumeSidebar() {


  return (
    <div className="space-y-6">
      

      {/* Resume Preview block */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-black text-slate-900">Resume Preview</h3>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          </div>
        </div>
        
        {/* Skeleton UI for Resume */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 mb-3 flex items-center justify-center">
            <UserIconSkeleton />
          </div>
          <div className="w-32 h-4 bg-slate-200 rounded-md mb-2"></div>
          <div className="w-24 h-2.5 bg-slate-100 rounded-md mb-4"></div>
          
          <div className="w-full flex justify-center gap-3 mb-6">
            <div className="w-16 h-1.5 bg-slate-100 rounded-full"></div>
            <div className="w-20 h-1.5 bg-slate-100 rounded-full"></div>
          </div>

          <div className="w-full space-y-3">
            <div>
              <div className="w-20 h-2 bg-slate-200 rounded-md mb-2"></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mb-1"></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mb-1"></div>
              <div className="w-3/4 h-1.5 bg-slate-100 rounded-full"></div>
            </div>
            
            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <div className="w-24 h-2 bg-slate-200 rounded-md"></div>
                <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
              </div>
              <div className="w-32 h-1.5 bg-slate-200 rounded-full mb-2"></div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="w-11/12 h-1.5 bg-slate-100 rounded-full"></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <div className="w-20 h-2 bg-slate-200 rounded-md"></div>
                <div className="w-16 h-1.5 bg-slate-100 rounded-full"></div>
              </div>
              <div className="w-40 h-1.5 bg-slate-200 rounded-full mb-2"></div>
              <div className="w-24 h-1.5 bg-slate-100 rounded-full mb-1"></div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="w-12 h-2 bg-slate-200 rounded-md mb-2"></div>
              <div className="flex gap-2">
                <div className="w-12 h-3 rounded-md bg-slate-100"></div>
                <div className="w-10 h-3 rounded-md bg-slate-100"></div>
                <div className="w-14 h-3 rounded-md bg-slate-100"></div>
                <div className="w-12 h-3 rounded-md bg-slate-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ATS Banner */}
      <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5 flex items-start gap-4">
        <div className="p-2 bg-white rounded-full shadow-sm text-primary shrink-0">
          <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div>
          <h4 className="text-[13px] font-black text-slate-900 mb-0.5">Your resume will be ATS-optimized</h4>
          <p className="text-[12px] font-medium text-slate-600">Higher chances of getting noticed by recruiters</p>
        </div>
      </div>

    </div>
  )
}

function UserIconSkeleton() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-slate-200" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}
