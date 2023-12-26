import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TicTacToe by @rubiomunoz',
  description: 'A very simple TicTacToe game using React, Next.js and TailwindCSS',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
