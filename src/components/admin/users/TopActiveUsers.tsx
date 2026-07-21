'use client'

import { FileText, Download, Target } from 'lucide-react'

const TOP_USERS = [
  { name: 'Michael Chen', plan: 'Enterprise', resumes: 12, downloads: 45, score: '96%', color: 'bg-orange-100 text-orange-600', initials: 'MC' },
  { name: 'Sarah Jenkins', plan: 'Pro', resumes: 8, downloads: 22, score: '92%', color: 'bg-blue-100 text-blue-600', initials: 'SJ' },
  { name: 'Aisha Patel', plan: 'Enterprise', resumes: 8, downloads: 30, score: '94%', color: 'bg-purple-100 text-purple-600', initials: 'AP' },
  { name: 'David Smith', plan: 'Pro', resumes: 3, downloads: 15, score: '88%', color: 'bg-green-100 text-green-600', initials: 'DS' },
]

export function TopActiveUsers() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Top Active Users</h3>
          <p className="text-[13px] font-medium text-slate-500">Most engaged platform users</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View Report</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOP_USERS.map((user, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-100 hover:border-slate-300 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-[15px] font-black ${user.color}`}>
                {user.initials}
              </div>
              <span className={`inline-flex shrink-0 items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                  ${user.plan === 'Pro' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'}`}
                >
                  {user.plan}
              </span>
            </div>
            
            <h4 className="text-[15px] font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">{user.name}</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-[13px]">
                <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><FileText className="w-3.5 h-3.5 shrink-0" /> Resumes</span>
                <span className="font-black text-slate-900 shrink-0">{user.resumes}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[13px]">
                <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><Download className="w-3.5 h-3.5 shrink-0" /> Downloads</span>
                <span className="font-black text-slate-900 shrink-0">{user.downloads}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[13px]">
                <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><Target className="w-3.5 h-3.5 shrink-0" /> ATS Score</span>
                <span className="font-black text-primary shrink-0">{user.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
