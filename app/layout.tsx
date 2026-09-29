import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Planet — Documentation",
  description:
    "How Atlas works: an autonomous data engine for property, transaction, distress, community, and siting intelligence.",
  metadataBase: new URL("https://docs.redplanetdata.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Red Planet — Documentation",
    description:
      "How Atlas works: an autonomous data engine for property, transaction, distress, community, and siting intelligence.",
    url: "https://docs.redplanetdata.com",
    siteName: "Red Planet Documentation",
    images: [{ url: "/og-image.png", width: 1280, height: 640, alt: "Red Planet" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Planet — Documentation",
    description:
      "How Atlas works: an autonomous data engine for property, transaction, distress, community, and siting intelligence.",
    images: ["/og-image.png"],
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
      data-product="red-planet"
      data-density="comfortable"
    >
      <body>
        <ThemeProvider>
          <Sidebar />
          <div className="md:pl-[272px]">
            <TopBar />
            <main className="px-5 md:px-12 py-14 md:py-20">
              <div className="mx-auto max-w-prose">{children}</div>
            </main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
