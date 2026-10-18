import { readFileSync } from 'node:fs';

export const LOCALES = ['pt-BR', 'en-US', 'ja-JP', 'ru-RU', 'es-ES', 'fr-FR', 'it-IT', 'tr-TR', 'zh-CN'];

export function messages(locale) {
  return JSON.parse(readFileSync(new URL(`../src/locales/${locale}.json`, import.meta.url), 'utf8'));
}

export const localeUrl = (locale) => new RegExp(`/${locale}/?$`);
