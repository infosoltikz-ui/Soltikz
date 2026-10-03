'use client'

import { useState, useEffect } from 'react'
import { Download, FileSpreadsheet, Check, X } from 'lucide-react'

interface ExcelTemplateModalProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export function ExcelTemplateModal({ open, onClose, onDownload }: ExcelTemplateModalProps) {
  const [agreed, setAgreed] = useState(false)

  // Prevent background scrolling when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  const handleDownload = () => {
    if (agreed) {
      onDownload()
      onClose()
      setAgreed(false) // reset for next time
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full sm:max-w-[700px] overflow-hidden bg-white rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-6 pb-5 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
              <FileSpreadsheet className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Download Excel Template</h2>
              <p className="text-slate-500 text-[13px] mt-1.5 leading-relaxed pr-6">
                Please follow these instructions carefully before downloading to ensure our system can read your data perfectly upon upload.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            
            <div className="group flex items-start gap-3 p-3.5 rounded-xl border border-rose-200/60 bg-rose-50/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-500/10 hover:bg-rose-50/80 cursor-default">
              <div className="w-6 h-6 rounded-full bg-white border border-rose-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <span className="text-[12px] font-bold text-rose-700">1</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-rose-900 transition-colors">Don't alter structure</h4>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">No renaming, adding, or deleting columns/sheets. We rely on this exact format.</p>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3.5 rounded-xl border border-emerald-200/60 bg-emerald-50/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 hover:bg-emerald-50/80 cursor-default">
              <div className="w-6 h-6 rounded-full bg-white border border-emerald-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <span className="text-[12px] font-bold text-emerald-700">2</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Use respective sheets</h4>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">Fill data in specific tabs (e.g. Personal Details, Experience, Education, Certifications, Skills & Tech).</p>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3.5 rounded-xl border border-blue-200/60 bg-blue-50/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 hover:bg-blue-50/80 cursor-default">
              <div className="w-6 h-6 rounded-full bg-white border border-blue-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <span className="text-[12px] font-bold text-blue-700">3</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-blue-900 transition-colors">Date Formatting</h4>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">Use the MM/YYYY format for dates (e.g., 05/2020) for perfect ATS parsing.</p>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3.5 rounded-xl border border-amber-200/60 bg-amber-50/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 hover:bg-amber-50/80 cursor-default">
              <div className="w-6 h-6 rounded-full bg-white border border-amber-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <span className="text-[12px] font-bold text-amber-700">4</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-amber-900 transition-colors">Mandatory Fields</h4>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">Don't leave crucial fields blank (e.g., Company, Job Title, Degree, Email).</p>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3.5 rounded-xl border border-purple-200/60 bg-purple-50/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 hover:bg-purple-50/80 cursor-default">
              <div className="w-6 h-6 rounded-full bg-white border border-purple-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <span className="text-[12px] font-bold text-purple-700">5</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-purple-900 transition-colors">No Custom Formatting</h4>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">Keep data as plain text. Avoid merged cells, colors, or Excel formulas.</p>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3.5 rounded-xl border border-cyan-200/60 bg-cyan-50/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 hover:bg-cyan-50/80 cursor-default">
              <div className="w-6 h-6 rounded-full bg-white border border-cyan-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <span className="text-[12px] font-bold text-cyan-700">6</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-cyan-900 transition-colors">Bullet Points</h4>
                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">Use a hyphen (-) for lists and "Alt + Enter" for new lines within a cell.</p>
              </div>
            </div>

          </div>

          {/* Checkbox Area */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <div className="w-5 h-5 rounded border-2 border-amber-300 bg-white group-hover:border-amber-400 peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-colors flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                </div>
              </div>
              <span className="text-[13px] font-medium text-amber-900 select-none">
                I understand that I should not modify the template structure (columns/sheet names) and will only fill in my data.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={!agreed}
              className="px-5 py-2 text-[13px] font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
