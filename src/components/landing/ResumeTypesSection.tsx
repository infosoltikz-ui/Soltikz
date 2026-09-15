import React from 'react';
import { Check } from 'lucide-react';

export function ResumeTypesSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-[1400px]">
        
        {/* PART 1: Two Resume Types */}
        <div className="mb-24">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Two résumé types. One difference, and it's the part recruiters read first.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Pick full time or contract before you generate. Everything below the professional summary follows the same rules - the summary itself is built two different ways.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Full Time Mockup */}
            <div className="flex flex-col">
              <div className="flex gap-3 items-center mb-6">
                <span className="px-3 py-1 bg-[#12734C]/10 text-[#12734C] text-sm font-bold rounded-full">Full time</span>
                <span className="font-bold text-slate-900 text-lg">Summary as one paragraph</span>
              </div>
              
              <div className="flex-1 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl p-8 mb-6 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Joh****</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Dallas, TX • +1 (813) - xxx xxxx • john.xxxx@gmail.com • linkedin.com/in/john-xxxx</p>
                </div>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase">Professional Summary</h4>
                  <div className="relative p-4 border-2 border-dashed border-[#12734C] rounded-md bg-white">
                    <div className="absolute -top-3 left-4 bg-[#12734C] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                      One paragraph • 90-120 words • about six lines
                    </div>
                    <p className="text-[11px] text-slate-600 leading-[1.7] mt-1">
                      Information Security Analyst with over five years of experience across cloud, retail and financial services environments, specialising in security operations, detection engineering and incident response. Works hands-on with Splunk Enterprise Security, CrowdStrike Falcon, Microsoft Sentinel and Tenable Nessus to monitor hybrid estates, tune detections and drive remediation to closure. Has led response on more than sixty priority incidents, authored the playbooks now used across a nine-person security operations centre, and mapped technical controls to NIST 800-53 Rev 5 ahead of annual audit. Partners closely with cloud, infrastructure and compliance teams, and brings the investigative depth this detection engineering role requires.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-900 pb-1">Skills</h4>
                  <div className="space-y-1.5 mt-3">
                    <div className="h-1 bg-slate-200 w-full rounded"></div>
                    <div className="h-1 bg-slate-200 w-[90%] rounded"></div>
                    <div className="h-1 bg-slate-200 w-[80%] rounded"></div>
                    <div className="h-1 bg-slate-200 w-[85%] rounded"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 text-sm text-slate-500 leading-relaxed items-start">
                <Check className="w-5 h-5 text-[#12734C] shrink-0 mt-0.5" />
                <p>Built to a fixed formula: target title, verified years of experience, domain, core expertise, hands-on tools, major responsibilities, proven impact, and the value you bring to that specific role - written as one connected paragraph, never a list.</p>
              </div>
            </div>

            {/* Contract Mockup */}
            <div className="flex flex-col">
              <div className="flex gap-3 items-center mb-6">
                <span className="px-3 py-1 bg-[#D97706]/10 text-[#D97706] text-sm font-bold rounded-full">Contract / C2C</span>
                <span className="font-bold text-slate-900 text-lg">Summary as 8-10 two-line points</span>
              </div>
              
              <div className="flex-1 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl p-8 mb-6 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Joh****</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Dallas, TX • +1 (813) - xxx xxxx • john.xxxx@gmail.com • linkedin.com/in/john-xxxx</p>
                </div>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase">Professional Summary</h4>
                  <div className="relative p-4 border-2 border-dashed border-[#D97706] rounded-md bg-white">
                    <div className="absolute -top-3 left-4 bg-[#D97706] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                      8-10 points • two lines each
                    </div>
                    <ul className="list-disc pl-4 text-[11px] text-slate-600 leading-[1.7] mt-1 space-y-2 marker:text-slate-400">
                      <li>Five-plus years in security operations across cloud, retail and banking environments, covering round-the-clock SOC coverage and project delivery.</li>
                      <li>Hands-on daily with Splunk Enterprise Security, CrowdStrike Falcon and Microsoft Sentinel for detection, triage and threat hunting across hybrid estates.</li>
                      <li>Owns incident response end to end, from the first alert through containment and eradication to the written timeline handed over after closure.</li>
                      <li>Detection engineering: authored and tuned 40+ correlation searches, cutting false positives 38% and returning analyst hours to real casework.</li>
                      <li>Builds SOAR automation for repetitive triage, including a phishing playbook that brought median response time down from 45 minutes to nine.</li>
                      <li>Runs vulnerability management with Tenable Nessus across 2,300+ hosts, driving remediation to 94% inside agreed service levels each quarter.</li>
                      <li>Maps technical controls to NIST 800-53 Rev 5 and PCI-DSS, assembling evidence packs and closing audit findings well ahead of fieldwork.</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-2 uppercase border-b border-slate-900 pb-1">Skills</h4>
                  <div className="space-y-1.5 mt-3">
                    <div className="h-1 bg-slate-200 w-full rounded"></div>
                    <div className="h-1 bg-slate-200 w-[90%] rounded"></div>
                    <div className="h-1 bg-slate-200 w-[80%] rounded"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 text-sm text-slate-500 leading-relaxed items-start">
                <Check className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                <p>Same verified experience, restructured into even two-line points so every skill, platform and result can be ticked off in a single scan without reading a narrative.</p>
              </div>
            </div>

          </div>
        </div>

        <hr className="border-slate-200 my-24" />

        {/* PART 2: Everything else is built to the same rules */}
        <div className="mb-24">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Everything else is built to the same rules.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Not a blank editor that lets you write four vague bullets and call it finished. Each section has a defined shape, and the generator fills it from your verified experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Long Mockup */}
            <div className="lg:col-span-7 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl p-8 sticky top-8">
              {/* Header block */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">Joh****</h3>
                <div className="relative border-2 border-dashed border-[#12734C] rounded-md p-2 mt-3 inline-block">
                  <div className="absolute -top-3 left-2 bg-[#12734C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Four optional fields, your choice
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Dallas, TX • +1 (813) - xxx xxxx • john.xxxx@gmail.com • linkedin.com/in/john-xxxx</p>
                </div>
              </div>

              {/* Skills block */}
              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-4 uppercase border-b border-slate-900 pb-1">Skills</h4>
                <div className="relative border-2 border-dashed border-[#12734C] rounded-md p-4">
                  <div className="absolute -top-3 left-4 bg-[#12734C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    7-8 categories • 5-8 skills each
                  </div>
                  <div className="space-y-3 text-[10px] leading-[1.6] mt-1">
                    <p><span className="font-bold text-slate-800">Security Operations & Incident Response</span> - Alert triage, containment, root cause analysis, forensic timelines, post-incident review, on-call escalation</p>
                    <p><span className="font-bold text-slate-800">SIEM, Monitoring & Threat Detection</span> - Splunk Enterprise Security, Microsoft Sentinel, correlation search tuning, MITRE ATT&CK mapping, threat hunting, log source onboarding</p>
                    <p><span className="font-bold text-slate-800">Endpoint & Cloud Security</span> - CrowdStrike Falcon, Defender for Endpoint, AWS Security Hub, GuardDuty, workload hardening</p>
                    <p><span className="font-bold text-slate-800">Vulnerability & Patch Management</span> - Tenable Nessus, risk-based prioritisation, remediation tracking, SLA reporting, patch validation</p>
                  </div>
                </div>
              </div>

              {/* Experience block */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-900 tracking-wider mb-4 uppercase border-b border-slate-900 pb-1">Professional Experience</h4>
                
                <div className="relative border-2 border-dashed border-[#12734C] rounded-md p-5 mb-8">
                  <div className="absolute -top-3 left-4 bg-[#12734C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Most recent role • 8 bullets • 18-25 words each
                  </div>
                  <div className="flex justify-between items-baseline mb-3 text-[11px] mt-1">
                    <h5 className="font-bold text-slate-900">Information Security Analyst <span className="font-normal text-slate-500">- Managed security provider, Chicago, IL</span></h5>
                    <span className="text-slate-500">Jul 2020 - Present</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-600 leading-[1.7] space-y-2 marker:text-slate-400">
                    <li>Tune correlation searches in Splunk Enterprise Security to suppress recurring noise, reducing false positive alert volume by 38% across the monitored estate.</li>
                    <li>Lead incident response on priority two and three events, coordinating containment with infrastructure teams and publishing written timelines within one business day.</li>
                    <li>Author detection playbooks now used by a nine-person security operations centre, standardising triage steps and cutting handover errors between shifts.</li>
                    <li>Map technical controls to NIST 800-53 Rev 5 ahead of the annual audit, closing twenty-three of twenty-seven findings before fieldwork opened.</li>
                    <li>Onboard new log sources into the SIEM, validating field extraction and normalisation so detections fire reliably across cloud and on-premise systems.</li>
                  </ul>
                </div>

                <div className="relative border-2 border-dashed border-slate-400/50 rounded-md p-5">
                  <div className="absolute -top-3 left-4 bg-slate-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Second role • 7 bullets
                  </div>
                  <div className="flex justify-between items-baseline mb-3 text-[11px] mt-1">
                    <h5 className="font-bold text-slate-900">Cyber Security Analyst <span className="font-normal text-slate-500">- Global e-commerce company, Dallas, TX</span></h5>
                    <span className="text-slate-500">Jan 2018 - Jul 2020</span>
                  </div>
                  <ul className="list-disc pl-4 text-[10px] text-slate-600 leading-[1.7] space-y-2 marker:text-slate-400">
                    <li>Investigated roughly one hundred and fifty endpoint alerts each month in CrowdStrike Falcon, escalating fourteen confirmed intrusions with full scope and timeline.</li>
                    <li>Built a SOAR playbook that automatically triaged reported phishing messages, reducing median response time from forty-five minutes to nine.</li>
                    <li>Enriched alert data with threat intelligence feeds so analysts could judge severity without pivoting between four separate consoles during triage.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Right Column: Text Blocks */}
            <div className="lg:col-span-5 flex flex-col gap-12 pt-4">
              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2">Contact details, only the ones you choose</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Phone, email, location and LinkedIn sit directly under your name. Select any combination - the résumé shows exactly what you picked and nothing else.
                </p>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2"><span className="text-[#12734C]">7-8</span> skill categories, <span className="text-[#12734C]">5-8</span> skills in each</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Category names are generated for your profession rather than pulled from a fixed list, and every skill has to be backed by your experience, projects or certifications. Nothing gets added just because it appeared in the posting.
                </p>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2"><span className="text-[#12734C]">8</span> bullets on your current role, <span className="text-[#12734C]">7</span> on every role before it</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  In reverse chronological order, with job title, company, location and dates on each. Every position you enter appears - none are quietly dropped to save space.
                </p>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2"><span className="text-[#12734C]">18-25</span> words per bullet, about two lines</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Each one follows the same shape: a strong action verb, the specific task, the tool or method you used, why the work mattered, and the result. Present tense for your current role, past tense for the rest.
                </p>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2">No two bullets alike</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Points are written for that employer and that environment, so the same sentence never turns up under two different jobs. "Worked on", "helped with" and "responsible for" don't appear at all.
                </p>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2">Nothing invented</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  No employers, projects, tools, achievements or numbers that aren't yours. Where a precise metric doesn't exist, the bullet uses a specific qualitative result instead of a made-up figure.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* PART 3: Comparison Table */}
        <div className="max-w-4xl mx-auto mt-32">
          <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm w-1/3">Section</th>
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm w-1/3">Full time</th>
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm w-1/3">Contract / C2C</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-5 px-6 text-sm text-slate-500 font-medium">Professional summary</td>
                  <td className="py-5 px-6 text-sm text-slate-500">One paragraph, 90-120 words, about six lines</td>
                  <td className="py-5 px-6 text-sm text-slate-500">8-10 points, two lines each</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 text-sm text-slate-500 font-medium">Contact fields</td>
                  <td className="py-5 px-6 text-sm text-slate-500">Phone, email, location, LinkedIn - your choice</td>
                  <td className="py-5 px-6 text-sm text-slate-500">Same</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 text-sm text-slate-500 font-medium">Skills</td>
                  <td className="py-5 px-6 text-sm text-slate-500">7-8 categories, 5-8 skills each</td>
                  <td className="py-5 px-6 text-sm text-slate-500">Same</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 text-sm text-slate-500 font-medium">Experience bullets</td>
                  <td className="py-5 px-6 text-sm text-slate-500">8 on the current role, 7 on each earlier role</td>
                  <td className="py-5 px-6 text-sm text-slate-500">Same</td>
                </tr>
                <tr>
                  <td className="py-5 px-6 text-sm text-slate-500 font-medium">Bullet length</td>
                  <td className="py-5 px-6 text-sm text-slate-500">18-25 words, roughly two lines</td>
                  <td className="py-5 px-6 text-sm text-slate-500">Same</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-slate-400 mt-6 font-medium">
            Both types are generated from the same profile. Switch between them any time without retyping a thing.
          </p>
        </div>

      </div>
    </section>
  );
}
