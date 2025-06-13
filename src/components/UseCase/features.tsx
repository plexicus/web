'use client';

import { useTranslations } from '@/i18n/utils';
import { motion } from 'framer-motion';
import { Code, GitPullRequest, Shield, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { useState, useEffect, useRef, useTransition } from 'react';

export default function DeveloperWorkflowSection({ lang }) {
  const t = useTranslations(lang);
  const [activeStep, setActiveStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const workflowSteps = [
    {
      id: 0,
      icon: Shield,
      title: t('use-case.developer_workflow.steps.threat_detection.title'),
      description: t('use-case.developer_workflow.steps.threat_detection.description'),
      processingText: t('use-case.developer_workflow.steps.threat_detection.processing'),
      result: t('use-case.developer_workflow.steps.threat_detection.result'),
      command: 'plexicus scan --continuous --ai-detection',
      code: '// Vulnerable code detected\nconst query = `SELECT * FROM users WHERE id = ${userId}`',
      status: 'detected',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 1,
      icon: Code,
      title: t('use-case.developer_workflow.steps.ai_analysis.title'),
      description: t('use-case.developer_workflow.steps.ai_analysis.description'),
      processingText: t('use-case.developer_workflow.steps.ai_analysis.processing'),
      result: t('use-case.developer_workflow.steps.ai_analysis.result'),
      command: 'plexicus analyze --context-aware --generate-fix',
      code: "// AI-generated secure fix\nconst query = 'SELECT * FROM users WHERE id = ?'\ndb.query(query, [userId])",
      status: 'fixing',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 2,
      icon: GitPullRequest,
      title: t('use-case.developer_workflow.steps.pr_creation.title'),
      description: t('use-case.developer_workflow.steps.pr_creation.description'),
      processingText: t('use-case.developer_workflow.steps.pr_creation.processing'),
      result: t('use-case.developer_workflow.steps.pr_creation.result'),
      command: 'plexicus create-pr --auto-fix --detailed-explanation',
      code: 'PR #42: Fix SQL Injection Vulnerability\n✅ Parameterized query implementation\n✅ Input validation added',
      status: 'review',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 3,
      icon: CheckCircle,
      title: t('use-case.developer_workflow.steps.approval.title'),
      description: t('use-case.developer_workflow.steps.approval.description'),
      processingText: t('use-case.developer_workflow.steps.approval.processing'),
      result: t('use-case.developer_workflow.steps.approval.result'),
      command: 'plexicus merge --security-verified',
      code: '✅ Security review passed\n✅ Tests passing\n✅ Ready to merge',
      status: 'complete',
      color: 'from-green-500 to-green-600',
    },
  ];

  const typeText = (text: string, callback: ()=> void) => {
    setIsTyping(true);
    setTypedText('');
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

        // Simulate processing with progress bar
        let progress = 0;
        const progressTimer = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(progressTimer);

            // Complete processing
            setTimeout(() => {
              setIsProcessing(false);
              callback();
            }, 300);
          }
          setProcessingProgress(Math.min(progress, 100));
        }, 200);
      }
    }, 50);
  };

  const processStep = (stepIndex: number) => {
    if (stepIndex >= workflowSteps.length) return;

    setActiveStep(stepIndex);
    typeText(workflowSteps[stepIndex].command, () => {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => {
          if (stepIndex + 1 < workflowSteps.length) {
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">🚀 { t('use-case.developer_workflow.title') }</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            { t('use-case.developer_workflow.subtitle') }
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          { /* Terminal */ }
          { isInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900 rounded-lg p-6 mb-8 font-mono text-sm"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-400">PLEXICUS Developer Workflow</span>
              </div>

              <div className="space-y-2">
                { workflowSteps.slice(0, Math.floor(currentStep)).map((step, index) => (
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

                { isProcessing && activeStep < workflowSteps.length && (
                  <div className="space-y-2">
                    <div className="text-yellow-400 pl-2">
                      { workflowSteps[activeStep].processingText } ({ Math.round(processingProgress) }%)
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${workflowSteps[activeStep].color}`}
                        style={{ width: `${processingProgress}%` }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${processingProgress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                ) }
              </div>
            </motion.div>
          ) }

          { /* Interactive Workflow Steps */ }
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            { /* Left Side - Step Navigation */ }
            <div className="space-y-4">
              { workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0.3, x: -30 }}
                  animate={{
                    opacity: index <= activeStep ? 1 : 0.3,
                    x: index <= activeStep ? 0 : -30,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-white shadow-lg border-l-4 border-purple-500'
                      : 'bg-gray-50 hover:bg-white hover:shadow-md'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="p-6 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          activeStep === index ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{ step.title }</h3>
                        <p className="text-gray-600 text-sm">{ step.description }</p>
                      </div>
                      { activeStep === index && <ArrowRight className="w-5 h-5 text-purple-500" /> }
                      { index < currentStep && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      ) }
                    </div>
                  </div>
                </motion.div>
              )) }
            </div>

            { /* Right Side - Code Preview */ }
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-xs">
                  Step { activeStep + 1 } of { workflowSteps.length }
                </span>
              </div>
              <pre className="whitespace-pre-wrap">{ workflowSteps[activeStep].code }</pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
