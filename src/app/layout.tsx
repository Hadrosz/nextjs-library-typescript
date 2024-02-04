import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NavBarServer from "@/app/components/NavbarServer";
import { cookies } from "next/headers";
import { createClient as cClient } from "@/app/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Libreria App",
  description: "Generated by create next app",
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
