import { FileEdit, ShieldCheck, Sparkles, LayoutTemplate } from 'lucide-react'

export function WhyUpgrade() {
  return (
    <div className="mb-24 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black text-slate-900 mb-8 text-center tracking-tight">Why Upgrade to Premium?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <FileEdit className="w-6 h-6" strokeWidth={2} />
          </div>
          <h3 className="text-[15px] font-black text-slate-900 mb-2">Unlimited Creation</h3>
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
            Create as many resumes as you need. Tailor a unique version for every job application.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-4 text-orange-500">
            <ShieldCheck className="w-6 h-6" strokeWidth={2} />
          </div>
          <h3 className="text-[15px] font-black text-slate-900 mb-2">Advanced ATS Score</h3>
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
            Get deep insights and a comprehensive line-by-line analysis to beat applicant tracking systems.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
            <Sparkles className="w-6 h-6" strokeWidth={2} />
          </div>
          <h3 className="text-[15px] font-black text-slate-900 mb-2">AI Optimization</h3>
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
            Let our AI rewrite your bullet points and self-introductions for maximum impact.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-500">
            <LayoutTemplate className="w-6 h-6" strokeWidth={2} />
          </div>
          <h3 className="text-[15px] font-black text-slate-900 mb-2">Premium Templates</h3>
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
            Unlock all our recruiter-approved templates designed to get you hired faster.
          </p>
        </div>

      </div>
    </div>
  )
}
