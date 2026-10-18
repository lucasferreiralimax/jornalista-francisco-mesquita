import { describe, it, expect, beforeEach } from 'vitest'

import { createApp } from '../../__tests__/helpers'

describe('router', () => {
  beforeEach(() => localStorage.clear())

  it('redirects the root to the current locale', async () => {
    const { router } = createApp('pt-BR')
    await router.push('/')
    expect(router.currentRoute.value.path).toMatch(/^\/pt-BR\/?$/)
  })

  it('redirects unknown paths to the current locale', async () => {
    const { router } = createApp('es-ES')
    await router.push('/some/old/page')
    expect(router.currentRoute.value.params.locale).toBe('es-ES')
  })

  it('redirects unsupported locales to the current locale', async () => {
    const { router } = createApp('pt-BR')
    await router.push('/de-DE/')
    expect(router.currentRoute.value.path).toMatch(/^\/pt-BR\/?$/)
  })

  it('loads messages, switches language and remembers it', async () => {
    const { router, i18n } = createApp('pt-BR')
    await router.push('/en-US/')
    expect(i18n.global.locale.value).toBe('en-US')
    expect(i18n.global.t('welcome')).toBe('Welcome')
    expect(document.documentElement.lang).toBe('en-US')
    expect(localStorage.getItem('locale')).toBe('en-US')
  })

  it('redirects to the language chosen earlier, not the initial one', async () => {
    const { router } = createApp('pt-BR')
    await router.push('/fr-FR/')
    await router.push('/')
    expect(router.currentRoute.value.path).toMatch(/^\/fr-FR\/?$/)
  })

  it('does not reload messages that are already available', async () => {
    const { router, i18n } = createApp('pt-BR')
    await router.push('/it-IT/')
    i18n.global.mergeLocaleMessage('it-IT', { welcome: 'Ciao' })
    await router.push('/pt-BR/')
    await router.push('/it-IT/')
    expect(i18n.global.t('welcome')).toBe('Ciao')
  })
})
