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

  // Max line capacity budget for Page 1 experience section
  // Printable A4 height = 1053px. Header + Summary + Skills take ~300px.
  // Remaining space = ~753px = ~34-36 printed lines.
  let maxP1Lines = 34;

  if (templateKey.includes('banner') || templateKey.includes('certified')) {
    maxP1Lines = 28;
  }

  if (summaryLength > 800) {
    maxP1Lines -= 2;
  } else if (summaryLength < 200) {
    maxP1Lines += 2;
  }

  let page1Exps: ResumeExperience[] = [];
  let page2Exps: ResumeExperience[] = [];
  let currentP1Lines = 0;
  let splitOccurred = false;

  for (let i = 0; i < expList.length; i++) {
    const exp = expList[i];
    if (splitOccurred) {
      page2Exps.push(exp);
      continue;
    }

    const expBullets = exp.bullets || [];
    // Calculate line cost: 2 lines for role title/company + ~1.1 lines per bullet
    const expLines = 2 + expBullets.length * 1.1;

    if (currentP1Lines + expLines <= maxP1Lines) {
      // Entire experience fits on Page 1
      page1Exps.push(exp);
      currentP1Lines += expLines;
    } else {
      // Experience doesn't fit completely on Page 1
      const remainingP1Lines = maxP1Lines - currentP1Lines - 2;
      const p1BulletsCount = Math.floor(remainingP1Lines / 1.1);

      if (p1BulletsCount >= 6 && expBullets.length > p1BulletsCount) {
        // Only split if we can keep AT LEAST 6 bullets on Page 1
        page1Exps.push({
          ...exp,
          bullets: expBullets.slice(0, p1BulletsCount),
          isSplit: true
        });
        page2Exps.push({
          ...exp,
          bullets: expBullets.slice(p1BulletsCount),
          isContinued: true
        });
        splitOccurred = true;
      } else {
        // If remaining space allows less than 6 bullets, move the WHOLE experience entry to Page 2
        page2Exps.push(exp);
        splitOccurred = true;
      }
    }
  }

  return { page1Experiences: page1Exps, page2Experiences: page2Exps };
}

