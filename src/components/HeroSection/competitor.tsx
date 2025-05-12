'use client';

import { useMemo } from 'react';
import { useTranslations } from '@/i18n/utils';
import dictionaries from '@/i18n/dictionaries';

import type { Competitor } from '@/types/competitor';
interface HeroSectionCompetitorProps {
  lang: keyof typeof dictionaries;
  type?: 'list' | 'detail';
  competitor?: string;
}

export default function HeroSectionCompetitor({ lang, type = 'list', competitor }: HeroSectionCompetitorProps) {
  /**
   * Variables
   */
  const t = useTranslations(lang);

  /**
   * useMemo
   */
  const currentCompetitor = useMemo(() => {
    const competitors = t('competitor.list') as Competitor[];
    return competitors.find((c) => c.id === competitor);
  }, [competitor]);

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
      <div className="container mx-auto px-4">
        { type === 'list' ? (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              { t('hero.competitor.title') }
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              { t('hero.competitor.subtitle') }
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Plexicus vs. { currentCompetitor.name }
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mb-8">
              { t('competitor.detail.subtitle', { name: currentCompetitor.name }) }
            </p>
            <div className="flex items-center justify-center gap-8 bg-white/10 p-8 rounded-xl">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32">
                  <img src="/images/plexicus-logo-white.png" alt="Plexicus" className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-semibold">Plexicus</span>
              </div>
              <div className="text-white text-2xl font-bold">VS</div>
              <div className="flex flex-col items-center">
                <div className="h-32 w-32">
                  <img src={`/images/competitors/${competitor}.png`} alt={currentCompetitor.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-semibold">{ currentCompetitor.name }</span>
              </div>
            </div>
          </div>
        ) }
      </div>
    </section>
  );
}