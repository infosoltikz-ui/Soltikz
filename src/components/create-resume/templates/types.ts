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

export interface ResumeTemplateProps {
  resumeData: ResumeData;
  profileData: ProfileData;
  themeColor?: string;
  fontFamily?: string;
}
