'use client'

import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { RESUME_TEMPLATES, getTemplateById } from './templates/registry'
import { sampleResumeData, sampleProfileData, c2cSampleData } from './templates/sampleData'
import { TemplatePreviewModal } from './TemplatePreviewModal'
import { useState } from 'react'

interface TemplateSelectorProps {
  selectedId: string
  onChange: (id: string) => void
  isSubscribed?: boolean
  onRequiresUpgrade?: () => void
  resumeType?: 'c2c' | 'fulltime'
}

function TemplateThumbnail({ id }: { id: string }) {
  const TemplateComponent = getTemplateById(id).component
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex justify-center">
      <div 
        className="absolute top-0 origin-top pointer-events-none" 
        style={{ width: '850px', transform: 'scale(0.24)' }}
      >
        <TemplateComponent 
          resumeData={id === 'c2c' ? c2cSampleData : sampleResumeData} 
          profileData={sampleProfileData} 
        />
      </div>
    </div>
  )
}

export function TemplateSelector({ selectedId, onChange, isSubscribed = true, onRequiresUpgrade, resumeType = 'fulltime' }: TemplateSelectorProps) {
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)

  const handleTemplateClick = (id: string) => {
    // Open preview modal for all users
    setPreviewTemplateId(id)
  }

  const handleSelectTemplate = (id: string) => {
    onChange(id)
    setPreviewTemplateId(null)
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Choose a Template</h2>
          <p className="text-[13px] font-medium text-slate-500">Pick the layout your resume will be generated into. Click to preview.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {RESUME_TEMPLATES.filter(t => 
            resumeType === 'c2c' ? t.id === 'c2c' : t.id !== 'c2c'
          ).map((template) => {
            const isSelected = template.id === selectedId
            return (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                className={cn(
                  "relative rounded-xl border-2 text-left transition-all duration-200 overflow-hidden group flex flex-col hover:-translate-y-1 shadow-sm hover:shadow-md",
                  isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/40 bg-white"
                )}
              >
                <div className="h-36 w-full border-b border-slate-100 bg-slate-50 overflow-hidden relative">
                  <TemplateThumbnail id={template.id} />
                  
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 duration-200">
                      Preview
                    </div>
                  </div>
                </div>

                <div className="p-3 flex-1">
                  <h3 className="text-[13px] font-black text-slate-900 mb-0.5 leading-tight">{template.name}</h3>
                  <p className="text-[11px] font-medium text-slate-500 leading-snug">{template.description}</p>
                </div>

                {isSelected && (
                  <div className="absolute right-2 top-2 text-primary bg-white rounded-full">
                    <CheckCircle2 className="w-5 h-5" fill="currentColor" stroke="white" strokeWidth={1} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {previewTemplateId && (
        <TemplatePreviewModal 
          templateId={previewTemplateId} 
          onClose={() => setPreviewTemplateId(null)} 
          onSelect={handleSelectTemplate} 
        />
      )}
    </>
  )
}
