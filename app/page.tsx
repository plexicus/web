'use client'

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/src/components/navbar"
import HeroSection from "@/src/components/hero-section"

// Optimize lazy loading with smaller loading placeholders
const RemediationRace = dynamic(() => import("@/src/components/remediation-race"), {
  loading: () => <div className="h-20 bg-white"></div>,
  ssr: false, // Disable SSR for this heavy component
})

const HowItWorks = dynamic(() => import("@/src/components/how-it-works"), {
  loading: () => <div className="h-20 bg-gray-50"></div>,
  ssr: false, // Disable SSR for this animation-heavy component
})

const Partners = dynamic(() => import("@/src/components/partners"), {
  loading: () => <div className="h-20 bg-gray-50"></div>,
})

const Integrations = dynamic(() => import("@/src/components/integrations"), {
  loading: () => <div className="h-20 bg-white"></div>,
  ssr: false, // Disable SSR for this interactive component
})

const Testimonials = dynamic(() => import("@/src/components/testimonials"), {
  loading: () => <div className="h-20 bg-white"></div>,
})

const ContactSection = dynamic(() => import("@/src/components/contact-section"), {
  loading: () => <div className="h-20" style={{ backgroundColor: "#8220ff" }}></div>,
})

const Footer = dynamic(() => import("@/src/components/footer"), {
  loading: () => <div className="h-20 bg-gray-50"></div>,
})

/**
 * Main page component - optimized for performance
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <HeroSection />

        {/* Use smaller, more efficient loading states */}
        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <RemediationRace />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-gray-50"></div>}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-gray-50"></div>}>
          <Partners />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <Integrations />
        </Suspense>

        <Suspense fallback={<div className="h-20 bg-white"></div>}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<div className="h-20" style={{ backgroundColor: "#8220ff" }}></div>}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-20 bg-gray-50"></div>}>
        <Footer />
      </Suspense>
    </div>
  )
}
