import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from '../locales/en/home.json';
import HOME_VI from '../locales/vi/home.json';
import SEARCH_VI from '../locales/vi/books.json';
import SEARCH_EN from '../locales/en/books.json';
import INFO_EN from '../locales/en/info.json';
import INFO_VI from '../locales/vi/info.json';
import CART_EN from '../locales/en/cart.json';
import CART_VI from '../locales/vi/cart.json';
import CHECKOUT_EN from '../locales/en/checkout.json';
import CHECKOUT_VI from '../locales/vi/checkout.json';

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt',
};
const resources = {
  en: {
    home: HOME_EN,
    books: SEARCH_EN,
    info: INFO_EN,
    cart: CART_EN,
    checkout: CHECKOUT_EN,
  },
  vi: {
    home: HOME_VI,
    books: SEARCH_VI,
    info: INFO_VI,
    cart: CART_VI,
    checkout: CHECKOUT_VI,
  },
};

export const defaultNS = 'home';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    ns: ['home', 'books', 'info', 'cart', 'checkout'],
    defaultNS,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
