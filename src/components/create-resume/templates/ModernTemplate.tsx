"use client";
import React from 'react';
import type { ResumeTemplateProps } from './types';

export const ModernTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const ACCENT = themeColor || '#2E8B57'; // Teal/Green accent
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  // Helper function to render bold text parsed from simple markdown **bold**
  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

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
      <div className="mb-3.5 mt-4 break-inside-avoid">
        <div className="border-t border-slate-300 w-full" />
        <h2 className="uppercase font-bold text-center py-1.5 m-0 tracking-wider" style={{ fontSize: '13pt', color: headerColor }}>
          {title}
        </h2>
        <div className="border-t border-slate-300 w-full" />
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
          {/* Header */}
          <div 
            onClick={() => onSelectSection?.('header')}
            className={getSectionWrapperClass('header')}
            style={getSectionStyle('header')}
          >
            <div className="mb-4 text-center break-inside-avoid">
              <h1 className="font-bold uppercase mb-1.5 tracking-tight" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || ACCENT }}>
                {profileData.full_name || 'JOHN DOE'}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1" style={{ fontSize: '10.5pt' }}>
                {profileData.location && <span>{profileData.location}</span>}
                {profileData.phone && (
                  <>
                    {profileData.location && <span className="text-gray-400">|</span>}
                    <span>{profileData.phone}</span>
                  </>
                )}
                {profileData.email && (
                  <>
                    {(profileData.location || profileData.phone) && <span className="text-gray-400">|</span>}
                    <span>{profileData.email}</span>
                  </>
                )}
                {profileData.linkedin && (
                  <>
                    {(profileData.location || profileData.phone || profileData.email) && <span className="text-gray-400">|</span>}
                    <span>{profileData.linkedin}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          {resumeData.summary && resumeData.summary.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('summary')}
              className={getSectionWrapperClass('summary')}
              style={getSectionStyle('summary')}
            >
              <div className="mb-4">
                <SectionHeader title="Summary" sectionKey="summary" />
                <p className="text-justify leading-relaxed m-0" style={{ fontSize: '10.5pt' }}>
                  {Array.isArray(resumeData.summary)
                    ? resumeData.summary.join(' ')
                    : resumeData.summary}
                </p>
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('skills')}
              className={getSectionWrapperClass('skills')}
              style={getSectionStyle('skills')}
            >
              <div className="mb-4">
                <SectionHeader title="Technical Skills" sectionKey="skills" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5" style={{ fontSize: '10.5pt' }}>
                  {resumeData.skills.map((skillGroup, i) => (
                    <ul key={i} className="list-disc pl-5 m-0 space-y-1">
                      <li className="leading-relaxed">
                        <span className="font-bold">{skillGroup.category}: </span>
                        <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                      </li>
                    </ul>
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
              <div className="mb-3">
                <SectionHeader title="Professional Experience" sectionKey="experience" />
                {page1Experiences.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start leading-tight" style={{ fontSize: '11.5pt' }}>
                      <div className="font-bold text-black">{exp.role}</div>
                      <div className="font-bold text-black whitespace-nowrap ml-4">{exp.duration}</div>
                    </div>
                    <div className="flex justify-between items-start leading-tight mb-1.5" style={{ fontSize: '11pt' }}>
                      <div className="font-semibold text-slate-700">{exp.company}</div>
                    </div>

                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mb-2 leading-relaxed text-slate-600" style={{ fontSize: '10pt' }}>
                        <span className="font-bold text-black">Environment: </span>
                        {exp.environment.join(', ')}
                      </div>
                    )}

                    <ul className="list-disc pl-5 space-y-2 mt-1.5 m-0" style={{ fontSize: '10.5pt' }}>
                      {exp.bullets.map((bullet: string, j: number) => (
                        <li key={j} className="pl-1 leading-relaxed text-justify">
                          {renderWithBold(bullet)}
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
          <div className="pt-2.5 flex justify-between items-center text-[9.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
            <span>{profileData.full_name || 'Candidate'} — Modern Resume</span>
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
                <div className="mb-4 space-y-3.5">
                  {page2Experiences.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-start leading-tight" style={{ fontSize: '11.5pt' }}>
                        <div className="font-bold text-black">
                          {exp.role} {exp.isContinued && <span className="italic font-normal text-slate-500 text-[10pt]">(Continued)</span>}
                        </div>
                        <div className="font-bold text-black whitespace-nowrap ml-4">{exp.duration}</div>
                      </div>
                      <div className="flex justify-between items-start leading-tight mb-1.5" style={{ fontSize: '11pt' }}>
                        <div className="font-semibold text-slate-700">{exp.company}</div>
                      </div>

                      {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                        <div className="mb-2 leading-relaxed text-slate-600" style={{ fontSize: '10pt' }}>
                          <span className="font-bold text-black">Environment: </span>
                          {exp.environment.join(', ')}
                        </div>
                      )}

                      <ul className="list-disc pl-5 space-y-2 mt-1.5 m-0" style={{ fontSize: '10.5pt' }}>
                        {exp.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="pl-1 leading-relaxed text-justify">
                            {renderWithBold(bullet)}
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
                <div className="mb-4">
                  <SectionHeader title="Education and Training" sectionKey="education" />
                  <div className="space-y-2" style={{ fontSize: '10.5pt' }}>
                    {resumeData.education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-[11pt]">{edu.degree}</div>
                          <div className="text-slate-600 text-[10.5pt]">{edu.institution}</div>
                        </div>
                        <div className="font-bold whitespace-nowrap ml-4 text-[10.5pt]">{edu.year}</div>
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
                <div className="mb-4">
                  <SectionHeader title="Certifications" sectionKey="certifications" />
                  <ul className="list-disc pl-5 m-0 space-y-1.5" style={{ fontSize: '10.5pt' }}>
                    {resumeData.certifications.map((cert, i) => (
                      <li key={i} className="pl-1 leading-relaxed">
                        <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Page 2 Footer */}
          <div className="pt-2.5 flex justify-between items-center text-[9.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
            <span>{profileData.full_name || 'Candidate'} — Modern Resume</span>
            <span>Page 2 of 2</span>
          </div>
        </div>
      )}
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

