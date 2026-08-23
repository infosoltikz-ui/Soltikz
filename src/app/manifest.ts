import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Resume Builder One - AI Resume Builder & ATS Score Checker',
    short_name: 'ResumeBuilderOne',
    description: 'Build ATS-optimized resumes that get you hired faster with AI-powered resume building and real-time ATS scoring.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16A34A',
    icons: [
      {
        src: '/Fevicon icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
