import '../globals.scss'
import type { Metadata } from 'next';
import {SessionProvider} from "../providers/SessionProvider";
import Header from '../components/Header';

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
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
