import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Red Planet — Documentation",
  description:
    "Technical documentation for Red Planet and the Atlas autonomous data engine.",
  metadataBase: new URL("https://docs.redplanetdata.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Red Planet — Documentation",
    description:
      "Atlas: an autonomous data engine for property, transaction, distress, and signal intelligence.",
    url: "https://docs.redplanetdata.com",
    siteName: "Red Planet Documentation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bg text-text">
        <ThemeProvider>
          <Sidebar />
          <div className="md:pl-64">
            <TopBar />
            <main className="px-6 md:px-12 py-10">
              <div className="mx-auto max-w-prose">{children}</div>
            </main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
