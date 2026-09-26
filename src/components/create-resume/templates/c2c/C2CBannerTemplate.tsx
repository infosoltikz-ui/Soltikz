"use client";
import React from 'react';
import { ResumeTemplateProps, getSummaryArray, splitExperiencesForTemplate } from '../types';

export const C2CBannerTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const BANNER = themeColor || '#1e3a8a'; // Deep blue
  const selectedFont = fontFamily || 'Georgia, "Times New Roman", serif';

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
    const headerColor = sectionStyles?.[sectionKey || '']?.color || BANNER;
    return (
      <h2 className="uppercase font-bold border-b-2 mb-2 pb-0.5 mt-4 break-inside-avoid" style={{ fontSize: '12pt', color: headerColor, borderColor: headerColor }}>
        {title}
      </h2>
    );
  };

  let globalBulletCount = 1;
  const { page1Experiences, page2Experiences } = splitExperiencesForTemplate(
    resumeData.experience,
    'c2c-banner',
    resumeData.summary
  );

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '44px 50px',
    fontFamily: selectedFont,
    color: '#2b2b2b',
    fontSize: '9.5pt',
    lineHeight: '1.4'
  };

  const renderExperienceList = (expList: any[], isContinued: boolean = false) => (
    <div 
      onClick={() => onSelectSection?.('experience')}
      className={getSectionWrapperClass('experience')}
      style={getSectionStyle('experience')}
    >
      <div className="mb-4">
        {isContinued ? (
          <SectionHeader title="Professional Experience (Continued)" sectionKey="experience" />
        ) : (
          <SectionHeader title="Professional Experience" sectionKey="experience" />
        )}
        {expList.map((exp: any, i: number) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="flex justify-between items-start font-bold text-[10pt] text-black">
              <div>
                {exp.company} {exp.location ? `| ${exp.location}` : ''}
                {exp.isContinued && <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>}
              </div>
              <div>{exp.duration}</div>
            </div>
            {!exp.isContinued && (
              <div className="mb-1.5 font-semibold text-slate-800 text-[10pt]">{exp.role}</div>
            )}

            <ul className="list-none mt-1 mb-1.5 m-0 space-y-1 text-[9.5pt]">
              {exp.bullets.map((bullet: string, j: number) => (
                <li key={j} className="flex gap-2">
                  <span className="shrink-0 font-bold text-slate-500">•</span>
                  <span className="text-justify text-slate-800">{renderWithBold(bullet)}</span>
                </li>
              ))}
            </ul>

            {!exp.isSplit && exp.environment && exp.environment.length > 0 && (
              <div className="mt-2 text-[9pt]">
                <span className="font-bold text-black italic">Environment: </span>
                <span className="text-slate-700">{exp.environment.join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="text-black print:bg-white bg-slate-50 flex flex-col print:block">
      
      {/* ================= PAGE 1 ================= */}
      <div className={pageContainerClass} style={pageContainerStyle}>
        
        {/* Colored Banner Header (C2C Format) */}
        <div 
          onClick={() => onSelectSection?.('header')}
          className={`cursor-pointer ${activeSectionKey === 'header' ? 'ring-2 ring-emerald-400' : ''}`}
          style={{ 
            backgroundColor: sectionStyles?.header?.color || BANNER, 
            margin: '-44px -50px 24px -50px', 
            padding: '38px 50px 20px 50px' 
          }}
        >
          <div style={getSectionStyle('header')} className="text-center">
            <h1 className="uppercase tracking-widest mb-1.5" style={{ fontSize: '22pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
              {profileData.full_name || 'JOHN DOE'}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-1" style={{ fontSize: '9.5pt', color: '#f8f8f8', fontWeight: 500 }}>
              {profileData.location && <span>{profileData.location}</span>}
              {profileData.phone && (
                <>
                  {profileData.location && <span className="text-white/60">•</span>}
                  <span>{profileData.phone}</span>
                </>
              )}
              {profileData.email && (
                <>
                  {(profileData.location || profileData.phone) && <span className="text-white/60">•</span>}
                  <span>{profileData.email}</span>
                </>
              )}
              {profileData.linkedin && (
                <>
                  {(profileData.location || profileData.phone || profileData.email) && <span className="text-white/60">•</span>}
                  <span>{profileData.linkedin}</span>
                </>
              )}
            </div>
            
            {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-2 pt-2 border-t border-white/20" style={{ fontSize: '9pt', color: '#e2e8f0' }}>
                {[
                  profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
                  profileData.relocation && `Relocation: ${profileData.relocation}`,
                  profileData.availability && `Availability: ${profileData.availability}`
                ].filter(Boolean).map((item, index, arr) => (
                  <React.Fragment key={index}>
                    <span className="font-medium">{item}</span>
                    {index < arr.length - 1 && <span className="text-white/40">|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* C2C Professional Summary */}
        {(() => {
          const summaryList = getSummaryArray(resumeData.summary);
          if (!summaryList || summaryList.length === 0) return null;
          return (
            <div 
              onClick={() => onSelectSection?.('summary')}
              className={getSectionWrapperClass('summary')}
              style={getSectionStyle('summary')}
            >
              <div className="mb-4">
                <SectionHeader title="Professional Summary" sectionKey="summary" />
                <ul className="list-none m-0 space-y-1 text-justify text-[9.5pt]">
                  {summaryList.map((point: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 font-bold" style={{ color: BANNER }}>•</span>
                      <span>{renderWithBold(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}

        {/* C2C Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div 
            onClick={() => onSelectSection?.('skills')}
            className={getSectionWrapperClass('skills')}
            style={getSectionStyle('skills')}
          >
            <div className="mb-4">
              <SectionHeader title="Technical Skills" sectionKey="skills" />
              <div className="space-y-0.5 text-[9.5pt]">
                {resumeData.skills.map((skillGroup: any, i: number) => (
                  <div key={i} className="leading-snug flex">
                    <span className="font-bold w-[200px] shrink-0 text-slate-800">{skillGroup.category}:</span>
                    <span className="text-slate-700">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience 1 (Page 1) */}
        {page1Experiences.length > 0 && renderExperienceList(page1Experiences, false)}

        {/* Page 1 Footer */}
        <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none">
          <span>{profileData.full_name || 'Candidate'} — C2C Professional Banner</span>
          <span>Page 1 of 2</span>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className={pageContainerClass} style={pageContainerStyle}>
        <div>
          {/* Page 2 Header */}
          <div className="flex justify-between items-center pb-1.5 mb-3 border-b border-slate-300">
            <span className="font-bold uppercase tracking-wider text-slate-900" style={{ fontSize: '10pt', color: BANNER }}>
              {profileData.full_name || 'JOHN DOE'} — Professional Experience (Cont.)
            </span>
            <span className="text-slate-400 text-[8.5pt]">Page 2</span>
          </div>

          {/* Experience 2+ (Page 2) */}
          {page2Experiences.length > 0 && renderExperienceList(page2Experiences, true)}

          {/* C2C Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('education')}
              className={getSectionWrapperClass('education')}
              style={getSectionStyle('education')}
            >
              <div className="mb-4 break-inside-avoid">
                <SectionHeader title="Education" sectionKey="education" />
                <div className="space-y-1.5 text-[9.5pt]">
                  {resumeData.education.map((edu: any, i: number) => (
                    <div key={i} className="flex flex-col">
                      <div>
                        <span className="font-bold text-slate-800">{edu.degree}</span> 
                        <span className="mx-1 text-slate-400">|</span> 
                        <span className="text-slate-700">{edu.institution}</span> 
                        <span className="mx-1 text-slate-400">|</span> 
                        <span className="font-semibold text-slate-800">{edu.location || 'City, State'}</span>
                        <span className="mx-1 text-slate-400">|</span> 
                        <span className="font-semibold text-slate-800">{edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* C2C Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('certifications')}
              className={getSectionWrapperClass('certifications')}
              style={getSectionStyle('certifications')}
            >
              <div className="mb-4 break-inside-avoid">
                <SectionHeader title="Certifications" sectionKey="certifications" />
                <div className="space-y-1 text-[9.5pt]">
                  {resumeData.certifications.map((cert: any, i: number) => (
                    <div key={i} className="flex">
                      <span className="font-bold text-slate-800">{cert.name}</span>
                      <span className="mx-1.5 text-slate-400">|</span>
                      <span className="text-slate-700">{cert.issuer}</span>
                      <span className="mx-1.5 text-slate-400">|</span>
                      <span className="font-medium text-slate-600">Earned {cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page 2 Footer */}
        <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none">
          <span>{profileData.full_name || 'Candidate'} — C2C Professional Banner</span>
          <span>Page 2 of 2</span>
        </div>
      </div>

    </div>
  );
});

C2CBannerTemplate.displayName = 'C2CBannerTemplate';
