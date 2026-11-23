"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export function ResumeBuilderOneLanding() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="landing-page">


{/*  ================= NAV =================  */}
<header className="nav">
  <div className="wrap">
    <Link className="logo" href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/LOGO-dark.png"
      alt="ResumeBuilderOne.com"
      className="h-12 sm:h-14 md:h-15 w-auto object-contain transition-transform hover:scale-[1.02]"
    />
  </Link>
    <nav>
      <a href="#how">How it works</a>
      <a href="#formats">Resume types</a>
      <a href="#report">The match report</a>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
    </nav>
    <div className="acts">
      <a className="sign" href="#">Sign in</a>
      <a className="b b-fill" href="#pricing">Start free</a>
    </div>
  </div>
</header>

{/*  ================= HERO =================  */}
<section className="hero" id="top">
  <div className="wrap">
    <div>
      <h1 style={{ color: "#FFFFFF" }}>One resume won't get you ten jobs.</h1>
      <p className="sub">Paste the job posting. Get a resume rewritten for that specific role - plus a report showing exactly which words matched, which are missing, and what to fix before you send it.</p>
      <div className="cta">
        <Link className="b b-fill b-lg" href="/register">Build my first resume free</Link>
        <a className="b b-ghost-dark b-lg" href="#report">See how scoring works</a>
      </div>
      <p className="fine">10 tailored resumes free. No card needed to start.</p>
    </div>

    <div className="demo">
      <div className="doc">
        <div className="nm">Joh****</div>
        <div className="ct">Dallas, TX · +1 (813) - xxx xxxx · linkedin.com/in/john-xxxx</div>
        <h4>Summary</h4>
        <p>Information security analyst with five years across cloud and financial-services environments. Runs <mark className="k">incident response</mark> end to end and tunes <mark className="k">SIEM</mark> detections analysts actually trust.</p>
        <h4>Experience</h4>
        <div className="jb"><span><b>Information Security Analyst</b> - Public sector agency</span><i>Jul 2026 - Now</i></div>
        <ul>
          <li>Tuned 40+ <mark className="k">Splunk ES</mark> correlation searches, cutting false positives 38%.</li>
          <li>Led <mark className="k">incident response</mark> on 60 P2/P3 events and wrote the SOC playbooks.</li>
        </ul>
        <div className="jb"><span><b>Cyber Security Analyst</b> - Global e-commerce company</span><i>2023</i></div>
        <ul>
          <li>Investigated ~150 endpoint alerts a month in <mark className="k">CrowdStrike Falcon</mark>.</li>
          <li><mark className="n">Reviewed IAM access quarterly</mark> across 400+ accounts.</li>
        </ul>
      </div>
      <div className="pin pin-score">
        <div className="ring">
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="5"/>
            <circle cx="24" cy="24" r="20" fill="none" stroke="#4FBE92" strokeWidth="5" strokeLinecap="round" strokeDasharray="125.7" strokeDashoffset="11.3"/>
          </svg>
          <div className="v num">91</div>
        </div>
        <div><b>Match score</b><span>Up from 74</span></div>
      </div>
      <div className="pin pin-kw">
        <b>Found in the posting</b>
        <div className="tags"><span>incident response</span><span>Splunk ES</span><span>NIST 800-53</span><span className="miss">KQL</span><span className="miss">Sentinel</span></div>
      </div>
    </div>
  </div>
</section>

{/*  ================= PROBLEM =================  */}
<section className="sec sec-alt">
  <div className="wrap prob">
    <div>
      <div className="lede">
        <h2>Your resume is probably read by software first.</h2>
        <p>Most mid-size and large employers run applications through a tracking system that looks for the language in their own posting. If your wording doesn't line up, a person may never open the file - no matter how good the work behind it was.</p>
      </div>
    </div>
    <div className="prob-list">
      <div>
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
        <div><b>Sending the same file everywhere</b><p>A posting for a detection engineer and one for a GRC analyst want different halves of your experience. One document can't lead with both.</p></div>
      </div>
      <div>
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
        <div><b>Guessing at keywords</b><p>You can read a posting three times and still miss the four terms the filter is actually scanning for.</p></div>
      </div>
      <div>
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
        <div><b>Bullets that describe duties</b><p>"Responsible for monitoring alerts" says what you were assigned. It doesn't say what changed because you were there.</p></div>
      </div>
      <div>
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
        <div><b>Templates that break the parser</b><p>Text boxes, columns and icons often come out scrambled on the other side. You'd never know.</p></div>
      </div>
    </div>
  </div>
</section>

{/*  ================= HOW IT WORKS =================  */}
<section className="sec sec-dark" id="how">
  <div className="wrap">
    <div className="lede">
      <h2 style={{ color: "#FFFFFF" }}>Three steps, about two minutes.</h2>
      <p>You write your career history once. After that, every application is a paste and a click.</p>
    </div>

    <div className="steps">
      <div className="stp">
        <span className="n num">1</span>
        <h3>Write your profile once</h3>
        <p>Jobs, education, projects, certifications, skills. Import it from LinkedIn or type it in. You never re-enter it again.</p>
        <div className="shot">
          <div className="mini-field">Information Security Analyst - 2026 to now</div>
          <div className="mini-field">Cyber Security Analyst - 2023</div>
          <div className="mini-field">M.S. Cybersecurity - 2021 to 2023</div>
        </div>
      </div>
      <div className="stp">
        <span className="n num">2</span>
        <h3>Paste the job posting</h3>
        <p>The whole thing - responsibilities, requirements, the lot. We pull out the terms and priorities the employer actually wrote down.</p>
        <div className="shot">
          <div className="mini-field" style={{ height: '52px', lineHeight: '1.45' }}>We're hiring a Security Investigator to own end-to-end investigations across Sentinel and Defender XDR...</div>
          <div style={{ marginTop: '9px' }}>
            <span className="mini-chip">incident response</span><span className="mini-chip">Sentinel</span><span className="mini-chip">KQL</span><span className="mini-chip">SOC</span>
          </div>
        </div>
      </div>
      <div className="stp">
        <span className="n num">3</span>
        <h3>Get the resume and the report</h3>
        <p>A finished page in your chosen template, and a breakdown of what matched, what's missing, and which bullets to strengthen.</p>
        <div className="shot">
          <div className="mini-lab"><span>Keywords</span><b className="num">88%</b></div><div className="mini-bar"><i style={{ width: '88%' }}></i></div>
          <div className="mini-lab"><span>Title fit</span><b className="num">95%</b></div><div className="mini-bar"><i style={{ width: '95%' }}></i></div>
          <div className="mini-lab"><span>Quantified results</span><b className="num">72%</b></div><div className="mini-bar"><i style={{ width: '72%' }}></i></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ================= BEFORE / AFTER =================  */}
<section className="sec sec-dark" style={{ paddingTop: '0' }}>
  <div className="wrap">
    <div className="lede">
      <h2 style={{ color: "#FFFFFF" }}>The same person. The same jobs. Two very different pages.</h2>
      <p>Nothing here is invented - we don't add experience you don't have. We choose what to lead with, and we say it in the employer's own vocabulary.</p>
    </div>

    <div className="ba">
      <div className="ba-col bad">
        <div className="tag">
          <span className="sc num">74</span>
          <span className="tx"><b>Before</b><span>A general-purpose resume</span></span>
        </div>
        <div className="ba-doc">
          <div className="nm">Joh****</div>
          <div className="ct">Dallas, TX · john.xxxx@gmail.com</div>
          <h4>Summary</h4>
          <p><mark className="w">Motivated and detail-oriented professional with a passion for cybersecurity and a proven track record of success in fast-paced environments.</mark></p>
          <h4>Experience</h4>
          <div className="jb"><span><b>Information Security Analyst</b> - Public sector agency</span><i>2026 - Now</i></div>
          <ul>
            <li><mark className="w">Responsible for monitoring security alerts and escalating incidents.</mark></li>
            <li><mark className="w">Assisted with compliance activities and audit preparation.</mark></li>
          </ul>
          <div className="jb"><span><b>Cyber Security Analystr</b> - Global e-commerce company</span><i>2023</i></div>
          <ul>
            <li><mark className="w">Worked with various security tools on a daily basis.</mark></li>
            <li><mark className="w">Participated in team meetings and knowledge sharing.</mark></li>
          </ul>
          <h4>Skills</h4>
          <p><mark className="w">JavaScript, React.js, Node.js, TypeScript, Figma, Agile</mark></p>
        </div>
        <p className="ba-note bad">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4m0 4h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
          Adjectives instead of outcomes, a skills list from a different career, and a typo in a job title. A filter sees very little to match on.
        </p>
      </div>

      <div className="ba-col good">
        <div className="tag">
          <span className="sc num">91</span>
          <span className="tx"><b>After</b><span>Tailored to one posting</span></span>
        </div>
        <div className="ba-doc">
          <div className="nm">Joh****</div>
          <div className="ct">Dallas, TX · john.xxxx@gmail.com</div>
          <h4>Summary</h4>
          <p>Security analyst with five years in cloud and financial-services environments. Runs <mark className="k">incident response</mark> end to end and tunes <mark className="k">SIEM</mark> detections analysts trust.</p>
          <h4>Experience</h4>
          <div className="jb"><span><b>Information Security Analyst</b> - Public sector agency</span><i>2026 - Now</i></div>
          <ul>
            <li>Tuned 40+ <mark className="k">Splunk ES</mark> correlation searches, cutting false positives 38%.</li>
            <li>Mapped controls to <mark className="k">NIST 800-53</mark>, closing 23 of 27 findings before fieldwork.</li>
          </ul>
          <div className="jb"><span><b>Cyber Security Analyst</b> - Global e-commerce company</span><i>2023</i></div>
          <ul>
            <li>Investigated ~150 endpoint alerts a month in <mark className="k">CrowdStrike Falcon</mark>.</li>
            <li>Built a <mark className="k">SOAR</mark> playbook that cut phishing response from 45 minutes to 9.</li>
          </ul>
          <h4>Skills</h4>
          <p>Splunk ES · CrowdStrike Falcon · Nessus · MITRE ATT&amp;CK · NIST 800-53 · Python</p>
        </div>
        <p className="ba-note good">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 12 5 5L20 6"/></svg>
          Same jobs, same dates. Now every bullet ends in a result, the vocabulary matches the posting, and the typo is gone.
        </p>
      </div>
    </div>
  </div>
</section>

{/*  ================= RESUME FORMATS =================  */}
<section className="sec sec-alt" id="formats">
  <div className="wrap">
    <div className="lede">
      <h2>Two resume types. One difference, and it's the part recruiters read first.</h2>
      <p>Pick full time or contract before you generate. Everything below the professional summary follows the same rules - the summary itself is built two different ways.</p>
    </div>

    <div className="fmt">
      {/*  FULL TIME  */}
      <div>
        <div className="fmt-head">
          <span className="pillx">Full time</span>
          <b>Summary as one paragraph</b>
        </div>
        <div className="fmt-doc crop">
          <div className="nm">Joh****</div>
          <div className="ct">Dallas, TX · +1 (813) - xxx xxxx · john.xxxx@gmail.com · linkedin.com/in/john-xxxx</div>

          <h4>Professional summary</h4>
          <div className="hl">
            <span className="lbl">One paragraph · 90-120 words · about six lines</span>
            <p>Information Security Analyst with over five years of experience across cloud, retail and financial services environments, specialising in security operations, detection engineering and incident response. Works hands-on with Splunk Enterprise Security, CrowdStrike Falcon, Microsoft Sentinel and Tenable Nessus to monitor hybrid estates, tune detections and drive remediation to closure. Has led response on more than sixty priority incidents, authored the playbooks now used across a nine-person security operations centre, and mapped technical controls to NIST 800-53 Rev 5 ahead of annual audit. Partners closely with cloud, infrastructure and compliance teams, and brings the investigative depth this detection engineering role requires.</p>
          </div>

          <h4>Skills</h4>
          <div className="fade-lines">
            <i className="pl" style={{ width: '96%' }}></i><i className="pl" style={{ width: '88%' }}></i><i className="pl" style={{ width: '92%' }}></i><i className="pl" style={{ width: '74%' }}></i><i className="pl" style={{ width: '90%' }}></i>
          </div>
        </div>
        <p className="fmt-why">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 12 5 5L20 6"/></svg>
          Built to a fixed formula: target title, verified years of experience, domain, core expertise, hands-on tools, major responsibilities, proven impact, and the value you bring to that specific role - written as one connected paragraph, never a list.
        </p>
      </div>

      {/*  C2C  */}
      <div>
        <div className="fmt-head">
          <span className="pillx c2c">Contract / C2C</span>
          <b>Summary as 8-10 two-line points</b>
        </div>
        <div className="fmt-doc crop">
          <div className="nm">Joh****</div>
          <div className="ct">Dallas, TX · +1 (813) - xxx xxxx · john.xxxx@gmail.com · linkedin.com/in/john-xxxx</div>

          <h4>Professional summary</h4>
          <div className="hl c2c">
            <span className="lbl">8-10 points · two lines each</span>
            <ul>
              <li>Five-plus years in security operations across cloud, retail and banking environments, covering round-the-clock SOC coverage and project delivery.</li>
              <li>Hands-on daily with Splunk Enterprise Security, CrowdStrike Falcon and Microsoft Sentinel for detection, triage and threat hunting across hybrid estates.</li>
              <li>Owns incident response end to end, from the first alert through containment and eradication to the written timeline handed over after closure.</li>
              <li>Detection engineering: authored and tuned 40+ correlation searches, cutting false positives 38% and returning analyst hours to real casework.</li>
              <li>Builds SOAR automation for repetitive triage, including a phishing playbook that brought median response time down from 45 minutes to nine.</li>
              <li>Runs vulnerability management with Tenable Nessus across 2,300+ hosts, driving remediation to 94% inside agreed service levels each quarter.</li>
              <li>Maps technical controls to NIST 800-53 Rev 5 and PCI-DSS, assembling evidence packs and closing audit findings well ahead of fieldwork.</li>
              <li>Writes Python and SQL for log parsing, enrichment and reporting, replacing manual spreadsheet work with scheduled jobs the team relies on.</li>
              <li>Secures cloud environments through Security Hub, GuardDuty and quarterly IAM access reviews covering more than 400 privileged accounts.</li>
              <li>Certified Ethical Hacker holding a master's degree in cybersecurity; available immediately for remote or onsite engagements across the US.</li>
            </ul>
          </div>

          <h4>Skills</h4>
          <div className="fade-lines">
            <i className="pl" style={{ width: '96%' }}></i><i className="pl" style={{ width: '88%' }}></i><i className="pl" style={{ width: '92%' }}></i>
          </div>
        </div>
        <p className="fmt-why c2c">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 12 5 5L20 6"/></svg>
          Same verified experience, restructured into even two-line points so every skill, platform and result can be ticked off in a single scan without reading a narrative.
        </p>
      </div>
    </div>

    {/*  ---------- SHARED ANATOMY ----------  */}
    <div className="lede" style={{ marginTop: '76px' }}>
      <h2>Everything else is built to the same rules.</h2>
      <p>Not a blank editor that lets you write four vague bullets and call it finished. Each section has a defined shape, and the generator fills it from your verified experience.</p>
    </div>

    <div className="anat">
      <div className="fmt-doc">
        <div className="nm">Joh****</div>
        <div className="hl" style={{ marginTop: '9px' }}>
          <span className="lbl">Four optional fields, your choice</span>
          <p style={{ fontFamily: 'var(--ui)', fontSize: '9.2px', color: '#4a4a4a', margin: '0' }}>Dallas, TX · +1 (813) - xxx xxxx · john.xxxx@gmail.com · linkedin.com/in/john-xxxx</p>
        </div>

        <h4>Skills</h4>
        <div className="hl">
          <span className="lbl">7-8 categories · 5-8 skills each</span>
          <p className="skl"><b>Security Operations &amp; Incident Response - </b> Alert triage, containment, root cause analysis, forensic timelines, post-incident review, on-call escalation</p>
          <p className="skl"><b>SIEM, Monitoring &amp; Threat Detection - </b> Splunk Enterprise Security, Microsoft Sentinel, correlation search tuning, MITRE ATT&amp;CK mapping, threat hunting, log source onboarding</p>
          <p className="skl"><b>Endpoint &amp; Cloud Security - </b> CrowdStrike Falcon, Defender for Endpoint, AWS Security Hub, GuardDuty, workload hardening</p>
          <p className="skl"><b>Vulnerability &amp; Patch Management - </b> Tenable Nessus, risk-based prioritisation, remediation tracking, SLA reporting, patch validation</p>
          <p className="skl"><b>Identity &amp; Access Management - </b> Active Directory, Okta, quarterly access reviews, privileged account cleanup, MFA rollout, role design</p>
          <p className="skl"><b>Governance, Risk &amp; Compliance - </b> NIST 800-53 Rev 5, PCI-DSS, control mapping, evidence collection, audit support</p>
          <p className="skl"><b>Scripting, Querying &amp; Automation - </b> Python, SQL, KQL, SPL, SOAR playbooks, scheduled reporting jobs</p>
        </div>

        <h4>Professional experience</h4>
        <div className="hl">
          <span className="lbl">Most recent role · 8 bullets · 18-25 words each</span>
          <div className="jb" style={{ marginBottom: '5px' }}><span><b>Information Security Analyst</b> - Managed security provider, Chicago, IL</span><i>Jul 2026 - Present</i></div>
          <ul>
            <li>Tune correlation searches in Splunk Enterprise Security to suppress recurring noise, reducing false positive alert volume by 38% across the monitored estate.</li>
            <li>Lead incident response on priority two and three events, coordinating containment with infrastructure teams and publishing written timelines within one business day.</li>
            <li>Author detection playbooks now used by a nine-person security operations centre, standardising triage steps and cutting handover errors between shifts.</li>
            <li>Map technical controls to NIST 800-53 Rev 5 ahead of the annual audit, closing twenty-three of twenty-seven findings before fieldwork opened.</li>
            <li>Onboard new log sources into the SIEM, validating field extraction and normalisation so detections fire reliably across cloud and on-premise systems.</li>
            <li>Hunt for lateral movement using MITRE ATT&amp;CK techniques as a guide, surfacing two credential misuse patterns missed by existing scheduled detections.</li>
            <li>Run quarterly access reviews across privileged accounts with the identity team, removing standing permissions that no longer match documented job roles.</li>
            <li>Present monthly detection coverage metrics to security leadership, using the gaps identified to prioritise the following quarter's engineering backlog.</li>
          </ul>
        </div>

        <div className="hl" style={{ borderStyle: 'solid', borderColor: 'var(--line)' }}>
          <span className="lbl" style={{ background: 'var(--ink-3)' }}>Second role · 7 bullets</span>
          <div className="jb" style={{ marginBottom: '5px' }}><span><b>Cyber Security Analyst</b> - Global e-commerce company, Dallas, TX</span><i>Jan 2023 - Jul 2023</i></div>
          <ul>
            <li>Investigated roughly one hundred and fifty endpoint alerts each month in CrowdStrike Falcon, escalating fourteen confirmed intrusions with full scope and timeline.</li>
            <li>Built a SOAR playbook that automatically triaged reported phishing messages, reducing median response time from forty-five minutes to nine.</li>
            <li>Enriched alert data with threat intelligence feeds so analysts could judge severity without pivoting between four separate consoles during triage.</li>
            <li>Documented recurring false positive sources and proposed tuning changes that removed close to nine hundred low-value alerts each month.</li>
            <li>Partnered with cloud engineering to remediate misconfigured storage buckets identified through Security Hub findings before external exposure occurred.</li>
            <li>Wrote Python scripts to parse and summarise proxy logs, replacing a manual spreadsheet process that consumed several analyst hours weekly.</li>
            <li>Contributed to tabletop exercises simulating ransomware scenarios, capturing gaps in escalation paths that were closed before the following quarter.</li>
          </ul>
        </div>
      </div>

      <div>
        <div className="rule" style={{ borderTop: '0' }}>
          <b>Contact details, only the ones you choose</b>
          <p>Phone, email, location and LinkedIn sit directly under your name. Select any combination - the resume shows exactly what you picked and nothing else.</p>
        </div>
        <div className="rule">
          <b><span className="cnt">7-8</span> skill categories, <span className="cnt">5-8</span> skills in each</b>
          <p>Category names are generated for your profession rather than pulled from a fixed list, and every skill has to be backed by your experience, projects or certifications. Nothing gets added just because it appeared in the posting.</p>
        </div>
        <div className="rule">
          <b><span className="cnt">8</span> bullets on your current role, <span className="cnt">7</span> on every role before it</b>
          <p>In reverse chronological order, with job title, company, location and dates on each. Every position you enter appears - none are quietly dropped to save space.</p>
        </div>
        <div className="rule">
          <b><span className="cnt">18-25</span> words per bullet, about two lines</b>
          <p>Each one follows the same shape: a strong action verb, the specific task, the tool or method you used, why the work mattered, and the result. Present tense for your current role, past tense for the rest.</p>
        </div>
        <div className="rule">
          <b>No two bullets alike</b>
          <p>Points are written for that employer and that environment, so the same sentence never turns up under two different jobs. "Worked on", "helped with" and "responsible for" don't appear at all.</p>
        </div>
        <div className="rule">
          <b>Nothing invented</b>
          <p>No employers, projects, tools, achievements or numbers that aren't yours. Where a precise metric doesn't exist, the bullet uses a specific qualitative result instead of a made-up figure.</p>
        </div>
      </div>
    </div>

    <div className="cmp">
      <div className="r h"><div>Section</div><div>Full time</div><div>Contract / C2C</div></div>
      <div className="r"><div>Professional summary</div><div>One paragraph, 90-120 words, about six lines</div><div>8-10 points, two lines each</div></div>
      <div className="r"><div>Contact fields</div><div>Phone, email, location, LinkedIn - your choice</div><div>Same</div></div>
      <div className="r"><div>Skills</div><div>7-8 categories, 5-8 skills each</div><div>Same</div></div>
      <div className="r"><div>Experience bullets</div><div>8 on the current role, 7 on each earlier role</div><div>Same</div></div>
      <div className="r"><div>Bullet length</div><div>18-25 words, roughly two lines</div><div>Same</div></div>
    </div>

    <p className="stud" style={{ marginTop: '24px' }}>Both types are generated from the same profile. Switch between them any time without retyping a thing.</p>
  </div>
</section>

{/*  ================= THE REPORT =================  */}
<section className="sec" id="report">
  <div className="wrap">
    <div className="lede">
      <h2>A score on its own is useless. This tells you what to do.</h2>
      <p>Plenty of tools hand you a number. The part worth paying for is the sentence underneath it - the one that names the problem and offers to fix it.</p>
    </div>

    <div className="rep" style={{ marginTop: '44px' }}>
      <div className="rep-card">
        <div className="rep-head">
          <div className="ring">
            <svg width="62" height="62" viewBox="0 0 62 62" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="31" cy="31" r="26" fill="none" stroke="var(--line-soft)" strokeWidth="6"/>
              <circle cx="31" cy="31" r="26" fill="none" stroke="var(--brand)" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.4" strokeDashoffset="14.7"/>
            </svg>
            <div className="v num">91</div>
          </div>
          <div><b>Strong match</b><p>Up from 74. Above 85 clears most automated screens for this role.</p></div>
        </div>
        <div className="rep-brk">
          <div><div className="l"><span>Keywords from the posting</span><b className="num">88%</b></div><div className="meter"><i style={{ width: '88%' }}></i></div></div>
          <div><div className="l"><span>Title and seniority fit</span><b className="num">95%</b></div><div className="meter"><i style={{ width: '95%' }}></i></div></div>
          <div><div className="l"><span>Results with numbers in them</span><b className="num">72%</b></div><div className="meter warn"><i style={{ width: '72%' }}></i></div></div>
          <div><div className="l"><span>Machine readability</span><b className="num">98%</b></div><div className="meter"><i style={{ width: '98%' }}></i></div></div>
        </div>
        <div className="rep-fix">
          <span className="tag"></span>
          <div>
            <b>Four required terms are missing</b>
            <p>The posting names these. None appear on your page.</p>
            <div className="chipset"><span>Microsoft Sentinel</span><span>KQL</span><span>Defender XDR</span><span>Purview DLP</span></div>
            <div className="row"><span className="b b-fill">Add the ones I've used</span><span className="b b-line">Ignore</span></div>
          </div>
        </div>
      </div>

      <div className="why">
        <div><b>It reads the posting, not a generic template</b><p>The keywords come from the job you pasted - not a stock list for "security roles". Two postings for the same title produce two different reports.</p></div>
        <div><b>Every problem comes with a fix</b><p>Missing terms, bullets with no outcome, a summary that repeats your first job. Each one has a button that rewrites it, and you approve the change before it lands.</p></div>
        <div><b>You can see what changed</b><p>Flip between the original and the tailored version. Nothing is edited behind your back, and nothing gets invented - we only work with what's in your profile.</p></div>
        <div><b>It checks the file, not just the words</b><p>Machine readability tests whether a parser can actually extract your name, dates and job titles. A beautiful resume that comes out scrambled is worse than a plain one.</p></div>
      </div>
    </div>
  </div>
</section>

{/*  ================= FEATURES =================  */}
<section className="sec sec-alt" id="features">
  <div className="wrap">
    <div className="lede">
      <h2>What you get with a subscription</h2>
      <p>Built for the weeks when you're sending five or ten applications and each one needs its own version.</p>
    </div>

    <div className="feats">
      <div className="ft">
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 5v14M5 12h14"/></svg></span>
        <b>Unlimited tailored resumes</b>
        <p>A separate version for every posting, each stored with the job it was written for so you know which one you actually sent.</p>
      </div>
      <div className="ft">
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 8v4l3 2"/></svg></span>
        <b>The full match report</b>
        <p>Not just a number. Every missing keyword, every weak bullet, every fix - with a one-click rewrite you approve.</p>
      </div>
      <div className="ft">
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span>
        <b>Cover letters that match</b>
        <p>Written from the same posting and the same resume, so the story you tell in the letter is the story on the page.</p>
      </div>
      <div className="ft">
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 20h16"/></svg></span>
        <b>PDF and Word export</b>
        <p>Some application portals only accept .docx. Both formats keep the same layout and stay readable to a parser.</p>
      </div>
      <div className="ft">
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg></span>
        <b>Interview questions from the posting</b>
        <p>The five things they're most likely to ask, drawn from the requirements you were just matched against.</p>
      </div>
      <div className="ft">
        <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></span>
        <b>Version history</b>
        <p>Every rewrite is saved. If the older wording was better, go back to it in one click.</p>
      </div>
    </div>
  </div>
</section>

{/*  ================= TEMPLATES =================  */}
<section className="sec">
  <div className="wrap">
    <div className="lede">
      <h2>ATS-friendly templates, all of them parser-safe.</h2>
      <p>No text boxes, no icons in place of words, no two-column tricks that scramble on the way in. Plain structure underneath, whichever one you pick.</p>
    </div>
    <div className="tpls">
      <div><div className="tp-prev"><i className="pl h"></i><i className="pl" style={{ width: '70%' }}></i><i className="pl r"></i><i className="pl"></i><i className="pl" style={{ width: '92%' }}></i><i className="pl" style={{ width: '80%' }}></i><i className="pl r"></i><i className="pl" style={{ width: '88%' }}></i><i className="pl" style={{ width: '64%' }}></i></div><b>Classic</b><span>Safest for large employers</span></div>
      <div><div className="tp-prev"><i className="pl h" style={{ background: 'var(--brand)', width: '48%' }}></i><i className="pl" style={{ width: '66%' }}></i><i className="pl r a"></i><i className="pl"></i><i className="pl" style={{ width: '85%' }}></i><i className="pl r a"></i><i className="pl" style={{ width: '90%' }}></i><i className="pl" style={{ width: '58%' }}></i></div><b>Accent</b><span>Coloured section rules</span></div>
      <div><div className="tp-prev"><i className="pl h" style={{ width: '100%', height: '18px', background: '#3E4A5C', marginBottom: '9px' }}></i><i className="pl" style={{ width: '74%' }}></i><i className="pl r"></i><i className="pl"></i><i className="pl" style={{ width: '83%' }}></i><i className="pl r"></i><i className="pl" style={{ width: '70%' }}></i></div><b>Header block</b><span>Reads well printed</span></div>
      {/* Commented template 4 per user requirement:
<div><div className="tp-prev"><i className="pl h" style={{ width: '64%' }}></i><i className="pl" style={{ width: '44%' }}></i><div style={{ display: 'flex', gap: '6px', marginTop: '9px' }}><div style={{ flex: '1' }}><i className="pl r" style={{ width: '70%' }}></i><i className="pl"></i><i className="pl" style={{ width: '86%' }}></i><i className="pl" style={{ width: '60%' }}></i></div><div style={{ width: '30%' }}><i className="pl r" style={{ width: '90%' }}></i><i className="pl"></i><i className="pl" style={{ width: '80%' }}></i></div></div></div><b>Two column</b><span>Fits more on one page</span></div>
*/}
      <div><div className="tp-prev"><i className="pl" style={{ width: '100%', height: '6px', background: 'var(--brand)', marginBottom: '9px' }}></i><i className="pl h" style={{ width: '58%' }}></i><i className="pl" style={{ width: '70%' }}></i><i className="pl r"></i><i className="pl"></i><i className="pl" style={{ width: '88%' }}></i><i className="pl" style={{ width: '62%' }}></i></div><b>Top rule</b><span>For design-adjacent roles</span></div>
    </div>
  </div>
</section>

{/*  ================= PRICING =================  */}
<section className="sec sec-alt" id="pricing">
  <div className="wrap">
    <div className="lede mid">
      <h2>Free until you're serious. Then $9.</h2>
      <p>About the price of one coffee a fortnight, for the month you're actually job hunting. Cancel from settings in two clicks.</p>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div className="bill">
        <button aria-pressed="true" data-bill="m">Monthly</button>
        <button data-bill="y">Yearly - two months free</button>
      </div>
    </div>

    <div className="plans">
      <div className="plan">
        <h3>Free</h3>
        <div className="amt">$0</div>
        <p className="blurb">Enough to build a real resume and judge the scoring for yourself.</p>
        <a className="b b-line" style={{ width: '100%' }} href="#">Create a free account</a>
        <ul>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>10 tailored resumes</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>All five templates</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>Match score, without the breakdown</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>PDF download</li>
          <li className="off"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M6 12h12"/></svg>No cover letters</li>
          <li className="off"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M6 12h12"/></svg>No Word export</li>
        </ul>
      </div>

      <div className="plan pro">
        <span className="pop">What most students pick</span>
        <h3>Pro</h3>
        <div className="amt"><span data-price>$9</span><small data-per>/month</small></div>
        <p className="blurb">For an active search - when every application needs its own version and you want to know why a score is what it is.</p>
        <a className="b b-fill" style={{ width: '100%' }} href="#">Start free, upgrade any time</a>
        <ul>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>Unlimited tailored resumes</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>The full match report, with one-click rewrites</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>Cover letters from the same posting</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>PDF and Word export</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>Interview questions from the job description</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>Version history</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="m4 12 5 5L20 6"/></svg>Replies within a day</li>
        </ul>
      </div>
    </div>
    <p className="stud">Studying? Verify a .edu address for 40% off - $5.40 a month.</p>
  </div>
</section>

{/*  ================= FAQ =================  */}
<section className="sec">
  <div className="wrap">
    <div className="lede mid"><h2>Questions worth asking</h2></div>
    <div className="faq">
      <details open>
        <summary>Will this guarantee me an interview?</summary>
        <p>No, and be careful with any tool that says it will. What it does is make sure your resume is readable by the software, uses the language of the posting, and leads with the experience that role cares about. That gets you in front of a person more often - the rest is your experience and the interview.</p>
      </details>
      <details>
        <summary>Does it invent experience I don't have?</summary>
        <p>Never. It only works with what's in your profile. It chooses what to lead with, rewrites duties as outcomes, and matches the employer's vocabulary - but if you haven't used a tool, it won't claim you have. You approve every change before it lands on the page.</p>
      </details>
      <details>
        <summary>How is the match score calculated?</summary>
        <p>Four things: how many terms from the posting appear on your page, how closely your titles and seniority line up, how many bullets end in a measurable result, and whether a parser can cleanly extract your name, dates and employers. Each is shown separately so you can see what's dragging the number down.</p>
      </details>
      <details>
        <summary>What happens to my resumes if I cancel?</summary>
        <p>They stay in your account and stay downloadable. Cancelling drops you to the Free plan - you lose the breakdown and the ability to tailor new ones past ten, but nothing you've already made disappears.</p>
      </details>
      <details>
        <summary>Is my job search private?</summary>
        <p>Your profile, the postings you paste and the resumes you build are visible only to you. We don't sell data to recruiters and we don't tell anyone which companies you're applying to.</p>
      </details>
      <details>
        <summary>I'm a student with no work experience. Is this useful?</summary>
        <p>Yes, and arguably more so. Projects, coursework, internships and volunteer work all carry keywords - they're just usually written in the wrong register. The report will tell you which of your projects to lead with for a given posting, and where a number would help.</p>
      </details>
    </div>
  </div>
</section>

{/*  ================= FINAL CTA =================  */}
<section className="sec-dark">
  <div className="wrap final">
    <h2 style={{ color: "#FFFFFF" }}>Your next application deserves its own resume.</h2>
    <p>Build your profile once, then paste a posting and see what the report says. It costs nothing to find out.</p>
    <div className="cta">
      <Link className="b b-fill b-lg" href="/register">Build my first resume free</Link>
      <a className="b b-ghost-dark b-lg" href="#pricing">Compare the plans</a>
    </div>
    <p className="fine">10 tailored resumes free. No card needed to start.</p>
  </div>
</section>

<footer className="foot">
  <div className="wrap">
    <span>&copy; 2026 ResumeBuilderOne</span>
    <nav>
      <a href="#how">How it works</a>
      <a href="#pricing">Pricing</a>
      <Link href="/privacy">Privacy</Link>
      <Link href="/terms">Terms</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </div>
</footer>



    </div>
  );
}
