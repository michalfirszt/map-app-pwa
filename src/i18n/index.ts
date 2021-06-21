import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.REACT_APP_DEBUG_MODE === 'true',
  resources: { en },
});

export default i18n;
