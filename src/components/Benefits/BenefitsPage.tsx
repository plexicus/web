'use client';
import BenefitsHero from './BenefitsHero';
import BenefitsGrid from './BenefitGrid';
import BenefitsCta from './BenefitsCta';

export default function BenefitsPage({ lang }) {
  return (
    <main className="min-h-screen">
      <div className="section-bg-white">
        <BenefitsHero lang={lang} />
      </div>
      <div className="section-bg-purple-light">
        <BenefitsGrid lang={lang} />
      </div>
      <div className="section-bg-white">
        <BenefitsCta lang={lang} />
      </div>
    </main>
  );
}
