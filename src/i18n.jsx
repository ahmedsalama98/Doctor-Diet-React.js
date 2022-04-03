import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationAr from './lang/ar.json'
import TranslationEn from './lang/en.json'
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation:TranslationEn
  },
  ar: {
    translation:TranslationAr
  }
};
i18n
   .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
      },
      react: {
        useSuspense:false
    }
  });

  export default i18n;