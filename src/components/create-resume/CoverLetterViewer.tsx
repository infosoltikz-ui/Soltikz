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
      {/* Settings Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-[#151D28] border border-[#26313F] rounded-2xl p-2.5 shadow-xs">
        <div className="flex flex-wrap items-center gap-4 px-2">
          {/* Tone Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10.5px] font-extrabold text-[#78859A] uppercase tracking-wider shrink-0">
              <FileSignature className="w-3.5 h-3.5 text-[#3FA57C]" />
              <span>Tone:</span>
            </div>
            <div className="flex bg-[#101722] p-1 rounded-xl border border-[#26313F]">
              {content.variations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => setActiveVariationId(variation.id || '')}
                  className={cn(
                    'px-3 py-1 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer whitespace-nowrap',
                    activeVariationId === variation.id
                      ? 'bg-[#0A6E4E] text-white shadow-xs'
                      : 'text-[#9FACBE] hover:text-[#E4EAF2]'
                  )}
                >
                  {variation.name?.split(' ')[1] || variation.name}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-[#26313F] shrink-0" />

          {/* Template Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10.5px] font-extrabold text-[#78859A] uppercase tracking-wider shrink-0">
              <LayoutTemplate className="w-3.5 h-3.5 text-[#3FA57C]" />
              <span>Style:</span>
            </div>
            <div className="flex bg-[#101722] p-1 rounded-xl border border-[#26313F]">
              {VISUAL_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTemplateId(tpl.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer whitespace-nowrap',
                    activeTemplateId === tpl.id
                      ? 'bg-[#0A6E4E] text-white shadow-xs'
                      : 'text-[#9FACBE] hover:text-[#E4EAF2]'
                  )}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tpl.color }} />
                  <span>{tpl.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pr-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#26313F] hover:border-[#3FA57C]/40 bg-[#1A2330] hover:bg-[#222E3F] text-[12px] font-bold text-[#E4EAF2] transition-all cursor-pointer shadow-2xs"
            title="Copy Text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#3FA57C]" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white text-[12px] font-extrabold transition-all cursor-pointer shadow-xs disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{isDownloading ? 'Exporting...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="rounded-3xl border border-[#26313F] overflow-hidden shadow-inner bg-[#0D131B] p-4 sm:p-8 flex justify-center">
        <div className="overflow-x-auto w-full max-w-[794px] bg-white shadow-md border border-slate-200 rounded-sm">
          <div ref={letterRef} style={{ transformOrigin: 'top left', width: '100%' }}>
            {activeTemplateId === 'classic' && <ClassicCoverLetterTemplate {...sharedProps} />}
            {activeTemplateId === 'modern-dark' && <ModernDarkCoverLetterTemplate {...sharedProps} />}
            {activeTemplateId === 'minimal' && <MinimalCoverLetterTemplate {...sharedProps} />}
          </div>
        </div>
      </div>
    </div>
  )
}
