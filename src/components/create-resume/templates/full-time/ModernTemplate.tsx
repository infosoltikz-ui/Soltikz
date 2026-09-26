"use client";
import React from 'react';
import { ResumeTemplateProps, getSummaryArray } from '../types';

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

// Custom pagination calculator specifically tailored for Modern Accent Template
function splitModernTemplateExperiences(
  experiences: any[] | undefined,
  summary?: any,
  skills?: any[]
) {
  const expList = experiences || [];
  if (expList.length === 0) {
    return { pages: [[]] };
  }

  // Printable height per page = 1123px - 38px (pt) - 32px (pb) = 1053px. 
  // We use 1050px to maximize usage while keeping a tiny 3px buffer.
  const TOTAL_P1_CANVAS = 1050;
  const TOTAL_P2_CANVAS = 1050;

  // Header: Name (30) + Contact (17) + margins (16) = 63px
  const headerHeight = 63;

  // Summary height: Section header (48px) + mb-3 (12px) + paragraph lines (~18.5px per 115 chars)
  const summaryArray = getSummaryArray(summary);
  const summaryText = summaryArray.join(' ');
  const summaryLines = summaryText ? Math.ceil(summaryText.length / 115) : 0;
  const summaryHeight = summaryText ? 60 + (summaryLines * 18.5) : 0;

  // Technical Skills height (2-Column Grid): Section header (48) + mb-3 (12) + rows (~20px per row)
  const skillsCount = skills?.length || 0;
  const skillRows = Math.ceil(skillsCount / 2);
  const skillsHeight = skillsCount > 0 ? 60 + (skillRows * 20) : 0;

  // Remaining space on Page 1 for Experience section (subtract 56px for section header + mb-2)
  const availableExpP1 = Math.max(150, TOTAL_P1_CANVAS - (headerHeight + summaryHeight + skillsHeight) - 56);

  const pages: any[][] = [];
  let pageIdx = 0;
  pages[0] = [];
  let currentCanvasRemaining = availableExpP1;

  for (let i = 0; i < expList.length; i++) {
    let exp = expList[i];
    // Role (18.3) + Company (17.5) + margins (16.2) = ~52px
    // Environment (17.4) + mb-1.5 (6) = +23.4px (~75px)
    let roleHeaderHeight = exp.environment && exp.environment.length > 0 ? 75 : 52;

    const bullets: string[] = exp.bullets || [];
    // Estimate bullet height in ModernTemplate (9.5pt font, leading-snug, ~120 chars per line safely)
    const bulletHeights = bullets.map(b => {
      const charCount = b.length;
      const lines = Math.max(1, Math.ceil(charCount / 120));
      return (lines * 17.5) + 6; // 17.5px per line + 6px space-y-1.5
    });

    let currentExpBullets = [...bullets];
    let currentBulletHeights = [...bulletHeights];

    while (currentExpBullets.length > 0) {
      const totalBulletsH = currentBulletHeights.reduce((sum, h) => sum + h, 0);
      const totalH = roleHeaderHeight + totalBulletsH;

      if (totalH <= currentCanvasRemaining) {
        // Fits completely on current page
        pages[pageIdx].push({
          ...exp,
          bullets: currentExpBullets
        });
        currentCanvasRemaining -= totalH;
        break;
      } else {
        // Space available for bullets on current page
        const spaceForB = currentCanvasRemaining - roleHeaderHeight;

        // Require at least 40px space to show at least 1-2 bullets before splitting
        if (spaceForB >= 40) {
          let fitCount = 0;
          let accH = 0;
          for (let bIdx = 0; bIdx < currentBulletHeights.length; bIdx++) {
            if (accH + currentBulletHeights[bIdx] <= spaceForB) {
              accH += currentBulletHeights[bIdx];
              fitCount++;
            } else {
              break;
            }
          }

          if (fitCount >= 1 && fitCount < currentExpBullets.length) {
            pages[pageIdx].push({
              ...exp,
              bullets: currentExpBullets.slice(0, fitCount),
              isSplit: true
            });

            // Prepare remaining bullets for next page
            exp = {
              ...exp,
              isContinued: true
            };
            currentExpBullets = currentExpBullets.slice(fitCount);
            currentBulletHeights = currentBulletHeights.slice(fitCount);
            // Height for continued header (Role + Company + margins)
            roleHeaderHeight = 52; 

            pageIdx++;
            pages[pageIdx] = [];
            // Next page has SectionHeader + space-y-3 -> ~60px overhead
            currentCanvasRemaining = TOTAL_P2_CANVAS - 60;
          } else {
            pageIdx++;
            pages[pageIdx] = [];
            currentCanvasRemaining = TOTAL_P2_CANVAS - 60;
          }
        } else {
          pageIdx++;
          pages[pageIdx] = [];
          currentCanvasRemaining = TOTAL_P2_CANVAS - 60;
        }
      }
    }
  }

  // Account for Education/Certifications on the last page.
  // We conservatively deduct ~150px on the last page to ensure they fit,
  // or push to a new page if the last page is nearly full.
  const hasEduOrCerts = (skills && skills.length > 0) || (summary && summary.length > 0);
  if (currentCanvasRemaining < 160) {
     // If less than 160px left, the Education/Certs section might cut off.
     pageIdx++;
     pages[pageIdx] = [];
  }

  return { pages };
}

export const ModernTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const ACCENT = themeColor || '#2E8B57'; // Teal/Green accent
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  const getSectionStyle = (key: string, baseStyle: React.CSSProperties = {}): React.CSSProperties => {
    const custom = sectionStyles?.[key];
    if (!custom) return baseStyle;
    return {
      ...baseStyle,
      ...(custom.fontFamily ? { fontFamily: custom.fontFamily } : {}),
      ...(custom.fontSize ? { fontSize: custom.fontSize } : {}),
      ...(custom.color ? { color: custom.color } : {}),
      ...(custom.fontWeight ? { fontWeight: custom.fontWeight as any } : {}),
      ...(custom.fontStyle ? { fontStyle: custom.fontStyle as any } : {}),
      ...(custom.textDecoration ? { textDecoration: custom.textDecoration } : {}),
      ...(custom.textTransform ? { textTransform: custom.textTransform as any } : {}),
      ...(custom.textAlign ? { textAlign: custom.textAlign as any } : {}),
      ...(custom.lineHeight ? { lineHeight: custom.lineHeight } : {}),
    };
  };

  const getSectionWrapperClass = (key: string) => {
    const isInteractive = Boolean(onSelectSection);
    const isActive = activeSectionKey === key;
    if (!isInteractive) return '';
    return `group/sec relative transition-all rounded-lg p-1.5 -m-1.5 cursor-pointer ${isActive
      ? 'ring-2 ring-emerald-500 bg-emerald-50/25 shadow-xs'
      : 'hover:ring-1 hover:ring-emerald-400/60 hover:bg-slate-50/50'
      }`;
  };

  const SectionHeader = ({ title, sectionKey }: { title: string; sectionKey?: string }) => {
    const headerColor = sectionStyles?.[sectionKey || '']?.color || ACCENT;
    return (
      <div className="mb-2.5 mt-3 break-inside-avoid">
        <div className="border-t border-slate-300 w-full" />
        <h2 className="uppercase font-bold text-center py-1 m-0 tracking-wider" style={{ fontSize: '12pt', color: headerColor }}>
          {title}
        </h2>
        <div className="border-t border-slate-300 w-full" />
      </div>
    );
  };

  const { pages } = splitModernTemplateExperiences(
    resumeData.experience,
    resumeData.summary,
    resumeData.skills
  );

  const totalPages = pages.length;
  const page1Experiences = pages[0] || [];
  const subsequentPages = pages.slice(1);
  const hasMultiplePages = totalPages > 1;

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '38px 48px 32px 48px',
    fontFamily: selectedFont,
    color: '#1a1a1a',
    fontSize: '10pt',
    lineHeight: '1.45'
  };

  return (
    <div ref={ref} className="text-black print:bg-white flex flex-col items-center">
      {/* ─── PAGE 1 ─── */}
      <div className={pageContainerClass} style={pageContainerStyle}>
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div
            onClick={() => onSelectSection?.('header')}
            className={getSectionWrapperClass('header')}
            style={getSectionStyle('header')}
          >
            <div className="mb-3 text-center break-inside-avoid">
              <h1 className="font-bold uppercase mb-1 tracking-tight" style={{ fontSize: '22pt', color: sectionStyles?.header?.color || ACCENT }}>
                {profileData.full_name || 'JOHN DOE'}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-1" style={{ fontSize: '9.5pt' }}>
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
          </div>

          {/* Professional Summary */}
          {(() => {
            const summaryList = getSummaryArray(resumeData.summary);
            if (!summaryList || summaryList.length === 0) return null;
            const paragraphText = summaryList.join(' ');
            return (
              <div
                onClick={() => onSelectSection?.('summary')}
                className={getSectionWrapperClass('summary')}
                style={getSectionStyle('summary')}
              >
                <div className="mb-3">
                  <SectionHeader title="Summary" sectionKey="summary" />
                  <p className="text-justify leading-snug m-0" style={{ fontSize: '10pt' }}>
                    {renderWithBold(paragraphText)}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div
              onClick={() => onSelectSection?.('skills')}
              className={getSectionWrapperClass('skills')}
              style={getSectionStyle('skills')}
            >
              <div className="mb-3">
                <SectionHeader title="Technical Skills" sectionKey="skills" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-1" style={{ fontSize: '9.5pt' }}>
                  {resumeData.skills.map((skillGroup, i) => (
                    <ul key={i} className="list-disc pl-5 m-0 space-y-0.5">
                      <li className="leading-snug">
                        <span className="font-bold">{skillGroup.category}: </span>
                        <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Experience (Page 1) */}
          {page1Experiences.length > 0 && (
            <div
              onClick={() => onSelectSection?.('experience')}
              className={getSectionWrapperClass('experience')}
              style={getSectionStyle('experience')}
            >
              <div className="mb-2">
                <SectionHeader title="Professional Experience" sectionKey="experience" />
                {page1Experiences.map((exp, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between items-start leading-tight" style={{ fontSize: '11pt' }}>
                      <div className="font-bold text-black">{exp.role}</div>
                      <div className="font-bold text-black whitespace-nowrap ml-4">{exp.duration}</div>
                    </div>
                    <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
                      <div className="font-semibold text-slate-700">{exp.company}</div>
                    </div>

                    {exp.environment && exp.environment.length > 0 && (
                      <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '9.5pt' }}>
                        <span className="font-bold text-black">Environment: </span>
                        {exp.environment.join(', ')}
                      </div>
                    )}

                    <ul className="list-disc pl-5 space-y-1.5 mt-1 m-0" style={{ fontSize: '9.5pt' }}>
                      {exp.bullets.map((bullet: string, j: number) => (
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
        </div>

        {/* Page 1 Footer */}
        {hasMultiplePages && (
          <div className="pt-2 flex justify-between items-center text-[9pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
            <span>{profileData.full_name || 'Candidate'} — Modern Resume</span>
            <span>Page 1 of {totalPages}</span>
          </div>
        )}
      </div>

      {/* ─── PAGE 2, PAGE 3, ETC. ─── */}
      {subsequentPages.map((pageExps, pIndex) => {
        const pageNumber = pIndex + 2;
        const isLastPage = pageNumber === totalPages;

        return (
          <div key={pIndex} className={pageContainerClass} style={pageContainerStyle}>
            <div className="flex-1 overflow-hidden">
              {/* Experiences on this page */}
              {pageExps.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('experience')}
                  className={getSectionWrapperClass('experience')}
                  style={getSectionStyle('experience')}
                >
                  <div className="mb-3 space-y-3">
                    <SectionHeader title="Professional Experience (Continued)" sectionKey="experience" />
                    {pageExps.map((exp, i) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between items-start leading-tight" style={{ fontSize: '11pt' }}>
                          <div className="font-bold text-black">
                            {exp.role} {exp.isContinued && <span className="italic font-normal text-slate-500 text-[9.5pt]">(Continued)</span>}
                          </div>
                          <div className="font-bold text-black whitespace-nowrap ml-4">{exp.duration}</div>
                        </div>
                        <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
                          <div className="font-semibold text-slate-700">{exp.company}</div>
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '9.5pt' }}>
                            <span className="font-bold text-black">Environment: </span>
                            {exp.environment.join(', ')}
                          </div>
                        )}

                        <ul className="list-disc pl-5 space-y-1.5 mt-1 m-0" style={{ fontSize: '9.5pt' }}>
                          {exp.bullets.map((bullet: string, j: number) => (
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

              {/* Render Education and Certifications on the Last Page */}
              {isLastPage && (
                <>
                  {/* Education */}
                  {resumeData.education && resumeData.education.length > 0 && (
                    <div
                      onClick={() => onSelectSection?.('education')}
                      className={getSectionWrapperClass('education')}
                      style={getSectionStyle('education')}
                    >
                      <div className="mb-3">
                        <SectionHeader title="Education and Training" sectionKey="education" />
                        <div className="space-y-1.5" style={{ fontSize: '9.5pt' }}>
                          {resumeData.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-start">
                              <div>
                                <div className="font-bold text-[10pt]">{edu.degree}</div>
                                <div className="text-slate-600 text-[9.5pt]">{edu.institution}</div>
                              </div>
                              <div className="font-bold whitespace-nowrap ml-4 text-[9.5pt]">{edu.year}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {resumeData.certifications && resumeData.certifications.length > 0 && (
                    <div
                      onClick={() => onSelectSection?.('certifications')}
                      className={getSectionWrapperClass('certifications')}
                      style={getSectionStyle('certifications')}
                    >
                      <div className="mb-3">
                        <SectionHeader title="Certifications" sectionKey="certifications" />
                        <ul className="list-disc pl-5 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
                          {resumeData.certifications.map((cert, i) => (
                            <li key={i} className="pl-1 leading-snug">
                              <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Page N Footer */}
            <div className="pt-2 flex justify-between items-center text-[9pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
              <span>{profileData.full_name || 'Candidate'} — Modern Resume</span>
              <span>Page {pageNumber} of {totalPages}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

