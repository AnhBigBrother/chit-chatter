export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='w-full h-full bg-gradient-to-r from-rose-300 via-rose-200 to-rose-300'>{children}</div>;
}
