'use client'

import React, { Suspense, useState } from 'react'
import { CheckCircle2, Eye, Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import { RESUME_TEMPLATES, getTemplateById } from './templates/registry'
import { buildResumeDataFromProfile } from './templates/buildResumeDataFromProfile'
import { TemplatePreviewModal } from './TemplatePreviewModal'

interface TemplateSelectorProps {
  selectedId: string
  onChange: (id: string) => void
  isSubscribed?: boolean
  onRequiresUpgrade?: () => void
  resumeType?: 'c2c' | 'fulltime'
  profileData?: any
}

function TemplateThumbnail({ id, profileData }: { id: string; profileData?: any }) {
  const TemplateComponent = getTemplateById(id).component
  const { profileData: pData, resumeData: rData } = buildResumeDataFromProfile(profileData, id)
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex justify-center">
      <div 
        className="absolute top-0 origin-top pointer-events-none select-none" 
        style={{ width: '850px', transform: 'scale(0.24)' }}
      >
        <Suspense fallback={<div className="w-full h-full bg-slate-100 animate-pulse" />}>
          <TemplateComponent 
            resumeData={rData} 
            profileData={pData} 
          />
        </Suspense>
      </div>
    </div>
  )
}

export function TemplateSelector({ selectedId, onChange, isSubscribed = true, onRequiresUpgrade, resumeType = 'fulltime', profileData }: TemplateSelectorProps) {
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)

  const handleTemplateClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setPreviewTemplateId(id)
  }

  const handleSelectTemplate = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    onChange(id)
    setPreviewTemplateId(null)
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[18px] font-black text-slate-900 mb-1">Choose a Template</h2>
            <p className="text-[13px] font-medium text-slate-500">Pick the layout your resume will be generated into. Click <strong className="text-slate-800">Preview</strong> to inspect the full A4 sheet or <strong className="text-emerald-700">Use</strong> to select.</p>
          </div>
          <span className="text-[12px] font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/80 self-start sm:self-auto">
            5 ATS Certified Layouts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {RESUME_TEMPLATES.filter(t => 
            resumeType === 'c2c' ? t.id.startsWith('c2c') : !t.id.startsWith('c2c')
          ).map((template) => {
            const isSelected = template.id === selectedId
            return (
              <div
                key={template.id}
                onClick={() => onChange(template.id)}
                className={cn(
                  "relative rounded-2xl border-2 text-left transition-all duration-200 overflow-hidden group flex flex-col hover:-translate-y-1 shadow-xs hover:shadow-md cursor-pointer",
                  isSelected 
                    ? "border-emerald-500 bg-emerald-50/10 ring-2 ring-emerald-500/20" 
                    : "border-slate-200 hover:border-slate-300 bg-white"
                )}
              >
                {/* Thumbnail Area with Hover Overlay */}
                <div className="h-44 w-full border-b border-slate-100 bg-slate-50 overflow-hidden relative">
                  <TemplateThumbnail id={template.id} profileData={profileData} />
                  
                  {/* Floating Action Buttons on Thumbnail Hover */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-[1.5px]">
                    <button
                      type="button"
                      onClick={(e) => handleTemplateClick(template.id, e)}
                      className="bg-white/95 hover:bg-white text-slate-900 text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm transform translate-y-1 group-hover:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                      title="Preview Template"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-700" />
                      <span>Preview</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={(e) => handleSelectTemplate(template.id, e)}
                      className={cn(
                        "text-[12px] font-bold px-3.5 py-1.5 rounded-lg shadow-md transform translate-y-1 group-hover:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95",
                        isSelected 
                          ? "bg-emerald-600 text-white ring-1 ring-white/50" 
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      )}
                      title="Use this Template"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isSelected ? 'Selected' : 'Use'}</span>
                    </button>
                  </div>
                </div>

                {/* Card Body with Template Details */}
                <div className="p-4 flex-1 flex flex-col justify-start bg-white">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-[14px] font-black text-slate-900 leading-tight truncate">{template.name}</h3>
                    {isSelected && (
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-medium text-slate-500 leading-snug">{template.description}</p>
                </div>

                {/* Selected Corner Badge */}
                {isSelected && (
                  <div className="absolute right-2.5 top-2.5 text-emerald-600 bg-white rounded-full shadow-md pointer-events-none p-0.5">
                    <CheckCircle2 className="w-5 h-5" fill="currentColor" stroke="white" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {previewTemplateId && (
        <TemplatePreviewModal 
          templateId={previewTemplateId} 
          onClose={() => setPreviewTemplateId(null)} 
          onSelect={handleSelectTemplate} 
          profileData={profileData}
        />
      )}
    </>
  )
}
