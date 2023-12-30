import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from '../locales/en/home.json';
import HOME_VI from '../locales/vi/home.json';
import SEARCH_VI from '../locales/vi/books.json';
import SEARCH_EN from '../locales/en/books.json';
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt',
};
const resources = {
  en: { home: HOME_EN, books: SEARCH_EN },
  vi: { home: HOME_VI, books: SEARCH_VI },
};

export const defaultNS = 'home';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    ns: ['home'],
    defaultNS,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
