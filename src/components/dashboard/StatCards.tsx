import { FileText, TrendingUp } from 'lucide-react'

function completionMessage(profileCompletion: number) {
  if (profileCompletion === 100) return "Profile complete!"
  if (profileCompletion >= 50) return "Almost there"
  if (profileCompletion > 0) return "Keep going"
  return "Let's get started"
}

export function StatCards({
  resumesCreated,
  avgAts,
  profileCompletion,
}: {
  resumesCreated: number
  avgAts: number
  profileCompletion: number
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

      {/* Resumes Created */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 mb-1">Resumes Created</div>
            <div className="text-4xl font-black text-slate-900">{resumesCreated}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
        </div>
        <div className="text-[11px] font-bold text-slate-400">
          {resumesCreated > 0 ? `${resumesCreated} tailored to real job descriptions` : 'None yet — create your first one'}
        </div>
      </div>

      {/* ATS Score */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[12px] font-bold text-slate-500 mb-1">ATS Score (Avg)</div>
            <div className="text-4xl font-black text-slate-900">{avgAts}%</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-500" strokeWidth={2.5} />
          </div>
        </div>
        <div className="text-[11px] font-bold text-slate-400">
          {resumesCreated > 0 ? `Based on ${resumesCreated} resume${resumesCreated === 1 ? '' : 's'}` : 'No resumes scored yet'}
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-[12px] font-bold text-slate-500 mb-1">Profile Completion</div>
          <div className="text-4xl font-black text-slate-900 mb-2">{profileCompletion}%</div>
          <div className="text-[11px] font-bold text-slate-400">
            {completionMessage(profileCompletion)}
          </div>
        </div>
        <div className="relative w-14 h-14 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary"
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

    </div>
  )
}
