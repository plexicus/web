'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, FileText, Award } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function ComplianceAutomation({ lang }) {
  const t = useTranslations(lang);

  const complianceFrameworks = [
    {
      title: t('aspm.compliance.frameworks.soc2.title'),
      icon: <Shield className="w-6 h-6" />,
      controls: t('aspm.compliance.frameworks.soc2.controls'),
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.compliance.frameworks.iso27001.title'),
      icon: <Award className="w-6 h-6" />,
      controls: t('aspm.compliance.frameworks.iso27001.controls'),
      color: 'from-[#8220ff] to-[#6010cc]',
    },
  ];

  const complianceMetrics = [
    { metric: '98%', label: t('aspm.compliance.metrics.complianceScore'), color: 'text-[#8220ff]' },
    { metric: '24/7', label: t('aspm.compliance.metrics.monitoring'), color: 'text-[#8220ff]' },
    { metric: 'Auto', label: t('aspm.compliance.metrics.evidenceCollection'), color: 'text-[#8220ff]' },
    { metric: 'Real-time', label: t('aspm.compliance.metrics.auditReports'), color: 'text-[#8220ff]' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('aspm.compliance.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.compliance.subtitle') }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          { complianceFrameworks.map((framework, index) => (
            <motion.div
              key={framework.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${framework.color} flex items-center justify-center text-white`}
                >
                  { framework.icon }
                </div>
                <h3 className="text-xl font-bold text-gray-900">{ framework.title }</h3>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">{ t('aspm.compliance.frameworks.soc2.controlsTitle') }</h4>
                { (framework.controls as any).map((control, controlIndex) => (
                  <motion.div
                    key={controlIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.2 + controlIndex * 0.1 }}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00c951] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{ control }</span>
                  </motion.div>
                )) }
              </div>
            </motion.div>
          )) }
        </div>

        { /* Compliance Dashboard Preview */ }
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-[#f5eeff] to-[#eef5ff] rounded-xl p-8"
        >
          <div className="text-center mb-6">
            <FileText className="w-12 h-12 text-[#8220ff] mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{ t('aspm.compliance.reportingTitle') }</h3>
            <p className="text-gray-600">{ t('aspm.compliance.reportingSubtitle') }</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            { complianceMetrics.map((item, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <div className={`text-2xl font-bold ${item.color}`}>{ item.metric }</div>
                <div className="text-sm text-gray-600">{ item.label }</div>
              </div>
            )) }
          </div>
        </motion.div>
      </div>
    </section>
  );
}
