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

export const SidebarTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData, themeColor, fontFamily }, ref) => {
  const ACCENT = themeColor || '#4a0e0e'; // Default to a dark maroon/brown
  const TOP_BAR_COLOR = '#F5C05E'; // Mustard yellow
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  // Helper function to split name into first and last for two-tone styling
  const renderName = () => {
    const nameStr = profileData.full_name || 'JOHN DOE';
    const parts = nameStr.trim().split(' ');
    if (parts.length === 1) {
      return <span style={{ color: ACCENT }}>{parts[0]}</span>;
    }
    const firstName = parts[0];
    const restName = parts.slice(1).join(' ');
    return (
      <>
        <span className="text-slate-600">{firstName}</span>{' '}
        <span style={{ color: ACCENT }}>{restName}</span>
      </>
    );
  };

  // Helper for Section Headers
  const SectionHeader = ({ title }: { title: string }) => (
    <h2 
      className="font-bold pb-1 mb-2.5 mt-3.5 border-b border-slate-300 w-full break-inside-avoid" 
      style={{ fontSize: '13pt', color: ACCENT }}
    >
      {title}
    </h2>
  );

  return (
    <div
      ref={ref}
      className="resume-document bg-white w-full max-w-[794px] min-h-[1123px] mx-auto shadow-sm border border-slate-200 text-black overflow-hidden transition-all"
      style={{
        boxSizing: 'border-box',
        padding: '48px 56px',
        fontFamily: selectedFont,
        color: '#000000',
        fontSize: '10pt',
        lineHeight: '1.45'
      }}
    >
      {/* Top Accent Bar */}
      <div 
        style={{ 
          backgroundColor: TOP_BAR_COLOR, 
          height: '14px', 
          margin: '-48px -56px 28px -56px', 
          width: 'calc(100% + 112px)' 
        }} 
      />

      <div>
        {/* Header */}
        <div className="mb-5 text-center break-inside-avoid">
          <h1 className="uppercase tracking-wider mb-1.5" style={{ fontSize: '24pt', fontWeight: 700 }}>
            {renderName()}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: '10pt' }}>
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

        {/* Professional Summary */}
        {resumeData.summary && resumeData.summary.length > 0 && (
          <div className="mb-3.5 break-inside-avoid">
            <SectionHeader title="Professional Summary" />
            <p className="text-justify leading-snug m-0" style={{ fontSize: '10pt' }}>
              {resumeData.summary.map((point: string, i: number) => (
                <span key={i} className="block mb-1">
                  {parseBoldText(point)}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Technical Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-3.5 break-inside-avoid">
            <SectionHeader title="Technical Skills" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1" style={{ fontSize: '10pt' }}>
              {resumeData.skills.map((skillGroup, i) => (
                <ul key={i} className="list-disc pl-4 m-0 space-y-0.5">
                  <li className="leading-snug">
                    <span className="font-bold">{skillGroup.category}: </span>
                    <span>{skillGroup.items.join(', ')}</span>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-3.5">
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="break-inside-avoid mb-3.5">
                  <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '10.5pt' }}>
                    <div className="font-bold text-black">{exp.role}</div>
                    <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
                  </div>
                  <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10pt' }}>
                    <div className="font-bold text-slate-800">{exp.company}</div>
                  </div>

                  {exp.environment && exp.environment.length > 0 && (
                    <div className="mb-1 leading-snug text-slate-600" style={{ fontSize: '9.5pt' }}>
                      <span className="font-bold text-black">Environment: </span>
                      {exp.environment.join(', ')}
                    </div>
                  )}

                  <ul className="list-disc pl-5 space-y-1 mt-1 m-0" style={{ fontSize: '10pt' }}>
                    {exp.bullets.map((bullet, j) => (
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
          <div className="mb-3.5 break-inside-avoid">
            <SectionHeader title="Education and Training" />
            <div className="space-y-2">
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '10pt' }}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="whitespace-nowrap ml-4">{edu.year}</div>
                  </div>
                  <div style={{ fontSize: '10pt' }} className="text-slate-600">
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mb-3.5 break-inside-avoid">
            <SectionHeader title="Certifications" />
            <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '10pt' }}>
              {resumeData.certifications.map((cert, i) => (
                <li key={i} className="pl-1 leading-snug">
                  <span className="font-bold">{cert.name}</span> - {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

SidebarTemplate.displayName = 'SidebarTemplate';
