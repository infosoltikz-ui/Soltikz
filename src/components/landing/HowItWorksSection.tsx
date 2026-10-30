export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0F2744]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Three steps, about two minutes.
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            You write your career history once. After that, every application is a paste and a click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Step 1 */}
          <div className="flex flex-col">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0F2744] font-bold flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
              1
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Write your profile once</h3>
            <p className="text-slate-300 mb-8 leading-relaxed flex-1">
              Jobs, education, projects, certifications, skills. Import it from LinkedIn or type it in. You never re-enter it again.
            </p>
            
            {/* Mockup 1 */}
            <div className="bg-[#163252] border border-[#23456F] rounded-xl p-4 flex flex-col gap-3 shadow-lg">
              <div className="bg-[#1D3E66] border border-[#2C5588] rounded-lg p-3.5 text-sm text-slate-200 font-medium">
                Information Security Analyst — 2026 to now
              </div>
              <div className="bg-[#1D3E66] border border-[#2C5588] rounded-lg p-3.5 text-sm text-slate-200 font-medium">
                Cyber Security Analyst — 2023
              </div>
              <div className="bg-[#1D3E66] border border-[#2C5588] rounded-lg p-3.5 text-sm text-slate-300 font-medium opacity-50">
                M.S. Cybersecurity — 2021 to 2023
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0F2744] font-bold flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
              2
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Paste the job posting</h3>
            <p className="text-slate-300 mb-8 leading-relaxed flex-1">
              The whole thing — responsibilities, requirements, the lot. We pull out the terms and priorities the employer actually wrote down.
            </p>
            
            {/* Mockup 2 */}
            <div className="bg-[#163252] border border-[#23456F] rounded-xl p-5 flex flex-col gap-5 shadow-lg">
              <div className="bg-[#1D3E66] border border-[#2C5588] rounded-lg p-3.5 text-sm text-slate-200 leading-relaxed">
                We're hiring a Security Investigator to own end-to-end investigations across Sentinel and Defender XDR...
              </div>
              <div className="flex flex-wrap gap-2">
                {['incident response', 'Sentinel', 'KQL', 'SOC'].map(tag => (
                  <div key={tag} className="bg-[#0A1A2E] border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0F2744] font-bold flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
              3
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Get the résumé and the report</h3>
            <p className="text-slate-300 mb-8 leading-relaxed flex-1">
              A finished page in your chosen template, and a breakdown of what matched, what's missing, and which bullets to strengthen.
            </p>
            
            {/* Mockup 3 */}
            <div className="bg-[#163252] border border-[#23456F] rounded-xl p-6 flex flex-col gap-6 shadow-lg">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-200 mb-2">
                  <span>Keywords</span>
                  <span className="text-amber-400 font-bold">88%</span>
                </div>
                <div className="h-1.5 w-full bg-[#23456F] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[88%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-200 mb-2">
                  <span>Title fit</span>
                  <span className="text-amber-400 font-bold">95%</span>
                </div>
                <div className="h-1.5 w-full bg-[#23456F] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[95%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-200 mb-2">
                  <span>Quantified results</span>
                  <span className="text-amber-400 font-bold">72%</span>
                </div>
                <div className="h-1.5 w-full bg-[#23456F] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[72%]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
