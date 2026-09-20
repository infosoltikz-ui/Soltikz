"use client";
import React from 'react';
import type { ResumeTemplateProps } from './types';

export const C2CTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const selectedFont = fontFamily || 'Arial, Calibri, sans-serif';
  const accentColor = themeColor || '#000000';

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
    const headerColor = sectionStyles?.[sectionKey || '']?.color || accentColor;
    return (
      <h2 className="font-bold mt-3 mb-1.5 border-b pb-0.5" style={{ fontSize: '10.5pt', color: headerColor, borderColor: headerColor }}>
        {title}
      </h2>
    );
  };

  let globalBulletCount = 1;

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
          fontFamily: selectedFont,
          color: '#000000',
          fontSize: '9.5pt',
          lineHeight: '1.4',
          padding: '44px 50px',
        }}
      >
        <div>
          {/* Header */}
          <div 
            onClick={() => onSelectSection?.('header')}
            className={getSectionWrapperClass('header')}
            style={getSectionStyle('header')}
          >
            <div className="text-center mb-3.5 break-inside-avoid">
              <h1 className="font-bold text-black m-0" style={{ fontSize: '15pt', color: sectionStyles?.header?.color || '#000000' }}>
                {profileData.full_name || 'JOHN DOE'}
              </h1>
              <div className="mt-0.5">
                {[profileData.location, profileData.phone, profileData.email, profileData.linkedin].filter(Boolean).join('  •  ')}
              </div>
              {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
                <div className="mt-0.5 text-slate-700">
                  {[
                    profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
                    profileData.relocation && `Relocation: ${profileData.relocation}`,
                    profileData.availability && `Availability: ${profileData.availability}`
                  ].filter(Boolean).join('   |   ')}
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
              <div className="mb-3">
                <SectionHeader title="Professional Summary" sectionKey="summary" />
                <ul className="list-none m-0 space-y-1">
                  {resumeData.summary.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 font-semibold">▪ {i + 1}.</span>
                      <span className="text-justify">{renderWithBold(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('skills')}
              className={getSectionWrapperClass('skills')}
              style={getSectionStyle('skills')}
            >
              <div className="mb-3">
                <SectionHeader title="Technical Skills" sectionKey="skills" />
                <div className="space-y-0.5">
                  {resumeData.skills.map((skillGroup, i) => (
                    <div key={i} className="leading-snug">
                      <span className="font-bold">{skillGroup.category}: </span>
                      <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience (Project 1) */}
          {firstExp.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('experience')}
              className={getSectionWrapperClass('experience')}
              style={getSectionStyle('experience')}
            >
              <div className="mb-2">
                <SectionHeader title="Professional Experience" sectionKey="experience" />
                {firstExp.map((exp, i) => (
                  <div key={i} className="mb-2">
                    <div className="font-bold">
                      {exp.company} {exp.location ? `| ${exp.location}` : ''} | {exp.duration}
                    </div>
                    <div className="mb-1 font-semibold text-slate-800">{exp.role}</div>

                    <ul className="list-none mt-0.5 mb-1 m-0 space-y-1">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="shrink-0 font-medium">{globalBulletCount++}.</span>
                          <span className="text-justify">{renderWithBold(bullet)}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mt-1">
                        <span className="font-bold">Environment: </span>
                        <span>{exp.environment.join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
            fontFamily: selectedFont,
            color: '#000000',
            fontSize: '9.5pt',
            lineHeight: '1.4',
            padding: '44px 50px',
          }}
        >
          <div>
            {/* Continuation Header */}
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-black">
              <span className="font-bold uppercase tracking-wider" style={{ fontSize: '10.5pt' }}>
                {profileData.full_name || 'JOHN DOE'} — Professional Experience (Cont.)
              </span>
              <span className="text-slate-400 text-[9pt] font-medium">Page 2</span>
            </div>

            {/* Remaining Experience */}
            {secondExp.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('experience')}
                className={getSectionWrapperClass('experience')}
                style={getSectionStyle('experience')}
              >
                <div className="space-y-3 mb-4">
                  {secondExp.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div className="font-bold">
                        {exp.company} {exp.location ? `| ${exp.location}` : ''} | {exp.duration}
                      </div>
                      <div className="mb-1 font-semibold text-slate-800">{exp.role}</div>

                      <ul className="list-none mt-0.5 mb-1 m-0 space-y-1">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="shrink-0 font-medium">{globalBulletCount++}.</span>
                            <span className="text-justify">{renderWithBold(bullet)}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mt-1">
                          <span className="font-bold">Environment: </span>
                          <span>{exp.environment.join(', ')}</span>
                        </div>
                      )}
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
                  <SectionHeader title="Education" sectionKey="education" />
                  <div className="space-y-1">
                    {resumeData.education.map((edu, i) => (
                      <div key={i}>
                        <span className="font-bold">{edu.degree}</span> | {edu.institution} | {edu.year}
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
                  <div className="space-y-1">
                    {resumeData.certifications.map((cert, i) => (
                      <div key={i}>
                        <span className="font-bold">{cert.name}</span> | {cert.issuer} | Earned {cert.year}
                      </div>
                    ))}
                  </div>
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
});

C2CTemplate.displayName = 'C2CTemplate';

