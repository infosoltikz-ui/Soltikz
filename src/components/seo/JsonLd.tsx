import React from 'react';

export function JsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.resumebuilderone.com/#organization',
        name: 'Soltkiz IT Services',
        alternateName: 'Resume Builder One',
        url: 'https://www.resumebuilderone.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.resumebuilderone.com/LOGO.png',
          caption: 'Resume Builder One Logo',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: 'info.soltikz@gmail.com',
            contactType: 'customer support',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        sameAs: [
          'https://twitter.com/soltikz',
          'https://linkedin.com/company/soltikz',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.resumebuilderone.com/#website',
        url: 'https://www.resumebuilderone.com',
        name: 'Resume Builder One',
        description: 'Build ATS-Optimized Resumes That Get You Hired Faster with AI',
        publisher: {
          '@id': 'https://www.resumebuilderone.com/#organization',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.resumebuilderone.com/#software',
        name: 'Resume Builder One',
        operatingSystem: 'Web Browser (Cloud-based SaaS)',
        applicationCategory: 'BusinessApplication',
        description: 'AI-driven resume creation, real-time ATS compatibility scoring, cover letter generator, and career tools.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '1480',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'AI Resume Writer & Enhancer',
          'Instant ATS Compatibility Scoring',
          'Industry-Specific Resume Templates',
          'Cover Letter Generator',
          'High-Resolution PDF & DOCX Export',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
