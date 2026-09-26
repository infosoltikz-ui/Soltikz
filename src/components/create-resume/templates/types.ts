export interface ResumeExperience {
  role: string;
  company: string; // The primary company or prime vendor
  client?: string; // Specific end client if applicable (C2C)
  location?: string;
  duration: string; // Legacy format or formatted string
  startDate?: string; // ISO or standardized month/year
  endDate?: string;
  isCurrent?: boolean;
  environment?: string[]; // E.g., ['React', 'Node.js', 'AWS']
  bullets: string[];
  isContinued?: boolean;
  isSplit?: boolean;
}

export interface ResumeEducation {
  degree: string;
  major?: string;
  institution: string;
  location?: string;
  year: string; // Legacy format
  startYear?: string;
  endYear?: string;
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  year: string; // Earned year legacy format
  earnedMonth?: string;
  earnedYear?: string;
  expirationMonth?: string;
  expirationYear?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeSkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  resume_type?: 'c2c' | 'full-time';
  summary: string[];
  skills: ResumeSkillCategory[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
}

export interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  work_authorization?: string; // e.g., US Citizen, Green Card, H1B
  relocation?: string; // e.g., Yes, No, Open
  availability?: string; // e.g., 2 weeks, Immediate
}

export const getSummaryArray = (summary: any): string[] => {
  if (!summary) return [];
  let rawItems: string[] = [];
  
  if (Array.isArray(summary)) {
    rawItems = summary;
  } else if (typeof summary === 'string') {
    rawItems = [summary];
  } else {
    return [];
  }
  
  const result: string[] = [];
  
  rawItems.forEach(item => {
    if (typeof item !== 'string' || !item.trim()) return;
    
    // Split by newlines or bullet markers first
    const lines = item.split(/\n|•|;(?=\s*[A-Z])/).map(l => l.trim()).filter(Boolean);
    
    lines.forEach(line => {
      // Clean leading bullets or numbers like "1.", "-", "*", "•"
      const cleanedLine = line.replace(/^[-•*]\s*/, '').replace(/^\d+[\.\)]\s*/, '').trim();
      if (!cleanedLine) return;
      
      // If line is a long paragraph (> 130 chars) and contains sentence breaks (". "), split into sentences
      if (cleanedLine.length > 130 && cleanedLine.includes('. ')) {
        const sentences = cleanedLine
          .split(/(?<=\.)\s+(?=[A-Z])/)
          .map(s => s.trim().replace(/^[-•*]\s*/, '').replace(/^\d+[\.\)]\s*/, ''))
          .filter(Boolean);
        
        sentences.forEach(s => result.push(s));
      } else {
        result.push(cleanedLine);
      }
    });
  });
  
  return result;
};

export interface SectionStyleConfig {
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textTransform?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
}

export interface ResumeTemplateProps {
  resumeData: ResumeData;
  profileData: ProfileData;
  themeColor?: string;
  fontFamily?: string;
  sectionStyles?: Record<string, SectionStyleConfig>;
  activeSectionKey?: string | null;
  onSelectSection?: (sectionKey: string) => void;
}

export function splitExperiencesForTemplate(
  experiences: ResumeExperience[] | undefined,
  templateKey: 'classic' | 'modern' | 'banner' | 'certified' | 'sidebar' | 'c2c' | 'c2c-banner' | 'c2c-certified' | 'c2c-modern' | 'c2c-sidebar' | string,
  summary?: any
): { page1Experiences: ResumeExperience[]; page2Experiences: ResumeExperience[] } {
  const expList = experiences || [];
  if (expList.length === 0) {
    return { page1Experiences: [], page2Experiences: [] };
  }

  const summaryArray = getSummaryArray(summary);
  const summaryLength = summaryArray.join(' ').length;

  // Base bullet budget for Page 1 first experience based on template layout header size
  let maxBullets = 4; // Default for Classic ATS

  if (templateKey.includes('banner') || templateKey.includes('certified')) {
    // Banner and Certified templates have large headers/cert boxes (~150px)
    maxBullets = 2;
  } else if (templateKey.includes('modern') || templateKey.includes('sidebar')) {
    // Modern & Sidebar templates have ~120px headers
    maxBullets = 3;
  }

  // Adjust for summary text length
  if (summaryLength > 400 && maxBullets > 2) {
    maxBullets -= 1;
  } else if (summaryLength < 100 && maxBullets < 4 && !templateKey.includes('banner')) {
    maxBullets += 1;
  }

  const firstExp = expList[0];
  let page1Experiences: ResumeExperience[] = [];
  let page2Experiences: ResumeExperience[] = [];

  if (firstExp.bullets && firstExp.bullets.length > maxBullets) {
    page1Experiences = [{ ...firstExp, bullets: firstExp.bullets.slice(0, maxBullets) }];
    page2Experiences = [
      { ...firstExp, bullets: firstExp.bullets.slice(maxBullets), isContinued: true },
      ...expList.slice(1)
    ];
  } else {
    page1Experiences = [firstExp];
    page2Experiences = expList.slice(1);
  }

  return { page1Experiences, page2Experiences };
}

