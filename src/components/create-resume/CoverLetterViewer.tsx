'use client'

import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Copy, Check, Download, FileSignature } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { CoverLetterResponseData } from './coverLetterTypes'
import { cn } from '@/utils/cn'

interface CoverLetterViewerProps {
  content: CoverLetterResponseData
  candidateName?: string
  documentTitle?: string
}

export function CoverLetterViewer({ content, candidateName, documentTitle = 'Cover_Letter' }: CoverLetterViewerProps) {
  const [copied, setCopied] = useState(false)
  const [activeTabId, setActiveTabId] = useState(content.variations[0]?.id || '1')
  
  const letterRef = useRef<HTMLDivElement>(null)
  
  const activeVariation = content.variations.find(v => v.id === activeTabId) || content.variations[0]

  const handlePrint = useReactToPrint({
    contentRef: letterRef,
    documentTitle: `${documentTitle}_${activeVariation.id}`,
  })

  const handleCopy = () => {
    if (!activeVariation) return
    const fullText = `${activeVariation.salutation}\n\n${activeVariation.paragraphs.join('\n\n')}\n\n${activeVariation.sign_off}\n${candidateName || ''}`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    toast.success('Cover letter copied!')
    setTimeout(() => setCopied(false), 2500)
  }

  if (!content.variations || content.variations.length === 0) {
    return <p className="text-sm text-slate-500">No cover letter variations generated.</p>
  }

  return (
    <div className="space-y-4">
      {/* Template Variations Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {content.variations.map((variation) => (
          <button
            key={variation.id}
            onClick={() => setActiveTabId(variation.id || '')}
            className={cn(
              "px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all shrink-0 cursor-pointer border flex items-center gap-2",
              activeTabId === variation.id
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            <FileSignature className={cn("w-3.5 h-3.5", activeTabId === variation.id ? "text-emerald-600" : "text-slate-400")} />
            {variation.name || 'Variation'}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <h4 className="text-[13px] font-bold text-slate-700">{activeVariation.name}</h4>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 hover:bg-primary/5 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
            title="Copy Cover Letter"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 bg-slate-50 hover:bg-primary/5 text-[12px] font-bold text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
            title="Download as PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div ref={letterRef} className="space-y-4 text-[14px] leading-relaxed text-slate-800 font-medium bg-slate-50/80 p-5 sm:p-6 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
        <p>{activeVariation.salutation}</p>
        {activeVariation.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p>
          {activeVariation.sign_off}
          <br />
          {candidateName}
        </p>
      </div>
    </div>
  )
}
