'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { UserMenu } from './UserMenu'

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  greeting?: boolean;
}

export function DashboardHeader({ title, subtitle, greeting }: DashboardHeaderProps) {
  const [fullName, setFullName] = useState('User')

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          setFullName(profile.full_name || user.user_metadata?.full_name || 'User')
        } else {
          setFullName(user.user_metadata?.full_name || 'User')
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pl-12 md:pl-0 pb-6 border-b border-slate-200">
      <div>
        <h1 className="text-[26px] font-black text-slate-900 tracking-tight leading-tight">{title}</h1>
        {greeting && (
          <p className="text-[14px] font-medium text-slate-500 mt-1.5">
            Welcome back, <span className="font-bold text-slate-700">{fullName}</span> <span className="inline-block animate-wave">👋</span>
          </p>
        )}
        {!greeting && subtitle && <p className="text-[14px] font-medium text-slate-500 mt-1.5">{subtitle}</p>}
      </div>

      <UserMenu />
    </header>
  )
}
