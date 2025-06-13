'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Zap,
  Users,
  ArrowRight,
  Search,
  BarChart3,
  Wrench,
  Cloud,
  CheckCircle,
  GitBranch,
  Lock,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n/utils';

export default function UseCasesHero({ lang }) {
  const t = useTranslations(lang);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const workflowSteps = [
    {
      id: 'commit',
      icon: GitBranch,
      title: 'Developer Commits Code',
      description: 'Sarah pushes authentication feature to main branch',
      command: 'git push origin feature/user-auth',
      result: '✓ Code committed with security context',
      color: 'from-blue-500 to-blue-600',
      explanation: 'PLEXICUS automatically detects code changes and initiates security workflow',
    },
    {
      id: 'scan',
      icon: Search,
      title: 'Intelligent Security Scanning',
      description: 'Multi-layer security analysis across SAST, SCA, and IaC',
      command: 'plexicus scan --comprehensive --ai-enhanced',
      result: '✓ 127 files scanned, 3 critical vulnerabilities detected',
      color: 'from-purple-500 to-purple-600',
      explanation: 'AI-powered scanners identify potential security risks with contextual understanding',
    },
    {
      id: 'analyze',
      icon: BarChart3,
      title: 'AI Risk Correlation',
      description: 'Advanced threat intelligence and risk prioritization',
      command: 'plexicus analyze --risk-correlation --business-impact',
      result: '✓ Risk scoring complete, 2 high-priority issues identified',
      color: 'from-indigo-500 to-indigo-600',
      explanation: 'Machine learning algorithms correlate vulnerabilities with business impact and threat landscape',
    },
    {
      id: 'authorize',
      icon: Lock,
      title: 'Permission Validation',
      description: 'Automated authorization flow and access control verification',
      command: 'plexicus validate --permissions --rbac-compliance',
      result: '✓ Authorization matrix validated, access controls verified',
      color: 'from-orange-500 to-orange-600',
      explanation: 'Intelligent permission system ensures proper access controls are in place',
    },
    {
      id: 'remediate',
      icon: Wrench,
      title: 'Auto-Remediation Engine',
      description: 'AI-powered vulnerability fixing with developer approval',
      command: 'plexicus remediate --auto-fix --preserve-functionality',
      result: '✓ 2 vulnerabilities auto-fixed, 1 requires developer review',
      color: 'from-green-500 to-green-600',
      explanation: 'Smart remediation engine fixes issues while maintaining code functionality and developer intent',
    },
    {
      id: 'deploy',
      icon: Cloud,
      title: 'Secure Deployment',
      description: 'Production deployment with continuous monitoring',
      command: 'plexicus deploy --secure --runtime-protection',
      result: '✓ Secure deployment complete with runtime threat detection active',
      color: 'from-teal-500 to-teal-600',
      explanation: 'Code is securely deployed with continuous monitoring and runtime protection enabled',
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
            return prev + 2;
          });
        }, 30);
      }
    }, 40);
  };

  const processStep = (stepIndex: number) => {
    if (stepIndex >= workflowSteps.length) return;

    const step = workflowSteps[stepIndex];
    typeText(step.command, () => {
      setTimeout(() => {
        setCurrentStep(stepIndex + 1);
        setTimeout(() => {
          if (stepIndex + 1 < workflowSteps.length) {
            processStep(stepIndex + 1);
          }
        }, 3000);
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
          }, 1500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const currentStepData = workflowSteps[Math.floor(currentStep)] || workflowSteps[0];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at right, #000000 0%, #1a1a1a 40%, #4a0ba3 70%, #8220ff 100%)',
        boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)',
      }}
    >
      { /* Background Pattern */ }
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          { /* Header Content */ }
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-8">
              { t('use-case.hero.titleStart') }
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                { t('use-case.hero.titleCenter') }
              </span>{ ' ' }
              { t('use-case.hero.titleEnd') }
            </h1>

            <div className="flex flex-col mb-8">
              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed mb-6">
                <strong>{ t('use-case.hero.subtitleStrong') }</strong>
                { t('use-case.hero.subtitle') }
              </p>
              <div className="flex items-center justify-center gap-2 text-lg text-purple-200">
                <span>
                  { t('use-case.hero.description') }
                </span>
              </div>
            </div>
            { /* CTA Buttons */ }
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                { t('use-case.hero.buttons.trial') }
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
              >
                { t('use-case.hero.buttons.demo') }
              </Button>
            </motion.div>
          </motion.div>

          { /* Interactive Workflow Demo */ }
          <div className="flex flex-col gap-3 items-center">
            { /* Left Side - Current Step Info */ }
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full space-y-6"
            >
              { /* Feature Points */ }
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col gap-3 mb-8"
              >
                <div className="flex items-center gap-3 text-purple-100">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">{ t('use-case.hero.features.security') }</span>
                </div>
                <div className="flex items-center gap-3 text-purple-100">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">{ t('use-case.hero.features.automation') }</span>
                </div>
                <div className="flex items-center gap-3 text-purple-100">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">{ t('use-case.hero.features.collaboration') }</span>
                </div>
              </motion.div>
            </motion.div>

            { /* Right Side - Terminal and Visual Pipeline */ }
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full space-y-6"
            >
              { /* Terminal */ }
              <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400">PLEXICUS DevSecOps Workflow</span>
                </div>

                <div className="space-y-2 min-h-[200px]">
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

                  { isProcessing && (
                    <div className="space-y-2">
                      <div className="text-yellow-400">Processing...</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${processingProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <div className="text-gray-400 text-xs">{ Math.round(processingProgress) }% complete</div>
                    </div>
                  ) }
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
