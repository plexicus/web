'use client';

import { useState, useEffect } from 'react';
// Import the new CodeSecurityWorkflow component at the top
import CodeSecurityWorkflow from './code-security-workflow';

const ProcessDashboard = ({ activeProcess = 'code' }) => {
  const [currentProcess, setCurrentProcess] = useState(activeProcess);
  const [currentBuildStep, setCurrentBuildStep] = useState(0);

  // Auto-cycle through processes
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentProcess !== 'build') {
        setCurrentProcess((prev) => {
          const processes = ['code', 'build', 'testing', 'deploy', 'monitor'];
          const currentIndex = processes.indexOf(prev);
          const nextIndex = (currentIndex + 1) % processes.length;
          return processes[nextIndex];
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentProcess]);

  // Auto-cycle through build steps if on build process
  useEffect(() => {
    let buildStepInterval;
    if (currentProcess === 'build') {
      buildStepInterval = setInterval(() => {
        setCurrentBuildStep((prev) => (prev + 1) % 5);
      }, 4000);
    }

    return () => {
      if (buildStepInterval) clearInterval(buildStepInterval);
    };
  }, [currentProcess]);

  const buildSteps = [
    {
      name: 'Integrate',
      description: 'Merge code changes into the main branch and prepare for security scanning',
      details: [
        'Automated code integration from feature branches',
        'Dependency resolution and conflict detection',
        'Pre-build validation checks',
      ],
      metrics: {
        commits: 12,
        branches: 4,
        merges: 3,
      },
      content: (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Integration Status</h4>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Code merged from feature branches</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Dependencies resolved</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Build validation complete</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Scan',
      description: 'Analyze code and dependencies for security vulnerabilities and compliance issues',
      details: [
        'Static code analysis for security flaws',
        'Dependency vulnerability scanning',
        'Container image security scanning',
      ],
      metrics: {
        files: 248,
        dependencies: 124,
        containers: 3,
      },
      content: (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Scan Results</h4>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-500">Complete</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Critical vulnerabilities</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">1</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">High vulnerabilities</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">2</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Medium vulnerabilities</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">5</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Remediate',
      description: 'Automatically fix identified security issues with AI-generated patches',
      details: [
        'AI-powered vulnerability remediation',
        'Automated dependency updates',
        'Security best practice implementation',
      ],
      metrics: {
        autoFixed: 8,
        manualReview: 3,
        ignored: 1,
      },
      content: (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Remediation Actions</h4>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">In Progress</span>
          </div>
          <div className="space-y-2">
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">SQL Injection Fix</span>
                </div>
                <span className="text-xs text-green-600">Auto-fixed</span>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Dependency Update</span>
                </div>
                <span className="text-xs text-green-600">Auto-fixed</span>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-600 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Cookie Settings</span>
                </div>
                <span className="text-xs text-yellow-600">Needs Review</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Review',
      description: 'Evaluate security fixes and approve changes before deployment',
      details: ['Security fix validation', 'Code review automation', 'Compliance verification'],
      metrics: {
        approved: 7,
        pending: 2,
        rejected: 1,
      },
      content: (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Security Review</h4>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Awaiting Review</span>
          </div>
          <div className="space-y-2">
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm">SQL Injection Fix</span>
                <span className="text-xs text-green-600">Approved</span>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dependency Update</span>
                <span className="text-xs text-green-600">Approved</span>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cookie Settings</span>
                <span className="text-xs text-blue-600">Pending</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Review Completion</span>
              <span className="font-medium">70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Pull Request',
      description: 'Submit approved security fixes for integration into the main codebase',
      details: ['Automated PR creation', 'Security fix documentation', 'Integration validation'],
      metrics: {
        created: 3,
        merged: 2,
        pending: 1,
      },
      content: (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Pull Request Status</h4>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Ready to Merge</span>
          </div>
          <div className="p-3 bg-gray-50 rounded mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">PR #248: Security Fixes</span>
              <span className="text-xs text-gray-500">5m ago</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">Implements security fixes for identified vulnerabilities</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">CI Checks</span>
              <span className="text-xs text-green-600">Passed</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Security Review</span>
              <span className="text-xs text-green-600">Approved</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors">
              Merge Pull Request
            </button>
          </div>
        </div>
      ),
    },
  ];

  const processes = {
    // In the processes object, replace the code process content with the new workflow:
    code: {
      title: 'Code Analysis',
      metrics: {
        findings: 26,
        remediated: 5,
        total: 31,
      },
      description:
        'Static code analysis identifies security vulnerabilities, coding errors, and compliance issues directly in your source code.',
      details: [
        'Detect security vulnerabilities early',
        'Enforce secure coding standards',
        'Identify sensitive data exposure risks',
      ],
      content: <CodeSecurityWorkflow />,
    },
    build: {
      title: 'Build Security',
      metrics: {
        findings: 18,
        remediated: 12,
        total: 30,
      },
      description:
        'Secure your build pipeline by scanning dependencies, containers, and infrastructure as code for vulnerabilities.',
      details: [
        'Dependency vulnerability scanning',
        'Container security analysis',
        'Infrastructure as code validation',
      ],
      content: null, // Will be replaced with build steps
    },
    testing: {
      title: 'Security Testing',
      metrics: {
        findings: 14,
        remediated: 9,
        total: 23,
      },
      description:
        'Dynamic security testing identifies vulnerabilities in running applications that static analysis might miss.',
      details: [
        'Dynamic application security testing',
        'API security validation',
        'Authentication and authorization testing',
      ],
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800">Test Coverage</h4>
              <span className="text-xs text-gray-500">Security Tests</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">75%</span>
                  <span className="text-xs text-gray-500">API</span>
                </div>
              </div>
              <div className="relative h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="88.0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">65%</span>
                  <span className="text-xs text-gray-500">UI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Passed: 42</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <span>Failed: 14</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                <span>Skipped: 6</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800">DAST Results</h4>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-500">Running</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Authentication Bypass</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Critical</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">CSRF Protection</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">High</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Content Security Policy</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    deploy: {
      title: 'Deployment Security',
      metrics: {
        findings: 7,
        remediated: 4,
        total: 11,
      },
      description:
        'Ensure secure deployment practices with configuration validation, secret scanning, and compliance checks.',
      details: ['Configuration security validation', 'Secret and credential scanning', 'Compliance verification'],
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800">Infrastructure Scan</h4>
              <span className="text-xs text-gray-500">Last deployment</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-gray-500">Resources</div>
                <div className="text-lg font-semibold">42</div>
              </div>
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-gray-500">Compliant</div>
                <div className="text-lg font-semibold text-green-600">35</div>
              </div>
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="text-xs text-gray-500">Issues</div>
                <div className="text-lg font-semibold text-red-600">7</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Compliance Score</span>
                <span className="text-sm font-medium">83%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800">Deployment Status</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Production</div>
                  <div className="text-xs text-gray-500">v2.4.1</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Deployed 2h ago</div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Security Gates</span>
                <span className="text-green-600">Passed</span>
              </div>
              <div className="flex justify-between">
                <span>Config Validation</span>
                <span className="text-green-600">Passed</span>
              </div>
              <div className="flex justify-between">
                <span>Secret Scanning</span>
                <span className="text-yellow-600">Warning</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    monitor: {
      title: 'Runtime Monitoring',
      metrics: {
        findings: 9,
        remediated: 3,
        total: 12,
      },
      description:
        'Continuously monitor applications in production to detect and respond to security threats in real-time.',
      details: ['Real-time threat detection', 'Behavioral anomaly identification', 'Automated incident response'],
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800">Security Events</h4>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Brute Force Attempt</span>
                </div>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-sm">Suspicious API Call</span>
                </div>
                <span className="text-xs text-gray-500">23m ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Unusual Traffic Pattern</span>
                </div>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800">System Health</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Healthy</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>CPU Usage</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Memory</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Uptime: 99.9%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span>Response: 124ms</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  const currentData = processes[currentProcess];

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      { /* Dashboard Header */ }
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">{ currentData.title }</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Live</span>
            <button className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      { /* Dashboard Content */ }
      <div className="p-4">
        { /* Process Description */ }
        <div className="mb-6">
          <p className="text-gray-600">{ currentData.description }</p>
          <ul className="mt-3 space-y-1">
            { currentData.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 mr-2"></div>
                <span className="text-sm text-gray-700">{ detail }</span>
              </li>
            )) }
          </ul>
        </div>

        { /* Build Process Steps */ }
        { currentProcess === 'build' ? (
          <div className="space-y-6">
            { /* Build Step Progress */ }
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">Build Security Pipeline</h4>
                <span className="text-xs text-gray-500">Step { currentBuildStep + 1 } of 5</span>
              </div>
              <div className="relative flex items-center justify-between mb-6 px-2">
                { buildSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        index < currentBuildStep
                          ? 'bg-green-100 text-green-700'
                          : index === currentBuildStep
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      { index < currentBuildStep ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        index + 1
                      ) }
                    </div>
                    <span
                      className={`text-xs mt-1 ${index === currentBuildStep ? 'font-medium text-purple-700' : 'text-gray-500'}`}
                    >
                      { step.name }
                    </span>
                  </div>
                )) }

                { /* Connection lines between steps */ }
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
                <div
                  className="absolute top-5 left-0 h-0.5 bg-green-500 -z-0 transition-all duration-300"
                  style={{ width: `${(currentBuildStep / (buildSteps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            { /* Current Step Details */ }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              { /* Left Side - Step Description */ }
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-2">{ buildSteps[currentBuildStep].name }</h4>
                  <p className="text-gray-600 text-sm mb-4">{ buildSteps[currentBuildStep].description }</p>
                  <ul className="space-y-2">
                    { buildSteps[currentBuildStep].details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 mr-2"></div>
                        <span className="text-sm text-gray-700">{ detail }</span>
                      </li>
                    )) }
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-3">Metrics</h4>
                  <div className="grid grid-cols-3 gap-3">
                    { Object.entries(buildSteps[currentBuildStep].metrics).map(([key, value]) => (
                      <div key={key} className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-xs text-gray-500 capitalize">{ key }</div>
                        <div className="text-lg font-semibold text-purple-700">{ value }</div>
                      </div>
                    )) }
                  </div>
                </div>
              </div>

              { /* Right Side - Step Content */ }
              <div>{ buildSteps[currentBuildStep].content }</div>
            </div>
          </div>
        ) : (
          <>
            { /* Metrics Row */ }
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Findings</div>
                <div className="text-2xl font-bold text-orange-500">{ currentData.metrics.findings }</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Remediated</div>
                <div className="text-2xl font-bold text-purple-600">{ currentData.metrics.remediated }</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Total</div>
                <div className="text-2xl font-bold text-gray-800">{ currentData.metrics.total }</div>
              </div>
            </div>

            { /* Process-specific content */ }
            { currentData.content }
          </>
        ) }

        { /* Process Action Buttons - Single Row */ }
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex justify-center items-center gap-2 max-w-2xl mx-auto">
            { Object.keys(processes).map((process, index) => (
              <div key={process} className="flex items-center">
                <button
                  onClick={() => setCurrentProcess(process)}
                  className={`flex flex-col items-center px-4 py-3 rounded-lg transition-all min-w-[80px] ${
                    currentProcess === process
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-6 h-6 flex items-center justify-center mb-1">
                    { process === 'code' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) }
                    { process === 'build' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) }
                    { process === 'testing' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) }
                    { process === 'deploy' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                      </svg>
                    ) }
                    { process === 'monitor' && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) }
                  </div>
                  <span className="text-sm font-medium capitalize">{ process }</span>
                </button>
                { index < Object.keys(processes).length - 1 && (
                  <div className="w-2 h-2 bg-gray-300 rounded-full mx-2"></div>
                ) }
              </div>
            )) }
          </div>

          { /* Navigation dots */ }
          <div className="flex justify-center mt-4 gap-2">
            { Object.keys(processes).map((process, index) => (
              <button
                key={process}
                onClick={() => setCurrentProcess(process)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentProcess === process ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            )) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDashboard;
