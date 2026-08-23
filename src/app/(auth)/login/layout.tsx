import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In to Your Account | Resume Builder One',
  description: 'Log in to Resume Builder One to edit your resumes, check ATS scores, and download recruiter-ready templates.',
  alternates: {
    canonical: 'https://www.resumebuilderone.com/login',
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
