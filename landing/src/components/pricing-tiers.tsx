'use client';

import { Button } from './ui/button';
import { Check, X } from 'lucide-react';

export function PricingTiers() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      { /* Free Trial */ }
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Free Trial</h3>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">$0</span>
            <span className="ml-1 text-xl font-semibold">/developer</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">For 30 days</p>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <ul className="space-y-4 flex-1">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Full platform access</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Community support</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Basic vulnerability scanning</span>
            </li>
            <li className="flex items-start">
              <X className="h-5 w-5 text-gray-300 flex-shrink-0 mr-2" />
              <span className="text-gray-400">Limited remediations</span>
            </li>
          </ul>
          <Button className="mt-6 w-full bg-gray-800 hover:bg-gray-700">Start Free Trial</Button>
        </div>
      </div>

      { /* Professional */ }
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#8220ff]/30 flex flex-col relative">
        <div className="absolute top-0 right-0 bg-[#8220ff] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
        <div className="p-6 bg-[#8220ff]/5 border-b border-[#8220ff]/20">
          <h3 className="text-xl font-bold text-gray-900">Professional</h3>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">$50</span>
            <span className="ml-1 text-xl font-semibold">/developer</span>
            <span className="ml-1 text-sm font-normal text-gray-500">/month</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Billed monthly or annually</p>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <ul className="space-y-4 flex-1">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">2x remediation multiplier</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Email support</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Up to 100 repositories</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">25 container images</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">3 domains</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">3 cloud accounts</span>
            </li>
          </ul>
          <Button className="mt-6 w-full bg-[#8220ff] hover:bg-[#6010df]">Get Started</Button>
        </div>
      </div>

      { /* Enterprise */ }
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">$70</span>
            <span className="ml-1 text-xl font-semibold">/developer</span>
            <span className="ml-1 text-sm font-normal text-gray-500">/month</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Billed monthly or annually</p>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <ul className="space-y-4 flex-1">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">3x remediation multiplier</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Premium support</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Up to 250 repositories</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">50 container images</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">15 domains</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">10 cloud accounts</span>
            </li>
          </ul>
          <Button className="mt-6 w-full bg-gray-800 hover:bg-gray-700">Contact Sales</Button>
        </div>
      </div>

      { /* Custom */ }
      <div className="bg-gradient-to-br from-[#8220ff]/10 to-[#8220ff]/5 rounded-xl shadow-md overflow-hidden border border-[#8220ff]/20 flex flex-col">
        <div className="p-6 bg-[#8220ff]/20 border-b border-[#8220ff]/20">
          <h3 className="text-xl font-bold text-gray-900">Custom</h3>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">Custom</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Tailored to your needs</p>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <ul className="space-y-4 flex-1">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Service-level agreement (SLA)</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Dedicated computing resources</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Integration support</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">On-premise option with Azure Stack Hub</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Unlimited repositories</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
              <span className="text-gray-600">Unlimited container images</span>
            </li>
          </ul>
          <Button className="mt-6 w-full bg-[#8220ff] hover:bg-[#6010df]">Contact Us</Button>
        </div>
      </div>

      { /* FAQ Section */ }
      <div className="md:col-span-2 lg:col-span-4 mt-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">What is the minimum number of developers?</h4>
              <p className="text-gray-600">
                All paid plans require a minimum of 20 developers. This ensures we can provide the best service and
                support for your team.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">What is a remediation multiplier?</h4>
              <p className="text-gray-600">
                The remediation multiplier determines how many automated fixes our AI can generate for each
                vulnerability detected. Higher tiers offer more remediation options.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Can I switch plans?</h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Do you offer discounts for yearly billing?</h4>
              <p className="text-gray-600">
                Yes, we offer a 10% discount when you choose annual billing for any of our paid plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
