'use client'
import { useTranslations } from '../../i18n/utils';
import { MobileTableOfContents } from './mobile-table-content';
import { useState, useEffect, useRef } from "react"
export default function PrivacyPolicy({ lang }) {
    const t = useTranslations(lang);
    const [activeSection, setActiveSection] = useState<string>("introduction")
    const [isManuallyScrolling, setIsManuallyScrolling] = useState(false);

    const sectionRefs = {
        introduction: useRef<HTMLDivElement>(null),
        dataCollection: useRef<HTMLDivElement>(null),
        legalBasis: useRef<HTMLDivElement>(null),
        dataSharing: useRef<HTMLDivElement>(null),
        cookies: useRef<HTMLDivElement>(null),
        dataTransfer: useRef<HTMLDivElement>(null),
        dataSubjectRights: useRef<HTMLDivElement>(null),
        dataRetention: useRef<HTMLDivElement>(null),
        security: useRef<HTMLDivElement>(null),
        changes: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
        dpo: useRef<HTMLDivElement>(null),

    }
    const tableOfContents = [
        { id: "introduction", title: t("privacy_policy.introduction.title") },
        { id: "dataCollection", title: t("privacy_policy.data_collection.title") },
        { id: "legalBasis", title: t("privacy_policy.legal_basis.title") },
        { id: "dataSharing", title: t("privacy_policy.data_sharing.title") },
        { id: "cookies", title: t("privacy_policy.cookies.title") },
        { id: "dataTransfer", title:  t("privacy_policy.data_transfer.title") },
        { id: "dataSubjectRights", title:  t("privacy_policy.data_subject_rights.title") },
        { id: "dataRetention", title:  t("privacy_policy.data_retention.title") },
        { id: "security", title: t("privacy_policy.security.title") },
        { id: "changes", title: t("privacy_policy.changes.title") },
        { id: "contact", title: t("privacy_policy.contact.title") },
        { id: "dpo", title: t("privacy_policy.dpo.title") },
    ]


    useEffect(() => {
        const observers = Object.entries(sectionRefs).map(([id, ref]) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isManuallyScrolling) {
                            console.log(id, 'intersecting')
                            setActiveSection(id)
                        }
                    })
                },
                {
                    threshold: 0.2, // Lower threshold for better detection
                    rootMargin: "-100px 0px -50% 0px", // Adjust the detection area
                },
            )

            if (ref.current) {
                observer.observe(ref.current)
            }

            return observer
        })

        return () => {
            observers.forEach((observer) => observer.disconnect())
        }
    }, [isManuallyScrolling])

    const handleClickToSection = (id: string) => {
        setIsManuallyScrolling(true);
        setActiveSection(id)
        console.log(id, 'a')
        const targetElement = sectionRefs[id as keyof typeof sectionRefs].current
        if (targetElement) {
            // Use scrollIntoView with the center option
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "center", // Center the element in the viewport
            })

            setTimeout(() => {
                setIsManuallyScrolling(false);
            }, 1000);
        }
    }


    return (
        <div className="bg-white min-h-screen">
            {/* Mobile Table of Contents */}
            <MobileTableOfContents items={tableOfContents} activeSection={activeSection} handleClickToSection={handleClickToSection} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Desktop Table of Contents - Sidebar */}
                    <div className="hidden md:block md:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-2xl font-bold text-[#8220ff] mb-6">{t("privacy_policy.table_of_content")}</h2>
                            <nav className="space-y-2">
                                {tableOfContents.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={() => handleClickToSection(item.id)}
                                        className={`block py-2 transition-colors ${activeSection === item.id
                                            ? "text-[#8220ff] font-medium border-l-2 border-[#8220ff] pl-3"
                                            : "text-gray-700 hover:text-[#8220ff] pl-3"
                                            }`}
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <div className="prose max-w-none">
                            <h1 className="text-4xl font-bold text-[#8220ff] mb-8">{t("privacy_policy.title")}</h1>

                            <div className="flex items-center gap-2 mb-12 text-sm text-gray-500">
                                <span>{t("privacy_policy.last_updated")}:</span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full">May 23, 2025</span>
                            </div>

                            {/* Introduction */}
                            <section ref={sectionRefs.introduction} id="introduction" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t("privacy_policy.introduction.title")}</h2>
                                <p>{t("privacy_policy.introduction.content.paragraph1")}</p>
                                <p>{t("privacy_policy.introduction.content.paragraph2")}</p>
                                <p>{t("privacy_policy.introduction.content.paragraph3")}</p>
                            </section>

                            {/* Data Collection */}
                            <section ref={sectionRefs.dataCollection} id="dataCollection" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t("privacy_policy.data_collection.title")}</h2>
                                <p>{t("privacy_policy.data_collection.paragraph1")}</p>
                                <ul>
                                    <li>{t("privacy_policy.data_collection.paragraph2.item1")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph2.item2")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph2.item3")}</li>
                                </ul>
                                <p>{t("privacy_policy.data_collection.paragraph3")}</p>
                                <ul>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item1")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item2")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item3")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item4")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item5")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item6")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item7")}</li>
                                    <li>{t("privacy_policy.data_collection.paragraph4.item8")}</li>
                                </ul>
                            </section>

                            {/* Legal Basis */}
                            <section ref={sectionRefs.legalBasis} id="legalBasis" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t("privacy_policy.legal_basis.title")}</h2>
                                <p>{t("privacy_policy.legal_basis.paragraph1")}</p>
                                <ul>
                                    <li>
                                        <strong>{t("privacy_policy.legal_basis.paragraph2.item1.title")}</strong>{t("privacy_policy.legal_basis.paragraph2.item1.content")}
                                    </li>
                                    <li>
                                        <strong>{t("privacy_policy.legal_basis.paragraph2.item2.title")}</strong>{t("privacy_policy.legal_basis.paragraph2.item2.content")}
                                    </li>
                                    <li>
                                        <strong>{t("privacy_policy.legal_basis.paragraph2.item3.title")}</strong>{t("privacy_policy.legal_basis.paragraph2.item3.content")}
                                    </li>
                                    <li>
                                        <strong>{t("privacy_policy.legal_basis.paragraph2.item4.title")}</strong>{t("privacy_policy.legal_basis.paragraph2.item4.content")}
                                    </li>
                                </ul>
                            </section>

                            {/* Data Sharing */}
                            <section ref={sectionRefs.dataSharing} id="dataSharing" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t("privacy_policy.data_sharing.title")}</h2>
                                <p>{t('privacy_policy.data_sharing.paragraph1')}</p>
                                <ul>
                                    <li>{t('privacy_policy.data_sharing.paragraph2.item1')}</li>
                                    <li>{t('privacy_policy.data_sharing.paragraph2.item2')}</li>
                                    <li>{t('privacy_policy.data_sharing.paragraph2.item3')}</li>
                                    <li>{t('privacy_policy.data_sharing.paragraph2.item4')}</li>
                                    <li>{t('privacy_policy.data_sharing.paragraph2.item4')}</li>
                                </ul>
                                <p>{t('privacy_policy.data_sharing.paragraph3')}</p>
                            </section>

                            {/* Cookies */}
                            <section ref={sectionRefs.cookies} id="cookies" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.cookies.title')}</h2>
                                <p>{t('privacy_policy.cookies.paragraph1')}</p>
                                <p>{t('privacy_policy.cookies.paragraph2')}</p>
                                <p>{t('privacy_policy.cookies.paragraph3')}</p>
                            </section>

                            {/* Data Transfer */}
                            <section ref={sectionRefs.dataTransfer} id="dataTransfer" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">
                                    {t('privacy_policy.data_transfer.title')}
                                </h2>
                                <p> {t('privacy_policy.data_transfer.paragraph1')}</p>
                                <ul>
                                    <li>{t('privacy_policy.data_transfer.paragraph2.item1')}</li>
                                    <li>{t('privacy_policy.data_transfer.paragraph2.item2')}</li>
                                    <li>{t('privacy_policy.data_transfer.paragraph2.item3')}</li>
                                </ul>
                            </section>

                            {/* Data Subject Rights */}
                            <section ref={sectionRefs.dataSubjectRights} id="dataSubjectRights" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.data_subject_rights.title')}</h2>
                                <p>{t('privacy_policy.data_subject_rights.paragraph1')}</p>
                                <ul>
                                    <li>
                                        <strong>{t('privacy_policy.data_subject_rights.paragraph2.item1.title')}</strong> {t('privacy_policy.data_subject_rights.paragraph2.item1.content')}
                                    </li>
                                    <li>
                                        <strong>{t('privacy_policy.data_subject_rights.paragraph2.item2.title')}</strong> {t('privacy_policy.data_subject_rights.paragraph2.item2.content')}
                                    </li>
                                    <li>
                                        <strong>{t('privacy_policy.data_subject_rights.paragraph2.item3.title')}</strong> {t('privacy_policy.data_subject_rights.paragraph2.item3.content')}
                                    </li>
                                    <li>
                                        <strong>{t('privacy_policy.data_subject_rights.paragraph2.item4.title')}</strong> {t('privacy_policy.data_subject_rights.paragraph2.item4.content')}
                                    </li>
                                    <li>
                                        <strong>{t('privacy_policy.data_subject_rights.paragraph2.item5.title')}</strong> {t('privacy_policy.data_subject_rights.paragraph2.item5.content')}
                                    </li>
                                    <li>
                                        <strong>{t('privacy_policy.data_subject_rights.paragraph2.item6.title')}</strong> {t('privacy_policy.data_subject_rights.paragraph2.item6.content')}
                                    </li>
                                </ul>
                                <p>
                                    {t('privacy_policy.data_subject_rights.paragraph3')}
                                </p>
                            </section>

                            {/* Data Retention */}
                            <section ref={sectionRefs.dataRetention} id="dataRetention" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.data_retention.title')}</h2>
                                <p>
                                    {t('privacy_policy.data_retention.paragraph1')}
                                </p>
                                <p>
                                    {t('privacy_policy.data_retention.paragraph2')}
                                </p>
                            </section>

                            {/* Security */}
                            <section ref={sectionRefs.security} id="security" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.security.title')}</h2>
                                <p>
                                    {t('privacy_policy.security.paragraph1')}
                                </p>
                            </section>

                            {/* Changes to Policy */}
                            <section ref={sectionRefs.changes} id="changes" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.changes.title')}</h2>
                                <p>{t('privacy_policy.changes.paragraph1')}
                                </p>
                                <p>{t('privacy_policy.changes.paragraph2')}
                                </p>
                                <p>{t('privacy_policy.changes.paragraph3')}
                                </p>
                            </section>

                            {/* Contact */}
                            <section ref={sectionRefs.contact} id="contact" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.contact.title')}</h2>
                                <p>{t('privacy_policy.contact.paragraph1')}</p>
                                <ul>
                                    <li>{t('privacy_policy.contact.paragraph2.item1')}</li>
                                    <li>{t('privacy_policy.contact.paragraph2.item2')}</li>
                                    <li>{t('privacy_policy.contact.paragraph2.item3')}</li>
                                    <li>{t('privacy_policy.contact.paragraph2.item4')}</li>
                                </ul>
                            </section>

                            {/* Data Protection Officer */}
                            <section ref={sectionRefs.dpo} id="dpo" className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#8220ff] mb-4">{t('privacy_policy.dpo.title')}</h2>
                                <p>
                                  {t('privacy_policy.dpo.paragraph1')}
                                </p>
                                <p>
                                    <strong> {t('privacy_policy.dpo.paragraph2')}r</strong>
                                    <br />
                                     {t('common.company_name')}
                                    <br />
                                    {t('common.address')}

                                    <br />
                                     {t('common.company_country')}
                                    <br />
                                    {t('common.label.email')}: {t('common.email')}
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

