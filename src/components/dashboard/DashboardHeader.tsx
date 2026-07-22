import { Search, Bell, Settings, User } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/utils/supabase/server'

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export async function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let fullName = 'User'
  
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
      
    if (profile) {
      fullName = profile.full_name || user.user_metadata?.full_name || 'User'
    } else {
      fullName = user.user_metadata?.full_name || 'User'
    }
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=16A34A&color=fff&bold=true`

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pl-12 md:pl-0">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-[14px] font-medium text-slate-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Search */}
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search..." 
            className="pl-9 h-10 w-full bg-white border-slate-200 rounded-xl text-[13px]"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0 shadow-sm">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 cursor-pointer shadow-sm">
          <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  )
}
