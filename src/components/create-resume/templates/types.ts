export interface ResumeData {
  summary: string[];
  skills: { category: string; items: string[] }[];
  experience: { role: string; company: string; duration: string; environment?: string[]; bullets: string[] }[];
  education: { degree: string; institution: string; year: string }[];
  certifications: { name: string; issuer: string; year: string }[];
}

export interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

export interface ResumeTemplateProps {
  resumeData: ResumeData;
  profileData: ProfileData;
}
