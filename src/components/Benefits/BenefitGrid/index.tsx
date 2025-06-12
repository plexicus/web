"use client"

import { motion } from "framer-motion"
import CicdIntegration from "./CicdIntegration"
import AutomatedVulnerability from "./AutomatedVulnerability"
import IntelligentPrioritization from "./IntelligentPrioritization"
import RealtimeFeedback from "./RealtimeFeedback"
import ContinuousMonitoring from "./ContinousMonitoring"
import ScalabilityComponent from "./ScalabilityComponents"
import CollaborationComponent from "./CollaborationComponents"
import TimeToFix from "./TimetoFix"
import ComplianceVisibility from "./ComplianceVisibility"

export default function BenefitsGrid() {
  const benefits = [
    {
      id: "cicd",
      title: "Seamless Integration with CI/CD Pipelines",
      description:
        "Security becomes a built-in part of development, reducing vulnerabilities early in the lifecycle and embedding protection throughout your delivery process.",
      component: <CicdIntegration />,
    },
    {
      id: "automation",
      title: "Automated Vulnerability Management",
      description:
        "Minimize manual effort with AI-driven detection, prioritization, and remediation, making your development lifecycle more efficient and secure.",
      component: <AutomatedVulnerability />,
    },
    {
      id: "prioritization",
      title: "Intelligent Prioritization with Damage Potential",
      description:
        "Focus on what matters. Plexicus helps teams prioritize high-impact issues using smart metrics like Damage Potential, saving valuable time and resources.",
      component: <IntelligentPrioritization />,
    },
    {
      id: "feedback",
      title: "Real-time Security Feedback",
      description:
        "Developers receive instant alerts during development, enabling rapid fixes at the source and preventing issues from moving downstream.",
      component: <RealtimeFeedback />,
    },
    {
      id: "monitoring",
      title: "Continuous Monitoring and Reporting",
      description:
        "Maintain ongoing visibility into your application's security posture, and simplify compliance with detailed, actionable reports.",
      component: <ContinuousMonitoring />,
    },
    {
      id: "scalability",
      title: "Scalability for Growing Teams",
      description:
        "Designed for growth, Plexicus is adaptable for small teams and large enterprises, maintaining strong security practices at any scale.",
      component: <ScalabilityComponent />,
    },
    {
      id: "collaboration",
      title: "Enhanced Collaboration",
      description:
        "Break silos and improve teamwork with integrated workflows across development, security, and operations—boosting overall DevSecOps efficiency.",
      component: <CollaborationComponent />,
    },
    {
      id: "timetofix",
      title: "Accelerated Time-to-Fix",
      description:
        "Shorten the time to resolve vulnerabilities with AI-generated remediation playbooks and suggested code fixes.",
      component: <TimeToFix />,
    },
    {
      id: "compliance",
      title: "Compliance and Visibility",
      description:
        "Stay audit-ready with comprehensive security reports that align with regulatory standards and your organization's policies.",
      component: <ComplianceVisibility />,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Benefits</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how PLEXICUS transforms your security posture with these strategic advantages
          </p>
        </div>

        <div className="space-y-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>

              {/* Interactive Component */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">{benefit.component}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
