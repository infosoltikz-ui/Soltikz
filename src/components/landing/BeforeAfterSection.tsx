import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight max-w-3xl">
            The same person. The same jobs.<br />Two very different pages.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Nothing here is invented - we don't add experience you don't have. We choose what to lead with, and we say it in the employer's own vocabulary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Before Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black text-[#D97706]">74</span>
              <div>
                <h4 className="font-bold text-slate-900">Before</h4>
                <p className="text-sm text-slate-500">A general-purpose résumé</p>
              </div>
            </div>

            <div className="flex-1 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl p-8 mb-6 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Joh****</h3>
                <p className="text-[10px] text-slate-400 mt-1">Dallas, TX • john.xxxx@gmail.com</p>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-200 pb-1">Summary</h4>
                <p className="text-[11px] text-slate-600 leading-[1.8] mt-2">
                  <span className="bg-red-100/80 text-slate-700 px-1 py-0.5 rounded">Motivated and detail-oriented professional with a passion for cybersecurity and a proven track record of success in fast-paced environments.</span>
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6 flex-1">
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-200 pb-1">Experience</h4>
                
                <div className="mb-4 mt-2">
                  <div className="flex justify-between items-baseline mb-2 text-[11px]">
                    <h5 className="font-bold text-slate-900">Information Security Analyst <span className="font-normal text-slate-500">— Public sector agency</span></h5>
                    <span className="text-slate-500">2026 – Now</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-600 leading-[1.8] space-y-1 marker:text-slate-400">
                    <li><span className="bg-red-100/80 text-slate-700 px-1 py-0.5 rounded">Responsible for monitoring security alerts and escalating incidents.</span></li>
                    <li><span className="bg-red-100/80 text-slate-700 px-1 py-0.5 rounded">Assisted with compliance activities and audit preparation.</span></li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2 text-[11px]">
                    <h5 className="font-bold text-slate-900">Cyber Security Analystr <span className="font-normal text-slate-500">— Global e-commerce company</span></h5>
                    <span className="text-slate-500">2023</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-600 leading-[1.8] space-y-1 marker:text-slate-400">
                    <li><span className="bg-red-100/80 text-slate-700 px-1 py-0.5 rounded">Worked with various security tools on a daily basis.</span></li>
                    <li><span className="bg-red-100/80 text-slate-700 px-1 py-0.5 rounded">Participated in team meetings and knowledge sharing.</span></li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-200 pb-1">Skills</h4>
                <p className="text-[11px] text-slate-600 leading-[1.8] mt-2">
                  <span className="bg-red-100/80 text-slate-700 px-1 py-0.5 rounded">JavaScript, React.js, Node.js, TypeScript, Figma, Agile</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3 text-sm text-slate-500 leading-relaxed items-start">
              <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <p>Adjectives instead of outcomes, a skills list from a different career, and a typo in a job title.</p>
            </div>
          </div>

          {/* After Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black text-[#12734C]">91</span>
              <div>
                <h4 className="font-bold text-slate-900">After</h4>
                <p className="text-sm text-slate-500">Tailored to one posting</p>
              </div>
            </div>

            <div className="flex-1 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl p-8 mb-6 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Joh****</h3>
                <p className="text-[10px] text-slate-400 mt-1">Dallas, TX • john.xxxx@gmail.com</p>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-200 pb-1">Summary</h4>
                <p className="text-[11px] text-slate-600 leading-[1.8] mt-2">
                  Security analyst with five years in cloud and financial-services environments. Runs <span className="bg-green-100/80 text-[#12734C] font-semibold px-1 py-0.5 rounded">incident response</span> end to end and tunes <span className="bg-green-100/80 text-[#12734C] font-semibold px-1 py-0.5 rounded">SIEM</span> detections analysts trust.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6 flex-1">
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-200 pb-1">Experience</h4>
                
                <div className="mb-4 mt-2">
                  <div className="flex justify-between items-baseline mb-2 text-[11px]">
                    <h5 className="font-bold text-slate-900">Information Security Analyst <span className="font-normal text-slate-500">— Public sector agency</span></h5>
                    <span className="text-slate-500">2026 – Now</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-600 leading-[1.8] space-y-1 marker:text-slate-400">
                    <li>Tuned 40+ <span className="bg-green-100/80 text-[#12734C] font-semibold px-1 py-0.5 rounded">Splunk ES</span> correlation searches, cutting false positives 38%.</li>
                    <li>Mapped controls to <span className="bg-green-100/80 text-[#12734C] font-semibold px-1 py-0.5 rounded">NIST 800-53</span>, closing 23 of 27 findings before fieldwork.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2 text-[11px]">
                    <h5 className="font-bold text-slate-900">Cyber Security Analyst <span className="font-normal text-slate-500">— Global e-commerce company</span></h5>
                    <span className="text-slate-500">2023</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-600 leading-[1.8] space-y-1 marker:text-slate-400">
                    <li>Investigated ~150 endpoint alerts a month in <span className="bg-green-100/80 text-[#12734C] font-semibold px-1 py-0.5 rounded">CrowdStrike Falcon</span>.</li>
                    <li>Built a <span className="bg-green-100/80 text-[#12734C] font-semibold px-1 py-0.5 rounded">SOAR</span> playbook that cut phishing response from 45 minutes to 9.</li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-200 pb-1">Skills</h4>
                <p className="text-[11px] text-slate-600 leading-[1.8] mt-2">
                  Splunk ES • CrowdStrike Falcon • Nessus • MITRE ATT&CK • NIST 800-53 • Python
                </p>
              </div>
            </div>

            <div className="flex gap-3 text-sm text-slate-500 leading-relaxed items-start">
              <Check className="w-5 h-5 text-[#12734C] shrink-0 mt-0.5" />
              <p>Same jobs, same dates. Now every bullet ends in a result, the vocabulary matches the posting, and the spelling mistakes are gone.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
