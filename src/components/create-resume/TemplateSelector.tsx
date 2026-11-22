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
      <div className="bg-white dark:bg-[#151D28] rounded-3xl border border-[#D8DEE7] dark:border-[#26313F] shadow-sm p-5 sm:p-7">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[#16202E] dark:text-[#E4EAF2] tracking-tight mb-1">
              Choose a Template
            </h2>
            <p className="text-[12.5px] font-medium text-[#4B5768] dark:text-[#9FACBE]">
              Pick the layout your resume will be generated into. Hover to{' '}
              <strong className="text-[#16202E] dark:text-[#E4EAF2] font-bold">Preview</strong> the full A4 sheet or{' '}
              <strong className="text-[#0A6E4E] dark:text-[#3FA57C] font-bold">Use</strong> to select.
            </p>
          </div>
          <span className="text-[11.5px] font-extrabold text-[#0F5132] dark:text-[#8FD3B6] bg-[#E6F4EA] dark:bg-[#123227] px-3.5 py-1.5 rounded-full border border-[#CEEAD6] dark:border-[#3FA57C]/30 self-start sm:self-auto shrink-0">
            5 ATS Certified Layouts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
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
                    ? "border-[#0A6E4E] dark:border-[#3FA57C] bg-white dark:bg-[#1A2330] ring-2 ring-[#0A6E4E]/20 dark:ring-[#3FA57C]/20" 
                    : "border-[#D8DEE7] dark:border-[#26313F] hover:border-[#94A3B8] dark:hover:border-[#3A495C] bg-[#F8FAFC] dark:bg-[#1A2330]/70 hover:bg-[#F1F5F9] dark:hover:bg-[#1A2330]"
                )}
              >
                {/* Thumbnail Area with Hover Overlay */}
                <div className="h-44 w-full border-b border-[#D8DEE7] dark:border-[#26313F] bg-white overflow-hidden relative">
                  <TemplateThumbnail id={template.id} profileData={profileData} />
                  
                  {/* Floating Action Buttons on Thumbnail Hover */}
                  <div className="absolute inset-0 bg-white/85 dark:bg-[#0D131B]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-[1.5px]">
                    <button
                      type="button"
                      onClick={(e) => handleTemplateClick(template.id, e)}
                      className="bg-[#F8FAFC] dark:bg-[#1A2330] hover:bg-[#EEF2F6] dark:hover:bg-[#222E3F] text-[#16202E] dark:text-[#E4EAF2] text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-md border border-[#D8DEE7] dark:border-[#26313F] transform translate-y-1 group-hover:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                      title="Preview Template"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0A6E4E] dark:text-[#3FA57C]" />
                      <span>Preview</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={(e) => handleSelectTemplate(template.id, e)}
                      className={cn(
                        "text-[12px] font-bold px-3.5 py-1.5 rounded-lg shadow-md transform translate-y-1 group-hover:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95",
                        isSelected 
                          ? "bg-[#D9A441] text-[#0D131B]" 
                          : "bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40"
                      )}
                      title="Use this Template"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isSelected ? 'Selected' : 'Use'}</span>
                    </button>
                  </div>
                </div>

                {/* Card Body with Template Details */}
                <div className="p-4 flex-1 flex flex-col justify-start bg-[#F8FAFC] dark:bg-[#1A2330]">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-[14px] font-bold text-[#16202E] dark:text-[#E4EAF2] leading-tight truncate">{template.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F5132] dark:text-[#8FD3B6] bg-[#E6F4EA] dark:bg-[#123227] px-2 py-0.5 rounded-md border border-[#CEEAD6] dark:border-[#3FA57C]/30 shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-medium text-[#4B5768] dark:text-[#9FACBE] leading-snug">{template.description}</p>
                </div>

                {/* Selected Corner Badge */}
                {isSelected && (
                  <div className="absolute right-2.5 top-2.5 text-[#3FA57C] bg-[#151D28] rounded-full shadow-md pointer-events-none p-0.5 ring-2 ring-[#3FA57C]/40">
                    <CheckCircle2 className="w-5 h-5" fill="currentColor" stroke="#151D28" strokeWidth={1.5} />
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
