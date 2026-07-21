'use client'

import { MoreHorizontal, FileText, CheckCircle2, Ban, Mail } from 'lucide-react'

// Dummy Data
export const USERS_DATA = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+1 555-0123', country: 'US', plan: 'Pro', totalResumes: 4, atsScore: '92%', lastLogin: '2 hours ago', registrationDate: 'Oct 24, 2023', status: 'Active', initials: 'SJ', color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', phone: '+1 555-0124', country: 'CA', plan: 'Enterprise', totalResumes: 12, atsScore: '96%', lastLogin: '5 mins ago', registrationDate: 'Oct 23, 2023', status: 'Active', initials: 'MC', color: 'bg-orange-100 text-orange-600' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.r@example.com', phone: '+34 555-0125', country: 'ES', plan: 'Free', totalResumes: 1, atsScore: '65%', lastLogin: '3 days ago', registrationDate: 'Oct 23, 2023', status: 'Blocked', initials: 'ER', color: 'bg-slate-100 text-slate-600' },
  { id: 4, name: 'David Smith', email: 'david.smith@example.com', phone: '+44 555-0126', country: 'UK', plan: 'Pro', totalResumes: 3, atsScore: '88%', lastLogin: '1 hour ago', registrationDate: 'Oct 22, 2023', status: 'Active', initials: 'DS', color: 'bg-green-100 text-green-600' },
  { id: 5, name: 'Aisha Patel', email: 'apatel@example.com', phone: '+91 555-0127', country: 'IN', plan: 'Enterprise', totalResumes: 8, atsScore: '94%', lastLogin: 'Just now', registrationDate: 'Oct 21, 2023', status: 'Active', initials: 'AP', color: 'bg-purple-100 text-purple-600' },
  { id: 6, name: 'James Wilson', email: 'james.w@example.com', phone: '+1 555-0128', country: 'US', plan: 'Free', totalResumes: 2, atsScore: '78%', lastLogin: '1 week ago', registrationDate: 'Oct 20, 2023', status: 'Inactive', initials: 'JW', color: 'bg-pink-100 text-pink-600' },
]

interface UserTableProps {
  onRowClick: (userId: number) => void;
}

export function UserTable({ onRowClick }: UserTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm mt-6 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Profile</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Stats</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Activity</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USERS_DATA.map((user) => (
              <tr 
                key={user.id} 
                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                onClick={() => onRowClick(user.id)}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black shrink-0 ${user.color}`}>
                      {user.initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{user.name}</div>
                      <div className="text-[12px] font-medium text-slate-500">ID: #{user.id}00{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[13px] font-medium text-slate-900 mb-0.5">{user.email}</div>
                  <div className="text-[11px] font-bold text-slate-400">{user.phone}</div>
                </td>
                <td className="px-5 py-3 text-[13px] font-bold text-slate-700">
                  {user.country}
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider
                    ${user.plan === 'Pro' ? 'bg-blue-100 text-blue-700' : 
                      user.plan === 'Enterprise' ? 'bg-primary/10 text-primary' : 
                      'bg-orange-100 text-orange-600'}`}
                  >
                    {user.plan}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[13px] font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> {user.totalResumes} Resumes
                  </div>
                  <div className="text-[11px] font-bold text-slate-400">ATS: {user.atsScore}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-[12px] font-medium text-slate-900 mb-0.5">Last: {user.lastLogin}</div>
                  <div className="text-[11px] font-bold text-slate-400">Join: {user.registrationDate}</div>
                </td>
                <td className="px-5 py-3">
                  {user.status === 'Active' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[12px] font-bold border border-green-100"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active</span>}
                  {user.status === 'Blocked' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-[12px] font-bold border border-red-100"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Blocked</span>}
                  {user.status === 'Inactive' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-bold border border-slate-200"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inactive</span>}
                </td>
                <td className="px-5 py-3 text-right">
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
        <div className="flex items-center gap-4 text-[13px] font-bold text-slate-600">
          <span>Rows per page:</span>
          <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-primary">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>1-6 of 12,548</span>
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 text-[13px] font-bold text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">Previous</button>
          <button className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-white bg-primary rounded-lg shadow-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
          <button className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">3</button>
          <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
          <button className="px-3 py-1.5 text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}
