'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, Zap } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function ApiSecurity({ lang }) {
  const t = useTranslations(lang);

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/users/{id}',
      tests: ['SQL Injection Test', 'Authorization Bypass', 'Rate Limiting Check'],
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      tests: ['Brute Force Protection', 'JWT Token Validation', 'Input Sanitization'],
    },
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'bg-[#e9d8ff] text-[#8220ff]';
      case 'POST':
        return 'bg-[#d4b8ff] text-[#6010cc]';
      case 'PUT':
        return 'bg-[#c4a6ff] text-[#5010aa]';
      case 'DELETE':
        return 'bg-[#b394ff] text-[#4010aa]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{ t('aspm.coreCapabilities.capabilities.apiSecurity.scanTitle') }</h3>

      { /* API Discovery Sources */ }
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-[#8220ff]" />
            <h4 className="font-semibold text-gray-800">{ t('aspm.coreCapabilities.capabilities.apiSecurity.discoveryTitle') }</h4>
          </div>
          <p className="text-sm text-gray-600">{ t('aspm.coreCapabilities.capabilities.apiSecurity.discoveryDescription') }</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-[#8220ff]" />
            <h4 className="font-semibold text-gray-800">{ t('aspm.coreCapabilities.capabilities.apiSecurity.runtimeTitle') }</h4>
          </div>
          <p className="text-sm text-gray-600">{ t('aspm.coreCapabilities.capabilities.apiSecurity.runtimeDescription') }</p>
        </div>
      </div>

      { /* API Endpoints Testing */ }
      <div className="space-y-4">
        { apiEndpoints.map((endpoint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                  { endpoint.method }
                </span>
                <span className="font-mono text-gray-800">{ endpoint.path }</span>
              </div>
            </div>

            <div className="p-4">
              <h5 className="font-semibold text-gray-700 mb-2">{ t('aspm.coreCapabilities.capabilities.apiSecurity.testsTitle') }</h5>
              <div className="space-y-2">
                { endpoint.tests.map((test, testIndex) => (
                  <motion.div
                    key={testIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + testIndex * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-[#8220ff]" />
                    <span className="text-sm text-gray-600">{ test }</span>
                  </motion.div>
                )) }
              </div>
            </div>
          </motion.div>
        )) }
      </div>

      { /* Security Metrics */ }
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">24</div>
          <div className="text-sm text-[#6010cc]">{ t('aspm.coreCapabilities.capabilities.apiSecurity.stats.endpointsTested') }</div>
        </div>
        <div className="bg-[#eafff2] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#00c951]">18</div>
          <div className="text-sm text-[#00a040]">{ t('aspm.coreCapabilities.capabilities.apiSecurity.stats.passedTests') }</div>
        </div>
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">6</div>
          <div className="text-sm text-[#6010cc]">{ t('aspm.coreCapabilities.capabilities.apiSecurity.stats.issuesFound') }</div>
        </div>
      </div>
    </div>
  );
}

