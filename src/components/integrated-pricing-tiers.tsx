'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Check, X, HelpCircle } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';
type PlanType = 'professional' | 'enterprise';

interface PlanDetails {
  id: PlanType;
  name: string;
  basePrice: number;
  remediationMultiplier: number;
}

export function IntegratedPricingTiers({
  lang,
  hideRemediationMultiplier = false,
  professionalPrice = 49,
  enterprisePrice = 69,
}: {
  lang: string;
  hideRemediationMultiplier?: boolean;
  professionalPrice?: number;
  enterprisePrice?: number;
}) {
  const t = useTranslations(lang);
  // Plan options
  const plans: PlanDetails[] = [
    { id: 'professional', name: t('pricing_tiers.professional.name'), basePrice: professionalPrice, remediationMultiplier: 2 },
    { id: 'enterprise', name: t('pricing_tiers.enterprise.name'), basePrice: enterprisePrice, remediationMultiplier: 3 },
  ];

  // State for calculator
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
    <div className="max-w-7xl mx-auto">
      { /* Pricing Tiers */ }
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        { /* Free Trial */ }
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">{ t('pricing_tiers.free.name') }</h3>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-3xl font-bold tracking-tight">$0</span>
              <span className="ml-1 text-xl font-semibold">/developer</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{ t('pricing_tiers.free.duration') }</p>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-4 flex-1">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.free.features.full_platform_access') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.free.features.community_support') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.free.features.basic_vuln_scanning') }</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 flex-shrink-0 mr-2" />
                <span className="text-gray-400">{ t('pricing_tiers.free.features.limited_remediations') }</span>
              </li>
            </ul>
            <Button className="mt-6 w-full bg-gray-800 hover:bg-gray-700">{ t('pricing_tiers.free.button') }</Button>
          </div>
        </div>

        { /* Professional */ }
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#8220ff]/30 flex flex-col relative">
          <div className="absolute top-0 right-0 bg-[#8220ff] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
          <div className="p-6 bg-[#8220ff]/5 border-b border-[#8220ff]/20">
            <h3 className="text-xl font-bold text-gray-900">{ t('pricing_tiers.professional.name') }</h3>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-3xl font-bold tracking-tight">${ professionalPrice }</span>
              <span className="ml-1 text-xl font-semibold">/developer</span>
              <span className="ml-1 text-sm font-normal text-gray-500">/month</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{ t('pricing_tiers.professional.billed') }</p>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-4 flex-1">
              { !hideRemediationMultiplier && (
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">{ t('pricing_tiers.professional.features.remediation_multiplier') }</span>
                </li>
              ) }
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.professional.features.email_support') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.professional.features.up_to_100_repos') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.professional.features.container_images') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.professional.features.domains') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.professional.features.cloud_accounts') }</span>
              </li>
            </ul>
            <Button className="mt-6 w-full bg-[#8220ff] hover:bg-[#6010df]" onClick={() => setSelectedPlan(plans[0])}>
              { t('pricing_tiers.professional.button') }
            </Button>
          </div>
        </div>

        { /* Enterprise */ }
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">{ t('pricing_tiers.enterprise.name') }</h3>
            <div className="mt-4 flex items-baseline text-gray-900">
              <span className="text-3xl font-bold tracking-tight">${ enterprisePrice }</span>
              <span className="ml-1 text-xl font-semibold">/developer</span>
              <span className="ml-1 text-sm font-normal text-gray-500">/month</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{ t('pricing_tiers.enterprise.billed') }</p>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-4 flex-1">
              { !hideRemediationMultiplier && (
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-gray-600">{ t('pricing_tiers.enterprise.features.remediation_multiplier') }</span>
                </li>
              ) }
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.enterprise.features.premium_support') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.enterprise.features.up_to_250_repos') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.enterprise.features.container_images') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.enterprise.features.domains') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-600">{ t('pricing_tiers.enterprise.features.cloud_accounts') }</span>
              </li>
            </ul>
            <Button className="mt-6 w-full bg-gray-800 hover:bg-gray-700" onClick={() => setSelectedPlan(plans[1])}>
              { t('pricing_tiers.professional.button') }
            </Button>
          </div>
        </div>

        { /* Custom */ }
        <div className="bg-gradient-to-br from-[#8220ff]/10 to-[#8220ff]/5 rounded-xl shadow-md overflow-hidden border border-[#8220ff]/20 flex flex-col">
          <div className="p-6 bg-[#8220ff]/20 border-b border-[#8220ff]/20">
            <h3 className="text-xl font-bold text-white">{ t('pricing_tiers.custom.name') }</h3>
            <div className="mt-4 flex items-baseline text-white">
              <span className="text-3xl font-bold tracking-tight">{ t('pricing_tiers.custom.price') }</span>
            </div>
            <p className="mt-2 text-sm text-gray-200">{ t('pricing_tiers.custom.description') }</p>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-4 flex-1">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-200">{ t('pricing_tiers.custom.features.sla') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-200">{ t('pricing_tiers.custom.features.dedicated_resources') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-200">{ t('pricing_tiers.custom.features.integration_support') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-200">{ t('pricing_tiers.custom.features.on_premise_option') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-200">{ t('pricing_tiers.custom.features.unlimited_repos') }</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                <span className="text-gray-200">{ t('pricing_tiers.custom.features.unlimited_container_images') }</span>
              </li>
            </ul>
            <Button className="mt-6 w-full bg-[#8220ff] hover:bg-[#6010df]">{ t('pricing_tiers.custom.button') }</Button>
          </div>
        </div>
      </div>

      { /* Integrated Calculator */ }
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-12">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">{ t('calculator.title') }</h3>
          <p className="mt-2 text-gray-600">{ t('calculator.subtitle') }</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div>
            { /* Plan Selection */ }
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{ t('calculator.selected_plan.title') }</h4>
              <div className="grid grid-cols-2 gap-4">
                { plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedPlan.id === plan.id
                      ? 'border-[#8220ff] bg-[#8220ff]/5 shadow-md'
                      : 'border-gray-200 hover:border-[#8220ff]/50'
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{ plan.name }</h5>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan.id === plan.id ? 'border-[#8220ff]' : 'border-gray-300'
                        }`}
                      >
                        { selectedPlan.id === plan.id && <div className="w-3 h-3 rounded-full bg-[#8220ff]"></div> }
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">${ plan.basePrice }{ t('calculator.selected_plan.base_price') }</p>
                    <p className="text-sm text-gray-600 mt-1">{ plan.remediationMultiplier }{ t('calculator.selected_plan.remediation_multiplier') }</p>
                  </div>
                )) }
              </div>
            </div>

            { /* Number of Developers */ }
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{ t('calculator.plan_selection.number_of_developers.title') }</h4>
                <div className="relative group">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white p-2 rounded shadow-lg text-xs hidden group-hover:block z-10">
                    { t('calculator.plan_selection.help_text') }
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
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{ t('calculator.billing_cycle.title') }</h4>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className={`font-medium ${isYearly ? 'text-gray-500' : 'text-gray-900'}`}>{ t('calculator.billing_cycle.monthly') }</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                    { t('calculator.billing_cycle.yearly') }
                  </span>
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
          </div>

          { /* Price Summary */ }
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{ t('calculator.summary.title') }</h4>
              <div className="text-sm text-gray-500">{ selectedPlan.name } Plan</div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{ t('calculator.summary.base_price') }</span>
                <span className="font-medium">
                  ${ selectedPlan.basePrice }/developer/{ isYearly ? 'month' : 'month' }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{ t('calculator.summary.developers') }</span>
                <span className="font-medium">{ developers }</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{ t('calculator.summary.billing_cycle') }</span>
                <span className="font-medium">{ isYearly ? 'Yearly' : 'Monthly' }</span>
              </div>
              { isYearly && (
                <div className="flex justify-between text-green-600">
                  <span>{ t('calculator.summary.yearly_discount') }</span>
                  <span>10%</span>
                </div>
              ) }
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">{ t('calculator.summary.total_price') }</span>
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

            <Button className="w-full bg-[#8220ff] hover:bg-[#6010df]">{ t('calculator.button') } { selectedPlan.name }</Button>
          </div>
        </div>
      </div>

      { /* Feature comparison */ }
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
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
                  { t('pricing_tiers.free.name') }
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-[#8220ff] uppercase tracking-wider">
                  { t('pricing_tiers.professional.name') }
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  { t('pricing_tiers.enterprise.name') }
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  { t('pricing_tiers.custom.name') }
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.price') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">$0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  ${ professionalPrice }/developer
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  ${ enterprisePrice }/developer
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.price') }</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.duration') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.free_plan.duration') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.professional_plan.duration') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.enterprise_plan.duration') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.duration') }</td>
              </tr>
              { !hideRemediationMultiplier && (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1x</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1x</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">2x</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">3x</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.remediation_multiplier') }</td>
                </tr>
              ) }
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.support') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.free_plan.support') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.professional_plan.support') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.enterprise_plan.support') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.support') }</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.repositories') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">Up to 100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Up to 250</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.repositories') }</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.container_images') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.container_images') }</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.domains') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.domains') }</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.cloud_accounts') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ t('pricing_table.custom_plan.cloud_accounts') }</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.sla') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ t('pricing_table.on_premise_option') }</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">
                  { t('pricing_table.features_included_in_all_plans') }
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Open source dependency scanning (SCA)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Cloud posture management (CSPM)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Secrets detection</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Static code analysis (SAST)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Infrastructure as code scanning (IaC)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Dynamic testing (DAST)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Open source license scanning
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Outdated software detection
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Container image scanning
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      { /* FAQ Section */ }
      <div className="mt-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{ t('faq.minimum_developers.question') }</h4>
              <p className="text-gray-600">
                { t('faq.minimum_developers.answer') }
              </p>
            </div>
            { !hideRemediationMultiplier && (
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{ t('faq.remediation_multiplier.question') }</h4>
                <p className="text-gray-600">
                  { t('faq.remediation_multiplier.answer') }
                </p>
              </div>
            ) }
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{ t('faq.switch_plans.question') }</h4>
              <p className="text-gray-600">
                { t('faq.switch_plans.answer') }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{ t('faq.yearly_billing_discount.question') }</h4>
              <p className="text-gray-600">
                { t('faq.yearly_billing_discount.answer') }
              </p>
            </div>
          </div>
        </div>
      </div>

      { /* CTA Section */ }
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">{ t('cta_section.title') }</h3>
        <p className="text-white mb-6 max-w-2xl mx-auto">
          { t('cta_section.subtitle') }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-[#8220ff] hover:bg-[#6010df]">{ t('cta_section.buttons.start_free_trial.text') }</Button>
          <Button variant="outline" className="border-[#8220ff] text-[#8220ff]">
            { t('cta_section.buttons.contact_sales.text') }
          </Button>
        </div>
      </div>
    </div>
  );
}
