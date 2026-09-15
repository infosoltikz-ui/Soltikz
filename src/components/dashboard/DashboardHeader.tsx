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
        
        if (profile?.full_name) {
          setFullName(profile.full_name)
        } else if (user.user_metadata?.full_name) {
          setFullName(user.user_metadata.full_name)
        } else if (user.email) {
          setFullName(user.email.split('@')[0])
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pl-12 md:pl-0 pb-5 border-b border-slate-200">
      <div>
        <h1 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>
        {greeting && (
          <p className="text-[13px] font-medium text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-800">{fullName}</span>
          </p>
        )}
        {!greeting && subtitle && (
          <p className="text-[13px] font-medium text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>

      <UserMenu />
    </header>
  )
}
