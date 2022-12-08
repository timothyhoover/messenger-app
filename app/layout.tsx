import React, { ReactNode } from 'react'
import '../styles/globals.css'
import Header from './Header'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
