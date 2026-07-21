import { Building2, UploadCloud, Sparkles, Zap, CheckCircle, Edit3, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CompanyDetailsSectionProps {
  onGenerate?: () => void;
}

export function CompanyDetailsSection({ onGenerate }: CompanyDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        
        <div className="mb-8">
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Job Details</h2>
          <p className="text-[13px] font-medium text-slate-500">Provide the details of the job you are applying for</p>
        </div>

        <div className="flex items-center mb-6">
          <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Company & Role Details
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Company Name</label>
            <input 
              type="text" 
              placeholder="Software Solutions Pvt. Ltd." 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
            />
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Target Role</label>
            <input 
              type="text" 
              placeholder="Software Engineer" 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Job Description <span className="font-normal text-slate-400">(Paste Job Description)</span></label>
            <textarea 
              rows={4}
              placeholder="We are looking for a skilled Software Engineer with experience in building scalable web applications using modern technologies, strong problem-solving skills, and a passion for delivering high-quality software solutions."
              className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors resize-none leading-relaxed bg-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Upload Job Description <span className="font-normal text-slate-400">(Optional)</span></label>
            <div className="w-full border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer py-6 flex flex-col items-center justify-center text-center">
              <UploadCloud className="w-6 h-6 text-primary mb-2" strokeWidth={2} />
              <div className="text-[13px] font-bold text-slate-800">Click to upload or drag and drop</div>
              <div className="text-[11px] font-medium text-slate-500 mt-1">PDF, DOCX, TXT (Max 10MB)</div>
            </div>
          </div>
        </div>

        {/* Generate Button Container */}
        <div className="mt-12 flex flex-col items-center justify-center pt-8 border-t border-slate-100">
          <Button 
            onClick={onGenerate}
            className="h-14 px-10 text-[16px] font-black rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all w-full md:w-auto min-w-[300px]" 
            leftIcon={<Sparkles className="w-5 h-5" />}
          >
            Generate Resume
          </Button>
          <p className="text-[12px] font-bold text-slate-400 mt-4">AI will create your resume in seconds</p>
        </div>

      </div>

    </div>
  )
}
