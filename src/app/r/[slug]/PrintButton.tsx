'use client'

import { Download } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden fixed top-6 right-6 z-50 h-11 px-5 rounded-xl bg-primary text-white font-bold text-[14px] shadow-lg shadow-primary/30 hover:shadow-xl transition-all flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Save as PDF
    </button>
  )
}
