'use client'

import { FileText, Zap, Target, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const FREE_LIMIT = 20

const COLORS = [
  { avatar: 'bg-orange-100 text-orange-600', bar: 'bg-orange-500' },
  { avatar: 'bg-blue-100 text-blue-600',   bar: 'bg-blue-500'   },
  { avatar: 'bg-purple-100 text-purple-600', bar: 'bg-purple-500' },
  { avatar: 'bg-green-100 text-green-600',  bar: 'bg-green-500'  },
]

export function TopActiveUsers() {
  const [topUsers, setTopUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [maxResumes, setMaxResumes] = useState(1) // for relative bar scaling

  useEffect(() => {
    fetch('/api/admin/users-with-resumes')
      .then(res => res.json())
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => (b.resume_count ?? 0) - (a.resume_count ?? 0))
          const top = sorted.slice(0, 4)
          const highest = top[0]?.resume_count ?? 1
          setMaxResumes(Math.max(highest, 1))

          setTopUsers(top.map((user, index) => {
            const name = user.full_name || user.email?.split('@')[0] || 'Unknown User'
            const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
            const planId = user.plan_id || 'FREE'
            const isPro = planId.includes('PRO')
            const plan = isPro ? 'Pro' : planId === 'ENTERPRISE' ? 'Enterprise' : 'Free'
            const resumes = user.resume_count ?? 0
            // For free users cap is FREE_LIMIT, for pro show relative to top user
            const limit = isPro ? highest : FREE_LIMIT
            const pct = Math.min(100, Math.round((resumes / Math.max(limit, 1)) * 100))

            return {
              name,
              plan,
              isPro,
              resumes,
              limit,
              pct,
              credits: user.credits_remaining ?? 0,
              atsScore: (user.avg_ats_score !== null && user.avg_ats_score !== undefined)
                ? `${user.avg_ats_score}%`
                : 'N/A',
              color: COLORS[index % COLORS.length],
              initials,
            }
          }))
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Top Active Users</h3>
          <p className="text-[13px] font-medium text-slate-500">Most engaged platform users</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View Report</button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : topUsers.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-slate-500 font-medium text-sm">No users found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topUsers.map((user, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-100 hover:border-slate-300 transition-colors group cursor-pointer flex flex-col gap-4">

              {/* Header: avatar + plan badge */}
              <div className="flex items-start justify-between gap-2">
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-[15px] font-black ${user.color.avatar}`}>
                  {user.initials}
                </div>
                <span className={`inline-flex shrink-0 items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                    ${user.plan === 'Pro' ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-600'}`}
                >
                  {user.plan}
                </span>
              </div>

              {/* Name */}
              <h4 className="text-[15px] font-black text-slate-900 group-hover:text-primary transition-colors truncate -mt-1">{user.name}</h4>

              {/* Resume progress bar */}
              <div>
                <div className="flex items-center justify-between text-[12px] mb-1.5">
                  <span className="font-bold text-slate-500 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Resumes</span>
                  <span className="font-black text-slate-900">
                    {user.resumes}
                    <span className="font-semibold text-slate-400">
                      {user.isPro ? ' (Pro)' : ` / ${user.limit}`}
                    </span>
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${user.color.bar}`}
                    style={{ width: `${user.pct}%` }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mt-1 text-right">{user.pct}% used</p>
              </div>

              {/* Stats row */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 shrink-0" /> Credits Left</span>
                  <span className="font-black text-slate-900">{user.credits}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 shrink-0" /> Avg ATS</span>
                  <span className={`font-black ${user.atsScore === 'N/A' ? 'text-slate-400' : 'text-primary'}`}>{user.atsScore}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
