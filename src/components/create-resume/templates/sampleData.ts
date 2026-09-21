import { ProfileData, ResumeData } from './types';

export const sampleProfileData: ProfileData = {
  full_name: 'ALEXANDER HAMILTON',
  email: 'alexander@example.com',
  phone: '(555) 123-4567',
  linkedin: 'linkedin.com/in/alexhamilton',
  location: 'New York, NY',
  work_authorization: 'US Citizen',
  relocation: 'Open to Relocation',
  availability: '2 Weeks Notice'
};

export const sampleResumeData: ResumeData = {
  summary: [
    'Highly motivated and results-driven Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable web applications.',
    'Proven expertise in full-stack development, cloud architecture, and leading cross-functional teams to deliver high-impact software solutions on time.',
    'Adept at solving complex technical challenges, optimizing performance, and mentoring junior developers to foster a culture of continuous learning and technical excellence.',
  ],
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML/CSS'],
    },
    {
      category: 'Frameworks',
      items: ['React', 'Next.js', 'Node.js', 'Express', 'Django', 'Spring Boot'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'GitHub Actions'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
    },
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'TechNova Solutions',
      duration: 'Mar 2021 - Present',
      environment: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
      bullets: [
        'Spearheaded the migration of a legacy monolithic application to a **microservices architecture**, improving system scalability by 40% and reducing deployment time by 60%.',
        'Led a team of 5 engineers in developing a real-time analytics dashboard used by over **10,000 enterprise clients**.',
        'Optimized database queries and implemented caching strategies with Redis, reducing API response times by an average of 300ms.',
        'Established CI/CD pipelines using GitHub Actions, ensuring 99.9% uptime and zero-downtime deployments.',
        'Mentored 3 junior developers, conducting code reviews and hosting weekly knowledge-sharing sessions.',
        'Additional bullet point to extend content and ensure it spans to the next page when combined with other sections. This demonstrates the template layout for two pages.'
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Innovate Systems Inc.',
      duration: 'Jun 2017 - Feb 2021',
      environment: ['Python', 'Django', 'React', 'MongoDB'],
      bullets: [
        'Developed and maintained a high-traffic e-commerce platform processing over **$5M in monthly transactions**.',
        'Implemented a secure payment gateway integration using Stripe API, ensuring PCI compliance and reducing transaction failures by 15%.',
        'Built a comprehensive automated testing suite (unit, integration, and E2E) that increased code coverage from 45% to 85%.',
        'Collaborated with UX/UI designers to redesign the checkout flow, resulting in a 22% increase in conversion rates.',
        'Resolved critical production bugs and performance bottlenecks during peak holiday traffic events.',
        'Designed RESTful APIs for mobile application consumption, ensuring strict versioning and backward compatibility.',
      ],
    },
    {
      role: 'Junior Web Developer',
      company: 'Creative Digital Agency',
      duration: 'Aug 2015 - May 2017',
      environment: ['JavaScript', 'HTML5', 'CSS3', 'PHP'],
      bullets: [
        'Created responsive, mobile-first websites for 20+ clients across various industries including retail, healthcare, and education.',
        'Integrated third-party APIs and CMS platforms (WordPress, Contentful) to enable dynamic content management.',
        'Improved website accessibility and SEO, increasing average organic traffic for clients by 35%.',
        'Demonstrated strong problem-solving skills in high-pressure environments, consistently delivering projects ahead of schedule.'
      ],
    },
  ],
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      year: '2015',
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'University of California, Berkeley',
      year: '2013',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2022',
    },
    {
      name: 'Professional Scrum Master I (PSM I)',
      issuer: 'Scrum.org',
      year: '2020',
    },
  ],
};

export const c2cSampleData: ResumeData = {
  summary: [
    'Headline — Senior Cloud Architect with 10+ years across financial services, healthcare, and high-volume enterprise environments.',
    'Primary technical depth — AWS Cloud infrastructure, having built and migrated over 200 large-scale microservices using Kubernetes at massive global scale.',
    'Secondary technical depth — Infrastructure as Code capabilities, specifically utilizing Terraform and CloudFormation to automate deployments across multiple regions consistently.',
    'Design or build work — Architected serverless processing pipelines from scratch using AWS Lambda and EventBridge, eliminating manual intervention completely.',
    'Analysis or problem-solving — Investigated and resolved catastrophic database bottleneck issues by restructuring indexing and implementing Redis caching layers successfully.',
    'Delivery or operations — Managed full CI/CD lifecycle pipelines utilizing GitHub Actions and Jenkins to guarantee zero-downtime deployments for production.',
    'Automation or efficiency — Automated daily compliance auditing scripts using Python, reclaiming approximately 20 hours weekly for the core engineering team.',
    'Data, cloud, or infrastructure — AWS (EC2, S3, RDS, DynamoDB, EKS, ECS, Lambda), GCP (Compute Engine, Cloud Storage, BigQuery).',
    'Standards & compliance — HIPAA, SOC2, PCI-DSS compliance frameworks, ensuring all deployed infrastructure met rigorous federal and industry security standards.',
    'Leadership & communication — Mentored 5 junior engineers and authored comprehensive architectural decision records (ADRs) for cross-functional stakeholder alignments.'
  ],
  skills: [
    { category: 'Core Domain Skills', items: ['Cloud Architecture', 'System Design', 'Microservices', 'High Availability', 'Disaster Recovery'] },
    { category: 'Tools & Platforms', items: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions'] },
    { category: 'Programming & Scripting', items: ['Python', 'Go', 'JavaScript', 'TypeScript', 'Bash'] },
    { category: 'Databases & Data Handling', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'] },
    { category: 'Cloud & Infrastructure', items: ['AWS', 'GCP', 'Linux (RHEL, Ubuntu)', 'Nginx', 'Apache'] },
    { category: 'Frameworks & Methodologies', items: ['Agile (Scrum)', 'DevOps', 'Site Reliability Engineering (SRE)', 'ITIL'] },
    { category: 'Testing & Quality', items: ['SonarQube', 'Datadog', 'Prometheus', 'Grafana', 'Jest'] },
    { category: 'Operating Systems & Environments', items: ['Linux', 'Unix', 'macOS', 'Windows Server'] }
  ],
  experience: [
    {
      role: 'Senior Cloud Architect',
      company: 'TechCorp Solutions / Enterprise Bank',
      location: 'New York, NY',
      duration: 'Jan 2021 – Present',
      environment: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'PostgreSQL', 'Redis'],
      bullets: [
        'Architected and deployed a highly resilient Kubernetes cluster on AWS, supporting over 5 million daily active users with zero downtime.',
        'Migrated 50 legacy monolithic applications into containerized microservices, reducing infrastructure operational costs by 30% annually across the organization.',
        'Automated the entire provisioning pipeline utilizing Terraform modules, cutting server deployment time from three days to under forty minutes.',
        'Engineered a real-time data streaming platform leveraging Amazon Kinesis, processing over 100,000 transactions per second without latency spikes.',
        'Led a cross-functional team of 12 engineers in implementing SOC2 compliant security protocols across all public-facing cloud environments.',
        'Optimized database queries and introduced Redis caching layers, accelerating API response times by 45% for the primary banking application.',
        'Designed comprehensive disaster recovery strategies across multiple AWS regions, guaranteeing a 99.99% uptime and recovery objective compliance.',
        'Documented overarching system architectures and mentored junior staff, significantly accelerating the onboarding process for all new technical hires.'
      ]
    },
    {
      role: 'DevOps Engineer',
      company: 'Global Systems Inc / HealthNet',
      location: 'Boston, MA',
      duration: 'Mar 2018 – Dec 2020',
      environment: ['GCP', 'Docker', 'Jenkins', 'Ansible', 'Bash', 'MongoDB'],
      bullets: [
        'Developed comprehensive CI/CD pipelines using Jenkins and Docker, streamlining deployment cycles and increasing release velocity by 60 percent.',
        'Consolidated multiple monitoring dashboards into a unified Grafana interface, providing executives with real-time visibility into global system health.',
        'Resolved persistent memory leak issues in the core patient portal application, preventing weekly crashes and improving overall user satisfaction.',
        'Automated routine server patching and maintenance tasks using Ansible, reclaiming approximately 15 hours of manual engineering effort every week.',
        'Implemented strict role-based access controls across all Google Cloud Platform resources, achieving full HIPAA compliance within three months.',
        'Configured automated backup and restoration procedures for all MongoDB databases, ensuring critical patient data was never compromised.'
      ]
    },
    {
      role: 'Systems Administrator',
      company: 'DataTech Enterprise',
      location: 'Austin, TX',
      duration: 'Jun 2015 – Feb 2018',
      environment: ['Linux', 'VMware', 'Bash', 'Nagios', 'Apache', 'MySQL'],
      bullets: [
        'Managed and maintained a fleet of 500+ Linux servers (CentOS/Ubuntu) across three regional data centers, ensuring 99.9% availability.',
        'Scripted daily backup and disaster recovery validation tasks using Bash, significantly reducing manual overhead and risk of human error.',
        'Spearheaded the migration of legacy physical servers to VMware ESXi virtual environments, reducing hardware footprint and power consumption by 45%.',
        'Configured comprehensive system monitoring and alerting rules using Nagios, proactively addressing hardware degradation before service impact.',
        'Collaborated closely with software development teams to troubleshoot complex application deployment and networking issues in staging environments.'
      ]
    }
  ],
  education: [
    {
      degree: 'Master of Science, Computer Science',
      institution: 'University of Technology',
      year: 'May 2017'
    },
    {
      degree: 'Bachelor of Science, Information Systems',
      institution: 'State University',
      year: 'May 2015'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      year: '2022'
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2021'
    }
  ]
};
