'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  GitBranch,
  Play,
  Server,
  RefreshCw,
  Shield,
  CheckCircle,
  AlertTriangle,
  Pause,
  PlayIcon,
} from 'lucide-react';

const tabsData = [
  {
    title: 'Code',
    description:
      'The foundation of your application where developers write and review code, implement features, and fix bugs.',
    features: [
      'Static code analysis',
      'Code quality checks',
      'Vulnerability scanning',
      'Secret detection',
      'Dependency analysis',
    ],
    securityChallenges: [
      'Insecure coding patterns',
      'Hardcoded credentials',
      'Vulnerable dependencies',
      'Lack of security awareness',
    ],
    aspmSolution:
      'Plexicus ASPM integrates directly with your IDE and code repositories to provide real-time security feedback, identify vulnerabilities as code is written, and automatically suggest secure coding patterns.',
  },
  {
    title: 'Build',
    description:
      'The process of compiling code, running automated tests, and creating deployable artifacts for your application.',
    features: [
      'Automated builds',
      'Dependency resolution',
      'Artifact generation',
      'Container image creation',
      'Build verification',
    ],
    securityChallenges: [
      'Insecure dependencies',
      'Vulnerable base images',
      'Build server security',
      'Artifact tampering',
    ],
    aspmSolution:
      'Plexicus ASPM secures your build pipeline by scanning dependencies, validating container images, ensuring build integrity, and preventing vulnerable components from entering your production environment.',
  },
  {
    title: 'Testing',
    description:
      'Validating application functionality, performance, and security through automated and manual testing processes.',
    features: [
      'Unit testing',
      'Integration testing',
      'Security testing',
      'Performance testing',
      'User acceptance testing',
    ],
    securityChallenges: [
      'Incomplete security test coverage',
      'Missed edge cases',
      'False positives/negatives',
      'Delayed feedback loops',
    ],
    aspmSolution:
      'Plexicus ASPM enhances your testing phase with intelligent security test generation, prioritized vulnerability validation, and automated exploitation verification to ensure comprehensive security coverage.',
  },
  {
    title: 'Deploy',
    description:
      'Moving your application from development to production environments and making it available to users.',
    features: [
      'Deployment automation',
      'Environment configuration',
      'Infrastructure provisioning',
      'Release management',
      'Rollback capabilities',
    ],
    securityChallenges: [
      'Insecure configurations',
      'Privilege escalation risks',
      'Unauthorized access',
      'Deployment failures',
    ],
    aspmSolution:
      'Plexicus ASPM secures your deployment process by validating configurations, ensuring least privilege access, scanning infrastructure as code, and preventing insecure deployments from reaching production.',
  },
  {
    title: 'Monitor',
    description:
      'Continuously observing application performance, usage patterns, and security posture in production environments.',
    features: [
      'Performance monitoring',
      'Error tracking',
      'Security monitoring',
      'User behavior analytics',
      'Compliance reporting',
    ],
    securityChallenges: [
      'Delayed threat detection',
      'Alert fatigue',
      'Incomplete visibility',
      'Slow incident response',
    ],
    aspmSolution:
      'Plexicus ASPM provides continuous runtime security monitoring, intelligent alert prioritization, automated incident response, and comprehensive security dashboards for complete visibility into your application security posture.',
  },
];

const TabContent = ({ title, description, features, securityChallenges, aspmSolution }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-purple-700 text-sm font-bold">1</span>
            </span>
            Key Features
          </h3>
          <ul className="space-y-2">
            { features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{ feature }</span>
              </li>
            )) }
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-red-700 text-sm font-bold">2</span>
            </span>
            Security Challenges
          </h3>
          <ul className="space-y-2">
            { securityChallenges.map((challenge, index) => (
              <li key={index} className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{ challenge }</span>
              </li>
            )) }
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-blue-700 text-sm font-bold">3</span>
            </span>
            Plexicus ASPM Solution
          </h3>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-gray-700">{ aspmSolution }</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LifecycleTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const animationRef = useRef(null);
  const AUTOPLAY_INTERVAL = 3000; // 3 seconds per tab

  // Function to handle tab change
  const changeTab = (index) => {
    setActiveTab(index);
    setProgress(0); // Reset progress when tab changes
  };

  // Function to go to the next tab
  const goToNextTab = () => {
    const nextTab = (activeTab + 1) % tabsData.length;
    changeTab(nextTab);
  };

  // Setup autoplay
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up new interval
      intervalRef.current = setInterval(goToNextTab, AUTOPLAY_INTERVAL);

      // Set up progress animation
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / AUTOPLAY_INTERVAL) * 100;

        if (newProgress <= 100) {
          setProgress(newProgress);
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, activeTab]);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle manual tab click
  const handleTabClick = (index) => {
    changeTab(index);
    setIsPlaying(false); // Pause autoplay when user interacts
  };

  const getTabIcon = (index) => {
    switch (index) {
      case 0:
        return <Code className="w-5 h-5" />;
      case 1:
        return <GitBranch className="w-5 h-5" />;
      case 2:
        return <Play className="w-5 h-5" />;
      case 3:
        return <Server className="w-5 h-5" />;
      case 4:
        return <RefreshCw className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      { /* Title for the tabs */ }
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-purple-800">ASPM INTEGRATION</h3>
        <p className="text-gray-600 mt-2">Comprehensive security across your entire development lifecycle</p>
      </div>

      { /* Tabs with Play/Pause control */ }
      <div className="flex flex-col items-center mb-6">
        <div className="flex overflow-x-auto scrollbar-hide mb-2 pb-2 relative w-full">
          <div className="flex space-x-1 mx-auto">
            { tabsData.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`relative flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap overflow-hidden ${
                  activeTab === index
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                { /* Progress bar overlay - only visible for active tab */ }
                { activeTab === index && isPlaying && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-white opacity-70"
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                  />
                ) }
                <span className="mr-2">{ getTabIcon(index) }</span>
                <span>{ tab.title }</span>
              </button>
            )) }
          </div>
        </div>

        { /* Play/Pause button */ }
        <button
          onClick={togglePlayPause}
          className="flex items-center justify-center mt-2 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-sm transition-colors duration-200"
        >
          { isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-1" /> Pause
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4 mr-1" /> Play
            </>
          ) }
        </button>
      </div>

      { /* Tab Description */ }
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{ tabsData[activeTab].title } Phase</h3>
        <p className="text-gray-600 max-w-3xl mx-auto">{ tabsData[activeTab].description }</p>
      </div>

      { /* Tab Content */ }
      <AnimatePresence mode="wait">
        <TabContent key={activeTab} {...tabsData[activeTab]} />
      </AnimatePresence>

      { /* Progress Bar */ }
      <div className="mt-8 bg-gray-200 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
          initial={{ width: `${(activeTab / (tabsData.length - 1)) * 100}%` }}
          animate={{ width: `${(activeTab / (tabsData.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Development Start</span>
        <span>Production</span>
      </div>
    </div>
  );
}
