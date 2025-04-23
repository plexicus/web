import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import ClientBody from "@/app/ClientBody"
import "./globals.css"

// Add a comment to indicate Astro migration path
/**
 * Root layout component
 *
 * Astro migration path:
 * - Move fonts to Astro config
 * - Replace with Astro's Layout.astro
 * - Use <slot /> instead of {children}
 */

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "🟣plexicus | AI Agent Vulnerability Remediator",
  description:
    "Plexicus is designed to be your cybersecurity AI Agent, offering continuous support, guidance, and automated solutions",
}

export const viewport: Viewport = {
  themeColor: '#8220ff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <ClientBody>{children}</ClientBody>
    </html>
  )
}
