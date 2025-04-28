'use client';


import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Check, HelpCircle } from 'lucide-react';

type PlanType = 'professional' | 'enterprise';

interface PlanDetails {
  id: PlanType;
  name: string;
  basePrice: number;
  remediationMultiplier: number;
}

export function PricingCalculator() {
  // Plan options
  const plans: PlanDetails[] = [
    { id: 'professional', name: 'Professional', basePrice: 50, remediationMultiplier: 2 },
    { id: 'enterprise', name: 'Enterprise', basePrice: 70, remediationMultiplier: 3 },
  ];

  // State
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails>(plans[0]);
  const [developers, setDevelopers] = useState<number>(20);
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [customDevelopers, setCustomDevelopers] = useState<string>('20');

  // Calculate prices
  const monthlyPrice = selectedPlan.basePrice * developers;
  const yearlyPrice = monthlyPrice * 12 * 0.9; // 10% discount
  const totalPrice = isYearly ? yearlyPrice : monthlyPrice;
  const billingPeriod = isYearly ? 'year' : 'month';
  const savings = isYearly ? monthlyPrice * 12 - yearlyPrice : 0;

  // Handle custom developer input
  const handleCustomDevelopersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomDevelopers(value);

    const numValue = Number.parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 20) {
      setDevelopers(numValue);
    }
  };

  // Apply custom developers when input is blurred
  const handleCustomDevelopersBlur = () => {
    const numValue = Number.parseInt(customDevelopers, 10);
    if (isNaN(numValue) || numValue < 20) {
      setCustomDevelopers('20');
      setDevelopers(20);
    }
  };

  // Update custom developers input when slider changes
  useEffect(() => {
    setCustomDevelopers(developers.toString());
  }, [developers]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">Pricing Calculator</h3>
          <p className="mt-2 text-gray-600">Estimate your costs based on your team size and billing preference</p>
        </div>

        <div className="p-6">
          { /* Plan Selection */ }
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Plan</h4>
            <div className="grid grid-cols-2 gap-4">
              { plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedPlan.id === plan.id
                      ? 'border-[#8220ff] bg-[#8220ff]/5 shadow-md'
                      : 'border-gray-200 hover:border-[#8220ff]/50'
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">{ plan.name }</h5>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan.id === plan.id ? 'border-[#8220ff]' : 'border-gray-300'
                      }`}
                    >
                      { selectedPlan.id === plan.id && <div className="w-3 h-3 rounded-full bg-[#8220ff]"></div> }
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">${ plan.basePrice }/developer/month</p>
                  <p className="text-sm text-gray-600 mt-1">{ plan.remediationMultiplier }x remediation multiplier</p>
                </div>
              )) }
            </div>
          </div>

          { /* Number of Developers */ }
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Number of Developers</h4>
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs cursor-help">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white p-2 rounded shadow-lg text-xs hidden group-hover:block">
                  Minimum 20 developers required
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <input
                type="range"
                min="20"
                max="500"
                step="1"
                value={developers}
                onChange={(e) => setDevelopers(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8220ff]"
              />
              <div className="w-24">
                <input
                  type="number"
                  min="20"
                  value={customDevelopers}
                  onChange={handleCustomDevelopersChange}
                  onBlur={handleCustomDevelopersBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                />
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>20</span>
              <span>100</span>
              <span>250</span>
              <span>500+</span>
            </div>
          </div>

          { /* Billing Cycle */ }
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Billing Cycle</h4>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <span className={`font-medium ${isYearly ? 'text-gray-500' : 'text-gray-900'}`}>Monthly</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Yearly (Save 10%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={isYearly}
                    onChange={() => setIsYearly(!isYearly)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8220ff]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8220ff]"></div>
                </label>
              </div>
            </div>
          </div>

          { /* Price Summary */ }
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Summary</h4>
              <div className="text-sm text-gray-500">{ selectedPlan.name } Plan</div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Base price</span>
                <span className="font-medium">
                  ${ selectedPlan.basePrice }/developer/{ isYearly ? 'month' : 'month' }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of developers</span>
                <span className="font-medium">{ developers }</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing cycle</span>
                <span className="font-medium">{ isYearly ? 'Yearly' : 'Monthly' }</span>
              </div>
              { isYearly && (
                <div className="flex justify-between text-green-600">
                  <span>Yearly discount</span>
                  <span>10%</span>
                </div>
              ) }
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total price</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#8220ff]">
                    ${ isYearly ? Math.round(yearlyPrice).toLocaleString() : Math.round(monthlyPrice).toLocaleString() }
                  </div>
                  <div className="text-sm text-gray-500">per { billingPeriod }</div>
                </div>
              </div>
              { isYearly && savings > 0 && (
                <div className="mt-2 text-sm text-green-600 text-right">
                  You save ${ Math.round(savings).toLocaleString() } per year
                </div>
              ) }
            </div>

            <Button className="w-full bg-[#8220ff] hover:bg-[#6010df]">Get Started with { selectedPlan.name }</Button>
          </div>
        </div>
      </div>

      { /* Feature comparison */ }
      <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">Plan Comparison</h3>
          <p className="mt-2 text-gray-600">See what's included in each plan</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Free Trial
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#8220ff] uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enterprise
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custom
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">$0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  $50/developer
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">$70/developer</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Custom</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Duration</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">30 days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Remediation multiplier
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1x</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">2x</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">3x</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Custom</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Support</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Community</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Email</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Premium</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Dedicated</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Repositories</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Up to 100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Up to 250</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Container images</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Domains</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cloud accounts</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SLA</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">On-premise option</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
