'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { UserMenu } from './UserMenu'
import { Sparkles } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  greeting?: boolean
  eyebrow?: string
  actions?: React.ReactNode
}

export function DashboardHeader({
  title,
  subtitle,
  greeting,
  eyebrow,
  actions,
}: DashboardHeaderProps) {
  const [fullName, setFullName] = useState('User')

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
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
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-[#0F2744]/70 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span>{eyebrow || 'Soltkiz Career Studio'}</span>
        </div>

        <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>

        {greeting && (
          <p className="text-[13px] font-medium text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
            <span>Welcome back,</span>
            <span className="font-bold text-[#0F2744] bg-[#EEF4FA] border border-[#0F2744]/10 px-2 py-0.5 rounded-md">
              {fullName}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Ready to tailor
            </span>
          </p>
        )}

        {!greeting && subtitle && (
          <p className="text-[13px] font-medium text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
        {actions}
        <UserMenu />
      </div>
    </header>
  )
}
