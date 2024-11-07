import type { Metadata } from "next";
import ReownProvider from '@/providers/ReownProvider'
import { Inter } from 'next/font/google';
import "./globals.css";
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PolyStake",
  description: "BabylonLabs Hackathon Bangkok",
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const headersList = await headers();
  const cookies = headersList.get('cookie');
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReownProvider cookies={cookies}>
          {children}
        </ReownProvider>
      </body>
    </html>
  );
}