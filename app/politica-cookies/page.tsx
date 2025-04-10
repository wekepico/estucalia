'use client';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PoliticaCookies() {
    const { t } = useLanguage();

    return (
        <div className="mx-auto px-32 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center py-10 text-gray-900 mb-20">
                {t('cookiesPolicy.title')}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Columna izquierda */}
                <div>
                    <section className="mb-8">
                        <p className="text-gray-700 mb-4">
                            {t('cookiesPolicy.introduction')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('cookiesPolicy.purpose')}
                        </p>
                        <p className="text-gray-700">
                            {t('cookiesPolicy.dataCollected')}
                        </p>
                    </section>
                </div>

                {/* Columna derecha */}
                <div>
                    <section className="mb-8">
                        <p className="text-gray-700 mb-4">
                            {t('cookiesPolicy.noExtraction')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('cookiesPolicy.identifyingCookies')}
                        </p>
                        <p className="text-gray-700 text-xl font-[600] mb-4">
                            {t('cookiesPolicy.disableTitle')}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {t('cookiesPolicy.disableInstructions')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}