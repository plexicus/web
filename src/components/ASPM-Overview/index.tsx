import { useState, useEffect } from 'react';
import HeroAnimation from './hero';
import Image from '@/components/ui/image';
import LifecycleTabs from './lifecycle-tabs';
import { SearchIcon, BrainIcon, ShieldCheckIcon, ChevronDownIcon } from './icons';
import { SecurityIcons } from './security-icons';
import { Brain, GitMerge, BellOff, Zap, Eye, Gauge, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';
import CTASection from '../CTA/section';

interface categoryData{ 
  key: string;
  title: string; 
  description: string; 
  icon: string; 
  tools: { icon: string; name: string; description: string }[]; 
}
const IntegrationCategoryCard = ({ categoryKey, categoryData }: { categoryData: categoryData; categoryKey: string }) => {
  // Assuming t is available in this scope

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md ${categoryKey === 'plexicusNative' ? 'border-blue-300 bg-blue-50' : ''}`}
    >
      <div className="flex justify-between items-center p-4 cursor-pointer">
        <div className="flex items-center gap-3">
          <div
            className={
              categoryKey === 'plexicusNative'
                ? 'w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-semibold flex-shrink-0'
                : 'w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg font-semibold flex-shrink-0'
            }
          >
            { typeof categoryData.icon === 'string' ? categoryData.icon : <SecurityIcons type={categoryKey} /> }
          </div>
          <span className={`font-medium text-gray-800 ${categoryKey === 'plexicusNative' ? 'text-blue-700' : ''}`}>
            { categoryData.title }
          </span>
        </div>
      </div>
      <div className="p-4 pt-0 border-t border-gray-100">
        <p className={`text-sm text-gray-600 mb-4 ${categoryKey === 'plexicusNative' ? 'text-blue-600' : ''}`}>
          { categoryData.description }
        </p>
        { categoryData.tools && (
          <div className="space-y-2">
            { Object.entries(categoryData.tools).map(([toolKey, tool]) => (
              <div key={toolKey} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-medium flex-shrink-0">
                  { typeof tool.icon === 'string' ? tool.icon : <SecurityIcons type={toolKey} /> }
                </div>
                <div>
                  <p className="font-medium text-sm">{ tool.name }</p>
                  <p className="text-xs text-gray-500 mt-1">{ tool.description }</p>
                </div>
              </div>
            )) }
          </div>
        ) }
      </div>
    </div>
  );
};

export default function AspmPage({ lang }) {

  const [openIntegrationCard, setOpenIntegrationCard] = useState(null);

  const handleIntegrationCardToggle = (cardKey) => {
    setOpenIntegrationCard(openIntegrationCard === cardKey ? null : cardKey);
  };

  const t = useTranslations(lang);
  const capabilities = [
    {
      key: 'discovery',
      icon: <SearchIcon />,
      title: t('aspm.capabilities.discovery.title'),
      description:
      t('aspm.capabilities.discovery.description'),
    },
    {
      key: 'enrichment',
      icon: <BrainIcon />,
      title: t('aspm.capabilities.enrichment.title'),
      description:t('aspm.capabilities.enrichment.description'),
    },
    {
      key: 'remediation',
      icon: <ShieldCheckIcon />,
      title: t('aspm.capabilities.remediation.title'),
      description:t('aspm.capabilities.remediation.description'),
    },
  ];

  const providerKeys = t('aspm.integrations.providers') as categoryData[];
  const connectorKeys = t('aspm.integrations.connectors') as categoryData[];

  const advantages = [
    {
      title: t('aspm.advantage.points.0.title'),
      description:t('aspm.advantage.points.0.description'),
      icon: <Brain className="w-full h-full text-purple-600" />,
      stats: ['85% reduction in false positives', '3x faster threat detection'],
    },
    {
      title: t('aspm.advantage.points.1.title'),
      description:t('aspm.advantage.points.1.description'),
      icon: <GitMerge className="w-full h-full text-indigo-600" />,
      stats: ['90% of security checks automated', 'Integrates with 50+ dev tools'],
    },
    {
      title: t('aspm.advantage.points.2.title'),
      description: t('aspm.advantage.points.2.description'),
      icon: <BellOff className="w-full h-full text-blue-600" />,
      stats: ['75% fewer alerts', '99.5% alert accuracy'],
    },
    {
      title: t('aspm.advantage.points.3.title'),
      description: t('aspm.advantage.points.3.description'),
      icon: <Zap className="w-full h-full text-amber-600" />,
      stats: ['60% faster remediation time', '87% of fixes automated'],
    },
    {
      title: t('aspm.advantage.points.4.title'),
      description: t('aspm.advantage.points.4.description'),
      icon: <Eye className="w-full h-full text-emerald-600" />,
      stats: ['100% SDLC coverage', 'Real-time risk visualization'],
    },
    {
      title: t('aspm.advantage.points.5.title'),
      description: t('aspm.advantage.points.5.description'),
      icon: <Gauge className="w-full h-full text-rose-600" />,
      stats: ['40% reduction in security overhead', '2.5x developer productivity'],
    },
  ];
  return (
    <>
      { /* Section 1: Hero Section */ }
      <header
        className="py-20 md:py-32 text-white"
        style={{
          background: 'radial-gradient(circle at right, #000000 0%, #1a1a1a 40%, #4a0ba3 70%, #8220ff 100%)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto px-6 text-left container gap-4">
          <div>
            { /* Allow HTML in title if needed */ }
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('aspm.hero.title') }}
            >
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10">
              { t('aspm.hero.subtitle') }
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center bg-white text-purple-900 hover:bg-gray-100"
            >
              { t('aspm.hero.discoverButton') }
            </a>
          </div>
          <div className="w-full h-[500px] mt-10 md:mt-0">
            <HeroAnimation />
          </div>
        </div>
      </header>

      { /* Section 2: The Evolving Landscape */ }
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            { t('aspm.landscape.title') }
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            { t('aspm.landscape.subtitle') }
          </p>

          { /* Lifecycle tabs showing ASPM integration across development stages */ }
          <div className="mt-10 max-w-6xl mx-auto">
            { /* LifecycleTabs component will need to be updated to use localization internally */ }
            <LifecycleTabs />
          </div>
        </div>
      </section>

      { /* Section 3: Introducing Plexicus ASPM */ }
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-left">
              { t('aspm.introduction.title') }
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-left">
              { t('aspm.introduction.paragraph1') }
            </p>
            <p className="text-lg text-gray-600 text-left">
              { t('aspm.introduction.paragraph2') }
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/productivity-dashboard.png"
                alt={t('aspm.introduction.imageAlt')}
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      { /* Section 4: Core Capabilities */ }
      <section id="capabilities" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            { t('aspm.capabilities.title') }
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            { t('aspm.capabilities.subtitle') }
          </p>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            { capabilities.map((cap) => (
              <div
                key={cap.key}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md text-center md:text-left"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-3xl mb-6 mx-auto md:mx-0">
                  { cap.icon }
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{ cap.title }</h3>
                <p className="text-gray-600 leading-relaxed">{ cap.description }</p>
              </div>
            )) }
          </div>
        </div>
      </section>

      { /* Section 5: Seamless Integration */ }
      <section id="integrations" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            { t('aspm.integrations.title') }
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            { t('aspm.integrations.subtitle') }
          </p>

          <div className="space-y-12">
            { /* Key Security Tool Connectors */ }
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 bg-gray-200 py-2 px-4">
                { t('aspm.integrations.connectorsTitle') }
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                { connectorKeys.map((connector) => (
                  <IntegrationCategoryCard
                    key={connector.key}
                    categoryKey={connector.key}
                    categoryData={{
                      ...connector,
                      icon: null, // Use null to trigger the SecurityIcons component
                    }}
                  />
                )) }
              </div>
            </div>

            { /* Platform & Infrastructure Integrations */ }
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 bg-gray-200 py-2 px-4">
                { t('aspm.integrations.providersTitle') }
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                { providerKeys.map((provider) => (
                  <IntegrationCategoryCard
                    key={provider.key}
                    categoryKey={provider.key}
                    categoryData={{
                      ...provider,
                      icon: null, // Use null to trigger the SecurityIcons component
                    }}
                  />
                )) }
              </div>
            </div>
          </div>
        </div>
      </section>
      { /* Section 6: The Plexicus Advantage - Updated with alternating layout and icons */ }
      <section id="advantage" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            { t('aspm.advantage.title') }
          </h2>
          { /* Subtitle removed as per YAML structure */ }
          { /* <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            Our intelligent approach to application security delivers tangible benefits that transform how your
            organization builds and secures software.
          </p> */ }

          <div className="max-w-5xl mx-auto mt-12">
            { advantages.map((advantage, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  } items-center gap-8 py-12 border-b border-gray-200 last:border-0`}
                >
                  { /* Icon Section */ }
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-full flex items-center justify-center p-12">
                        { advantage.icon }
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 uppercase font-semibold">{ t('aspm.advantage.impactLabel') }</div>
                          { /* Impact percentage remains hardcoded or derived */ }
                          <div className="text-purple-600 font-bold text-lg">+{ (index + 1) * 15 }%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  { /* Content Section */ }
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{ advantage.title }</h3>
                    <p className="text-gray-600 mb-6">{ advantage.description }</p>

                    <a
                      href="#"
                      className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors"
                    >
                      { t('aspm.advantage.learnMore') } <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              );
            }) }
          </div>
        </div>
      </section>

      { /* Section 7: Get Started */ }
      <CTASection 
        title={'Ready to secure your organization?'}
        description="Our team of security experts is ready to help you implement a comprehensive security and compliance solution."
        buttonText={'Contact Us'} 
        buttonLink={'/contact'}
        secondaryButtonText="Request a Demo"
        secondaryButtonLink="/demo"
      />
    </>
  );
}