import React from 'react';

interface ResumeData {
  summary: string[];
  skills: { category: string; items: string[] }[];
  experience: { role: string; company: string; duration: string; environment?: string[]; bullets: string[] }[];
  education: { degree: string; institution: string; year: string }[];
  certifications: { name: string; issuer: string; year: string }[];
}

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

interface ResumeRendererProps {
  resumeData: ResumeData;
  profileData: ProfileData;
}

export const ResumeRenderer = React.forwardRef<HTMLDivElement, ResumeRendererProps>(({ resumeData, profileData }, ref) => {
  return (
    <div 
      ref={ref} 
      // A4 Aspect Ratio roughly, white background, black text for professional look
      className="bg-white w-full max-w-[850px] mx-auto min-h-[1100px] shadow-sm border border-slate-200 p-[40px] text-black"
      style={{ fontFamily: 'Arial, sans-serif', color: '#000000' }}
    >
      {/* Top Header - Name (14-15pt) */}
      <div className="text-center mb-6">
        <h1 className="font-bold uppercase tracking-wider mb-2" style={{ fontSize: '15pt', color: '#000000' }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-3" style={{ fontSize: '11pt' }}>
          {profileData.email && <span>{profileData.email}</span>}
          {profileData.phone && (
            <>
              <span className="text-gray-400">|</span>
              <span>{profileData.phone}</span>
            </>
          )}
          {profileData.location && (
            <>
              <span className="text-gray-400">|</span>
              <span>{profileData.location}</span>
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
          <h2 className="uppercase font-bold border-b border-black pb-1 mb-2 mt-0" style={{ fontSize: '12pt' }}>
            Professional Summary
          </h2>
          <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
            {resumeData.summary.map((point, i) => (
              <li key={i} className="pl-1 leading-snug">{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Skill Set */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black pb-1 mb-2 mt-0" style={{ fontSize: '12pt' }}>
            Technical Skills
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

      {/* Professional Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black pb-1 mb-3 mt-0" style={{ fontSize: '12pt' }}>
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
                  <div className="font-bold whitespace-nowrap ml-4">
                    {exp.duration}
                  </div>
                </div>
                
                {/* Environment for top 2 C2C projects */}
                {exp.environment && exp.environment.length > 0 && (
                  <div className="mb-2 italic" style={{ fontSize: '11pt' }}>
                    <span className="font-bold not-italic">Environment: </span>
                    {exp.environment.join(', ')}
                  </div>
                )}

                <ul className="list-disc pl-5 space-y-1" style={{ fontSize: '11pt' }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="pl-1 leading-snug">{bullet}</li>
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
          <h2 className="uppercase font-bold border-b border-black pb-1 mb-2 mt-0" style={{ fontSize: '12pt' }}>
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
          <h2 className="uppercase font-bold border-b border-black pb-1 mb-2 mt-0" style={{ fontSize: '12pt' }}>
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

ResumeRenderer.displayName = 'ResumeRenderer';
