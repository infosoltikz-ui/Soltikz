import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from "@/components/providers/Providers"
import { JsonLd } from "@/components/seo/JsonLd"
import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#16A34A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.resumebuilderone.com'),
  verification: {
    google: 'U3ySGlGG2fC3L4rUpVCAkRHi-6a8myCH2Y26qQ8tpME',
  },
  title: {
    default: 'Resume Builder One | Free AI Resume Builder & ATS Score Checker',
    template: '%s | Resume Builder One',
  },
  description: 'Build job-winning, ATS-optimized resumes in minutes with AI. Real-time ATS compatibility scoring, pre-built professional templates, smart keyword suggestions, and instant PDF/DOCX downloads.',
  applicationName: 'Resume Builder One',
  keywords: [
    'AI Resume Builder',
    'ATS Resume Checker',
    'ATS Score Calculator',
    'Free Resume Maker',
    'Professional CV Builder',
    'ATS Friendly Resume Templates',
    'AI Cover Letter Generator',
    'Resume Keyword Optimization',
    'Resume Builder One',
    'Soltkiz Resume Builder',
    'Resume Score Checker Online',
    'Modern Resume Designs'
  ],
  authors: [{ name: 'Soltkiz IT Services', url: 'https://www.resumebuilderone.com' }],
  creator: 'Soltkiz IT Services',
  publisher: 'Resume Builder One',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.resumebuilderone.com',
    siteName: 'Resume Builder One',
    title: 'Resume Builder One | Free AI Resume Builder & ATS Score Checker',
    description: 'Build ATS-optimized resumes that get you hired faster. Real-time ATS scoring, AI content generation, and recruiter-tested templates.',
    images: [
      {
        url: '/login side pannel image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Builder One - AI Resume Builder & ATS Score Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Builder One | Free AI Resume Builder & ATS Score Checker',
    description: 'Build ATS-optimized resumes in minutes with AI. Pass ATS scans and land more interviews.',
    images: ['/login side pannel image.png'],
    creator: '@soltikz',
  },
  icons: {
    icon: [
      { url: '/Fevicon icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/Fevicon icon.png',
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('soltikz_theme');
                  if (t === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="google-site-verification" content="U3ySGlGG2fC3L4rUpVCAkRHi-6a8myCH2Y26qQ8tpME" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet" />
        <JsonLd />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-[var(--desk)] text-[var(--ink)]`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <FloatingThemeToggle />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
