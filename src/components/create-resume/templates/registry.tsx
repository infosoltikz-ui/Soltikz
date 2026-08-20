import { ResumeRenderer } from '../ResumeRenderer';
import { ModernTemplate } from './ModernTemplate';
import { BannerTemplate } from './BannerTemplate';
import { CertifiedTemplate } from './CertifiedTemplate';
import { SidebarTemplate } from './SidebarTemplate';
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
    description: 'Centered header, black & white, plain section dividers. Maximum ATS compatibility.',
    component: ResumeRenderer,
  },
  {
    id: 'modern',
    name: 'Modern Accent',
    description: 'Left-aligned header with a teal accent, two-column skills layout.',
    component: ModernTemplate,
  },
  {
    id: 'banner',
    name: 'Banner Header',
    description: 'Bold color block header with centered name, clean single-column body.',
    component: BannerTemplate,
  },
  {
    id: 'certified',
    name: 'Certified Professional',
    description: 'Certification badges in the header, skills shown in a bordered table.',
    component: CertifiedTemplate,
  },
  {
    id: 'sidebar',
    name: 'Sidebar Profile',
    description: 'Dark sidebar with contact, skills and education; experience on the main panel.',
    component: SidebarTemplate,
  },
];

export const DEFAULT_TEMPLATE_ID = RESUME_TEMPLATES[0].id;

export function getTemplateById(id: string | null | undefined): ResumeTemplateMeta {
  return RESUME_TEMPLATES.find((t) => t.id === id) ?? RESUME_TEMPLATES[0];
}
