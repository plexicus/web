'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Building, MapPin, Eye, FileCheck, CheckCircle } from 'lucide-react';

export default function ComplianceAutomation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const complianceFlow = [
    {
      icon: Building,
      label: 'Standards Setup',
      command: 'plexicus compliance init --standards=sox,hipaa,pci',
      result: '✓ SOX, HIPAA, PCI-DSS standards configured',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: MapPin,
      label: 'Control Mapping',
      command: 'plexicus map-controls --auto-align',
      result: '✓ 127 controls automatically mapped to security policies',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Eye,
      label: 'Continuous Monitoring',
      command: 'plexicus monitor --realtime-tracking',
      result: '✓ Real-time compliance monitoring activated',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: FileCheck,
      label: 'Audit Reports',
      command: 'plexicus generate-report --audit-ready',
      result: '✓ Audit-ready compliance report generated',
      color: 'from-green-500 to-green-600',
    },
  ];

  const standards = ['SOX', 'HIPAA', 'PCI-DSS', 'NIST', 'ISO 27001', 'GDPR'];

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
    if (stepIndex >= complianceFlow.length) return;

    typeText(complianceFlow[stepIndex].command, () => {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => {
          if (stepIndex + 1 < complianceFlow.length) {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">📜 Regulatory Compliance Automation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Automated compliance monitoring with continuous control mapping
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          { /* Standards Grid */ }
          { currentStep > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                { standards.map((standard, index) => (
                  <motion.div
                    key={standard}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-full text-white font-medium relative"
                  >
                    { standard }
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </motion.div>
                  </motion.div>
                )) }
              </div>
            </motion.div>
          ) }

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
              <span className="ml-4 text-gray-400">PLEXICUS Compliance Engine</span>
            </div>

            <div className="space-y-2">
              { complianceFlow.slice(0, Math.floor(currentStep)).map((step, index) => (
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
                <div className="text-yellow-400">Validating compliance...</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${processingProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="text-gray-400 text-xs">{ Math.round(processingProgress) }% complete</div>
              </div>
            ) }
          </motion.div>

          { /* Compliance Flow */ }
          <div className="space-y-8">
            { complianceFlow.map((step, index) => (
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
