
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '@/components/ui/image';
import { Shield, Zap, Eye, Brain, TrendingUp, Clock, Users, Target } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';

export default function InteractiveAspmSection({ lang }) {
  const t = useTranslations(lang);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const features = [
    {
      id: 'visibility',
      title: t('aspm.securityCoPilot.features.visibility.title'),
      description: t('aspm.securityCoPilot.features.visibility.description'),
      icon: <Eye className="w-6 h-6" />,
      stats: t('aspm.securityCoPilot.features.visibility.stats'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'intelligence',
      title: t('aspm.securityCoPilot.features.intelligence.title'),
      description: t('aspm.securityCoPilot.features.intelligence.description'),
      icon: <Brain className="w-6 h-6" />,
      stats: t('aspm.securityCoPilot.features.intelligence.stats'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'automation',
      title: t('aspm.securityCoPilot.features.automation.title'),
      description: t('aspm.securityCoPilot.features.automation.description'),
      icon: <Zap className="w-6 h-6" />,
      stats: t('aspm.securityCoPilot.features.automation.stats'),
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'protection',
      title: t('aspm.securityCoPilot.features.protection.title'),
      description: t('aspm.securityCoPilot.features.protection.description'),
      icon: <Shield className="w-6 h-6" />,
      stats: t('aspm.securityCoPilot.features.protection.stats'),
      color: 'from-green-500 to-emerald-500',
    },
  ];
  
  const benefits = [
    { icon: <TrendingUp className="w-5 h-5" />, text: t('aspm.securityCoPilot.benefits.0.text') },
    { icon: <Clock className="w-5 h-5" />, text: t('aspm.securityCoPilot.benefits.1.text') },
    { icon: <Users className="w-5 h-5" />, text: t('aspm.securityCoPilot.benefits.2.text') },
    { icon: <Target className="w-5 h-5" />, text: t('aspm.securityCoPilot.benefits.3.text') },
  ];
  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const featureCardVariants = {
    inactive: {
      scale: 0.95,
      opacity: 0.7,
      y: 10,
    },
    active: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      { /* Background decoration */ }
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 translate-y-48 -translate-x-48"></div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row-reverse  items-center gap-12">
          { /* Content Section */ }
          <div className="lg:w-1/2 space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                { t('aspm.securityCoPilot.titlePart1') } { ' ' }
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  { t('aspm.securityCoPilot.titleHighlight') }
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                { t('aspm.securityCoPilot.description') }
              </p>
            </motion.div>

            { /* Interactive Features */ }
            <motion.div className="space-y-4" variants={itemVariants}>
              { features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'border-purple-300 bg-white shadow-lg'
                      : 'border-gray-200 bg-white/50 hover:border-gray-300'
                  }`}
                  variants={featureCardVariants}
                  animate={activeFeature === index ? 'active' : 'inactive'}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}
                    >
                      { feature.icon }
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{ feature.title }</h3>
                      <p className="text-sm text-gray-600">{ feature.description }</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-purple-600">{ feature.stats }</div>
                    </div>
                  </div>
                </motion.div>
              )) }
            </motion.div>

            { /* Benefits */ }
            <motion.div className="space-y-3" variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h3>
              { benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    { benefit.icon }
                  </div>
                  <span>{ benefit.text }</span>
                </motion.div>
              )) }
            </motion.div>

            { /* CTA Button */ }
            { /* <motion.div variants={itemVariants}>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Platform Features
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div> */ }
          </div>

          { /* Image Section */ }
          <div className="lg:w-1/2">
            <motion.div
              className="relative"
              variants={imageVariants}
              whileHover="hover"
              style={{ perspective: '1000px' }}
            >
              { /* Floating elements around the image */ }
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              >
                <Shield className="w-8 h-8" />
              </motion.div>

              <motion.div
                className="absolute -top-2 -right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                <Brain className="w-6 h-6" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-2 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <Zap className="w-7 h-7" />
              </motion.div>

              { /* Main image with enhanced styling */ }
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl"></div>
                <motion.div
                  className="relative rounded-xl overflow-hidden"
                  animate={{
                    boxShadow: [
                      '0 10px 30px rgba(0,0,0,0.1)',
                      '0 20px 40px rgba(0,0,0,0.15)',
                      '0 10px 30px rgba(0,0,0,0.1)',
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                >
                  <Image
                    src="/productivity-dashboard.png"
                    alt="Plexicus ASPM Security Dashboard"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />

                  { /* Overlay with pulse effect */ }
                  <AnimatePresence>
                    { isImageLoaded && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                        }}
                      />
                    ) }
                  </AnimatePresence>
                </motion.div>

                { /* Interactive dots on the image */ }
                <motion.div
                  className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />
              </div>

              { /* Feature highlight badge */ }
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center text-white text-xs`}
                    >
                      { features[activeFeature].icon }
                    </div>
                    <span className="text-sm font-medium text-gray-700">{ features[activeFeature].title }</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
