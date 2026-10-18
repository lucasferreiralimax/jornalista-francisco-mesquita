import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

export const SUPPORT_LOCALES = ['pt-BR', 'en-US', 'ja-JP', 'ru-RU', 'es-ES', 'fr-FR', 'it-IT', 'tr-TR', 'zh-CN'];
export const DEFAULT_LOCALE = 'pt-BR';

const STORAGE_KEY = 'locale';

function getStoredLocale() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveLocale(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // storage unavailable (private mode, blocked cookies): ignore
  }
}

export function matchLocale(candidate) {
  if (!candidate) return null;
  const lower = candidate.toLowerCase();
  const exact = SUPPORT_LOCALES.find((locale) => locale.toLowerCase() === lower);
  if (exact) return exact;
  const language = lower.split('-')[0];
  return SUPPORT_LOCALES.find((locale) => locale.toLowerCase().split('-')[0] === language) || null;
}

// Saved choice > browser languages > default
export function getInitialLocale() {
  const stored = getStoredLocale();
  if (SUPPORT_LOCALES.includes(stored)) return stored;

  const browserLocales = typeof navigator !== 'undefined'
    ? navigator.languages || [navigator.language]
    : [];
  for (const candidate of browserLocales) {
    const match = matchLocale(candidate);
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}

export function getCurrentLocale(i18n) {
  return i18n.mode === 'legacy' ? i18n.global.locale : i18n.global.locale.value;
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  document.documentElement.lang = locale;
}

export async function loadLocaleMessages(i18n, locale) {
  const messages = await import(`./locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  return nextTick();
}

export function setupI18n(options = { locale: DEFAULT_LOCALE }) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}
