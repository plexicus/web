"use client"

import { motion } from "framer-motion"
import { Clock, Zap, CheckCircle } from "lucide-react"

export default function TimeToFix() {
  const beforeAfter = [
    {
      category: "Critical Issues",
      before: { time: "14 days", color: "text-red-600" },
      after: { time: "2 hours", color: "text-green-600" },
      improvement: "99% faster",
    },
    {
      category: "High Priority",
      before: { time: "7 days", color: "text-orange-600" },
      after: { time: "4 hours", color: "text-green-600" },
      improvement: "95% faster",
    },
    {
      category: "Medium Issues",
      before: { time: "3 days", color: "text-yellow-600" },
      after: { time: "1 day", color: "text-green-600" },
      improvement: "67% faster",
    },
  ]

  const remediationSteps = [
    { step: "AI Analysis", time: "< 1min", icon: <Zap className="w-4 h-4" /> },
    { step: "Fix Generation", time: "< 5min", icon: <Zap className="w-4 h-4" /> },
    { step: "Code Review", time: "15min", icon: <CheckCircle className="w-4 h-4" /> },
    { step: "Auto-Deploy", time: "10min", icon: <CheckCircle className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Accelerated Remediation</h4>

      {/* Before/After Comparison */}
      <div className="space-y-4">
        {beforeAfter.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800">{item.category}</span>
              <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">{item.improvement}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Before PLEXICUS</div>
                <div className={`text-2xl font-bold ${item.before.color}`}>{item.before.time}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">After PLEXICUS</div>
                <div className={`text-2xl font-bold ${item.after.color}`}>{item.after.time}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Remediation Timeline */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
        <h5 className="font-medium text-purple-800 mb-3">AI-Powered Remediation Timeline</h5>
        <div className="space-y-3">
          {remediationSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="text-purple-600">{step.icon}</div>
                <span className="text-sm font-medium text-purple-800">{step.step}</span>
              </div>
              <span className="text-sm text-purple-600">{step.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Total Time Saved */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-800">Average Time Saved</span>
        </div>
        <div className="text-3xl font-bold text-purple-600 mb-1">12.5 days</div>
        <div className="text-sm text-gray-600">per critical vulnerability</div>
      </div>
    </div>
  )
}
