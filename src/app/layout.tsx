import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ProtoFile',
  description: 'Arbetsprov Prototyp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen w-full flex flex-col items-center justify-center overflow-x-scroll px-2'>
        {children}
      </body>
    </html>
  );
}
