import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Talking",
  description: "Introducing a revolutionary new way to experience web3 chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>
        <div className="flex flex-col">
          {children}
        </div>
      </Providers></body>
    </html>
  );
}
