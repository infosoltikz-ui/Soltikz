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
      <div className="bg-[#151D28] rounded-3xl border border-[#26313F] shadow-xs p-6 sticky top-6">
        <div className="mb-6">
          <h3 className="text-[16px] font-black text-[#E4EAF2] mb-1 flex items-center gap-2">
            <FileOutput className="w-5 h-5 text-[#3FA57C]" />
            Export Resume
          </h3>
          <p className="text-[13px] font-medium text-[#9FACBE]">
            Your tailored resume is ready. Download it in PDF or Word format.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onDownloadPdf}
            className="w-full h-11 text-[13.5px] font-extrabold rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white shadow-sm transition-all gap-2 cursor-pointer"
            leftIcon={<Download className="w-4 h-4 text-[#D9A441]" />}
          >
            Download PDF
          </Button>

          <Button
            variant="outline"
            onClick={onDownloadDocx}
            disabled={isDownloadingDocx}
            className="w-full h-11 text-[13.5px] font-bold rounded-xl border-[#26313F] hover:border-[#3FA57C]/40 bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] transition-all gap-2 cursor-pointer"
            leftIcon={isDownloadingDocx ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4 text-[#3FA57C]" />}
          >
            {isDownloadingDocx ? 'Generating DOCX...' : 'Download DOCX'}
          </Button>
        </div>
      </div>
    </aside>
  )
}
