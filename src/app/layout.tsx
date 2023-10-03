import { AuthProvider } from '@/hooks/auth';
import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';


const roboto = Roboto(
  {
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['400', '500', '700']
  }
)

const poppins = Poppins(
  {
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['400', '500', '700']
  }
)

export const metadata: Metadata = {
  title: 'FoodExplorer',
  description: 'Food Explorer',
  icons: {
    icon: '/icone.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
          <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
