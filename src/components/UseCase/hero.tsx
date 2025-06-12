'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Users, Target } from 'lucide-react';

export default function UseCasesHero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex justify-center space-x-4 mb-8">
              <div className="p-3 bg-purple-100 rounded-full">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PLEXICUS
              </span>{ ' ' }
              Use Cases
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">Secure DevSecOps at Every Stage</p>

            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                Transform your software delivery lifecycle with PLEXICUS — the intelligent platform for embedding
                security, streamlining compliance, and accelerating secure development.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-purple-700 text-lg">
                🔍 From code commit to production, discover how leading teams use PLEXICUS to automate, monitor, and
                remediate security risks without sacrificing velocity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
