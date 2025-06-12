"use client"

import { motion } from "framer-motion"
import { FileText, Shield, CheckCircle, Eye } from "lucide-react"

export default function ComplianceVisibility() {
  const complianceStandards = [
    { name: "SOC 2", status: "compliant", score: 98 },
    { name: "ISO 27001", status: "compliant", score: 96 },
    { name: "PCI DSS", status: "compliant", score: 94 },
    { name: "GDPR", status: "review", score: 89 },
  ]

  const auditTrail = [
    { time: "2h ago", action: "Security policy updated", user: "Security Team" },
    { time: "1d ago", action: "Vulnerability assessment completed", user: "PLEXICUS AI" },
    { time: "2d ago", action: "Compliance report generated", user: "System" },
    { time: "3d ago", action: "Access controls reviewed", user: "Admin" },
  ]

  const reportTypes = [
    { name: "Executive Summary", icon: <FileText className="w-4 h-4" />, frequency: "Monthly" },
    { name: "Technical Details", icon: <Shield className="w-4 h-4" />, frequency: "Weekly" },
    { name: "Compliance Status", icon: <CheckCircle className="w-4 h-4" />, frequency: "Real-time" },
    { name: "Audit Trail", icon: <Eye className="w-4 h-4" />, frequency: "Continuous" },
  ]

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Compliance Dashboard</h4>

      {/* Compliance Standards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {complianceStandards.map((standard, index) => (
          <motion.div
            key={standard.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${
              standard.status === "compliant" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{standard.name}</span>
              {standard.status === "compliant" ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Eye className="w-4 h-4 text-yellow-600" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${standard.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${standard.status === "compliant" ? "bg-green-500" : "bg-yellow-500"}`}
                />
              </div>
              <span className="text-xs font-medium">{standard.score}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Types */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h5 className="font-medium text-gray-800 mb-3">Available Reports</h5>
        <div className="space-y-2">
          {reportTypes.map((report, index) => (
            <motion.div
              key={report.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <div className="flex items-center gap-2">
                <div className="text-purple-600">{report.icon}</div>
                <span className="text-sm font-medium text-gray-800">{report.name}</span>
              </div>
              <span className="text-xs text-gray-500">{report.frequency}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-800 mb-3">Recent Audit Activity</h5>
        <div className="space-y-2">
          {auditTrail.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 text-sm"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-gray-800">{entry.action}</div>
                <div className="text-gray-500 text-xs">
                  {entry.user} • {entry.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Audit Ready Status */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-800">Audit Ready</span>
        </div>
        <p className="text-sm text-purple-700">Comprehensive documentation and evidence automatically maintained</p>
      </div>
    </div>
  )
}
