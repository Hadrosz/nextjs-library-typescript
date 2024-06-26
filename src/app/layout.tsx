import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NavBarServer from "@/components/server-components/NavbarServer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Toaster } from "sonner";
import { createClient } from "@/libs/supabase/client";
import { AuthProvider } from "@/libs/context/session";

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
  const supabase = createClient();

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} relative z-[-1] dark:bg-black bg-white  dark:bg-dot-white/[0.1] bg-dot-black/[0.1]`}
      >
        <Providers>
          <AuthProvider>
            <NavBarServer />
            {children}
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
