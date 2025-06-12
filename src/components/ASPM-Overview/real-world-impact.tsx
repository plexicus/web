'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Clock, Target } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function RealWorldImpact({ lang }) {
  const t = useTranslations(lang);

  const beforeAfterMetrics = [
    {
      category: t('aspm.realWorldImpact.metrics.securityAlerts.category'),
      before: { value: '847', label: t('aspm.realWorldImpact.metrics.securityAlerts.before.label'), icon: <TrendingUp className="w-5 h-5 text-[#8220ff]" /> },
      after: {
        value: '43',
        label: t('aspm.realWorldImpact.metrics.securityAlerts.after.label'),
        icon: <TrendingDown className="w-5 h-5 text-[#00c951]" />,
      },
      improvement: t('aspm.realWorldImpact.metrics.securityAlerts.improvement'),
    },
    {
      category: t('aspm.realWorldImpact.metrics.triageTime.category'),
      before: {
        value: '40',
        label: t('aspm.realWorldImpact.metrics.triageTime.before.label'),
        icon: <Clock className="w-5 h-5 text-[#8220ff]" />,
      },
      after: { value: '4', label: t('aspm.realWorldImpact.metrics.triageTime.after.label'), icon: <Clock className="w-5 h-5 text-[#00c951]" /> },
      improvement: t('aspm.realWorldImpact.metrics.triageTime.improvement'),
    },
    {
      category: t('aspm.realWorldImpact.metrics.falsePositiveRate.category'),
      before: { value: '23%', label: t('aspm.realWorldImpact.metrics.falsePositiveRate.before.label'), icon: <Target className="w-5 h-5 text-[#8220ff]" /> },
      after: { value: '3%', label: t('aspm.realWorldImpact.metrics.falsePositiveRate.after.label'), icon: <Target className="w-5 h-5 text-[#00c951]" /> },
      improvement: t('aspm.realWorldImpact.metrics.falsePositiveRate.improvement'),
    },
    {
      category: t('aspm.realWorldImpact.metrics.fixTime.category'),
      before: { value: '14', label: t('aspm.realWorldImpact.metrics.fixTime.before.label'), icon: <Clock className="w-5 h-5 text-[#8220ff]" /> },
      after: { value: '2', label: t('aspm.realWorldImpact.metrics.fixTime.after.label'), icon: <Clock className="w-5 h-5 text-[#00c951]" /> },
      improvement: t('aspm.realWorldImpact.metrics.fixTime.improvement'),
    },
  ];

  const summaryStats = [
    { value: '95%', label: t('aspm.realWorldImpact.summaryStats.fewerAlerts') },
    { value: '90%', label: t('aspm.realWorldImpact.summaryStats.timeSaved') },
    { value: '87%', label: t('aspm.realWorldImpact.summaryStats.accuracyImproved') },
    { value: '86%', label: t('aspm.realWorldImpact.summaryStats.fasterFixes') },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#f5eeff] to-[#eef5ff]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('aspm.realWorldImpact.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.realWorldImpact.subtitle') }
          </p>
        </div>

        <div className="space-y-8">
          { beforeAfterMetrics.map((metric, index) => (
            <motion.div
              key={metric.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{ metric.category }</h3>

              <div className="grid md:grid-cols-3 gap-6 items-center">
                { /* Before */ }
                <div className="text-center p-4 bg-[#f5eeff] rounded-lg border border-[#d4b8ff]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    { metric.before.icon }
                    <span className="font-semibold text-[#6010cc]">{ t('aspm.realWorldImpact.beforeLabel') }</span>
                  </div>
                  <div className="text-3xl font-bold text-[#8220ff] mb-1">{ metric.before.value }</div>
                  <div className="text-sm text-[#6010cc]">{ metric.before.label }</div>
                </div>

                { /* Improvement Arrow */ }
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-[#e9d8ff] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#8220ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#8220ff] bg-[#e9d8ff] px-3 py-1 rounded-full">
                    { metric.improvement }
                  </div>
                </div>

                { /* After */ }
                <div className="text-center p-4 bg-[#eafff2] rounded-lg border border-[#b3ffd0]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    { metric.after.icon }
                    <span className="font-semibold text-[#00a040]">{ t('aspm.realWorldImpact.afterLabel') }</span>
                  </div>
                  <div className="text-3xl font-bold text-[#00c951] mb-1">{ metric.after.value }</div>
                  <div className="text-sm text-[#00a040]">{ metric.after.label }</div>
                </div>
              </div>
            </motion.div>
          )) }
        </div>

        { /* Summary Stats */ }
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-[#8220ff] to-[#6010cc] rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">{ t('aspm.realWorldImpact.summaryTitle') }</h3>
          <div className="grid md:grid-cols-4 gap-6">
            { summaryStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-3xl font-bold mb-1">{ stat.value }</div>
                <div className="text-sm opacity-90">{ stat.label }</div>
              </motion.div>
            )) }
          </div>
        </motion.div>
      </div>
    </section>
  );
}
