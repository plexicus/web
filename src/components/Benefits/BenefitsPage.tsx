"use client"
import BenefitsHero from "./BenefitsHero"
import BenefitsGrid from "./BenefitGrid"
import BenefitsCta from "./BenefitsCta"

export default function BenefitsPage() {
  return (
    <main className="min-h-screen">
      <div className="section-bg-white">
        <BenefitsHero />
      </div>
      <div className="section-bg-purple-light">
        <BenefitsGrid />
      </div>
      <div className="section-bg-white">
        <BenefitsCta />
      </div>
    </main>
  )
}
