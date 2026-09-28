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
  const ACCENT = themeColor || '#f6b846'; // Default to the warm yellow/orange from the screenshot
  const selectedFont = fontFamily || 'Calibri, Arial, "Times New Roman", sans-serif';

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
        return <strong key={i} className="text-black">{part.slice(2, -2)}</strong>;
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
    const PAGE_PADDING_TOP = 48; 
    const PAGE_PADDING_BOTTOM = 48;
    const FOOTER_HEIGHT = getElementHeight('meas-cert-footer') || 30;

    const SAFETY_MARGIN = 24;
    const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM - FOOTER_HEIGHT - SAFETY_MARGIN;

    let currentPages: any[] = [];
    let currentPage: any = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false };
    let remainingHeight = MAX_CONTENT_HEIGHT;

    const headerHeight = getElementHeight('meas-cert-header');
    const summaryHeight = getElementHeight('meas-cert-summary');
    const skillsHeight = getElementHeight('meas-cert-skills');

    currentPage.header = true;
    currentPage.summary = true;
    currentPage.skills = true;
    remainingHeight -= (headerHeight + summaryHeight + skillsHeight);

    const expSectionHeadingHeight = getElementHeight('meas-cert-exp-section-heading') + 12; // mb-3 gap
    let hasAddedExpSectionHeading = false;

    const exps = resumeData.experience || [];
    for (let i = 0; i < exps.length; i++) {
      const exp = exps[i];
      const bullets = exp.bullets || [];

      let expHeaderH = getElementHeight(`meas-cert-exp-${i}-header`);
      let needsSectionHeading = !hasAddedExpSectionHeading;
      let fullHeaderH = expHeaderH + (needsSectionHeading ? expSectionHeadingHeight : 0);

      const envH = (exp.environment && exp.environment.length > 0) ? getElementHeight(`meas-cert-exp-${i}-env`) : 0;

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
        const bulletH = getElementHeight(`meas-cert-exp-${i}-bullet-${j}`);
        const isLastBullet = j === bullets.length - 1;

        const UL_MARGIN = 6;
        let requiredSpace = currentExpObj.bullets.length === 0 ? currentExpHeaderH + bulletH + UL_MARGIN : bulletH;
        if (isLastBullet) requiredSpace += envH;

        if (remainingHeight < requiredSpace) {
          if (currentExpObj.bullets.length > 0) {
            currentPage.experiences.push({ ...currentExpObj, isSplit: true });
            remainingHeight -= 16;
          }

          if (currentExpObj.bullets.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
            currentPages.push(currentPage);
            const transferExpHeading = currentPage.hasExperienceHeading && currentPage.experiences.length === 0;

            currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: transferExpHeading, hasEducationHeading: false, hasCertificationsHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT;

            const isActuallyContinued = currentExpObj.bullets.length > 0;
            currentExpObj = { ...exp, bullets: [], isContinued: isActuallyContinued, isSplit: false };
            currentExpHeaderH = getElementHeight(isActuallyContinued ? `meas-cert-exp-${i}-header-continued` : `meas-cert-exp-${i}-header`);
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
          remainingHeight -= (currentExpHeaderH + 6);
        }
        currentPage.experiences.push(currentExpObj);
        remainingHeight -= 16;
      }
    }

    const edus = resumeData.education || [];
    if (edus.length > 0) {
      let eduHeadingH = getElementHeight('meas-cert-education-heading') + 12;
      let hasAddedEduHeading = false;

      for (let i = 0; i < edus.length; i++) {
        const eduItemH = getElementHeight(`meas-cert-edu-${i}`);

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
      let certHeadingH = getElementHeight('meas-cert-certifications-heading') + 12;
      let hasAddedCertHeading = false;

      for (let i = 0; i < certs.length; i++) {
        const certItemH = getElementHeight(`meas-cert-cert-${i}`);

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

  const SectionHeader = ({ title, sectionKey }: { title: string; sectionKey?: string }) => {
    const headerColor = sectionStyles?.[sectionKey || '']?.color || '#500000'; // Default dark red/brown as seen in image for headings
    return (
      <div className="mb-2 break-inside-avoid">
        <h2 className="font-bold m-0 border-b-[1.5px] inline-block pb-0.5" style={{ fontSize: '13pt', color: headerColor, borderColor: headerColor }}>
          {title}
        </h2>
      </div>
    );
  };

  // Content indentation to match screenshot design
  const CONTENT_INDENT = "ml-[140px]"; 

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    fontFamily: selectedFont,
    color: '#000000',
    fontSize: '9.5pt',
    lineHeight: '1.4',
    padding: '48px 52px',
  };

  const parseName = (name: string) => {
    if (!name) return { first: 'JOHN', last: 'DOE' };
    const parts = name.trim().split(' ');
    if (parts.length === 1) return { first: parts[0], last: '' };
    const last = parts.pop();
    const first = parts.join(' ');
    return { first, last };
  };

  const { first: firstName, last: lastName } = parseName(profileData.full_name);

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
        padding: '48px 52px',
        border: '1px solid transparent',
        fontFamily: selectedFont,
        color: '#000000',
        fontSize: '9.5pt',
        lineHeight: '1.4'
      }}
    >
      <div id="meas-cert-header" className={getSectionWrapperClass('header')} style={getSectionStyle('header')}>
        <div className="w-full h-5 mb-5" style={{ backgroundColor: ACCENT }} />
        <div className="mb-5 text-center break-inside-avoid">
          <h1 className="uppercase mb-1 tracking-wide" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || '#000' }}>
            <span className="font-light text-slate-600">{firstName}</span> <span className="font-bold">{lastName}</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2" style={{ fontSize: '9pt' }}>
            {[profileData.location, profileData.phone, profileData.email, profileData.linkedin].filter(Boolean).map((item, index, arr) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < arr.length - 1 && <span className="text-gray-400">|</span>}
              </React.Fragment>
            ))}
          </div>
          {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
            <div className="flex flex-wrap justify-center items-center gap-3 mt-1.5" style={{ fontSize: '9pt', color: '#475569' }}>
              {[
                profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
                profileData.relocation && `Relocation: ${profileData.relocation}`,
                profileData.availability && `Availability: ${profileData.availability}`
              ].filter(Boolean).map((item, index, arr) => (
                <React.Fragment key={index}>
                  <span className="font-semibold">{item}</span>
                  {index < arr.length - 1 && <span className="text-slate-300">|</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {getSummaryArray(resumeData.summary).length > 0 && (
        <div id="meas-cert-summary" className={getSectionWrapperClass('summary')} style={getSectionStyle('summary')}>
          <div className="mb-4">
            <SectionHeader title="Professional Summary" sectionKey="summary" />
            <div className={CONTENT_INDENT}>
              <ul className="list-disc pl-4 mt-1 mb-1 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
                {getSummaryArray(resumeData.summary).map((point: string, i: number) => (
                  <li key={i} className="text-justify text-black">{renderWithBold(point)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div id="meas-cert-skills" className={getSectionWrapperClass('skills')} style={getSectionStyle('skills')}>
          <div className="mb-4">
            <SectionHeader title="Technical Skills" sectionKey="skills" />
            <div className={`${CONTENT_INDENT}`}>
              <ul className="list-disc pl-4 columns-2 gap-8 m-0" style={{ fontSize: '9pt' }}>
                {resumeData.skills.map((skillGroup: any, i: number) => (
                  <li key={i} className="leading-tight mb-1.5 break-inside-avoid">
                    <span className="font-bold text-black">{skillGroup.category}: </span>
                    <span className="text-black">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div id="meas-cert-exp-section-heading" className="mb-3">
        <SectionHeader title="Experience" sectionKey="experience" />
      </div>

      {resumeData.experience?.map((exp: any, i: number) => (
        <div key={`exp-meas-${i}`} className={CONTENT_INDENT}>
          <div id={`meas-cert-exp-${i}-header`} className="mb-1">
            <div className="flex justify-between items-start font-bold text-black" style={{ fontSize: '9.5pt' }}>
              <div>{exp.role}</div>
              <div className="font-normal">{exp.duration}</div>
            </div>
            <div className="text-black font-semibold" style={{ fontSize: '9.5pt' }}>
              {exp.company} {exp.location ? `— ${exp.location}` : ''}
            </div>
          </div>

          <div id={`meas-cert-exp-${i}-header-continued`} className="mb-1">
            <div className="flex justify-between items-start font-bold text-black" style={{ fontSize: '9.5pt' }}>
              <div>{exp.role} <span className="font-normal italic text-slate-500">(Continued)</span></div>
              <div className="font-normal">{exp.duration}</div>
            </div>
            <div className="text-black font-semibold" style={{ fontSize: '9.5pt' }}>
              {exp.company} {exp.location ? `— ${exp.location}` : ''}
            </div>
          </div>

          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="list-disc pl-4 mt-1 mb-1.5 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
              {exp.bullets.map((b: string, j: number) => (
                <li id={`meas-cert-exp-${i}-bullet-${j}`} key={`bullet-meas-${j}`} className="text-justify text-black">
                  {renderWithBold(b)}
                </li>
              ))}
            </ul>
          )}

          {exp.environment && exp.environment.length > 0 && (
            <div id={`meas-cert-exp-${i}-env`} className="mt-1.5 pt-1 border-t border-slate-100" style={{ fontSize: '9pt' }}>
              <span className="font-bold text-black italic">Environment: </span>
              <span className="text-slate-600">{exp.environment.join(', ')}</span>
            </div>
          )}
        </div>
      ))}

      {resumeData.education && resumeData.education.length > 0 && (
        <div id="meas-cert-education" className={getSectionWrapperClass('education')} style={getSectionStyle('education')}>
          <div className="mb-4">
            <div id="meas-cert-education-heading" className="mb-2">
              <SectionHeader title="Education and Training" sectionKey="education" />
            </div>
            <div className={`${CONTENT_INDENT} space-y-2`} style={{ fontSize: '9.5pt' }}>
              {resumeData.education.map((edu: any, i: number) => (
                <div key={i} id={`meas-cert-edu-${i}`}>
                  <div className="flex justify-between items-start font-semibold text-black">
                    <span>{edu.degree}</span>
                    <span className="font-normal">{edu.year}</span>
                  </div>
                  <div className="text-black">
                    {edu.institution} {edu.location ? `— ${edu.location}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div id="meas-cert-certifications" className={getSectionWrapperClass('certifications')} style={getSectionStyle('certifications')}>
          <div className="mb-4">
            <div id="meas-cert-certifications-heading" className="mb-2">
              <SectionHeader title="Certifications" sectionKey="certifications" />
            </div>
            <div className={`${CONTENT_INDENT} space-y-1`} style={{ fontSize: '9.5pt' }}>
              {resumeData.certifications.map((cert: any, i: number) => (
                <div key={i} id={`meas-cert-cert-${i}`} className="flex justify-between items-start">
                  <div className="font-semibold text-black">{cert.name}</div>
                  <div className="font-normal text-black">{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="meas-cert-footer" className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 mt-auto select-none shrink-0">
        <span></span>
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
            <div className={`flex-1 flex flex-col ${pIndex !== pages.length - 1 ? 'justify-between' : 'justify-start'}`}>

              {isPage1 && (
                <div
                  onClick={() => onSelectSection?.('header')}
                  className={getSectionWrapperClass('header')}
                  style={getSectionStyle('header')}
                >
                  <div className="w-full h-5 mb-5" style={{ backgroundColor: ACCENT }} />
                  <div className="mb-5 text-center break-inside-avoid">
                    <h1 className="uppercase mb-1 tracking-wide" style={{ fontSize: '24pt', color: sectionStyles?.header?.color || '#000' }}>
                      <span className="font-light text-slate-600">{firstName}</span> <span className="font-bold">{lastName}</span>
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2" style={{ fontSize: '9pt' }}>
                      {[profileData.location, profileData.phone, profileData.email, profileData.linkedin].filter(Boolean).map((item, index, arr) => (
                        <React.Fragment key={index}>
                          <span>{item}</span>
                          {index < arr.length - 1 && <span className="text-gray-400">|</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-1.5" style={{ fontSize: '9pt', color: '#475569' }}>
                        {[
                          profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
                          profileData.relocation && `Relocation: ${profileData.relocation}`,
                          profileData.availability && `Availability: ${profileData.availability}`
                        ].filter(Boolean).map((item, index, arr) => (
                          <React.Fragment key={index}>
                            <span className="font-semibold">{item}</span>
                            {index < arr.length - 1 && <span className="text-slate-300">|</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {page.summary && getSummaryArray(resumeData.summary).length > 0 && (
                <div
                  onClick={() => onSelectSection?.('summary')}
                  className={getSectionWrapperClass('summary')}
                  style={getSectionStyle('summary')}
                >
                  <div className="mb-4">
                    <SectionHeader title="Professional Summary" sectionKey="summary" />
                    <div className={CONTENT_INDENT}>
                      <ul className="list-disc pl-4 mt-1 mb-1 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
                        {getSummaryArray(resumeData.summary).map((point: string, i: number) => (
                          <li key={i} className="text-justify text-black">{renderWithBold(point)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {page.skills && resumeData.skills && resumeData.skills.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('skills')}
                  className={getSectionWrapperClass('skills')}
                  style={getSectionStyle('skills')}
                >
                  <div className="mb-4">
                    <SectionHeader title="Technical Skills" sectionKey="skills" />
                    <div className={`${CONTENT_INDENT}`}>
                      <ul className="list-disc pl-4 columns-2 gap-8 m-0" style={{ fontSize: '9pt' }}>
                        {resumeData.skills.map((skillGroup: any, i: number) => (
                          <li key={i} className="leading-tight mb-1.5 break-inside-avoid">
                            <span className="font-bold text-black">{skillGroup.category}: </span>
                            <span className="text-black">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {page.experiences.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('experience')}
                  className={getSectionWrapperClass('experience')}
                  style={getSectionStyle('experience')}
                >
                  <div className="mb-4">
                    {page.hasExperienceHeading && (
                      <div className="mb-3">
                        <SectionHeader
                          title={isPage1 ? "Experience" : "Experience (Continued)"}
                          sectionKey="experience"
                        />
                      </div>
                    )}

                    {page.experiences.map((exp: any, i: number) => (
                      <div key={i} className={`mb-4 break-inside-avoid ${CONTENT_INDENT}`}>
                        <div className="flex justify-between items-start font-bold text-black" style={{ fontSize: '9.5pt' }}>
                          <div>
                            {exp.role}
                            {exp.isContinued && <span className="italic font-normal text-slate-500 ml-1">(Continued)</span>}
                          </div>
                          <div className="font-normal">{exp.duration}</div>
                        </div>
                        {!exp.isContinued && (
                          <div className="text-black font-semibold" style={{ fontSize: '9.5pt' }}>
                            {exp.company} {exp.location ? `— ${exp.location}` : ''}
                          </div>
                        )}

                        <ul className="list-disc pl-4 mt-1 mb-1.5 m-0 space-y-1" style={{ fontSize: '9.5pt' }}>
                          {exp.bullets.map((bullet: string, j: number) => (
                            <li key={j} className="text-justify text-black">
                              {renderWithBold(bullet)}
                            </li>
                          ))}
                        </ul>

                        {!exp.isSplit && exp.environment && exp.environment.length > 0 && (
                          <div className="mt-1.5 pt-1 border-t border-slate-100" style={{ fontSize: '9pt' }}>
                            <span className="font-bold text-black italic">Environment: </span>
                            <span className="text-slate-600">{exp.environment.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {page.education && page.education.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('education')}
                  className={getSectionWrapperClass('education')}
                  style={getSectionStyle('education')}
                >
                  <div className="mb-4">
                    {page.hasEducationHeading && (
                      <div className="mb-2">
                        <SectionHeader title="Education and Training" sectionKey="education" />
                      </div>
                    )}
                    <div className={`${CONTENT_INDENT} space-y-2`} style={{ fontSize: '9.5pt' }}>
                      {page.education.map((edu: any, i: number) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex justify-between items-start font-semibold text-black">
                            <span>{edu.degree}</span>
                            <span className="font-normal">{edu.year}</span>
                          </div>
                          <div className="text-black">
                            {edu.institution} {edu.location ? `— ${edu.location}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {page.certifications && page.certifications.length > 0 && (
                <div
                  onClick={() => onSelectSection?.('certifications')}
                  className={getSectionWrapperClass('certifications')}
                  style={getSectionStyle('certifications')}
                >
                  <div className="mb-4">
                    {page.hasCertificationsHeading && (
                      <div className="mb-2">
                        <SectionHeader title="Certifications" sectionKey="certifications" />
                      </div>
                    )}
                    <div className={`${CONTENT_INDENT} space-y-1`} style={{ fontSize: '9.5pt' }}>
                      {page.certifications.map((cert: any, i: number) => (
                        <div key={i} className="flex justify-between items-start">
                          <div className="font-semibold text-black">{cert.name}</div>
                          <div className="font-normal text-black">{cert.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {(pages.length > 1 || page.education?.length > 0 || page.certifications?.length > 0) && (
              <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 mt-auto select-none shrink-0">
                <span></span>
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
