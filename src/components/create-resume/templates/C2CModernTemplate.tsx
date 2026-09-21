"use client";
import React from 'react';
import type { ResumeTemplateProps } from './types';

export const C2CModernTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
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
      <div className="mb-3 mt-4 break-inside-avoid">
        <div className="border-t border-slate-300 w-full" />
        <h2 className="uppercase font-bold text-center py-1 m-0" style={{ fontSize: '11pt', color: headerColor }}>
          {title}
        </h2>
        <div className="border-t border-slate-300 w-full" />
      </div>
    );
  };

  let globalBulletCount = 1;
  const experiences = resumeData.experience || [];
  
  // Dynamically split first experience if it has too many bullets (e.g. > 5)
  // Since the summary has 10 bullets (20 lines), Page 1 only has room for about 5 experience bullets.
  let page1Experiences: any[] = [];
  let page2Experiences: any[] = [];
  
  if (experiences.length > 0) {
    const firstExp = experiences[0];
    if (firstExp.bullets && firstExp.bullets.length > 5) {
      page1Experiences = [{ ...firstExp, bullets: firstExp.bullets.slice(0, 5) }];
      page2Experiences = [
        { ...firstExp, bullets: firstExp.bullets.slice(5), isContinued: true },
        ...experiences.slice(1)
      ];
    } else {
      page1Experiences = [firstExp];
      page2Experiences = experiences.slice(1);
    }
  }

  const pageContainerClass = "resume-page bg-white w-[794px] mx-auto text-black relative";
  const pageContainerStyle: React.CSSProperties = {
    fontFamily: selectedFont,
    color: '#1a1a1a',
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
            <div className="flex justify-between items-start font-bold text-black" style={{ fontSize: '10pt' }}>
              <div>
                {exp.company} {exp.location ? `| ${exp.location}` : ''}
                {exp.isContinued && <span className="italic font-normal text-slate-500 ml-1">(Continued)</span>}
              </div>
              <div>{exp.duration}</div>
            </div>
            {!exp.isContinued && (
              <div className="italic text-slate-700" style={{ fontSize: '10pt' }}>
                {exp.role}
              </div>
            )}

            <ul className="list-none mt-1 mb-1.5 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
              {exp.bullets.map((bullet: string, j: number) => (
                <li key={j} className="flex gap-2">
                  <span className="shrink-0 font-bold text-slate-400">•</span>
                  <span className="text-justify text-slate-800">{renderWithBold(bullet)}</span>
                </li>
              ))}
            </ul>

            {exp.environment && exp.environment.length > 0 && (
              <div className="mt-2 pt-1 border-t border-slate-100" style={{ fontSize: '9pt' }}>
                <span className="font-bold text-black italic">Environment: </span>
                <span className="text-slate-600">{exp.environment.join(', ')}</span>
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
        {/* Header */}
        <div 
          onClick={() => onSelectSection?.('header')}
          className={getSectionWrapperClass('header')}
          style={getSectionStyle('header')}
        >
          <div className="mb-3.5 text-center break-inside-avoid">
            <h1 className="font-bold uppercase mb-1" style={{ fontSize: '22pt', color: sectionStyles?.header?.color || ACCENT }}>
              {profileData.full_name || 'JOHN DOE'}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1" style={{ fontSize: '9.5pt' }}>
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
            
            {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
              <div className="flex flex-wrap justify-center items-center gap-3 mt-1.5 pt-1.5 border-t border-slate-200" style={{ fontSize: '9pt', color: '#475569' }}>
                {[
                  profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
                  profileData.relocation && `Relocation: ${profileData.relocation}`,
                  profileData.availability && `Availability: ${profileData.availability}`
                ].filter(Boolean).map((item, index, arr) => (
                  <React.Fragment key={index}>
                    <span className="font-semibold">{item}</span>
                    {index < arr.length - 1 && <span className="text-slate-300">|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
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
              <div className="space-y-0.5" style={{ fontSize: '9.5pt' }}>
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
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className={pageContainerClass} style={pageContainerStyle}>
        
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
              <div className="space-y-1.5" style={{ fontSize: '9.5pt' }}>
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
              <div className="space-y-1" style={{ fontSize: '9.5pt' }}>
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

    </div>
  );
});

C2CModernTemplate.displayName = 'C2CModernTemplate';
