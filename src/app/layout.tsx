import { Providers } from './contexts/providers';
import './globals.css';
import { Inter } from 'next/font/google';

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online 3D Modeling Tool',
  description: 'Knell Labs Graphics Educational Aid',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
