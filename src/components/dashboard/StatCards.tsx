import { FileText, TrendingUp, Download, Crown, ArrowUpRight } from 'lucide-react'

export function StatCards({ 
  resumesCreated, 
  planName, 
  avgAts, 
  profileCompletion,
  validUntil 
}: { 
  resumesCreated: number
  planName: string
  avgAts: number
  profileCompletion: number
  validUntil: string | null
}) {
  return (
    <div className="grid grid-cols-5 gap-5 mb-6">
      
      {/* Resumes Created */}
      <div className="bg-white rounded-2xl p-5 border-2 border-primary/20 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 mb-1">Resumes Created</div>
            <div className="text-4xl font-black text-slate-900">{resumesCreated}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary">
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={3} />
          <span>Active</span>
        </div>
      </div>

      {/* ATS Score */}
      <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 mb-1">ATS Score (Avg)</div>
            <div className="text-4xl font-black text-slate-900">{avgAts}%</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-500" strokeWidth={2.5} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-500">
          <span>Based on {resumesCreated} resumes</span>
        </div>
      </div>

      {/* Downloads */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 mb-1">Downloads</div>
            <div className="text-4xl font-black text-slate-900">{resumesCreated}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <Download className="w-5 h-5 text-purple-500" strokeWidth={2.5} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-500">
          <span>PDF Exports</span>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-[12px] font-bold text-slate-500 mb-1">Profile Completion</div>
          <div className="text-4xl font-black text-slate-900 mb-2">{profileCompletion}%</div>
          <div className="text-[11px] font-bold text-slate-400">
            {profileCompletion === 100 ? "Perfect!" : "Almost Perfect!"}
          </div>
        </div>
        <div className="relative w-14 h-14">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-500"
              strokeWidth="4"
              strokeDasharray={`${profileCompletion}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>

      {/* Plan */}
      <div className="bg-white rounded-2xl p-5 border border-yellow-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 mb-1">Plan</div>
            <div className="text-3xl font-black text-slate-900 leading-none mt-2 uppercase">{planName}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Crown className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />
          </div>
        </div>
        <div className="text-[11px] font-bold text-slate-500 mt-5">
          {validUntil ? `Valid till ${validUntil}` : 'Forever Free'}
        </div>
        {/* Subtle background decoration */}
        <Crown className="absolute -bottom-4 -right-4 w-24 h-24 text-yellow-50 opacity-50 pointer-events-none" />
      </div>

    </div>
  )
}
