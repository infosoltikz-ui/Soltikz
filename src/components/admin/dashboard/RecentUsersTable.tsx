'use client'

import { Search, Filter, Download, MoreHorizontal, CheckCircle2, Ban } from 'lucide-react'

const USERS = [
  { name: 'Sarah Jenkins', email: 'sarah.j@example.com', plan: 'Pro', country: 'US', date: 'Oct 24, 2023', status: 'Active', initials: 'SJ', color: 'bg-blue-100 text-blue-600' },
  { name: 'Michael Chen', email: 'm.chen@example.com', plan: 'Enterprise', country: 'CA', date: 'Oct 23, 2023', status: 'Active', initials: 'MC', color: 'bg-orange-100 text-orange-600' },
  { name: 'Emily Rodriguez', email: 'emily.r@example.com', plan: 'Free', country: 'ES', date: 'Oct 23, 2023', status: 'Suspended', initials: 'ER', color: 'bg-slate-100 text-slate-600' },
  { name: 'David Smith', email: 'david.smith@example.com', plan: 'Pro', country: 'UK', date: 'Oct 22, 2023', status: 'Active', initials: 'DS', color: 'bg-green-100 text-green-600' },
  { name: 'Aisha Patel', email: 'apatel@example.com', plan: 'Enterprise', country: 'IN', date: 'Oct 21, 2023', status: 'Active', initials: 'AP', color: 'bg-purple-100 text-purple-600' },
]

export function RecentUsersTable() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm overflow-hidden mt-6">
      
      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Users</h3>
          <p className="text-[13px] font-medium text-slate-500">Latest platform registrations</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-9 h-10 w-48 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="h-10 px-4 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="h-10 px-4 bg-primary border border-transparent rounded-xl text-[13px] font-bold text-white flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Signup Date</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USERS.map((user, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black ${user.color}`}>
                      {user.initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{user.name}</div>
                      <div className="text-[12px] font-medium text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider
                    ${user.plan === 'Pro' ? 'bg-primary/10 text-primary' : 
                      user.plan === 'Enterprise' ? 'bg-orange-100 text-orange-600' : 
                      'bg-slate-100 text-slate-600'}`}
                  >
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-bold text-slate-700">{user.country}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-medium text-slate-600">{user.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {user.status === 'Active' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[13px] font-bold text-slate-700">Active</span>
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4 text-red-500" />
                        <span className="text-[13px] font-bold text-slate-700">Suspended</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
