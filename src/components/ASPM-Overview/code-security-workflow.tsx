'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../../i18n/utils';

export default function CodeSecurityWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const t = useTranslations('en');

  // Auto-cycle through workflow steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate scan progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(progressInterval);
  }, []);

  const vulnerabilities = [
    { type: t('aspm.codeSecurityWorkflow.findings.vulnerabilityTypes.sqlInjection'), severity: 'critical', line: 42, status: 'detected', file: 'auth.js' },
    { type: t('aspm.codeSecurityWorkflow.findings.vulnerabilityTypes.xss'), severity: 'high', line: 128, status: 'fixing', file: 'utils.js' },
    { type: t('aspm.codeSecurityWorkflow.findings.vulnerabilityTypes.hardcodedSecret'), severity: 'critical', line: 15, status: 'fixed', file: 'config.js' },
    { type: t('aspm.codeSecurityWorkflow.findings.vulnerabilityTypes.insecureDependency'), severity: 'medium', line: 23, status: 'detected', file: 'package.json' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 rounded-2xl p-6 min-h-[600px]">
      { /* Header */ }
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">{ t('aspm.codeSecurityWorkflow.header.userLabel') }</div>
          <span className="text-sm text-gray-600">{ t('aspm.codeSecurityWorkflow.header.analysisDescription') }</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.header.liveScanning') }</span>
        </div>
      </div>

      { /* Top Section - IDE Code Editor (Desktop Ratio) */ }
      <motion.div
        className="bg-gray-900 rounded-xl shadow-xl overflow-hidden mb-6 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ aspectRatio: '16/9' }} // Desktop monitor ratio
      >
        { /* Window Controls */ }
        <div className="flex items-center gap-2 p-4 bg-gray-800 border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-3 text-gray-400 text-sm">auth.js - Visual Studio Code</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">Plexicus Security Extension</span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        { /* IDE Content Area */ }
        <div className="flex h-full">
          { /* File Explorer Sidebar */ }
          <div className="w-48 bg-gray-800 border-r border-gray-700 p-3">
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{ t('aspm.codeSecurityWorkflow.ide.fileExplorerTitle') }</div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span>src</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2 text-blue-300 bg-blue-900 bg-opacity-30 px-2 py-1 rounded">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>auth.js</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>utils.js</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>config.js</span>
                </div>
              </div>
            </div>
          </div>

          { /* Main Code Editor */ }
          <div className="flex-1 flex flex-col">
            { /* Tab Bar */ }
            <div className="flex items-center bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm">
                <span>auth.js</span>
                <button className="text-gray-400 hover:text-white">×</button>
              </div>
            </div>

            { /* Code Content */ }
            <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-auto">
              <div className="flex">
                { /* Line Numbers */ }
                <div className="text-gray-500 pr-4 select-none">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                  <div>10</div>
                </div>

                { /* Code */ }
                <div className="flex-1">
                  <div className="text-gray-400">// Authentication module</div>
                  <div className="text-blue-400">
                    <span className="text-purple-400">const</span> <span className="text-white">express</span> =
                    <span className="text-yellow-400"> require</span>(<span className="text-green-400">'express'</span>
                    );
                  </div>
                  <div className="text-blue-400">
                    <span className="text-purple-400">const</span> <span className="text-white">db</span> =
                    <span className="text-yellow-400"> require</span>(
                    <span className="text-green-400">'./database'</span>);
                  </div>
                  <div className="text-gray-500"></div>
                  <motion.div
                    className="text-red-400 bg-red-900 bg-opacity-40 px-2 py-1 rounded border-l-4 border-red-500"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <span className="text-purple-400">function</span>{ ' ' }
                    <span className="text-yellow-400">authenticate</span>
                    <span className="text-white">(user) { '{' }</span>
                  </motion.div>
                  <motion.div
                    className="text-red-400 bg-red-900 bg-opacity-40 px-2 py-1 rounded border-l-4 border-red-500"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    <span className="text-white ml-4">const query = </span>
                    <span className="text-green-400">"SELECT * FROM users WHERE id = "</span>
                  </motion.div>
                  <motion.div
                    className="text-red-400 bg-red-900 bg-opacity-40 px-2 py-1 rounded border-l-4 border-red-500"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  >
                    <span className="text-white ml-4">+ user.id;</span>
                  </motion.div>
                  <div className="text-white ml-4">
                    <span className="text-purple-400">return</span> db.query(query);
                  </div>
                  <div className="text-white">{ '}' }</div>
                </div>
              </div>
            </div>

            { /* Security Alert Overlay */ }
            <AnimatePresence>
              { activeStep === 0 && (
                <motion.div
                  className="absolute bottom-4 right-4 max-w-sm bg-red-500 text-white p-4 rounded-lg shadow-xl"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 20, y: 20 }}
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold">{ t('aspm.codeSecurityWorkflow.alerts.alertTitle') }</div>
                      <div className="text-sm opacity-90">{ t('aspm.codeSecurityWorkflow.alerts.alertDescription') }</div>
                      <button className="mt-2 px-3 py-1 bg-white text-red-600 rounded text-sm font-medium hover:bg-gray-100">
                        { t('aspm.codeSecurityWorkflow.alerts.fixNowButton') }
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) }
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      { /* Bottom Section - Analysis & Results */ }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        { /* Left - Security Analysis Hub */ }
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center">
            { /* Analysis Circle */ }
            <div className="relative w-32 h-32 mx-auto mb-4">
              { /* Outer rotating ring */ }
              <motion.div
                className="absolute inset-0 border-4 border-purple-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
              />

              { /* Progress ring */ }
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="6" className="opacity-30" />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={351.86}
                  strokeDashoffset={351.86 - (scanProgress / 100) * 351.86}
                  transition={{ duration: 0.1 }}
                />
              </svg>

              { /* Center content */ }
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full shadow-lg border-4 border-white">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </motion.div>
                <div className="text-sm font-bold text-purple-700 mt-1">{ Math.round(scanProgress) }%</div>
              </div>
            </div>

            <h4 className="font-semibold text-gray-800 mb-2">{ t('aspm.codeSecurityWorkflow.analysis.title') }</h4>
            <p className="text-sm text-gray-600 mb-4">{ t('aspm.codeSecurityWorkflow.analysis.subtitle') }</p>

            { /* Analysis Stats */ }
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">3</div>
                <div className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.analysis.severity.critical') }</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">2</div>
                <div className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.analysis.severity.high') }</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">1</div>
                <div className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.analysis.severity.medium') }</div>
              </div>
            </div>
          </div>
        </motion.div>

        { /* Right - Security Findings */ }
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">{ t('aspm.codeSecurityWorkflow.findings.title') }</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.findings.statusLive') }</span>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            { vulnerabilities.map((vuln, index) => (
              <motion.div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 ${
                        vuln.severity === 'critical'
                          ? 'bg-red-500'
                          : vuln.severity === 'high'
                            ? 'bg-orange-500'
                            : 'bg-yellow-500'
                      }`}
                    />
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{ vuln.type }</div>
                      <div className="text-xs text-gray-500">
                        { vuln.file }:{ vuln.line }
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vuln.status === 'fixed'
                        ? 'bg-green-100 text-green-700'
                        : vuln.status === 'fixing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    { vuln.status }
                  </div>
                </div>
              </motion.div>
            )) }
          </div>

          { /* Action Buttons */ }
          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
            <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              { t('aspm.codeSecurityWorkflow.findings.fixAllIssuesButton') }
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              { t('aspm.codeSecurityWorkflow.findings.exportReportButton') }
            </button>
          </div>
        </motion.div>
      </div>

      { /* Bottom Integration Bar */ }
      <motion.div
        className="mt-6 bg-white rounded-lg shadow-md p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            { /* Git Integration */ }
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{ t('aspm.codeSecurityWorkflow.integrations.gitIntegration.title') }</div>
                <div className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.integrations.gitIntegration.subtitle') }</div>
              </div>
            </div>

            { /* Team Collaboration */ }
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                { [t('aspm.codeSecurityWorkflow.integrations.teamRoles.dev'), t('aspm.codeSecurityWorkflow.integrations.teamRoles.sec'), t('aspm.codeSecurityWorkflow.integrations.teamRoles.ops')].map((role, index) => (
                  <motion.div
                    key={role}
                    className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                  >
                    { role.charAt(0) }
                  </motion.div>
                )) }
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{ t('aspm.codeSecurityWorkflow.integrations.teamSync.title') }</div>
                <div className="text-xs text-gray-500">{ t('aspm.codeSecurityWorkflow.integrations.teamSync.subtitle') }</div>
              </div>
            </div>
          </div>

          { /* Status Indicator */ }
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">{ t('aspm.codeSecurityWorkflow.integrations.statusOperational') }</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

