export class KeywordMatcher {
  private synonyms: Record<string, string[]> = {
    'react': ['reactjs', 'react.js', 'react js', 'react-js', 'react native'],
    'react.js': ['react', 'reactjs', 'react.js', 'react js', 'react-js', 'react native'],
    'node.js': ['node', 'nodejs', 'node js', 'node-js', 'express', 'express.js', 'expressjs'],
    'next.js': ['nextjs', 'next js', 'next', 'next-js'],
    'vue.js': ['vuejs', 'vue js', 'vue', 'vue-js'],
    'angular': ['angular.js', 'angularjs', 'angular 2+'],
    'javascript': ['js', 'es6', 'es7', 'ecmascript', 'modern javascript'],
    'typescript': ['ts'],
    'postgresql': ['postgres', 'postgre sql', 'psql'],
    'mysql': ['my sql'],
    'sql server': ['mssql', 'ms sql', 'microsoft sql'],
    'mongodb': ['mongo', 'mongo db'],
    'dynamodb': ['amazon dynamodb', 'aws dynamodb'],
    'redis': ['redis cache', 'redis db'],
    'aws': ['amazon web services', 'amazon cloud', 'aws cloud', 'aws ec2', 'aws s3', 'aws rds', 'aws lambda', 'aws eks'],
    'gcp': ['google cloud platform', 'google cloud'],
    'azure': ['microsoft azure', 'azure cloud'],
    'docker': ['docker container', 'dockerized', 'containerization', 'containers'],
    'kubernetes': ['k8s', 'kube', 'container orchestration', 'eks', 'aks', 'gke'],
    'rest api': ['restful api', 'rest apis', 'restful apis', 'rest', 'rest web services', 'restful web services', 'api design', 'restful'],
    'rest apis': ['rest api', 'rest apis', 'restful api', 'restful apis', 'rest', 'rest web services', 'restful web services', 'api design', 'restful'],
    'graphql': ['graph ql'],
    'html': ['html5'],
    'css': ['css3'],
    'tailwind css': ['tailwind', 'tailwindcss', 'tailwind-css'],
    'ci/cd': ['cicd', 'ci-cd', 'continuous integration', 'continuous deployment', 'continuous delivery', 'ci/cd pipelines'],
    'git': ['github', 'gitlab', 'bitbucket', 'version control'],
    'java': ['j2ee', 'core java', 'spring', 'spring boot'],
    'c#': ['c sharp', 'csharp', '.net', '.net core', 'dotnet'],
    'python': ['python3', 'python'],
    'golang': ['go', 'go language'],
    'machine learning': ['ml'],
    'artificial intelligence': ['ai'],
    'ui/ux': ['ui', 'ux', 'user interface', 'user experience'],
    'full stack developer': ['full stack developer', 'full stack engineer', 'full stack', 'full-stack', 'fullstack'],
    'responsive uis': ['responsive ui', 'responsive uis', 'responsive web', 'responsive design', 'responsive interfaces', 'responsive'],
    'banking platforms': ['banking platforms', 'banking platform', 'banking', 'fintech', 'financial platforms', 'banking systems', 'financial systems'],
    'financial domain experience': ['financial domain experience', 'financial domain', 'finance domain', 'financial', 'finance', 'banking domain', 'banking'],
    'microservices architecture': ['microservices', 'microservice', 'microservices architecture', 'distributed microservices', 'microservice architecture'],
    'agile/scrum': ['agile', 'scrum', 'agile teams', 'agile/scrum', 'scrum methodology'],
    'devops': ['devops', 'devsecops', 'cloud infrastructure', 'site reliability engineering', 'sre'],
    'iac': ['iac', 'infrastructure as code', 'terraform', 'cloudformation'],
    'terraform': ['hashicorp terraform', 'iac'],
    'ansible': ['ansible playbooks', 'configuration management'],
    'jenkins': ['jenkins ci', 'jenkins pipeline'],
    'monitoring': ['prometheus', 'grafana', 'datadog', 'cloudwatch', 'elk stack', 'kibana']
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
   * Scans a full text string for a keyword, considering synonyms, plurals, and sub-phrases.
   */
  public hasKeyword(keyword: string, rawText: string): boolean {
    if (!keyword || !rawText) return false;
    
    // Clean markdown bold (**) and extra whitespace
    const cleanText = rawText.replace(/\*\*/g, '').toLowerCase();
    const cleanKeyword = keyword.replace(/\*\*/g, '').trim().toLowerCase();

    const normalizedTarget = this.normalize(cleanKeyword);

    const checkMatch = (target: string) => {
      if (!target) return false;
      const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const prefix = /^\w/.test(target) ? '\\b' : '(?<!\\w)';
      const suffix = /\w$/.test(target) ? '\\b' : '(?!\\w)';
      return new RegExp(`${prefix}${escaped}${suffix}`, 'i').test(cleanText);
    };

    // 1. Direct match or canonical normalized match
    if (checkMatch(cleanKeyword) || checkMatch(normalizedTarget)) {
      return true;
    }

    // 2. Check all known aliases
    const aliases = this.synonyms[normalizedTarget] || this.synonyms[cleanKeyword] || [];
    for (const alias of aliases) {
      if (checkMatch(alias)) {
        return true;
      }
    }

    // 3. Plural / Singular match (e.g. "platforms" <-> "platform", "apis" <-> "api")
    if (cleanKeyword.endsWith('s') && cleanKeyword.length > 3) {
      const singular = cleanKeyword.slice(0, -1);
      if (checkMatch(singular)) return true;
    } else {
      const plural = cleanKeyword + 's';
      if (checkMatch(plural)) return true;
    }

    // 4. Multi-word phrase sub-match (e.g. "banking platforms", "responsive UIs", "financial domain experience")
    const words = cleanKeyword.split(/[\s,/-]+/).filter(w => w.length > 2 && !['and', 'for', 'the', 'with', 'experience', 'skills'].includes(w));
    if (words.length >= 2) {
      const matchedWords = words.filter(w => {
        const singularW = w.endsWith('s') && w.length > 3 ? w.slice(0, -1) : w;
        return cleanText.includes(singularW);
      });
      if (matchedWords.length === words.length || (matchedWords.length >= 2 && matchedWords.length / words.length >= 0.65)) {
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
