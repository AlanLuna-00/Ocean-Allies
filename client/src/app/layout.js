import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ocean Allies',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.tailwindcss.com/2.2.16/tailwind.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <div className='container p-4'>
          {children}
        </div>
      </body>
    </html>
  )
}
