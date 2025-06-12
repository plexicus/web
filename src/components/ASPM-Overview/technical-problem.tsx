'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function TechnicalProblemSection({ lang }) {
  const t = useTranslations(lang);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            { t('aspm.technicalProblem.title') }{ ' ' }
            <span className="text-purple-600">{ t('aspm.technicalProblem.titleHighlight') }</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.technicalProblem.subtitle') }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          { /* Before Plexicus */ }
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900">{ t('aspm.technicalProblem.before.title') }</h3>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="space-y-3">
                <div className="text-gray-400">{ t('aspm.technicalProblem.before.codeComment') }</div>
                <div>{ t('aspm.technicalProblem.before.commands.0') }</div>
                <div>{ t('aspm.technicalProblem.before.commands.1') }</div>
                <div>{ t('aspm.technicalProblem.before.commands.2') }</div>
                <div>{ t('aspm.technicalProblem.before.commands.3') }</div>
                <div>{ t('aspm.technicalProblem.before.commands.4') }</div>
                <div>{ t('aspm.technicalProblem.before.commands.5') }</div>
                <div className="text-gray-400 mt-4">
                  { t('aspm.technicalProblem.before.resultComment') }
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-red-700">{ t('aspm.technicalProblem.before.resultLabel') }</span>
              </div>
              <ul className="text-red-600 space-y-1 text-sm">
                <li>• { t('aspm.technicalProblem.before.results.0') }</li>
                <li>• { t('aspm.technicalProblem.before.results.1') }</li>
                <li>• { t('aspm.technicalProblem.before.results.2') }</li>
                <li>• { t('aspm.technicalProblem.before.results.3') }</li>
              </ul>
            </div>
          </motion.div>

          { /* After Plexicus */ }
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">{ t('aspm.technicalProblem.after.title') }</h3>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="space-y-3">
                <div>{ t('aspm.technicalProblem.after.command') }</div>
                <div className="text-gray-400 mt-4">{ t('aspm.technicalProblem.after.autoComment') }</div>
                <div className="text-blue-400 space-y-1 ml-4">
                  <div>{ t('aspm.technicalProblem.after.autoActions.0') }</div>
                  <div>{ t('aspm.technicalProblem.after.autoActions.1') }</div>
                  <div>{ t('aspm.technicalProblem.after.autoActions.2') }</div>
                  <div>{ t('aspm.technicalProblem.after.autoActions.3') }</div>
                </div>
                <div className="text-gray-400 mt-4">{ t('aspm.technicalProblem.after.resultComment') }</div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-700">{ t('aspm.technicalProblem.after.resultLabel') }</span>
              </div>
              <ul className="text-green-600 space-y-1 text-sm">
                <li>• { t('aspm.technicalProblem.after.results.0') }</li>
                <li>• { t('aspm.technicalProblem.after.results.1') }</li>
                <li>• { t('aspm.technicalProblem.after.results.2') }</li>
                <li>• { t('aspm.technicalProblem.after.results.3') }</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
