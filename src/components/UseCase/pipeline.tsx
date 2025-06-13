'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Code, Search, BarChart3, Wrench, Cloud, CheckCircle } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';

export default function DevSecOpsPipeline({ lang }) {
  const t = useTranslations(lang);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stages = [
    {
      icon: Code,
      label: 'Code',
      command: t('use-case.devsecops_pipeline.steps.code.command'),
      result: t('use-case.devsecops_pipeline.steps.code.result'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Search,
      label: 'Scan',
      command: t('use-case.devsecops_pipeline.steps.scan.command'),
      result: t('use-case.devsecops_pipeline.steps.scan.result'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BarChart3,
      label: 'Analyze',
      command: t('use-case.devsecops_pipeline.steps.analyze.command'),
      result: t('use-case.devsecops_pipeline.steps.analyze.result'),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Wrench,
      label: 'Fix',
      command: t('use-case.devsecops_pipeline.steps.fix.command'),
      result: t('use-case.devsecops_pipeline.steps.fix.result'),
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Cloud,
      label: 'Deploy',
      command: t('use-case.devsecops_pipeline.steps.deploy.command'),
      result: t('use-case.devsecops_pipeline.steps.deploy.result'),
      color: 'from-teal-500 to-teal-600',
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
            return prev + 3;
          });
        }, 50);
      }
    }, 50);
  };

  const processStep = (stepIndex: number) => {
    if (stepIndex >= stages.length) return;

    typeText(stages[stepIndex].command, () => {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => {
          if (stepIndex + 1 < stages.length) {
            processStep(stepIndex + 1);
          }
        }, 2000);
      }, 500);
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">🔄 { t('use-case.devsecops_pipeline.title') }</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            { t('use-case.devsecops_pipeline.subtitle') }
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
              <span className="ml-4 text-gray-400">{ t('use-case.devsecops_pipeline.terminal_title') }</span>
            </div>

            <div className="space-y-2">
              { stages.slice(0, Math.floor(currentStep)).map((stage, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                  <div className="text-green-400">$ { stage.command }</div>
                  <div className="text-gray-300 pl-2">{ stage.result }</div>
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
                  <div className="text-yellow-400">{ t('use-case.devsecops_pipeline.processing') }</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${processingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="text-gray-400 text-xs">{ Math.round(processingProgress) }%{ t('use-case.common.processing.complete') }</div>
                </div>
              ) }
            </div>
          </motion.div>

          { /* Visual Pipeline */ }
          <div className="flex flex-wrap justify-center items-center gap-8">
            { stages.map((stage, index) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{
                  opacity: index < currentStep ? 1 : 0.3,
                  scale: index < currentStep ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                className="relative text-center"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stage.color} rounded-full flex items-center justify-center shadow-lg mb-4 relative`}
                >
                  <stage.icon className="w-8 h-8 text-white" />
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
                <h3 className="text-lg font-semibold text-gray-900">{ stage.label }</h3>
              </motion.div>
            )) }
          </div>
        </div>
      </div>
    </section>
  );
}
