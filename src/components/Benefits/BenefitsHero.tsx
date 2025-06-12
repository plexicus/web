'use client';

import { motion } from 'framer-motion';
import DevSecOpsFlow from './DevSecOpsFlow';
import { useTranslations } from '../../i18n/utils'; // Assuming correct relative path

export default function BenefitsHero({ lang }) {
  const t = useTranslations(lang); // Use the lang prop for translation

  return (
    <section
      className="py-20 md:py-32 text-white relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at right, #000000 0%, #1a1a1a 40%, #4a0ba3 70%, #8220ff 100%)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
      }}
    >
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
                { t('benefits.hero.title') }{ ' ' }
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  { t('benefits.hero.titleHighlight') }
                </span>{ ' ' }
                { t('benefits.hero.titleEnd') }
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                { t('benefits.hero.subtitle') }
              </p>

              <p className="text-lg text-gray-400 leading-relaxed">
                { t('benefits.hero.description') }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                { t('benefits.hero.buttons.explore') }
              </button>
              <button className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-200">
                { t('benefits.hero.buttons.demo') }
              </button>
            </div>
          </motion.div>

          { /* Right Side - DevSecOps Flow Visualization */ }
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <DevSecOpsFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
