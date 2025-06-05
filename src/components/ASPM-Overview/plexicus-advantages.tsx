'use client';

import { motion } from 'framer-motion';
import { Brain, GitMerge, BellOff, Zap, Eye, Gauge, ArrowRight } from 'lucide-react';

const advantages = [
  {
    title: 'AI-Driven Intelligence',
    description:
      'Leverage cutting-edge AI for superior threat detection, contextual understanding, and automated response. Our machine learning models continuously improve to stay ahead of emerging threats.',
    icon: <Brain className="w-full h-full text-purple-600" />,
    stats: ['85% reduction in false positives', '3x faster threat detection'],
  },
  {
    title: 'Seamless DevSecOps Integration',
    description:
      'Embed security directly into your development pipelines with automated workflows, developer-friendly tools, and extensive ecosystem connectivity. Security becomes a natural part of development, not a bottleneck.',
    icon: <GitMerge className="w-full h-full text-indigo-600" />,
    stats: ['90% of security checks automated', 'Integrates with 50+ dev tools'],
  },
  {
    title: 'Reduced Alert Fatigue',
    description:
      'Focus on genuine threats with intelligent prioritization and false positive reduction. Our contextual analysis ensures you only see alerts that matter, ranked by actual risk to your business.',
    icon: <BellOff className="w-full h-full text-blue-600" />,
    stats: ['75% fewer alerts', '99.5% alert accuracy'],
  },
  {
    title: 'Accelerated Remediation',
    description:
      'Significantly shorten fix times with AI-generated code suggestions and streamlined approval processes. Turn weeks of security fixes into hours with automated remediation that developers can trust.',
    icon: <Zap className="w-full h-full text-amber-600" />,
    stats: ['60% faster remediation time', '87% of fixes automated'],
  },
  {
    title: 'Comprehensive Visibility & Control',
    description:
      'Gain a unified view of your application security risks across the entire SDLC, enhanced by deep integrations. No more blind spots or disconnected security tools - see everything in one place.',
    icon: <Eye className="w-full h-full text-emerald-600" />,
    stats: ['100% SDLC coverage', 'Real-time risk visualization'],
  },
  {
    title: 'Enhanced Efficiency',
    description:
      'Free up your security and development teams to focus on strategic initiatives by automating repetitive tasks. Reduce manual security work while improving overall protection and compliance.',
    icon: <Gauge className="w-full h-full text-rose-600" />,
    stats: ['40% reduction in security overhead', '2.5x developer productivity'],
  },
];

const AdvantageItem = ({ advantage, index }) => {
  const isEven = index % 2 === 1;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 py-12 border-b border-gray-200 last:border-0`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      { /* Icon Section */ }
      <motion.div className="w-full md:w-1/3 flex justify-center" variants={itemVariants}>
        <div className="relative">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-full flex items-center justify-center p-12">
            { advantage.icon }
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase font-semibold">Impact</div>
              <div className="text-purple-600 font-bold text-lg">+{ (index + 1) * 15 }%</div>
            </div>
          </div>
        </div>
      </motion.div>

      { /* Content Section */ }
      <motion.div className="w-full md:w-2/3 text-center md:text-left" variants={itemVariants}>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{ advantage.title }</h3>
        <p className="text-gray-600 mb-6">{ advantage.description }</p>

        { /* Stats */ }
        <div className="flex flex-wrap gap-4 mb-6">
          { advantage.stats.map((stat, i) => (
            <div key={i} className="bg-purple-50 px-4 py-2 rounded-full text-sm font-medium text-purple-700">
              { stat }
            </div>
          )) }
        </div>

        { /* Learn More Link */ }
        <a
          href="#"
          className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors"
        >
          Learn more <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default function PlexicusAdvantages() {
  return (
    <div className="max-w-5xl mx-auto mt-12">
      { advantages.map((advantage, index) => (
        <AdvantageItem key={index} advantage={advantage} index={index} />
      )) }
    </div>
  );
}
