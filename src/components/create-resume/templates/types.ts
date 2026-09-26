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
