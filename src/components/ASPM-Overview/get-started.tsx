'use client';

import { motion } from 'framer-motion';
import { Code, Users, Shield, Terminal } from 'lucide-react';
import { useTranslations } from '../../i18n/utils';

export default function GetStarted({ lang }) {
  const t = useTranslations(lang);

  const userTypes = [
    {
      title: t('aspm.getStarted.userTypes.developers.title'),
      icon: <Code className="w-8 h-8" />,
      description: t('aspm.getStarted.userTypes.developers.description'),
      codeExample: `${t('aspm.getStarted.userTypes.developers.codeComment')}
python analyze.py --config=aspm-dev-config.yaml --files="./" --output=pretty
      `,
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.getStarted.userTypes.devSecOpsTeams.title'),
      icon: <Shield className="w-8 h-8" />,
      description: t('aspm.getStarted.userTypes.devSecOpsTeams.description'),
      codeExample: `${t('aspm.getStarted.userTypes.devSecOpsTeams.codeComment')}
curl -X POST "https://api.plexicus.com/receive_plexalyzer_message" \
  -H "Authorization: Bearer {PLEXICUS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "request": "create-repo",
    "request_id": "cicd-aspm-setup",
    "extra_data": {
      "repository_name": "{CI_PROJECT_NAME}",
      "repository_url": "{CI_PROJECT_URL}",
      "auto_fix_enabled": true,
      "fail_on_severity": "high"
    }
  }'
      `,
      color: 'from-[#8220ff] to-[#6010cc]',
    },
    {
      title: t('aspm.getStarted.userTypes.securityArchitects.title'),
      icon: <Users className="w-8 h-8" />,
      description: t('aspm.getStarted.userTypes.securityArchitects.description'),
      codeExample: `${t('aspm.getStarted.userTypes.securityArchitects.codeComment')}
  curl -X POST "https://api.plexicus.com/receive_plexalyzer_message" \
  -H "Authorization: Bearer {PLEXICUS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "request": "configure-aspm",
    "request_id": "architect-aspm-setup",
    "extra_data": {
      "repository_id": "{MASTER_REPO_ID}",
      "custom_rules_path": "./security/rules.rego",
      "policy_inheritance": true
    }
  }'
      `,
      color: 'from-[#8220ff] to-[#6010cc]',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ t('aspm.getStarted.title') }</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            { t('aspm.getStarted.subtitle') }
          </p>
        </div>

        <div className="space-y-8">
          { userTypes.map((userType, index) => (
            <motion.div
              key={userType.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                { /* User Type Info */ }
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${userType.color} flex items-center justify-center text-white`}
                    >
                      { userType.icon }
                    </div>
                    <h3 className="text-2xl font-bold">{ userType.title }</h3>
                  </div>
                  <p className="text-gray-300">{ userType.description }</p>
                </div>

                { /* Code Example */ }
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{ t('aspm.getStarted.terminal') }</span>
                  </div>
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    <code>{ userType.codeExample }</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )) }
        </div>
      </div>
    </section>
  );
}
