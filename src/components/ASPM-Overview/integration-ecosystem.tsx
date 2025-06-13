'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '../../i18n/utils';
import ProcessDashboard from './process-dashboard';
export default function IntegrationEcosystem({ lang }) {
  const t = useTranslations(lang);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          { /* Left Side - SDLC Integration Content */ }
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{ t('aspm.integrationEcosystem.aspmIntegrationTitle') }</h2>
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: '#8220ff' }}
              >
                { t('aspm.integrationEcosystem.newLabel') }
              </span>
            </div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              { t('aspm.integrationEcosystem.description') }
            </p>

            <div className="space-y-6">
              { [
                {
                  phase: t('aspm.integrationEcosystem.phases.code.phase'),
                  title: t('aspm.integrationEcosystem.phases.code.title'),
                  description:
                  t('aspm.integrationEcosystem.phases.code.description'),
                },
                {
                  phase: t('aspm.integrationEcosystem.phases.build.phase'),
                  title: t('aspm.integrationEcosystem.phases.build.title'),
                  description:
                  t('aspm.integrationEcosystem.phases.build.description'),
                },
                {
                  phase: t('aspm.integrationEcosystem.phases.testing.phase'),
                  title: t('aspm.integrationEcosystem.phases.testing.title'),
                  description:
                  t('aspm.integrationEcosystem.phases.testing.description'),
                },
                {
                  phase: t('aspm.integrationEcosystem.phases.deploy.phase'),
                  title: t('aspm.integrationEcosystem.phases.deploy.title'),
                  description: t('aspm.integrationEcosystem.phases.deploy.description'),
                },
                {
                  phase: t('aspm.integrationEcosystem.phases.monitor.phase'),
                  title: t('aspm.integrationEcosystem.phases.monitor.title'),
                  description:
                  t('aspm.integrationEcosystem.phases.monitor.description'),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8220ff' }}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      <span style={{ color: '#8220ff' }}>{ item.phase }:</span> { item.title }
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{ item.description }</p>
                  </div>
                </motion.div>
              )) }
            </div>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 font-semibold hover:underline transition-colors duration-200"
                style={{ color: '#8220ff' }}
              >
                { t('aspm.integrationEcosystem.learnMore') }
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          { /* Right Side - Interactive Process Dashboard */ }
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <ProcessDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
