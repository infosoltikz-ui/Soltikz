"use client";
import React from 'react';
import type { ResumeTemplateProps } from './types';

export const C2CCertifiedTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const ACCENT = themeColor || '#0f172a'; // slate-900
  const selectedFont = fontFamily || 'Arial, Helvetica, sans-serif';

  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900">{part.slice(2, -2)}</strong>;
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
      <h2 className="uppercase font-bold border-b-2 pb-1 mb-3 mt-5 tracking-wide break-inside-avoid" style={{ fontSize: '11pt', color: headerColor, borderColor: headerColor }}>
        {title}
      </h2>
    );
  };

  let globalBulletCount = 1;
  const experiences = resumeData.experience || [];
  
  let page1Experiences: any[] = [];
  let page2Experiences: any[] = [];
  
  if (experiences.length > 0) {
    const firstExp = experiences[0];
    if (firstExp.bullets && firstExp.bullets.length > 4) {
      page1Experiences = [{ ...firstExp, bullets: firstExp.bullets.slice(0, 4), isSplit: true }];
      page2Experiences = [
        { ...firstExp, bullets: firstExp.bullets.slice(4), isContinued: true },
        ...experiences.slice(1)
      ];
    } else {
      page1Experiences = [firstExp];
      page2Experiences = experiences.slice(1);
    }
  }

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '44px 50px',
    fontFamily: selectedFont,
    color: '#1e293b', // slate-800
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
          <div key={i} className="mb-5 break-inside-avoid">
            <div className="flex justify-between items-center bg-slate-100 p-2 border border-slate-200 rounded-sm mb-2">
              <div>
                <div className="font-extrabold uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                  {exp.company}
                  {exp.isContinued && <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>}
                </div>
                {!exp.isContinued && (
                  <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.role} {exp.location ? `| ${exp.location}` : ''}</div>
                )}
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.duration}</div>
              </div>
            </div>

            <ul className="list-none mt-1.5 mb-2 m-0 space-y-1.5" style={{ fontSize: '9.5pt' }}>
              {exp.bullets.map((bullet: string, j: number) => (
                <li key={j} className="flex gap-2">
                  <span className="shrink-0 font-bold text-slate-500 bg-slate-100 px-1.5 rounded">•</span>
                  <span className="text-justify text-slate-800">{renderWithBold(bullet)}</span>
                </li>
              ))}
            </ul>

            {!exp.isSplit && exp.environment && exp.environment.length > 0 && (
              <div className="mt-2 bg-slate-800 text-white px-2 py-1 rounded-sm flex gap-2" style={{ fontSize: '8.5pt' }}>
                <span className="font-bold uppercase tracking-wider shrink-0 text-slate-300">Environment: </span>
                <span>{exp.environment.join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="text-black bg-slate-50 print:bg-white flex flex-col print:block">
      
      {/* ================= PAGE 1 ================= */}
      <div className={pageContainerClass} style={pageContainerStyle}>
        {/* Header */}
        <div 
          onClick={() => onSelectSection?.('header')}
          className={getSectionWrapperClass('header')}
          style={getSectionStyle('header')}
        >
          <div className="flex justify-between items-center border-b-4 pb-4 mb-4 break-inside-avoid" style={{ borderColor: ACCENT }}>
            <div className="flex-1">
              <h1 className="font-extrabold uppercase m-0 leading-tight" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || ACCENT }}>
                {profileData.full_name || 'JOHN DOE'}
              </h1>
              
              {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
                <div className="mt-2 font-medium" style={{ fontSize: '9.5pt', color: ACCENT }}>
                  {[
                    profileData.work_authorization && `Auth: ${profileData.work_authorization}`,
                    profileData.relocation && `Reloc: ${profileData.relocation}`,
                    profileData.availability && `Avail: ${profileData.availability}`
                  ].filter(Boolean).join(' | ')}
                </div>
              )}
            </div>
            
            <div className="text-right flex flex-col gap-1 border-l-2 pl-4 border-slate-200" style={{ fontSize: '9pt', color: '#475569' }}>
              {profileData.location && <div className="font-semibold text-slate-700">{profileData.location}</div>}
              {profileData.phone && <div>{profileData.phone}</div>}
              {profileData.email && <div>{profileData.email}</div>}
              {profileData.linkedin && <div>{profileData.linkedin}</div>}
            </div>
          </div>
        </div>

        {/* C2C Professional Summary */}
        {resumeData.summary && resumeData.summary.length > 0 && (
          <div 
            onClick={() => onSelectSection?.('summary')}
            className={getSectionWrapperClass('summary')}
            style={getSectionStyle('summary')}
          >
            <div className="mb-4">
              <SectionHeader title="Professional Summary" sectionKey="summary" />
              <ul className="list-none m-0 space-y-1 text-justify" style={{ fontSize: '9.5pt' }}>
                {resumeData.summary.map((point: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 font-bold" style={{ color: ACCENT }}>•</span>
                    <span>{renderWithBold(point)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* C2C Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div 
            onClick={() => onSelectSection?.('skills')}
            className={getSectionWrapperClass('skills')}
            style={getSectionStyle('skills')}
          >
            <div className="mb-4">
              <SectionHeader title="Technical Skills" sectionKey="skills" />
              <div className="grid grid-cols-1 gap-y-1 bg-slate-50 border border-slate-200 p-3 rounded-sm" style={{ fontSize: '9pt' }}>
                {resumeData.skills.map((skillGroup: any, i: number) => (
                  <div key={i} className="leading-snug flex">
                    <span className="font-bold w-[190px] shrink-0 text-slate-900 border-r border-slate-300 mr-2">{skillGroup.category}:</span>
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
          <span>{profileData.full_name || 'Candidate'} — C2C Certified Professional</span>
          <span>Page 1 of 2</span>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className={pageContainerClass} style={pageContainerStyle}>
        <div>
          {/* Page 2 Header */}
          <div className="flex justify-between items-center pb-1.5 mb-3 border-b border-slate-300">
            <span className="font-bold uppercase tracking-wider text-slate-900" style={{ fontSize: '10pt', color: ACCENT }}>
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
                <div className="space-y-2" style={{ fontSize: '9.5pt' }}>
                  {resumeData.education.map((edu: any, i: number) => (
                    <div key={i} className="flex justify-between items-start border-l-2 pl-3 border-slate-300">
                      <div>
                        <div className="font-bold text-slate-900">{edu.degree}</div>
                        <div className="text-slate-600 font-medium">{edu.institution} {edu.location ? `| ${edu.location}` : ''}</div>
                      </div>
                      <div className="font-semibold whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
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
                <div className="grid grid-cols-1 gap-2" style={{ fontSize: '9.5pt' }}>
                  {resumeData.certifications.map((cert: any, i: number) => (
                    <div key={i} className="flex justify-between items-start border-b border-slate-100 pb-1">
                      <div>
                        <span className="font-bold text-slate-900">{cert.name}</span>
                        <span className="text-slate-400 mx-1.5">|</span>
                        <span className="text-slate-600 font-medium">{cert.issuer}</span>
                      </div>
                      <div className="whitespace-nowrap ml-4 text-slate-500 font-semibold">{cert.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page 2 Footer */}
        <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none">
          <span>{profileData.full_name || 'Candidate'} — C2C Certified Professional</span>
          <span>Page 2 of 2</span>
        </div>
      </div>

    </div>
  );
});

C2CCertifiedTemplate.displayName = 'C2CCertifiedTemplate';
