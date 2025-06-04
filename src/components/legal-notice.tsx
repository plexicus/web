'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from '../i18n/utils';
export default function LegalNotice({ lang }) {
  const t = useTranslations(lang);
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [isMobileTocExpanded, setIsMobileTocExpanded] = useState(false);
  const sectionRefs = {
    introduction: useRef<HTMLDivElement>(null),
    termsOfUse: useRef<HTMLDivElement>(null),
    intellectualProperty: useRef<HTMLDivElement>(null),
    thirdPartyIP: useRef<HTMLDivElement>(null),
    jurisdiction: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([id, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.2, // Lower threshold for better detection
          rootMargin: '-100px 0px -50% 0px', // Adjust the detection area
        },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Immediately set the active section when clicked
    setActiveSection(sectionId);

    // Get the target element
    const targetElement = sectionRefs[sectionId as keyof typeof sectionRefs].current;

    if (targetElement) {
      // Use scrollIntoView with the center option
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Center the element in the viewport
      });
    }

    // Collapse mobile TOC after selection
    if (window.innerWidth < 1024) {
      setIsMobileTocExpanded(false);
    }
  };

  const toggleMobileToc = () => {
    setIsMobileTocExpanded(!isMobileTocExpanded);
  };

  const tocSections = {
    introduction: t('legal_notice.toc.sections.introduction'),
    termsOfUse: t('legal_notice.toc.sections.termsOfUse'),
    intellectualProperty: t('legal_notice.toc.sections.intellectualProperty'),
    thirdPartyIP: t('legal_notice.toc.sections.thirdPartyIP'),
    jurisdiction: t('legal_notice.toc.sections.jurisdiction'),
  };

  return (
    <>
      <div className="bg-[#8220ff] w-full h-[64px]"></div>
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        { /* Table of Contents - Sticky on all devices, collapsible on mobile */ }
        <div className="toc-container w-full lg:w-1/4 sticky top-[var(--navbar-height,64px)] z-10 bg-white lg:bg-gray-50 border-b lg:border-b-0 shadow-sm lg:shadow-none lg:h-[calc(100vh-var(--navbar-height,0px))] lg:overflow-auto">
          <div className="p-4 lg:p-6">
            { /* TOC Header - Always visible */ }
            <div className="toc-header flex items-center justify-between mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-[#8220ff]">{ t('legal_notice.toc.title') }</h2>
              <button
                onClick={toggleMobileToc}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                aria-label={isMobileTocExpanded ? t('legal_notice.toc.collapse_aria_label') : t('legal_notice.toc.expand_aria_label')}
                aria-expanded={isMobileTocExpanded}
              >
                { isMobileTocExpanded ? (
                  <ChevronUp className="h-5 w-5 text-[#8220ff]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8220ff]" />
                ) }
              </button>
            </div>

            { /* TOC Navigation - Collapsible on mobile */ }
            <nav
              className={cn(
                'space-y-2 transition-all duration-300 ease-in-out overflow-hidden lg:max-h-[calc(100vh-120px)] lg:overflow-auto lg:opacity-100',
                isMobileTocExpanded ? 'max-h-[40vh] opacity-100' : 'max-h-0 opacity-0 lg:opacity-100',
              )}
            >
              { Object.entries(tocSections).map(([id, title]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md transition-colors text-sm lg:text-base',
                    activeSection === id ? 'bg-[#8220ff] text-white font-medium' : 'hover:bg-purple-100 text-gray-700',
                  )}
                >
                  { title }
                </button>
              )) }
            </nav>

            { /* Current section indicator (mobile only) */ }
            { !isMobileTocExpanded && (
              <div className="lg:hidden px-3 py-2 text-sm font-medium text-gray-700">
                { t('legal_notice.toc.current_section_label') } <span className="text-[#8220ff]">{ tocSections[activeSection as keyof typeof tocSections] }</span>
              </div>
            ) }
          </div>
        </div>

        { /* Main Content */ }
        <div className="w-full lg:w-3/4 p-6 lg:p-12 max-w-3xl mx-auto sticky top-[var(--navbar-height, 64px)]">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#8220ff] mb-8 pt-4">{ t('legal_notice.content.main_title') }</h1>

          { /* Introduction Section */ }
          <section ref={sectionRefs.introduction} className="mb-12" id="introduction">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{ t('legal_notice.content.introduction.heading') }</h2>
            <p className="text-gray-700 mb-4">
              { t('legal_notice.content.introduction.paragraph1') }
            </p>
          </section>

          { /* Terms of Use Section */ }
          <section ref={sectionRefs.termsOfUse} className="mb-12" id="terms-of-use">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{ t('legal_notice.content.terms_of_use.heading') }</h2>

            <div className="space-y-4">
              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.paragraph1') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.paragraph2') }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{ t('legal_notice.content.terms_of_use.user_responsibilities.heading') }</h3>
              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.user_responsibilities.paragraph1') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.user_responsibilities.paragraph2') }
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{ t('legal_notice.content.terms_of_use.limitations_of_liability.heading') }</h3>
              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph1') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph2') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph3') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph4') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph5') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph6') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.terms_of_use.limitations_of_liability.paragraph7') }
              </p>
            </div>
          </section>

          { /* Intellectual Property Rights Section */ }
          <section ref={sectionRefs.intellectualProperty} className="mb-12" id="intellectual-property">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{ t('legal_notice.content.intellectual_property.heading') }</h2>

            <div className="space-y-4">
              <p className="text-gray-700">
                { t('legal_notice.content.intellectual_property.paragraph1') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.intellectual_property.paragraph2') }
              </p>

              <p className="text-gray-700">
                { t('legal_notice.content.intellectual_property.paragraph3') }
              </p>
            </div>
          </section>

          { /* Third-Party Intellectual Property Section */ }
          <section ref={sectionRefs.thirdPartyIP} className="mb-12" id="third-party-ip">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{ t('legal_notice.content.third_party_ip.heading') }</h2>

            <div className="space-y-4">
              <p className="text-gray-700">
                { t('legal_notice.content.third_party_ip.paragraph1') }
              </p>
            </div>
          </section>

          { /* Jurisdiction Section */ }
          <section ref={sectionRefs.jurisdiction} className="mb-12" id="jurisdiction">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{ t('legal_notice.content.jurisdiction.heading') }</h2>

            <div className="space-y-4">
              <p className="text-gray-700">
                { t('legal_notice.content.jurisdiction.paragraph1') }
              </p>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-700 font-medium">{ t('legal_notice.content.jurisdiction.footer.copyright') }</p>
                <p className="text-gray-700">{ t('legal_notice.content.jurisdiction.footer.contact_phone') }</p>
                <p className="text-gray-700">{ t('legal_notice.content.jurisdiction.footer.contact_address') }</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
