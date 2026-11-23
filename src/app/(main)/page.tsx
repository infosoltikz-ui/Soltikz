import { Metadata } from 'next';
import { ResumeBuilderOneLanding } from '@/components/landing/ResumeBuilderOneLanding';

export const metadata: Metadata = {
  title: "ResumeBuilderOne - a resume written for the job you're applying to",
  description: "Paste the job posting. Get a resume rewritten for that specific role - plus a report showing exactly what matched, which words are missing, and what to fix before you send it.",
  alternates: {
    canonical: 'https://www.resumebuilderone.com',
  },
  openGraph: {
    title: "ResumeBuilderOne - a resume written for the job you're applying to",
    description: "Paste the job posting. Get a resume rewritten for that specific role - plus a report showing exactly what matched, which words are missing, and what to fix before you send it.",
    url: 'https://www.resumebuilderone.com',
  },
};

export default function Home() {
  return <ResumeBuilderOneLanding />;
}
