import React from 'react';
import type { ResumeTemplateProps } from './types';

const SIDEBAR_BG = '#1f2937';
export const SidebarTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData, themeColor, fontFamily }, ref) => {
  const ACCENT = themeColor || '#38bdf8';
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  return (
    <div
      ref={ref}
      className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm border border-slate-200 text-black flex"
      style={{ fontFamily: selectedFont, color: '#000000' }}
    >
      {/* Left sidebar */}
      <div className="w-[280px] shrink-0 p-6 text-white" style={{ backgroundColor: SIDEBAR_BG }}>
        <h1 className="font-bold leading-tight" style={{ fontSize: '18pt' }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>

        <div className="mt-4 space-y-1.5" style={{ fontSize: '10pt' }}>
          {profileData.email && <div className="break-words">{profileData.email}</div>}
          {profileData.phone && <div>{profileData.phone}</div>}
          {profileData.location && <div>{profileData.location}</div>}
          {profileData.linkedin && <div className="break-words">{profileData.linkedin}</div>}
        </div>

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mt-6">
            <h2 className="uppercase font-bold pb-1 mb-2" style={{ fontSize: '11pt', color: ACCENT, letterSpacing: '0.05em' }}>
              Skills
            </h2>
            <div className="space-y-2" style={{ fontSize: '9.5pt' }}>
              {resumeData.skills.map((skillGroup, i) => (
                <div key={i}>
                  <div className="font-bold" style={{ color: ACCENT }}>{skillGroup.category}</div>
                  <div className="text-slate-200 leading-snug">{skillGroup.items.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mt-6">
            <h2 className="uppercase font-bold pb-1 mb-2" style={{ fontSize: '11pt', color: ACCENT, letterSpacing: '0.05em' }}>
              Education
            </h2>
            <div className="space-y-2" style={{ fontSize: '9.5pt' }}>
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <div className="font-bold">{edu.degree}</div>
                  <div className="text-slate-200">{edu.institution}</div>
                  <div className="text-slate-300">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mt-6">
            <h2 className="uppercase font-bold pb-1 mb-2" style={{ fontSize: '11pt', color: ACCENT, letterSpacing: '0.05em' }}>
              Certifications
            </h2>
            <div className="space-y-1.5" style={{ fontSize: '9.5pt' }}>
              {resumeData.certifications.map((cert, i) => (
                <div key={i} className="text-slate-200 leading-snug">
                  {cert.name} — {cert.year}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right main content */}
      <div className="flex-1 min-w-0 p-8">
        {resumeData.summary && resumeData.summary.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold border-b-2 border-slate-800 pb-1 mb-2 mt-0" style={{ fontSize: '12pt' }}>
              Summary
            </h2>
            <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
              {resumeData.summary.map((point, i) => (
                <li key={i} className="pl-1 leading-snug" title={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && (
          <div>
            <h2 className="uppercase font-bold border-b-2 border-slate-800 pb-1 mb-3 mt-0" style={{ fontSize: '12pt' }}>
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1" style={{ fontSize: '11pt' }}>
                    <div>
                      <span className="font-bold">{exp.role}</span>
                      <span className="mx-2">|</span>
                      <span className="font-bold">{exp.company}</span>
                    </div>
                    <div className="font-bold whitespace-nowrap ml-4">{exp.duration}</div>
                  </div>

                  {exp.environment && exp.environment.length > 0 && (
                    <div className="mb-2 italic" style={{ fontSize: '11pt' }}>
                      <span className="font-bold not-italic">Environment: </span>
                      {exp.environment.join(', ')}
                    </div>
                  )}

                  <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="pl-1 leading-snug" title={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

SidebarTemplate.displayName = 'SidebarTemplate';
