'use client';
import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-32 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center py-10 text-gray-900 mb-12">
                {t('privacyPolicy1.title')}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Columna izquierda */}
                <div className="space-y-12">
                    {/* Introducción */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.introduction.title')}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.introduction.content1')}
                        </p>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.introduction.content2')}
                        </p>
                    </section>

                    {/* Responsable */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.responsible.title')}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.responsible.content1')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.responsible.content2')}
                        </p>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.responsible.content3')}
                        </p>
                    </section>

                    {/* Propósito */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.purpose.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.purpose.content1')}
                        </p>
                    </section>

                    {/* Base jurídica */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.legalBasis.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.legalBasis.content1')}
                        </p>
                    </section>
                </div>

                {/* Columna derecha */}
                <div className="space-y-12">
                    {/* Compartición de datos */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.dataSharing.title')}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.dataSharing.content1')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.dataSharing.content2')}
                        </p>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.dataSharing.content3')}
                        </p>
                    </section>

                    {/* Transferencias internacionales */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.internationalTransfers.title')}
                        </h2>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.internationalTransfers.content1')}
                        </p>
                    </section>

                    {/* Retención de datos */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.dataRetention.title')}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.dataRetention.content1')}
                        </p>
                        <p className="text-gray-700">
                            {t('privacyPolicy1.sections.dataRetention.content2')}
                        </p>
                    </section>

                    {/* Ejercicio de derechos */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t('privacyPolicy1.sections.rightsExercise.title')}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.rightsExercise.content1')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.rightsExercise.content2')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('privacyPolicy1.sections.rightsExercise.content3')}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>{t('privacyPolicy1.sections.rightsExercise.point1')}</li>
                            <li>{t('privacyPolicy1.sections.rightsExercise.point2')}</li>
                            <li>{t('privacyPolicy1.sections.rightsExercise.point3')}</li>
                            <li>{t('privacyPolicy1.sections.rightsExercise.point4')}</li>
                        </ul>
                    </section>
                </div>
            </div>

            {/* Secciones de ancho completo */}
            <div className="mt-12 space-y-12">
                {/* Medidas de seguridad */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {t('privacyPolicy1.sections.securityMeasures.title')}
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {t('privacyPolicy1.sections.securityMeasures.content1')}
                    </p>
                    <p className="text-gray-700 mb-4">
                        {t('privacyPolicy1.sections.securityMeasures.content2')}
                    </p>
                    <p className="text-gray-700">
                        {t('privacyPolicy1.sections.securityMeasures.content3')}
                    </p>
                </section>

                {/* Actualizaciones de política */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {t('privacyPolicy1.sections.policyUpdates.title')}
                    </h2>
                    <p className="text-gray-700 mb-4">
                        {t('privacyPolicy1.sections.policyUpdates.content1')}
                    </p>
                    <p className="text-gray-700">
                        {t('privacyPolicy1.sections.policyUpdates.content2')}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;