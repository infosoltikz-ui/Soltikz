import React from 'react';

interface ResumeTemplateProps {
  resumeData: Record<string, any>;
  profileData: Record<string, any>;
  themeColor?: string;
  fontFamily?: string;
}

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

export const ResumeRenderer = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ resumeData, profileData, fontFamily }, ref) => {
    const selectedFont = fontFamily || 'Arial, Helvetica, sans-serif';

    // Helper for Section Headers (Strict ATS)
    const SectionHeader = ({ title }: { title: string }) => (
      <h2 
        className="font-bold uppercase pb-0.5 mb-2 mt-3.5 border-b border-black w-full break-inside-avoid" 
        style={{ fontSize: '11.5pt', color: '#000000', fontFamily: selectedFont }}
      >
        {title}
      </h2>
    );

    return (
      <div
        ref={ref}
        className="resume-document bg-white w-full max-w-[794px] min-h-[1123px] mx-auto shadow-sm border border-slate-200 text-black transition-all"
        style={{
          boxSizing: 'border-box',
          padding: '48px 56px',
          fontFamily: selectedFont,
          color: '#000000',
          fontSize: '10pt',
          lineHeight: '1.45'
        }}
      >
        {/* Header - Classic ATS Center */}
        <div className="mb-4 text-center break-inside-avoid">
          <h1 className="uppercase font-bold mb-1" style={{ fontSize: '20pt' }}>
            {profileData.full_name || 'JOHN DOE'}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: '10pt' }}>
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
            {profileData.linkedin && (
              <>
                {(profileData.location || profileData.phone || profileData.email) && <span>|</span>}
                <span>{profileData.linkedin}</span>
              </>
            )}
          </div>
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

        {/* Technical Skills - Flat ATS format */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-3.5 break-inside-avoid">
            <SectionHeader title="Technical Skills" />
            <div className="space-y-1" style={{ fontSize: '10pt' }}>
              {resumeData.skills.map((skillGroup: any, i: number) => (
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
          <div className="mb-3.5">
            <SectionHeader title="Professional Experience" />
            <div className="space-y-4">
              {resumeData.experience.map((exp: any, i: number) => (
                <div key={i} className="break-inside-avoid mb-3.5">
                  <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '10.5pt' }}>
                    <div className="font-bold">{exp.role}</div>
                    <div className="whitespace-nowrap ml-4 font-bold">{exp.duration}</div>
                  </div>
                  <div className="leading-tight mb-1" style={{ fontSize: '10pt' }}>
                    <span className="font-semibold text-slate-800">
                      {exp.company}
                      {exp.client && ` (Client: ${exp.client})`}
                    </span>
                    {exp.location && <span> | {exp.location}</span>}
                  </div>

                  {exp.environment && exp.environment.length > 0 && (
                    <div className="mb-1 leading-snug text-slate-600" style={{ fontSize: '9.5pt' }}>
                      <span className="font-bold text-black">Environment: </span>
                      {exp.environment.join(', ')}
                    </div>
                  )}

                  <ul className="list-disc pl-5 space-y-1 mt-1 m-0" style={{ fontSize: '10pt' }}>
                    {exp.bullets.map((bullet: string, j: number) => (
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
            <SectionHeader title="Education" />
            <div className="space-y-2">
              {resumeData.education.map((edu: any, i: number) => (
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
              {resumeData.certifications.map((cert: any, i: number) => (
                <li key={i} className="pl-1 leading-snug">
                  <span className="font-bold">{cert.name}</span> {cert.issuer && `- ${cert.issuer}`} {cert.year && `(${cert.year})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

ResumeRenderer.displayName = 'ResumeRenderer';
