"use client";
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
  ({ resumeData, profileData, themeColor, fontFamily, sectionStyles, activeSectionKey, onSelectSection }, ref) => {
    const ACCENT = themeColor || '#005580'; // Dark blue accent
    const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

    const getSectionStyle = (key: string, baseStyle: React.CSSProperties = {}): React.CSSProperties => {
      const custom = sectionStyles?.[key];
      if (!custom) return baseStyle;
      return {
        ...baseStyle,
        ...(custom.fontFamily ? { fontFamily: custom.fontFamily } : {}),
        ...(custom.fontSize ? { fontSize: custom.fontSize } : {}),
        ...(custom.color ? { color: custom.color } : {}),
        ...(custom.fontWeight ? { fontWeight: custom.fontWeight as any } : {}),
        ...(custom.fontStyle ? { fontStyle: custom.fontStyle as any } : {}),
        ...(custom.textDecoration ? { textDecoration: custom.textDecoration } : {}),
        ...(custom.textTransform ? { textTransform: custom.textTransform as any } : {}),
        ...(custom.textAlign ? { textAlign: custom.textAlign as any } : {}),
        ...(custom.lineHeight ? { lineHeight: custom.lineHeight } : {}),
      };
    };

    const getSectionWrapperClass = (key: string) => {
      const isInteractive = Boolean(onSelectSection);
      const isActive = activeSectionKey === key;
      if (!isInteractive) return '';
      return `group/sec relative transition-all rounded-lg p-1.5 -m-1.5 cursor-pointer ${
        isActive
          ? 'ring-2 ring-emerald-500 bg-emerald-50/25 shadow-xs'
          : 'hover:ring-1 hover:ring-emerald-400/60 hover:bg-slate-50/50'
      }`;
    };

    const SectionHeader = ({ title, sectionKey }: { title: string; sectionKey?: string }) => {
      const headerColor = sectionStyles?.[sectionKey || '']?.color || ACCENT;
      return (
        <div className="flex items-center mb-2.5 mt-3.5 w-full break-inside-avoid">
          <div style={{ width: '4px', height: '18px', backgroundColor: headerColor }} className="mr-2 rounded-xs"></div>
          <h2 className="font-bold uppercase tracking-wider m-0" style={{ fontSize: '11.5pt', color: headerColor }}>
            {title}
          </h2>
          <div className="flex-1 ml-2.5 h-[1px] bg-slate-300/80"></div>
        </div>
      );
    };

    const experiences = resumeData.experience || [];
    let page1Experiences: any[] = [];
    let page2Experiences: any[] = [];

    if (experiences.length > 0) {
      const firstExp = experiences[0];
      if (firstExp.bullets && firstExp.bullets.length > 4) {
        page1Experiences = [{ ...firstExp, bullets: firstExp.bullets.slice(0, 4) }];
        page2Experiences = [
          { ...firstExp, bullets: firstExp.bullets.slice(4), isContinued: true },
          ...experiences.slice(1)
        ];
      } else {
        page1Experiences = [firstExp];
        page2Experiences = experiences.slice(1);
      }
    }

    const hasPage2 = page2Experiences.length > 0 || (resumeData.education && resumeData.education.length > 0) || (resumeData.certifications && resumeData.certifications.length > 0);

    const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
    const pageContainerStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      padding: '38px 48px 32px 48px',
      fontFamily: selectedFont,
      color: '#1a1a1a',
      fontSize: '10.5pt',
      lineHeight: '1.5'
    };

    return (
      <div ref={ref} className="text-black print:bg-white flex flex-col items-center">
        {/* ─── PAGE 1 ─── */}
        <div className={pageContainerClass} style={pageContainerStyle}>
          <div className="flex-1 overflow-hidden">
            {/* Header Section */}
            <div 
              onClick={() => onSelectSection?.('header')}
              className={getSectionWrapperClass('header')}
              style={getSectionStyle('header')}
            >
              <div className="flex flex-row justify-between items-start border-b-2 border-slate-800 pb-3 mb-3">
                <div className="flex-1 pr-4">
                  <h1 className="uppercase font-black tracking-tight mb-1" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || ACCENT }}>
                    {profileData.full_name || 'JOHN DOE'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10pt] text-slate-700 font-medium">
                    {profileData.location && <span>📍 {profileData.location}</span>}
                    {profileData.phone && (
                      <>
                        {profileData.location && <span className="text-slate-300">|</span>}
                        <span>📞 {profileData.phone}</span>
                      </>
                    )}
                    {profileData.email && (
                      <>
                        {(profileData.location || profileData.phone) && <span className="text-slate-300">|</span>}
                        <span>✉️ {profileData.email}</span>
                      </>
                    )}
                    {profileData.linkedin && (
                      <>
                        {(profileData.location || profileData.phone || profileData.email) && <span className="text-slate-300">|</span>}
                        <span>🔗 {profileData.linkedin}</span>
                      </>
                    )}
                  </div>
                </div>

                {resumeData.certifications && resumeData.certifications.length > 0 && (
                  <div className="w-[36%] p-2 bg-slate-50 border border-slate-200 rounded-md">
                    <h3 className="font-bold uppercase mb-1 text-slate-600 text-[9px] tracking-wider">Key Certifications</h3>
                    <ul className="space-y-0.5 text-[8.5pt]">
                      {resumeData.certifications.slice(0, 3).map((cert: any, i: number) => (
                        <li key={i} className="flex items-center text-slate-800 font-semibold truncate" title={cert.name}>
                          <span className="text-emerald-600 mr-1.5 font-bold">✓</span>
                          <span className="truncate">{cert.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && resumeData.summary.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('summary')}
                className={getSectionWrapperClass('summary')}
                style={getSectionStyle('summary')}
              >
                <div className="mb-2.5">
                  <SectionHeader title="Professional Summary" sectionKey="summary" />
                  <p className="text-justify leading-snug m-0 text-slate-800" style={{ fontSize: '9.5pt' }}>
                    {Array.isArray(resumeData.summary)
                      ? resumeData.summary.join(' ')
                      : resumeData.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Technical Competencies Grid */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('skills')}
                className={getSectionWrapperClass('skills')}
                style={getSectionStyle('skills')}
              >
                <div className="mb-2.5">
                  <SectionHeader title="Technical Competencies" sectionKey="skills" />
                  <div className="border border-slate-200 rounded-sm overflow-hidden text-[9pt]">
                    {resumeData.skills.map((skillGroup: any, i: number) => (
                      <div key={i} className="flex flex-row border-b border-slate-200 last:border-b-0">
                        <div className="w-[28%] bg-slate-50 p-1 px-2 border-r border-slate-200 font-bold text-slate-800 flex items-center">
                          {skillGroup.category}
                        </div>
                        <div className="w-[72%] p-1 px-2 bg-white flex items-center leading-snug text-slate-700">
                          {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Experience (Page 1) */}
            {page1Experiences.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('experience')}
                className={getSectionWrapperClass('experience')}
                style={getSectionStyle('experience')}
              >
                <div className="mb-2">
                  <SectionHeader title="Professional Experience" sectionKey="experience" />
                  {page1Experiences.map((exp: any, i: number) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between items-start leading-tight" style={{ fontSize: '10.5pt' }}>
                        <div className="font-bold text-slate-900">{exp.role}</div>
                        <div className="font-bold text-slate-800 whitespace-nowrap ml-4">{exp.duration}</div>
                      </div>
                      <div className="flex justify-between items-start leading-tight mb-1 text-[9.5pt]">
                        <div className="font-semibold text-slate-700">{exp.company} {exp.location ? `| ${exp.location}` : ''}</div>
                      </div>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mb-1 leading-snug text-[8.5pt]">
                          <span className="font-bold text-slate-800">Tech Stack: </span>
                          <span className="text-slate-600 italic">{exp.environment.join(', ')}</span>
                        </div>
                      )}

                      <ul className="list-disc pl-5 space-y-1 m-0 text-[9.5pt]" style={{ lineHeight: '1.4' }}>
                        {exp.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="pl-1 leading-snug text-justify text-slate-800">
                            {parseBoldText(bullet)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Page 1 Footer */}
          {hasPage2 && (
            <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
              <span>{profileData.full_name || 'Candidate'} — Certified Professional</span>
              <span>Page 1 of 2</span>
            </div>
          )}
        </div>

        {/* ─── PAGE 2 ─── */}
        {hasPage2 && (
          <div className={pageContainerClass} style={pageContainerStyle}>
            <div className="flex-1 overflow-hidden">
              {/* Remaining Experience */}
              {page2Experiences.length > 0 && (
                <div 
                  onClick={() => onSelectSection?.('experience')}
                  className={getSectionWrapperClass('experience')}
                  style={getSectionStyle('experience')}
                >
                  <div className="mb-3 space-y-2.5">
                    {page2Experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between items-start leading-tight" style={{ fontSize: '10.5pt' }}>
                          <div className="font-bold text-slate-900">
                            {exp.role} {exp.isContinued && <span className="italic font-normal text-slate-500 text-[9pt]">(Continued)</span>}
                          </div>
                          <div className="font-bold text-slate-800 whitespace-nowrap ml-4">{exp.duration}</div>
                        </div>
                        <div className="flex justify-between items-start leading-tight mb-1 text-[9.5pt]">
                          <div className="font-semibold text-slate-700">{exp.company} {exp.location ? `| ${exp.location}` : ''}</div>
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1 leading-snug text-[8.5pt]">
                            <span className="font-bold text-slate-800">Tech Stack: </span>
                            <span className="text-slate-600 italic">{exp.environment.join(', ')}</span>
                          </div>
                        )}

                        <ul className="list-disc pl-5 space-y-1 m-0 text-[9.5pt]" style={{ lineHeight: '1.4' }}>
                          {exp.bullets.map((bullet: string, j: number) => (
                            <li key={j} className="pl-1 leading-snug text-justify text-slate-800">
                              {parseBoldText(bullet)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div 
                  onClick={() => onSelectSection?.('education')}
                  className={getSectionWrapperClass('education')}
                  style={getSectionStyle('education')}
                >
                  <div className="mb-2.5">
                    <SectionHeader title="Education and Training" sectionKey="education" />
                    <div className="space-y-1 text-[9.5pt]">
                      {resumeData.education.map((edu: any, i: number) => (
                        <div key={i} className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-slate-900 text-[10pt]">{edu.degree}</div>
                            <div className="text-slate-600 font-medium text-[9.5pt]">{edu.institution}</div>
                          </div>
                          <div className="font-semibold whitespace-nowrap ml-4 text-[9pt] text-slate-800">{edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div 
                  onClick={() => onSelectSection?.('certifications')}
                  className={getSectionWrapperClass('certifications')}
                  style={getSectionStyle('certifications')}
                >
                  <div className="mb-2.5">
                    <SectionHeader title="Certifications & Training" sectionKey="certifications" />
                    <ul className="list-disc pl-5 m-0 space-y-1 text-[9.5pt]">
                      {resumeData.certifications.map((cert: any, i: number) => (
                        <li key={i} className="pl-1 leading-relaxed">
                          <span className="font-bold text-slate-900">{cert.name}</span> — {cert.issuer} ({cert.year})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Page 2 Footer */}
            <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
              <span>{profileData.full_name || 'Candidate'} — Certified Professional</span>
              <span>Page 2 of 2</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CertifiedTemplate.displayName = 'CertifiedTemplate';
