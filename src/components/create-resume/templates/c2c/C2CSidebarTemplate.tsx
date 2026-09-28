"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ResumeTemplateProps, getSummaryArray } from '../types';

interface PageData {
  header: boolean;
  summary: boolean;
  skills: boolean;
  experiences: any[];
  education: any[];
  certifications: any[];
  hasExperienceHeading: boolean;
  hasEducationHeading: boolean;
  hasCertificationsHeading: boolean;
}

export const C2CSidebarTemplate = React.forwardRef<HTMLDivElement, ResumeTemplateProps>(({
  resumeData,
  profileData,
  themeColor,
  fontFamily,
  sectionStyles,
  activeSectionKey,
  onSelectSection
}, ref) => {
  const compId = React.useId().replace(/:/g, '');
  const ACCENT = themeColor || '#0284c7'; // sky-600
  const TOP_BAR_COLOR = ACCENT;
  const selectedFont = fontFamily || 'Arial, Helvetica, sans-serif';

  const [pages, setPages] = useState<PageData[]>([{ header: true, summary: true, skills: true, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: false }]);
  const [isMeasured, setIsMeasured] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const measRef = useRef<HTMLDivElement>(null);

  // Trigger measurement when fonts load or data changes
  const dataHash = JSON.stringify({ resumeData, profileData, themeColor, fontFamily, sectionStyles });

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useLayoutEffect(() => {
    if (!measRef.current) return;

    const measRect = measRef.current.getBoundingClientRect();
    const trueScale = measRect.width / 794;

    const getElementHeight = (id: string) => {
      const el = document.getElementById(`${id}-${compId}`);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const mt = parseFloat(style.marginTop) || 0;
      const mb = parseFloat(style.marginBottom) || 0;
      
      const unscaledHeight = rect.height / trueScale;
      return unscaledHeight + mt + mb;
    };

    const MAX_CONTENT_HEIGHT = 1123 - 44 - 44 - 30 - 24 - 42; // 1123 - top_pad - bottom_pad - footer_height - mb-8 - top_bar
    let remainingHeight = MAX_CONTENT_HEIGHT;
    
    let currentPages: PageData[] = [];
    let currentPage: PageData = {
      header: false,
      summary: false,
      skills: false,
      experiences: [],
      education: [],
      certifications: [],
      hasExperienceHeading: false,
      hasEducationHeading: false,
      hasCertificationsHeading: false
    };

    const headerHeight = getElementHeight('meas-side-header');
    const summaryHeight = getElementHeight('meas-side-summary');
    const skillsHeight = getElementHeight('meas-side-skills');

    currentPage.header = true;
    currentPage.summary = true;
    currentPage.skills = true;
    remainingHeight -= (headerHeight + summaryHeight + skillsHeight);

    const expSectionHeadingHeight = getElementHeight('meas-side-exp-section-heading');

    if (resumeData.experience && resumeData.experience.length > 0) {
      currentPage.hasExperienceHeading = true;
      remainingHeight -= expSectionHeadingHeight;

      for (let i = 0; i < resumeData.experience.length; i++) {
        const exp = resumeData.experience[i];
        let currentExpHeaderH = getElementHeight(`meas-side-exp-${i}-header`);
        let currentExpObj = { ...exp, bullets: [], isContinued: false, isSplit: false };
        
        let fullHeaderH = currentExpHeaderH;
        if (exp.environment && exp.environment.length > 0) {
          fullHeaderH += getElementHeight(`meas-side-exp-${i}-env`);
        }

        if (remainingHeight < fullHeaderH && remainingHeight < MAX_CONTENT_HEIGHT) {
          currentPages.push(currentPage);
          currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: true, hasEducationHeading: false, hasCertificationsHeading: false };
          remainingHeight = MAX_CONTENT_HEIGHT - expSectionHeadingHeight;
          currentExpHeaderH = getElementHeight(`meas-side-exp-${i}-header-continued`);
        }

        const bullets = exp.bullets || [];
        for (let j = 0; j < bullets.length; j++) {
          const bulletH = getElementHeight(`meas-side-exp-${i}-bullet-${j}`);
          const UL_MARGIN = 6;
          let requiredSpace = currentExpObj.bullets.length === 0 ? currentExpHeaderH + bulletH + UL_MARGIN : bulletH;
          
          if (remainingHeight < requiredSpace) {
            if (currentExpObj.bullets.length > 0) {
              currentPage.experiences.push({ ...currentExpObj, isSplit: true });
              remainingHeight -= 16;
            }

            if (currentExpObj.bullets.length > 0 || remainingHeight < MAX_CONTENT_HEIGHT) {
              currentPages.push(currentPage);
              const transferExpHeading = currentPage.hasExperienceHeading && currentPage.experiences.length === 0;

              currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: transferExpHeading || true, hasEducationHeading: false, hasCertificationsHeading: false };
              remainingHeight = MAX_CONTENT_HEIGHT;
              if (currentPage.hasExperienceHeading) {
                 remainingHeight -= expSectionHeadingHeight;
              }

              const isActuallyContinued = currentExpObj.bullets.length > 0;
              currentExpObj = { ...exp, bullets: [], isContinued: isActuallyContinued, isSplit: false };
              currentExpHeaderH = getElementHeight(isActuallyContinued ? `meas-side-exp-${i}-header-continued` : `meas-side-exp-${i}-header`);
            }
          }
          currentExpObj.bullets.push(bullets[j]);
          remainingHeight -= requiredSpace;
        }

        if (exp.environment && exp.environment.length > 0) {
          const envHeight = getElementHeight(`meas-side-exp-${i}-env`);
          if (remainingHeight < envHeight && currentExpObj.bullets.length > 0) {
            currentPage.experiences.push({ ...currentExpObj, isSplit: true });
            currentPages.push(currentPage);
            currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: true, hasEducationHeading: false, hasCertificationsHeading: false };
            remainingHeight = MAX_CONTENT_HEIGHT - expSectionHeadingHeight;
            currentExpObj = { ...exp, bullets: [], isContinued: true, isSplit: false };
          }
          remainingHeight -= envHeight;
        }

        currentPage.experiences.push(currentExpObj);
        remainingHeight -= 20; // Extra margin between experiences
      }
    }

    if (resumeData.education && resumeData.education.length > 0) {
      const eduHeadingHeight = getElementHeight('meas-side-education-heading');
      currentPage.hasEducationHeading = true;
      remainingHeight -= eduHeadingHeight;

      if (remainingHeight < 40 && remainingHeight < MAX_CONTENT_HEIGHT) {
        currentPages.push(currentPage);
        currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: true, hasCertificationsHeading: false };
        remainingHeight = MAX_CONTENT_HEIGHT - eduHeadingHeight;
      }

      for (let i = 0; i < resumeData.education.length; i++) {
        const eduH = getElementHeight(`meas-side-edu-${i}`);
        if (remainingHeight < eduH) {
          currentPages.push(currentPage);
          currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: true, hasCertificationsHeading: false };
          remainingHeight = MAX_CONTENT_HEIGHT - eduHeadingHeight;
        }
        currentPage.education.push(resumeData.education[i]);
        remainingHeight -= eduH;
      }
      remainingHeight -= 16;
    }

    if (resumeData.certifications && resumeData.certifications.length > 0) {
      const certHeadingHeight = getElementHeight('meas-side-certifications-heading');
      currentPage.hasCertificationsHeading = true;
      remainingHeight -= certHeadingHeight;

      if (remainingHeight < 40 && remainingHeight < MAX_CONTENT_HEIGHT) {
        currentPages.push(currentPage);
        currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: true };
        remainingHeight = MAX_CONTENT_HEIGHT - certHeadingHeight;
      }

      for (let i = 0; i < resumeData.certifications.length; i++) {
        const certH = getElementHeight(`meas-side-cert-${i}`);
        if (remainingHeight < certH) {
          currentPages.push(currentPage);
          currentPage = { header: false, summary: false, skills: false, experiences: [], education: [], certifications: [], hasExperienceHeading: false, hasEducationHeading: false, hasCertificationsHeading: true };
          remainingHeight = MAX_CONTENT_HEIGHT - certHeadingHeight;
        }
        currentPage.certifications.push(resumeData.certifications[i]);
        remainingHeight -= certH;
      }
    }

    currentPages.push(currentPage);
    setPages(currentPages);
    setIsMeasured(true);

  }, [dataHash, fontsLoaded, compId]);

  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

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
      <div className="flex items-center mb-3 mt-3 break-inside-avoid">
        <h2 className="uppercase font-bold tracking-wider m-0" style={{ fontSize: '11pt', color: headerColor }}>
          {title}
        </h2>
        <div className="ml-4 flex-grow border-t-2" style={{ borderColor: headerColor, opacity: 0.2 }} />
      </div>
    );
  };

  const pageContainerClass = "resume-page bg-white w-[794px] min-h-[1123px] h-[1123px] max-h-[1123px] mx-auto shadow-xl border border-slate-200 text-black relative flex flex-col mb-8 print:mb-0 print:shadow-none print:border-none print:break-after-page overflow-hidden";
  const pageContainerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    fontFamily: selectedFont,
    color: '#000000',
    fontSize: '9.5pt',
    lineHeight: '1.4',
    padding: '44px 50px'
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
      <div id={`meas-side-header-${compId}`} className={getSectionWrapperClass('header')} style={getSectionStyle('header')}>
        <div className="flex justify-between items-end mb-4 break-inside-avoid">
          <div className="flex-1">
            <h1 className="font-extrabold uppercase tracking-tight m-0" style={{ fontSize: '26pt', color: '#111827', lineHeight: 1 }}>
              {profileData.full_name || 'JOHN DOE'}
            </h1>
            
            {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
              <div className="mt-3 font-semibold uppercase tracking-wider" style={{ fontSize: '8.5pt', color: ACCENT }}>
                {[
                  profileData.work_authorization && `Auth: ${profileData.work_authorization}`,
                  profileData.relocation && `Reloc: ${profileData.relocation}`,
                  profileData.availability && `Avail: ${profileData.availability}`
                ].filter(Boolean).join('  |  ')}
              </div>
            )}
          </div>
          <div className="text-right text-[9pt] font-medium text-slate-600 flex flex-col items-end gap-0.5 border-r-4 pr-3" style={{ borderColor: ACCENT }}>
            {profileData.location && <span>{profileData.location}</span>}
            {profileData.phone && <span>{profileData.phone}</span>}
            {profileData.email && <span>{profileData.email}</span>}
            {profileData.linkedin && <span>{profileData.linkedin}</span>}
          </div>
        </div>
      </div>

      {getSummaryArray(resumeData.summary).length > 0 && (
        <div id={`meas-side-summary-${compId}`} className={getSectionWrapperClass('summary')} style={getSectionStyle('summary')}>
          <div className="mb-4">
            <SectionHeader title="Professional Summary" sectionKey="summary" />
            <ul className="list-none m-0 space-y-1.5 text-justify pl-[20px]" style={{ fontSize: '9.5pt' }}>
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
        <div id={`meas-side-skills-${compId}`} className={getSectionWrapperClass('skills')} style={getSectionStyle('skills')}>
          <div className="mb-4">
            <SectionHeader title="Technical Skills" sectionKey="skills" />
            <div className="space-y-1 pl-[20px]" style={{ fontSize: '9.5pt' }}>
              {resumeData.skills.map((skillGroup: any, i: number) => (
                <div key={i} className="leading-snug flex">
                  <span className="font-bold w-[180px] shrink-0 text-black">{skillGroup.category}:</span>
                  <span className="text-slate-700">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id={`meas-side-exp-section-heading-${compId}`} className="mb-3">
        <SectionHeader title="Professional Experience" sectionKey="experience" />
      </div>

      {resumeData.experience?.map((exp: any, i: number) => (
        <div key={`exp-meas-${i}`} className="pl-[20px]">
          <div id={`meas-side-exp-${i}-header-${compId}`} className="mb-1">
            <div className="flex justify-between items-start leading-tight mb-0.5">
              <div className="font-bold text-black uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                {exp.company} {exp.location ? `| ${exp.location}` : ''}
              </div>
              <div className="font-bold text-slate-500 whitespace-nowrap ml-4 text-[9.5pt]">{exp.duration}</div>
            </div>
            <div className="font-bold text-black mb-1.5" style={{ fontSize: '10pt' }}>{exp.role}</div>
          </div>

          <div id={`meas-side-exp-${i}-header-continued-${compId}`} className="mb-1">
            <div className="flex justify-between items-start leading-tight mb-0.5">
              <div className="font-bold text-black uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                {exp.company} {exp.location ? `| ${exp.location}` : ''} <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>
              </div>
              <div className="font-bold text-slate-500 whitespace-nowrap ml-4 text-[9.5pt]">{exp.duration}</div>
            </div>
          </div>

          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="list-none mt-1.5 mb-2 m-0 space-y-1.5" style={{ fontSize: '9.5pt' }}>
              {exp.bullets.map((b: string, j: number) => (
                <li id={`meas-side-exp-${i}-bullet-${j}-${compId}`} key={`bullet-meas-${j}`} className="flex gap-2 text-justify">
                  <span className="shrink-0 font-bold text-slate-400">•</span>
                  <span className="text-slate-800">{renderWithBold(b)}</span>
                </li>
              ))}
            </ul>
          )}

          {exp.environment && exp.environment.length > 0 && (
            <div id={`meas-side-exp-${i}-env-${compId}`} className="mt-2 text-[9pt] border-l-2 pl-2" style={{ borderColor: ACCENT }}>
              <span className="font-bold text-black uppercase tracking-wider text-[8pt]">Environment: </span>
              <span className="text-slate-600">{exp.environment.join(', ')}</span>
            </div>
          )}
        </div>
      ))}

      {resumeData.education && resumeData.education.length > 0 && (
        <div id={`meas-side-education-${compId}`} className={getSectionWrapperClass('education')} style={getSectionStyle('education')}>
          <div className="mb-4">
            <div id={`meas-side-education-heading-${compId}`} className="mb-2">
              <SectionHeader title="Education" sectionKey="education" />
            </div>
            <div className="space-y-2 pl-[20px]" style={{ fontSize: '9.5pt' }}>
              {resumeData.education.map((edu: any, i: number) => (
                <div key={i} id={`meas-side-edu-${i}-${compId}`} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-black">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution} {edu.location ? `| ${edu.location}` : ''}</div>
                  </div>
                  <div className="font-semibold whitespace-nowrap ml-4 text-[9pt] text-slate-500">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div id={`meas-side-certifications-${compId}`} className={getSectionWrapperClass('certifications')} style={getSectionStyle('certifications')}>
          <div className="mb-4">
            <div id={`meas-side-certifications-heading-${compId}`} className="mb-2">
              <SectionHeader title="Certifications" sectionKey="certifications" />
            </div>
            <div className="grid grid-cols-1 gap-1.5 pl-[20px]" style={{ fontSize: '9.5pt' }}>
              {resumeData.certifications.map((cert: any, i: number) => (
                <div key={i} id={`meas-side-cert-${i}-${compId}`} className="flex">
                  <span className="font-bold text-black">{cert.name}</span>
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="text-slate-600">{cert.issuer}</span>
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="font-medium text-slate-500">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={ref} className="text-black bg-slate-50 print:bg-white flex flex-col print:block">
      {!isMeasured && measurementDOM}
      
      {isMeasured && pages.map((page, pageIndex) => (
        <div key={pageIndex} className={pageContainerClass} style={pageContainerStyle}>
          {/* Top Accent Bar */}
          <div 
            style={{ 
              backgroundColor: sectionStyles?.header?.color || TOP_BAR_COLOR, 
              height: '12px', 
              margin: '-44px -50px 30px -50px', 
              width: 'calc(100% + 100px)' 
            }} 
          />

          <div className="flex-1 flex flex-col">
            {page.header && (
              <div 
                onClick={() => onSelectSection?.('header')}
                className={getSectionWrapperClass('header')}
                style={getSectionStyle('header')}
              >
                <div className="flex justify-between items-end mb-4 break-inside-avoid">
                  <div className="flex-1">
                    <h1 className="font-extrabold uppercase tracking-tight m-0" style={{ fontSize: '26pt', color: '#111827', lineHeight: 1 }}>
                      {profileData.full_name || 'JOHN DOE'}
                    </h1>
                    
                    {(profileData.work_authorization || profileData.relocation || profileData.availability) && (
                      <div className="mt-3 font-semibold uppercase tracking-wider" style={{ fontSize: '8.5pt', color: ACCENT }}>
                        {[
                          profileData.work_authorization && `Auth: ${profileData.work_authorization}`,
                          profileData.relocation && `Reloc: ${profileData.relocation}`,
                          profileData.availability && `Avail: ${profileData.availability}`
                        ].filter(Boolean).join('  |  ')}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-[9pt] font-medium text-slate-600 flex flex-col items-end gap-0.5 border-r-4 pr-3" style={{ borderColor: ACCENT }}>
                    {profileData.location && <span>{profileData.location}</span>}
                    {profileData.phone && <span>{profileData.phone}</span>}
                    {profileData.email && <span>{profileData.email}</span>}
                    {profileData.linkedin && <span>{profileData.linkedin}</span>}
                  </div>
                </div>
              </div>
            )}

            {!page.header && (
              <div className="flex justify-between items-center pb-1.5 mb-3 border-b border-slate-300">
                <span className="font-bold uppercase tracking-wider text-slate-900" style={{ fontSize: '10pt' }}>
                  {profileData.full_name || 'JOHN DOE'} — Professional Experience (Cont.)
                </span>
                <span className="text-slate-400 text-[8.5pt]">Page {pageIndex + 1}</span>
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
                  <ul className="list-none m-0 space-y-1.5 text-justify pl-[20px]" style={{ fontSize: '9.5pt' }}>
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

            {page.skills && resumeData.skills && resumeData.skills.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('skills')}
                className={getSectionWrapperClass('skills')}
                style={getSectionStyle('skills')}
              >
                <div className="mb-4">
                  <SectionHeader title="Technical Skills" sectionKey="skills" />
                  <div className="space-y-1 pl-[20px]" style={{ fontSize: '9.5pt' }}>
                    {resumeData.skills.map((skillGroup: any, i: number) => (
                      <div key={i} className="leading-snug flex">
                        <span className="font-bold w-[180px] shrink-0 text-black">{skillGroup.category}:</span>
                        <span className="text-slate-700">{Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {page.experiences && page.experiences.length > 0 && (
              <div 
                onClick={() => onSelectSection?.('experience')}
                className={getSectionWrapperClass('experience')}
                style={getSectionStyle('experience')}
              >
                <div className="mb-4">
                  {page.hasExperienceHeading && (
                    <SectionHeader 
                      title={pageIndex === 0 && page.header ? "Professional Experience" : "Professional Experience (Continued)"} 
                      sectionKey="experience" 
                    />
                  )}
                  <div className="pl-[20px]">
                    {page.experiences.map((exp: any, i: number) => (
                      <div key={i} className="mb-5 break-inside-avoid relative">
                        <div className="flex justify-between items-start leading-tight mb-0.5">
                          <div className="font-bold text-black uppercase" style={{ fontSize: '10.5pt', color: ACCENT }}>
                            {exp.company} {exp.location ? `| ${exp.location}` : ''}
                            {exp.isContinued && <span className="italic font-normal text-slate-500 ml-2 normal-case">(Continued)</span>}
                          </div>
                          <div className="font-bold text-slate-500 whitespace-nowrap ml-4 text-[9.5pt]">{exp.duration}</div>
                        </div>
                        {!exp.isContinued && (
                          <div className="font-bold text-black mb-1.5" style={{ fontSize: '10pt' }}>{exp.role}</div>
                        )}

                        <ul className="list-none mt-1.5 mb-2 m-0 space-y-1.5" style={{ fontSize: '9.5pt' }}>
                          {exp.bullets.map((bullet: string, j: number) => (
                            <li key={j} className="flex gap-2 text-justify">
                              <span className="shrink-0 font-bold text-slate-400">•</span>
                              <span className="text-slate-800">{renderWithBold(bullet)}</span>
                            </li>
                          ))}
                        </ul>

                        {!exp.isSplit && exp.environment && exp.environment.length > 0 && (
                          <div className="mt-2 text-[9pt] border-l-2 pl-2" style={{ borderColor: ACCENT }}>
                            <span className="font-bold text-black uppercase tracking-wider text-[8pt]">Environment: </span>
                            <span className="text-slate-600">{exp.environment.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
                    <SectionHeader title="Education" sectionKey="education" />
                  )}
                  <div className="space-y-2 pl-[20px]" style={{ fontSize: '9.5pt' }}>
                    {page.education.map((edu: any, i: number) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-black">{edu.degree}</div>
                          <div className="text-slate-600">{edu.institution} {edu.location ? `| ${edu.location}` : ''}</div>
                        </div>
                        <div className="font-semibold whitespace-nowrap ml-4 text-[9pt] text-slate-500">{edu.year}</div>
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
                    <SectionHeader title="Certifications" sectionKey="certifications" />
                  )}
                  <div className="grid grid-cols-1 gap-1.5 pl-[20px]" style={{ fontSize: '9.5pt' }}>
                    {page.certifications.map((cert: any, i: number) => (
                      <div key={i} className="flex">
                        <span className="font-bold text-black">{cert.name}</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="text-slate-600">{cert.issuer}</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="font-medium text-slate-500">{cert.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-between items-center text-[8.5pt] text-slate-400 mt-auto select-none shrink-0 border-t border-slate-200">
            <span>{profileData.full_name || 'Candidate'} — C2C Left-Aligned Resume</span>
            <span>Page {pageIndex + 1} of {pages.length}</span>
          </div>
        </div>
      ))}
    </div>
  );
});

C2CSidebarTemplate.displayName = 'C2CSidebarTemplate';
