'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, FileText, Award } from 'lucide-react';

export default function ComplianceSection() {
  const complianceFrameworks = [
    {
      title: 'SOC 2 Type II',
      icon: <Shield className="w-6 h-6" />,
      controls: [
        'CC6.1: Logical access controls',
        'CC6.7: Access reviews and monitoring',
        'CC7.2: System monitoring',
        'CC8.1: Change management',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'ISO 27001:2022',
      icon: <Award className="w-6 h-6" />,
      controls: [
        'A.8.24: Information deletion',
        'A.8.28: Secure coding practices',
        'A.8.29: Security testing',
        'A.8.31: Development environment separation',
      ],
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compliance Automation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Automated compliance monitoring and reporting for industry standards
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          { complianceFrameworks.map((framework, index) => (
            <motion.div
              key={framework.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${framework.color} flex items-center justify-center text-white`}
                >
                  { framework.icon }
                </div>
                <h3 className="text-xl font-bold text-gray-900">{ framework.title }</h3>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Automated Controls:</h4>
                { framework.controls.map((control, controlIndex) => (
                  <motion.div
                    key={controlIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.2 + controlIndex * 0.1 }}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{ control }</span>
                  </motion.div>
                )) }
              </div>
            </motion.div>
          )) }
        </div>

        { /* Compliance Dashboard Preview */ }
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-8"
        >
          <div className="text-center mb-6">
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">Automated Compliance Reporting</h3>
            <p className="text-gray-600">Real-time compliance status and audit-ready documentation</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            { [
              { metric: '98%', label: 'Compliance Score', color: 'text-green-600' },
              { metric: '24/7', label: 'Monitoring', color: 'text-blue-600' },
              { metric: 'Auto', label: 'Evidence Collection', color: 'text-purple-600' },
              { metric: 'Real-time', label: 'Audit Reports', color: 'text-orange-600' },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <div className={`text-2xl font-bold ${item.color}`}>{ item.metric }</div>
                <div className="text-sm text-gray-600">{ item.label }</div>
              </div>
            )) }
          </div>
        </motion.div>
      </div>
    </section>
  );
}
