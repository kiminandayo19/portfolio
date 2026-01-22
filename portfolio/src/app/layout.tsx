import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import { ScrollToTop } from "@/components/atoms/ScrollToTop";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#007FFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arif Faishal - Senior Full-Stack Developer",
  description: "Senior Full-Stack Developer Portfolio showcasing projects and professional experience in the Javascript ecosystem.",
  keywords: ["Full-Stack Developer", "Next.js", "React Native", "Portfolio", "Arif Faishal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body style={{ margin: 0 }}>
        <div id="back-to-top-anchor" />
        <ThemeRegistry>
          {children}
          <ScrollToTop />
        </ThemeRegistry>
      </body>
    </html>
  );
}
