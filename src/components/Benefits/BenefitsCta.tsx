"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"

export default function BenefitsCta() {
  const ctaFeatures = [
    { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security" },
    { icon: <Zap className="w-5 h-5" />, text: "AI-powered automation" },
    { icon: <Users className="w-5 h-5" />, text: "Seamless team collaboration" },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Secure Faster. Scale Smarter.{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Collaborate Better
            </span>{" "}
            — with PLEXICUS.
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Transform your DevSecOps journey with cutting-edge security automation that adapts to your team's needs and
            scales with your growth.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {ctaFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <div className="text-purple-400">{feature.icon}</div>
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-200"
            >
              Schedule Demo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-200"
            >
              View Pricing
            </motion.button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-400 mb-4">Trusted by development teams worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Companies</div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm">Developers</div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm">Vulnerabilities Fixed</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
