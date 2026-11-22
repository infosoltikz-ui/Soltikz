'use client'

import { ThemeToggle } from './ThemeToggle'

export function FloatingThemeToggle() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <ThemeToggle
        compact
        showLabel={false}
        className="h-11 w-11 !p-0 rounded-full shadow-xl flex items-center justify-center backdrop-blur-md ring-2 ring-[#3FA57C]/20 hover:scale-105 active:scale-95 transition-all"
      />
    </div>
  )
}
