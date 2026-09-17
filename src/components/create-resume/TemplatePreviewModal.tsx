'use client'

import React, { useState } from 'react'
import { X, ZoomIn, ZoomOut, Check, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RESUME_TEMPLATES, getTemplateById } from './templates/registry'
import { sampleResumeData, sampleProfileData, c2cSampleData } from './templates/sampleData'

interface TemplatePreviewModalProps {
  templateId: string
  onClose: () => void
  onSelect: (id: string) => void
}

export function TemplatePreviewModal({ templateId, onClose, onSelect }: TemplatePreviewModalProps) {
  const [zoom, setZoom] = useState(0.95)

  const template = RESUME_TEMPLATES.find(t => t.id === templateId)
  if (!template) return null

  const TemplateComponent = getTemplateById(templateId).component

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.15, 1.5))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.15, 0.5))
  const handleZoomReset = () => setZoom(0.95)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6">
      {/* Container */}
      <div className="bg-slate-100 w-full max-w-5xl h-full max-h-[92vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Options */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-black text-slate-900">{template.name}</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  ATS Verified
                </span>
              </div>
              <p className="text-[12.5px] font-medium text-slate-500 hidden sm:block">{template.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 mr-2 border border-slate-200">
              <button 
                onClick={handleZoomOut} 
                className="p-1.5 hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer" 
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleZoomReset} 
                className="px-2.5 py-1 text-[12px] font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer" 
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button 
                onClick={handleZoomIn} 
                className="p-1.5 hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer" 
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <Button 
              onClick={() => onSelect(template.id)} 
              className="h-10 px-5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Use This Template
            </Button>
            
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area: Vertical Flow Document Canvas */}
        <div className="flex-1 overflow-y-auto bg-slate-200/60 p-6 sm:p-10 flex justify-center items-start">
          <div 
            className="transition-transform duration-200 origin-top shadow-2xl rounded-sm bg-white border border-slate-300"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              marginBottom: '40px'
            }}
          >
            <TemplateComponent 
              resumeData={templateId === 'c2c' ? c2cSampleData : sampleResumeData} 
              profileData={sampleProfileData} 
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-slate-200 z-10 shrink-0 text-[12.5px] font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Standard A4 Vertical Layout & Page Margins</span>
          </div>
          <div className="text-slate-400">
            Scroll vertically to inspect full resume
          </div>
        </div>

      </div>
    </div>
  )
}
