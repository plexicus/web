'use client'
import { Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"

// Optimize lazy loading with smaller loading placeholders
const RemediationRace = dynamic(() => import("../components/remediation-race"), {
  loading: () => <div className="h-20 bg-white"></div>,
  ssr: false, // Disable SSR for this heavy component
})

const HowItWorks = dynamic(() => import("../components/how-it-works"), {
  loading: () => <div className="h-20 bg-gray-50"></div>,
  ssr: false, // Disable SSR for this animation-heavy component
})

const Partners = dynamic(() => import("../components/partners"), {
  loading: () => <div className="h-20 bg-gray-50"></div>,
})

const Integrations = dynamic(() => import("../components/integrations"), {
  loading: () => <div className="h-20 bg-white"></div>,
  ssr: false, // Disable SSR for this interactive component
})

const Testimonials = dynamic(() => import("../components/testimonials"), {
  loading: () => <div className="h-20 bg-white"></div>,
})

const ContactSection = dynamic(() => import("../components/contact-section"), {
  loading: () => <div className="h-20" style={{ backgroundColor: "#8220ff" }}></div>,
})

const Footer = dynamic(() => import("../components/footer"), {
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
