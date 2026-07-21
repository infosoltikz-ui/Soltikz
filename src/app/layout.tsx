import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers/Providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ATS Resume Builder",
  description: "Build ATS-Optimized Resumes That Get You Hired Faster",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
