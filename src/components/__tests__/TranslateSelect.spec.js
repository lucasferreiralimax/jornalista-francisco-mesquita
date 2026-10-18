import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

import TranslateSelect from '../TranslateSelect.vue'
import setupRouter from '../../router'
import { setupI18n, SUPPORT_LOCALES } from '../../i18n'
import ptBR from '../../locales/pt-BR.json'

async function mountSelect() {
  const i18n = setupI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR } })
  const router = setupRouter(i18n)
  router.push('/pt-BR')
  await router.isReady()
  const wrapper = mount(TranslateSelect, { global: { plugins: [router, i18n] } })
  return { wrapper, router, i18n }
}

describe('TranslateSelect', () => {
  it('lists every supported locale with an accessible label', async () => {
    const { wrapper } = await mountSelect()
    const options = wrapper.findAll('option')
    expect(options.map((o) => o.attributes('value'))).toEqual(SUPPORT_LOCALES)
    expect(options[0].text()).toMatch(/portugu/i)
    expect(wrapper.find('label').text()).toContain('Idioma')
  })

  it('navigates to the chosen locale and updates <html lang>', async () => {
    const { wrapper, router, i18n } = await mountSelect()
    await wrapper.find('select').setValue('en-US')
    await vi.waitFor(() => expect(router.currentRoute.value.params.locale).toBe('en-US'))
    await flushPromises()
    expect(i18n.global.locale.value).toBe('en-US')
    expect(document.documentElement.lang).toBe('en-US')
  })
})
