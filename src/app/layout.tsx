import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const APP_NAME = "ImanTrack";
const APP_DESCRIPTION =
  "ImanTrack — приложение для отслеживания духовного роста, намазов, поста и благих дел для мусульман.";

function getAppUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && envUrl.startsWith("http")) {
    return envUrl;
  }
  return "https://imantrack.vercel.app";
}

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  title: {
    default: `${APP_NAME} — Трекер духовного роста`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: ["ислам", "намаз", "ибадах", "духовный рост", "коран", "трекер"],
  authors: [{ name: "ImanTrack Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  icons: {
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: getAppUrl(),
    title: `${APP_NAME} — Трекер духовного роста`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Трекер духовного роста`,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#369970" },
    { media: "(prefers-color-scheme: dark)", color: "#1f6248" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { OfflineBanner } from "@shared/components/ui/OfflineBanner";
import { PWAInstallPrompt } from "@shared/components/ui/PWAInstallPrompt";
import { SWUpdatePrompt } from "@shared/components/ui/SWUpdatePrompt";
import { GlobalNavigation } from "@shared/components/layout/GlobalNavigation";
import { AuthProvider } from "@features/auth/components/AuthProvider";
import { ThemeProvider } from "./providers";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased relative min-h-screen flex flex-col bg-surface transition-colors duration-300`}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <AuthProvider>
            <OfflineBanner />
            <GlobalNavigation />
            {children}
            <Toaster position="bottom-center" richColors />
            <PWAInstallPrompt />
            <SWUpdatePrompt />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

