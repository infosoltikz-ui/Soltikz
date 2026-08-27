import React from 'react';
import type { ResumeTemplateProps } from './types';

export const BannerTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData, themeColor, fontFamily }, ref) => {
  const BANNER = themeColor || '#8b7355';
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  return (
    <div
      ref={ref}
      className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm border border-slate-200 text-black"
      style={{ fontFamily: selectedFont, color: '#000000' }}
    >
      {/* Colored banner header */}
      <div className="text-center px-[40px] py-10" style={{ backgroundColor: BANNER }}>
        <h1 className="font-bold tracking-wide" style={{ fontSize: '26pt', color: '#ffffff' }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-3 mt-3" style={{ fontSize: '11pt', color: '#f5f0eb' }}>
          {profileData.location && <span>{profileData.location}</span>}
          {profileData.phone && (
            <>
              <span className="opacity-60">|</span>
              <span>{profileData.phone}</span>
            </>
          )}
          {profileData.email && (
            <>
              <span className="opacity-60">|</span>
              <span>{profileData.email}</span>
            </>
          )}
          {profileData.linkedin && (
            <>
              <span className="opacity-60">|</span>
              <span>{profileData.linkedin}</span>
            </>
          )}
        </div>
      </div>

      <div className="p-[40px]">
        {resumeData.summary && resumeData.summary.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold mb-2 mt-0" style={{ fontSize: '12pt', color: BANNER, letterSpacing: '0.05em' }}>
              Personal Summary
            </h2>
            <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
              {resumeData.summary.map((point, i) => (
                <li key={i} className="pl-1 leading-snug" title={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold mb-2 mt-0" style={{ fontSize: '12pt', color: BANNER, letterSpacing: '0.05em' }}>
              Skills
            </h2>
            <div className="space-y-1.5" style={{ fontSize: '11pt' }}>
              {resumeData.skills.map((skillGroup, i) => (
                <div key={i} className="leading-snug">
                  <span className="font-bold">{skillGroup.category}: </span>
                  <span>{skillGroup.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold mb-3 mt-0" style={{ fontSize: '12pt', color: BANNER, letterSpacing: '0.05em' }}>
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

        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold mb-2 mt-0" style={{ fontSize: '12pt', color: BANNER, letterSpacing: '0.05em' }}>
              Education
            </h2>
            <div className="space-y-2" style={{ fontSize: '11pt' }}>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{edu.degree}</div>
                    <div>{edu.institution}</div>
                  </div>
                  <div className="font-bold">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div>
            <h2 className="uppercase font-bold mb-2 mt-0" style={{ fontSize: '12pt', color: BANNER, letterSpacing: '0.05em' }}>
              Certifications
            </h2>
            <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
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

BannerTemplate.displayName = 'BannerTemplate';
