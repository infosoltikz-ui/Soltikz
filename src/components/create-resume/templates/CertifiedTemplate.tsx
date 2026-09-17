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
  ({ resumeData, profileData, themeColor, fontFamily }, ref) => {
    const ACCENT = themeColor || '#005580'; // Dark blue
    const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

    // Highlighted Section Header with Left Border
    const SectionHeader = ({ title }: { title: string }) => (
      <div className="flex items-center mb-2.5 mt-4 w-full break-inside-avoid">
        <div style={{ width: '5px', height: '20px', backgroundColor: ACCENT }} className="mr-2.5"></div>
        <h2 className="font-bold uppercase tracking-wider m-0" style={{ fontSize: '12pt', color: ACCENT }}>
          {title}
        </h2>
        <div className="flex-1 ml-3 h-[1px] bg-slate-200"></div>
      </div>
    );

    return (
      <div
        ref={ref}
        className="resume-document bg-white w-full max-w-[794px] min-h-[1123px] mx-auto shadow-sm border border-slate-200 text-black transition-all"
        style={{
          boxSizing: 'border-box',
          padding: '48px 56px',
          fontFamily: selectedFont,
          color: '#1a1a1a',
          fontSize: '10pt',
          lineHeight: '1.45'
        }}
      >
        <div>
          {/* Top 2-Column Header Box */}
          <div className="flex flex-row justify-between items-stretch border border-slate-200 rounded-sm mb-5 bg-slate-50 overflow-hidden break-inside-avoid">
            
            {/* Left side: Contact Info */}
            <div className="p-4 flex-1 bg-white">
              <h1 className="uppercase font-extrabold mb-1" style={{ fontSize: '22pt', color: ACCENT, letterSpacing: '-0.5px' }}>
                {profileData.full_name || 'JOHN DOE'}
              </h1>
              <div className="flex flex-col gap-0.5 mt-1.5" style={{ fontSize: '10pt', color: '#4a4a4a' }}>
                {profileData.location && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">📍</span> {profileData.location}</div>}
                {profileData.phone && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">📞</span> {profileData.phone}</div>}
                {profileData.email && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">✉️</span> {profileData.email}</div>}
                {profileData.linkedin && <div className="flex items-center gap-1.5"><span className="font-bold opacity-60">🔗</span> {profileData.linkedin}</div>}
              </div>
            </div>

            {/* Right side: Highlighted Certifications Block */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <div className="w-[38%] p-3.5 border-l border-slate-200 bg-slate-50 flex flex-col justify-center">
                <h3 className="font-bold uppercase mb-1.5 text-slate-500 text-xs tracking-widest">Key Certifications</h3>
                <ul className="space-y-1" style={{ fontSize: '9pt' }}>
                  {resumeData.certifications.slice(0, 4).map((cert: any, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-1.5">✓</span>
                      <span className="leading-tight font-medium text-slate-700">{cert.name}</span>
                    </li>
                  ))}
                  {resumeData.certifications.length > 4 && (
                    <li className="text-slate-400 italic text-xs mt-0.5">+ {resumeData.certifications.length - 4} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Professional Summary */}
          {resumeData.summary && resumeData.summary.length > 0 && (
            <div className="mb-3.5 break-inside-avoid">
              <SectionHeader title="Professional Summary" />
              <ul className="list-disc pl-5 space-y-1 m-0" style={{ fontSize: '10pt' }}>
                {resumeData.summary.map((point: string, i: number) => (
                  <li key={i} className="pl-1 leading-snug text-justify">
                    {parseBoldText(point)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Skills - Bordered Grid/Table Layout */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-3.5 break-inside-avoid">
              <SectionHeader title="Technical Competencies" />
              <div className="border border-slate-200 rounded-sm overflow-hidden text-sm" style={{ fontSize: '9.5pt' }}>
                {resumeData.skills.map((skillGroup: any, i: number) => (
                  <div key={i} className={`flex flex-row border-b border-slate-200 last:border-b-0`}>
                    <div className="w-[30%] bg-slate-50 p-2 border-r border-slate-200 font-bold text-slate-700 flex items-center">
                      {skillGroup.category}
                    </div>
                    <div className="w-[70%] p-2 bg-white flex items-center leading-snug">
                      {skillGroup.items.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-3.5">
              <SectionHeader title="Career Experience" />
              <div className="space-y-4">
                {resumeData.experience.map((exp: any, i: number) => (
                  <div key={i} className="break-inside-avoid mb-3.5">
                    {/* Header line */}
                    <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-200 rounded-sm mb-1.5">
                      <div>
                        <div className="font-extrabold" style={{ fontSize: '10.5pt', color: ACCENT }}>{exp.role}</div>
                        <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.duration}</div>
                      </div>
                    </div>

                    {/* Environment */}
                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mb-1.5 px-2 leading-snug" style={{ fontSize: '9pt' }}>
                        <span className="font-bold bg-slate-100 px-1 py-0.5 rounded text-slate-600 mr-1 border border-slate-200">Tech Stack:</span>
                        <span className="text-slate-600 italic">{exp.environment.join(', ')}</span>
                      </div>
                    )}

                    {/* Bullets */}
                    <ul className="list-square pl-[20px] pr-2 space-y-1 m-0" style={{ fontSize: '10pt' }}>
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
            <div className="mb-3.5 break-inside-avoid">
              <SectionHeader title="Education" />
              <div className="space-y-2">
                {resumeData.education.map((edu: any, i: number) => (
                  <div key={i} className="flex flex-row justify-between items-start">
                    <div>
                      <div className="font-bold" style={{ fontSize: '10pt', color: ACCENT }}>{edu.degree}</div>
                      <div style={{ fontSize: '9.5pt' }} className="text-slate-700">{edu.institution}</div>
                    </div>
                    <div className="font-bold text-slate-500" style={{ fontSize: '9.5pt' }}>{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

CertifiedTemplate.displayName = 'CertifiedTemplate';
