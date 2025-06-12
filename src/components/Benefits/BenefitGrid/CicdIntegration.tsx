'use client';

import { motion } from 'framer-motion';
import { GitCommit, Play, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CicdIntegration() {
  const pipelineSteps = [
    { name: 'Code Commit', icon: <GitCommit className="w-5 h-5" />, status: 'complete' },
    { name: 'Security Scan', icon: <Shield className="w-5 h-5" />, status: 'active' },
    { name: 'Auto Fix', icon: <Play className="w-5 h-5" />, status: 'pending' },
    { name: 'Deploy', icon: <CheckCircle className="w-5 h-5" />, status: 'pending' },
  ];

  const securityChecks = [
    { name: 'SAST Scan', status: 'passed', issues: 0 },
    { name: 'Dependency Check', status: 'warning', issues: 2 },
    { name: 'Secret Detection', status: 'passed', issues: 0 },
    { name: 'IaC Security', status: 'passed', issues: 0 },
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">CI/CD Pipeline with Security Gates</h4>

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
            <span className="text-xs text-gray-600 text-center">{ step.name }</span>
            { index < pipelineSteps.length - 1 && (
              <div className="absolute top-6 left-1/2 w-8 h-0.5 bg-gray-300 transform translate-x-4"></div>
            ) }
          </div>
        )) }
      </div>

      { /* Security Checks */ }
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-800 mb-3">Security Checks</h5>
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
                { check.issues } issues
              </span>
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  );
}
