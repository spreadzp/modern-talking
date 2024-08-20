import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-chat-elements/dist/main.css'
 
import { ReactNode } from "react";
import AuthProvider from "@/lib/next.auth.provider";   
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Talking",
  description: "Introducing a revolutionary new way to experience web3 chat",
  keywords: ['socialfi', 'blockchain', 'ai', 'surveys', 'polls', 'commentaries', 'token rewards', 'ethereum', 'nfts', 'decentralized applications'],
  applicationName: 'Modern Talking',
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
    index: true,
    follow: true,
  },
  creator: 'spreadzp',
  publisher: 'spreadzp',
  openGraph: {
    title: 'Modern Talking',
    description: 'Introducing a revolutionary new way to experience web3 chat',
    url: 'https://modern-talking.vercel.app/',
    siteName: 'Modern Talking',
    images: [
      {
        url: 'https://modern-talking.vercel.app/',
        width: 1920,
        height: 1080,
        alt: 'Modern Talking',
      },
    ],
  },

};

type Props = {
  children: ReactNode; 
};
export default function RootLayout({ children  }: Props) { 
  return (
    <html lang="en">
      <body className={inter.className}>  
      <AuthProvider  >
            <div className="flex flex-col">
              {children}
            </div>  
        </AuthProvider>

      </body>
    </html>
  );
}
