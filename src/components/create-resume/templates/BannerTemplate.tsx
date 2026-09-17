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

export const BannerTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData, themeColor, fontFamily }, ref) => {
  const BANNER = themeColor || '#96847c'; // Taupe/brown accent
  const selectedFont = fontFamily || 'Georgia, "Times New Roman", Times, serif';

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 
      className="mb-1.5 mt-3 pb-0.5 border-b border-slate-200 break-inside-avoid" 
      style={{ fontSize: '11.5pt', color: BANNER, fontFamily: selectedFont, fontWeight: 600 }}
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
          color: '#2b2b2b',
          fontSize: '9.5pt',
          lineHeight: '1.4'
        }}
      >
        <div>
          {/* Colored Banner Header */}
          <div 
            className="text-center break-inside-avoid" 
            style={{ 
              backgroundColor: BANNER, 
              margin: '-44px -50px 24px -50px', 
              padding: '38px 50px 20px 50px' 
            }}
          >
            <h1 className="uppercase tracking-widest mb-1.5" style={{ fontSize: '22pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
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

          {/* Personal Summary */}
          {resumeData.summary && resumeData.summary.length > 0 && (
            <div className="mb-3">
              <SectionHeader title="Personal Summary" />
              <ul className="list-disc pl-5 space-y-1 m-0" style={{ fontSize: '9.5pt' }}>
                {resumeData.summary.map((point, i) => (
                  <li key={i} className="pl-1 leading-snug text-justify">
                    {parseBoldText(point)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-3">
              <SectionHeader title="Skills" />
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
            color: '#2b2b2b',
            fontSize: '9.5pt',
            lineHeight: '1.4'
          }}
        >
          <div>
            {/* Top Colored Continuation Bar */}
            <div 
              className="flex justify-between items-center text-white px-6 py-2.5 mb-3" 
              style={{ backgroundColor: BANNER, margin: '-44px -50px 20px -50px' }}
            >
              <span className="font-bold uppercase tracking-wider text-[11pt]">
                {profileData.full_name || 'JOHN DOE'} — Experience (Cont.)
              </span>
              <span className="text-[9pt] font-medium opacity-80">Page 2</span>
            </div>

            {/* Remaining Experience */}
            {secondExp.length > 0 && (
              <div className="space-y-3 mb-4">
                {secondExp.map((exp, i) => (
                  <div key={i} className="mb-3">
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
                <SectionHeader title="Education" />
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
                      <span className="font-bold">{cert.name}</span> {cert.issuer && `| ${cert.issuer}`} {cert.year && `(${cert.year})`}
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

BannerTemplate.displayName = 'BannerTemplate';
