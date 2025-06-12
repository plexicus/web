import { motion } from 'framer-motion';
import { GitCommit, Play, Shield, CheckCircle, Zap, Users, Settings } from 'lucide-react';

export default function DevSecOpsSection() {
  const pipelineSteps = [
    {
      title: 'Developer Commits',
      icon: <GitCommit className="w-6 h-6" />,
      description: 'Code changes pushed to repository',
      status: 'active',
    },
    {
      title: 'Pipeline Trigger',
      icon: <Play className="w-6 h-6" />,
      description: 'Automated CI/CD pipeline starts',
      status: 'active',
    },
    {
      title: 'ASPM Scan',
      icon: <Shield className="w-6 h-6" />,
      description: 'Comprehensive security analysis',
      status: 'active',
    },
    {
      title: 'Auto-Fix',
      icon: <Zap className="w-6 h-6" />,
      description: 'AI-powered vulnerability remediation',
      status: 'active',
    },
    {
      title: 'Production Deploy',
      icon: <CheckCircle className="w-6 h-6" />,
      description: 'Secure deployment to production',
      status: 'complete',
    },
  ];

  const securityChecks = [
    'No High Severity Issues',
    'No Exposed Secrets',
    'Dependencies Validated',
    'Infrastructure Compliant',
    'Security Monitoring Active',
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">DevSecOps Integration</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Security seamlessly integrated into your development workflow
          </p>
        </div>

        { /* Interactive Pipeline Visualization */ }
        <div className="max-w-6xl mx-auto mb-12">
          <DevSecOpsPipelineFlow steps={pipelineSteps} />
        </div>

        { /* Security Validation */ }
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Automated Security Validation</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            { securityChecks.map((check, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-green-700">{ check }</span>
              </motion.div>
            )) }
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DevSecOpsPipelineFlow({ steps }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">DevSecOps Pipeline Flow</h3>

      { /* Pipeline Steps */ }
      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-4">
          { steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative flex-1"
            >
              { /* Step Icon */ }
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  step.status === 'complete' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                }`}
              >
                { step.icon }
              </div>

              { /* Step Content */ }
              <div className="max-w-32">
                <h4 className="font-semibold text-gray-900 mb-2">{ step.title }</h4>
                <p className="text-sm text-gray-600">{ step.description }</p>
              </div>

              { /* Connection Line */ }
              { index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform translate-x-2 -translate-y-0.5"></div>
              ) }

              { /* Animated Flow Indicator */ }
              { index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-8 left-full w-2 h-2 bg-purple-500 rounded-full transform translate-x-2 -translate-y-1"
                  animate={{
                    x: [0, 50, 100, 150],
                    opacity: [1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />
              ) }
            </motion.div>
          )) }
        </div>
      </div>

      { /* Team Collaboration Indicators */ }
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-center items-center gap-8">
          { [
            { icon: <Users className="w-5 h-5" />, label: 'Developers', color: 'bg-blue-100 text-blue-600' },
            { icon: <Shield className="w-5 h-5" />, label: 'Security', color: 'bg-purple-100 text-purple-600' },
            { icon: <Settings className="w-5 h-5" />, label: 'Operations', color: 'bg-green-100 text-green-600' },
          ].map((team, index) => (
            <motion.div
              key={team.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${team.color}`}>{ team.icon }</div>
              <span className="text-sm font-medium text-gray-700">{ team.label }</span>
            </motion.div>
          )) }
        </div>
      </div>
    </div>
  );
}
