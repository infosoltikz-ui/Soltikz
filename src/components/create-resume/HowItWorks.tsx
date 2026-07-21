export function HowItWorks() {
  const steps = [
    { num: 1, title: 'Enter Details', desc: 'Provide company, role and job description' },
    { num: 2, title: 'AI Generates', desc: 'Our AI creates a tailored resume' },
    { num: 3, title: 'Edit & Optimize', desc: 'Refine and optimize for ATS' },
    { num: 4, title: 'Download', desc: 'Get your resume in PDF or DOCX' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 overflow-x-auto">
      <h3 className="text-[16px] font-black text-slate-900 mb-4 text-center">How it Works</h3>
      
      <div className="relative pt-1 max-w-4xl mx-auto">
        {/* Horizontal line connecting steps */}
        <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-slate-100"></div>
        
        <div className="flex gap-4 relative justify-between">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group w-1/4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[13px] font-bold shrink-0 relative z-10 shadow-sm mb-3">
                {step.num}
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800 leading-tight mb-1 group-hover:text-primary transition-colors">{step.title}</h4>
                <p className="text-[11px] font-medium text-slate-500 leading-relaxed hidden sm:block">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
