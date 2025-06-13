'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '../../i18n/utils';
import SecurityFlowDiagram from './security-flow-diagram';
export default function TechnicalProblemSection({ lang }) {
  const t = useTranslations(lang);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-purple-50 to-white relative overflow-hidden">
        { /* Background decoration */ }
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl opacity-20 -translate-y-48 -translate-x-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 translate-y-48 translate-x-48"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            { /* Left Side - Title and Description */ }
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                { t('aspm.technicalProblem.title') }{ ' ' }
                <span className="text-purple-600">{ t('aspm.technicalProblem.titleHighlight') }</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                { t('aspm.technicalProblem.subtitle') }
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{ t('aspm.technicalProblem.keyChallengesTitle') }</h3>
                <div className="space-y-3">
                  { (t('aspm.technicalProblem.challenges') as any).map((challenge, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-white border border-purple-100 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#8220ff] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{ challenge.title }</h4>
                        <p className="text-sm text-gray-600 mt-1">{ challenge.description }</p>
                        <span className="text-xs font-bold text-[#8220ff] bg-purple-50 px-2 py-1 rounded-full inline-block mt-2">
                          { challenge.stat }
                        </span>
                      </div>
                    </motion.div>
                  )) }
                </div>
              </div>

              <div className="pt-4">
                <p className="text-gray-600 italic">
                  { t('aspm.technicalProblem.italicText') }
                </p>
              </div>
            </motion.div>

            { /* Right Side - Security Flow Illustration */ }
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SecurityFlowDiagram lang={lang} />
            </motion.div>
          </div>
        </div>
      </section>
    </>

  );
}
