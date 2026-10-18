import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import {
  getInitialLocale, matchLocale, saveLocale, DEFAULT_LOCALE,
  setupI18n, setI18nLanguage, getCurrentLocale, loadLocaleMessages,
} from '../i18n'

function mockLanguages(languages) {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(languages)
}

describe('matchLocale', () => {
  it('matches exact locales case-insensitively', () => {
    expect(matchLocale('en-us')).toBe('en-US')
  })

  it('falls back to the language prefix', () => {
    expect(matchLocale('pt-PT')).toBe('pt-BR')
    expect(matchLocale('fr')).toBe('fr-FR')
  })

  it('returns null for unsupported languages', () => {
    expect(matchLocale('de-DE')).toBeNull()
    expect(matchLocale(undefined)).toBeNull()
  })
})

describe('getInitialLocale', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('prefers the saved locale', () => {
    saveLocale('ja-JP')
    mockLanguages(['en-US'])
    expect(getInitialLocale()).toBe('ja-JP')
  })

  it('ignores an invalid saved locale', () => {
    localStorage.setItem('locale', 'xx-XX')
    mockLanguages(['es-MX'])
    expect(getInitialLocale()).toBe('es-ES')
  })

  it('uses the first supported browser language', () => {
    mockLanguages(['de-DE', 'it-IT', 'en-US'])
    expect(getInitialLocale()).toBe('it-IT')
  })

  it('falls back to the default locale', () => {
    mockLanguages(['de-DE'])
    expect(getInitialLocale()).toBe(DEFAULT_LOCALE)
  })
})

describe('saveLocale', () => {
  afterEach(() => vi.restoreAllMocks())

  it('stores the locale', () => {
    saveLocale('fr-FR')
    expect(localStorage.getItem('locale')).toBe('fr-FR')
  })

  it('does not throw when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    expect(() => saveLocale('fr-FR')).not.toThrow()
  })
})

describe('getInitialLocale without storage', () => {
  afterEach(() => vi.restoreAllMocks())

  it('falls back to the browser language when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    mockLanguages(['zh-CN'])
    expect(getInitialLocale()).toBe('zh-CN')
  })

  it('uses navigator.language when navigator.languages is missing', () => {
    localStorage.clear()
    mockLanguages(undefined)
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('tr-TR')
    expect(getInitialLocale()).toBe('tr-TR')
  })
})

describe('i18n instance helpers', () => {
  it('setupI18n defaults to pt-BR and sets <html lang>', () => {
    const i18n = setupI18n()
    expect(getCurrentLocale(i18n)).toBe('pt-BR')
    expect(document.documentElement.lang).toBe('pt-BR')
  })

  it('setI18nLanguage works in composition mode', () => {
    const i18n = setupI18n({ legacy: false, locale: 'pt-BR' })
    setI18nLanguage(i18n, 'ja-JP')
    expect(i18n.global.locale.value).toBe('ja-JP')
    expect(getCurrentLocale(i18n)).toBe('ja-JP')
    expect(document.documentElement.lang).toBe('ja-JP')
  })

  it('setI18nLanguage works in legacy mode', () => {
    const i18n = setupI18n({ legacy: true, locale: 'pt-BR' })
    setI18nLanguage(i18n, 'it-IT')
    expect(i18n.global.locale).toBe('it-IT')
    expect(getCurrentLocale(i18n)).toBe('it-IT')
  })

  it('loadLocaleMessages lazy-loads a locale file', async () => {
    const i18n = setupI18n({ legacy: false, locale: 'pt-BR' })
    expect(i18n.global.availableLocales).not.toContain('ru-RU')
    await loadLocaleMessages(i18n, 'ru-RU')
    expect(i18n.global.availableLocales).toContain('ru-RU')
    expect(i18n.global.getLocaleMessage('ru-RU').welcome).toBe('Добро пожаловать')
  })
})
