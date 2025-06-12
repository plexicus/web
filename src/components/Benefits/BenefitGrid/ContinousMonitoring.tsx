'use client';

import { useTranslations } from '@/i18n/utils'; // Assuming this path
import { motion } from 'framer-motion';
import { Activity, Shield, TrendingUp, Eye } from 'lucide-react';

export default function ContinuousMonitoring({ lang }: { lang: string }) {
  const t = useTranslations(lang);

  const metrics = [
    { name: t('benefits.components.monitoring.metrics.securityScore'), value: 94, change: '+2', color: 'green' },
    { name: t('benefits.components.monitoring.metrics.activeThreats'), value: 3, change: '-5', color: 'red' },
    { name: t('benefits.components.monitoring.metrics.compliance'), value: 98, change: '+1', color: 'blue' },
    { name: t('benefits.components.monitoring.metrics.coverage'), value: 100, change: '0', color: 'purple' },
  ];

  const recentEvents = [
    { time: '2m ago', event: t('benefits.components.monitoring.activity.vulnPatched'), severity: 'success' },
    { time: '15m ago', event: t('benefits.components.monitoring.activity.depScanned'), severity: 'info' },
    { time: '1h ago', event: t('benefits.components.monitoring.activity.policyUpdated'), severity: 'info' },
    { time: '3h ago', event: t('benefits.components.monitoring.activity.issueResolved'), severity: 'success' },
  ];

  const getMetricIcon = (name) => {
    switch (name) {
      case t('benefits.components.monitoring.metrics.securityScore'):
        return <Shield className="w-4 h-4 text-green-500" />;
      case t('benefits.components.monitoring.metrics.activeThreats'):
        return <Activity className="w-4 h-4 text-red-500" />;
      case t('benefits.components.monitoring.metrics.compliance'):
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case t('benefits.components.monitoring.metrics.coverage'):
        return <Eye className="w-4 h-4 text-purple-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = (change) => {
    if (!change || change === '0') return 'text-gray-600';
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{ t('benefits.components.monitoring.title') }</h4>

      { /* Metrics Grid */ }
      <div className="grid grid-cols-2 gap-4">
        { metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{ metric.name }</span>
              <div className="flex items-center gap-1">{ getMetricIcon(metric.name) }</div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-800">
                { metric.value }
                { metric.name.includes(t('benefits.components.monitoring.metrics.securityScore')) || metric.name.includes(t('benefits.components.monitoring.metrics.compliance')) || metric.name.includes(t('benefits.components.monitoring.metrics.coverage'))
                  ? '%'
                  : '' }
              </span>
              <span className={`text-sm ${getChangeColor(metric.change)}`}>
                { metric.change !== '0' ? metric.change : '' }
              </span>
            </div>
          </motion.div>
        )) }
      </div>

      { /* Activity Timeline */ }
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-800 mb-3">{ t('benefits.components.monitoring.activity.title') }</h5>
        <div className="space-y-3">
          { recentEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-2 h-2 rounded-full ${event.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
              />
              <div className="flex-1">
                <span className="text-sm text-gray-800">{ event.event }</span>
                <span className="text-xs text-gray-500 ml-2">{ event.time }</span>
              </div>
            </motion.div>
          )) }
        </div>
      </div>

      { /* Monitoring Status */ }
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium text-purple-800">{ t('benefits.components.monitoring.status.title') }</span>
        </div>
        <p className="text-sm text-purple-700">{ t('benefits.components.monitoring.status.description') }</p>
      </div>
    </div>
  );
}
