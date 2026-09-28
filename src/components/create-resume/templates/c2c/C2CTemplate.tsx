"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ResumeTemplateProps, getSummaryArray } from '../types';

export const C2CTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const selectedFont = fontFamily || 'Arial, Calibri, sans-serif';
  const accentColor = themeColor || '#000000';

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
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  useLayoutEffect(() => {
    if (!measRef.current) return;

    // Calculate global scale applied by the container (e.g. Fit Width)
    const measRect = measRef.current.getBoundingClientRect();
    const trueScale = measRect.width / 794;

    const getElementHeight = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      
      const unscaledHeight = rect.height / trueScale;

      const mt = parseFloat(style.marginTop) || 0;
      const mb = parseFloat(style.marginBottom) || 0;
      return unscaledHeight + mt + mb;
    };

    const PAGE_HEIGHT = 1123;
    const PAGE_PADDING_TOP = 44;
    const PAGE_PADDING_BOTTOM = 44;
    const FOOTER_HEIGHT = getElementHeight('meas-footer') || 30;

    const SAFETY_MARGIN = 5;
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

    const expSectionHeadingHeight = getElementHeight('meas-exp-section-heading') + 24; 
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

        let requiredSpace = currentExpObj.bullets.length === 0 ? currentExpHeaderH + bulletH : bulletH;
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
            currentExpHeaderH = getElementHeight(isActuallyContinued ? `meas-exp-${i}-header-continued` : `meas-exp-${i}-header`);
            if (transferExpHeading) {
              currentExpHeaderH += expSectionHeadingHeight;
            }
          }
        }

        if (currentExpObj.bullets.length === 0) {
          remainingHeight -= currentExpHeaderH;
        }

        remainingHeight -= bulletH;
        if (isLastBullet) remainingHeight -= envH;
        currentExpObj.bullets.push(bullets[j]);
      }

      if (currentExpObj.bullets.length > 0 || bullets.length === 0) {
        if (bullets.length === 0) {
          remainingHeight -= currentExpHeaderH;
        }
        currentPage.experiences.push(currentExpObj);
        remainingHeight -= 16;
      }
    }

    const edus = resumeData.education || [];
    if (edus.length > 0) {
      let eduHeadingH = getElementHeight('meas-education-heading') + 12;
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
      let certHeadingH = getElementHeight('meas-certifications-heading') + 12;
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
    const headerColor = sectionStyles?.[sectionKey || '']?.color || accentColor;
    return (
      <h2 className="font-bold mt-3 mb-1.5 border-b pb-0.5" style={{ fontSize: '10.5pt', color: headerColor, borderColor: headerColor }}>
        {title}
      </h2>
    );
  };

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col justify-between mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    fontFamily: selectedFont,
    color: '#000000',
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
        color: '#000000',
        fontSize: '9.5pt',
        lineHeight: '1.4'
      }}
    >
      <div id="meas-header" className="text-center mb-3.5 break-inside-avoid">
        <h1 className="font-bold text-black m-0" style={{ fontSize: '15pt', color: sectionStyles?.header?.color || '#000000' }}>
          {profileData.full_name || 'JOHN DOE'}
        </h1>
        <div className="mt-0.5">
          {[profileData.location, profileData.phone, profileData.email, profileData.linkedin].filter(Boolean).join('  •  ')}
        </div>
        {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
          <div className="mt-0.5 text-slate-700">
            {[
              profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
              profileData.relocation && `Relocation: ${profileData.relocation}`,
              profileData.availability && `Availability: ${profileData.availability}`
            ].filter(Boolean).join('   |   ')}
          </div>
        )}
      </div>

      {getSummaryArray(resumeData.summary).length > 0 && (
        <div id="meas-summary" className={getSectionWrapperClass('summary')} style={getSectionStyle('summary')}>
          <div className="mb-3">
            <SectionHeader title="Professional Summary" sectionKey="summary" />
            <ul className="list-none m-0 space-y-1">
              {getSummaryArray(resumeData.summary).map((point: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 font-semibold">•</span>
                  <span className="text-justify">{renderWithBold(point)}</span>
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
            <div className="space-y-0.5">
              {resumeData.skills.map((skillGroup: any, i: number) => (
                <div key={i} className="leading-snug">
                  <span className="font-bold">{skillGroup.category}: </span>
                  <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
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
          <div id={`meas-exp-${i}-header`}>
            <div className="font-bold">
              {exp.company} {exp.location ? `| ${exp.location}` : ''} | {exp.duration}
            </div>
            <div className="mb-1 font-semibold text-slate-800">{exp.role}</div>
          </div>

          <div id={`meas-exp-${i}-header-continued`}>
            <div className="font-bold">
              {exp.company} {exp.location ? `| ${exp.location}` : ''} | {exp.duration}
              <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>
            </div>
          </div>

          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="list-none mt-0.5 mb-1.5 m-0 space-y-1">
              {exp.bullets.map((b: string, j: number) => (
                <li id={`meas-exp-${i}-bullet-${j}`} key={`bullet-meas-${j}`} className="flex gap-2">
                  <span className="shrink-0 font-medium">•</span>
                  <span className="text-justify">{renderWithBold(b)}</span>
                </li>
              ))}
            </ul>
          )}

          {exp.environment && exp.environment.length > 0 && (
            <div id={`meas-exp-${i}-env`} className="mt-1">
              <span className="font-bold">Environment: </span>
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
            <div className="space-y-1">
              {resumeData.education.map((edu: any, i: number) => (
                <div key={i} id={`meas-edu-${i}`}>
                  <span className="font-bold">{edu.degree}</span> | {edu.institution} | {edu.year}
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
            <div className="space-y-1">
              {resumeData.certifications.map((cert: any, i: number) => (
                <div key={i} id={`meas-cert-${i}`}>
                  <span className="font-bold">{cert.name}</span> | {cert.issuer} | Earned {cert.year}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="meas-footer" className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 border-t border-slate-200 mt-auto select-none shrink-0">
        <span>{profileData.full_name || 'Candidate'} — C2C Classic Resume</span>
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
              
              {/* Header */}
              {isPage1 && (
                <div 
                  onClick={() => onSelectSection?.('header')}
                  className={getSectionWrapperClass('header')}
                  style={getSectionStyle('header')}
                >
                  <div className="text-center mb-3.5 break-inside-avoid">
                    <h1 className="font-bold text-black m-0" style={{ fontSize: '15pt', color: sectionStyles?.header?.color || '#000000' }}>
                      {profileData.full_name || 'JOHN DOE'}
                    </h1>
                    <div className="mt-0.5">
                      {[profileData.location, profileData.phone, profileData.email, profileData.linkedin].filter(Boolean).join('  •  ')}
                    </div>
                    {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
                      <div className="mt-0.5 text-slate-700">
                        {[
                          profileData.work_authorization && `Work Authorization: ${profileData.work_authorization}`,
                          profileData.relocation && `Relocation: ${profileData.relocation}`,
                          profileData.availability && `Availability: ${profileData.availability}`
                        ].filter(Boolean).join('   |   ')}
                      </div>
                    )}
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
                    <ul className="list-none m-0 space-y-1">
                      {getSummaryArray(resumeData.summary).map((point: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span className="shrink-0 font-semibold">•</span>
                          <span className="text-justify">{renderWithBold(point)}</span>
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
                    <div className="space-y-0.5">
                      {resumeData.skills.map((skillGroup: any, i: number) => (
                        <div key={i} className="leading-snug">
                          <span className="font-bold">{skillGroup.category}: </span>
                          <span>{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
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
                  <div className="mb-2">
                    {page.hasExperienceHeading && (
                      <SectionHeader 
                        title={isPage1 ? "Professional Experience" : "Professional Experience (Continued)"} 
                        sectionKey="experience" 
                      />
                    )}
                    
                    {page.experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-4">
                        <div className="font-bold">
                          {exp.company} {exp.location ? `| ${exp.location}` : ''} | {exp.duration}
                          {exp.isContinued && <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>}
                        </div>
                        {!exp.isContinued && (
                          <div className="mb-1 font-semibold text-slate-800">{exp.role}</div>
                        )}

                        <ul className="list-none mt-0.5 mb-1.5 m-0 space-y-1">
                          {exp.bullets.map((bullet: string, j: number) => (
                            <li key={j} className="flex gap-2">
                              <span className="shrink-0 font-medium">•</span>
                              <span className="text-justify">{renderWithBold(bullet)}</span>
                            </li>
                          ))}
                        </ul>

                        {!exp.isSplit && exp.environment && exp.environment.length > 0 && (
                          <div className="mt-1">
                            <span className="font-bold">Environment: </span>
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
                    <div className="space-y-1">
                      {page.education.map((edu: any, i: number) => (
                        <div key={i}>
                          <span className="font-bold">{edu.degree}</span> | {edu.institution} | {edu.year}
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
                    <div className="space-y-1">
                      {page.certifications.map((cert: any, i: number) => (
                        <div key={i}>
                          <span className="font-bold">{cert.name}</span> | {cert.issuer} | Earned {cert.year}
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
                <span>{profileData.full_name || 'Candidate'} — C2C Classic Resume</span>
                <span>Page {pageNumber} of {pages.length}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

C2CTemplate.displayName = 'C2CTemplate';
