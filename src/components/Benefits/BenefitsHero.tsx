'use client';

import { motion } from 'framer-motion';
import DevSecOpsFlow from './DevSecOpsFlow';

export default function BenefitsHero() {
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
                Unlocking Strategic{ ' ' }
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Advantages
                </span>{ ' ' }
                with PLEXICUS
              </h1>

              <p className="text-xl md:text-2xl text-white leading-relaxed">
                Enhancing Security in the Development Lifecycle
              </p>

              <p className="text-lg text-white leading-relaxed">
                Explore how PLEXICUS transforms your DevSecOps journey by providing a seamless integration of proactive
                security measures, ensuring a robust and secure development process with cutting-edge tools designed for
                optimal cybersecurity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Explore Benefits
              </button>
              <button className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-200">
                View Demo
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
