'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Brain, FileText, CheckCircle, Code } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';

export default function AIRemediation({ lang }) {
  const t = useTranslations(lang);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const remediationFlow = [
    {
      icon: AlertTriangle,
      label: t('use-case.ai_remediation.steps.detection.label'),
      command: t('use-case.ai_remediation.steps.detection.command'),
      result: t('use-case.ai_remediation.steps.detection.result'),
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Brain,
      label: t('use-case.ai_remediation.steps.analysis.label'),
      command: t('use-case.ai_remediation.steps.analysis.command'),
      result: t('use-case.ai_remediation.steps.analysis.result'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FileText,
      label: t('use-case.ai_remediation.steps.generation.label'),
      command: t('use-case.ai_remediation.steps.generation.command'),
      result: t('use-case.ai_remediation.steps.generation.result'),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: CheckCircle,
      label: t('use-case.ai_remediation.steps.apply.label'),
      command: t('use-case.ai_remediation.steps.apply.command'),
      result: t('use-case.ai_remediation.steps.apply.result'),
      color: 'from-green-500 to-green-600',
    },
  ];

  const typeText = (text: string, callback: ()=> void) => {
    setIsTyping(true);
    setTypedText('use-case.');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        // Start processing animation
        setIsProcessing(true);
        setProcessingProgress(0);

        // Animate progress bar
        const progressTimer = setInterval(() => {
          setProcessingProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressTimer);
              setIsProcessing(false);
              setTimeout(callback, 200);
              return 100;
            }
            return prev + 2;
          });
        }, 50);
      }
    }, 50);
  };

  const processStep = (stepIndex: number) => {
    if (stepIndex >= remediationFlow.length) return;

    typeText(remediationFlow[stepIndex].command, () => {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => {
          if (stepIndex + 1 < remediationFlow.length) {
            processStep(stepIndex + 1);
          }
        }, 2000);
      }, 1000);
    });
  };

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsInView(true);
          const timer = setTimeout(() => {
            setHasStarted(true);
            setCurrentStep(0);
            processStep(0);
          }, 1000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">🤖 { t('use-case.ai_remediation.title') }</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            { t('use-case.ai_remediation.subtitle') }
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          { /* Terminal */ }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-lg p-6 mb-8 font-mono text-sm"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400">{ t('use-case.ai_remediation.terminal_title') }</span>
            </div>

            <div className="space-y-2">
              { remediationFlow.slice(0, Math.floor(currentStep)).map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                  <div className="text-green-400">$ { step.command }</div>
                  <div className="text-gray-300 pl-2">{ step.result }</div>
                </motion.div>
              )) }

              { isTyping && (
                <div className="text-green-400">
                  $ { typedText }
                  <span className="animate-pulse">|</span>
                </div>
              ) }

              { isProcessing && (
                <div className="space-y-2">
                  <div className="text-yellow-400">{ t('use-case.ai_remediation.processing') }</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${processingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="text-gray-400 text-xs">{ Math.round(processingProgress) }%{ t('use-case.common.processing.complete') }</div>
                </div>
              ) }
            </div>
          </motion.div>

          { /* Code Diff Preview */ }
          { currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-purple-600" />
                { t('use-case.ai_remediation.code_diff.title') }
              </h3>
              <div className="bg-gray-50 rounded p-4 font-mono text-sm">
                <div className="text-red-600">- { t('use-case.ai_remediation.code_diff.before') }</div>
                <div className="text-green-600">+ { t('use-case.ai_remediation.code_diff.after') }</div>
              </div>
            </motion.div>
          ) }

          { /* Visual Flow */ }
          <div className="space-y-8">
            { remediationFlow.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0.3, x: index % 2 === 0 ? -50 : 50 }}
                animate={{
                  opacity: index < currentStep ? 1 : 0.3,
                  x: index < currentStep ? 0 : index % 2 === 0 ? -50 : 50,
                }}
                transition={{ duration: 0.5 }}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className="bg-white border border-purple-200 rounded-lg p-6 max-w-md shadow-sm relative">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{ step.label }</h3>
                      <p className="text-purple-600 text-sm">{ step.result }</p>
                    </div>
                  </div>
                  { index < currentStep && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  ) }
                </div>
              </motion.div>
            )) }
          </div>
        </div>
      </div>
    </section>
  );
}
