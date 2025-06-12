"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react"

export default function RealtimeFeedback() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Potential SQL Injection",
      message: "Line 42: User input not sanitized",
      file: "auth.py",
      timestamp: "2s ago",
    },
  ])

  const alertTypes = [
    {
      type: "error",
      title: "Critical Security Issue",
      message: "Hardcoded API key detected",
      file: "config.js",
    },
    {
      type: "warning",
      title: "Potential Vulnerability",
      message: "Weak password validation",
      file: "validation.py",
    },
    {
      type: "info",
      title: "Security Suggestion",
      message: "Consider using HTTPS",
      file: "server.js",
    },
    {
      type: "success",
      title: "Security Check Passed",
      message: "Input validation implemented",
      file: "forms.py",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
      const newAlert = {
        id: Date.now(),
        ...randomAlert,
        timestamp: "now",
      }

      setAlerts((prev) => [newAlert, ...prev.slice(0, 2)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertStyle = (type) => {
    const alertType = type || "info"
    switch (alertType) {
      case "error":
        return "border-red-200 bg-red-50 text-red-800"
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-800"
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-800"
      case "success":
        return "border-green-200 bg-green-50 text-green-800"
      default:
        return "border-gray-200 bg-gray-50 text-gray-800"
    }
  }

  const getAlertIcon = (type) => {
    const alertType = type || "info"
    switch (alertType) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "info":
        return <Info className="w-4 h-4 text-blue-600" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Live Security Alerts</h4>

      {/* IDE Simulation */}
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
        <div className="text-gray-400 mb-2"># auth.py - Line 42</div>
        <div className="text-blue-400">def authenticate_user(username, password):</div>
        <div className="ml-4 text-green-400">{"query = f\"SELECT * FROM users WHERE username = '{username}'\""}</div>
        <div className="ml-4 text-red-400 bg-red-900/30 px-2 py-1 rounded">
          ⚠️ Potential SQL Injection vulnerability detected
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`border rounded-lg p-3 ${getAlertStyle(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{alert.title || "Security Alert"}</div>
                    <div className="text-xs opacity-80 mt-1">{alert.message || "No details available"}</div>
                    <div className="text-xs opacity-60 mt-1">
                      {alert.file || "unknown"} • {alert.timestamp || "unknown"}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeAlert(alert.id)} className="text-gray-400 hover:text-gray-600 ml-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">{"< 1s"}</div>
          <div className="text-xs text-purple-700">Detection Time</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">Real-time</div>
          <div className="text-xs text-purple-700">Feedback Loop</div>
        </div>
      </div>
    </div>
  )
}
