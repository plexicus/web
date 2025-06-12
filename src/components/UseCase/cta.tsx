'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Users, ArrowRight, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UseCaseCTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
      { /* Background Effects */ }
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            { /* Main Headline */ }
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Ready to Transform Your{ ' ' }
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Security Pipeline
              </span>
              ?
            </h2>

            { /* Subtitle */ }
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
                Join thousands of development teams who trust PLEXICUS to secure their applications, streamline
                compliance, and accelerate delivery without compromising on security.
              </p>
            </div>

            { /* Feature Highlights */ }
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 py-12"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
                <p className="text-purple-200">
                  Bank-grade security with zero-trust architecture and continuous monitoring
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI Automation</h3>
                <p className="text-purple-200">
                  Intelligent threat detection and automated remediation powered by machine learning
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Team Collaboration</h3>
                <p className="text-purple-200">Seamless integration with your existing tools and workflows</p>
              </div>
            </motion.div>

            { /* CTA Buttons */ }
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 px-10 py-5 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ArrowRight className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Start Your Free Trial
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 group"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Demo
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 px-10 py-5 text-lg font-semibold rounded-full transition-all duration-300 group"
              >
                <DollarSign className="mr-2 w-5 h-5" />
                View Pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
