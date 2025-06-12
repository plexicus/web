'use client';

import { motion } from 'framer-motion';
import { Brain, Code, TestTube, FileText, Zap } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function AiRemediation({ lang }) {
  const t = useTranslations(lang);

  const workflowSteps = [
    { title: t('aspm.aiRemediation.steps.vulnerabilityDetected'), icon: <Zap className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
    { title: t('aspm.aiRemediation.steps.contextAnalysis'), icon: <Brain className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
    { title: t('aspm.aiRemediation.steps.fixGeneration'), icon: <Code className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
    { title: t('aspm.aiRemediation.steps.testingValidation'), icon: <TestTube className="w-6 h-6" />, color: 'from-[#00c951] to-[#00a040]' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#f5eeff] to-[#eef5ff]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{ t('aspm.aiRemediation.title') }</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('aspm.aiRemediation.subtitle') }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          { /* Workflow Visualization */ }
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{ t('aspm.aiRemediation.workflowTitle') }</h3>

            <div className="space-y-4">
              { workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}
                  >
                    { step.icon }
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{ step.title }</h4>
                    { index === 1 && (
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        <li>• { t('aspm.aiRemediation.contextItems.0') }</li>
                        <li>• { t('aspm.aiRemediation.contextItems.1') }</li>
                        <li>• { t('aspm.aiRemediation.contextItems.2') }</li>
                      </ul>
                    ) }
                  </div>
                  { index < workflowSteps.length - 1 && (
                    <div className="absolute left-6 top-full w-0.5 h-4 bg-gray-300 ml-5"></div>
                  ) }
                </motion.div>
              )) }
            </div>
          </motion.div>

          { /* Code Example */ }
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">{ t('aspm.aiRemediation.exampleTitle') }</h3>

            { /* Before */ }
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8220ff] rounded-full"></div>
                <h4 className="font-semibold text-[#6010cc]">{ t('aspm.aiRemediation.beforeTitle') }</h4>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-blue-400">def get_user(user_id):</div>
                <div className="ml-4 text-[#a370ff]">query = f"SELECT * FROM users WHERE id = { '{user_id}' }"</div>
                <div className="ml-4 text-green-400">return db.execute(query)</div>
              </div>
            </div>

            { /* After */ }
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00c951] rounded-full"></div>
                <h4 className="font-semibold text-[#00a040]">{ t('aspm.aiRemediation.afterTitle') }</h4>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-blue-400">def get_user(user_id):</div>
                <div className="ml-4 text-green-400">query = "SELECT * FROM users WHERE id = %s"</div>
                <div className="ml-4 text-green-400">return db.execute(query, (user_id,))</div>
              </div>
            </div>

            { /* Generated Artifacts */ }
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">{ t('aspm.aiRemediation.artifactsTitle') }</h4>
              <div className="space-y-2">
                { [
                  { icon: <Code className="w-4 h-4" />, text: t('aspm.aiRemediation.artifacts.0') },
                  { icon: <TestTube className="w-4 h-4" />, text: t('aspm.aiRemediation.artifacts.1') },
                  { icon: <FileText className="w-4 h-4" />, text: t('aspm.aiRemediation.artifacts.2') },
                  { icon: <Zap className="w-4 h-4" />, text: t('aspm.aiRemediation.artifacts.3') },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="text-[#8220ff]">{ item.icon }</div>
                    { item.text }
                  </div>
                )) }
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
