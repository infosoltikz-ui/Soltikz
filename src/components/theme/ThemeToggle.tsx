'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
  compact?: boolean
  variant?: 'default' | 'rail'
}

export function ThemeToggle({ className, showLabel = true, compact = false, variant = 'default' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('soltikz_theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      applyTheme(stored)
    } else {
      setTheme('dark')
      applyTheme('dark')
    }

    const handleThemeChange = () => {
      const current = localStorage.getItem('soltikz_theme') as 'dark' | 'light'
      if (current) setTheme(current)
    }

    window.addEventListener('theme-change', handleThemeChange)
    return () => window.removeEventListener('theme-change', handleThemeChange)
  }, [])

  const applyTheme = (nextTheme: 'dark' | 'light') => {
    const root = document.documentElement
    if (nextTheme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
      root.style.colorScheme = 'light'
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      root.style.colorScheme = 'dark'
    }
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('soltikz_theme', nextTheme)
    applyTheme(nextTheme)
    window.dispatchEvent(new Event('theme-change'))
  }

  if (!mounted) {
    if (variant === 'rail') {
      return (
        <button
          type="button"
          aria-label="Toggle theme"
          className={cn(
            'inline-flex items-center gap-2 px-2.5 py-2 rounded-xl border border-[#26313F] bg-[#1E2938] text-[#9FACBE] text-xs font-bold transition-all shadow-2xs',
            className
          )}
        >
          <Moon className="w-3.5 h-3.5 text-[#D9A441]" />
          {showLabel && !compact && <span>Dark Mode</span>}
        </button>
      )
    }

    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          'inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#26313F] bg-[#1A2330] text-[#9FACBE] text-xs font-bold transition-all shadow-2xs',
          className
        )}
      >
        <Moon className="w-3.5 h-3.5 text-[#D9A441]" />
        {showLabel && !compact && <span>Dark</span>}
      </button>
    )
  }

  const isDark = theme === 'dark'

  if (variant === 'rail') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
        className={cn(
          'group inline-flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#26313F] bg-[#1E2938] hover:bg-[#253244] text-[#E4EAF2] hover:border-[#3FA57C]/40 transition-all duration-200 cursor-pointer shadow-2xs select-none',
          className
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110',
            isDark
              ? 'bg-[#2E2616] text-[#D9A441] border-[#D9A441]/30'
              : 'bg-[#152538] text-[#60A5FA] border-[#60A5FA]/30'
          )}
        >
          {isDark ? (
            <Sun className="w-3 h-3 text-[#D9A441] transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="w-3 h-3 text-[#60A5FA] transition-transform duration-300 group-hover:-rotate-12" />
          )}
        </div>

        {showLabel && (
          <span className="text-[12px] font-bold text-[#C3CCD9] group-hover:text-white transition-colors">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
      className={cn(
        'group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-2xs select-none',
        isDark
          ? 'border-[#26313F] bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] hover:border-[#3FA57C]/40'
          : 'border-[#D8DEE7] bg-white hover:bg-slate-100 text-[#16202E] hover:border-[#0A6E4E]/40',
        className
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110',
          isDark
            ? 'bg-[#2E2616] text-[#D9A441] border-[#D9A441]/30'
            : 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]'
        )}
      >
        {isDark ? (
          <Sun className="w-3 h-3 text-[#D9A441] transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-3 h-3 text-[#0F2744] transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span
          className={cn(
            'text-[12px] font-bold transition-colors',
            isDark
              ? 'text-[#9FACBE] group-hover:text-[#E4EAF2]'
              : 'text-[#4B5768] group-hover:text-[#16202E]'
          )}
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  )
}
