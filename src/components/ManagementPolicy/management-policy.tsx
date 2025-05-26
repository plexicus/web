import { useTranslations } from '../../i18n/utils';

export default function ManagementPolicy({ lang }) {
    const t = useTranslations(lang);
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-[#8220ff] mb-8">MANAGEMENT POLICY </h1>
                <div className="flex items-center gap-2 mb-12 text-sm text-gray-500">
                    <span>{t("privacy_policy.last_updated")}:</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">May 23, 2025</span>
                </div>
                <section>
                    <p className='mb-6'>
                        The company PLEXICUS, LLC., which carries out cybersecurity consulting activity, has decided to establish a Quality, Environmental and Information Security policy. This policy is aligned with the strategic direction of the organization and is aimed at continuous improvement to allows us to meet the satisfaction and quality level demanded by our clients, guarantee a commitment to the protection of the environment and the prevention of pollution and comply with the requirements applicable to information security, pillars for the establishment of our objectives.
                    </p>
                    <p className='mb-6'>
                        To ensure this Management Policy, the management of PLEXICUS, LLC. undertakes to:
                    </p>
                    <p className='mb-6'>
                        Comply with current legal regulations applicable to all company activities.
                        Implement and maintain an Integrated Management System, based on the ISO 9001, ISO 14001 and ISO 27001 standards.
                        Involve all staff, a fundamental value of this company, through training and continuous motivation to make this commitment their own, applying it in their daily work and thus ensuring the proper functioning of the Management System.
                        Provide the necessary resources, both human and material, for the optimal maintenance of equipment and facilities, continuing with the established policy of improvements and investments foreseen by the Management.
                        Work to prevent pollution and the sustainable use of resources.
                        Know the wants and needs of our clients in order to apply measures that increase their degree of satisfaction with our company.
                        Involve our suppliers so that they share our commitment to quality, environmental and information security.
                        Ensure the security of our own information and that of our interested parties.
                        Disseminate and promote the performance of all employees in accordance with the corporate code of ethics, which has been drawn up in accordance with the culture of the organization.


                    </p>
                    <p className='mb-6'>
                        The Management assumes the responsibility and obligation to render accounts in relation to the effectiveness of the management system implemented.
                    </p>
                </section>
            </div>
        </div>
    )
}