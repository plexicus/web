import Navbar from "@/src/components/navbar"
import Footer from "@/src/components/footer"
import PricingSection from "@/src/components/pricing-section"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
