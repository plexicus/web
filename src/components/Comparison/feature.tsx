import FeatureHighlight from './feature-highlight';

import { useTranslations } from '@/i18n/utils';

export default function ComparisonFeature({ lang }: { lang: string }) {
  /**
   * Variables
   */
  const t = useTranslations(lang);
  const features = t('competitor.detail.why-plexicus.cards') as { title: string; description: string }[];

  /**
   * Methods & Functions
   */
  const getIcon = (key: number) => {
    switch (key) {
      case 1:
        return 'clipboard-check';
      case 2:
        return 'currency-dollar';
      default:
        return 'shield-check';
    }
  };

  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{ t('competitor.detail.why-plexicus.title') }</h2>
        <div className="grid md:grid-cols-3 gap-8">
          { features.map((feature, index) => (
            <FeatureHighlight 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={getIcon(index)} 
            />
          )) }
        </div>
      </div>
    </section>
  );
}