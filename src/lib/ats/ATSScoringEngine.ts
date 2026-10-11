import { ATSMatchResult, ParsedJobDescription, ResumeData } from './types';
import { KeywordMatcher } from './KeywordMatcher';
import { ExperienceMatcher } from './ExperienceMatcher';
import { FormatAnalyzer } from './FormatAnalyzer';

const ENGINE_VERSION = "2.0.0";

const SCORING_CONFIG = {
  // ATS Compatibility Breakdown (Total 100 points internally)
  formatting: 100, // Format safety

  // Job Match Breakdown (Total 100 points internally)
  requiredSkills: 40,
  preferredSkills: 15,
  semanticSkills: 15,
  experience: 20,
  title: 10,
};

export class ATSScoringEngine {
  private keywordMatcher = new KeywordMatcher();
  private experienceMatcher = new ExperienceMatcher();
  private formatAnalyzer = new FormatAnalyzer();

  public evaluate(jd: ParsedJobDescription, resume: ResumeData): ATSMatchResult {
    const evidence: string[] = [];
    const partialMatches: string[] = [];

    // 1. Flatten resume text for keyword search
    const resumeText = this.flattenResume(resume);

    // 2. Formatting & ATS Safety
    const formatAnalysis = this.formatAnalyzer.analyzeFormatting(resume);
    evidence.push(...formatAnalysis.evidence);

    // 3. Keyword/Skills Analysis
    const rawRequired = jd.requiredSkills || [];
    const rawPreferred = jd.preferredSkills || [];
    const rawTechnologies = jd.technologies || [];
    const rawPriority = jd.priorityKeywords || [];

    // Helper: A clean skill should be concise (1-4 words, max 45 chars) and not a full job title or sentence
    const isCleanSkill = (term: string) => {
      if (!term || typeof term !== 'string') return false;
      const trimmed = term.trim();
      if (trimmed.length < 2 || trimmed.length > 45) return false;
      if (jd.jobTitle && trimmed.toLowerCase() === jd.jobTitle.toLowerCase()) return false;
      const words = trimmed.split(/\s+/);
      return words.length <= 4;
    };

    const requiredSkillsSet = new Set<string>();
    const preferredSkillsSet = new Set<string>();

    for (const req of rawRequired) {
      if (isCleanSkill(req)) requiredSkillsSet.add(req.trim());
    }

    for (const pref of rawPreferred) {
      if (isCleanSkill(pref)) preferredSkillsSet.add(pref.trim());
    }

    // Add technologies to required skills if not marked as preferred
    for (const tech of rawTechnologies) {
      if (isCleanSkill(tech) && !preferredSkillsSet.has(tech.trim())) {
        requiredSkillsSet.add(tech.trim());
      }
    }

    // Add concise priority keywords to required skills if not already present
    for (const kw of rawPriority) {
      if (isCleanSkill(kw) && !preferredSkillsSet.has(kw.trim())) {
        requiredSkillsSet.add(kw.trim());
      }
    }

    const finalRequired = Array.from(requiredSkillsSet);
    const finalPreferred = Array.from(preferredSkillsSet);

    const skillsAnalysis = this.keywordMatcher.analyzeSkills(finalRequired, finalPreferred, resumeText);
    
    // Calculate Skills Scores
    let requiredScore = 0;
    if (finalRequired.length > 0) {
      requiredScore = Math.round((skillsAnalysis.matchedRequired.length / finalRequired.length) * 100);
      evidence.push(`Found ${skillsAnalysis.matchedRequired.length}/${finalRequired.length} Required Skills.`);
      
      if (skillsAnalysis.missingRequired.length > 0) {
        evidence.push(`CRITICAL GAP: Missing ${skillsAnalysis.missingRequired.length} required skills (${skillsAnalysis.missingRequired.join(', ')}).`);
      }
    } else {
      requiredScore = 100;
      evidence.push(`No required skills strictly specified in JD.`);
    }

    let preferredScore = 0;
    if (finalPreferred.length > 0) {
      preferredScore = Math.round((skillsAnalysis.matchedPreferred.length / finalPreferred.length) * 100);
      evidence.push(`Found ${skillsAnalysis.matchedPreferred.length}/${finalPreferred.length} Preferred Skills.`);
    } else {
      preferredScore = 100;
    }

    // 4. Semantic / Domain Skills (Using priority keywords and domain responsibilities)
    let semanticScore = 100;
    const semanticTargets = rawPriority.length > 0 ? rawPriority : (jd.responsibilities || []);
    if (semanticTargets.length > 0) {
      const semAnalysis = this.keywordMatcher.analyzeSkills(semanticTargets, [], resumeText);
      const semMatched = semAnalysis.matchedRequired.length;
      semanticScore = Math.round((semMatched / semanticTargets.length) * 100);
      evidence.push(`Semantic core density: ${semMatched}/${semanticTargets.length} domain & priority markers verified.`);
    }

    // 5. Experience Match
    const expAnalysis = this.experienceMatcher.analyzeExperience(jd, resume);
    evidence.push(...expAnalysis.evidence);

    // 6. Title Match
    let titleScore = 75; // reasonable baseline for transferable skill sets
    if (jd.jobTitle && resume.experience && resume.experience.length > 0) {
      const jdTitleLower = jd.jobTitle.toLowerCase();
      const coreJdRole = jdTitleLower.replace(/\b(senior|junior|lead|staff|principal|sr\.|jr\.)\b/g, '').trim();
      const recentRoles = resume.experience.slice(0, 3).map(r => (r.role || '').toLowerCase());
      
      let titleMatched = false;
      for (const r of recentRoles) {
        const cleanR = r.replace(/\b(senior|junior|lead|staff|principal|sr\.|jr\.)\b/g, '').trim();
        if (r.includes(jdTitleLower) || jdTitleLower.includes(r) || (coreJdRole && cleanR.includes(coreJdRole)) || (cleanR && coreJdRole.includes(cleanR))) {
          titleMatched = true;
          break;
        }
      }
      titleScore = titleMatched ? 100 : 70;
      if (titleMatched) {
        evidence.push(`Candidate recent job title strongly matches target JD title "${jd.jobTitle}".`);
      } else {
        evidence.push(`Candidate past titles show transferable experience for "${jd.jobTitle}".`);
      }
    } else {
      titleScore = 85;
    }

    // ============================================
    // AGGREGATION
    // ============================================

    // ATS Compatibility Score
    const atsCompatibilityScore = Math.round(formatAnalysis.score);

    // Job Match Score (Weighted)
    const jobMatchScore = Math.round(
      (requiredScore * (SCORING_CONFIG.requiredSkills / 100)) +
      (preferredScore * (SCORING_CONFIG.preferredSkills / 100)) +
      (semanticScore * (SCORING_CONFIG.semanticSkills / 100)) +
      (expAnalysis.score * (SCORING_CONFIG.experience / 100)) +
      (titleScore * (SCORING_CONFIG.title / 100))
    );

    // Overall Score (e.g. 20% ATS formatting safety + 80% Job Match)
    const overallScore = Math.round((atsCompatibilityScore * 0.2) + (jobMatchScore * 0.8));

    // Confidence
    let confidence = 100;
    if (finalRequired.length === 0) confidence -= 20;
    if (expAnalysis.requiredYears === 0) confidence -= 10;
    if (!resume.experience || resume.experience.length === 0) confidence -= 20;

    return {
      engineVersion: ENGINE_VERSION,
      overallScore: Math.max(0, Math.min(100, overallScore)),
      confidence: Math.max(0, confidence),
      
      atsCompatibility: {
        score: atsCompatibilityScore,
        issues: formatAnalysis.issues
      },
      
      jobMatch: {
        score: Math.max(0, Math.min(100, jobMatchScore))
      },

      breakdown: {
        requiredSkills: Math.max(0, Math.min(100, Math.round(requiredScore))),
        preferredSkills: Math.max(0, Math.min(100, Math.round(preferredScore))),
        semanticSkills: Math.max(0, Math.min(100, Math.round(semanticScore))),
        experience: Math.max(0, Math.min(100, Math.round(expAnalysis.score))),
        title: Math.max(0, Math.min(100, Math.round(titleScore))),
        education: 100,
        certifications: 100,
        responsibilities: Math.max(0, Math.min(100, Math.round(semanticScore))),
        formatting: Math.max(0, Math.min(100, Math.round(formatAnalysis.score))),
      },

      matchedRequirements: [...skillsAnalysis.matchedRequired, ...skillsAnalysis.matchedPreferred],
      missingRequiredRequirements: skillsAnalysis.missingRequired,
      missingPreferredRequirements: skillsAnalysis.missingPreferred,
      partialMatches,
      formattingIssues: formatAnalysis.issues,
      evidence
    };
  }

  private flattenResume(resume: ResumeData): string {
    const parts: string[] = [];
    if (resume.summary) {
      if (Array.isArray(resume.summary)) parts.push(...resume.summary);
      else if (typeof resume.summary === 'string') parts.push(resume.summary);
    }
    if (resume.skills) {
      resume.skills.forEach(s => {
        if (s.category) parts.push(s.category);
        if (Array.isArray(s.items)) parts.push(...s.items);
        else if (Array.isArray((s as any).skills)) parts.push(...(s as any).skills);
        else if (typeof s === 'string') parts.push(s);
      });
    }
    if (resume.experience) {
      resume.experience.forEach(e => {
        if (e.role) parts.push(e.role);
        if (e.company) parts.push(e.company);
        if (Array.isArray(e.bullets)) parts.push(...e.bullets);
        if (Array.isArray(e.environment)) parts.push(...e.environment);
      });
    }
    if (resume.education) {
      resume.education.forEach(e => {
        if (e.degree) parts.push(e.degree);
        if (e.institution) parts.push(e.institution);
      });
    }
    if (resume.certifications) {
      resume.certifications.forEach(c => {
        if (c.name) parts.push(c.name);
        if (c.issuer) parts.push(c.issuer);
      });
    }
    return parts.join('\n').replace(/\*\*/g, '');
  }
}
