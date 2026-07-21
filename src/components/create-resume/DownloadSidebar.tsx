import { Download, FileText, ArrowLeft, ArrowRight, Layers, FileOutput } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export function DownloadSidebar() {
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
            className="w-full h-12 text-[14px] font-black rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all gap-2"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download PDF
          </Button>
          
          <Button 
            variant="outline"
            className="w-full h-12 text-[14px] font-bold rounded-xl border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all gap-2"
            leftIcon={<FileText className="w-4 h-4" />}
          >
            Download DOCX
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[14px] font-black text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400" />
              Live Preview
            </h4>
            <div className="flex gap-2">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[12px] font-bold text-slate-500 flex items-center">1 / 1</span>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="aspect-[1/1.4] w-full bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative group">
            {/* Using a placeholder for the PDF preview since we don't have the actual renderer here yet */}
            <div className="absolute inset-0 bg-white shadow-sm flex items-center justify-center p-4">
               <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center text-slate-400">
                 <FileText className="w-8 h-8 mb-2 opacity-50" />
                 <span className="text-[12px] font-bold text-center">Resume Preview<br/>Generated Document</span>
               </div>
            </div>
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" variant="secondary" className="font-bold rounded-lg shadow-lg">
                View Full Screen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
