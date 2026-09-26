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

export const BannerTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const BANNER = themeColor || '#96847c'; // Taupe/brown accent
  const selectedFont = fontFamily || 'Georgia, "Times New Roman", Times, serif';

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
    const headerColor = sectionStyles?.[sectionKey || '']?.color || BANNER;
    return (
      <h2 
        className="mb-1.5 mt-3 pb-0.5 border-b border-slate-200 break-inside-avoid" 
        style={{ fontSize: '11.5pt', color: headerColor, fontFamily: selectedFont, fontWeight: 600 }}
      >
        {title}
      </h2>
    );
  };

    const { page1Experiences, page2Experiences } = splitExperiencesForTemplate(
      resumeData.experience,
      'banner',
      resumeData.summary
    );

    const hasPage2 = page2Experiences.length > 0 || (resumeData.education && resumeData.education.length > 0) || (resumeData.certifications && resumeData.certifications.length > 0);

    const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
    const pageContainerStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      padding: '38px 48px 32px 48px',
      fontFamily: selectedFont,
      color: '#2b2b2b',
      fontSize: '10.5pt',
      lineHeight: '1.5'
    };

    return (
      <div ref={ref} className="text-black print:bg-white flex flex-col items-center">
        {/* ─── PAGE 1 ─── */}
        <div className={pageContainerClass} style={pageContainerStyle}>
          <div className="flex-1 overflow-hidden">
            {/* Colored Banner Header */}
            <div 
              onClick={() => onSelectSection?.('header')}
              className={`cursor-pointer ${activeSectionKey === 'header' ? 'ring-2 ring-emerald-400' : ''}`}
              style={{ 
                backgroundColor: sectionStyles?.header?.color || BANNER, 
                margin: '-38px -48px 20px -48px', 
                padding: '36px 48px 20px 48px' 
              }}
            >
              <div style={getSectionStyle('header')}>
                <h1 className="uppercase tracking-widest mb-1.5 text-center" style={{ fontSize: '24pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
                  {profileData.full_name || 'JOHN DOE'}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-1" style={{ fontSize: '10pt', color: '#f8f8f8', fontWeight: 500 }}>
                  {profileData.location && <span>{profileData.location}</span>}
                  {profileData.phone && (
                    <>
                      {profileData.location && <span>|</span>}
                      <span>{profileData.phone}</span>
                    </>
                  )}
                  {profileData.email && (
                    <>
                      {(profileData.location || profileData.phone) && <span>|</span>}
                      <span>{profileData.email}</span>
                    </>
                  )}
                </div>
                
                {profileData.linkedin && (
                  <div className="flex justify-center" style={{ fontSize: '9pt', color: '#f8f8f8', fontWeight: 500 }}>
                    <span className="mr-1">WWW:</span> <span>{profileData.linkedin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Summary */}
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

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('summary')}
                className={getSectionWrapperClass('skills')}
                style={getSectionStyle('skills')}
              >
                <div className="mb-3">
                  <SectionHeader title="Skills" sectionKey="skills" />
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
                  <SectionHeader title="Professional Experience" sectionKey="experience" />
                  {page1Experiences.map((exp: any, i: number) => (
                    <div key={i} className="mb-2">
                      <div className="flex items-center leading-tight mb-1" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
                        <span className="uppercase">{exp.role}</span>
                        <span className="mx-1.5 text-gray-400 font-normal">|</span>
                        <span>{exp.duration}</span>
                      </div>
                      
                      <div className="leading-tight mb-1 font-semibold text-slate-700" style={{ fontSize: '9.5pt' }}>
                        {exp.company}
                      </div>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                          <span className="font-bold italic text-black">Environment: </span>
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
              <span>{profileData.full_name || 'Candidate'} — Professional Banner</span>
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
                        <div className="flex items-center leading-tight mb-1" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
                          <span className="uppercase">{exp.role}</span>
                          {exp.isContinued && <span className="italic font-normal text-slate-500 text-[9pt] ml-1">(Continued)</span>}
                          <span className="mx-1.5 text-gray-400 font-normal">|</span>
                          <span>{exp.duration}</span>
                        </div>
                        
                        <div className="leading-tight mb-1 font-semibold text-slate-700" style={{ fontSize: '9.5pt' }}>
                          {exp.company}
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                            <span className="font-bold italic text-black">Environment: </span>
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
                    <SectionHeader title="Education" sectionKey="education" />
                    <div className="space-y-1.5 text-[9.5pt]">
                      {resumeData.education.map((edu: any, i: number) => (
                        <div key={i} className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-slate-800 text-[10pt]">{edu.degree}</div>
                            <div className="text-slate-600 font-medium text-[9.5pt]">{edu.institution}</div>
                          </div>
                          <div className="font-semibold whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
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
              <span>{profileData.full_name || 'Candidate'} — Professional Banner</span>
              <span>Page 2 of 2</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);


BannerTemplate.displayName = 'BannerTemplate';
