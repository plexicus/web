'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Key, Package, Cloud, Shield } from 'lucide-react';
import StaticAnalysisFlow from './static-analysis-flow';
import SecretsDetection from './secrets-detection';
import DependencyScanning from './dependency-scanning';
import InfrastructureCode from './infrastructure-code';
import ApiSecurity from './api-security';
import { useTranslations } from '../../i18n/utils';

export default function CoreCapabilities({ lang }) {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations(lang);

  const capabilities = [
    {
      title: t('aspm.coreCapabilities.capabilities.staticAnalysis.title'),
      description: t('aspm.coreCapabilities.capabilities.staticAnalysis.description'),
      icon: <Code className="w-6 h-6" />,
      component: <StaticAnalysisFlow />,
    },
    {
      title: t('aspm.coreCapabilities.capabilities.secretsDetection.title'),
      description: t('aspm.coreCapabilities.capabilities.secretsDetection.description'),
      icon: <Key className="w-6 h-6" />,
      component: <SecretsDetection />,
    },
    {
      title: t('aspm.coreCapabilities.capabilities.dependencyScanning.title'),
      description: t('aspm.coreCapabilities.capabilities.dependencyScanning.description'),
      icon: <Package className="w-6 h-6" />,
      component: <DependencyScanning />,
    },
    {
      title: t('aspm.coreCapabilities.capabilities.iacSecurity.title'),
      description: t('aspm.coreCapabilities.capabilities.iacSecurity.description'),
      icon: <Cloud className="w-6 h-6" />,
      component: <InfrastructureCode />,
    },
    {
      title: t('aspm.coreCapabilities.capabilities.apiSecurity.title'),
      description: t('aspm.coreCapabilities.capabilities.apiSecurity.description'),
      icon: <Shield className="w-6 h-6" />,
      component: <ApiSecurity lang={lang} />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('aspm.coreCapabilities.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.coreCapabilities.subtitle') }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          { /* Capability Tabs */ }
          <div className="space-y-2">
            { capabilities.map((capability, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-[#f5eeff] border-2 border-[#8220ff] text-[#8220ff]'
                    : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === index ? 'bg-[#e9d8ff] text-[#8220ff]' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    { capability.icon }
                  </div>
                  <h3 className="font-semibold">{ capability.title }</h3>
                </div>
                <p className="text-sm opacity-80">{ capability.description }</p>
              </motion.button>
            )) }
          </div>

          { /* Active Capability Content */ }
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 rounded-xl p-6 min-h-[400px]"
            >
              { capabilities[activeTab].component }
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
