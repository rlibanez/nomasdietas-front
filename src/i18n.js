import { createI18n } from 'vue-i18n';
import en from './locales/en';
import es from './locales/es';

// Definición de traducciones de las cadenas de texto
const messages = {
    en,
    es,
};

// Crea la instancia de i18n
const i18n = createI18n({
    locale: 'es', // Idioma predeterminado
    fallbackLocale: 'en', // Idioma en fallback
    messages,
});

export default i18n;