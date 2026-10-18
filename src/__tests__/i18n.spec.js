import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { getInitialLocale, matchLocale, saveLocale, DEFAULT_LOCALE } from '../i18n'

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
