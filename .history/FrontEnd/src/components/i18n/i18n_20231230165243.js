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
  en: { books: SEARCH_EN, home: HOME_EN },
  vi: { books: SEARCH_VI, home: HOME_VI },
};

// export const defaultNS = 'books';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    ns: ['books', 'home'],
    defaultNS: ['books', 'home'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
