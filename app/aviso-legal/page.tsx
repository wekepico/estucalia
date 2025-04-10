'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center py-10 text-gray-900 mb-20">
                {t("privacyPolicy.title")}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Columna izquierda */}
                <div>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.identification.title")}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.identification.description1")}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.identification.description2")}
                        </p>
                        <p className="text-gray-700">
                            {t("privacyPolicy.sections.identification.description3")}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.terms.title")}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.terms.description1")}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.terms.description2")}
                        </p>
                        <p className="text-gray-700">
                            {t("privacyPolicy.sections.terms.description3")}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.security.title")}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.security.description1")}
                        </p>
                        <p className="text-gray-700">
                            {t("privacyPolicy.sections.security.description2")}
                        </p>
                    </section>
                </div>

                {/* Columna derecha */}
                <div>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.intellectualProperty.title")}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.intellectualProperty.description1")}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.intellectualProperty.description2")}
                        </p>
                        <p className="text-gray-700">
                            {t("privacyPolicy.sections.intellectualProperty.description3")}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.liability.title")}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.liability.description1")}
                        </p>
                        <ul className="list-inside text-gray-700 mb-4">
                            {
                                ["1", "2", "3"].map((index) => (
                                    <li>{t(`privacyPolicy.sections.liability.point${index}`)}</li>
                                ))
                            }
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.modifications.title")}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t("privacyPolicy.sections.modifications.description1")}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("privacyPolicy.sections.jurisdiction.title")}
                        </h2>
                        <p className="text-gray-700">
                            {t("privacyPolicy.sections.jurisdiction.description1")}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
