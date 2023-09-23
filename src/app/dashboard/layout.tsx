import '../globals.scss'
import type { Metadata } from 'next';
import {SessionProvider} from "../providers/SessionProvider";

export const metadata: Metadata = {
  title: 'Carbee Dashboard',
  description: 'Carbee Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
