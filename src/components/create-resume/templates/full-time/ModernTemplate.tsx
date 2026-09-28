"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
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

export const ModernTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const compId = React.useId().replace(/:/g, '');
  const ACCENT = themeColor || '#2E8B57'; // Teal/Green accent
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

  const [paginationState, setPaginationState] = useState<{
    pages: any[] | null;
    resumeDataHash: string;
  }>({ pages: null, resumeDataHash: '' });
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const measRef = useRef<HTMLDivElement>(null);

  const dataHash = JSON.stringify({ resumeData, profileData, themeColor, fontFamily, sectionStyles });

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (!measRef.current) return;

    const measRect = measRef.current.getBoundingClientRect();
    const trueScale = measRect.width / 794;

    const getElementHeight = (id: string) => {
      const el = document.getElementById(`${id}-${compId}`);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const unscaledHeight = trueScale > 0 ? rect.height / trueScale : (el as HTMLElement).offsetHeight;
      const style = window.getComputedStyle(el);
      const mt = parseFloat(style.marginTop) || 0;
      const mb = parseFloat(style.marginBottom) || 0;
      return unscaledHeight + mt + mb;
    };

    const PAGE_HEIGHT = 1123;
    const PAGE_PADDING_TOP = 38;
    const PAGE_PADDING_BOTTOM = 32;
    const FOOTER_HEIGHT = getElementHeight('meas-footer') || 30;
    
    // Safety margin to prevent clipping
    const SAFETY_MARGIN = 24;
    const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - FOOTER_HEIGHT - SAFETY_MARGIN;

    let currentPages: any[] = [];
    let currentPage: any = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
    let remainingHeight = MAX_CONTENT_HEIGHT;

    // Page 1 header items
    const headerHeight = getElementHeight('meas-header');
    const summaryHeight = getElementHeight('meas-summary');
    const skillsHeight = getElementHeight('meas-skills');

    currentPage.header = true;
    currentPage.summary = true;
    currentPage.skills = true;
    remainingHeight -= (headerHeight + summaryHeight + skillsHeight);

    const expSectionHeadingHeight = getElementHeight('meas-exp-section-heading');
    let hasAddedExpSectionHeading = false;

    // Paginate Experiences
    const exps = resumeData.experience || [];
    for (let i = 0; i < exps.length; i++) {
        const exp = exps[i];
        const bullets = exp.bullets || [];
        
        let expHeaderH = getElementHeight(`meas-exp-${i}-header`);
        let needsSectionHeading = !hasAddedExpSectionHeading;
        let fullHeaderH = expHeaderH + (needsSectionHeading ? expSectionHeadingHeight : 0);

        if (remainingHeight < fullHeaderH && remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;
        }

        if (needsSectionHeading) {
            hasAddedExpSectionHeading = true;
            currentPage.hasExperienceHeading = true;
        }

        let currentExpObj: any = { ...exp, bullets: [], isContinued: false, isSplit: false };
        let currentExpHeaderH = fullHeaderH;

        for (let j = 0; j < bullets.length; j++) {
            const bulletH = getElementHeight(`meas-exp-${i}-bullet-${j}`);
            const requiredSpace = currentExpObj.bullets.length === 0 ? currentExpHeaderH + bulletH : bulletH;
            
            if (remainingHeight < requiredSpace) {
                if (currentExpObj.bullets.length > 0) {
                    currentPage.experiences.push({ ...currentExpObj, isSplit: true });
                    remainingHeight -= 8; // small gap
                }
                
                if (currentExpObj.bullets.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
                    currentPages.push(currentPage);
                    currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
                    remainingHeight = MAX_CONTENT_HEIGHT;
                    
                    const isActuallyContinued = currentExpObj.bullets.length > 0;
                    currentExpObj = { ...exp, bullets: [], isContinued: isActuallyContinued, isSplit: false };
                    currentExpHeaderH = getElementHeight(isActuallyContinued ? `meas-exp-${i}-header-continued` : `meas-exp-${i}-header`);
                }
            }
            
            if (currentExpObj.bullets.length === 0) {
                remainingHeight -= currentExpHeaderH;
            }
            
            remainingHeight -= bulletH;
            currentExpObj.bullets.push(bullets[j]);
        }

        if (currentExpObj.bullets.length > 0 || bullets.length === 0) {
            if (bullets.length === 0) {
                remainingHeight -= currentExpHeaderH;
            }
            currentPage.experiences.push(currentExpObj);
            remainingHeight -= 8; // bottom margin for experience block
        }
    }

    const eduHeight = getElementHeight('meas-education');
    if (eduHeight > 0) {
        if (remainingHeight < eduHeight && remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;
        }
        currentPage.hasEducation = true;
        remainingHeight -= eduHeight;
    }

    const certHeight = getElementHeight('meas-certifications');
    if (certHeight > 0) {
        if (remainingHeight < certHeight && remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;
        }
        currentPage.hasCertifications = true;
        remainingHeight -= certHeight;
    }

    currentPages.push(currentPage);

    setPaginationState({
      pages: currentPages,
      resumeDataHash: dataHash
    });

  }, [dataHash, fontsLoaded, compId]);

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

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '38px 48px 32px 48px',
    fontFamily: selectedFont,
    color: '#1a1a1a',
    fontSize: '10pt',
    lineHeight: '1.45'
  };

  const renderHeader = () => (
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
  );

  const renderSummary = () => {
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
  };

  const renderSkills = () => {
    if (!resumeData.skills || resumeData.skills.length === 0) return null;
    return (
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
    );
  };

  const renderEducation = () => {
    if (!resumeData.education || resumeData.education.length === 0) return null;
    return (
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
    );
  };

  const renderCertifications = () => {
    if (!resumeData.certifications || resumeData.certifications.length === 0) return null;
    return (
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
    );
  };

  const needsRender = !paginationState.pages || paginationState.resumeDataHash !== dataHash;

  return (
    <>
      <div ref={ref} className="text-black print:bg-white flex flex-col items-center">
        {needsRender ? (
          <div className={pageContainerClass} style={pageContainerStyle}>
             <div className="flex text-emerald-600 items-center justify-center h-full flex-col gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                <div className="animate-pulse font-semibold tracking-wide">Optimizing Layout...</div>
             </div>
          </div>
        ) : (
          paginationState.pages!.map((page, pIndex) => {
            const pageNumber = pIndex + 1;
            const totalPages = paginationState.pages!.length;
            const hasMultiplePages = totalPages > 1;

            return (
              <div key={pIndex} className={pageContainerClass} style={pageContainerStyle}>
                <div className="flex-1 overflow-hidden">
                  {page.header && renderHeader()}
                  {page.summary && renderSummary()}
                  {page.skills && renderSkills()}

                  {page.experiences.length > 0 && (
                    <div
                      onClick={() => onSelectSection?.('experience')}
                      className={getSectionWrapperClass('experience')}
                      style={getSectionStyle('experience')}
                    >
                      <div className="mb-2">
                        {(page.hasExperienceHeading || (pIndex === 0 && !page.header)) && (
                          <SectionHeader title={pIndex === 0 ? "Professional Experience" : "Professional Experience (Continued)"} sectionKey="experience" />
                        )}
                        {page.experiences.map((exp: any, i: number) => (
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

                  {page.hasEducation && renderEducation()}
                  {page.hasCertifications && renderCertifications()}
                </div>

                {hasMultiplePages && (
                  <div className="pt-2 flex justify-between items-center text-[9pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
                    <span>{profileData.full_name || 'Candidate'} — Modern Resume</span>
                    <span>Page {pageNumber} of {totalPages}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MEASUREMENT DOM (HIDDEN) */}
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none select-none z-[-9999] top-0 left-0 w-[794px]" ref={measRef}>
        <div style={pageContainerStyle}>
           <div id={`meas-header-${compId}`}>{renderHeader()}</div>
           <div id={`meas-summary-${compId}`}>{renderSummary()}</div>
           <div id={`meas-skills-${compId}`}>{renderSkills()}</div>
           <div id={`meas-exp-section-heading-${compId}`}><SectionHeader title="Professional Experience" /></div>
           
           {resumeData.experience?.map((exp, i) => (
              <div key={i}>
                <div id={`meas-exp-${i}-header-${compId}`}>
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
                </div>
                <div id={`meas-exp-${i}-header-continued-${compId}`}>
                    <div className="flex justify-between items-start leading-tight" style={{ fontSize: '11pt' }}>
                      <div className="font-bold text-black">{exp.role} <span className="italic font-normal text-slate-500 text-[9.5pt]">(Continued)</span></div>
                      <div className="font-bold text-black whitespace-nowrap ml-4">{exp.duration}</div>
                    </div>
                    <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
                      <div className="font-semibold text-slate-700">{exp.company}</div>
                    </div>
                </div>
                {exp.bullets?.map((b: string, j: number) => (
                   <ul key={j} className="list-disc pl-5 space-y-1.5 mt-1 m-0" style={{ fontSize: '9.5pt' }}>
                     <li id={`meas-exp-${i}-bullet-${j}-${compId}`} className="pl-1 leading-snug text-justify">
                       {renderWithBold(b)}
                     </li>
                   </ul>
                ))}
              </div>
           ))}

           <div id={`meas-education-${compId}`}>{renderEducation()}</div>
           <div id={`meas-certifications-${compId}`}>{renderCertifications()}</div>
           <div id={`meas-footer-${compId}`}>
             <div className="pt-2 flex justify-between items-center text-[9pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
                <span>{profileData.full_name || 'Candidate'} — Modern Resume</span>
                <span>Page 1 of 2</span>
             </div>
           </div>
        </div>
      </div>
    </>
  );
});

ModernTemplate.displayName = 'ModernTemplate';
