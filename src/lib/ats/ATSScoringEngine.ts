import { ATSAnalysisOptions, ATSMatchResult, ParsedJobDescription, ResumeData } from './types';
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
    const partialMatches: string[] = []; // for future semantic mappings

    // 1. Flatten resume text for keyword search
    const resumeText = this.flattenResume(resume);

    // 2. Formatting & ATS Safety
    const formatAnalysis = this.formatAnalyzer.analyzeFormatting(resume);
    evidence.push(...formatAnalysis.evidence);

    // 3. Keyword/Skills Analysis
    const requiredSkills = jd.requiredSkills || [];
    const preferredSkills = jd.preferredSkills || jd.technologies || []; // fallback to tech if preferred not defined by AI
    
    // Separate Priority keywords into required if not there
    const priorityKws = jd.priorityKeywords || [];
    for (const kw of priorityKws) {
      if (!requiredSkills.includes(kw) && !preferredSkills.includes(kw)) {
        requiredSkills.push(kw);
      }
    }

    const skillsAnalysis = this.keywordMatcher.analyzeSkills(requiredSkills, preferredSkills, resumeText);
    
    // Calculate Skills Scores
    let requiredScore = 0;
    if (requiredSkills.length > 0) {
      requiredScore = (skillsAnalysis.matchedRequired.length / requiredSkills.length) * 100;
      evidence.push(`Found ${skillsAnalysis.matchedRequired.length}/${requiredSkills.length} Required Skills.`);
    } else {
      requiredScore = 100; // No requirements = perfect match
      evidence.push(`No required skills strictly specified in JD.`);
    }

    let preferredScore = 0;
    if (preferredSkills.length > 0) {
      preferredScore = (skillsAnalysis.matchedPreferred.length / preferredSkills.length) * 100;
      evidence.push(`Found ${skillsAnalysis.matchedPreferred.length}/${preferredSkills.length} Preferred Skills.`);
    } else {
      preferredScore = 100;
    }

    // 4. Semantic / Domain Skills (Using priority keywords or broad domain matches)
    // For this deterministic engine, we assign semantic score based on priority keyword density
    let semanticScore = 100;
    if (priorityKws.length > 0) {
      const semAnalysis = this.keywordMatcher.analyzeSkills(priorityKws, [], resumeText);
      semanticScore = (semAnalysis.matchedRequired.length / priorityKws.length) * 100;
      evidence.push(`Semantic core density: ${semAnalysis.matchedRequired.length}/${priorityKws.length} priority markers found.`);
    }

    // 5. Experience Match
    const expAnalysis = this.experienceMatcher.analyzeExperience(jd, resume);
    evidence.push(...expAnalysis.evidence);

    // 6. Title Match
    let titleScore = 0;
    if (jd.jobTitle && resume.experience && resume.experience.length > 0) {
      const jdTitleLower = jd.jobTitle.toLowerCase();
      // Check last 2 roles
      const recentRoles = resume.experience.slice(0, 2).map(r => r.role?.toLowerCase() || '');
      let titleMatched = false;
      for (const r of recentRoles) {
        if (r.includes(jdTitleLower) || jdTitleLower.includes(r)) {
          titleMatched = true;
          break;
        }
      }
      titleScore = titleMatched ? 100 : 50; // Give 50 if they have experience but title doesn't perfectly align (could be semantic)
      if (titleMatched) {
        evidence.push(`Candidate recent job title strongly matches JD title "${jd.jobTitle}".`);
      } else {
        evidence.push(`Candidate recent job titles do not exactly match "${jd.jobTitle}".`);
      }
    } else {
      titleScore = 80; // neutral fallback
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

    // Overall Score (e.g. 30% ATS parsing + 70% Job Match)
    const overallScore = Math.round((atsCompatibilityScore * 0.3) + (jobMatchScore * 0.7));

    // Confidence
    // Confidence drops if JD is very sparse or Resume is very sparse
    let confidence = 100;
    if (requiredSkills.length === 0) confidence -= 20;
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
        score: jobMatchScore
      },

      breakdown: {
        requiredSkills: Math.round(requiredScore),
        preferredSkills: Math.round(preferredScore),
        semanticSkills: Math.round(semanticScore),
        experience: Math.round(expAnalysis.score),
        title: Math.round(titleScore),
        education: 100, // Baseline for deterministic model
        certifications: 100,
        responsibilities: 100,
        formatting: Math.round(formatAnalysis.score),
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
    if (resume.summary) parts.push(...resume.summary);
    if (resume.skills) {
      resume.skills.forEach(s => parts.push(...s.items));
    }
    if (resume.experience) {
      resume.experience.forEach(e => {
        if (e.role) parts.push(e.role);
        if (e.bullets) parts.push(...e.bullets);
        if (e.environment) parts.push(...e.environment);
      });
    }
    if (resume.education) {
      resume.education.forEach(e => {
        if (e.degree) parts.push(e.degree);
      });
    }
    return parts.join('\n');
  }
}
