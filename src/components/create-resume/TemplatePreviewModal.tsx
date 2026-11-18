'use client'

import React, { useState } from 'react'
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

  const template = RESUME_TEMPLATES.find(t => t.id === templateId)
  if (!template) return null

  const TemplateComponent = getTemplateById(templateId).component
  const { profileData: pData, resumeData: rData } = buildResumeDataFromProfile(profileData, templateId)

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.15, 1.5))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.15, 0.5))
  const handleZoomReset = () => setZoom(0.95)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      {/* Container */}
      <div className="bg-[#151D28] w-full max-w-5xl h-full max-h-[92vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative border border-[#26313F] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Options */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#101722] border-b border-[#26313F] z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#1A2330] border border-[#26313F] flex items-center justify-center text-[#3FA57C] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-black text-[#E4EAF2] whitespace-nowrap">{template.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1A2330] border border-[#3FA57C]/40 text-[#3FA57C] shrink-0 whitespace-nowrap">
                  ATS Verified
                </span>
              </div>
              <p className="text-[12.5px] font-medium text-[#9FACBE] truncate whitespace-nowrap block">
                {template.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center bg-[#1A2330] rounded-xl p-1 mr-1 border border-[#26313F] shrink-0">
              <button 
                onClick={handleZoomOut} 
                className="p-1.5 hover:bg-[#222E3F] rounded-lg text-[#9FACBE] hover:text-[#E4EAF2] transition-all cursor-pointer" 
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleZoomReset} 
                className="px-2.5 py-1 text-[12px] font-bold text-[#E4EAF2] hover:text-white transition-colors cursor-pointer whitespace-nowrap" 
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button 
                onClick={handleZoomIn} 
                className="p-1.5 hover:bg-[#222E3F] rounded-lg text-[#9FACBE] hover:text-[#E4EAF2] transition-all cursor-pointer" 
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <Button 
              onClick={() => onSelect(template.id)} 
              leftIcon={<Check className="w-4 h-4 text-[#D9A441] shrink-0" strokeWidth={2.5} />}
              className="h-10 px-5 rounded-xl font-bold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2"
            >
              Use This Template
            </Button>
            
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A2330] hover:bg-[#222E3F] border border-[#26313F] text-[#9FACBE] hover:text-[#E4EAF2] transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area: Vertical Flow Document Canvas */}
        <div className="flex-1 overflow-y-auto bg-[#0D131B] p-6 sm:p-10 flex justify-center items-start">
          <div 
            className="transition-transform duration-200 origin-top shadow-2xl rounded-sm bg-white border border-[#26313F]"
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
        <div className="flex items-center justify-between px-6 py-3 bg-[#101722] border-t border-[#26313F] z-10 shrink-0 text-[12.5px] font-medium text-[#9FACBE]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FA57C] animate-pulse" />
            <span>Standard A4 Vertical Layout & Page Margins</span>
          </div>
          <div className="text-[#78859A]">
            Scroll vertically to inspect full resume
          </div>
        </div>

      </div>
    </div>
  )
}
