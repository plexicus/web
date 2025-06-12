'use client';

import { motion } from 'framer-motion';
import { Key, Eye, GitBranch, FileText, Settings } from 'lucide-react';

export default function SecretsDetection() {
  const detectionMethods = [
    { title: 'Entropy analysis for random tokens', icon: <Eye className="w-5 h-5" /> },
    { title: 'Pattern matching for known formats', icon: <Key className="w-5 h-5" /> },
    { title: 'Historical git commit scanning', icon: <GitBranch className="w-5 h-5" /> },
    { title: 'Binary file analysis', icon: <FileText className="w-5 h-5" /> },
    { title: 'Environment variable inspection', icon: <Settings className="w-5 h-5" /> },
  ];

  const secretExamples = [
    { type: 'API Key', value: 'sk-1234567890abcdef', risk: 'HIGH' },
    { type: 'Database URL', value: 'postgresql://user:pass@host:5432/db', risk: 'CRITICAL' },
    { type: 'Private Key', value: '-----BEGIN RSA PRIVATE KEY-----', risk: 'CRITICAL' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Secrets Detection</h3>

      { /* Example Detected Secrets */ }
      <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
        <div className="text-gray-400 mb-2"># Example: Detected secret patterns</div>
        { secretExamples.map((secret, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="mb-2"
          >
            <span className="text-[#8220ff]">{ secret.type.toLowerCase().replace(' ', '_') }:</span>{ ' ' }
            <span className="text-[#a370ff]">"{ secret.value }"</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-xs ${
                secret.risk === 'CRITICAL' ? 'bg-[#8220ff] text-white' : 'bg-[#a370ff] text-white'
              }`}
            >
              { secret.risk }
            </span>
          </motion.div>
        )) }
      </div>

      { /* Detection Methods */ }
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Detection Methods:</h4>
        <div className="space-y-3">
          { detectionMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
            >
              <div className="p-2 bg-[#f5eeff] text-[#8220ff] rounded-lg">{ method.icon }</div>
              <span className="text-gray-700">{ method.title }</span>
            </motion.div>
          )) }
        </div>
      </div>

      { /* Stats */ }
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">99.2%</div>
          <div className="text-sm text-[#6010cc]">Detection Accuracy</div>
        </div>
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">0.1%</div>
          <div className="text-sm text-[#6010cc]">False Positive Rate</div>
        </div>
      </div>
    </div>
  );
}
