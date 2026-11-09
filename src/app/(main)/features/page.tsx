import { Metadata } from 'next';
import { FeaturesHero } from '@/components/features/FeaturesHero';
import { CoreFeatures } from '@/components/features/CoreFeatures';
import { AdvancedFeatures } from '@/components/features/AdvancedFeatures';
import { FeaturesWorkflow } from '@/components/features/FeaturesWorkflow';
import { FeaturesStats } from '@/components/features/FeaturesStats';
import { CTASection } from '@/components/landing/CTASection';

export const metadata: Metadata = {
  title: 'Powerful AI Resume Features & ATS Scoring Tools | Soltkiz',
  description: 'Explore our full suite of AI resume features: real-time ATS scoring, strict 2-line bullets, C2C skills matrix, job keyword extraction, and Word & PDF export.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/features',
  },
  openGraph: {
    title: 'Powerful AI Resume Features & ATS Scoring Tools | Soltkiz',
    description: 'Explore our full suite of AI resume features: real-time ATS scoring, strict 2-line bullets, C2C skills matrix, job keyword extraction, and Word & PDF export.',
    url: 'https://www.resumebuilderone.com/features',
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <FeaturesHero />
      <CoreFeatures />
      <AdvancedFeatures />
      <FeaturesWorkflow />
      <FeaturesStats />
      <CTASection />
    </div>
  );
}