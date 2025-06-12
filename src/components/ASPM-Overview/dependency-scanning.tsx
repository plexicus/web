'use client';

import { motion } from 'framer-motion';
import { Package, AlertTriangle } from 'lucide-react';

export default function DependencyScanning() {
  const dependencies = [
    {
      name: 'lodash',
      version: '4.17.15',
      cve: 'CVE-2020-8203',
      severity: 'HIGH',
      children: [
        { name: 'axios', version: '0.21.0', cve: 'CVE-2020-28168', severity: 'MEDIUM' },
        { name: 'moment', version: '2.24.0', cve: 'CVE-2022-31129', severity: 'HIGH' },
      ],
    },
    {
      name: 'django',
      version: '2.2.0',
      cve: 'CVE-2021-35042',
      severity: 'CRITICAL',
      children: [
        { name: 'pillow', version: '6.2.0', cve: 'CVE-2020-35653', severity: 'HIGH' },
        { name: 'pyyaml', version: '3.13', cve: 'CVE-2020-14343', severity: 'MEDIUM' },
      ],
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-white bg-[#8220ff]';
      case 'HIGH':
        return 'text-white bg-[#a370ff]';
      case 'MEDIUM':
        return 'text-[#6010cc] bg-[#f5eeff]';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Dependency Tree Analysis</h3>

      { /* Dependency Tree Visualization */ }
      <div className="space-y-4">
        { dependencies.map((dep, index) => (
          <motion.div
            key={dep.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            { /* Parent Dependency */ }
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#8220ff]" />
                  <span className="font-semibold text-gray-800">
                    { dep.name }@{ dep.version }
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(dep.severity)}`}>
                    { dep.cve }
                  </span>
                </div>
                <AlertTriangle
                  className={`w-5 h-5 ${dep.severity === 'CRITICAL' ? 'text-[#8220ff]' : 'text-[#a370ff]'}`}
                />
              </div>
            </div>

            { /* Child Dependencies */ }
            <div className="p-4 space-y-2">
              { dep.children.map((child, childIndex) => (
                <motion.div
                  key={child.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + childIndex * 0.1 }}
                  className="flex items-center gap-3 pl-4 border-l-2 border-gray-200"
                >
                  <div className="w-2 h-2 bg-[#a370ff] rounded-full"></div>
                  <span className="text-gray-700">
                    { child.name }@{ child.version }
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(child.severity)}`}>
                    { child.cve }
                  </span>
                </motion.div>
              )) }
            </div>
          </motion.div>
        )) }
      </div>

      { /* Summary Stats */ }
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">2</div>
          <div className="text-sm text-[#6010cc]">Critical</div>
        </div>
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">3</div>
          <div className="text-sm text-[#6010cc]">High</div>
        </div>
        <div className="bg-[#f5eeff] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8220ff]">2</div>
          <div className="text-sm text-[#6010cc]">Medium</div>
        </div>
      </div>
    </div>
  );
}
