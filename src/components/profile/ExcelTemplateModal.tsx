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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full sm:max-w-[700px] overflow-hidden bg-[#151D28] rounded-3xl shadow-2xl border border-[#26313F] relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0D131B] px-6 py-5 text-[#E4EAF2] border-b border-[#26313F] relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 text-[#9FACBE] hover:text-white hover:bg-[#1A2330] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4 pr-8">
            <div className="w-11 h-11 rounded-2xl bg-[#123227] border border-[#3FA57C]/30 text-[#3FA57C] flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#E4EAF2] tracking-tight">
                Download Excel Import Template
              </h2>
              <p className="text-[#9FACBE] text-xs mt-1 leading-relaxed">
                Follow these formatting rules before filling in your workbook so our importer maps your career data cleanly.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#0D131B]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {RULES.map((rule, idx) => (
              <div
                key={rule.title}
                className="group flex items-start gap-3 p-3.5 rounded-2xl border border-[#26313F] bg-[#151D28] hover:border-[#3FA57C]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-lg bg-[#1A2330] border border-[#26313F] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-black text-[#3FA57C] tabular-nums group-hover:bg-[#0A6E4E] group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-[13px] font-extrabold text-[#E4EAF2]">{rule.title}</h4>
                  <p className="text-xs text-[#9FACBE] mt-0.5 leading-relaxed font-medium">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Agreement Checkbox */}
          <div className="bg-[#2E2616] border border-[#D9A441]/40 rounded-2xl p-4 mb-5">
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
                      ? 'bg-[#0A6E4E] border-[#3FA57C]'
                      : 'bg-[#1A2330] border-[#D9A441]/50 group-hover:border-[#D9A441]'
                  )}
                >
                  <Check
                    className={cn(
                      'w-3.5 h-3.5 text-white transition-opacity',
                      agreed ? 'opacity-100' : 'opacity-0'
                    )}
                    strokeWidth={3.5}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-[#D9A441] select-none leading-relaxed">
                I understand that I should keep all column headers and sheet tabs unchanged and only fill in my profile details.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-[#E4EAF2] hover:text-white bg-[#1A2330] hover:bg-[#222E3F] border border-[#26313F] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={!agreed}
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#0A6E4E] hover:bg-[#0D8A62] border border-[#3FA57C]/40 disabled:opacity-45 disabled:cursor-not-allowed rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D9A441]" />
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
