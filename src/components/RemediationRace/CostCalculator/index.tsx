import { useState } from 'react';

import { ui, defaultLang } from '@/i18n/ui';

export default function CostCalculator({ t, remediationSteps, totalPlexicusTime, totalTraditionalTime }: {
  remediationSteps: {
    name: string;
    traditionalTime: number;
    plexicusTime: number;
  }[];
  t: (key: keyof (typeof ui)[typeof defaultLang]) => any;
  totalPlexicusTime: number;
  totalTraditionalTime: number;
}) {
  /**
   * Variables
   */
  const CALCULATE_COST = 10;

  /**
   * useState
   */
  const [hourlyRate, setHourlyRate] = useState(50);
  const [vulnerabilityCount, setVulnerabilityCount] = useState(10);

  /**
   * Methods & Functions
   */
  const calculateTraditionalCost = () => {
    // Calculate the time total in minutes for a single vulnerability
    const totalTimeMinutes = remediationSteps.reduce((acc, step) => acc + step.traditionalTime, 0);

    // Convert to hours
    const totalTimeHours = totalTimeMinutes / 60;

    // Calculate the cost (using the hourly rate)
    return Math.round(totalTimeHours * hourlyRate);
  };

  const calculateSavingsPercentage = () => {
    const traditionalCost = calculateTraditionalCost();

    if (traditionalCost <= 0) return 0;

    // Cálculo básico del porcentaje de ahorro
    let percentage = ((traditionalCost - CALCULATE_COST) / traditionalCost) * 100;

    // Para grandes cantidades de vulnerabilidades, AUMENTAMOS el porcentaje de ahorro
    // ya que Plexicus se vuelve más eficiente a escala
    if (vulnerabilityCount > 50) {
      // Factor de aumento basado en la cantidad de vulnerabilidades
      // Máximo aumento del 10% para cantidades muy grandes
      const scaleFactor = Math.min(0.1, (vulnerabilityCount - 50) / 500);
      percentage = Math.min(99, percentage * (1 + scaleFactor));
    }

    return Math.round(percentage);
  };

  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            { /* Left Column - Form */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{t('vulnerability_remediation_race.savings_calculator.title')}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {t('vulnerability_remediation_race.savings_calculator.subtitle')}
                </p>
              </div>

              { /* Form Inputs */}
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                { /* Developer Rate Input */}
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('vulnerability_remediation_race.savings_calculator.developer_hourly_rate')} ($)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="hourlyRate"
                      id="hourlyRate"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 py-2 text-gray-900 focus:border-[#8220ff] focus:ring-[#8220ff]"
                      placeholder="0.00"
                      defaultValue="50"
                      min="1"
                      onChange={(e) => {
                        const rate = Number.parseFloat(e.target.value) || 50;
                        setHourlyRate(rate);
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">/hr</span>
                    </div>
                  </div>
                </div>

                { /* Vulnerability Count Input */}
                <div>
                  <label htmlFor="vulnCount" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('vulnerability_remediation_race.savings_calculator.number_of_vulnerabilities')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="vulnCount"
                      id="vulnCount"
                      className="block w-full rounded-md border-gray-300 pr-12 py-2 text-gray-900 focus:border-[#8220ff] focus:ring-[#8220ff]"
                      placeholder="10"
                      defaultValue="10"
                      min="1"
                      onChange={(e) => {
                        const count = Number.parseInt(e.target.value) || 10;
                        setVulnerabilityCount(count);
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">vulns</span>
                    </div>
                  </div>
                </div>

                { /* Summary Stats */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500">{t('vulnerability_remediation_race.savings_calculator.traditional_cost')}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${(calculateTraditionalCost() * vulnerabilityCount).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-[#8220ff]/5 p-4 rounded-lg border border-[#8220ff]/20">
                      <div className="text-sm text-[#8220ff]">Plexicus Cost</div>
                      <div className="text-2xl font-bold text-[#8220ff]">
                        ${(CALCULATE_COST * vulnerabilityCount).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gradient-to-r from-[#8220ff]/10 to-[#8220ff]/20 p-4 rounded-lg border border-[#8220ff]/20">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-[#8220ff]">{t('vulnerability_remediation_race.savings_calculator.total_savings')}</div>
                      <div className="text-xl font-bold text-[#8220ff]">
                        $
                        {(
                          (calculateTraditionalCost() - CALCULATE_COST) *
                          vulnerabilityCount
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-white/50 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8220ff]"
                        style={{ width: `${calculateSavingsPercentage()}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-right text-sm font-medium text-[#8220ff]">
                      {calculateSavingsPercentage()}% saved
                    </div>
                  </div>
                </div>
              </div>
            </div>

            { /* Right Column - Excel Visualization */}
            <div className="relative">
              { /* Spreadsheet illustration - savings calculator */}
              <div className="relative shadow-xl w-full h-full">
                <div className="w-full h-full bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
                  { /* Mac-style window header */}
                  <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"></div>
                    </div>
                    <div className="flex-1 text-center text-xs font-medium text-gray-500">
                      Plexicus Savings Calculator.xlsx
                    </div>
                  </div>

                  { /* Excel-like menu bar */}
                  <div className="h-7 bg-[#217346] text-white text-xs flex items-center px-2 border-b border-[#185a34]">
                    <div className="flex space-x-3">
                      <span className="hover:bg-[#185a34] px-2 py-1 rounded">File</span>
                      <span className="hover:bg-[#185a34] px-2 py-1 rounded">Home</span>
                      <span className="hover:bg-[#185a34] px-2 py-1 rounded">Insert</span>
                      <span className="hover:bg-[#185a34] px-2 py-1 rounded">Data</span>
                      <span className="hover:bg-[#185a34] px-2 py-1 rounded">View</span>
                    </div>
                  </div>

                  { /* Spreadsheet header */}
                  <div className="h-10 bg-[#8220ff] text-white p-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
                    <div className="text-sm font-bold">Plexicus Savings Calculator</div>
                  </div>

                  { /* Excel-like formula bar */}
                  <div className="h-7 bg-gray-50 border-b border-gray-200 flex items-center px-2 text-xs">
                    <div className="w-10 text-gray-500 mr-1">fx</div>
                    <div className="flex-1 bg-white border border-gray-300 rounded px-2 py-0.5 text-gray-700 font-mono">
                      =SUM(Traditional-Plexicus)
                    </div>
                  </div>

                  { /* Column headers */}
                  <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-700">
                    <div className="w-1/3 p-2 border-r border-gray-200">Item</div>
                    <div className="w-1/3 p-2 border-r border-gray-200 text-center">Traditional</div>
                    <div className="w-1/3 p-2 text-center">Plexicus</div>
                  </div>

                  { /* Spreadsheet rows */}
                  <div className="flex-1 overflow-y-auto" style={{ minHeight: '300px' }}>
                    { /* Time row */}
                    <div className="flex border-b border-gray-200 text-xs">
                      <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Time (min)</div>
                      <div className="w-1/3 p-2 border-r border-gray-200 text-center">{totalTraditionalTime}</div>
                      <div className="w-1/3 p-2 text-center text-[#8220ff] font-medium">{totalPlexicusTime}</div>
                    </div>

                    { /* Cost per vuln row */}
                    <div className="flex border-b border-gray-200 text-xs">
                      <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Cost per vuln</div>
                      <div className="w-1/3 p-2 border-r border-gray-200 text-center">
                        ${calculateTraditionalCost()}
                      </div>
                      <div className="w-1/3 p-2 text-center text-[#8220ff] font-medium">$10</div>
                    </div>

                    { /* Total vulns row */}
                    <div className="flex border-b border-gray-200 text-xs bg-gray-50">
                      <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Total vulns</div>
                      <div className="w-1/3 p-2 border-r border-gray-200 text-center">{vulnerabilityCount}</div>
                      <div className="w-1/3 p-2 text-center">{vulnerabilityCount}</div>
                    </div>

                    { /* Total cost row */}
                    <div className="flex border-b border-gray-200 text-xs">
                      <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Total cost</div>
                      <div className="w-1/3 p-2 border-r border-gray-200 text-center">
                        ${(calculateTraditionalCost() * vulnerabilityCount).toLocaleString()}
                      </div>
                      <div className="w-1/3 p-2 text-center text-[#8220ff] font-medium">
                        ${(CALCULATE_COST * vulnerabilityCount).toLocaleString()}
                      </div>
                    </div>

                    { /* Savings row */}
                    <div className="flex border-b border-gray-200 text-xs bg-[#8220ff]/5">
                      <div className="w-1/3 p-2 border-r border-gray-200 font-bold">Savings</div>
                      <div className="w-2/3 p-2 text-center text-[#8220ff] font-bold" >
                        $
                        {(
                          (calculateTraditionalCost() - CALCULATE_COST) *
                          vulnerabilityCount
                        ).toLocaleString()}
                      </div>
                    </div>

                    { /* Percentage row */}
                    <div className="flex text-xs bg-[#8220ff]/10">
                      <div className="w-1/3 p-2 border-r border-gray-200 font-bold">% Saved</div>
                      <div className="w-2/3 p-2 text-center text-[#8220ff] font-bold">
                        {calculateSavingsPercentage()}%
                      </div>
                    </div>

                    { /* Formula row */}
                    <div className="flex border-t border-gray-300 text-xs bg-gray-50 mt-auto">
                      <div className="w-full p-2 font-mono text-gray-500 text-center">
                        { /* Empty formula row */}
                      </div>
                    </div>
                  </div>

                  { /* Spreadsheet footer */}
                  <div className="h-10 bg-[#8220ff]/80 text-white p-2 text-xs flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
                      <span>Sheet1</span>
                      <span className="ml-2 px-1 bg-white/20 rounded text-white/90">Ready</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      <span>100%</span>
                      <div className="ml-2 px-1 bg-white/20 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}