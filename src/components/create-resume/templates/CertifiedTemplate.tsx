import React from 'react';
import type { ResumeTemplateProps } from './types';

// Helper to parse **bold** text in bullets
const parseBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const CertifiedTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ resumeData, profileData, themeColor, fontFamily }, ref) => {
    const ACCENT = themeColor || '#005580'; // Dark blue
    const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

    const SectionHeader = ({ title }: { title: string }) => (
      <div className="flex items-center mb-2 mt-3.5 w-full break-inside-avoid">
        <div style={{ width: '5px', height: '18px', backgroundColor: ACCENT }} className="mr-2"></div>
        <h2 className="font-bold uppercase tracking-wider m-0" style={{ fontSize: '11pt', color: ACCENT }}>
          {title}
        </h2>
        <div className="flex-1 ml-2.5 h-[1px] bg-slate-200"></div>
      </div>
    );

    const experiences = resumeData.experience || [];
    const firstExp = experiences.slice(0, 1);
    const secondExp = experiences.slice(1);
    const hasPage2 = secondExp.length > 0 || (resumeData.education && resumeData.education.length > 0) || (resumeData.certifications && resumeData.certifications.length > 0);

    return (
      <div ref={ref} className="space-y-8 print:space-y-0 text-black">
        {/* ─── PAGE 1 ─── */}
        <div 
          className="resume-page bg-white w-[794px] min-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between"
          style={{
            boxSizing: 'border-box',
            padding: '44px 50px',
            fontFamily: selectedFont,
            color: '#1a1a1a',
            fontSize: '9.5pt',
            lineHeight: '1.4'
          }}
        >
          <div>
            {/* Top 2-Column Header Box */}
            <div className="flex flex-row justify-between items-stretch border border-slate-200 rounded-sm mb-4 bg-slate-50 overflow-hidden">
              <div className="p-3.5 flex-1 bg-white">
                <h1 className="uppercase font-extrabold mb-1" style={{ fontSize: '20pt', color: ACCENT, letterSpacing: '-0.5px' }}>
                  {profileData.full_name || 'JOHN DOE'}
                </h1>
                <div className="flex flex-col gap-0.5 mt-1" style={{ fontSize: '9.5pt', color: '#4a4a4a' }}>
                  {profileData.location && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">📍</span> {profileData.location}</div>}
                  {profileData.phone && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">📞</span> {profileData.phone}</div>}
                  {profileData.email && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">✉️</span> {profileData.email}</div>}
                  {profileData.linkedin && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">🔗</span> {profileData.linkedin}</div>}
                </div>
              </div>

              {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div className="w-[38%] p-3 border-l border-slate-200 bg-slate-50 flex flex-col justify-center">
                  <h3 className="font-bold uppercase mb-1 text-slate-500 text-[10px] tracking-widest">Key Certifications</h3>
                  <ul className="space-y-0.5" style={{ fontSize: '8.5pt' }}>
                    {resumeData.certifications.slice(0, 3).map((cert: any, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-1.5">✓</span>
                        <span className="leading-tight font-medium text-slate-700">{cert.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Professional Summary */}
            {resumeData.summary && resumeData.summary.length > 0 && (
              <div className="mb-3">
                <SectionHeader title="Professional Summary" />
                <ul className="list-disc pl-5 space-y-1 m-0" style={{ fontSize: '9.5pt' }}>
                  {resumeData.summary.map((point: string, i: number) => (
                    <li key={i} className="pl-1 leading-snug text-justify">
                      {parseBoldText(point)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="mb-3">
                <SectionHeader title="Technical Competencies" />
                <div className="border border-slate-200 rounded-sm overflow-hidden text-sm" style={{ fontSize: '9pt' }}>
                  {resumeData.skills.map((skillGroup: any, i: number) => (
                    <div key={i} className={`flex flex-row border-b border-slate-200 last:border-b-0`}>
                      <div className="w-[30%] bg-slate-50 p-1.5 border-r border-slate-200 font-bold text-slate-700 flex items-center">
                        {skillGroup.category}
                      </div>
                      <div className="w-[70%] p-1.5 bg-white flex items-center leading-snug">
                        {skillGroup.items.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Experience (Role 1) */}
            {firstExp.length > 0 && (
              <div className="mb-2">
                <SectionHeader title="Career Experience" />
                {firstExp.map((exp: any, i: number) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-200 rounded-sm mb-1">
                      <div>
                        <div className="font-extrabold" style={{ fontSize: '10pt', color: ACCENT }}>{exp.role}</div>
                        <div className="font-bold text-slate-700" style={{ fontSize: '9pt' }}>{exp.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-700" style={{ fontSize: '9pt' }}>{exp.duration}</div>
                      </div>
                    </div>

                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mb-1 px-1.5 leading-snug" style={{ fontSize: '8.5pt' }}>
                        <span className="font-bold bg-slate-100 px-1 py-0.2 rounded text-slate-600 mr-1 border border-slate-200">Tech Stack:</span>
                        <span className="text-slate-600 italic">{exp.environment.join(', ')}</span>
                      </div>
                    )}

                    <ul className="list-square pl-[18px] pr-1 space-y-1 m-0" style={{ fontSize: '9pt' }}>
                      {exp.bullets.map((bullet: string, j: number) => (
                        <li key={j} className="pl-1 leading-snug text-justify text-slate-800">
                          {parseBoldText(bullet)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Page 1 Footer */}
          {hasPage2 && (
            <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200/60 mt-auto">
              <span>{profileData.full_name || 'Candidate'} — Confidential Resume</span>
              <span>Page 1 of 2</span>
            </div>
          )}
        </div>

        {/* ─── PAGE 2 ─── */}
        {hasPage2 && (
          <div 
            className="resume-page bg-white w-[794px] min-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between"
            style={{
              boxSizing: 'border-box',
              padding: '44px 50px',
              fontFamily: selectedFont,
              color: '#1a1a1a',
              fontSize: '9.5pt',
              lineHeight: '1.4'
            }}
          >
            <div>
              {/* Continuation Header */}
              <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-200">
                <span className="font-bold uppercase tracking-wider" style={{ fontSize: '11pt', color: ACCENT }}>
                  {profileData.full_name || 'JOHN DOE'} — Career Experience (Cont.)
                </span>
                <span className="text-slate-400 text-[9pt] font-medium">Page 2</span>
              </div>

              {/* Remaining Experiences */}
              {secondExp.length > 0 && (
                <div className="space-y-3 mb-4">
                  {secondExp.map((exp: any, i: number) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-200 rounded-sm mb-1">
                        <div>
                          <div className="font-extrabold" style={{ fontSize: '10pt', color: ACCENT }}>{exp.role}</div>
                          <div className="font-bold text-slate-700" style={{ fontSize: '9pt' }}>{exp.company}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-700" style={{ fontSize: '9pt' }}>{exp.duration}</div>
                        </div>
                      </div>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mb-1 px-1.5 leading-snug" style={{ fontSize: '8.5pt' }}>
                          <span className="font-bold bg-slate-100 px-1 py-0.2 rounded text-slate-600 mr-1 border border-slate-200">Tech Stack:</span>
                          <span className="text-slate-600 italic">{exp.environment.join(', ')}</span>
                        </div>
                      )}

                      <ul className="list-square pl-[18px] pr-1 space-y-1 m-0" style={{ fontSize: '9pt' }}>
                        {exp.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="pl-1 leading-snug text-justify text-slate-800">
                            {parseBoldText(bullet)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div className="mb-4">
                  <SectionHeader title="Education" />
                  <div className="space-y-1.5">
                    {resumeData.education.map((edu: any, i: number) => (
                      <div key={i} className="flex flex-row justify-between items-start">
                        <div>
                          <div className="font-bold" style={{ fontSize: '9.5pt', color: ACCENT }}>{edu.degree}</div>
                          <div style={{ fontSize: '9pt' }} className="text-slate-700">{edu.institution}</div>
                        </div>
                        <div className="font-bold text-slate-500" style={{ fontSize: '9pt' }}>{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications (Full) */}
              {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div className="mb-4">
                  <SectionHeader title="Certifications & Accreditations" />
                  <div className="space-y-1.5">
                    {resumeData.certifications.map((cert: any, i: number) => (
                      <div key={i} className="flex justify-between items-start text-[9pt]">
                        <span className="font-bold text-slate-800">• {cert.name}</span>
                        <span className="text-slate-500">{cert.issuer} ({cert.year})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Page 2 Footer */}
            <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200/60 mt-auto">
              <span>{profileData.full_name || 'Candidate'} — Confidential Resume</span>
              <span>Page 2 of 2</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CertifiedTemplate.displayName = 'CertifiedTemplate';
