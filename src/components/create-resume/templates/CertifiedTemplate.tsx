import React from 'react';
import type { ResumeTemplateProps } from './types';

const NAVY = '#1e3a5f';

export const CertifiedTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData }, ref) => {
  const badgeCerts = (resumeData.certifications || []).slice(0, 4);

  return (
    <div
      ref={ref}
      className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm border border-slate-200 p-[40px] text-black"
      style={{ fontFamily: 'Calibri, Arial, "Times New Roman", sans-serif', color: '#000000' }}
    >
      {/* Header with cert badges */}
      <div className="flex justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="font-bold" style={{ fontSize: '20pt', color: NAVY }}>
            {profileData.full_name || 'JOHN DOE'}
          </h1>
          <div className="mt-1 space-y-0.5" style={{ fontSize: '11pt' }}>
            {profileData.email && <div>{profileData.email}</div>}
            {profileData.phone && <div>{profileData.phone}</div>}
          </div>
        </div>
        {badgeCerts.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end shrink-0 max-w-[260px]">
            {badgeCerts.map((cert, i) => (
              <span
                key={i}
                className="font-bold rounded-full px-3 py-1 whitespace-nowrap"
                style={{ fontSize: '9pt', backgroundColor: NAVY, color: '#ffffff' }}
              >
                {cert.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {resumeData.summary && resumeData.summary.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b-2 pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: NAVY, borderColor: NAVY }}>
            Professional Summary
          </h2>
          <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
            {resumeData.summary.map((point, i) => (
              <li key={i} className="pl-1 leading-snug" title={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills as a bordered table */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b-2 pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: NAVY, borderColor: NAVY }}>
            Technical Skills
          </h2>
          <table className="w-full border-collapse" style={{ fontSize: '11pt' }}>
            <tbody>
              {resumeData.skills.map((skillGroup, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                  <td className="border border-slate-300 font-bold px-3 py-1.5 align-top w-1/3">{skillGroup.category}</td>
                  <td className="border border-slate-300 px-3 py-1.5 align-top">{skillGroup.items.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b-2 pb-1 mb-3 mt-0" style={{ fontSize: '12pt', color: NAVY, borderColor: NAVY }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1" style={{ fontSize: '11pt' }}>
                  <div>
                    <span className="font-bold">{exp.role}</span>
                    <span className="mx-2">-</span>
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
          <h2 className="uppercase font-bold border-b-2 pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: NAVY, borderColor: NAVY }}>
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
          <h2 className="uppercase font-bold border-b-2 pb-1 mb-2 mt-0" style={{ fontSize: '12pt', color: NAVY, borderColor: NAVY }}>
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
  );
});

CertifiedTemplate.displayName = 'CertifiedTemplate';
