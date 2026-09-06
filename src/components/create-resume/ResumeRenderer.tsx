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
        className="font-bold uppercase pb-1 mb-2 mt-4 border-b border-black w-full" 
        style={{ fontSize: '12pt', color: '#000000', fontFamily: selectedFont }}
      >
        {title}
      </h2>
    );

    return (
      <div
        ref={ref}
        className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm border border-slate-200 text-black px-[45px] py-[40px] flex flex-col"
        style={{ fontFamily: selectedFont, color: '#000000' }}
      >
        {/* Header - Classic ATS Center */}
        <div className="mb-4 text-center">
          <h1 className="uppercase font-bold mb-1" style={{ fontSize: '22pt' }}>
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
          <div className="mb-3">
            <SectionHeader title="Professional Summary" />
            <ul className="list-disc pl-5 space-y-1 m-0" style={{ fontSize: '10pt' }}>
              {resumeData.summary.map((point: string, i: number) => (
                <li key={i} className="pl-1 leading-snug">
                  {parseBoldText(point)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Skills - Flat ATS format */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-3">
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
          <div className="mb-3">
            <SectionHeader title="Professional Experience" />
            <div className="space-y-3">
              {resumeData.experience.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-start leading-tight mb-0.5" style={{ fontSize: '10.5pt' }}>
                    <div className="font-bold">{exp.role}</div>
                    <div className="whitespace-nowrap ml-4 font-bold">{exp.duration}</div>
                  </div>
                  <div className="leading-tight mb-1" style={{ fontSize: '10pt' }}>
                    <span className="font-bold">{exp.company}</span>
                  </div>

                  {exp.environment && exp.environment.length > 0 && (
                    <div className="mb-1 leading-snug" style={{ fontSize: '10pt' }}>
                      <span className="font-bold">Environment: </span>
                      {exp.environment.join(', ')}
                    </div>
                  )}

                  <ul className="list-disc pl-5 space-y-1 mt-1 m-0" style={{ fontSize: '10pt' }}>
                    {exp.bullets.map((bullet: string, j: number) => (
                      <li key={j} className="pl-1 leading-snug">
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
          <div className="mb-3">
            <SectionHeader title="Education" />
            <div className="space-y-2">
              {resumeData.education.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '10pt' }}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="whitespace-nowrap ml-4">{edu.year}</div>
                  </div>
                  <div style={{ fontSize: '10pt' }}>
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mb-3">
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
