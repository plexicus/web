'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Code, Shield, Settings, Users, BarChart3, CheckCircle, MessageSquare } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';

export default function CrossFunctionalCollaboration({ lang }) {
  const t = useTranslations(lang);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const collaborationSteps = [
    {
      icon: Users,
      label: t('use-case.cross_functional.steps.setup.label'),
      command: t('use-case.cross_functional.steps.setup.command'),
      result: t('use-case.cross_functional.steps.setup.result'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BarChart3,
      label: t('use-case.cross_functional.steps.dashboard.label'),
      command: t('use-case.cross_functional.steps.dashboard.command'),
      result: t('use-case.cross_functional.steps.dashboard.result'),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: MessageSquare,
      label: t('use-case.cross_functional.steps.sync.label'),
      command: t('use-case.cross_functional.steps.sync.command'),
      result: t('use-case.cross_functional.steps.sync.result'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: CheckCircle,
      label: t('use-case.cross_functional.steps.response.label'),
      command: t('use-case.cross_functional.steps.response.command'),
      result: t('use-case.cross_functional.steps.response.result'),
      color: 'from-green-500 to-green-600',
    },
  ];

  const teams = [
    { icon: Code, label: t('use-case.cross_functional.teams.dev.label'), color: 'from-blue-500 to-blue-600', role: t('use-case.cross_functional.teams.dev.role') },
    { icon: Shield, label: t('use-case.cross_functional.teams.sec.label'), color: 'from-red-500 to-red-600', role: t('use-case.cross_functional.teams.sec.role') },
    { icon: Settings, label: t('use-case.cross_functional.teams.ops.label'), color: 'from-green-500 to-green-600', role: t('use-case.cross_functional.teams.ops.role') },
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
            return prev + 2.5;
          });
        }, 30);
      }
    }, 50);
  };

  const processStep = (stepIndex: number) => {
    if (stepIndex >= collaborationSteps.length) return;

    typeText(collaborationSteps[stepIndex].command, () => {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => {
          if (stepIndex + 1 < collaborationSteps.length) {
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            🤝 { t('use-case.cross_functional.title') }
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            { t('use-case.cross_functional.subtitle') }
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
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
              <span className="ml-4 text-gray-400">{ t('use-case.cross_functional.terminal_title') }</span>
            </div>

            <div className="space-y-2">
              { collaborationSteps.slice(0, Math.floor(currentStep)).map((step, index) => (
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
                  <div className="text-yellow-400">{ t('use-case.cross_functional.processing') }</div>
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

          { /* Team Visualization */ }
          <div className="flex flex-col items-center space-y-8 mb-8">
            { /* Teams Row */ }
            <div className="flex flex-wrap justify-center items-center gap-8">
              { teams.map((team, index) => (
                <motion.div
                  key={team.label}
                  initial={{ opacity: 0.3, y: 30 }}
                  animate={{
                    opacity: currentStep > 0 ? 1 : 0.3,
                    y: currentStep > 0 ? 0 : 30,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${team.color} rounded-full flex items-center justify-center shadow-lg mb-4`}
                  >
                    <team.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{ team.label }</h3>
                  <p className="text-sm text-gray-600">{ team.role }</p>
                  { currentStep > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  ) }
                </motion.div>
              )) }
            </div>

            { /* PLEXICUS Platform */ }
            { currentStep >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 shadow-xl"
              >
                <div className="text-center">
                  <Users className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{ t('use-case.cross_functional.platform.title') }</h3>
                  <p className="text-purple-200">{ t('use-case.cross_functional.platform.subtitle') }</p>
                </div>
              </motion.div>
            ) }
          </div>
        </div>
      </div>
    </section>
  );
}
