"use client";
import React from 'react';
import { ResumeTemplateProps, getSummaryArray, splitExperiencesForTemplate } from '../types';

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

export const SidebarTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const ACCENT = themeColor || '#4a0e0e'; // Maroon/brown accent
  const TOP_BAR_COLOR = '#F5C05E'; // Mustard yellow
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

  // Helper function to split name into first and last for two-tone styling
  const renderName = () => {
    const nameStr = profileData.full_name || 'JOHN DOE';
    const parts = nameStr.trim().split(' ');
    const headerAccent = sectionStyles?.header?.color || ACCENT;
    if (parts.length === 1) {
      return <span style={{ color: headerAccent }}>{parts[0]}</span>;
    }
    const firstName = parts[0];
    const restName = parts.slice(1).join(' ');
    return (
      <>
        <span className="text-slate-600">{firstName}</span>{' '}
        <span style={{ color: headerAccent }}>{restName}</span>
      </>
    );
  };

  const SectionHeader = ({ title, sectionKey }: { title: string; sectionKey?: string }) => {
    const headerColor = sectionStyles?.[sectionKey || '']?.color || ACCENT;
    return (
      <h2 
        className="font-bold pb-1 mb-3 mt-4 border-b border-slate-300 w-full break-inside-avoid tracking-wide" 
        style={{ fontSize: '12pt', color: headerColor }}
      >
        {title}
      </h2>
    );
  };

    const { page1Experiences, page2Experiences } = splitExperiencesForTemplate(
      resumeData.experience,
      'sidebar',
      resumeData.summary
    );

    const hasPage2 = page2Experiences.length > 0 || (resumeData.education && resumeData.education.length > 0) || (resumeData.certifications && resumeData.certifications.length > 0);

    const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
    const pageContainerStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      padding: '38px 48px 32px 48px',
      fontFamily: selectedFont,
      color: '#000000',
      fontSize: '10.5pt',
      lineHeight: '1.5'
    };

    return (
      <div ref={ref} className="text-black print:bg-white flex flex-col items-center">
        {/* ─── PAGE 1 ─── */}
        <div className={pageContainerClass} style={pageContainerStyle}>
          <div className="flex-1 overflow-hidden">
            {/* Top Accent Bar */}
            <div 
              style={{ 
                backgroundColor: TOP_BAR_COLOR, 
                height: '14px', 
                margin: '-38px -48px 20px -48px', 
                width: 'calc(100% + 96px)' 
              }} 
            />

            {/* Header */}
            <div 
              onClick={() => onSelectSection?.('header')}
              className={getSectionWrapperClass('header')}
              style={getSectionStyle('header')}
            >
              <div className="mb-3.5 text-center break-inside-avoid">
                <h1 className="uppercase tracking-wider mb-1" style={{ fontSize: '24pt', fontWeight: 700 }}>
                  {renderName()}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: '9pt' }}>
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
                    <p className="text-justify leading-snug m-0" style={{ fontSize: '9.5pt' }}>
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
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1" style={{ fontSize: '9.5pt' }}>
                    {resumeData.skills.map((skillGroup, i) => (
                      <ul key={i} className="list-disc pl-4 m-0 space-y-1">
                        <li className="leading-snug">
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
                <div className="mb-2">
                  <SectionHeader title="Experience" sectionKey="experience" />
                  {page1Experiences.map((exp: any, i: number) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
                        <div className="font-bold text-black">{exp.role}</div>
                        <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
                      </div>
                      <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '9.5pt' }}>
                        <div className="font-bold text-slate-800">{exp.company}</div>
                      </div>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                          <span className="font-bold text-black">Environment: </span>
                          {exp.environment.join(', ')}
                        </div>
                      )}

                      <ul className="list-disc pl-5 space-y-1 mt-1 m-0 text-[9.5pt]" style={{ lineHeight: '1.4' }}>
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
            <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
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
                  <div className="mb-3 space-y-3">
                    {page2Experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
                          <div className="font-bold text-black">
                            {exp.role} {exp.isContinued && <span className="italic font-normal text-slate-500 text-[9pt]">(Continued)</span>}
                          </div>
                          <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
                        </div>
                        <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '9.5pt' }}>
                          <div className="font-bold text-slate-800">{exp.company}</div>
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                            <span className="font-bold text-black">Environment: </span>
                            {exp.environment.join(', ')}
                          </div>
                        )}

                        <ul className="list-disc pl-5 space-y-1 mt-1 m-0 text-[9.5pt]" style={{ lineHeight: '1.4' }}>
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
                    <div className="space-y-1.5 text-[9.5pt]">
                      {resumeData.education.map((edu: any, i: number) => (
                        <div key={i}>
                          <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '10pt' }}>
                            <div className="font-bold">{edu.degree}</div>
                            <div className="whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
                          </div>
                          <div style={{ fontSize: '9.5pt' }} className="text-slate-600">
                            {edu.institution}
                          </div>
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
                    <ul className="list-disc pl-5 m-0 space-y-1 text-[9.5pt]">
                      {resumeData.certifications.map((cert: any, i: number) => (
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
            <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
              <span>{profileData.full_name || 'Candidate'} — Professional Resume</span>
              <span>Page 2 of 2</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

SidebarTemplate.displayName = 'SidebarTemplate';

