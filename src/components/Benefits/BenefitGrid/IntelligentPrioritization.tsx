"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock } from "lucide-react"

export default function IntelligentPrioritization() {
  const vulnerabilities = [
    {
      id: "SQL Injection",
      damagePotential: 95,
      exploitability: 85,
      priority: "CRITICAL",
      timeToFix: "2h",
    },
    {
      id: "XSS Vulnerability",
      damagePotential: 70,
      exploitability: 90,
      priority: "HIGH",
      timeToFix: "4h",
    },
    {
      id: "Outdated Dependency",
      damagePotential: 45,
      exploitability: 30,
      priority: "MEDIUM",
      timeToFix: "1d",
    },
    {
      id: "Weak Encryption",
      damagePotential: 60,
      exploitability: 25,
      priority: "LOW",
      timeToFix: "3d",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-500"
      case "HIGH":
        return "bg-orange-500"
      case "MEDIUM":
        return "bg-yellow-500"
      case "LOW":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment Matrix</h4>

      {/* Priority Matrix */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-800">Damage Potential Algorithm</span>
        </div>
        <div className="text-sm text-purple-700">
          Combines exploitability, business impact, and asset criticality to prioritize vulnerabilities
        </div>
      </div>

      {/* Vulnerability List */}
      <div className="space-y-3">
        {vulnerabilities.map((vuln, index) => (
          <motion.div
            key={vuln.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(vuln.priority)}`} />
                <span className="font-medium text-gray-800">{vuln.id}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    vuln.priority === "CRITICAL"
                      ? "bg-red-100 text-red-700"
                      : vuln.priority === "HIGH"
                        ? "bg-orange-100 text-orange-700"
                        : vuln.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {vuln.priority}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {vuln.timeToFix}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Damage Potential</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${vuln.damagePotential}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-red-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-medium">{vuln.damagePotential}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Exploitability</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${vuln.exploitability}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      className="bg-orange-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-medium">{vuln.exploitability}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
