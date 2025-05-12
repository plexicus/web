import type { Competitor } from '@/types/competitor';

interface ComparisonGlanceProps {
  competitor: Competitor;
  lang: string;
}

import { useTranslations } from '@/i18n/utils';

export default function ComparisonGlance({ competitor, lang }: ComparisonGlanceProps) {
  const t = useTranslations(lang);
  const features = t('competitor.detail.glance.features') as string[];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{ t('competitor.detail.glance.title') }</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-600">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Plexicus</h3>
            <p className="text-gray-700 mb-6">
              { t('competitor.detail.glance.subtitle') }
            </p>
            <ul className="space-y-3">
              { features.map(feature => (
                <li key={feature} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{ feature }</span>
                </li>
              )) }
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gray-400">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">{ competitor.name }</h3>
            <p className="text-gray-700 mb-6">
              { competitor.detail }
            </p>
            <ul className="space-y-3">
              { competitor.weaknesses.map(weakness => (
                <li key={weakness} className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>{ weakness }</span>
                </li>
              )) }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}