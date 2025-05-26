import { useTranslations } from '../../i18n/utils';

export default function ManagementPolicy({ lang }) {
    const t = useTranslations(lang);
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-[#8220ff] mb-8">{t('management_policy.title')} </h1>
                <div className="flex items-center gap-2 mb-12 text-sm text-gray-500">
                    <span>{t("privacy_policy.last_updated")}:</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">May 23, 2025</span>
                </div>
                <section>
                    <p className='mb-6'>{t('management_policy.paragraph1')}</p>
                    <p className='mb-6'>{t('management_policy.paragraph2')}</p>
                    <p className='mb-6'>{t('management_policy.paragraph3')}</p>
                   <p className='mb-6'>{t('management_policy.paragraph4')}</p>
                </section>
            </div>
        </div>
    )
}