import { Download, FileText, FileOutput, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DownloadSidebarProps {
  onDownloadPdf?: () => void
  onDownloadDocx?: () => void
  isDownloadingDocx?: boolean
}

export function DownloadSidebar({ onDownloadPdf, onDownloadDocx, isDownloadingDocx }: DownloadSidebarProps) {
  return (
    <aside className="w-full xl:w-[380px] shrink-0 space-y-6">
      {/* Download Actions */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sticky top-6">
        <div className="mb-6">
          <h3 className="text-[16px] font-black text-slate-900 mb-1 flex items-center gap-2">
            <FileOutput className="w-5 h-5 text-[#0F2744]" />
            Export Resume
          </h3>
          <p className="text-[13px] font-medium text-slate-500">
            Your tailored resume is ready. Download it in PDF or Word format.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onDownloadPdf}
            className="w-full h-11 text-[13.5px] font-extrabold rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white shadow-sm transition-all gap-2 cursor-pointer"
            leftIcon={<Download className="w-4 h-4 text-[#F59E0B]" />}
          >
            Download PDF
          </Button>

          <Button
            variant="outline"
            onClick={onDownloadDocx}
            disabled={isDownloadingDocx}
            className="w-full h-11 text-[13.5px] font-bold rounded-xl border-slate-200 hover:border-[#0F2744]/30 hover:bg-[#EEF4FA] text-slate-700 hover:text-[#0F2744] transition-all gap-2 cursor-pointer"
            leftIcon={isDownloadingDocx ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4 text-[#0F2744]" />}
          >
            {isDownloadingDocx ? 'Generating DOCX...' : 'Download DOCX'}
          </Button>
        </div>
      </div>
    </aside>
  )
}
