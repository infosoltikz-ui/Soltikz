'use client'

import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Copy, Check, Download } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { CoverLetterData } from './coverLetterTypes'

interface CoverLetterViewerProps {
  content: CoverLetterData
  candidateName?: string
  documentTitle?: string
}

export function CoverLetterViewer({ content, candidateName, documentTitle = 'Cover_Letter' }: CoverLetterViewerProps) {
  const [copied, setCopied] = useState(false)
  const letterRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: letterRef,
    documentTitle,
  })

  const handleCopy = () => {
    const fullText = `${content.salutation}\n\n${content.paragraphs.join('\n\n')}\n\n${content.sign_off}\n${candidateName || ''}`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    toast.success('Cover letter copied!')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mb-4">
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

      <div ref={letterRef} className="space-y-4 text-[14px] leading-relaxed text-slate-800 font-medium bg-slate-50/80 p-5 sm:p-6 rounded-xl border border-slate-100">
        <p>{content.salutation}</p>
        {content.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <p>
          {content.sign_off}
          <br />
          {candidateName}
        </p>
      </div>
    </div>
  )
}
