import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create a Free Account | Resume Builder One',
  description: 'Join Resume Builder One for free. Create ATS-friendly resumes in minutes, optimize with AI, and land your dream job faster.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/register',
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
