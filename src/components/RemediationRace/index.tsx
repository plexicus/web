'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from '@/i18n/utils';
import { animateRemediationRace } from '@/lib/animation/remediation-race';

import CostCalculator from './CostCalculator';
import PlexicusMethod from './PlexicusMethod';
import TraditionalMethod from './TraditionalMethod';

export default function RemediationRace({ lang }) {
  /**
   * i18n
   */
  const t = useTranslations(lang);

  /**
   * useState
   */
  const [animationStep, setAnimationStep] = useState(0);
  const [plexicusTime, setPlexicusTime] = useState(0);
  const [traditionalTime, setTraditionalTime] = useState(0);

  /**
   * useRef
   */
  const animationRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Variables
   */
  const remediationSteps = [
    { name: t('vulnerability_remediation_race.plexicus.initial_detection.title'), traditionalTime: 35, plexicusTime: 5 },
    { name: t('vulnerability_remediation_race.plexicus.triage.description'), traditionalTime: 45, plexicusTime: 5 },
    { name: t('vulnerability_remediation_race.plexicus.analysis.description'), traditionalTime: 45, plexicusTime: 3 },
    { name: t('vulnerability_remediation_race.plexicus.fix_development.description'), traditionalTime: 175, plexicusTime: 10 },
  ];
  const totalPlexicusTime = remediationSteps.reduce((acc, step) => acc + step.plexicusTime, 0);
  const totalTraditionalTime = remediationSteps.reduce((acc, step) => acc + step.traditionalTime, 0);

  /**
   * Methods & Functions
   */
  const getStepProcess = (index: number, isTraditional: boolean, type: 'active' | 'progress' | 'completed' = 'progress') => {
    const currentTime = isTraditional ? traditionalTime : plexicusTime;
    const steps = remediationSteps;

    let timeBeforeStep = 0;
    for (let i = 0; i < index; i++) {
      timeBeforeStep += isTraditional ? steps[i].traditionalTime : steps[i].plexicusTime;
    }

    if (type === 'completed') {
      return currentTime >= timeBeforeStep;
    }

    const stepTime = isTraditional ? steps[index].traditionalTime : steps[index].plexicusTime;

    if (type === 'active') {
      return currentTime >= timeBeforeStep && currentTime <= timeBeforeStep + stepTime;
    }

    return Math.min(100, Math.max(0, ((currentTime - timeBeforeStep) / stepTime) * 100));
  }

  /**
   * Hooks
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (_) => { },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      animateRemediationRace({
        animationRef,
        remediationSteps,
        setAnimationStep,
        setPlexicusTime,
        setTraditionalTime,
        totalTraditionalTime,
        totalPlexicusTime,
      });
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white" id="remediation-race">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {t('vulnerability_remediation_race.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('vulnerability_remediation_race.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          { /* Traditional Method */}
          <TraditionalMethod
            getStepProcess={getStepProcess}
            remediationSteps={remediationSteps}
            t={t}
            traditionalTime={traditionalTime}
            totalTraditionalTime={totalTraditionalTime}
          />

          { /* Plexicus Method */}
          <PlexicusMethod
            getStepProcess={getStepProcess}
            remediationSteps={remediationSteps}
            t={t}
            plexicusTime={plexicusTime}
            totalPlexicusTime={totalPlexicusTime}
          />
        </div>

        { /* Cost Calculator - Interactive Version */}
        <CostCalculator
          t={t}
          remediationSteps={remediationSteps}
          totalPlexicusTime={totalPlexicusTime}
          totalTraditionalTime={totalTraditionalTime}
        />
      </div>
    </section>
  );
}
