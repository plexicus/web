'use client';

import { motion } from 'framer-motion';
import { GitBranch, Shield, Cloud, Database } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function IntegrationEcosystem({ lang }) {
  const t = useTranslations(lang);

  const integrationCategories = [
    {
      title: t('aspm.integrationEcosystem.categories.sastTools.title'),
      icon: <Shield className="w-6 h-6" />,
      tools: t('aspm.integrationEcosystem.categories.sastTools.tools'),
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.integrationEcosystem.categories.scaTools.title'),
      icon: <Database className="w-6 h-6" />,
      tools: t('aspm.integrationEcosystem.categories.scaTools.tools'),
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.integrationEcosystem.categories.infrastructure.title'),
      icon: <Cloud className="w-6 h-6" />,
      tools: t('aspm.integrationEcosystem.categories.infrastructure.tools'),
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.integrationEcosystem.categories.cicdPlatforms.title'),
      icon: <GitBranch className="w-6 h-6" />,
      tools: t('aspm.integrationEcosystem.categories.cicdPlatforms.tools'),
      color: 'from-[#8220ff] to-[#6010cc]',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('aspm.integrationEcosystem.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.integrationEcosystem.subtitle') }
          </p>
        </div>

        { /* CI/CD Pipeline Example */ }
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{ t('aspm.integrationEcosystem.pipelineTitle') }</h3>
          <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono overflow-x-auto">
            <div className="text-gray-400">{ t('aspm.integrationEcosystem.codeComment') }</div>
            <div className="text-blue-400">name: Security Scan</div>
            <div className="text-blue-400">on: [push, pull_request]</div>
            <div className="text-blue-400">jobs:</div>
            <div className="ml-2 text-blue-400">security:</div>
            <div className="ml-4 text-green-400">runs-on: ubuntu-latest</div>
            <div className="ml-4 text-green-400">steps:</div>
            <div className="ml-6 text-[#a370ff]">- uses: actions/checkout@v3</div>
            <div className="ml-6 text-[#a370ff]">- name: Plexicus ASPM Scan</div>
            <div className="ml-8 text-[#a370ff]">uses: plexicus/aspm-action@v1</div>
            <div className="ml-8 text-[#a370ff]">with:</div>
            <div className="ml-10 text-green-400">api-key: ${ '${{ secrets.PLEXICUS_API_KEY }}' }</div>
            <div className="ml-10 text-green-400">fail-on: high</div>
            <div className="ml-10 text-green-400">auto-fix: true</div>
          </div>
        </div>

        { /* Integration Categories */ }
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          { integrationCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}
                >
                  { category.icon }
                </div>
                <h3 className="font-bold text-gray-900">{ category.title }</h3>
              </div>

              <div className="space-y-2">
                { (category.tools as any).map((tool, toolIndex) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + toolIndex * 0.05 }}
                    className="text-sm text-gray-600 bg-[#f5eeff] rounded px-2 py-1"
                  >
                    { tool }
                  </motion.div>
                )) }
              </div>
            </motion.div>
          )) }
        </div>
      </div>
    </section>
  );
}
