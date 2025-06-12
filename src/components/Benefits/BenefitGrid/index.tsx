'use client';

import { motion } from 'framer-motion';
import CicdIntegration from './CicdIntegration';
import AutomatedVulnerability from './AutomatedVulnerability';
import IntelligentPrioritization from './IntelligentPrioritization';
import RealtimeFeedback from './RealtimeFeedback';
import ContinuousMonitoring from './ContinousMonitoring';
import ScalabilityComponent from './ScalabilityComponents';
import CollaborationComponent from './CollaborationComponents';
import TimeToFix from './TimetoFix';
import ComplianceVisibility from './ComplianceVisibility';
import { useTranslations } from '@/i18n/utils'; // Assuming correct relative path


export default function BenefitsGrid({ lang }) {
  const t = useTranslations(lang);

  const benefits = [
    {
      id: 'cicd',
      title: t('benefits.grid.items.cicd.title'),
      description: t('benefits.grid.items.cicd.description'),
      component: <CicdIntegration lang={lang} />,
    },
    {
      id: 'automation',
      title: t('benefits.grid.items.automation.title'),
      description: t('benefits.grid.items.automation.description'),
      component: <AutomatedVulnerability lang={lang} />,
    },
    {
      id: 'prioritization',
      title: t('benefits.grid.items.prioritization.title'),
      description: t('benefits.grid.items.prioritization.description'),
      component: <IntelligentPrioritization lang={lang} />,
    },
    {
      id: 'feedback',
      title: t('benefits.grid.items.feedback.title'),
      description: t('benefits.grid.items.feedback.description'),
      component: <RealtimeFeedback lang={lang} />,
    },
    {
      id: 'monitoring',
      title: t('benefits.grid.items.monitoring.title'),
      description: t('benefits.grid.items.monitoring.description'),
      component: <ContinuousMonitoring lang={lang} />,
    },
    {
      id: 'scalability',
      title: t('benefits.grid.items.scalability.title'),
      description: t('benefits.grid.items.scalability.description'),
      component: <ScalabilityComponent lang={lang} />,
    },
    {
      id: 'collaboration',
      title: t('benefits.grid.items.collaboration.title'),
      description: t('benefits.grid.items.collaboration.description'),
      component: <CollaborationComponent lang={lang} />,
    },
    {
      id: 'timetofix',
      title: t('benefits.grid.items.timetofix.title'), // Corrected key based on benefits.yml
      description: t('benefits.grid.items.timetofix.description'), // Corrected key based on benefits.yml
      component: <TimeToFix lang={lang} />,
    },
    {
      id: 'compliance',
      title: t('benefits.grid.items.compliance.title'), // Corrected key based on benefits.yml
      description: t('benefits.grid.items.compliance.description'), // Corrected key based on benefits.yml
      component: <ComplianceVisibility lang={lang} />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('benefits.grid.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('benefits.grid.subtitle') }
          </p>
        </div>

        <div className="space-y-16">
          { benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              { /* Content */ }
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{ benefit.title }</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{ benefit.description }</p>
                </div>
              </div>

              { /* Interactive Component */ }
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">{ benefit.component }</div>
              </div>
            </motion.div>
          )) }
        </div>
      </div>
    </section>
  );
}
