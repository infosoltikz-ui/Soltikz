export interface ResumeData {
  summary?: string[];
  skills?: { category: string; items: string[] }[];
  experience?: {
    id?: string;
    role?: string;
    company?: string;
    duration?: string;
    environment?: string[] | null;
    bullets?: string[];
  }[];
  education?: {
    degree?: string;
    institution?: string;
    location?: string;
    year?: string;
  }[];
  certifications?: {
    name?: string;
    issuer?: string;
    year?: string;
  }[];
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
}

export interface ParsedJobDescription {
  jobTitle: string;
  companyName: string | null;
  experienceLevel: string;
  requiredSkills: string[];
  preferredSkills?: string[]; // Adding this as requested by the user
  technologies: string[];
  responsibilities: string[];
  softSkills: string[];
  certifications: string[];
  industry: string | null;
  priorityKeywords: string[];
}

export interface ATSMatchResult {
  engineVersion: string;
  overallScore: number;
  confidence: number;
  
  atsCompatibility: {
    score: number;
    issues: string[];
  };
  
  jobMatch: {
    score: number;
  };

  breakdown: {
    requiredSkills: number;
    preferredSkills: number;
    semanticSkills: number;
    experience: number;
    title: number;
    education: number;
    certifications: number;
    responsibilities: number;
    formatting: number;
  };

  matchedRequirements: string[];
  missingRequiredRequirements: string[];
  missingPreferredRequirements: string[];
  partialMatches: string[];
  formattingIssues: string[];
  evidence: string[];
}
