import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Klayea's Birthday Stream Collab",
  description: 'Sign up for streaming slots during Klayea\'s birthday weekend celebration',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {children}
      </body>
    </html>
  )
}

export default RootLayout
