'use client';

import { useTranslations } from '@/i18n/utils'; // Assuming this path
import { motion } from 'framer-motion';
import { Users, MessageSquare, GitMerge, Shield } from 'lucide-react';

export default function CollaborationComponent({ lang }: { lang: string }) {
  const t = useTranslations(lang);

  const teams = [
    {
      name: t('benefits.components.collaboration.teams.development'),
      icon: <GitMerge className="w-4 h-4" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      members: 8,
    },
    {
      name: t('benefits.components.collaboration.teams.security'),
      icon: <Shield className="w-4 h-4" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      members: 3,
    },
    {
      name: t('benefits.components.collaboration.teams.operations'),
      icon: <Users className="w-4 h-4" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      members: 5,
    },
  ];

  const collaborationFeatures = [
    t('benefits.components.collaboration.features.dashboard'),
    t('benefits.components.collaboration.features.tracking'),
    t('benefits.components.collaboration.features.notifications'),
    t('benefits.components.collaboration.features.chat'),
    t('benefits.components.collaboration.features.access'),
  ];

  const workflowSteps = [
    { step: t('benefits.components.collaboration.workflow.issueDetected'), team: t('benefits.components.collaboration.teams.security'), status: 'complete' },
    { step: t('benefits.components.collaboration.workflow.codeReview'), team: t('benefits.components.collaboration.teams.development'), status: 'active' },
    { step: t('benefits.components.collaboration.workflow.testing'), team: t('benefits.components.collaboration.teams.operations'), status: 'pending' },
    { step: t('benefits.components.collaboration.workflow.deployment'), team: t('benefits.components.collaboration.teams.operations'), status: 'pending' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500';
      case 'active':
        return 'bg-purple-500 animate-pulse';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{ t('benefits.components.collaboration.title') }</h4>

      { /* Team Overview */ }
      <div className="grid grid-cols-3 gap-3 mb-6">
        { teams.map((team, index) => (
          // ---- EDIT HERE ----
          // 1. Added 'card-inset-shadow' for the effect.
          // 2. Changed 'rounded-lg' to 'rounded-2xl' for softer corners.
          // 3. Added transition classes for a subtle hover lift.
          <motion.div
            key={team.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={'p-3 rounded-lg bg-gradient-to-r from-[#8220ff] to-[#6010cc] text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1'}
          >
            <div className="flex items-center gap-2 mb-1">
              { team.icon }
              <span className="font-medium text-sm">{ team.name }</span>
            </div>
            <div className="text-xs opacity-75">{ team.members } { t('benefits.components.collaboration.members') }</div>
          </motion.div>
        )) }
      </div>

      { /* Workflow Visualization */ }
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h5 className="font-medium text-gray-800 mb-3">{ t('benefits.components.collaboration.workflow.title') }</h5>
        <div className="space-y-3">
          { workflowSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-3 h-3 rounded-full ${getStatusColor(step.status)}`} />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">{ step.step }</span>
                <span className="text-xs text-gray-500 ml-2">({ step.team })</span>
              </div>
              { step.status === 'active' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
                />
              ) }
            </motion.div>
          )) }
        </div>
      </div>

      { /* Collaboration Features */ }
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-800">{ t('benefits.components.collaboration.features.title') }</span>
        </div>
        <div className="space-y-2">
          { collaborationFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              { feature }
            </motion.div>
          )) }
        </div>
      </div>

      { /* Efficiency Metrics */ }
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">60%</div>
          <div className="text-xs text-purple-700">{ t('benefits.components.collaboration.metrics.fasterResolution') }</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">3x</div>
          <div className="text-xs text-purple-700">{ t('benefits.components.collaboration.metrics.betterCommunication') }</div>
        </div>
      </div>
    </div>
  );
}
