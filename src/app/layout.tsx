import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "ImanTrack";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${appName} — Трекер духовного роста`,
    template: `%s | ${appName}`,
  },
  description:
    "ImanTrack — приложение для отслеживания духовного роста, намазов, поста и благих дел для мусульман.",
  applicationName: appName,
  keywords: ["ислам", "намаз", "ибадах", "духовный рост", "коран", "трекер"],
  authors: [{ name: "ImanTrack Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appName,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: appUrl,
    title: `${appName} — Трекер духовного роста`,
    description: "Приложение для отслеживания духовного роста для мусульман.",
    siteName: appName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} — Трекер духовного роста`,
    description: "Приложение для отслеживания духовного роста для мусульман.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
