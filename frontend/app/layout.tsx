import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dheeva - AI Document Assistant',
  description: 'Your AI-powered document assistant for intelligent file analysis and Q&A',
  keywords: ['AI', 'document analysis', 'file upload', 'question answering', 'OCR', 'transcription'],
  authors: [{ name: 'Dheeva Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-50">
          {children}
        </div>
      </body>
    </html>
  )
}