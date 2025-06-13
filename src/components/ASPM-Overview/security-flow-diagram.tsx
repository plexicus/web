'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Rocket, AlertTriangle, Clock, Shield, CheckCircle, Brain, Zap, Eye, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';
import { type ui } from '@/i18n/ui';

export default function SecurityFlowDiagram({ lang }: { lang: keyof typeof ui }) {
  const [activeStep, setActiveStep] = useState(0);
  const primaryColor = '#8220ff';
  const t = useTranslations(lang);
  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const challenges = [
    {
      title: t('aspm.securityFlowDiagram.complexArchitectures'),
      stat: t('aspm.securityFlowDiagram.complexArchitecturesStat'),
      icon: <GitBranch size={18} />,
      color: '#ef4444',
    },
    {
      title: t('aspm.securityFlowDiagram.fastPacedCicd'),
      stat: t('aspm.securityFlowDiagram.fastPacedCicdStat'),
      icon: <Rocket size={18} />,
      color: '#f59e0b',
    },
    {
      title: t('aspm.securityFlowDiagram.alertFatigue'),
      stat: t('aspm.securityFlowDiagram.alertFatigueStat'),
      icon: <AlertTriangle size={18} />,
      color: '#dc2626',
    },
    {
      title: t('aspm.securityFlowDiagram.securityVsSpeed'),
      stat: t('aspm.securityFlowDiagram.securityVsSpeedStat'),
      icon: <Clock size={18} />,
      color: '#7c3aed',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg overflow-hidden border border-purple-100">
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          { /* Left Side - Challenge Input */ }
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{ t('aspm.securityFlowDiagram.securityTeam') }</h3>
              <p className="text-sm text-gray-600">{ t('aspm.securityFlowDiagram.facingModernChallenges') }</p>
            </div>

            { /* Challenge Input */ }
            <motion.div
              className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-sm"
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: challenges[activeStep].color }}
                >
                  { challenges[activeStep].icon }
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{ challenges[activeStep].title }</h4>
                  <p className="text-xs text-gray-500">{ challenges[activeStep].stat }</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 italic">
                "How do we handle { challenges[activeStep].title.toLowerCase() } effectively?"
              </div>
            </motion.div>

            { /* Arrow */ }
            <div className="flex justify-center">
              <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </motion.div>
            </div>
          </div>

          { /* Right Side - ASPM Processing Flow */ }
          <div className="space-y-4">
            { /* ASPM Header */ }
            <div
              className="p-3 rounded-lg text-center text-white font-semibold"
              style={{ backgroundColor: primaryColor }}
            >
              PLEXICUS ASPM
            </div>

            { /* Processing Steps */ }
            <div className="space-y-3">
              { /* Step 1: Discovery */ }
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200"
                animate={{
                  borderColor: activeStep === 0 ? primaryColor : '#e5e7eb',
                  backgroundColor: activeStep === 0 ? `${primaryColor}10` : '#ffffff',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Discovery</div>
                  <div className="text-xs text-gray-600">Comprehensive scanning</div>
                </div>
                { activeStep === 0 && (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                ) }
              </motion.div>

              { /* Step 2: AI Analysis */ }
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200"
                animate={{
                  borderColor: activeStep === 1 ? primaryColor : '#e5e7eb',
                  backgroundColor: activeStep === 1 ? `${primaryColor}10` : '#ffffff',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">AI Analysis</div>
                  <div className="text-xs text-gray-600">Context enrichment</div>
                </div>
                { activeStep === 1 && (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                ) }
              </motion.div>

              { /* Step 3: Prioritization */ }
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200"
                animate={{
                  borderColor: activeStep === 2 ? primaryColor : '#e5e7eb',
                  backgroundColor: activeStep === 2 ? `${primaryColor}10` : '#ffffff',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Smart Prioritization</div>
                  <div className="text-xs text-gray-600">Risk-based ranking</div>
                </div>
                { activeStep === 2 && (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                ) }
              </motion.div>

              { /* Step 4: Automated Response */ }
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200"
                animate={{
                  borderColor: activeStep === 3 ? primaryColor : '#e5e7eb',
                  backgroundColor: activeStep === 3 ? `${primaryColor}10` : '#ffffff',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Automated Response</div>
                  <div className="text-xs text-gray-600">Fix generation</div>
                </div>
                { activeStep === 3 && (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                ) }
              </motion.div>
            </div>

            { /* Output Results */ }
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-xs font-medium text-green-700">Secure</div>
                <div className="text-xs text-green-600">Application</div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
                <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-xs font-medium text-blue-700">Fast</div>
                <div className="text-xs text-blue-600">Deployment</div>
              </div>
            </div>

            { /* Processing Indicator */ }
            <div className="text-center mt-4">
              <div className="text-xs text-gray-500 mb-2">Processing Challenge { activeStep + 1 } of 4</div>
              <div className="flex justify-center gap-1">
                { [0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step === activeStep ? 'scale-125' : ''
                    }`}
                    style={{
                      backgroundColor: step === activeStep ? primaryColor : '#d1d5db',
                    }}
                  />
                )) }
              </div>
            </div>
          </div>
        </div>

        { /* Bottom Results Summary */ }
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold" style={{ color: primaryColor }}>
                75%
              </div>
              <div className="text-xs text-gray-600">Faster Fixes</div>
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: primaryColor }}>
                90%
              </div>
              <div className="text-xs text-gray-600">Less Alerts</div>
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: primaryColor }}>
                60%
              </div>
              <div className="text-xs text-gray-600">Less Overhead</div>
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: primaryColor }}>
                24/7
              </div>
              <div className="text-xs text-gray-600">Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
