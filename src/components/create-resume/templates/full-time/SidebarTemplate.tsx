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

const SidebarTemplateComponent = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const compId = React.useId().replace(/:/g, '');
  const ACCENT = themeColor || '#4a0e0e';
  const TOP_BAR_COLOR = '#F5C05E';
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
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
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
    const PAGE_PADDING_TOP = 32;
    const PAGE_PADDING_BOTTOM = 24;
    const FOOTER_HEIGHT = getElementHeight('meas-footer') || 30;

    const SAFETY_MARGIN = 24;
    const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - FOOTER_HEIGHT - SAFETY_MARGIN;

    let currentPages: any[] = [];
    let currentPage: any = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
    let remainingHeight = MAX_CONTENT_HEIGHT;

    // PAGE 1 Items
    const topBarHeight = getElementHeight('meas-top-bar'); // Negative or small
    const headerHeight = getElementHeight('meas-header');
    const summaryHeight = getElementHeight('meas-summary');
    const skillsHeight = getElementHeight('meas-skills');

    currentPage.header = true;
    currentPage.summary = true;
    currentPage.skills = true;
    remainingHeight -= (topBarHeight + headerHeight + summaryHeight + skillsHeight);

    const expSectionHeadingHeight = getElementHeight('meas-exp-section-heading') + 24;
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

        const requiredSpace = currentExpObj.bullets.length === 0 ? currentExpHeaderH + bulletH : bulletH;

        if (remainingHeight < requiredSpace) {
          if (currentExpObj.bullets.length > 0) {
            currentPage.experiences.push({ ...currentExpObj, isSplit: true });
            remainingHeight -= 8; // mb-2 gap
          }

          if (currentExpObj.bullets.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
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
        remainingHeight -= 8; // mb-2 gap
      }
    }

    // 2. Paginate Education
    const edus = resumeData.education || [];
    if (edus.length > 0) {
      let eduHeadingH = getElementHeight('meas-education-heading') + 12; // 12px for wrapper margins
      let hasAddedEduHeading = false;

      for (let i = 0; i < edus.length; i++) {
        const eduItemH = getElementHeight(`meas-edu-${i}`);
        
        let requiredSpace = eduItemH;
        if (!hasAddedEduHeading) {
            requiredSpace += eduHeadingH;
        }

        if (remainingHeight < requiredSpace) {
            if (currentPage.education.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
                currentPages.push(currentPage);
                currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
                remainingHeight = MAX_CONTENT_HEIGHT;
            }
        }

        if (!hasAddedEduHeading) {
            hasAddedEduHeading = true;
            currentPage.hasEducationHeading = true;
            remainingHeight -= eduHeadingH;
        }

        currentPage.education.push(edus[i]);
        remainingHeight -= eduItemH;
      }
    }

    // 3. Paginate Certifications
    const certs = resumeData.certifications || [];
    if (certs.length > 0) {
      let certHeadingH = getElementHeight('meas-certifications-heading') + 12; // 12px for wrapper margins
      let hasAddedCertHeading = false;

      for (let i = 0; i < certs.length; i++) {
        const certItemH = getElementHeight(`meas-cert-${i}`);
        
        let requiredSpace = certItemH;
        if (!hasAddedCertHeading) {
            requiredSpace += certHeadingH;
        }

        if (remainingHeight < requiredSpace) {
            if (currentPage.certifications.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
                currentPages.push(currentPage);
                currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
                remainingHeight = MAX_CONTENT_HEIGHT;
            }
        }

        if (!hasAddedCertHeading) {
            hasAddedCertHeading = true;
            currentPage.hasCertificationsHeading = true;
            remainingHeight -= certHeadingH;
        }

        currentPage.certifications.push(certs[i]);
        remainingHeight -= certItemH;
      }
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

  const renderName = () => {
    const nameStr = profileData.full_name || 'JOHN DOE';
    const parts = nameStr.trim().split(' ');
    const headerAccent = sectionStyles?.header?.color || ACCENT;
    if (parts.length === 1) {
      return <span style={{ color: headerAccent }}>{parts[0]}</span>;
    }
    const firstName = parts[0];
    const restName = parts.slice(1).join(' ');
    return (
      <>
        <span className="text-slate-600">{firstName}</span>{' '}
        <span style={{ color: headerAccent }}>{restName}</span>
      </>
    );
  };

  const SectionHeader = ({ title, sectionKey }: { title: string; sectionKey?: string }) => {
    const headerColor = sectionStyles?.[sectionKey || '']?.color || ACCENT;
    return (
      <h2
        className="font-bold pb-1 mb-3 mt-4 border-b border-slate-300 w-full break-inside-avoid tracking-wide"
        style={{ fontSize: '12pt', color: headerColor }}
      >
        {title}
      </h2>
    );
  };

  const measurementDOM = (
    <div
      ref={measRef}
      className="bg-white absolute pointer-events-none flex flex-col"
      style={{
        width: '794px',
        visibility: 'hidden',
        left: '-100000px',
        top: 0,
        boxSizing: 'border-box',
        padding: '32px 48px 24px 48px',
        border: '1px solid transparent',
        fontFamily: selectedFont,
        color: '#000000',
        fontSize: '11.5pt',
        lineHeight: '1.5'
      }}
    >
      <div id={`meas-top-bar-${compId}`}
        style={{
          backgroundColor: TOP_BAR_COLOR,
          height: '14px',
          margin: '-38px -48px 20px -48px',
          width: 'calc(100% + 96px)'
        }}
      />

      <div id={`meas-header-${compId}`} className="mb-3.5 text-center break-inside-avoid">
        <h1 className="uppercase tracking-wider mb-1" style={{ fontSize: '24pt', fontWeight: 700 }}>
          {renderName()}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: '10pt' }}>
          {profileData.location && <span>{profileData.location}</span>}
          {profileData.phone && (
            <>
              {profileData.location && <span className="text-slate-400">|</span>}
              <span>{profileData.phone}</span>
            </>
          )}
          {profileData.email && (
            <>
              {(profileData.location || profileData.phone) && <span className="text-slate-400">|</span>}
              <span>{profileData.email}</span>
            </>
          )}
          {profileData.linkedin && (
            <>
              {(profileData.location || profileData.phone || profileData.email) && <span className="text-slate-400">|</span>}
              <span>{profileData.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {getSummaryArray(resumeData.summary).length > 0 && (
        <div id={`meas-summary-${compId}`} className={getSectionWrapperClass('summary')} style={getSectionStyle('summary')}>
          <div className="mb-3">
            <SectionHeader title="Professional Summary" sectionKey="summary" />
            <p className="text-justify leading-snug m-0" style={{ fontSize: '10.5pt' }}>
              {parseBoldText(getSummaryArray(resumeData.summary).join(' '))}
            </p>
          </div>
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div id={`meas-skills-${compId}`} className={getSectionWrapperClass('skills')} style={getSectionStyle('skills')}>
          <div className="mb-3">
            <SectionHeader title="Technical Skills" sectionKey="skills" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1" style={{ fontSize: '10.5pt' }}>
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

      <div id={`meas-exp-section-heading-${compId}`}>
        <SectionHeader title="Experience" sectionKey="experience" />
      </div>

      {resumeData.experience?.map((exp: any, i: number) => (
        <div key={`exp-meas-${i}`}>
          <div id={`meas-exp-${i}-header-${compId}`}>
            <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '11.5pt' }}>
              <div className="font-bold text-black">{exp.role}</div>
              <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
            </div>
            <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
              <div className="font-bold text-slate-800">{exp.company}</div>
            </div>
            {exp.environment && exp.environment.length > 0 && (
              <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '9.5pt' }}>
                <span className="font-bold text-black">Environment: </span>
                {exp.environment.join(', ')}
              </div>
            )}
          </div>

          <div id={`meas-exp-${i}-header-continued-${compId}`}>
            <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '11.5pt' }}>
              <div className="font-bold text-black">
                {exp.role} <span className="italic font-normal text-slate-500 text-[10pt]">(Continued)</span>
              </div>
              <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
            </div>
            <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
              <div className="font-bold text-slate-800">{exp.company}</div>
            </div>
          </div>

          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 mt-1 m-0 text-[10.5pt]" style={{ lineHeight: '1.4' }}>
              {exp.bullets.map((b: string, j: number) => (
                <li id={`meas-exp-${i}-bullet-${j}-${compId}`} key={`bullet-meas-${j}`} className="pl-1 leading-snug text-justify">
                  {parseBoldText(b)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {resumeData.education && resumeData.education.length > 0 && (
        <div id={`meas-education-${compId}`} className={getSectionWrapperClass('education')} style={getSectionStyle('education')}>
          <div className="mb-3">
            <div id={`meas-education-heading-${compId}`}>
              <SectionHeader title="Education and Training" sectionKey="education" />
            </div>
            <div className="space-y-1.5 text-[10.5pt]">
              {resumeData.education.map((edu: any, i: number) => (
                <div key={i} id={`meas-edu-${i}-${compId}`}>
                  <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '11pt' }}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="whitespace-nowrap ml-4 text-[10pt]">{edu.year}</div>
                  </div>
                  <div style={{ fontSize: '10.5pt' }} className="text-slate-600">
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div id={`meas-certifications-${compId}`} className={getSectionWrapperClass('certifications')} style={getSectionStyle('certifications')}>
          <div className="mb-3">
            <div id={`meas-certifications-heading-${compId}`}>
              <SectionHeader title="Certifications" sectionKey="certifications" />
            </div>
            <ul className="list-disc pl-5 m-0 space-y-1 text-[10.5pt]">
              {resumeData.certifications.map((cert: any, i: number) => (
                <li key={i} id={`meas-cert-${i}-${compId}`} className="pl-1 leading-relaxed">
                  <span className="font-bold">{cert.name}</span> — {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div id={`meas-footer-${compId}`} className="pt-2 flex justify-between items-center text-[9.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
        <span>{profileData.full_name || 'Candidate'} — Professional Resume</span>
        <span>Page 1 of 2</span>
      </div>
    </div>
  );

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";

  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '32px 48px 24px 48px',
    fontFamily: selectedFont,
    color: '#000000',
    fontSize: '11.5pt',
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
            <div className={`flex-1 flex flex-col ${pIndex !== pages.length - 1 ? 'justify-between' : 'justify-start'}`}>
              {/* Top Accent Bar */}
              {isPage1 && (
                <div
                  style={{
                    backgroundColor: TOP_BAR_COLOR,
                    height: '14px',
                    margin: '-32px -48px 20px -48px',
                    width: 'calc(100% + 96px)'
                  }}
                />
              )}

              {/* Header */}
              {isPage1 && (
                <div
                  onClick={() => onSelectSection?.('header')}
                  className={getSectionWrapperClass('header')}
                  style={getSectionStyle('header')}
                >
                  <div className="mb-3.5 text-center break-inside-avoid">
                    <h1 className="uppercase tracking-wider mb-1" style={{ fontSize: '24pt', fontWeight: 700 }}>
                      {renderName()}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: '10pt' }}>
                      {profileData.location && <span>{profileData.location}</span>}
                      {profileData.phone && (
                        <>
                          {profileData.location && <span className="text-slate-400">|</span>}
                          <span>{profileData.phone}</span>
                        </>
                      )}
                      {profileData.email && (
                        <>
                          {(profileData.location || profileData.phone) && <span className="text-slate-400">|</span>}
                          <span>{profileData.email}</span>
                        </>
                      )}
                      {profileData.linkedin && (
                        <>
                          {(profileData.location || profileData.phone || profileData.email) && <span className="text-slate-400">|</span>}
                          <span>{profileData.linkedin}</span>
                        </>
                      )}
                    </div>
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
                    <SectionHeader title="Technical Skills" sectionKey="skills" />
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
                      <SectionHeader title="Experience" sectionKey="experience" />
                    </div>
                  )}
                  <div>
                    {page.experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '11.5pt' }}>
                          <div className="font-bold text-black">
                            {exp.role} {exp.isContinued && <span className="italic font-normal text-slate-500 text-[10pt] ml-1">(Continued)</span>}
                          </div>
                          <div className="text-black whitespace-nowrap ml-4 font-semibold">{exp.duration}</div>
                        </div>
                        <div className="flex justify-between items-start leading-tight mb-1" style={{ fontSize: '10.5pt' }}>
                          <div className="font-bold text-slate-800">{exp.company}</div>
                        </div>

                        {exp.environment && exp.environment.length > 0 && !exp.isContinued && (
                          <div className="mb-1.5 leading-snug text-slate-600" style={{ fontSize: '9.5pt' }}>
                            <span className="font-bold text-black">Environment: </span>
                            {exp.environment.join(', ')}
                          </div>
                        )}

                        {exp.bullets.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1 mt-1 m-0 text-[10.5pt]" style={{ lineHeight: '1.4' }}>
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
              {page.education && page.education.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('education')}
                  className={getSectionWrapperClass('education')}
                  style={getSectionStyle('education')}
                >
                  <div className="mb-3">
                    {page.hasEducationHeading && <SectionHeader title="Education and Training" sectionKey="education" />}
                    <div className="space-y-1.5 text-[10.5pt]">
                      {page.education.map((edu: any, i: number) => (
                        <div key={i}>
                          <div className="flex justify-between items-start mb-0.5" style={{ fontSize: '11pt' }}>
                            <div className="font-bold">{edu.degree}</div>
                            <div className="whitespace-nowrap ml-4 text-[10pt]">{edu.year}</div>
                          </div>
                          <div style={{ fontSize: '10.5pt' }} className="text-slate-600">
                            {edu.institution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications */}
              {page.certifications && page.certifications.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('certifications')}
                  className={getSectionWrapperClass('certifications')}
                  style={getSectionStyle('certifications')}
                >
                  <div className="mb-3">
                    {page.hasCertificationsHeading && <SectionHeader title="Certifications" sectionKey="certifications" />}
                    <ul className="list-disc pl-5 m-0 space-y-1 text-[10.5pt]">
                      {page.certifications.map((cert: any, i: number) => (
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
            {(pages.length > 1 || page.education?.length > 0 || page.certifications?.length > 0) && (
              <div className="pt-2 flex justify-between items-center text-[9.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
                <span>{profileData.full_name || 'Candidate'} — Professional Resume</span>
                <span>Page {pageNumber} of {pages.length}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export const SidebarTemplate = SidebarTemplateComponent;
SidebarTemplate.displayName = 'SidebarTemplate';


