'use client'

import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { RESUME_TEMPLATES } from './templates/registry'

interface TemplateSelectorProps {
  selectedId: string
  onChange: (id: string) => void
}

function TemplateThumbnail({ id }: { id: string }) {
  switch (id) {
    case 'modern':
      return (
        <div className="h-full w-full bg-white p-3 flex flex-col gap-1.5">
          <div className="h-1 w-full rounded-sm bg-teal-600" />
          <div className="h-2 w-2/3 rounded-sm bg-teal-600/80 mt-1" />
          <div className="h-1 w-1/2 bg-slate-200 rounded-sm" />
          <div className="h-1 w-full bg-teal-100 rounded-sm mt-2 border-b border-teal-600/40" />
          <div className="grid grid-cols-2 gap-1">
            <div className="h-1 bg-slate-200 rounded-sm" />
            <div className="h-1 bg-slate-200 rounded-sm" />
            <div className="h-1 bg-slate-200 rounded-sm" />
            <div className="h-1 bg-slate-200 rounded-sm" />
          </div>
          <div className="h-1 w-full bg-teal-100 rounded-sm mt-2 border-b border-teal-600/40" />
          <div className="h-1 w-11/12 bg-slate-200 rounded-sm" />
          <div className="h-1 w-4/5 bg-slate-200 rounded-sm" />
        </div>
      )
    case 'banner':
      return (
        <div className="h-full w-full bg-white flex flex-col">
          <div className="h-[38%] w-full flex flex-col items-center justify-center gap-1.5" style={{ backgroundColor: '#8b7355' }}>
            <div className="h-1.5 w-1/2 rounded-sm bg-white" />
            <div className="h-1 w-2/3 rounded-sm bg-white/70" />
          </div>
          <div className="flex-1 p-3 flex flex-col gap-1.5">
            <div className="h-1 w-1/3 bg-[#8b7355] rounded-sm" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
            <div className="h-1 w-1/3 bg-[#8b7355] rounded-sm mt-1" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-11/12 bg-slate-200 rounded-sm" />
          </div>
        </div>
      )
    case 'certified':
      return (
        <div className="h-full w-full bg-white p-3 flex flex-col gap-1.5">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1 w-1/2">
              <div className="h-1.5 w-full rounded-sm" style={{ backgroundColor: '#1e3a5f' }} />
              <div className="h-1 w-2/3 bg-slate-200 rounded-sm" />
            </div>
            <div className="flex gap-1">
              <div className="h-2.5 w-4 rounded-full" style={{ backgroundColor: '#1e3a5f' }} />
              <div className="h-2.5 w-4 rounded-full" style={{ backgroundColor: '#1e3a5f' }} />
            </div>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-sm mt-2" style={{ borderBottom: '1px solid #1e3a5f' }} />
          <div className="grid grid-cols-3 gap-px mt-1" style={{ backgroundColor: '#cbd5e1' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-2 bg-white" />
            ))}
          </div>
        </div>
      )
    case 'sidebar':
      return (
        <div className="h-full w-full bg-white flex">
          <div className="w-[36%] h-full flex flex-col gap-1.5 p-2" style={{ backgroundColor: '#1f2937' }}>
            <div className="h-1.5 w-full rounded-sm bg-white/90" />
            <div className="h-1 w-2/3 rounded-sm bg-white/40 mt-1" />
            <div className="h-1 w-1/2 rounded-sm bg-sky-400 mt-2" />
            <div className="h-1 w-full rounded-sm bg-white/30" />
            <div className="h-1 w-4/5 rounded-sm bg-white/30" />
          </div>
          <div className="flex-1 p-2 flex flex-col gap-1.5">
            <div className="h-1 w-full bg-slate-300 rounded-sm" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
            <div className="h-1 w-full bg-slate-300 rounded-sm mt-2" />
            <div className="h-1 w-full bg-slate-200 rounded-sm" />
            <div className="h-1 w-11/12 bg-slate-200 rounded-sm" />
          </div>
        </div>
      )
    case 'classic':
    default:
      return (
        <div className="h-full w-full bg-white p-3 flex flex-col gap-1.5 items-center">
          <div className="h-2 w-1/2 bg-slate-900 rounded-sm" />
          <div className="h-1 w-3/4 bg-slate-200 rounded-sm" />
          <div className="h-1 w-full bg-slate-300 rounded-sm mt-2 border-b border-slate-500" />
          <div className="h-1 w-full bg-slate-200 rounded-sm" />
          <div className="h-1 w-5/6 bg-slate-200 rounded-sm" />
          <div className="h-1 w-full bg-slate-300 rounded-sm mt-2 border-b border-slate-500" />
          <div className="h-1 w-full bg-slate-200 rounded-sm" />
          <div className="h-1 w-11/12 bg-slate-200 rounded-sm" />
        </div>
      )
  }
}

export function TemplateSelector({ selectedId, onChange }: TemplateSelectorProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Choose a Template</h2>
        <p className="text-[13px] font-medium text-slate-500">Pick the layout your resume will be generated into</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {RESUME_TEMPLATES.map((template) => {
          const isSelected = template.id === selectedId
          return (
            <button
              key={template.id}
              onClick={() => onChange(template.id)}
              className={cn(
                "relative rounded-xl border-2 text-left transition-all duration-200 overflow-hidden group flex flex-col",
                isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/40 bg-white"
              )}
            >
              <div className="h-36 w-full border-b border-slate-100 bg-slate-50 overflow-hidden">
                <TemplateThumbnail id={template.id} />
              </div>

              <div className="p-3 flex-1">
                <h3 className="text-[13px] font-black text-slate-900 mb-0.5 leading-tight">{template.name}</h3>
                <p className="text-[11px] font-medium text-slate-500 leading-snug">{template.description}</p>
              </div>

              {isSelected && (
                <div className="absolute right-2 top-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" fill="currentColor" stroke="white" strokeWidth={1} />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
