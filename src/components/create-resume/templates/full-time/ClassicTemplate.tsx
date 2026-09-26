"use client";
import React from 'react';
import { ResumeTemplateProps, getSummaryArray } from '../types';

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

export const ClassicTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ resumeData, profileData, themeColor, fontFamily, sectionStyles, activeSectionKey, onSelectSection }, ref) => {
    const selectedFont = fontFamily || 'Arial, Helvetica, sans-serif';
    const accentColor = themeColor || '#000000';

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
      const headerColor = sectionStyles?.[sectionKey || '']?.color || accentColor;
      return (
        <h2 
          className="font-bold uppercase pb-1 mb-2 mt-3 border-b w-full break-inside-avoid tracking-wider" 
          style={{ fontSize: '11.5pt', color: headerColor, fontFamily: selectedFont, borderColor: headerColor }}
        >
          {title}
        </h2>
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
      color: '#000000',
      fontSize: '10pt',
      lineHeight: '1.45'
    };

    return (
      <div ref={ref} className="space-y-8 print:space-y-0 text-black flex flex-col items-center">
        {/* ─── PAGE 1 ─── */}
        <div className={pageContainerClass} style={pageContainerStyle}>
          <div className="flex-1 overflow-hidden">
            {/* Header - Classic ATS Center */}
            <div 
              onClick={() => onSelectSection?.('header')}
              className={getSectionWrapperClass('header')}
              style={getSectionStyle('header')}
            >
              <div className="mb-3 text-center break-inside-avoid">
                <h1 className="uppercase font-bold mb-1 tracking-tight" style={{ fontSize: '22pt', color: sectionStyles?.header?.color || '#000000' }}>
                  {profileData.full_name || 'JOHN DOE'}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-1" style={{ fontSize: '9.5pt' }}>
                  {profileData.location && <span>{profileData.location}</span>}
                  {profileData.phone && (
                    <>
                      {profileData.location && <span className="text-slate-400">|</span>}
                      <span>{profileData.phone}</span>
                    </>
                  )}
                  {profileData.email && (
                    <>
                      {(profileData.location || profileData.phone) && <span className="text-slate-400">|</span>}
                      <span>{profileData.email}</span>
                    </>
                  )}
                  {profileData.linkedin && (
                    <>
                      {(profileData.location || profileData.phone || profileData.email) && <span className="text-slate-400">|</span>}
                      <span>{profileData.linkedin}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            {(() => {
              const summaryList = getSummaryArray(resumeData.summary);
              if (!summaryList || summaryList.length === 0) return null;
              const paragraphText = summaryList.join(' ');
              return (
                <div 
                  onClick={() => onSelectSection?.('summary')}
                  className={getSectionWrapperClass('summary')}
                  style={getSectionStyle('summary')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Professional Summary" sectionKey="summary" />
                    <p className="text-justify leading-snug m-0" style={{ fontSize: '10pt' }}>
                      {parseBoldText(paragraphText)}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Technical Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('skills')}
                className={getSectionWrapperClass('skills')}
                style={getSectionStyle('skills')}
              >
                <div className="mb-3">
                  <SectionHeader title="Technical Skills" sectionKey="skills" />
                  <div className="space-y-1" style={{ fontSize: '9.5pt' }}>
                    {resumeData.skills.map((skillGroup: any, i: number) => (
                      <div key={i} className="leading-snug">
                        <span className="font-bold">{skillGroup.category}: </span>
                        <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Experience (Page 1 - Role 1 Bullets 1 to 3) */}
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
                      <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '11pt' }}>
                        <div className="font-bold text-black">{exp.role}</div>
                        <div className="whitespace-nowrap ml-4 font-bold text-black">{exp.duration}</div>
                      </div>
                      <div className="leading-tight mb-1" style={{ fontSize: '10pt' }}>
                        <span className="font-semibold text-slate-800">
                          {exp.company}
                          {exp.client && ` (Client: ${exp.client})`}
                        </span>
                        {exp.location && <span> | {exp.location}</span>}
                      </div>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '9pt' }}>
                          <span className="font-bold text-black">Environment: </span>
                          {exp.environment.join(', ')}
                        </div>
                      )}

                      <ul className="list-disc pl-5 space-y-1.5 mt-1 m-0" style={{ fontSize: '9.5pt' }}>
                        {exp.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="pl-1 leading-snug text-justify">
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
            <div className="pt-2 flex justify-between items-center text-[9pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
              <span>{profileData.full_name || 'Candidate'} — Professional Resume</span>
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
                  <div className="space-y-3 mb-3">
                    {page2Experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '11pt' }}>
                          <div className="font-bold text-black">
                            {exp.role} {exp.isContinued && <span className="italic font-normal text-slate-500 text-[9.5pt]">(Continued)</span>}
                          </div>
                          <div className="whitespace-nowrap ml-4 font-bold text-black">{exp.duration}</div>
                        </div>
                        <div className="leading-tight mb-1" style={{ fontSize: '10pt' }}>
                          <span className="font-semibold text-slate-800">
                            {exp.company}
                            {exp.client && ` (Client: ${exp.client})`}
                          </span>
                          {exp.location && <span> | {exp.location}</span>}
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '9pt' }}>
                            <span className="font-bold text-black">Environment: </span>
                            {exp.environment.join(', ')}
                          </div>
                        )}

                        <ul className="list-disc pl-5 space-y-1.5 mt-1 m-0" style={{ fontSize: '9.5pt' }}>
                          {exp.bullets.map((bullet: string, j: number) => (
                            <li key={j} className="pl-1 leading-snug text-justify">
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
                  <div className="mb-3">
                    <SectionHeader title="Education and Training" sectionKey="education" />
                    <div className="space-y-1.5" style={{ fontSize: '9.5pt' }}>
                      {resumeData.education.map((edu: any, i: number) => (
                        <div key={i} className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-[10pt]">{edu.degree}</div>
                            <div className="text-slate-700 text-[9.5pt]">{edu.institution}</div>
                          </div>
                          <div className="font-bold whitespace-nowrap ml-4 text-[9.5pt]">{edu.year}</div>
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
                  <div className="mb-3">
                    <SectionHeader title="Certifications" sectionKey="certifications" />
                    <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
                      {resumeData.certifications.map((cert: any, i: number) => (
                        <li key={i} className="pl-1 leading-snug">
                          <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Page 2 Footer */}
            <div className="pt-2 flex justify-between items-center text-[9pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
              <span>{profileData.full_name || 'Candidate'} — Professional Resume</span>
              <span>Page 2 of 2</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ClassicTemplate.displayName = 'ClassicTemplate';
