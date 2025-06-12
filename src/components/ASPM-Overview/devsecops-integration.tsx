'use client';

import { motion } from 'framer-motion';
import { GitCommit, Play, Shield, CheckCircle, Zap } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function DevSecOpsIntegration({ lang }) {
  const t = useTranslations(lang);

  const pipelineSteps = [
    {
      title: t('aspm.devSecOps.steps.developerCommits.title'),
      icon: <GitCommit className="w-6 h-6" />,
      description: t('aspm.devSecOps.steps.developerCommits.description'),
      status: 'active',
    },
    {
      title: t('aspm.devSecOps.steps.pipelineTrigger.title'),
      icon: <Play className="w-6 h-6" />,
      description: t('aspm.devSecOps.steps.pipelineTrigger.description'),
      status: 'active',
    },
    {
      title: t('aspm.devSecOps.steps.aspmScan.title'),
      icon: <Shield className="w-6 h-6" />,
      description: t('aspm.devSecOps.steps.aspmScan.description'),
      status: 'active',
    },
    {
      title: t('aspm.devSecOps.steps.autoFix.title'),
      icon: <Zap className="w-6 h-6" />,
      description: t('aspm.devSecOps.steps.autoFix.description'),
      status: 'active',
    },
    {
      title: t('aspm.devSecOps.steps.productionDeploy.title'),
      icon: <CheckCircle className="w-6 h-6" />,
      description: t('aspm.devSecOps.steps.productionDeploy.description'),
      status: 'complete',
    },
  ];

  const securityChecks = [
    t('aspm.devSecOps.securityChecks.0'),
    t('aspm.devSecOps.securityChecks.1'),
    t('aspm.devSecOps.securityChecks.2'),
    t('aspm.devSecOps.securityChecks.3'),
    t('aspm.devSecOps.securityChecks.4'),
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f5eeff]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('aspm.devSecOps.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.devSecOps.subtitle') }
          </p>
        </div>

        { /* Pipeline Visualization */ }
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            { /* Pipeline Steps */ }
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-4">
              { pipelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center relative"
                >
                  { /* Step Icon */ }
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      step.status === 'complete' ? 'bg-[#eafff2] text-[#00c951]' : 'bg-[#e9d8ff] text-[#8220ff]'
                    }`}
                  >
                    { step.icon }
                  </div>

                  { /* Step Content */ }
                  <div className="max-w-32">
                    <h3 className="font-semibold text-gray-900 mb-2">{ step.title }</h3>
                    <p className="text-sm text-gray-600">{ step.description }</p>
                  </div>

                  { /* Connection Line */ }
                  { index < pipelineSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-4 h-0.5 bg-[#d4b8ff] transform translate-x-2"></div>
                  ) }
                </motion.div>
              )) }
            </div>

            { /* Security Checks */ }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{ t('aspm.devSecOps.validationTitle') }</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                { securityChecks.map((check, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-2 p-3 bg-[#eafff2] rounded-lg border border-[#b3ffd0]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00c951] flex-shrink-0" />
                    <span className="text-sm font-medium text-[#00a040]">{ check }</span>
                  </motion.div>
                )) }
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
