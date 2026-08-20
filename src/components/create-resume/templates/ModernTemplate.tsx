import React from 'react';
import type { ResumeTemplateProps } from './types';

const ACCENT = '#0f766e';

export const ModernTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm border border-slate-200 text-black"
      style={{ fontFamily: 'Calibri, Arial, "Times New Roman", sans-serif', color: '#000000' }}
    >
      {/* Accent top bar */}
      <div style={{ backgroundColor: ACCENT, height: '10px' }} />

      <div className="p-[40px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-bold" style={{ fontSize: '20pt', color: ACCENT }}>
            {profileData.full_name || 'JOHN DOE'}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1" style={{ fontSize: '11pt' }}>
            {profileData.location && <span>{profileData.location}</span>}
            {profileData.phone && (
              <>
                <span className="text-gray-400">|</span>
                <span>{profileData.phone}</span>
              </>
            )}
            {profileData.email && (
              <>
                <span className="text-gray-400">|</span>
                <span>{profileData.email}</span>
              </>
            )}
            {profileData.linkedin && (
              <>
                <span className="text-gray-400">|</span>
                <span>{profileData.linkedin}</span>
              </>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.summary && resumeData.summary.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: ACCENT, borderBottom: `2px solid ${ACCENT}` }}>
              Summary
            </h2>
            <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
              {resumeData.summary.map((point, i) => (
                <li key={i} className="pl-1 leading-snug" title={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills - two column grid */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: ACCENT, borderBottom: `2px solid ${ACCENT}` }}>
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5" style={{ fontSize: '11pt' }}>
              {resumeData.skills.map((skillGroup, i) => (
                <div key={i} className="leading-snug">
                  <span className="font-bold">{skillGroup.category}: </span>
                  <span>{skillGroup.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold pb-1 mb-3 mt-0" style={{ fontSize: '12pt', color: ACCENT, borderBottom: `2px solid ${ACCENT}` }}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1" style={{ fontSize: '11pt' }}>
                    <div>
                      <span className="font-bold">{exp.role}</span>
                      <span className="mx-2">|</span>
                      <span className="font-bold" style={{ color: ACCENT }}>{exp.company}</span>
                    </div>
                    <div className="font-bold whitespace-nowrap ml-4">
                      {exp.duration}
                    </div>
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

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-5">
            <h2 className="uppercase font-bold pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: ACCENT, borderBottom: `2px solid ${ACCENT}` }}>
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

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div>
            <h2 className="uppercase font-bold pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: ACCENT, borderBottom: `2px solid ${ACCENT}` }}>
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

ModernTemplate.displayName = 'ModernTemplate';
