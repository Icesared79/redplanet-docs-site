import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Sidebar from "@/components/Sidebar";
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
          <div
            className="rp-root-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "272px minmax(0,1fr)",
              minHeight: "100vh",
              background: "var(--bg)",
              color: "var(--fg-1)",
            }}
          >
            <Sidebar />
            <main style={{ minWidth: 0, padding: "48px clamp(32px,5vw,80px) 96px" }}>
              <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
                {children}
              </div>
            </main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
