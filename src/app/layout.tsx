import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-chat-elements/dist/main.css'

import { Providers } from "@/lib/providers"; 
import { ReactNode } from "react";
import AuthProvider from "@/lib/next.auth.provider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { getProviders } from "next-auth/react";
import { AppProps } from "next/app";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Talking",
  description: "Introducing a revolutionary new way to experience web3 chat",
};

type Props = {
  children: ReactNode; 
};
export default   function RootLayout({ children  }: Props) { 
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
