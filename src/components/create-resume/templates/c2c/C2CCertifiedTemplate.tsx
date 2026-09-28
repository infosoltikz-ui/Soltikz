"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ResumeTemplateProps, getSummaryArray } from '../types';

export const C2CCertifiedTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const ACCENT = themeColor || '#0f172a'; // slate-900
  const selectedFont = fontFamily || 'Arial, Helvetica, sans-serif';

  const [paginationState, setPaginationState] = useState<{
    pages: any[] | null;
    resumeDataHash: string;
  }>({ pages: null, resumeDataHash: '' });

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const measRef = useRef<HTMLDivElement>(null);

  const dataHash = JSON.stringify({ resumeData, profileData, themeColor, fontFamily, sectionStyles });

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  useLayoutEffect(() => {
    if (!measRef.current) return;

    const measRect = measRef.current.getBoundingClientRect();
    const trueScale = measRect.width / 794;

    const getElementHeight = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      
      const unscaledHeight = trueScale > 0 ? rect.height / trueScale : (el as HTMLElement).offsetHeight;

      const mt = parseFloat(style.marginTop) || 0;
      const mb = parseFloat(style.marginBottom) || 0;
      return unscaledHeight + mt + mb;
    };

    const PAGE_HEIGHT = 1123;
    const PAGE_PADDING_TOP = 44;
    const PAGE_PADDING_BOTTOM = 44;
    const FOOTER_HEIGHT = getElementHeight('meas-footer') || 30;

    const SAFETY_MARGIN = 24;
    const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - FOOTER_HEIGHT - SAFETY_MARGIN;

    let currentPages: any[] = [];
    let currentPage: any = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
    let remainingHeight = MAX_CONTENT_HEIGHT;

    const headerHeight = getElementHeight('meas-header');
    const summaryHeight = getElementHeight('meas-summary');
    const skillsHeight = getElementHeight('meas-skills');

    currentPage.header = true;
    currentPage.summary = true;
    currentPage.skills = true;
    remainingHeight -= (headerHeight + summaryHeight + skillsHeight);

    const expSectionHeadingHeight = getElementHeight('meas-exp-section-heading') + 24; // mt-5 (20)
    let hasAddedExpSectionHeading = false;

    const exps = resumeData.experience || [];
    for (let i = 0; i < exps.length; i++) {
      const exp = exps[i];
      const bullets = exp.bullets || [];

      let expHeaderH = getElementHeight(`meas-exp-${i}-header`);
      let needsSectionHeading = !hasAddedExpSectionHeading;
      let fullHeaderH = expHeaderH + (needsSectionHeading ? expSectionHeadingHeight : 0);

      const envH = (exp.environment && exp.environment.length > 0) ? getElementHeight(`meas-exp-${i}-env`) : 0;

      if (remainingHeight < fullHeaderH && remainingHeight < MAX_CONTENT_HEIGHT) {
        currentPages.push(currentPage);
        currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
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
        const isLastBullet = j === bullets.length - 1;

        const UL_MARGIN = 10; // mt-1 (4) + mb-1.5 (6)
        let requiredSpace = currentExpObj.bullets.length === 0 ? currentExpHeaderH + bulletH + UL_MARGIN : bulletH;
        if (isLastBullet) requiredSpace += envH;

        if (remainingHeight < requiredSpace) {
          if (currentExpObj.bullets.length > 0) {
            currentPage.experiences.push({ ...currentExpObj, isSplit: true });
            remainingHeight -= 20; // mb-5 gap
          }

          if (currentExpObj.bullets.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            const transferExpHeading = currentPage.hasExperienceHeading && currentPage.experiences.length === 0;

            currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: transferExpHeading, hasEducationHeading: false, hasCertificationsHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;

            const isActuallyContinued = currentExpObj.bullets.length > 0;
            currentExpObj = { ...exp, bullets: [], isContinued: isActuallyContinued, isSplit: false };
            currentExpHeaderH = getElementHeight(isActuallyContinued ? `meas-exp-${i}-header-continued` : `meas-exp-${i}-header`);
            if (transferExpHeading) {
              currentExpHeaderH += expSectionHeadingHeight;
            }
          }
        }

        if (currentExpObj.bullets.length === 0) {
          remainingHeight -= (currentExpHeaderH + UL_MARGIN);
        }

        remainingHeight -= bulletH;
        if (isLastBullet) remainingHeight -= envH;
        currentExpObj.bullets.push(bullets[j]);
      }

      if (currentExpObj.bullets.length > 0 || bullets.length === 0) {
        if (bullets.length === 0) {
          remainingHeight -= (currentExpHeaderH + 10);
        }
        currentPage.experiences.push(currentExpObj);
        remainingHeight -= 12; // mb-3 gap
      }
    }

    const edus = resumeData.education || [];
    if (edus.length > 0) {
      let eduHeadingH = getElementHeight('meas-education-heading') + 24;
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

    const certs = resumeData.certifications || [];
    if (certs.length > 0) {
      let certHeadingH = getElementHeight('meas-certifications-heading') + 24;
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
    return `group/sec relative transition-all rounded-lg p-1.5 -m-1.5 cursor-pointer ${
      isActive
        ? 'ring-2 ring-emerald-500 bg-emerald-50/25 shadow-xs'
        : 'hover:ring-1 hover:ring-emerald-400/60 hover:bg-slate-50/50'
    }`;
  };

  const SectionHeader = ({ title, sectionKey }: { title: string; sectionKey?: string }) => {
    const headerColor = sectionStyles?.[sectionKey || '']?.color || ACCENT;
    return (
      <h2 className="uppercase font-bold border-b-2 pb-1 mb-2 mt-3 tracking-wide break-inside-avoid" style={{ fontSize: '11pt', color: headerColor, borderColor: headerColor }}>
        {title}
      </h2>
    );
  };

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    fontFamily: selectedFont,
    color: '#1e293b',
    fontSize: '9.5pt',
    lineHeight: '1.4',
    padding: '44px 50px',
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
        padding: '44px 50px',
        border: '1px solid transparent',
        fontFamily: selectedFont,
        color: '#1e293b',
        fontSize: '9.5pt',
        lineHeight: '1.4'
      }}
    >
      <div id="meas-header" className={getSectionWrapperClass('header')} style={getSectionStyle('header')}>
        <div className="flex justify-between items-center border-b-2 pb-3 mb-3 break-inside-avoid" style={{ borderColor: ACCENT }}>
          <div className="flex-1">
            <h1 className="font-extrabold uppercase m-0 leading-tight" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || ACCENT }}>
              {profileData.full_name || 'JOHN DOE'}
            </h1>
            {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
              <div className="mt-2 font-medium" style={{ fontSize: '9.5pt', color: ACCENT }}>
                {[
                  profileData.work_authorization && `Auth: ${profileData.work_authorization}`,
                  profileData.relocation && `Reloc: ${profileData.relocation}`,
                  profileData.availability && `Avail: ${profileData.availability}`
                ].filter(Boolean).join(' | ')}
              </div>
            )}
          </div>
          <div className="text-right flex flex-col gap-1 border-l-2 pl-4 border-slate-200" style={{ fontSize: '9pt', color: '#475569' }}>
            {profileData.location && <div className="font-semibold text-slate-700">{profileData.location}</div>}
            {profileData.phone && <div>{profileData.phone}</div>}
            {profileData.email && <div>{profileData.email}</div>}
            {profileData.linkedin && <div>{profileData.linkedin}</div>}
          </div>
        </div>
      </div>

      {getSummaryArray(resumeData.summary).length > 0 && (
        <div id="meas-summary" className={getSectionWrapperClass('summary')} style={getSectionStyle('summary')}>
          <div className="mb-3">
            <SectionHeader title="Professional Summary" sectionKey="summary" />
            <ul className="list-none m-0 space-y-1 text-justify" style={{ fontSize: '9.5pt' }}>
              {getSummaryArray(resumeData.summary).map((point: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 font-bold" style={{ color: ACCENT }}>•</span>
                  <span>{renderWithBold(point)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div id="meas-skills" className={getSectionWrapperClass('skills')} style={getSectionStyle('skills')}>
          <div className="mb-3">
            <SectionHeader title="Technical Skills" sectionKey="skills" />
            <div className="grid grid-cols-1 gap-y-0.5 bg-slate-50 border border-slate-200 p-2 rounded-sm" style={{ fontSize: '9pt' }}>
              {resumeData.skills.map((skillGroup: any, i: number) => (
                <div key={i} className="leading-snug flex">
                  <span className="font-bold w-[190px] shrink-0 text-slate-900 border-r border-slate-300 mr-2">{skillGroup.category}:</span>
                  <span className="text-slate-700">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="meas-exp-section-heading">
        <SectionHeader title="Professional Experience" sectionKey="experience" />
      </div>

      {resumeData.experience?.map((exp: any, i: number) => (
        <div key={`exp-meas-${i}`}>
          <div id={`meas-exp-${i}-header`} className="flex justify-between items-center bg-slate-100 p-2 border border-slate-200 rounded-sm mb-2">
            <div>
              <div className="font-extrabold uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                {exp.company}
              </div>
              <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.role} {exp.location ? `| ${exp.location}` : ''}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.duration}</div>
            </div>
          </div>

          <div id={`meas-exp-${i}-header-continued`} className="flex justify-between items-center bg-slate-100 p-2 border border-slate-200 rounded-sm mb-2">
            <div>
              <div className="font-extrabold uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                {exp.company}
                <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.duration}</div>
            </div>
          </div>

          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="list-none mt-1 mb-1.5 m-0 space-y-1.5" style={{ fontSize: '9.5pt' }}>
              {exp.bullets.map((b: string, j: number) => (
                <li id={`meas-exp-${i}-bullet-${j}`} key={`bullet-meas-${j}`} className="flex gap-2">
                  <span className="shrink-0 font-bold text-slate-500 bg-slate-100 px-1.5 rounded">•</span>
                  <span className="text-justify text-slate-800">{renderWithBold(b)}</span>
                </li>
              ))}
            </ul>
          )}

          {exp.environment && exp.environment.length > 0 && (
            <div id={`meas-exp-${i}-env`} className="mt-2 bg-slate-800 text-white px-2 py-1 rounded-sm flex gap-2" style={{ fontSize: '8.5pt' }}>
              <span className="font-bold uppercase tracking-wider shrink-0 text-slate-300">Environment: </span>
              <span>{exp.environment.join(', ')}</span>
            </div>
          )}
        </div>
      ))}

      {resumeData.education && resumeData.education.length > 0 && (
        <div id="meas-education" className={getSectionWrapperClass('education')} style={getSectionStyle('education')}>
          <div className="mb-4">
            <div id="meas-education-heading">
              <SectionHeader title="Education" sectionKey="education" />
            </div>
            <div className="space-y-2" style={{ fontSize: '9.5pt' }}>
              {resumeData.education.map((edu: any, i: number) => (
                <div key={i} id={`meas-edu-${i}`} className="flex justify-between items-start border-l-2 pl-3 border-slate-300">
                  <div>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 font-medium">{edu.institution} {edu.location ? `| ${edu.location}` : ''}</div>
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
          <div className="mb-4">
            <div id="meas-certifications-heading">
              <SectionHeader title="Certifications" sectionKey="certifications" />
            </div>
            <div className="grid grid-cols-1 gap-2" style={{ fontSize: '9.5pt' }}>
              {resumeData.certifications.map((cert: any, i: number) => (
                <div key={i} id={`meas-cert-${i}`} className="flex justify-between items-start border-b border-slate-100 pb-1">
                  <div>
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    <span className="text-slate-400 mx-1.5">|</span>
                    <span className="text-slate-600 font-medium">{cert.issuer}</span>
                  </div>
                  <div className="whitespace-nowrap ml-4 text-slate-500 font-semibold">{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="meas-footer" className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
        <span>{profileData.full_name || 'Candidate'} — C2C Certified Professional</span>
        <span>Page 1 of 2</span>
      </div>
    </div>
  );

  const pages = paginationState.pages || [];

  return (
    <div ref={ref} className="text-black bg-slate-50 print:bg-white flex flex-col items-center">
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
            <div className="flex-1 flex flex-col justify-start">
              
              {/* Header */}
              {isPage1 && (
                <div 
                  onClick={() => onSelectSection?.('header')}
                  className={getSectionWrapperClass('header')}
                  style={getSectionStyle('header')}
                >
                  <div className="flex justify-between items-center border-b-2 pb-3 mb-3 break-inside-avoid" style={{ borderColor: ACCENT }}>
                    <div className="flex-1">
                      <h1 className="font-extrabold uppercase m-0 leading-tight" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || ACCENT }}>
                        {profileData.full_name || 'JOHN DOE'}
                      </h1>
                      
                      {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
                        <div className="mt-2 font-medium" style={{ fontSize: '9.5pt', color: ACCENT }}>
                          {[
                            profileData.work_authorization && `Auth: ${profileData.work_authorization}`,
                            profileData.relocation && `Reloc: ${profileData.relocation}`,
                            profileData.availability && `Avail: ${profileData.availability}`
                          ].filter(Boolean).join(' | ')}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right flex flex-col gap-1 border-l-2 pl-4 border-slate-200" style={{ fontSize: '9pt', color: '#475569' }}>
                      {profileData.location && <div className="font-semibold text-slate-700">{profileData.location}</div>}
                      {profileData.phone && <div>{profileData.phone}</div>}
                      {profileData.email && <div>{profileData.email}</div>}
                      {profileData.linkedin && <div>{profileData.linkedin}</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Summary */}
              {page.summary && getSummaryArray(resumeData.summary).length > 0 && (
                <div 
                  onClick={() => onSelectSection?.('summary')}
                  className={getSectionWrapperClass('summary')}
                  style={getSectionStyle('summary')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Professional Summary" sectionKey="summary" />
                    <ul className="list-none m-0 space-y-1 text-justify" style={{ fontSize: '9.5pt' }}>
                      {getSummaryArray(resumeData.summary).map((point: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span className="shrink-0 font-bold" style={{ color: ACCENT }}>•</span>
                          <span>{renderWithBold(point)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {page.skills && resumeData.skills && resumeData.skills.length > 0 && (
                <div 
                  onClick={() => onSelectSection?.('skills')}
                  className={getSectionWrapperClass('skills')}
                  style={getSectionStyle('skills')}
                >
                  <div className="mb-3">
                    <SectionHeader title="Technical Skills" sectionKey="skills" />
                    <div className="grid grid-cols-1 gap-y-0.5 bg-slate-50 border border-slate-200 p-2 rounded-sm" style={{ fontSize: '9pt' }}>
                      {resumeData.skills.map((skillGroup: any, i: number) => (
                        <div key={i} className="leading-snug flex">
                          <span className="font-bold w-[190px] shrink-0 text-slate-900 border-r border-slate-300 mr-2">{skillGroup.category}:</span>
                          <span className="text-slate-700">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                        </div>
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
                  <div className="mb-3">
                    {page.hasExperienceHeading && (
                      <SectionHeader 
                        title={isPage1 ? "Professional Experience" : "Professional Experience (Continued)"} 
                        sectionKey="experience" 
                      />
                    )}
                    
                    {page.experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-3 break-inside-avoid">
                        <div className="flex justify-between items-center bg-slate-100 p-2 border border-slate-200 rounded-sm mb-2">
                          <div>
                            <div className="font-extrabold uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                              {exp.company}
                              {exp.isContinued && <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>}
                            </div>
                            {!exp.isContinued && (
                              <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.role} {exp.location ? `| ${exp.location}` : ''}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-700" style={{ fontSize: '9.5pt' }}>{exp.duration}</div>
                          </div>
                        </div>

                        <ul className="list-none mt-1 mb-1.5 m-0 space-y-1.5" style={{ fontSize: '9.5pt' }}>
                          {exp.bullets.map((bullet: string, j: number) => (
                            <li key={j} className="flex gap-2">
                              <span className="shrink-0 font-bold text-slate-500 bg-slate-100 px-1.5 rounded">•</span>
                              <span className="text-justify text-slate-800">{renderWithBold(bullet)}</span>
                            </li>
                          ))}
                        </ul>

                        {!exp.isSplit && exp.environment && exp.environment.length > 0 && (
                          <div className="mt-2 bg-slate-800 text-white px-2 py-1 rounded-sm flex gap-2" style={{ fontSize: '8.5pt' }}>
                            <span className="font-bold uppercase tracking-wider shrink-0 text-slate-300">Environment: </span>
                            <span>{exp.environment.join(', ')}</span>
                          </div>
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
                  <div className="mb-4">
                    {page.hasEducationHeading && <SectionHeader title="Education" sectionKey="education" />}
                    <div className="space-y-2" style={{ fontSize: '9.5pt' }}>
                      {page.education.map((edu: any, i: number) => (
                        <div key={i} className="flex justify-between items-start border-l-2 pl-3 border-slate-300">
                          <div>
                            <div className="font-bold text-slate-900">{edu.degree}</div>
                            <div className="text-slate-600 font-medium">{edu.institution} {edu.location ? `| ${edu.location}` : ''}</div>
                          </div>
                          <div className="font-semibold whitespace-nowrap ml-4 text-[9pt]">{edu.year}</div>
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
                  <div className="mb-4">
                    {page.hasCertificationsHeading && <SectionHeader title="Certifications" sectionKey="certifications" />}
                    <div className="grid grid-cols-1 gap-2" style={{ fontSize: '9.5pt' }}>
                      {page.certifications.map((cert: any, i: number) => (
                        <div key={i} className="flex justify-between items-start border-b border-slate-100 pb-1">
                          <div>
                            <span className="font-bold text-slate-900">{cert.name}</span>
                            <span className="text-slate-400 mx-1.5">|</span>
                            <span className="text-slate-600 font-medium">{cert.issuer}</span>
                          </div>
                          <div className="whitespace-nowrap ml-4 text-slate-500 font-semibold">{cert.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            {(pages.length > 1 || page.education?.length > 0 || page.certifications?.length > 0) && (
              <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
                <span>{profileData.full_name || 'Candidate'} — C2C Certified Professional</span>
                <span>Page {pageNumber} of {pages.length}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

C2CCertifiedTemplate.displayName = 'C2CCertifiedTemplate';
