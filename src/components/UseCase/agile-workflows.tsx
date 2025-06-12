'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Calendar, Code, Search, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function AgileWorkflows() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const workflowSteps = [
    {
      icon: Calendar,
      label: 'Sprint Planning',
      command: 'plexicus sprint-init --security-gates',
      result: '✓ Security requirements integrated into sprint backlog',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Code,
      label: 'Development',
      command: 'git push origin feature/user-auth',
      result: '✓ Code pushed, pre-commit security hooks triggered',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Search,
      label: 'Real-time Scan',
      command: 'plexicus scan --realtime --feedback',
      result: '✓ Security feedback delivered in 30 seconds',
      color: 'from-purple-600 to-indigo-600',
    },
    {
      icon: MessageSquare,
      label: 'Developer Feedback',
      command: 'plexicus feedback --ide-integration',
      result: '✓ Security context delivered directly to IDE',
      color: 'from-pink-500 to-purple-500',
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
        }, 25);
      }
    }, 50);
  };

  const processStep = (stepIndex: number) => {
    if (stepIndex >= workflowSteps.length) return;

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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">⚡ Agile-Ready Security Workflows</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real-time security feedback integrated into your agile development process
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
              <span className="ml-4 text-gray-400">PLEXICUS Agile Integration</span>
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
            </div>
            { isProcessing && (
              <div className="space-y-2">
                <div className="text-yellow-400">Integrating with agile workflow...</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${processingProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="text-gray-400 text-xs">{ Math.round(processingProgress) }% complete</div>
              </div>
            ) }
          </motion.div>

          { /* Visual Workflow */ }
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            { workflowSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={{
                  opacity: index < currentStep ? 1 : 0.3,
                  scale: index < currentStep ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                className="relative text-center"
              >
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg mb-4 relative`}
                >
                  <step.icon className="w-8 h-8 text-white" />
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
                <p className="text-center mt-3 font-medium text-gray-900">{ step.label }</p>
              </motion.div>
            )) }
          </div>
        </div>
      </div>
    </section>
  );
}
