import { useTranslations } from '@/i18n/utils';
import type { Competitor } from '@/types/competitor';

interface ComparisonTableProps {
  competitor: Competitor;
  features: {
    name: string;
    description: string;
    plexicus: boolean;
    competitor: boolean;
  }[];
  lang: string;
}

export default function ComparisonTable({ competitor, features, lang }: ComparisonTableProps) {
  const t = useTranslations(lang);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{ t('competitor.detail.feature.title') }</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left border">{ t('competitor.detail.feature.subtitle') }</th>
                <th className="p-4 text-center border w-1/4">
                  <span className="text-purple-600 font-bold">Plexicus</span>
                </th>
                <th className="p-4 text-center border w-1/4">
                  <span className="font-bold">{ competitor.name }</span>
                </th>
              </tr>
            </thead>
            <tbody>
              { features.map((feature, index) => (
                <tr key={`comparison-body-${index}`}>
                  <td className="p-4 border">
                    <div className="font-medium">{ feature.name }</div>
                    <div className="text-sm text-gray-600">{ feature.description }</div>
                  </td>
                  <td className="p-4 text-center border">
                    { feature.plexicus ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <span className="text-green-600 text-xl">✓</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <span className="text-red-600 text-xl">✗</span>
                      </span>
                    ) }
                  </td>
                  <td className="p-4 text-center border">
                    { feature.competitor ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <span className="text-green-600 text-xl">✓</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <span className="text-red-600 text-xl">✗</span>
                      </span>
                    ) }
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}