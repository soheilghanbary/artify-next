import '@/assets/app.css'
import BottomNavigation from '@/components/layouts/BottomNavigation'
import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'
import Providers from '@/components/providers'
import { siteConfig } from '@/config/site'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const font = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <head>
        <link rel="theme-color" href="#4D6BFE" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <div className="container min-h-screen space-y-4 p-4">{children}</div>
          <Footer />
          <BottomNavigation />
        </Providers>
      </body>
    </html>
  )
}
