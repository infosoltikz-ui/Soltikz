import { ResumeRenderer } from '../ResumeRenderer';
import { ModernTemplate } from './ModernTemplate';
import { BannerTemplate } from './BannerTemplate';
import { CertifiedTemplate } from './CertifiedTemplate';
import { SidebarTemplate } from './SidebarTemplate';
import { C2CTemplate } from './C2CTemplate';
import type { ResumeTemplateProps } from './types';
import React from 'react';

export interface ResumeTemplateMeta {
  id: string;
  name: string;
  description: string;
  component: React.ForwardRefExoticComponent<ResumeTemplateProps & React.RefAttributes<HTMLDivElement>>;
}

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  {
    id: 'classic',
    name: 'Classic ATS',
    description: 'Strictly black & white, highly readable standard layout optimized for Applicant Tracking Systems.',
    component: ResumeRenderer,
  },
  {
    id: 'modern',
    name: 'Modern Accent',
    description: 'Centered teal header, single-paragraph summary, two-column skills, and bold text support.',
    component: ModernTemplate,
  },
  {
    id: 'banner',
    name: 'Professional Banner',
    description: 'Large colored header block, serif typography, and clean unlined section headers.',
    component: BannerTemplate,
  },
  {
    id: 'certified',
    name: 'Certified Professional',
    description: '2-column header with highlighted certifications, heavily structured borders, and grid-based skills.',
    component: CertifiedTemplate,
  },
  {
    id: 'sidebar',
    name: 'Left-Aligned Accent',
    description: 'Thick top color bar, left-aligned section headers, and indented content.',
    component: SidebarTemplate,
  },
  {
    id: 'c2c',
    name: 'C2C Contractor',
    description: 'ATS-optimized, highly structured layout explicitly designed for IT contracting and vendor submissions.',
    component: C2CTemplate,
  },
];

export const DEFAULT_TEMPLATE_ID = RESUME_TEMPLATES[0].id;

export function getTemplateById(id: string | null | undefined): ResumeTemplateMeta {
  return RESUME_TEMPLATES.find((t) => t.id === id) ?? RESUME_TEMPLATES[0];
}
