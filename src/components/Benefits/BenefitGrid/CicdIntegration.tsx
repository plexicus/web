'use client';

import { motion } from 'framer-motion';
import { GitCommit, Play, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTranslations } from '@/i18n/utils'; // Assuming correct relative path

export default function CicdIntegration({ lang }) {
  const t = useTranslations(lang);

  const pipelineSteps = [
    { name: t('benefits.components.cicd.steps.commit'), icon: <GitCommit className="w-5 h-5" />, status: 'complete' },
    { name: t('benefits.components.cicd.steps.scan'), icon: <Shield className="w-5 h-5" />, status: 'active' },
    { name: t('benefits.components.cicd.steps.fix'), icon: <Play className="w-5 h-5" />, status: 'pending' },
    { name: t('benefits.components.cicd.steps.deploy'), icon: <CheckCircle className="w-5 h-5" />, status: 'pending' },
  ];

  const securityChecks = [
    { name: t('benefits.components.cicd.checks.sast'), status: 'passed', issues: 0 },
    { name: t('benefits.components.cicd.checks.dependency'), status: 'warning', issues: 2 },
    { name: t('benefits.components.cicd.checks.secret'), status: 'passed', issues: 0 },
    { name: t('benefits.components.cicd.checks.iac'), status: 'passed', issues: 0 },
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{ t('benefits.components.cicd.title') }</h4>

      { /* Pipeline Steps */ }
      <div className="flex items-center justify-between mb-6">
        { pipelineSteps.map((step, index) => (
          <div key={step.name} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: step.status === 'active' ? 1.1 : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.3 }}
              className={'w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-[#8220ff] text-white'}
            >
              { step.icon }
            </motion.div>
          </div>
        )) }
      </div>

      { /* Security Checks */ }
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-800 mb-3">{ t('benefits.components.cicd.checks.title') }</h5>
        <div className="space-y-2">
          { securityChecks.map((check, index) => (
            <motion.div
              key={check.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 bg-white rounded border"
            >
              <div className="flex items-center gap-2">
                { check.status === 'passed' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                ) }
                <span className="text-sm font-medium">{ check.name }</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  check.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                { check.issues } { t('benefits.components.cicd.issues') }
              </span>
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  );
}
