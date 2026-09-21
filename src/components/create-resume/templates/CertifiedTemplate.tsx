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
    const ACCENT = themeColor || '#005580'; // Dark blue
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
        <div className="flex items-center mb-2 mt-3.5 w-full break-inside-avoid">
          <div style={{ width: '5px', height: '18px', backgroundColor: headerColor }} className="mr-2"></div>
          <h2 className="font-bold uppercase tracking-wider m-0" style={{ fontSize: '11pt', color: headerColor }}>
            {title}
          </h2>
          <div className="flex-1 ml-2.5 h-[1px] bg-slate-200"></div>
        </div>
      );
    };

    const experiences = resumeData.experience || [];

    return (
      <div ref={ref} className="space-y-8 print:space-y-0 text-black">
        <div 
          className="resume-page bg-white w-[794px] mx-auto shadow-xl border border-slate-200 text-black relative"
          style={{
            boxSizing: 'border-box',
            padding: '44px 50px',
            fontFamily: selectedFont,
            color: '#1a1a1a',
            fontSize: '9.5pt',
            lineHeight: '1.4'
          }}
        >
          <div>
            {/* Top 2-Column Header Box */}
            <div 
              onClick={() => onSelectSection?.('header')}
              className={getSectionWrapperClass('header')}
              style={getSectionStyle('header')}
            >
              <div className="flex flex-row justify-between items-stretch border border-slate-200 rounded-sm mb-4 bg-slate-50 overflow-hidden">
                <div className="p-3.5 flex-1 bg-white">
                  <h1 className="uppercase font-extrabold mb-1" style={{ fontSize: '20pt', color: sectionStyles?.header?.color || ACCENT, letterSpacing: '-0.5px' }}>
                    {profileData.full_name || 'JOHN DOE'}
                  </h1>
                  <div className="flex flex-col gap-0.5 mt-1" style={{ fontSize: '9.5pt', color: '#4a4a4a' }}>
                    {profileData.location && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">📍</span> {profileData.location}</div>}
                    {profileData.phone && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">📞</span> {profileData.phone}</div>}
                    {profileData.email && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">✉️</span> {profileData.email}</div>}
                    {profileData.linkedin && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">🔗</span> {profileData.linkedin}</div>}
                  </div>
                </div>

                {resumeData.certifications && resumeData.certifications.length > 0 && (
                  <div className="w-[38%] p-3 border-l border-slate-200 bg-slate-50 flex flex-col justify-center">
                    <h3 className="font-bold uppercase mb-1 text-slate-500 text-[10px] tracking-widest">Key Certifications</h3>
                    <ul className="space-y-0.5" style={{ fontSize: '8.5pt' }}>
                      {resumeData.certifications.slice(0, 3).map((cert: any, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-600 mr-1.5">✓</span>
                          <span className="leading-tight font-medium text-slate-700">{cert.name}</span>
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
                <div className="mb-3">
                  <SectionHeader title="Professional Summary" sectionKey="summary" />
                  {/* Full-Time prose summary: join sentences into one flowing paragraph */}
                  <p className="text-justify leading-snug m-0" style={{ fontSize: '9.5pt' }}>
                    {Array.isArray(resumeData.summary)
                      ? resumeData.summary.join(' ')
                      : resumeData.summary}
                  </p>
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
                  <SectionHeader title="Technical Competencies" sectionKey="skills" />
                  <div className="border border-slate-200 rounded-sm overflow-hidden text-sm" style={{ fontSize: '9pt' }}>
                    {resumeData.skills.map((skillGroup: any, i: number) => (
                      <div key={i} className={`flex flex-row border-b border-slate-200 last:border-b-0`}>
                        <div className="w-[30%] bg-slate-50 p-1.5 border-r border-slate-200 font-bold text-slate-700 flex items-center">
                          {skillGroup.category}
                        </div>
                        <div className="w-[70%] p-1.5 bg-white flex items-center leading-snug">
                          {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Professional Experience */}
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
                      <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-200 rounded-sm mb-1">
                        <div>
                          <div className="font-extrabold" style={{ fontSize: '10pt', color: ACCENT }}>{exp.role}</div>
                          <div className="font-bold text-slate-700" style={{ fontSize: '9pt' }}>{exp.company}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-700" style={{ fontSize: '9pt' }}>{exp.duration}</div>
                        </div>
                      </div>

                      {exp.environment && exp.environment.length > 0 && (
                        <div className="mb-1 px-1.5 leading-snug" style={{ fontSize: '8.5pt' }}>
                          <span className="font-bold bg-slate-100 px-1 py-0.2 rounded text-slate-600 mr-1 border border-slate-200">Tech Stack:</span>
                          <span className="text-slate-600 italic">{exp.environment.join(', ')}</span>
                        </div>
                      )}

                      <ul className="list-square pl-[18px] pr-1 space-y-1 m-0" style={{ fontSize: '9pt' }}>
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
                <div className="mb-4">
                  <SectionHeader title="Education" sectionKey="education" />
                  <div className="space-y-2" style={{ fontSize: '9.5pt' }}>
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
                  <SectionHeader title="Certifications & Awards" sectionKey="certifications" />
                  <div className="grid grid-cols-1 gap-2" style={{ fontSize: '9pt' }}>
                    {resumeData.certifications.map((cert: any, i: number) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-800">{cert.name}</span>
                          <span className="text-slate-500 mx-1">|</span>
                          <span className="text-slate-600">{cert.issuer}</span>
                        </div>
                        <div className="whitespace-nowrap ml-4 text-slate-500">{cert.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CertifiedTemplate.displayName = 'CertifiedTemplate';

