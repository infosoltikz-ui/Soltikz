'use client'

import React, { useState, useEffect } from 'react'
import { X, ZoomIn, ZoomOut, Check, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RESUME_TEMPLATES, getTemplateById } from './templates/registry'
import { buildResumeDataFromProfile } from './templates/buildResumeDataFromProfile'

interface TemplatePreviewModalProps {
  templateId: string
  onClose: () => void
  onSelect: (id: string) => void
  profileData?: any
}

export function TemplatePreviewModal({ templateId, onClose, onSelect, profileData }: TemplatePreviewModalProps) {
  const [zoom, setZoom] = useState(0.95)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const template = RESUME_TEMPLATES.find(t => t.id === templateId)
  if (!template) return null

  const TemplateComponent = getTemplateById(templateId).component
  const { profileData: pData, resumeData: rData } = buildResumeDataFromProfile(profileData, templateId)

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.15, 1.5))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.15, 0.5))
  const handleZoomReset = () => setZoom(0.95)

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      {/* Container */}
      <div 
        className="bg-white dark:bg-[#151D28] w-full max-w-5xl h-full max-h-[92vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative border border-[#D8DEE7] dark:border-[#26313F] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Options */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-slate-50 dark:bg-[#101722] border-b border-[#D8DEE7] dark:border-[#26313F] z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A2330] border border-[#D8DEE7] dark:border-[#26313F] flex items-center justify-center text-[#0A6E4E] dark:text-[#3FA57C] shadow-2xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-black text-[#16202E] dark:text-[#E4EAF2] whitespace-nowrap">{template.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F4EA] dark:bg-[#1A2330] border border-[#CEEAD6] dark:border-[#3FA57C]/40 text-[#0A6E4E] dark:text-[#3FA57C] shrink-0 whitespace-nowrap shadow-2xs">
                  ATS Verified
                </span>
              </div>
              <p className="text-[12.5px] font-medium text-[#64748B] dark:text-[#9FACBE] truncate whitespace-nowrap block mt-0.5">
                {template.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center bg-white dark:bg-[#1A2330] rounded-xl p-1 mr-1 border border-[#D8DEE7] dark:border-[#26313F] shadow-2xs shrink-0">
              <button 
                onClick={handleZoomOut} 
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#222E3F] rounded-lg text-[#64748B] hover:text-[#16202E] dark:text-[#9FACBE] dark:hover:text-[#E4EAF2] transition-all cursor-pointer" 
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleZoomReset} 
                className="px-2.5 py-1 text-[12px] font-bold text-[#16202E] dark:text-[#E4EAF2] hover:text-[#0A6E4E] dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap" 
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button 
                onClick={handleZoomIn} 
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#222E3F] rounded-lg text-[#64748B] hover:text-[#16202E] dark:text-[#9FACBE] dark:hover:text-[#E4EAF2] transition-all cursor-pointer" 
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <Button 
              onClick={() => onSelect(template.id)} 
              leftIcon={<Check className="w-4 h-4 text-[#D9A441] shrink-0" strokeWidth={2.5} />}
              className="h-10 px-5 rounded-xl font-bold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#0D8A62] dark:border-[#3FA57C]/40 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2"
            >
              Use This Template
            </Button>
            
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#1A2330] hover:bg-slate-100 dark:hover:bg-[#222E3F] border border-[#D8DEE7] dark:border-[#26313F] text-[#64748B] hover:text-[#16202E] dark:text-[#9FACBE] dark:hover:text-[#E4EAF2] transition-colors shrink-0 cursor-pointer shadow-2xs"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area: Vertical Flow Document Canvas */}
        <div className="flex-1 overflow-y-auto bg-[#E8EEF5] dark:bg-[#0D131B] p-5 sm:p-10 flex justify-center items-start">
          <div 
            className="transition-transform duration-200 origin-top shadow-[0_15px_45px_rgba(15,23,42,0.18)] dark:shadow-2xl rounded-sm bg-white border border-slate-300 dark:border-[#26313F]"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              marginBottom: '40px'
            }}
          >
            <TemplateComponent 
              resumeData={rData} 
              profileData={pData} 
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 bg-slate-50 dark:bg-[#101722] border-t border-[#D8DEE7] dark:border-[#26313F] z-10 shrink-0 text-[12.5px] font-medium text-[#64748B] dark:text-[#9FACBE]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A6E4E] dark:bg-[#3FA57C] animate-pulse" />
            <span className="text-[#0A6E4E] dark:text-[#8FD3B6] font-semibold">Standard A4 Vertical Layout & Page Margins</span>
          </div>
          <div className="text-[#64748B] dark:text-[#78859A]">
            Scroll vertically to inspect full resume
          </div>
        </div>

      </div>
    </div>
  )
}
