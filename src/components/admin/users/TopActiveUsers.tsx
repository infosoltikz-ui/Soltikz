'use client'

import { FileText, Download, Target, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const COLORS = [
  'bg-orange-100 text-orange-600',
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-green-100 text-green-600',
]

export function TopActiveUsers() {
  const [topUsers, setTopUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reuse the users-with-resumes API (service role, bypasses RLS)
    fetch('/api/admin/users-with-resumes')
      .then(res => res.json())
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          // Sort by resume_count descending, take top 4
          const top = [...data]
            .sort((a, b) => (b.resume_count ?? 0) - (a.resume_count ?? 0))
            .slice(0, 4)
            .map((user, index) => {
              const name = user.full_name || user.email?.split('@')[0] || 'Unknown User'
              const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
              const planId = user.plan_id || 'FREE'
              const plan = planId.includes('PRO') ? 'Pro' : planId === 'ENTERPRISE' ? 'Enterprise' : 'Free'
              return {
                name,
                plan,
                resumes: user.resume_count ?? 0,
                credits: user.credits_remaining ?? 0,
                atsScore: user.avg_ats_score !== null && user.avg_ats_score !== undefined
                  ? `${user.avg_ats_score}%`
                  : 'N/A',
                color: COLORS[index % COLORS.length],
                initials,
              }
            })
          setTopUsers(top)
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
            <div key={i} className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-100 hover:border-slate-300 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-[15px] font-black ${user.color}`}>
                  {user.initials}
                </div>
                <span className={`inline-flex shrink-0 items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                    ${user.plan === 'Pro' ? 'bg-primary/10 text-primary' : (user.plan === 'Free' ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-600')}`}
                >
                  {user.plan}
                </span>
              </div>
              
              <h4 className="text-[15px] font-black text-slate-900 mb-4 group-hover:text-primary transition-colors truncate">{user.name}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><FileText className="w-3.5 h-3.5 shrink-0" /> Resumes</span>
                  <span className="font-black text-slate-900 shrink-0">{user.resumes}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><Download className="w-3.5 h-3.5 shrink-0" /> Credits Left</span>
                  <span className="font-black text-slate-900 shrink-0">{user.credits}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><Target className="w-3.5 h-3.5 shrink-0" /> ATS Score</span>
                  <span className={`font-black shrink-0 ${user.atsScore === 'N/A' ? 'text-slate-400' : 'text-primary'}`}>{user.atsScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
