import React from 'react';
import type { ResumeTemplateProps } from './types';

export const ModernTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData, themeColor, fontFamily }, ref) => {
  const ACCENT = themeColor || '#2E8B57'; // Updated default to teal/green from screenshots
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  // Helper function to render bold text parsed from simple markdown **bold**
  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Helper for Section Headers
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3 mt-4">
      <div className="border-t border-slate-300 w-full" />
      <h2 className="uppercase font-bold text-center py-1.5 m-0" style={{ fontSize: '13pt', color: ACCENT }}>
        {title}
      </h2>
      <div className="border-t border-slate-300 w-full" />
    </div>
  );

  return (
    <div
      ref={ref}
      className="bg-white w-[794px] mx-auto shadow-sm border border-slate-200 text-black"
      style={{
        boxSizing: 'border-box',
        height: '1123px',
        padding: '57px 68px',
        columnWidth: '658px',
        columnGap: '136px',
        columnFill: 'auto',
        fontFamily: selectedFont,
        color: '#1a1a1a'
      }}
    >
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="font-bold uppercase mb-1" style={{ fontSize: '26pt', color: ACCENT }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1" style={{ fontSize: '11pt' }}>
          {profileData.location && <span>{profileData.location}</span>}
          {profileData.phone && (
            <>
              {profileData.location && <span className="text-gray-400">|</span>}
              <span>{profileData.phone}</span>
            </>
          )}
          {profileData.email && (
            <>
              {(profileData.location || profileData.phone) && <span className="text-gray-400">|</span>}
              <span>{profileData.email}</span>
            </>
          )}
          {profileData.linkedin && (
            <>
              {(profileData.location || profileData.phone || profileData.email) && <span className="text-gray-400">|</span>}
              <span>{profileData.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div className="mb-4">
          <SectionHeader title="Summary" />
          <p className="text-justify leading-snug m-0" style={{ fontSize: '11pt' }}>
            {resumeData.summary.join(' ')}
          </p>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-4">
          <SectionHeader title="Skills" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-1.5" style={{ fontSize: '11pt' }}>
            {resumeData.skills.map((skillGroup, i) => (
              <ul key={i} className="list-disc pl-5 m-0 space-y-1">
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
        <div className="mb-4">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {resumeData.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start leading-tight" style={{ fontSize: '11pt' }}>
                  <div className="font-bold text-black">{exp.role}</div>
                  <div className="font-bold text-black whitespace-nowrap ml-4">{exp.duration}</div>
                </div>
                <div className="flex justify-between items-start leading-tight mb-1.5" style={{ fontSize: '11pt' }}>
                  <div className="font-bold text-black">{exp.company}</div>
                </div>

                {exp.environment && exp.environment.length > 0 && (
                  <div className="mb-1.5 leading-snug" style={{ fontSize: '11pt' }}>
                    <span className="font-bold">Environment: </span>
                    {exp.environment.join(', ')}
                  </div>
                )}

                <ul className="list-disc pl-5 space-y-1 mt-1 m-0" style={{ fontSize: '11pt' }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="pl-1 leading-snug text-justify">
                      {renderWithBold(bullet)}
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
        <div className="mb-4">
          <SectionHeader title="Education and Training" />
          <div className="space-y-3" style={{ fontSize: '11pt' }}>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <div className="font-bold">{edu.degree}</div>
                  <div>{edu.institution}</div>
                </div>
                <div className="font-bold whitespace-nowrap ml-4">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-4">
          <SectionHeader title="Certifications" />
          <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '11pt' }}>
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

ModernTemplate.displayName = 'ModernTemplate';
