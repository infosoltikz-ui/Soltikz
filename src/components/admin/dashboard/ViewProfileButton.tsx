'use client'

import { Eye } from 'lucide-react'
import toast from 'react-hot-toast'

export function ViewProfileButton({ userId, userName }: { userId: string, userName: string }) {
  const handleClick = () => {
    // In a real app, this would route to /admin/users/[userId]
    // For now, we show a success toast to indicate it's working
    toast.success(`Loading profile for ${userName}...`)
  }

  return (
    <button 
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm"
    >
      <Eye className="w-3.5 h-3.5" /> View Profile
    </button>
  )
}
