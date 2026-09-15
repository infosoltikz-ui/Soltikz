'use client'

import React, { useState } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RESUME_TEMPLATES, getTemplateById } from './templates/registry'
import { sampleResumeData, sampleProfileData, c2cSampleData } from './templates/sampleData'

interface TemplatePreviewModalProps {
  templateId: string
  onClose: () => void
  onSelect: (id: string) => void
}

export function TemplatePreviewModal({ templateId, onClose, onSelect }: TemplatePreviewModalProps) {
  const [page, setPage] = useState<1 | 2>(1)
  const [zoom, setZoom] = useState(1)

  const template = RESUME_TEMPLATES.find(t => t.id === templateId)
  if (!template) return null

  const TemplateComponent = getTemplateById(templateId).component
  
  // A4 aspect ratio at 850px width is roughly 1202px height
  const PAGE_HEIGHT = 1123;
  const PAGE_WIDTH = 794;

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.25, 2.5))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 0.5))
  const handleZoomReset = () => setZoom(1)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-8">
      {/* Container */}
      <div className="bg-slate-100 w-full max-w-5xl h-full max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Options */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-[18px] font-black text-slate-900">{template.name}</h2>
              <p className="text-[13px] font-medium text-slate-500 hidden sm:block">{template.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 mr-2">
              <button onClick={handleZoomOut} className="p-1.5 hover:bg-white rounded-md text-slate-600 hover:text-slate-900 transition-colors" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={handleZoomReset} className="px-2 py-1 text-[12px] font-bold text-slate-600 hover:text-slate-900 transition-colors" title="Reset Zoom">
                {Math.round(zoom * 100)}%
              </button>
              <button onClick={handleZoomIn} className="p-1.5 hover:bg-white rounded-md text-slate-600 hover:text-slate-900 transition-colors" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <Button onClick={() => onSelect(template.id)} className="h-10 px-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
              Use This Template
            </Button>
            
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-slate-200/50 p-8 flex items-start justify-center relative">
          {/* Zoom Wrapper */}
          <div 
            className="transition-transform duration-200 origin-top flex justify-center"
            style={{ transform: `scale(${zoom})`, width: '850px' }}
          >
            {/* Paginated Window */}
            <div 
              className="relative shadow-xl bg-white overflow-hidden rounded-sm"
              style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px` }}
            >
              {/* Content always translates on X axis because all templates use A4 CSS multi-column */}
              <div 
                className="absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${(page - 1) * PAGE_WIDTH}px)` }}
              >
                <TemplateComponent 
                  resumeData={templateId === 'c2c' ? c2cSampleData : sampleResumeData} 
                  profileData={sampleProfileData} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-center px-6 py-4 bg-white border-t border-slate-200 z-10 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setPage(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors ${page === 1 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Page 1
            </button>
            <button 
              onClick={() => setPage(2)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors ${page === 2 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Page 2
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
