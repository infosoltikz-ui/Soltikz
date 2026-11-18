'use client'

import { ArrowLeft, ChevronRight, Check, Layout, FileCheck, ChevronDown, Settings, LogOut, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { isPremiumPlan } from '@/utils/pricingPlans'
import { HowToGuideModal } from './HowToGuideModal'

interface CreateResumeHeaderProps {
  currentStep?: number
  onStepClick?: (step: number) => void
  onBack?: () => void
}

const STEPS = [
  { step: 1, label: 'Setup & Target' },
  { step: 2, label: 'Job Details' },
  { step: 3, label: 'Interview Prep' },
]

function CompactUserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [user, setUser] = useState({ name: 'User', plan: 'Free Plan', email: '' })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user: u } } = await supabase.auth.getUser()
      if (u) {
        const { data: p } = await supabase.from('profiles').select('full_name, plan_id').eq('id', u.id).single()
        setUser({
          name: p?.full_name || u.user_metadata?.full_name || 'User',
          email: u.email || '',
          plan: isPremiumPlan(p?.plan_id) ? 'Pro Plan' : 'Free Plan',
        })
      }
    }
    load()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 h-10 pl-1.5 pr-3 rounded-xl border border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] transition-all shadow-xs cursor-pointer"
      >
        {/* Avatar circle */}
        <div className="w-8 h-8 rounded-xl bg-[#0A6E4E] border border-[#3FA57C]/30 flex items-center justify-center text-white text-[12px] font-black shrink-0 shadow-xs">
          {initials}
        </div>
        {/* Name + plan */}
        <div className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-[13px] font-bold text-[#E4EAF2] whitespace-nowrap max-w-[130px] truncate">{user.name}</span>
          <span className="text-[10.5px] font-bold text-[#D9A441] mt-0.5">{user.plan}</span>
        </div>
        <ChevronDown className={cn('w-3.5 h-3.5 text-[#78859A] transition-transform shrink-0', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-[#151D28] rounded-2xl shadow-2xl border border-[#26313F] py-1.5 z-50 overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-[#26313F] mb-1 bg-[#1A2330]">
            <p className="text-[12.5px] font-bold text-[#E4EAF2] truncate">{user.name}</p>
            <p className="text-[11px] text-[#78859A] truncate">{user.email}</p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-semibold text-[#9FACBE] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors"
            onClick={() => setOpen(false)}
          >
            <Layout className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-semibold text-[#9FACBE] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors"
            onClick={() => setOpen(false)}
          >
            <FileCheck className="w-3.5 h-3.5" /> Master Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-semibold text-[#9FACBE] hover:bg-[#1A2330] hover:text-[#E4EAF2] transition-colors"
            onClick={() => setOpen(false)}
          >
            <Settings className="w-3.5 h-3.5" /> Settings
          </Link>
          <div className="h-px bg-[#26313F] my-1 mx-3" />
          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export function CreateResumeHeader({
  currentStep = 1,
  onStepClick,
  onBack,
}: CreateResumeHeaderProps) {
  const [guideOpen, setGuideOpen] = useState(false)

  return (
    <>
    <HowToGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    <header className="sticky top-0 z-40 bg-[#151D28]/95 backdrop-blur-md border-b border-[#26313F]">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 shrink-0">
          {onBack ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/dashboard"
              aria-label="Back to dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}

          <span className="hidden sm:inline text-[15px] font-bold text-[#E4EAF2] tracking-tight">
            Resume Studio
          </span>
        </div>

        {/* Center: Step Pills */}
        <nav className="flex-1 flex items-center justify-center min-w-0" aria-label="Progress">
          <div className="flex items-center gap-1.5">
            {STEPS.map((item, idx) => {
              const done = currentStep > item.step
              const active = currentStep === item.step
              const upcoming = currentStep < item.step
              const clickable = done && !!onStepClick

              return (
                <div key={item.step} className="flex items-center">
                  <button
                    onClick={() => clickable && onStepClick?.(item.step)}
                    disabled={upcoming}
                    className={cn(
                      'flex items-center gap-2 h-9 px-3.5 rounded-xl text-[12.5px] font-semibold transition-colors border select-none',
                      active && 'bg-[#0A6E4E] text-white border-[#0D8A62] shadow-2xs',
                      done && 'bg-[#1A2330] text-[#8FD3B6] border-[#26313F] hover:bg-[#222E3F] cursor-pointer',
                      upcoming && 'bg-transparent text-[#78859A] border-transparent cursor-default',
                    )}
                  >
                    <span
                      className={cn(
                        'w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0',
                        active && 'bg-white/20 text-[#D9A441]',
                        done && 'bg-[#123227] text-[#8FD3B6]',
                        upcoming && 'bg-[#1A2330] text-[#78859A]'
                      )}
                    >
                      {done ? <Check className="w-3 h-3 stroke-[2.75]" /> : item.step}
                    </span>
                    <span className="hidden md:block whitespace-nowrap">{item.label}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#3F4D60] mx-0.5 shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Right: Guide + User */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setGuideOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] hover:text-white text-[12.5px] font-semibold transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#78859A] shrink-0" />
            <span>How it Works</span>
          </button>
          <CompactUserMenu />
        </div>

      </div>
    </header>
    </>

  )
}
