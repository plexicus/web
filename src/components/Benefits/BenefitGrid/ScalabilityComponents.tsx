'use client';

import { useTranslations } from '@/i18n/utils'; // Assuming this path
import { motion } from 'framer-motion';
import { Users, Building, Globe, TrendingUp } from 'lucide-react';

export default function ScalabilityComponent({ lang }: { lang: string }) {
  const t = useTranslations(lang);

  const teamSizes = [
    { size: t('benefits.components.scalability.teams.small'), range: '1-10', icon: <Users className="w-5 h-5" />, active: false },
    { size: t('benefits.components.scalability.teams.medium'), range: '11-50', icon: <Building className="w-5 h-5" />, active: true },
    { size: t('benefits.components.scalability.teams.large'), range: '50+', icon: <Globe className="w-5 h-5" />, active: false },
  ];

  const scalabilityMetrics = [
    { metric: t('benefits.components.scalability.metrics.repositories'), small: '5-20', medium: '50-200', large: '500+' },
    { metric: t('benefits.components.scalability.metrics.developers'), small: '1-10', medium: '10-50', large: '100+' },
    { metric: t('benefits.components.scalability.metrics.scansPerDay'), small: '100', medium: '1K', large: '10K+' },
    { metric: t('benefits.components.scalability.metrics.responseTime'), small: '<1s', medium: '<1s', large: '<2s' },
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{ t('benefits.components.scalability.title') }</h4>

      { /* Team Size Selector */ }
      <div className="flex gap-2 mb-6">
        { teamSizes.map((team, index) => (
          <motion.div
            key={team.size}
            whileHover={{ scale: 1.05 }}
            className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all ${
              team.active
                ? 'border-purple-300 bg-purple-50 text-purple-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              { team.icon }
              <span className="font-medium text-sm">{ team.size }</span>
            </div>
            <div className="text-xs opacity-75">{ team.range } { t('benefits.components.scalability.developers') }</div>
          </motion.div>
        )) }
      </div>

      { /* Scalability Metrics */ }
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h5 className="font-medium text-gray-800">{ t('benefits.components.scalability.metrics.title') }</h5>
        </div>
        <div className="divide-y divide-gray-200">
          { scalabilityMetrics.map((item, index) => (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{ item.metric }</span>
                <div className="flex gap-4 text-xs">
                  <span className="text-gray-500">{ item.small }</span>
                  <span className="text-purple-600 font-medium">{ item.medium }</span>
                  <span className="text-gray-500">{ item.large }</span>
                </div>
              </div>
            </motion.div>
          )) }
        </div>
      </div>

      { /* Growth Visualization */ }
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-800">{ t('benefits.components.scalability.infrastructure.title') }</span>
        </div>
        <div className="flex items-center gap-2">
          { [1, 2, 3, 4, 5].map((bar, index) => (
            <motion.div
              key={bar}
              initial={{ height: 0 }}
              animate={{ height: `${(index + 1) * 8}px` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-purple-400 rounded-sm flex-1 max-w-8"
            />
          )) }
        </div>
        <p className="text-sm text-purple-700 mt-2">
          { t('benefits.components.scalability.infrastructure.description') }
        </p>
      </div>
    </div>
  );
}
