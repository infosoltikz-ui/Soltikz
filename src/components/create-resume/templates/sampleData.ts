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
    'Senior Full Stack Software Engineer with 8+ years of experience in designing, architecting, and deploying enterprise-grade web applications and scalable cloud solutions.',
    'Demonstrates strong hands-on depth in React, Next.js, TypeScript, Node.js, PostgreSQL, and AWS cloud infrastructure, with secondary capabilities in CI/CD automation and containerized microservices.',
    'Spearheaded complex architectural migrations that reduced system downtime by 99.9% and slashed API response latency by 45% across 1.2M monthly active users.',
    'Experienced across high-growth enterprise environments, agile engineering squads, and cross-functional product delivery teams.',
    'Proven track record of mentoring 6+ engineers, authoring technical design documentation, and driving engineering excellence across the organization.'
  ],
  skills: [
    {
      category: 'Core Domain Skills',
      items: ['Full Stack Development', 'Cloud Architecture', 'Microservices', 'RESTful API Design', 'System Design', 'Agile Engineering']
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'GitHub Actions', 'Docker', 'Kubernetes', 'Jira', 'Postman', 'VS Code']
    },
    {
      category: 'Programming & Scripting',
      items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Java', 'SQL', 'Bash', 'HTML5/CSS3']
    },
    {
      category: 'Databases & Data Handling',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'MySQL']
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['AWS (EC2, S3, Lambda, ECS)', 'Google Cloud Platform (GCP)', 'Terraform', 'Nginx', 'Linux (RHEL, Ubuntu)']
    },
    {
      category: 'Frameworks & Methodologies',
      items: ['React', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Tailwind CSS', 'Redux Toolkit']
    },
    {
      category: 'Testing & Quality',
      items: ['Jest', 'Cypress', 'Playwright', 'React Testing Library', 'SonarQube', 'Postman API Testing']
    },
    {
      category: 'Reporting & Visualization',
      items: ['Grafana', 'Prometheus', 'Datadog', 'D3.js', 'Chart.js', 'Google Analytics']
    },
    {
      category: 'Collaboration & Workflow',
      items: ['GitHub', 'GitLab', 'Confluence', 'Slack', 'Agile (Scrum/Kanban)', 'CI/CD Pipelines']
    },
    {
      category: 'Operating Systems & Environments',
      items: ['Linux', 'Unix', 'macOS', 'Windows Server', 'Docker Containers']
    }
  ],
  experience: [
    {
      role: 'Senior Full Stack Engineer',
      company: 'Infosys Technologies',
      duration: '03/2022 - Present',
      environment: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
      bullets: [
        'Architected scalable cloud microservices using **Node.js**, **TypeScript**, and **AWS Lambda**, reducing backend infrastructure overhead by **32%** across 1.2M monthly transactions.',
        'Engineered high-performance responsive web interfaces using **Next.js**, **React**, and **Tailwind CSS**, improving Core Web Vitals and lowering page load times by **45%**.',
        'Designed resilient **PostgreSQL** and **Redis** caching layers, eliminating query bottlenecks and improving concurrent request throughput by **60%**.',
        'Automated end-to-end **CI/CD** delivery pipelines using **Docker** and **GitHub Actions**, cutting release deployment cycles from 4 hours to under **20 minutes**.',
        'Spearheaded the integration of **GraphQL** and **RESTful APIs**, streamlining front-end data fetching and reducing payload sizes across mobile and web clients by **35%**.',
        'Established robust unit, integration, and E2E testing frameworks with **Jest** and **Cypress**, elevating overall code coverage from 55% to **92%**.',
        'Enforced strict **OAuth2** and **JWT** authentication protocols, protecting user data privacy and ensuring compliance with international **SOC2** and **HIPAA** standards.',
        'Mentored and onboarded **6 software engineers**, conducting daily code reviews, establishing best practices, and fostering an agile test-driven development environment.'
      ],
    },
    {
      role: 'Full Stack Software Engineer',
      company: 'Innovate Systems Inc.',
      duration: '01/2019 - 02/2022',
      environment: ['Python', 'Django', 'React', 'MongoDB', 'AWS', 'Docker'],
      bullets: [
        'Developed high-throughput e-commerce platform services using **Python**, **Django**, and **React**, processing over **$10M** in monthly online customer transactions.',
        'Integrated multi-tenant **Stripe** and **PayPal** payment gateways, ensuring strict **PCI-DSS** compliance and reducing transaction failures by **24%**.',
        'Refactored legacy database schemas in **MongoDB** and **PostgreSQL**, optimizing aggregation queries and reducing database CPU utilization by **40%**.',
        'Built interactive real-time telemetry dashboards using **WebSocket** and **D3.js**, enabling operations teams to monitor live system metrics effortlessly.',
        'Collaborated with UX product teams to revamp checkout flows, driving a **28%** boost in user conversion rates and reducing cart abandonment.',
        'Configured Dockerized microservices on **AWS Elastic Beanstalk**, facilitating rapid automated scaling during major marketing launch campaigns.',
        'Resolved high-priority production incidents and system bottlenecks, maintaining an average Mean Time to Resolution (**MTTR**) under **15 minutes**.',
        'Documented comprehensive RESTful API endpoints using **Swagger/OpenAPI**, accelerating integration workflows for third-party developer partners.'
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Creative Digital Agency',
      duration: '06/2016 - 12/2018',
      environment: ['JavaScript', 'HTML5', 'CSS3', 'Sass', 'Webpack', 'REST API'],
      bullets: [
        'Built custom responsive web applications for **25+** enterprise clients across healthcare, finance, and retail sectors using **JavaScript**, **HTML5**, and **Sass**.',
        'Designed and integrated RESTful web APIs for headless CMS platforms like **Contentful** and **WordPress**, empowering marketing teams to publish content dynamically.',
        'Optimized web page performance and SEO structures, boosting organic search engine rankings and increasing client site traffic by an average of **50%**.',
        'Implemented **WCAG 2.1 AA** accessibility guidelines, making client portals accessible to users with disabilities across all modern web browsers.',
        'Configured cross-browser testing matrices across desktop and mobile devices, eliminating UI layout regressions before production releases.',
        'Automated asset bundling and image optimization using **Webpack** and **Babel**, reducing initial bundle footprint by **40%**.'
      ],
    },
  ],
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      year: '2016',
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'University of California, Berkeley',
      year: '2014',
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
