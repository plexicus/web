'use client';

import { motion } from 'framer-motion';
import { Code, GitBranch, Cloud, Brain, Eye, CheckCircle, Zap } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function AspmHero({ lang }) {
  console.log({ lang });
  const t = useTranslations(lang);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      { /* Background decoration */ }
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          { /* Left Side - Content */ }
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                { t('aspm.hero.title') }{ ' ' }
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  { t('aspm.hero.titleHighlight') }
                </span>{ ' ' }
                { t('aspm.hero.titleEnd') }
              </h1>

              <div className="space-y-3 text-lg md:text-xl text-gray-300">
                <p>{ t('aspm.hero.problems.0') }</p>
                <p>{ t('aspm.hero.problems.1') }</p>
                <p>{ t('aspm.hero.problems.2') }</p>
              </div>

              <p className="text-xl md:text-2xl font-semibold text-purple-300">
                { t('aspm.hero.solution') }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                { t('aspm.hero.buttons.getStarted') }
              </button>
              <button className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-200">
                { t('aspm.hero.buttons.viewDemo') }
              </button>
            </div>
          </motion.div>

          { /* Right Side - Interactive Pipeline Visualization */ }
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AspmPipelineVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AspmPipelineVisualization() {
  const t = useTranslations('en');
  const stages = [
    {
      title: t('aspm.hero.pipeline.stages.sourceCode.title'),
      icon: <Code className="w-6 h-6" />,
      issues: [t('aspm.hero.pipeline.stages.sourceCode.issues.0'), t('aspm.hero.pipeline.stages.sourceCode.issues.1'), t('aspm.hero.pipeline.stages.sourceCode.issues.2')],
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.hero.pipeline.stages.buildPipeline.title'),
      icon: <GitBranch className="w-6 h-6" />,
      issues: [t('aspm.hero.pipeline.stages.buildPipeline.issues.0'), t('aspm.hero.pipeline.stages.buildPipeline.issues.1'), t('aspm.hero.pipeline.stages.buildPipeline.issues.2')],
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.hero.pipeline.stages.production.title'),
      icon: <Cloud className="w-6 h-6" />,
      issues: [t('aspm.hero.pipeline.stages.production.issues.0'), t('aspm.hero.pipeline.stages.production.issues.1'), t('aspm.hero.pipeline.stages.production.issues.2')],
      color: 'from-[#8220ff] to-[#6010cc]',
    },
  ];

  const plexicusComponents = [
    { name: t('aspm.hero.pipeline.plexicus.components.0'), icon: <Brain className="w-5 h-5" /> },
    { name: t('aspm.hero.pipeline.plexicus.components.1'), icon: <Zap className="w-5 h-5" /> },
    { name: t('aspm.hero.pipeline.plexicus.components.2'), icon: <Eye className="w-5 h-5" /> },
    { name: t('aspm.hero.pipeline.plexicus.components.3'), icon: <CheckCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-8">
      { /* Pipeline Stages */ }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        { stages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stage.color}`}>{ stage.icon }</div>
              <h3 className="font-semibold text-white">{ stage.title }</h3>
            </div>
            <ul className="space-y-1 text-sm text-gray-300">
              { stage.issues.map((issue, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  { issue }
                </motion.li>
              )) }
            </ul>
          </motion.div>
        )) }
      </div>

      { /* Flow Arrow */ }
      <div className="flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-purple-400"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      { /* Plexicus ASPM Platform */ }
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 border border-purple-400"
      >
        <h3 className="text-xl font-bold text-white mb-4 text-center">{ t('aspm.hero.pipeline.plexicus.title') }</h3>
        <div className="grid grid-cols-2 gap-3">
          { plexicusComponents.map((component, index) => (
            <motion.div
              key={component.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2"
            >
              <div className="text-purple-200">{ component.icon }</div>
              <span className="text-sm font-medium text-white">{ component.name }</span>
            </motion.div>
          )) }
        </div>
      </motion.div>

      { /* Vulnerability Flow Animation */ }
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        { Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full"
            animate={{
              x: [0, 100, 200, 300],
              y: [50 + i * 20, 60 + i * 20, 70 + i * 20, 200],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            style={{
              left: '10%',
              top: '20%',
            }}
          />
        )) }
      </motion.div>
    </div>
  );
}
