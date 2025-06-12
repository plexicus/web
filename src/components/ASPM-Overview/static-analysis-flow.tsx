'use client';

import { motion } from 'framer-motion';
import { Code, GitBranch, Shield, Brain } from 'lucide-react';

export default function StaticAnalysisFlow() {
  const languages = ['Python', 'Java', 'JavaScript', 'Go', 'C#'];
  const vulnerabilities = [
    'SQL Injection (CWE-89)',
    'Cross-Site Scripting (CWE-79)',
    'Command Injection (CWE-78)',
    'Path Traversal (CWE-22)',
    'Insecure Deserialization (CWE-502)',
    'Hard-coded Credentials (CWE-798)',
  ];

  const flowSteps = [
    { title: 'Source Code', icon: <Code className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
    { title: 'AST Parser', icon: <GitBranch className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
    { title: 'Rule Engine', icon: <Shield className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
    { title: 'Codex Remedium', icon: <Brain className="w-6 h-6" />, color: 'from-[#8220ff] to-[#6010cc]' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Code Analysis Flow</h3>

      { /* Flow Visualization */ }
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        { flowSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div
              className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}
            >
              { step.icon }
            </div>
            <h4 className="font-semibold text-sm text-gray-700">{ step.title }</h4>
            { index < flowSteps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-4 text-gray-400">→</div>
            ) }
          </motion.div>
        )) }
      </div>

      { /* Languages Supported */ }
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Languages Supported:</h4>
        <div className="flex flex-wrap gap-2">
          { languages.map((lang, index) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-3 py-1 bg-[#f5eeff] text-[#8220ff] rounded-full text-sm font-medium"
            >
              { lang }
            </motion.span>
          )) }
        </div>
      </div>

      { /* Vulnerability Types */ }
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Vulnerability Types:</h4>
        <div className="space-y-2">
          { vulnerabilities.map((vuln, index) => (
            <motion.div
              key={vuln}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <div className="w-2 h-2 bg-[#8220ff] rounded-full"></div>
              { vuln }
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  );
}
