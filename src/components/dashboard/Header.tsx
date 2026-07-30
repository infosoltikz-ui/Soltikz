import { Search } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export async function DashboardHeader() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let fullName = 'User'
  let plan = 'Free Plan'
  
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, plan_id')
      .eq('id', user.id)
      .single()
      
    if (profile) {
      fullName = profile.full_name || user.user_metadata?.full_name || 'User'
      plan = profile.plan_id === 'PRO_MONTHLY' ? 'Premium Plan' : 'Free Plan'
    } else {
      fullName = user.user_metadata?.full_name || 'User'
    }
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=16A34A&color=fff&bold=true`

  return (
    <header className="flex items-center justify-between py-8">
      {/* Left: Titles */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard</h1>
        <p className="text-[15px] font-bold text-slate-700">
          Welcome back, {fullName}! <span className="inline-block animate-wave">👋</span>
        </p>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="relative w-64 hidden md:block">
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full h-11 pl-5 pr-10 rounded-full border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>


        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <img 
            src={avatarUrl} 
            alt={fullName} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div className="hidden sm:block">
            <div className="text-[14px] font-black text-slate-900 leading-tight">{fullName}</div>
            <div className="text-[11px] font-bold text-slate-500">{plan}</div>
          </div>
        </div>

      </div>
    </header>
  )
}
