import { ResumeData, ParsedJobDescription } from './types';

export class ExperienceMatcher {
  
  /**
   * Evaluates the candidate's years of experience based on the JD.
   */
  public analyzeExperience(jd: ParsedJobDescription, resume: ResumeData) {
    const evidence: string[] = [];
    
    // Parse JD required years of experience (e.g. "5+ years", "Mid")
    let requiredYears = 0;
    const expStr = jd.experienceLevel?.toLowerCase() || '';
    const numMatch = expStr.match(/(\d+)/);
    if (numMatch) {
      requiredYears = parseInt(numMatch[1], 10);
    } else {
      if (expStr.includes('senior') || expStr.includes('sr')) requiredYears = 5;
      else if (expStr.includes('mid') || expStr.includes('intermediate')) requiredYears = 3;
      else if (expStr.includes('junior') || expStr.includes('entry')) requiredYears = 1;
    }

    // Calculate actual years of experience from Resume
    let candidateYears = 0;
    let hasExperience = false;
    
    if (resume.experience && resume.experience.length > 0) {
      hasExperience = true;
      for (const exp of resume.experience) {
        if (!exp.duration) continue;
        
        // Very basic parsing: "Jan 2018 - Present" or "2018-2021"
        const years = exp.duration.match(/\b(19|20)\d{2}\b/g);
        if (years && years.length >= 1) {
          const startYear = parseInt(years[0], 10);
          let endYear = new Date().getFullYear();
          if (years.length >= 2) {
            endYear = parseInt(years[1], 10);
          } else if (exp.duration.toLowerCase().includes('present') || exp.duration.toLowerCase().includes('current')) {
            endYear = new Date().getFullYear();
          }
          
          const duration = Math.max(0, endYear - startYear);
          candidateYears += duration;
        }
      }
    }

    // Special case: if candidate years is 0 but they have experience entries, we might just have failed to parse their weird date format.
    // We give them a minimum of 1 year per entry as a fallback heuristic.
    if (candidateYears === 0 && hasExperience && resume.experience) {
       candidateYears = resume.experience.length * 1.5;
       evidence.push(`Estimated ~${candidateYears} years of experience based on ${resume.experience.length} roles (exact dates unparseable).`);
    } else {
       evidence.push(`Calculated exactly ${candidateYears} years of experience from resume dates.`);
    }

    // Calculate Score (0-100)
    let score = 0;
    if (requiredYears === 0) {
      // JD doesn't specify strictly, give full marks if they have any experience
      score = hasExperience ? 100 : 70;
      evidence.push(`JD does not strictly specify numeric years; granting standard baseline.`);
    } else {
      evidence.push(`JD requires ${requiredYears} years of experience.`);
      if (candidateYears >= requiredYears) {
        score = 100;
        evidence.push(`Candidate meets or exceeds required experience (${candidateYears} >= ${requiredYears}).`);
      } else if (candidateYears > 0) {
        score = Math.floor((candidateYears / requiredYears) * 100);
        evidence.push(`Candidate falls short of required experience (${candidateYears} < ${requiredYears}).`);
      } else {
        score = 0;
        evidence.push(`No valid experience dates found to satisfy ${requiredYears} years requirement.`);
      }
    }

    return { score, candidateYears, requiredYears, evidence };
  }
}
