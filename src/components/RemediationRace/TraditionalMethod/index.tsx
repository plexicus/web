import { ui, defaultLang } from '@/i18n/ui';

import IconsCheck from '@/components/icons/check';
import IconsCode from '@/components/icons/code';
import IconsDocument from '@/components/icons/document';
import IconsExclamationTriangle from '@/components/icons/exclamation-triangle';
import IconsInfoCircle from '@/components/icons/info-circle';
import IconsTime from '@/components/icons/time';

import { suffixMin } from '@/lib/formatters/suffix-min';

interface TraditionalMethodProps {
  getStepProcess: (index: number, isTraditional: boolean, type?: 'active' | 'progress' | 'completed')=> number | boolean;
  remediationSteps: {
    name: string;
    traditionalTime: number;
    plexicusTime: number;
  }[];
  t: (key: keyof (typeof ui)[typeof defaultLang])=> any;
  traditionalTime: number;
  totalTraditionalTime: number;
}

export default function TraditionalMethod({ getStepProcess, remediationSteps, t, traditionalTime, totalTraditionalTime }: TraditionalMethodProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ minHeight: '590px' }}>
      <div className="bg-gray-800 text-white p-4">
        <h3 className="text-xl font-bold">Traditional Method</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-300">{ t('vulnerability_remediation_race.traditional_method.time_elapsed') }</div>
          <div className="text-2xl font-mono font-bold flex items-center">
            <IconsTime
              className="mr-2 text-blue-500"
              width={32}
              height={32}
              color="#FFFFFF"
            />
            { suffixMin(traditionalTime) }
          </div>
        </div>
        <div className="w-full bg-gray-600 h-2 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-red-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(traditionalTime / totalTraditionalTime) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="p-4">
        { remediationSteps.map((step, index) => (
          <div key={`trad-${index}`} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getStepProcess(index, true, 'completed')
                    ? 'bg-green-100 text-green-600'
                    : getStepProcess(index, true, 'active')
                      ? 'bg-yellow-100 text-yellow-600 animate-pulse'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  { getStepProcess(index, true, 'completed') ? (
                    <IconsCheck width="16" height="16" />
                  ) : (
                    index + 1
                  ) }
                </div>
                <span
                  className={`font-medium ${getStepProcess(index, true, 'active')
                    ? 'text-gray-900'
                    : getStepProcess(index, true, 'completed')
                      ? 'text-gray-700'
                      : 'text-gray-400'
                  }`}
                >
                  { step.name }
                </span>
              </div>
              <span
                className={`text-sm font-mono ${getStepProcess(index, true, 'completed')
                  ? 'text-green-600'
                  : getStepProcess(index, true, 'active')
                    ? 'text-yellow-600'
                    : 'text-gray-400'
                }`}
              >
                { suffixMin(step.traditionalTime) }
              </span>
            </div>

            { /* Step visualization */ }
            <div className="ml-11 mt-2 mb-4">
              { getStepProcess(index, true, 'active') && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 animate-fadeIn">
                  { index === 0 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <IconsExclamationTriangle className="text-red-500" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{ t('vulnerability_remediation_race.traditional_method.initial_detection.description') }</div>
                      </div>
                    </div>
                  ) }

                  { index === 1 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <IconsDocument className="text-yellow-500" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{ t('vulnerability_remediation_race.traditional_method.manual_prioritization') }</div>
                        <div className="text-gray-500">{ t('vulnerability_remediation_race.traditional_method.waiting_for_security_team_review') }</div>
                      </div>
                    </div>
                  ) }

                  { index === 2 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <IconsInfoCircle className="text-blue-500" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{ t('vulnerability_remediation_race.traditional_method.expert_analysis_required') }</div>
                        <div className="text-gray-500">{ t('vulnerability_remediation_race.traditional_method.security_team_investigating_root_cause') }</div>
                      </div>
                    </div>
                  ) }

                  { index === 3 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <IconsCode className="text-indigo-500" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{ t('vulnerability_remediation_race.traditional_method.manual_code_fixes') }</div>
                        <div className="text-gray-500">{ t('vulnerability_remediation_race.traditional_method.developer_writing_and_reviewing_patches') }</div>
                      </div>
                    </div>
                  ) }
                </div>
              ) }
            </div>

            <div className="ml-11">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out ${getStepProcess(index, true, 'completed')
                    ? 'bg-green-500'
                    : getStepProcess(index, true, 'active')
                      ? 'bg-yellow-500'
                      : 'bg-gray-200'
                  }`}
                  style={{
                    width: `${getStepProcess(index, true, 'active') ? getStepProcess(index, true) : getStepProcess(index, true, 'completed') ? 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}