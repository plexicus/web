"use client"

import { motion } from "framer-motion"
import { Users, MessageSquare, GitMerge, Shield } from "lucide-react"

export default function CollaborationComponent() {
  const teams = [
    {
      name: "Development",
      icon: <GitMerge className="w-4 h-4" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      members: 8,
    },
    {
      name: "Security",
      icon: <Shield className="w-4 h-4" />,
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      members: 3,
    },
    {
      name: "Operations",
      icon: <Users className="w-4 h-4" />,
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      members: 5,
    },
  ]

  const collaborationFeatures = [
    "Unified security dashboard",
    "Shared vulnerability tracking",
    "Cross-team notifications",
    "Integrated chat and comments",
    "Role-based access control",
  ]

  const workflowSteps = [
    { step: "Issue Detected", team: "Security", status: "complete" },
    { step: "Code Review", team: "Development", status: "active" },
    { step: "Testing", team: "Operations", status: "pending" },
    { step: "Deployment", team: "Operations", status: "pending" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-500"
      case "active":
        return "bg-purple-500 animate-pulse"
      case "pending":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Unified Team Workflow</h4>

      {/* Team Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {teams.map((team, index) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-3 rounded-lg ${team.bgColor} ${team.textColor}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {team.icon}
              <span className="font-medium text-sm">{team.name}</span>
            </div>
            <div className="text-xs opacity-75">{team.members} members</div>
          </motion.div>
        ))}
      </div>

      {/* Workflow Visualization */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h5 className="font-medium text-gray-800 mb-3">Cross-team Workflow</h5>
        <div className="space-y-3">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-3 h-3 rounded-full ${getStatusColor(step.status)}`} />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">{step.step}</span>
                <span className="text-xs text-gray-500 ml-2">({step.team})</span>
              </div>
              {step.status === "active" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collaboration Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-800">Collaboration Features</span>
        </div>
        <div className="space-y-2">
          {collaborationFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              {feature}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">60%</div>
          <div className="text-xs text-purple-700">Faster Resolution</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">3x</div>
          <div className="text-xs text-purple-700">Better Communication</div>
        </div>
      </div>
    </div>
  )
}
