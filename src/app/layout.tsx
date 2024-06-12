import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '@/components/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChitChatter',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={`${inter.className} relative w-full h-fit min-h-screen bg-rose-100`}>
        <SessionProvider session={session}>
          {children}
          <Toaster position='top-right' />
        </SessionProvider>
      </body>
    </html>
  );
}
