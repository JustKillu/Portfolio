import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) 
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', 
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/Portfolio/locales/{{lng}}/translation.json',
    },
    detection: { 
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'path'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;