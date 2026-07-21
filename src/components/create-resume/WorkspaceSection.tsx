import { Sparkles, MessageSquare, Lightbulb, CheckCircle2 } from 'lucide-react'

export function WorkspaceSection() {
  return (
    <div className="space-y-6">
      {/* Self Introduction Block */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <MessageSquare className="w-48 h-48" />
        </div>

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-[18px] font-black text-slate-900">Your Self Introduction</h3>
            <p className="text-[13px] font-bold text-slate-500">Perfectly tailored to the Job Description</p>
          </div>
        </div>

        <div className="space-y-4 text-[14px] leading-relaxed text-slate-700 relative z-10 font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">
          <p>
            Hello, I am a passionate and results-driven software engineer with over 5 years of experience building scalable web applications. Throughout my career, I have successfully designed and delivered complex architectural solutions that directly impact business growth and user engagement. I thrive in dynamic, fast-paced environments where innovation and creative problem-solving are highly valued.
          </p>
          <p>
            In my recent roles, I have spearheaded the migration of legacy monoliths to modern microservices, resulting in a 40% improvement in system performance and significantly reducing deployment times. I have a deep understanding of full-stack development, from optimizing database queries on the backend to crafting intuitive, pixel-perfect user interfaces using modern JavaScript frameworks like React and Next.js.
          </p>
          <p>
            I am particularly drawn to this opportunity because your company's mission to revolutionize digital workflows aligns perfectly with my technical expertise and career aspirations. I am eager to bring my strong track record of cross-functional collaboration and technical leadership to your team, and I am confident that my skills will allow me to make an immediate and lasting impact from day one.
          </p>
        </div>
      </div>

      {/* Keywords & Interview Prep Block */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-[18px] font-black text-slate-900">Keywords & Interview Prep</h3>
            <p className="text-[13px] font-bold text-slate-500">Matched from the JD and your profile</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Keyword 1 */}
          <div className="p-5 rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 bg-white group">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 mb-1 flex items-center gap-2">
                  Microservices Architecture
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[11px] font-bold uppercase tracking-wider">High Match</span>
                </h4>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                  <strong className="text-slate-800">Why it matters:</strong> The JD heavily emphasizes scaling the platform. Prepare to discuss specific times you decomposed a monolith, the challenges with distributed tracing, and how you ensured data consistency across services.
                </p>
              </div>
            </div>
          </div>

          {/* Keyword 2 */}
          <div className="p-5 rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 bg-white group">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 mb-1 flex items-center gap-2">
                  Cross-functional Leadership
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[11px] font-bold uppercase tracking-wider">High Match</span>
                </h4>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                  <strong className="text-slate-800">Why it matters:</strong> The role requires working closely with Product and Design. Be ready to share stories using the STAR method about how you resolved technical disagreements or aligned different stakeholders on a release schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Keyword 3 */}
          <div className="p-5 rounded-xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 bg-white group">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 mb-1 flex items-center gap-2">
                  React / Next.js
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[11px] font-bold uppercase tracking-wider">High Match</span>
                </h4>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                  <strong className="text-slate-800">Why it matters:</strong> Their core product is built on this stack. Brush up on advanced topics like Server Components, hydration strategies, and how you optimize Web Vitals in a complex Next.js application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
