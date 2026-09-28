import { ResumeData } from './types';

export class FormatAnalyzer {
  
  public analyzeFormatting(resume: ResumeData) {
    let score = 100;
    const issues: string[] = [];
    const evidence: string[] = [];

    // 1. Check sections presence
    if (!resume.summary || resume.summary.length === 0) {
      score -= 10;
      issues.push("Missing Professional Summary section.");
      evidence.push("ATS parsers rely on standard sections. A missing summary reduces context.");
    }

    if (!resume.skills || resume.skills.length === 0) {
      score -= 15;
      issues.push("Missing Skills section.");
      evidence.push("Hard skills extraction is severely impaired without a dedicated skills block.");
    }

    if (!resume.experience || resume.experience.length === 0) {
      score -= 20;
      issues.push("Missing Experience section.");
      evidence.push("ATS cannot establish work history timeline.");
    }

    if (!resume.education || resume.education.length === 0) {
      score -= 10;
      issues.push("Missing Education section.");
      evidence.push("Basic educational qualifications cannot be verified.");
    }

    // 2. Check contact info
    if (!resume.personalInfo?.email && !resume.personalInfo?.phone) {
      score -= 20;
      issues.push("Missing contact information (Email/Phone).");
      evidence.push("ATS drops profiles that lack contact parsing.");
    }

    // 3. Bullet length analysis (Readability / Keyword stuffing check)
    if (resume.experience) {
      let excessivelyLongBullets = 0;
      for (const exp of resume.experience) {
        if (exp.bullets) {
          for (const bullet of exp.bullets) {
            if (bullet.length > 300) excessivelyLongBullets++; // Too long
          }
        }
      }
      if (excessivelyLongBullets > 3) {
        score -= 5;
        issues.push("Excessively long bullet points detected.");
        evidence.push(`Found ${excessivelyLongBullets} bullets over 300 characters. Affects readability score.`);
      }
    }

    if (score === 100) {
      evidence.push("Resume has a perfectly standard structure with all expected sections and contact info present.");
    }

    return {
      score: Math.max(0, score),
      issues,
      evidence
    };
  }
}
