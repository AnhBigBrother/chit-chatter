import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RocketChat | Login',
  description: 'Generated by create next app',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
