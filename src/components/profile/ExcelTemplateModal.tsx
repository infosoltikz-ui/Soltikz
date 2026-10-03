'use client'

import { useState } from 'react'
import { Download, AlertCircle, FileSpreadsheet, Check, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'

interface ExcelTemplateModalProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export function ExcelTemplateModal({ open, onClose, onDownload }: ExcelTemplateModalProps) {
  const [agreed, setAgreed] = useState(false)

  const handleDownload = () => {
    if (agreed) {
      onDownload()
      onClose()
      setAgreed(false) // reset for next time
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-2xl">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-bold">Download Excel Template</DialogTitle>
          </div>
          <p className="text-slate-300 text-[13px] ml-13">
            Please read these instructions carefully before downloading to ensure our system can read your data perfectly.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[12px] font-bold text-slate-700">1</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-slate-900">Do not rename column headers</h4>
                <p className="text-[13px] text-slate-500 mt-0.5">Our system relies on exact column names (like "Job Title" or "Start Date"). If you change them, the upload will fail.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[12px] font-bold text-slate-700">2</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-slate-900">Use multiple sheets for different sections</h4>
                <p className="text-[13px] text-slate-500 mt-0.5">The Excel file has different tabs at the bottom (Personal Info, Experience, Education). Fill the data in their respective tabs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[12px] font-bold text-slate-700">3</span>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-slate-900">Date Formats</h4>
                <p className="text-[13px] text-slate-500 mt-0.5">Please use MM/YYYY format for dates (e.g., 05/2020) to ensure perfect ATS parsing.</p>
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
      </DialogContent>
    </Dialog>
  )
}
