import './globals.css';
import { Inter } from 'next/font/google';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '../supabase/database.types';

export const dynamic = 'force-dynamic'

type User = Database['public']['Tables']['users']['Row'];

const supabase = createServerComponentClient<Database>({ cookies })
supabase.from('todos').select().then( d => JSON.stringify(d, null, 2) );

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
        {children}
      </body>
    </html>
  )
}
