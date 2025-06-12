"use client"

import { motion } from "framer-motion"
import { Code, GitBranch, Shield, CheckCircle, Zap, Eye } from "lucide-react"

export default function DevSecOpsFlow() {
  const flowStages = [
    {
      title: "Develop",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      security: "Real-time scanning",
    },
    {
      title: "Integrate",
      icon: <GitBranch className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      security: "CI/CD security gates",
    },
    {
      title: "Deploy",
      icon: <Shield className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      security: "Automated validation",
    },
    {
      title: "Monitor",
      icon: <Eye className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      security: "Continuous monitoring",
    },
  ]

  const securityFeatures = [
    { name: "AI-Driven Detection", icon: <Zap className="w-5 h-5" /> },
    { name: "Intelligent Prioritization", icon: <Shield className="w-5 h-5" /> },
    { name: "Automated Remediation", icon: <CheckCircle className="w-5 h-5" /> },
  ]

  return (
    <div className="space-y-8">
      {/* Flow Stages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flowStages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center"
          >
            <div
              className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${stage.color} flex items-center justify-center`}
            >
              {stage.icon}
            </div>
            <h3 className="font-semibold text-white mb-1">{stage.title}</h3>
            <p className="text-xs text-gray-300">{stage.security}</p>
          </motion.div>
        ))}
      </div>

      {/* Security Features */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 border border-purple-400"
      >
        <h3 className="text-xl font-bold text-white mb-4 text-center">PLEXICUS Security Layer</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2"
            >
              <div className="text-purple-200">{feature.icon}</div>
              <span className="text-sm font-medium text-white">{feature.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Flowing Animation */}
      <div className="flex justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-purple-400"
        >
          <div className="w-16 h-16 rounded-full border-2 border-purple-400 flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
