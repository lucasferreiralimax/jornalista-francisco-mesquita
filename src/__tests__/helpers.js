import { mount, flushPromises } from '@vue/test-utils'

import setupRouter from '../router'
import { setupI18n } from '../i18n'
import ptBR from '../locales/pt-BR.json'

export function createApp(locale = 'pt-BR') {
  const i18n = setupI18n({ legacy: false, locale, fallbackLocale: 'pt-BR', messages: { 'pt-BR': ptBR } })
  const router = setupRouter(i18n)
  return { i18n, router }
}

// Mounts a component with real i18n + router, already navigated to `path`
export async function mountWithApp(component, { path = '/pt-BR/', locale = 'pt-BR' } = {}) {
  const { i18n, router } = createApp(locale)
  await router.push(path)
  await router.isReady()
  const wrapper = mount(component, { global: { plugins: [router, i18n] } })
  await flushPromises()
  return { wrapper, router, i18n }
}
