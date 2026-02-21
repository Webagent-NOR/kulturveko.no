import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import noTranslation from './locales/no.json';
import nnTranslation from './locales/nn.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            no: { translation: noTranslation },
            nn: { translation: nnTranslation }
        },
        fallbackLng: 'nn', // Defaulting to Nynorsk for Os
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
