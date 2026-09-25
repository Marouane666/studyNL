import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/I18nProvider";
import { AuthProvider } from "./auth/AuthProvider";
import { LanguageSync } from "./i18n/LanguageSync";
import { PwaBoot } from "./components/PwaBoot";
import { SiteChrome } from "./components/SiteChrome";
import { Analytics } from "./analytics/Analytics";
import { CookieBanner } from "./analytics/CookieBanner";
import { RecoveryRedirect } from "./auth/RecoveryRedirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyNL",
  description: "StudyNL",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "StudyNL",
  },
  other: {
    // Next only emits the modern "mobile-web-app-capable" tag from
    // appleWebApp.capable; older iOS Safari versions only honor this
    // Apple-specific name for standalone (no browser chrome) launch.
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#092A4D",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <AuthProvider>
            <LanguageSync />
            <RecoveryRedirect />
            <PwaBoot />
            <SiteChrome>{children}</SiteChrome>
            <CookieBanner />
            <Analytics />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
