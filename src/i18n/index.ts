import { Locales } from "./locales";
import { createI18n } from "vue-i18n";

import sv from "./sv.json";
import en from "./en.json";
import de from "./de.json";

const messagesLang = {
  [Locales.SV]: sv,
  [Locales.EN]: en,
  [Locales.DE]: de
};


export default createI18n({
  legacy: false,
  locale: Locales.SV,
  fallbackLocale: Locales.EN,
  globalInjection: true,
  messages: messagesLang
});