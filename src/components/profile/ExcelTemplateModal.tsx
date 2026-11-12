'use client'

import { useState, useEffect } from 'react'
import { Download, FileSpreadsheet, Check, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ExcelTemplateModalProps {
  open: boolean
  onClose: () => void
  onDownload: () => void
}

const RULES = [
  {
    title: "Don't alter structure",
    desc: 'Do not rename, add, or delete columns or sheet names. Our parser relies on exact headers.',
  },
  {
    title: 'Use respective sheets',
    desc: 'Fill data in matching tabs: Personal Details, Experience, Education, Certifications, and Skills & Tech.',
  },
  {
    title: 'Date formatting',
    desc: 'Use MM/YYYY format for dates (for example, 05/2020) for clean ATS chronological parsing.',
  },
  {
    title: 'Mandatory fields',
    desc: 'Do not leave essential fields blank such as Company, Job Title, Degree, or Email.',
  },
  {
    title: 'Plain text formatting',
    desc: 'Keep cell values as plain text. Avoid merged cells, custom cell colors, or Excel formulas.',
  },
  {
    title: 'Bullet points in cells',
    desc: 'Use a hyphen (-) for achievements and Alt + Enter for new lines inside a cell.',
  },
]

export function ExcelTemplateModal({ open, onClose, onDownload }: ExcelTemplateModalProps) {
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const handleDownload = () => {
    if (agreed) {
      onDownload()
      onClose()
      setAgreed(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full sm:max-w-[700px] overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0F2744] px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4 pr-8">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">
                Download Excel Import Template
              </h2>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Follow these formatting rules before filling in your workbook so our importer maps your career data cleanly.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#F8FAFC]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {RULES.map((rule, idx) => (
              <div
                key={rule.title}
                className="group flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#0F2744]/25 hover:shadow-md transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-lg bg-[#EEF4FA] border border-[#0F2744]/10 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-black text-[#0F2744] tabular-nums group-hover:bg-[#0F2744] group-hover:text-[#F59E0B] transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-slate-900">{rule.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-medium">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Agreement Checkbox */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 mb-5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <div
                  className={cn(
                    'w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center',
                    agreed
                      ? 'bg-[#0F2744] border-[#0F2744]'
                      : 'bg-white border-amber-300 group-hover:border-amber-500'
                  )}
                >
                  <Check
                    className={cn(
                      'w-3.5 h-3.5 text-[#F59E0B] transition-opacity',
                      agreed ? 'opacity-100' : 'opacity-0'
                    )}
                    strokeWidth={3.5}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-amber-950 select-none leading-relaxed">
                I understand that I should keep all column headers and sheet tabs unchanged and only fill in my profile details.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={!agreed}
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#0F2744] hover:bg-[#0A1C33] disabled:opacity-45 disabled:cursor-not-allowed rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#F59E0B]" />
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
