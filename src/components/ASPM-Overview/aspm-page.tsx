'use client';
import Hero from '@/components/ASPM-Overview/hero';
import TechnicalProblem from '@/components/ASPM-Overview/technical-problem';
import CoreCapabilities from '@/components/ASPM-Overview/core-capabilities';
import AiRemediation from '@/components/ASPM-Overview/ai-remediation';
import IntegrationEcosystem from '@/components/ASPM-Overview/integration-ecosystem';
import DevSecOpsIntegration from '@/components/ASPM-Overview/devsecops-integration';
import ComplianceAutomation from '@/components/ASPM-Overview/compliance-automation';
import RealWorldImpact from '@/components/ASPM-Overview/real-world-impact';
import GetStarted from './get-started';
import InteractiveAspmSection from './security-co-pilot';
export default function AspmPage({ lang }) {
  return (
    <main className="min-h-screen bg-white">
      <Hero lang={lang} />
      <TechnicalProblem lang={lang} />
      <CoreCapabilities lang={lang} />
      <AiRemediation lang={lang} />
      <InteractiveAspmSection />
      <IntegrationEcosystem lang={lang} />
      { /* <DevSecOpsIntegration lang={lang} /> */ }
      <ComplianceAutomation lang={lang} />
      <RealWorldImpact lang={lang} />
      <GetStarted lang={lang} />
    </main>
  );
}
