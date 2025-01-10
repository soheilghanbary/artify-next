import '@/assets/app.css'
import BottomNavigation from '@/components/layouts/bottom-navigation'
import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import Providers from '@/components/providers'
import { siteConfig } from '@/config/site'
import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const font = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
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
        <link rel="theme-color" href="#ffffff" />
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
