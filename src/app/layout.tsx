import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NavBarServer from "@/app/components/NavbarServer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Step's - Empower Your Mind, One Step at a Time: Elevate Your Knowledge with Every Ebook ",
  description:
    "Unlock boundless knowledge with our ebook sharing platform. Explore a vast library, taking steps toward enlightenment. Empower your mind, one ebook at a time. Join us on a journey of continuous learning and growth.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <NavBarServer />
          <main className="mx-auto max-w-screen-2xl px-6 py-8 ">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
