import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutMission } from '@/components/about/AboutMission';
import { AboutWhatWeDo } from '@/components/about/AboutWhatWeDo';
import { AboutWhyChoose } from '@/components/about/AboutWhyChoose';
import { AboutStats } from '@/components/about/AboutStats';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us - Authentic Career Engineering & ATS Intelligence | Soltkiz',
  description: 'Learn how Soltkiz IT Services empowers candidates to bypass algorithmic screening with authentic, recruiter-calibrated resumes and real-time ATS scoring.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/about',
  },
  openGraph: {
    title: 'About Us - Authentic Career Engineering & ATS Intelligence | Soltkiz',
    description: 'Learn how Soltkiz IT Services empowers candidates to bypass algorithmic screening with authentic, recruiter-calibrated resumes and real-time ATS scoring.',
    url: 'https://www.resumebuilderone.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutMission />
      <AboutWhatWeDo />
      <AboutWhyChoose />
      <AboutStats />
      <AboutCTA />
    </div>
  );
}