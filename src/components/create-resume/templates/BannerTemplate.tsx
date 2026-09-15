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
  const BANNER = themeColor || '#96847c'; // Default to taupe/brown from screenshot
  const selectedFont = fontFamily || 'Georgia, "Times New Roman", Times, serif';

  // Helper for Section Headers
  const SectionHeader = ({ title }: { title: string }) => (
    <h2 
      className="mb-2 mt-4" 
      style={{ fontSize: '14pt', color: BANNER, fontFamily: selectedFont, fontWeight: 600 }}
    >
      {title}
    </h2>
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
        color: '#2b2b2b'
      }}
    >
      {/* Colored Banner Header */}
      <div className="text-center" style={{ backgroundColor: BANNER, margin: '-57px -68px 30px -68px', padding: '57px 68px 30px 68px' }}>
        
        <h1 className="uppercase tracking-widest mb-3" style={{ fontSize: '26pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-1" style={{ fontSize: '10pt', color: '#f8f8f8', fontWeight: 500 }}>
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
        
        {/* LinkedIn with WWW: prefix */}
        {profileData.linkedin && (
           <div className="flex justify-center" style={{ fontSize: '10pt', color: '#f8f8f8', fontWeight: 500 }}>
             <span className="mr-1">WWW:</span> <span>{profileData.linkedin}</span>
           </div>
        )}
      </div>

      {/* Main Content Body */}
      <div>
        
        {/* Personal Summary */}
        {resumeData.summary && resumeData.summary.length > 0 && (
          <div className="mb-4">
            <SectionHeader title="Personal Summary" />
            <ul className="list-disc pl-5 space-y-1.5 m-0" style={{ fontSize: '10pt' }}>
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
          <div className="mb-4">
            <SectionHeader title="Skills" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5" style={{ fontSize: '10pt' }}>
              {resumeData.skills.map((skillGroup, i) => (
                <ul key={i} className="list-disc pl-4 m-0 space-y-1">
                  <li className="leading-snug">
                    <span className="font-bold">{skillGroup.category}: </span>
                    <span>{skillGroup.items.join(', ')}</span>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-4">
            <SectionHeader title="Experience" />
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i}>
                  {/* ROLE | Date */}
                  <div className="flex items-center leading-tight mb-0.5" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
                    <span className="uppercase">{exp.role}</span>
                    <span className="mx-1.5 text-gray-400 font-normal">|</span>
                    <span>{exp.duration}</span>
                  </div>
                  
                  {/* Company - Location */}
                  <div className="leading-tight mb-1" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
                    {exp.company}
                  </div>

                  {/* Environment */}
                  {exp.environment && exp.environment.length > 0 && (
                    <div className="mb-1.5 leading-snug" style={{ fontSize: '10pt' }}>
                      <span className="font-bold italic">Environment: </span>
                      {exp.environment.join(', ')}
                    </div>
                  )}

                  {/* Bullets */}
                  <ul className="list-disc pl-5 space-y-1.5 mt-1 m-0" style={{ fontSize: '10pt' }}>
                    {exp.bullets.map((bullet, j) => (
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

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mb-4">
            <SectionHeader title="Certifications" />
            <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '10pt' }}>
              {resumeData.certifications.map((cert, i) => (
                <li key={i} className="pl-1 leading-snug">
                  <span className="font-bold">{cert.name}</span> {cert.issuer && `| ${cert.issuer}`} {cert.year && `(${cert.year})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-4">
            <SectionHeader title="Education" />
            <div className="space-y-3">
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '10.5pt' }}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="whitespace-nowrap ml-4">{edu.year}</div>
                  </div>
                  <div style={{ fontSize: '10.5pt' }}>
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

BannerTemplate.displayName = 'BannerTemplate';
