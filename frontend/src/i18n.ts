import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translate from "./lang/translate.json";

i18n.use(initReactI18next).init({
  resources: translate,
  lng: "tr",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
