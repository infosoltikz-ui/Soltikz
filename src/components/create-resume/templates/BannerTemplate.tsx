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

  const experiences = resumeData.experience || [];

  return (
    <div ref={ref} className="space-y-8 print:space-y-0 text-black">
      <div 
        className="resume-page bg-white w-[794px] mx-auto shadow-xl border border-slate-200 text-black overflow-hidden relative"
        style={{
          boxSizing: 'border-box',
          padding: '44px 50px',
          fontFamily: selectedFont,
          color: '#2b2b2b',
          fontSize: '9.5pt',
          lineHeight: '1.4'
        }}
      >
        <div>
          {/* Colored Banner Header */}
          <div 
            onClick={() => onSelectSection?.('header')}
            className={`cursor-pointer ${activeSectionKey === 'header' ? 'ring-2 ring-emerald-400' : ''}`}
            style={{ 
              backgroundColor: sectionStyles?.header?.color || BANNER, 
              margin: '-44px -50px 24px -50px', 
              padding: '38px 50px 20px 50px' 
            }}
          >
            <div style={getSectionStyle('header')}>
              <h1 className="uppercase tracking-widest mb-1.5 text-center" style={{ fontSize: '22pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
                {profileData.full_name || 'JOHN DOE'}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-1" style={{ fontSize: '9.5pt', color: '#f8f8f8', fontWeight: 500 }}>
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
          {resumeData.summary && resumeData.summary.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('summary')}
              className={getSectionWrapperClass('summary')}
              style={getSectionStyle('summary')}
            >
              <div className="mb-3">
                <SectionHeader title="Personal Summary" sectionKey="summary" />
                <ul className="list-disc pl-5 space-y-1 m-0" style={{ fontSize: '9.5pt' }}>
                  {resumeData.summary.map((point: string, i: number) => (
                    <li key={i} className="pl-1 leading-snug text-justify">
                      {parseBoldText(point)}
                    </li>
                  ))}
                </ul>
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
              <div className="mb-3">
                <SectionHeader title="Skills" sectionKey="skills" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-0.5" style={{ fontSize: '9pt' }}>
                  {resumeData.skills.map((skillGroup, i) => (
                    <ul key={i} className="list-disc pl-4 m-0 space-y-0.5">
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

          {experiences.length > 0 && (
            <div 
              onClick={() => onSelectSection?.('experience')}
              className={getSectionWrapperClass('experience')}
              style={getSectionStyle('experience')}
            >
              <div className="mb-2">
                <SectionHeader title="Professional Experience" sectionKey="experience" />
                {experiences.map((exp: any, i: number) => (
                  <div key={i} className="mb-2">
                    <div className="flex items-center leading-tight mb-0.5" style={{ fontSize: '10pt', fontWeight: 700 }}>
                      <span className="uppercase">{exp.role}</span>
                      <span className="mx-1.5 text-gray-400 font-normal">|</span>
                      <span>{exp.duration}</span>
                    </div>
                    
                    <div className="leading-tight mb-1 font-semibold text-slate-700" style={{ fontSize: '9.5pt' }}>
                      {exp.company}
                    </div>

                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mb-1 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                        <span className="font-bold italic text-black">Environment: </span>
                        {exp.environment.join(', ')}
                      </div>
                    )}

                    <ul className="list-disc pl-5 space-y-1 mt-0.5 m-0" style={{ fontSize: '9pt' }}>
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
              <div className="mb-4">
                <SectionHeader title="Education" sectionKey="education" />
                <div className="space-y-1.5 text-[9.5pt]">
                  {resumeData.education.map((edu: any, i: number) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-800">{edu.degree}</div>
                        <div className="text-slate-600 font-medium">{edu.institution}</div>
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
              <div className="mb-4">
                <SectionHeader title="Certifications" sectionKey="certifications" />
                <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '9pt' }}>
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
      </div>
    </div>
  );
});


BannerTemplate.displayName = 'BannerTemplate';
