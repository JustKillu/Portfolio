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
      escapeValue: false, // React ya se encarga de prevenir XSS
    },
    backend: {
      // Ruta donde i18next buscará tus archivos de traducción
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Orden en que intentará detectar el idioma (cookie, localStorage, etc)
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'path'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;