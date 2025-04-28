'use client';

import type React from 'react';

import { useState } from 'react';

// Define types for our integration data
type Tool = string;
type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Mythic';
type CardColor = 'blue' | 'green' | 'red' | 'black' | 'purple';

interface Integration {
  name: string;
  tools: Tool[];
  description: string;
  icon: React.ReactNode;
  power: number;
  defense: number;
  rarity: Rarity;
  color: CardColor;
}

export default function Integrations() {
  // State for active tab and selected card
  const [activeTab, setActiveTab] = useState<'connectors' | 'providers'>('connectors');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Integration data split into connectors and providers
  const integrationData = {
    connectors: [
      {
        name: 'SAST',
        tools: [
          'Checkmarx SAST',
          'Fortify',
          'GitHub SAST',
          'GitLab SAST',
          'Opengrep',
          'Bandit',
          'Coverity Static Analysis',
          'DevSkim',
        ],
        description: 'Static Application Security Testing tools that analyze source code for security vulnerabilities',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="m16 18-2-2" />
            <path d="M18 16 8 6" />
            <path d="m8 8-2 2" />
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M13.5 10.5 10 14l-1.5-1.5" />
          </svg>
        ),
        power: 8,
        defense: 7,
        rarity: 'Rare',
        color: 'blue',
      },
      {
        name: 'Secrets / PII Scan',
        tools: ['GitLab Secret Detection', 'GitHub Secret Detection', 'TruffleHog', 'GitLeaks', 'Trivy-Secrets'],
        description: 'Tools that detect secrets, credentials, and personally identifiable information in code',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <path d="M8 15h.01" />
            <path d="M12 15h.01" />
            <path d="M16 15h.01" />
          </svg>
        ),
        power: 7,
        defense: 9,
        rarity: 'Uncommon',
        color: 'black',
      },
      {
        name: 'SCA',
        tools: [
          'Black Duck',
          'Checkmarx SCA',
          'GitHub Dependabot',
          'GitLab Dependency',
          'DustiLock',
          'OWASP Dependency-Check',
          'Trivy-SCA',
        ],
        description: 'Software Composition Analysis tools that identify vulnerabilities in third-party dependencies',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
          </svg>
        ),
        power: 7,
        defense: 6,
        rarity: 'Uncommon',
        color: 'green',
      },
      {
        name: 'Container Security',
        tools: ['Checkov', 'Grype', 'Trivy-Container'],
        description: 'Tools that scan container images for vulnerabilities and misconfigurations',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M4 10h16" />
            <path d="M10 4v16" />
          </svg>
        ),
        power: 8,
        defense: 8,
        rarity: 'Rare',
        color: 'red',
      },
      {
        name: 'Plexicus',
        tools: ['Plexalyzer'],
        description: "Plexicus's proprietary security analysis and remediation platform",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ),
        power: 10,
        defense: 10,
        rarity: 'Mythic',
        color: 'purple',
      },
      {
        name: 'Threat Detection',
        tools: ['ClamAV'],
        description: 'Tools that detect malware and other threats in code and artifacts',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 14.14 14.14" />
            <path d="M7 12a5 5 0 0 1 5-5" />
            <path d="M12 17a5 5 0 0 0 5-5" />
          </svg>
        ),
        power: 6,
        defense: 9,
        rarity: 'Uncommon',
        color: 'red',
      },
      {
        name: 'SCM Security',
        tools: ['ChainBench'],
        description: 'Tools that secure the software supply chain management process',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        ),
        power: 7,
        defense: 8,
        rarity: 'Rare',
        color: 'green',
      },
      {
        name: 'CI/CD Posture',
        tools: ['KICS'],
        description: 'Tools that assess and secure CI/CD pipelines',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M6 9v12" />
            <path d="M12 6v15" />
            <path d="M18 3v18" />
            <path d="M5 3 H19 V7 H5 Z" />
            <path d="M5 13 H19 V17 H5 Z" />
          </svg>
        ),
        power: 6,
        defense: 7,
        rarity: 'Uncommon',
        color: 'blue',
      },
      {
        name: 'License',
        tools: ['Trivy-License'],
        description: 'Tools that identify and manage software licenses',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 7h10" />
            <path d="M7 12h10" />
            <path d="M7 17h5" />
          </svg>
        ),
        power: 5,
        defense: 6,
        rarity: 'Common',
        color: 'blue',
      },
      {
        name: 'IaC Security',
        tools: ['Hadolint', 'TFLint', 'Terrascan', 'KICS'],
        description: 'Tools that secure Infrastructure as Code configurations',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
            <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
            <path d="M12 12v6" />
            <path d="m9 15 3-3 3 3" />
            <path d="M12 6v3" />
            <path d="m15 6-3 3-3-3" />
          </svg>
        ),
        power: 7,
        defense: 7,
        rarity: 'Uncommon',
        color: 'green',
      },
      {
        name: 'SBOM',
        tools: ['Syft', 'Trivy-SBOM'],
        description: 'Tools that generate Software Bill of Materials',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M16 16h6" />
            <path d="M19 13v6" />
            <path d="M12 3v12" />
            <path d="M8 7H2" />
            <path d="M5 10V4" />
            <rect x="2" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="2" width="6" height="6" rx="1" />
          </svg>
        ),
        power: 6,
        defense: 5,
        rarity: 'Common',
        color: 'green',
      },
    ],
    providers: [
      {
        name: 'SCM',
        tools: ['GitHub', 'GitLab', 'Bitbucket Cloud', 'Gitea'],
        description: 'Source Code Management platforms that host and manage code repositories',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M15 3v4a1 1 0 0 0 1 1h4" />
            <path d="M18 17v-4a1 1 0 0 0-1-1h-4" />
            <path d="M15 17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v7a2 2 0 0 1-2 2Z" />
            <path d="M10 10v4" />
            <path d="M8 12h4" />
          </svg>
        ),
        power: 8,
        defense: 7,
        rarity: 'Rare',
        color: 'blue',
      },
      {
        name: 'Registry',
        tools: ['GitLab Container Registry'],
        description: 'Container registries that store and manage container images',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
            <rect x="2" y="12" width="20" height="8" rx="2" />
            <path d="M6 20v2" />
            <path d="M18 20v2" />
          </svg>
        ),
        power: 6,
        defense: 7,
        rarity: 'Uncommon',
        color: 'green',
      },
      {
        name: 'Cloud Deployment',
        tools: ['AWS', 'Azure', 'Google Cloud Platform', 'Oracle Cloud'],
        description: 'Cloud platforms for deploying and managing applications',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        ),
        power: 9,
        defense: 8,
        rarity: 'Mythic',
        color: 'blue',
      },
      {
        name: 'Ticket Management',
        tools: ['Jira'],
        description: 'Issue tracking and project management platforms',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M8 13h8" />
            <path d="M8 17h8" />
            <path d="M8 9h2" />
          </svg>
        ),
        power: 7,
        defense: 6,
        rarity: 'Common',
        color: 'green',
      },
    ],
  };

  // Helper function to get border color based on rarity
  const getRarityBorderColor = (rarity: Rarity): string => {
    switch (rarity) {
      case 'Common':
        return 'border-gray-400';
      case 'Uncommon':
        return 'border-blue-400';
      case 'Rare':
        return 'border-yellow-400';
      case 'Mythic':
        return 'border-orange-500 shadow-lg';
      default:
        return 'border-gray-400';
    }
  };

  // Helper function to get background gradient based on card color
  const getCardBackground = (color: CardColor): string => {
    switch (color) {
      case 'blue':
        return 'bg-gradient-to-br from-[#9d4edd] to-[#7b2cbf]'; // Purple-blue
      case 'green':
        return 'bg-gradient-to-br from-[#c77dff] to-[#9d4edd]'; // Light purple
      case 'red':
        return 'bg-gradient-to-br from-[#7b2cbf] to-[#5a189a]'; // Deep purple
      case 'black':
        return 'bg-gradient-to-br from-[#5a189a] to-[#3c096c]'; // Dark purple
      case 'purple':
        return 'bg-gradient-to-br from-[#8220ff] to-[#5a189a]'; // Brand purple
      default:
        return 'bg-gradient-to-br from-[#c77dff] to-[#9d4edd]'; // Default purple
    }
  };

  // Helper function to get title bar color based on card color
  const getTitleBarColor = (color: CardColor): string => {
    switch (color) {
      case 'blue':
        return 'bg-[#7b2cbf] text-white'; // Purple-blue
      case 'green':
        return 'bg-[#9d4edd] text-white'; // Light purple
      case 'red':
        return 'bg-[#5a189a] text-white'; // Deep purple
      case 'black':
        return 'bg-[#3c096c] text-white'; // Dark purple
      case 'purple':
        return 'bg-[#8220ff] text-white'; // Brand purple
      default:
        return 'bg-[#7b2cbf] text-white'; // Default purple
    }
  };

  // Helper function to get border color based on card color
  const getCardBorderColor = (color: CardColor): string => {
    switch (color) {
      case 'blue':
        return 'border-[#7b2cbf]'; // Purple-blue
      case 'green':
        return 'border-[#9d4edd]'; // Light purple
      case 'red':
        return 'border-[#5a189a]'; // Deep purple
      case 'black':
        return 'border-[#3c096c]'; // Dark purple
      case 'purple':
        return 'border-[#8220ff]'; // Brand purple
      default:
        return 'border-[#9d4edd]'; // Default purple
    }
  };

  // Helper function to get the tool logo
  const getToolLogo = (toolName: string): string => {
    if (toolName.includes('GitHub')) return '/images/github.svg';
    if (toolName.includes('GitLab')) return '/images/gitlab.svg';
    if (toolName.includes('Bitbucket')) return '/images/bitbucket.png';
    if (toolName.includes('Gitea')) return '/images/gitea.svg';
    if (toolName.includes('Checkmarx')) return '/images/checkmarx.svg';
    if (toolName.includes('Fortify')) return '/images/fortify.svg';
    if (toolName.includes('Opengrep')) return '/images/opengrep.png';
    if (toolName.includes('Bandit')) return '/images/bandit.png';
    if (toolName.includes('Coverity')) return '/images/coverity.svg';
    if (toolName.includes('DevSkim')) return '/images/devskim.png';
    if (toolName.includes('TruffleHog')) return '/images/trufflehog.png';
    if (toolName.includes('GitLeaks')) return '/images/gitleaks.png';
    if (toolName.includes('Trivy')) return '/images/trivy.png';
    if (toolName.includes('Black Duck')) return '/images/blackduck.png';
    if (toolName.includes('DustiLock')) return '/images/dustilock.png';
    if (toolName.includes('OWASP')) return '/images/owasp-dependency-check.png';
    if (toolName.includes('Checkov')) return '/images/checkov.png';
    if (toolName.includes('Grype')) return '/images/grype.png';
    if (toolName.includes('ClamAV')) return '/images/clamav.png';
    if (toolName.includes('ChainBench')) return '/images/chainbench.png';
    if (toolName.includes('KICS')) return '/images/kics.png';
    if (toolName.includes('Hadolint')) return '/images/hadolint.png';
    if (toolName.includes('TFLint')) return '/images/tflint.png';
    if (toolName.includes('Terrascan')) return '/images/terrascan.jpg';
    if (toolName.includes('Syft')) return '/images/syft.png';
    if (toolName.includes('AWS')) return '/images/aws.svg';
    if (toolName.includes('Azure')) return '/images/azure.svg';
    if (toolName.includes('Google Cloud')) return '/images/google-cloud.svg';
    if (toolName.includes('Oracle')) return '/images/oracle.png';
    if (toolName.includes('Jira')) return '/images/jira.png';

    // Default placeholder
    return '/placeholder.svg?height=24&width=24';
  };

  // Get the active integrations based on the selected tab
  const activeIntegrations = activeTab === 'connectors' ? integrationData.connectors : integrationData.providers;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">The Magical Integration Stack</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Harness the power of our integration ecosystem - a collection of powerful tools forged to protect your code
            realm from the darkest of threats
          </p>
        </div>

        { /* Tab navigation */ }
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-md" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'connectors'
                ? 'bg-[#8220ff] text-white shadow-[0_0_15px_rgba(130,32,255,0.5)]'
                : 'bg-white text-gray-700 hover:bg-[#f5f0ff]'
              } border border-[#8220ff]/20`}
              onClick={() => setActiveTab('connectors')}
            >
              Mystical Connectors
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'providers'
                ? 'bg-[#8220ff] text-white shadow-[0_0_15px_rgba(130,32,255,0.5)]'
                : 'bg-white text-gray-700 hover:bg-[#f5f0ff]'
              } border border-[#8220ff]/20 border-l-0`}
              onClick={() => setActiveTab('providers')}
            >
              Arcane Providers
            </button>
          </div>
        </div>

        { /* Card grid */ }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          { activeIntegrations.map((integration) => (
            <div
              key={integration.name}
              className={`relative ${selectedCard === integration.name ? 'transform scale-105' : 'transform hover:scale-102'
              } transition-all duration-300 cursor-pointer perspective-500`}
              onClick={() => setSelectedCard(selectedCard === integration.name ? null : integration.name)}
            >
              { /* Card with standard hover effect */ }
              <div
                className={`rounded-lg overflow-hidden border-2 ${getCardBorderColor(
                  integration.color,
                )} ${getCardBackground(integration.color)} ${selectedCard === integration.name ? 'shadow-xl ring-2 ring-[#8220ff]' : 'shadow-md'
                } h-[420px] transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]`}
              >
                { /* Title bar */ }
                <div className={`p-3 ${getTitleBarColor(integration.color)} flex items-center justify-between`}>
                  <h3 className="font-bold">{ integration.name }</h3>
                  <div className="w-6 h-6">{ integration.icon }</div>
                </div>

                { /* Image area with creature shadow silhouette */ }
                <div className="p-5 bg-gradient-to-b from-black/80 to-black/60 text-white h-40 flex items-center justify-center relative overflow-hidden">
                  { /* Creature shadow silhouette based on card color */ }
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    { integration.color === 'blue' && (
                      <svg viewBox="0 0 100 100" className="h-full w-auto">
                        <path
                          d="M50,20 C60,25 70,35 65,50 C60,65 70,75 50,80 C30,75 40,65 35,50 C30,35 40,25 50,20"
                          fill="currentColor"
                        />
                      </svg>
                    ) }
                    { integration.color === 'green' && (
                      <svg viewBox="0 0 100 100" className="h-full w-auto">
                        <path
                          d="M30,20 C50,15 70,25 75,40 C80,55 70,70 50,80 C30,70 20,55 25,40 C30,25 30,20 30,20"
                          fill="currentColor"
                        />
                      </svg>
                    ) }
                    { integration.color === 'red' && (
                      <svg viewBox="0 0 100 100" className="h-full w-auto">
                        <path
                          d="M50,20 C65,25 75,30 70,50 C65,70 55,75 50,80 C45,75 35,70 30,50 C25,30 35,25 50,20"
                          fill="currentColor"
                        />
                      </svg>
                    ) }
                    { integration.color === 'black' && (
                      <svg viewBox="0 0 100 100" className="h-full w-auto">
                        <path
                          d="M40,20 C60,15 65,30 70,40 C75,50 70,65 60,75 C50,85 40,75 30,65 C20,55 20,40 25,30 C30,20 40,20 40,20"
                          fill="currentColor"
                        />
                      </svg>
                    ) }
                    { integration.color === 'purple' && (
                      <svg viewBox="0 0 100 100" className="h-full w-auto">
                        <path
                          d="M50,15 C65,20 70,35 75,45 C80,55 75,70 60,80 C45,85 35,75 25,60 C15,45 25,25 35,20 C45,15 50,15 50,15"
                          fill="currentColor"
                        />
                      </svg>
                    ) }
                  </div>
                  <p className="text-sm italic text-center relative z-10 text-shadow px-2 py-3 leading-relaxed">
                    { integration.description }
                  </p>
                </div>

                { /* Type line */ }
                <div className="bg-gray-800 text-white text-xs p-2 flex justify-between border-t border-b border-gray-600">
                  <span>{ activeTab === 'connectors' ? 'Security Connector' : 'Service Provider' }</span>
                  <span className="font-semibold">{ integration.rarity }</span>
                </div>

                { /* Tool list */ }
                <div className="bg-white h-[184px] overflow-y-auto p-2 custom-scrollbar">
                  { integration.tools.map((tool, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-sm">{ tool }</span>
                      <div className="w-6 h-6 relative">
                        <img
                          src={getToolLogo(tool) || '/placeholder.svg'}
                          alt={`${tool} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            ; (e.target as HTMLImageElement).src = '/placeholder.svg?height=24&width=24';
                          }}
                        />
                      </div>
                    </div>
                  )) }
                </div>

                { /* Stats bar */ }
                <div className="bg-gray-800 text-white text-xs p-2 flex justify-between border-t border-gray-600">
                  <div className="flex items-center">
                    <span className="mr-1">PWR</span>
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                      { integration.power }
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">DEF</span>
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      { integration.defense }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) }
        </div>

        { /* Selected card details */ }
        { selectedCard && (
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mt-8 animate-fadeIn">
            { activeIntegrations
              .filter((integration) => integration.name === selectedCard)
              .map((integration) => (
                <div key={`detail-${integration.name}`} className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 ${getTitleBarColor(integration.color)} rounded-full flex items-center justify-center mr-3`}
                      >
                        { integration.icon }
                      </div>
                      <h3 className="text-2xl font-bold">{ integration.name }</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{ integration.description }</p>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${integration.rarity === 'Common'
                        ? 'bg-gray-200 text-gray-800'
                        : integration.rarity === 'Uncommon'
                          ? 'bg-blue-200 text-blue-800'
                          : integration.rarity === 'Uncommon'
                            ? 'bg-blue-200 text-blue-800'
                            : integration.rarity === 'Rare'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-orange-200 text-orange-800'
                      }`}
                    >
                      { integration.rarity }
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Supported Tools</h4>
                    <div className="grid grid-cols-2 gap-2">
                      { integration.tools.map((tool, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                          <div className="w-6 h-6 relative mr-2">
                            <img
                              src={getToolLogo(tool) || '/placeholder.svg'}
                              alt={`${tool} logo`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                ; (e.target as HTMLImageElement).src = '/placeholder.svg?height=24&width=24';
                              }}
                            />
                          </div>
                          <span className="text-sm">{ tool }</span>
                        </div>
                      )) }
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="w-1/2">
                        <h4 className="font-semibold mb-2">Power Rating</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-red-500 h-4 rounded-full"
                            style={{ width: `${integration.power * 10}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm mt-1">{ integration.power }/10</div>
                      </div>
                      <div className="w-1/2 pl-4">
                        <h4 className="font-semibold mb-2">Defense Rating</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${integration.defense * 10}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm mt-1">{ integration.defense }/10</div>
                      </div>
                    </div>
                  </div>
                </div>
              )) }
          </div>
        ) }

        { /* Custom CSS for card effects */ }
        <style jsx>{ `
          .perspective-500 {
            /* Keeping this class for compatibility */
          }
          .hover\:scale-102:hover {
            transform: scale(1.02);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(130, 32, 255, 0.4);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(130, 32, 255, 0);
            }
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          .text-shadow {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
          }
        ` }</style>
      </div>
    </section>
  );
}
