import { FileText, TrendingUp, CheckCircle2 } from 'lucide-react'

function completionMessage(profileCompletion: number) {
  if (profileCompletion === 100) return "Master Profile complete"
  if (profileCompletion >= 80) return "Almost complete"
  if (profileCompletion >= 40) return "Partially completed"
  if (profileCompletion > 0) return "In progress"
  return "Profile not started"
}

export function StatCards({
  resumesCreated,
  avgAts,
  scoredCount = 0,
  profileCompletion,
}: {
  resumesCreated: number
  avgAts: number | null
  scoredCount?: number
  profileCompletion: number
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

      {/* Resumes Created */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Resumes Created
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {resumesCreated}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileText className="w-4 h-4 text-slate-600" strokeWidth={2} />
          </div>
        </div>
        <div className="text-[12px] font-medium text-slate-500">
          {resumesCreated > 0
            ? `${resumesCreated} tailored resume${resumesCreated === 1 ? '' : 's'} in library`
            : 'No resumes created yet'}
        </div>
      </div>

      {/* ATS Score */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              ATS Score (Avg)
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {avgAts !== null && avgAts > 0 ? `${avgAts}%` : '—'}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" strokeWidth={2} />
          </div>
        </div>
        <div className="text-[12px] font-medium text-slate-500">
          {avgAts !== null && avgAts > 0
            ? `Calculated across ${scoredCount} scored resume${scoredCount === 1 ? '' : 's'}`
            : 'Run ATS check to generate score'}
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex items-center justify-between">
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Profile Completion
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {profileCompletion}%
          </div>
          <div className="text-[12px] font-medium text-slate-500">
            {completionMessage(profileCompletion)}
          </div>
        </div>
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={profileCompletion === 100 ? "text-emerald-600" : "text-primary"}
              strokeWidth="3.5"
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
