'use client'

import { useRef, useState } from 'react'
import { Copy, Check, Download, FileSignature, LayoutTemplate } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { CoverLetterResponseData } from './coverLetterTypes'
import { cn } from '@/utils/cn'
import { ClassicCoverLetterTemplate } from './cover-letter-templates/ClassicTemplate'
import { ModernDarkCoverLetterTemplate } from './cover-letter-templates/ModernDarkTemplate'
import { MinimalCoverLetterTemplate } from './cover-letter-templates/MinimalTemplate'
import { exportToPdf } from '@/utils/exportPdf'

interface CoverLetterViewerProps {
  content: CoverLetterResponseData
  candidateName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  companyName?: string
  jobTitle?: string
  documentTitle?: string
}

const VISUAL_TEMPLATES = [
  { id: 'classic', label: 'Classic', description: 'MNC / Corporate', color: '#1a237e' },
  { id: 'modern-dark', label: 'Modern Dark', description: 'Product / Startup', color: '#10b981' },
  { id: 'minimal', label: 'Minimal', description: 'Creative / Startup', color: '#7c3aed' },
]

export function CoverLetterViewer({
  content,
  candidateName,
  email,
  phone,
  location,
  linkedin,
  companyName,
  jobTitle,
  documentTitle = 'Cover_Letter',
}: CoverLetterViewerProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeVariationId, setActiveVariationId] = useState(content.variations[0]?.id || 'traditional')
  const [activeTemplateId, setActiveTemplateId] = useState('classic')

  const letterRef = useRef<HTMLDivElement>(null)

  const activeVariation = content.variations.find(v => v.id === activeVariationId) || content.variations[0]

  const handleCopy = () => {
    if (!activeVariation) return
    const fullText = `${activeVariation.salutation}\n\n${activeVariation.paragraphs.join('\n\n')}\n\n${activeVariation.sign_off}\n${candidateName || ''}`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    toast.success('Cover letter copied!')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleDownloadPdf = async () => {
    if (!letterRef.current) return
    setIsDownloading(true)
    try {
      const fileName = `${(candidateName || 'Cover_Letter').replace(/\s+/g, '_')}_Cover_Letter_${activeTemplateId}.pdf`
      await exportToPdf(letterRef.current, fileName)
      toast.success('PDF downloaded!')
    } catch {
      toast.error('Failed to generate PDF')
    } finally {
      setIsDownloading(false)
    }
  }

  if (!content.variations || content.variations.length === 0) {
    return <p className="text-sm text-slate-500">No cover letter variations generated.</p>
  }

  const sharedProps = {
    content: activeVariation,
    candidateName,
    email,
    phone,
    location,
    linkedin,
    companyName,
    jobTitle,
  }

  return (
    <div className="space-y-5">
      {/* Row 1: Content Tone Selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <FileSignature className="w-3.5 h-3.5" />
          <span>Content Tone</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {content.variations.map((variation) => (
            <button
              key={variation.id}
              onClick={() => setActiveVariationId(variation.id || '')}
              className={cn(
                'px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer border',
                activeVariationId === variation.id
                  ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              )}
            >
              {variation.name || 'Variation'}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Visual Template Selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Visual Template</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {VISUAL_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setActiveTemplateId(tpl.id)}
              className={cn(
                'group px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer border flex items-center gap-2',
                activeTemplateId === tpl.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              )}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: tpl.color }}
              />
              <span>{tpl.label}</span>
              <span className={cn(
                'text-[10px] font-medium',
                activeTemplateId === tpl.id ? 'text-slate-300' : 'text-slate-400'
              )}>
                {tpl.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-[12px] text-slate-500 font-medium">
          <span className="font-bold text-slate-700">{activeVariation.name}</span> · {VISUAL_TEMPLATES.find(t => t.id === activeTemplateId)?.label} Template
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 hover:bg-primary/5 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700">Copied!</span></>
            ) : (
              <><Copy className="w-3.5 h-3.5" /><span>Copy Text</span></>
            )}
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold transition-all cursor-pointer shadow-sm disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-50">
        <div className="overflow-auto" style={{ maxHeight: '680px' }}>
          <div ref={letterRef} style={{ transformOrigin: 'top left' }}>
            {activeTemplateId === 'classic' && <ClassicCoverLetterTemplate {...sharedProps} />}
            {activeTemplateId === 'modern-dark' && <ModernDarkCoverLetterTemplate {...sharedProps} />}
            {activeTemplateId === 'minimal' && <MinimalCoverLetterTemplate {...sharedProps} />}
          </div>
        </div>
      </div>
    </div>
  )
}
