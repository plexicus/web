import { ui, defaultLang } from '@/i18n/ui';

import IconsCheck from '@/components/icons/check';
import IconsCode from '@/components/icons/code';
import IconsDocument from '@/components/icons/document';
import IconsExclamationTriangle from '@/components/icons/exclamation-triangle';
import IconsInfoCircle from '@/components/icons/info-circle';
import IconsTime from '@/components/icons/time';

import { suffixMin } from '@/lib/formatters/suffix-min';

interface PlexicusMethodProps {
  getStepProcess: (index: number, isTraditional: boolean, type?: 'active' | 'progress' | 'completed')=> number | boolean;
  remediationSteps: {
    name: string;
    traditionalTime: number;
    plexicusTime: number;
  }[];
  t: (key: keyof (typeof ui)[typeof defaultLang])=> any;
  plexicusTime: number;
  totalPlexicusTime: number;
}

export default function PlexicusMethod({ getStepProcess, remediationSteps, t, plexicusTime, totalPlexicusTime }: PlexicusMethodProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ minHeight: '590px' }}>
      <div className="bg-[#8220ff] text-white p-4">
        <h3 className="text-xl font-bold">Plexicus</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-white/80">{ t('vulnerability_remediation_race.traditional_method.time_elapsed') }</div>
          <div className="text-2xl font-mono font-bold flex items-center">
            <IconsTime
              className="mr-2 text-blue-500"
              width={32}
              height={32}
              color="#FFFFFF"
            />
            { suffixMin(plexicusTime) }
          </div>
        </div>
        <div className="w-full bg-[#8220ff]/40 h-2 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-green-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${(plexicusTime / totalPlexicusTime) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="p-4">
        { remediationSteps.map((step, index) => (
          <div key={`plex-${index}`} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getStepProcess(index, false, 'completed')
                    ? 'bg-green-100 text-green-600'
                    : getStepProcess(index, false, 'active')
                      ? 'bg-[#8220ff]/10 text-[#8220ff] animate-pulse'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  { getStepProcess(index, false, 'completed') ? (
                    <IconsCheck width="16" height="16" />
                  ) : (
                    index + 1
                  ) }
                </div>
                <span
                  className={`font-medium ${getStepProcess(index, false, 'active')
                    ? 'text-gray-900'
                    : getStepProcess(index, false, 'completed')
                      ? 'text-gray-700'
                      : 'text-gray-400'
                  }`}
                >
                  { step.name }
                </span>
              </div>
              <span
                className={`text-sm font-mono ${getStepProcess(index, false, 'active')
                  ? 'text-gray-900'
                  : getStepProcess(index, false, 'completed')
                    ? 'text-gray-700'
                    : 'text-gray-400'
                }`}
              >
                { suffixMin(step.plexicusTime) }
              </span>
            </div>

            { /* Step visualization */ }
            <div className="ml-11 mt-2 mb-4">
              { getStepProcess(index, true, 'active') && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 animate-fadeIn">
                  { index === 0 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                        <IconsExclamationTriangle className="text-[#8220ff]" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{ t('vulnerability_remediation_race.plexicus.ai_powered_detection') }</div>
                        <div className="text-gray-500">{ t('vulnerability_remediation_race.plexicus.continuous_automated_scanning') }</div>
                      </div>
                    </div>
                  ) }

                  { index === 1 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                        <IconsDocument className="text-[#8220ff]" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{ t('vulnerability_remediation_race.plexicus.automated_prioritization') }</div>
                        <div className="text-gray-500">{ t('vulnerability_remediation_race.plexicus.ai_based_risk_assessment') }</div>
                      </div>
                    </div>
                  ) }

                  { index === 2 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                        <IconsInfoCircle className="text-[#8220ff]" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">AI-powered analysis</div>
                        <div className="text-gray-500">Automated root cause identification</div>
                      </div>
                    </div>
                  ) }

                  { index === 3 && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                        <IconsCode className="text-[#8220ff]" />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">AI-generated fixes</div>
                        <div className="text-gray-500">Automated code remediation</div>
                      </div>
                    </div>
                  ) }
                </div>
              ) }
            </div>

            <div className="ml-11">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out ${getStepProcess(index, false, 'completed')
                    ? 'bg-green-500'
                    : getStepProcess(index, false, 'active')
                      ? 'bg-[#8220ff]'
                      : 'bg-gray-200'
                  }`}
                  style={{
                    width: `${getStepProcess(index, false, 'active') ? getStepProcess(index, false) : getStepProcess(index, false, 'completed') ? 100 : 0}%`,
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