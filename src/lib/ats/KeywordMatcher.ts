export class KeywordMatcher {
  private synonyms: Record<string, string[]> = {
    'react': ['reactjs', 'react.js', 'react js', 'react-js'],
    'node.js': ['node', 'nodejs', 'node js', 'node-js'],
    'next.js': ['nextjs', 'next js', 'next', 'next-js'],
    'vue.js': ['vuejs', 'vue js', 'vue', 'vue-js'],
    'javascript': ['js', 'es6', 'es7', 'ecmascript'],
    'typescript': ['ts'],
    'postgresql': ['postgres', 'postgre sql', 'psql'],
    'mysql': ['my sql'],
    'sql server': ['mssql', 'ms sql', 'microsoft sql'],
    'mongodb': ['mongo', 'mongo db'],
    'aws': ['amazon web services', 'amazon cloud'],
    'gcp': ['google cloud platform', 'google cloud'],
    'azure': ['microsoft azure'],
    'docker': ['docker container', 'dockerized'],
    'kubernetes': ['k8s', 'kube'],
    'rest api': ['restful api', 'rest apis', 'restful apis', 'rest', 'rest web services'],
    'graphql': ['graph ql'],
    'html': ['html5'],
    'css': ['css3'],
    'tailwind css': ['tailwind', 'tailwindcss', 'tailwind-css'],
    'ci/cd': ['cicd', 'continuous integration', 'continuous deployment', 'continuous delivery'],
    'git': ['github', 'gitlab', 'bitbucket', 'version control'], // loosely related for keywords
    'java': ['j2ee', 'core java'],
    'c#': ['c sharp', 'csharp'],
    'python': ['python3'],
    'golang': ['go', 'go language'],
    'machine learning': ['ml'],
    'artificial intelligence': ['ai'],
    'ui/ux': ['ui', 'ux', 'user interface', 'user experience'],
  };

  /**
   * Normalizes a keyword string into its canonical lowercase format
   * e.g. "React.js" -> "react"
   */
  public normalize(word: string): string {
    const lower = word.toLowerCase().trim();
    for (const [canonical, aliases] of Object.entries(this.synonyms)) {
      if (canonical === lower || aliases.includes(lower)) {
        return canonical;
      }
    }
    return lower;
  }

  /**
   * Scans a full text string for a keyword, considering synonyms.
   * Returns true if a match is found using word boundaries.
   */
  public hasKeyword(keyword: string, text: string): boolean {
    const normalizedTarget = this.normalize(keyword);
    const lowerText = text.toLowerCase();
    
    // Helper to safely check with word boundaries or space boundaries for symbols
    const checkMatch = (target: string) => {
      // Escape special regex characters in the target (like . or +)
      const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // If the target starts/ends with a word character, use \b. 
      // Otherwise, use negative lookaround to ensure it's not immediately surrounded by letters/numbers.
      const prefix = /^\w/.test(target) ? '\\b' : '(?<!\\w)';
      const suffix = /\w$/.test(target) ? '\\b' : '(?!\\w)';
      const regex = new RegExp(`${prefix}${escaped}${suffix}`);
      return regex.test(lowerText);
    };

    if (checkMatch(normalizedTarget)) {
      return true;
    }

    // Check aliases
    const aliases = this.synonyms[normalizedTarget] || [];
    for (const alias of aliases) {
      if (checkMatch(alias)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Counts how many unique REQUIRED vs PREFERRED skills are found in the resume text.
   */
  public analyzeSkills(
    required: string[],
    preferred: string[],
    resumeText: string
  ) {
    const matchedRequired = new Set<string>();
    const missingRequired = new Set<string>();
    
    const matchedPreferred = new Set<string>();
    const missingPreferred = new Set<string>();

    for (const req of required) {
      if (this.hasKeyword(req, resumeText)) {
        matchedRequired.add(req);
      } else {
        missingRequired.add(req);
      }
    }

    for (const pref of preferred) {
      if (this.hasKeyword(pref, resumeText)) {
        matchedPreferred.add(pref);
      } else {
        missingPreferred.add(pref);
      }
    }

    return {
      matchedRequired: Array.from(matchedRequired),
      missingRequired: Array.from(missingRequired),
      matchedPreferred: Array.from(matchedPreferred),
      missingPreferred: Array.from(missingPreferred),
    };
  }
}
