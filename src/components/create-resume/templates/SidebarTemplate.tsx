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
  const ACCENT = themeColor || '#4a0e0e'; // Maroon/brown accent
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

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 
      className="font-bold pb-0.5 mb-2 mt-3 border-b border-slate-300 w-full break-inside-avoid" 
      style={{ fontSize: '11.5pt', color: ACCENT }}
    >
      {title}
    </h2>
  );

  const experiences = resumeData.experience || [];
  const firstExp = experiences.slice(0, 1);
  const secondExp = experiences.slice(1);
  const hasPage2 = secondExp.length > 0 || (resumeData.education && resumeData.education.length > 0) || (resumeData.certifications && resumeData.certifications.length > 0);

  return (
    <div ref={ref} className="space-y-8 print:space-y-0 text-black">
      {/* ─── PAGE 1 ─── */}
      <div
        className="resume-page bg-white w-[794px] min-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black overflow-hidden relative flex flex-col justify-between"
        style={{
          boxSizing: 'border-box',
          padding: '44px 50px',
          fontFamily: selectedFont,
          color: '#000000',
          fontSize: '9.5pt',
          lineHeight: '1.4'
        }}
      >
        <div>
          {/* Top Accent Bar */}
          <div 
            style={{ 
              backgroundColor: TOP_BAR_COLOR, 
              height: '12px', 
              margin: '-44px -50px 22px -50px', 
              width: 'calc(100% + 100px)' 
            }} 
          />

          {/* Header */}
          <div className="mb-3.5 text-center break-inside-avoid">
            <h1 className="uppercase tracking-wider mb-1" style={{ fontSize: '22pt', fontWeight: 700 }}>
              {renderName()}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: '9.5pt' }}>
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
            <div className="mb-3">
              <SectionHeader title="Professional Summary" />
              <p className="text-justify leading-snug m-0" style={{ fontSize: '9.5pt' }}>
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
            <div className="mb-3">
              <SectionHeader title="Technical Skills" />
              <div className="grid grid-cols-2 gap-x-6 gap-y-0.5" style={{ fontSize: '9pt' }}>
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

          {/* Experience (Role 1) */}
          {firstExp.length > 0 && (
            <div className="mb-2">
              <SectionHeader title="Experience" />
              {firstExp.map((exp, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '10pt' }}>
                    <div className="font-bold text-black">{exp.role}</div>
                    <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
                  </div>
                  <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '9.5pt' }}>
                    <div className="font-bold text-slate-800">{exp.company}</div>
                  </div>

                  {exp.environment && exp.environment.length > 0 && (
                    <div className="mb-1 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                      <span className="font-bold text-black">Environment: </span>
                      {exp.environment.join(', ')}
                    </div>
                  )}

                  <ul className="list-disc pl-5 space-y-1 mt-0.5 m-0" style={{ fontSize: '9pt' }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="pl-1 leading-snug text-justify">
                        {parseBoldText(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
          className="resume-page bg-white w-[794px] min-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black overflow-hidden relative flex flex-col justify-between"
          style={{
            boxSizing: 'border-box',
            padding: '44px 50px',
            fontFamily: selectedFont,
            color: '#000000',
            fontSize: '9.5pt',
            lineHeight: '1.4'
          }}
        >
          <div>
            {/* Top Accent Bar Continuation */}
            <div 
              style={{ 
                backgroundColor: TOP_BAR_COLOR, 
                height: '12px', 
                margin: '-44px -50px 18px -50px', 
                width: 'calc(100% + 100px)' 
              }} 
            />

            {/* Continuation Header */}
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-300">
              <span className="font-bold uppercase tracking-wider" style={{ fontSize: '11pt', color: ACCENT }}>
                {profileData.full_name || 'JOHN DOE'} — Experience (Cont.)
              </span>
              <span className="text-slate-400 text-[9pt] font-medium">Page 2</span>
            </div>

            {/* Remaining Experience */}
            {secondExp.length > 0 && (
              <div className="space-y-3 mb-4">
                {secondExp.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '10pt' }}>
                      <div className="font-bold text-black">{exp.role}</div>
                      <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
                    </div>
                    <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '9.5pt' }}>
                      <div className="font-bold text-slate-800">{exp.company}</div>
                    </div>

                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mb-1 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                        <span className="font-bold text-black">Environment: </span>
                        {exp.environment.join(', ')}
                      </div>
                    )}

                    <ul className="list-disc pl-5 space-y-1 mt-0.5 m-0" style={{ fontSize: '9pt' }}>
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="pl-1 leading-snug text-justify">
                          {parseBoldText(bullet)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div className="mb-4">
                <SectionHeader title="Education and Training" />
                <div className="space-y-1.5">
                  {resumeData.education.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '9.5pt' }}>
                        <div className="font-bold">{edu.degree}</div>
                        <div className="whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
                      </div>
                      <div style={{ fontSize: '9pt' }} className="text-slate-600">
                        {edu.institution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <div className="mb-4">
                <SectionHeader title="Certifications" />
                <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '9pt' }}>
                  {resumeData.certifications.map((cert, i) => (
                    <li key={i} className="pl-1 leading-snug">
                      <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                    </li>
                  ))}
                </ul>
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

SidebarTemplate.displayName = 'SidebarTemplate';
