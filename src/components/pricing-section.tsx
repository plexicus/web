'use client';
import { IntegratedPricingTiers } from './integrated-pricing-tiers';
import { useTranslations } from '@/i18n/utils';
export default function PricingSection({ lang }) {
  const t = useTranslations(lang);
  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-[#8220ff] via-black to-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{ t('pricing.title') }</h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
            { t('pricing.title') }
          </p>
        </div>

        <IntegratedPricingTiers lang={lang} hideRemediationMultiplier={true} professionalPrice={50} enterprisePrice={70} />
      </div>
    </section>
  );
}
