'use client'

import { ArrowLeft, Check, Layout, Sparkles, ShieldCheck, FileCheck, ChevronDown, Settings, LogOut, BookOpen } from 'lucide-react'
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
  { step: 1, label: 'Setup & Target',      icon: Layout      },
  { step: 2, label: 'AI Resume',           icon: Sparkles    },
  { step: 3, label: 'Interview Prep',      icon: ShieldCheck },
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
          plan: isPremiumPlan(p?.plan_id) ? 'Premium' : 'Free Plan',
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
        className="flex items-center gap-2.5 h-10 pl-1.5 pr-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-xs hover:shadow-sm"
      >
        {/* Avatar circle */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[13px] font-black shrink-0 shadow-sm">
          {initials}
        </div>
        {/* Name + plan */}
        <div className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-[13px] font-bold text-slate-900 whitespace-nowrap max-w-[130px] truncate">{user.name}</span>
          <span className="text-[11px] font-medium text-slate-400 mt-0.5">{user.plan}</span>
        </div>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform shrink-0', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100 mb-1">
            <p className="text-[12px] font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          </div>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 px-3 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            onClick={() => setOpen(false)}
          >
            <Settings className="w-3.5 h-3.5" /> Settings
          </Link>
          <div className="h-px bg-slate-100 my-1 mx-3" />
          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log out
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center gap-4">

        {/* ── Left: back + logo ── */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[16px] font-black text-slate-900 tracking-tight">Resume Builder</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <Sparkles className="w-2.5 h-2.5" />
              AI Suite
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-slate-200 shrink-0" />

        {/* ── Center: step pills ── */}
        <nav className="flex-1 flex items-center justify-center min-w-0" aria-label="Progress">
          <div className="flex items-center gap-1">
            {STEPS.map((item, idx) => {
              const done     = currentStep > item.step
              const active   = currentStep === item.step
              const upcoming = currentStep < item.step
              const clickable = done && !!onStepClick
              const Icon = item.icon

              return (
                <div key={item.step} className="flex items-center">
                  <button
                    onClick={() => clickable && onStepClick?.(item.step)}
                    disabled={upcoming}
                    className={cn(
                      'flex items-center gap-2 h-9 px-4 rounded-xl text-[12px] font-bold transition-all duration-150 border select-none',
                      active   && 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-md shadow-emerald-500/25',
                      done     && 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 cursor-pointer',
                      upcoming && 'bg-transparent text-slate-400 border-slate-200/60 cursor-default opacity-50',
                    )}
                  >
                    <span className="w-4 h-4 rounded flex items-center justify-center shrink-0">
                      {done
                        ? <Check className="w-3 h-3 stroke-[3]" />
                        : <Icon className="w-3 h-3" />
                      }
                    </span>
                    <span className="hidden md:block">{item.label}</span>
                    <span className="md:hidden font-extrabold">{item.step}</span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <div className={cn(
                      'w-7 h-px mx-1',
                      currentStep > item.step ? 'bg-emerald-400' : 'bg-slate-200'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Divider */}
        <div className="hidden lg:block w-px h-5 bg-slate-200 shrink-0" />

        {/* ── Right: badge + user ── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* How It Works guide button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="hidden sm:flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-all text-[12px] font-bold shadow-xs"
            title="How to generate your resume"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden lg:block">How it Works</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 text-[12px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>ATS Certified</span>
          </div>
          <CompactUserMenu />
        </div>

      </div>
    </header>
    </>
  )
}
