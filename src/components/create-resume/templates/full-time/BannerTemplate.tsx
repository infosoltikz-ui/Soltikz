"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ResumeTemplateProps, getSummaryArray } from '../types';

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

const BannerTemplateComponent = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const BANNER = themeColor || '#96847c';
  const selectedFont = fontFamily || 'Georgia, "Times New Roman", Times, serif';

  const [paginationState, setPaginationState] = useState<{
    pages: any[] | null;
    resumeDataHash: string;
  }>({ pages: null, resumeDataHash: '' });
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const measRef = useRef<HTMLDivElement>(null);

  // Use a stringified hash to detect when we need to re-measure
  const dataHash = JSON.stringify({ resumeData, profileData, themeColor, fontFamily, sectionStyles });

  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (paginationState.resumeDataHash === dataHash && paginationState.pages !== null && fontsLoaded) {
      return;
    }

    let scale = 1;
    if (measRef.current) {
      const rect = measRef.current.getBoundingClientRect();
      const offsetW = measRef.current.offsetWidth;
      if (offsetW > 0) {
        scale = rect.width / offsetW;
      }
    }

    const getElementHeight = (id: string) => {
      const el = measRef.current?.querySelector(`#${id}`);
      if (!el) return 0;
      
      const rect = el.getBoundingClientRect();
      const unscaledHeight = scale > 0 ? rect.height / scale : (el as HTMLElement).offsetHeight;
      
      const style = window.getComputedStyle(el);
      const mt = parseFloat(style.marginTop) || 0;
      const mb = parseFloat(style.marginBottom) || 0;
      return unscaledHeight + mt + mb;
    };

    const PAGE_HEIGHT = 1123;
    const PAGE_PADDING_TOP = 38;
    const PAGE_PADDING_BOTTOM = 32;
    const FOOTER_HEIGHT = getElementHeight('meas-footer') || 30;
    
    // Safety margin ensures we don't clip text due to sub-pixel rendering differences
    const SAFETY_MARGIN = 15;
    const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - FOOTER_HEIGHT - SAFETY_MARGIN;

    let currentPages: any[] = [];
    let currentPage: any = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
    let remainingHeight = MAX_CONTENT_HEIGHT;

    // PAGE 1 Items
    const headerHeight = getElementHeight('meas-header');
    const summaryHeight = getElementHeight('meas-summary');
    const skillsHeight = getElementHeight('meas-skills');

    currentPage.header = true;
    currentPage.summary = true;
    currentPage.skills = true;
    remainingHeight -= (headerHeight + summaryHeight + skillsHeight);

    const expSectionHeadingHeight = getElementHeight('meas-exp-section-heading') + 12; // +12 for collapsed mt-3
    let hasAddedExpSectionHeading = false;

    // 1. Paginate Experiences
    const exps = resumeData.experience || [];
    for (let i = 0; i < exps.length; i++) {
        const exp = exps[i];
        const bullets = exp.bullets || [];
        
        let expHeaderH = getElementHeight(`meas-exp-${i}-header`) + 4; // +4 for ul mt-1
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
            
            if (remainingHeight < currentExpHeaderH + bulletH) {
                if (currentExpObj.bullets.length > 0) {
                    currentPage.experiences.push({ ...currentExpObj, isSplit: true });
                    remainingHeight -= 12; // mb-3 gap between experiences
                }
                
                if (currentExpObj.bullets.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
                    currentPages.push(currentPage);
                    currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
                    remainingHeight = MAX_CONTENT_HEIGHT;
                    
                    const isActuallyContinued = currentExpObj.bullets.length > 0;
                    currentExpObj = { ...exp, bullets: [], isContinued: isActuallyContinued, isSplit: false };
                    currentExpHeaderH = getElementHeight(isActuallyContinued ? `meas-exp-${i}-header-continued` : `meas-exp-${i}-header`) + 4;
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
            remainingHeight -= 12; // mb-3 gap
        }
    }

    // 2. Paginate Education
    if (resumeData.education && resumeData.education.length > 0) {
        const eduH = getElementHeight('meas-education');
        if (remainingHeight < eduH && remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;
        }
        currentPage.hasEducation = true;
        remainingHeight -= eduH;
    }

    // 3. Paginate Certifications
    if (resumeData.certifications && resumeData.certifications.length > 0) {
        const certH = getElementHeight('meas-certifications');
        if (remainingHeight < certH && remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], hasEducation: false, hasCertifications: false, hasExperienceHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;
        }
        currentPage.hasCertifications = true;
        remainingHeight -= certH;
    }

    currentPages.push(currentPage);
    setPaginationState({ pages: currentPages, resumeDataHash: dataHash });

  }, [dataHash, resumeData, profileData, fontsLoaded]);

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
    const headerColor = sectionStyles?.[sectionKey || '']?.color || BANNER;
    return (
      <h2
        className="mb-1.5 mt-3 pb-0.5 border-b border-slate-200 break-inside-avoid"
        style={{ fontSize: '11.5pt', color: headerColor, fontFamily: selectedFont, fontWeight: 600 }}
      >
        {title}
      </h2>
    );
  };

  const measurementDOM = (
    <div
      ref={measRef}
      className="bg-white absolute pointer-events-none"
      style={{
        width: '794px',
        visibility: 'hidden',
        left: '-100000px',
        top: 0,
        boxSizing: 'border-box',
        padding: '38px 48px 32px 48px',
        border: '1px solid transparent',
        fontFamily: selectedFont,
        color: '#2b2b2b',
        fontSize: '10.5pt',
        lineHeight: '1.5'
      }}
    >
      <div id="meas-header"
        style={{
          backgroundColor: sectionStyles?.header?.color || BANNER,
          margin: '-38px -48px 20px -48px',
          padding: '36px 48px 20px 48px'
        }}
      >
        <div style={getSectionStyle('header')}>
          <h1 className="uppercase tracking-widest mb-1.5 text-center" style={{ fontSize: '24pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
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
          {profileData.linkedin && (
            <div className="flex justify-center" style={{ fontSize: '9pt', color: '#f8f8f8', fontWeight: 500 }}>
              <span className="mr-1">WWW:</span> <span>{profileData.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {getSummaryArray(resumeData.summary).length > 0 && (
        <div id="meas-summary" className={getSectionWrapperClass('summary')} style={getSectionStyle('summary')}>
          <div className="mb-3">
            <SectionHeader title="Professional Summary" sectionKey="summary" />
            <p className="text-justify leading-snug m-0" style={{ fontSize: '9.5pt' }}>
              {parseBoldText(getSummaryArray(resumeData.summary).join(' '))}
            </p>
          </div>
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div id="meas-skills" className={getSectionWrapperClass('skills')} style={getSectionStyle('skills')}>
          <div className="mb-3">
            <SectionHeader title="Skills" sectionKey="skills" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1" style={{ fontSize: '9.5pt' }}>
              {resumeData.skills.map((skillGroup: any, i: number) => (
                <ul key={i} className="list-disc pl-4 m-0 space-y-1">
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

      <div id="meas-exp-section-heading" className="mb-2">
        <SectionHeader title="Professional Experience" sectionKey="experience" />
      </div>

      {resumeData.experience?.map((exp: any, i: number) => (
        <div key={`exp-meas-${i}`}>
          <div id={`meas-exp-${i}-header`}>
            <div className="flex items-center leading-tight mb-1" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
              <span className="uppercase">{exp.role}</span>
              <span className="mx-1.5 text-gray-400 font-normal">|</span>
              <span>{exp.duration}</span>
            </div>
            <div className="leading-tight mb-1 font-semibold text-slate-700" style={{ fontSize: '9.5pt' }}>
              {exp.company}
            </div>
            {exp.environment && exp.environment.length > 0 && (
              <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                <span className="font-bold italic text-black">Environment: </span>
                {exp.environment.join(', ')}
              </div>
            )}
          </div>

          <div id={`meas-exp-${i}-header-continued`}>
            <div className="flex items-center leading-tight mb-1" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
              <span className="uppercase">{exp.role}</span>
              <span className="italic font-normal text-slate-500 text-[9pt] ml-1">(Continued)</span>
              <span className="mx-1.5 text-gray-400 font-normal">|</span>
              <span>{exp.duration}</span>
            </div>
            <div className="leading-tight mb-1 font-semibold text-slate-700" style={{ fontSize: '9.5pt' }}>
              {exp.company}
            </div>
          </div>

          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 mt-1 m-0 text-[9.5pt]" style={{ lineHeight: '1.4' }}>
              {exp.bullets.map((b: string, j: number) => (
                <li id={`meas-exp-${i}-bullet-${j}`} key={`bullet-meas-${j}`} className="pl-1 leading-snug text-justify">
                  {parseBoldText(b)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {resumeData.education && resumeData.education.length > 0 && (
        <div id="meas-education" className={getSectionWrapperClass('education')} style={getSectionStyle('education')}>
          <div className="mb-3">
            <SectionHeader title="Education" sectionKey="education" />
            <div className="space-y-1.5 text-[9.5pt]">
              {resumeData.education.map((edu: any, i: number) => (
                <div key={`edu-meas-${i}`} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-800 text-[10pt]">{edu.degree}</div>
                    <div className="text-slate-600 font-medium text-[9.5pt]">{edu.institution}</div>
                  </div>
                  <div className="font-semibold whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div id="meas-certifications" className={getSectionWrapperClass('certifications')} style={getSectionStyle('certifications')}>
          <div className="mb-3">
            <SectionHeader title="Certifications" sectionKey="certifications" />
            <ul className="list-disc pl-5 m-0 space-y-1 text-[9.5pt]">
              {resumeData.certifications.map((cert: any, i: number) => (
                <li key={`cert-meas-${i}`} className="pl-1 leading-relaxed">
                  <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div id="meas-footer" className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto shrink-0">
        <span>{profileData.full_name || 'Candidate'} — Professional Banner</span>
        <span>Page 1 of 2</span>
      </div>
    </div>
  );

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '38px 48px 32px 48px',
    fontFamily: selectedFont,
    color: '#2b2b2b',
    fontSize: '10.5pt',
    lineHeight: '1.5'
  };

  const pages = paginationState.pages || [];

  return (
    <div ref={ref} className="text-black print:bg-white flex flex-col items-center">
      {measurementDOM}

      {pages.length === 0 && (
         <div className={pageContainerClass} style={pageContainerStyle}>
            <div className="flex-1 flex items-center justify-center text-slate-400">
               Calculating layout...
            </div>
         </div>
      )}

      {pages.map((page, pIndex) => {
        const pageNumber = pIndex + 1;
        const isPage1 = pIndex === 0;

        return (
          <div key={pIndex} className={pageContainerClass} style={pageContainerStyle}>
            <div className="flex-1">
              {/* Colored Banner Header */}
              {isPage1 && (
                <div
                  onClick={() => onSelectSection?.('header')}
                  className={`cursor-pointer ${activeSectionKey === 'header' ? 'ring-2 ring-emerald-400' : ''}`}
                  style={{
                    backgroundColor: sectionStyles?.header?.color || BANNER,
                    margin: '-38px -48px 20px -48px',
                    padding: '36px 48px 20px 48px'
                  }}
                >
                  <div style={getSectionStyle('header')}>
                    <h1 className="uppercase tracking-widest mb-1.5 text-center" style={{ fontSize: '24pt', color: '#ffffff', fontWeight: 700, fontFamily: selectedFont }}>
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

                    {profileData.linkedin && (
                      <div className="flex justify-center" style={{ fontSize: '9pt', color: '#f8f8f8', fontWeight: 500 }}>
                        <span className="mr-1">WWW:</span> <span>{profileData.linkedin}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personal Summary */}
              {page.summary && getSummaryArray(resumeData.summary).length > 0 && (
                <div
                  onClick={() => onSelectSection?.('summary')}
                  className={getSectionWrapperClass('summary')}
                  style={getSectionStyle('summary')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Professional Summary" sectionKey="summary" />
                    <p className="text-justify leading-snug m-0" style={{ fontSize: '9.5pt' }}>
                      {parseBoldText(getSummaryArray(resumeData.summary).join(' '))}
                    </p>
                  </div>
                </div>
              )}

              {/* Skills */}
              {page.skills && resumeData.skills && resumeData.skills.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('skills')}
                  className={getSectionWrapperClass('skills')}
                  style={getSectionStyle('skills')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Skills" sectionKey="skills" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1" style={{ fontSize: '9.5pt' }}>
                      {resumeData.skills.map((skillGroup: any, i: number) => (
                        <ul key={i} className="list-disc pl-4 m-0 space-y-1">
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

              {/* Experiences */}
              {page.experiences.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('experience')}
                  className={getSectionWrapperClass('experience')}
                  style={getSectionStyle('experience')}
                >
                  {page.hasExperienceHeading && (
                    <div className="mb-2">
                      <SectionHeader title="Professional Experience" sectionKey="experience" />
                    </div>
                  )}
                  <div>
                    {page.experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-3">
                        <div className="flex items-center leading-tight mb-1" style={{ fontSize: '10.5pt', fontWeight: 700 }}>
                          <span className="uppercase">{exp.role}</span>
                          {exp.isContinued && <span className="italic font-normal text-slate-500 text-[9pt] ml-1">(Continued)</span>}
                          <span className="mx-1.5 text-gray-400 font-normal">|</span>
                          <span>{exp.duration}</span>
                        </div>

                        <div className="leading-tight mb-1 font-semibold text-slate-700" style={{ fontSize: '9.5pt' }}>
                          {exp.company}
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '8.5pt' }}>
                            <span className="font-bold italic text-black">Environment: </span>
                            {exp.environment.join(', ')}
                          </div>
                        )}

                        {exp.bullets.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1 mt-1 m-0 text-[9.5pt]" style={{ lineHeight: '1.4' }}>
                            {exp.bullets.map((bullet: string, j: number) => (
                              <li key={j} className="pl-1 leading-snug text-justify">
                                {parseBoldText(bullet)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {page.hasEducation && resumeData.education && resumeData.education.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('education')}
                  className={getSectionWrapperClass('education')}
                  style={getSectionStyle('education')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Education" sectionKey="education" />
                    <div className="space-y-1.5 text-[9.5pt]">
                      {resumeData.education.map((edu: any, i: number) => (
                        <div key={i} className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-slate-800 text-[10pt]">{edu.degree}</div>
                            <div className="text-slate-600 font-medium text-[9.5pt]">{edu.institution}</div>
                          </div>
                          <div className="font-semibold whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications */}
              {page.hasCertifications && resumeData.certifications && resumeData.certifications.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('certifications')}
                  className={getSectionWrapperClass('certifications')}
                  style={getSectionStyle('certifications')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Certifications" sectionKey="certifications" />
                    <ul className="list-disc pl-5 m-0 space-y-1 text-[9.5pt]">
                      {resumeData.certifications.map((cert: any, i: number) => (
                        <li key={i} className="pl-1 leading-relaxed">
                          <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {(pages.length > 1 || page.hasEducation || page.hasCertifications) && (
              <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
                <span>{profileData.full_name || 'Candidate'} — Professional Banner</span>
                <span>Page {pageNumber} of {pages.length}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export const BannerTemplate = BannerTemplateComponent;
BannerTemplate.displayName = 'BannerTemplate';

