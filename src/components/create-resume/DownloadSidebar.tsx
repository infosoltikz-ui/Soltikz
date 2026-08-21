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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
        <div className="mb-6">
          <h3 className="text-[16px] font-black text-slate-900 mb-1 flex items-center gap-2">
            <FileOutput className="w-5 h-5 text-primary" />
            Export Resume
          </h3>
          <p className="text-[13px] font-medium text-slate-500">
            Your tailored resume is ready. Download it now to start applying.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onDownloadPdf}
            className="w-full h-12 text-[14px] font-black rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all gap-2 cursor-pointer"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download PDF
          </Button>

          <Button
            variant="outline"
            onClick={onDownloadDocx}
            disabled={isDownloadingDocx}
            className="w-full h-12 text-[14px] font-bold rounded-xl border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all gap-2 cursor-pointer"
            leftIcon={isDownloadingDocx ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          >
            {isDownloadingDocx ? 'Generating DOCX...' : 'Download DOCX'}
          </Button>
        </div>
      </div>
    </aside>
  )
}
