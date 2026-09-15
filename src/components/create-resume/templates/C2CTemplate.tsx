import React from 'react';
import type { ResumeTemplateProps } from './types';

export const C2CTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({ resumeData, profileData, fontFamily }, ref) => {
  const selectedFont = fontFamily || 'Arial, Calibri, sans-serif';

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

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="font-bold text-black mt-4 mb-2" style={{ fontSize: '11pt' }}>
      {title}
    </h2>
  );

  let globalBulletCount = 1;

  return (
    <div
      ref={ref}
      className="bg-white w-[794px] mx-auto shadow-sm border border-slate-200 text-black"
      style={{
        boxSizing: 'border-box',
        fontFamily: selectedFont,
        color: '#000000',
        fontSize: '10.5pt',
        lineHeight: '1.5',
        // Exact A4 Size: 210x297mm -> 794x1123px (at 96dpi)
        height: '1123px',
        // Exact Margins: Top/Bottom 15mm (57px), Left/Right 18mm (68px)
        padding: '57px 68px',
        columnWidth: '658px', // Content width: 794 - (68 * 2)
        columnGap: '136px',   // Gap equals Right Margin + Left Margin
        columnFill: 'auto',
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-black m-0" style={{ fontSize: '16pt' }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>
        <div className="mt-1">
          {[profileData.location, profileData.phone, profileData.email, profileData.linkedin].filter(Boolean).join('  •  ')}
        </div>
        {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
          <div className="mt-1">
            {[
              profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
              profileData.relocation && `Relocation: ${profileData.relocation}`,
              profileData.availability && `Availability: ${profileData.availability}`
            ].filter(Boolean).join('   |   ')}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {resumeData.summary && resumeData.summary.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Professional Summary" />
          <ul className="list-none m-0 space-y-1">
            {resumeData.summary.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0">▪ {i + 1}.</span>
                <span className="text-justify">{renderWithBold(point)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technical Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Technical Skills" />
          <div className="space-y-1">
            {resumeData.skills.map((skillGroup, i) => (
              <div key={i}>
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
          <SectionHeader title="Professional Experience" />
          <div className="space-y-5">
            {resumeData.experience.map((exp, i) => (
              <div key={i}>
                <div className="font-bold">
                  {exp.company} {exp.location ? `| ${exp.location}` : ''} | {exp.duration}
                </div>
                <div className="mb-1">{exp.role}</div>

                <ul className="list-none mt-1 mb-1 m-0 space-y-1">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="shrink-0">{globalBulletCount++}.</span>
                      <span className="text-justify">{renderWithBold(bullet)}</span>
                    </li>
                  ))}
                </ul>

                {exp.environment && exp.environment.length > 0 && (
                  <div className="mt-1">
                    <span className="font-bold">Environment: </span>
                    <span>{exp.environment.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {resumeData.education.map((edu, i) => (
              <div key={i}>
                <span className="font-bold">{edu.degree}</span> | {edu.institution} | {edu.year}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Certifications" />
          <div className="space-y-1">
            {resumeData.certifications.map((cert, i) => (
              <div key={i}>
                <span className="font-bold">{cert.name}</span> | {cert.issuer} | Earned {cert.year}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

C2CTemplate.displayName = 'C2CTemplate';
