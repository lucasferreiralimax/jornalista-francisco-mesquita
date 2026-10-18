import { describe, it, expect } from 'vitest'

import FooterApp from '../FooterApp.vue'
import { mountWithApp } from '../../__tests__/helpers'

describe('FooterApp', () => {
  it('shows the school name and a safe external link to the repository', async () => {
    const { wrapper } = await mountWithApp(FooterApp)
    expect(wrapper.text()).toContain('E.E.Jornalista Francisco Mesquita')
    const link = wrapper.find('a')
    expect(link.text()).toBe('repositório público')
    expect(link.attributes('href')).toBe('https://github.com/lucasferreiralimax/jornalista-francisco-mesquita')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('is translated', async () => {
    const { wrapper } = await mountWithApp(FooterApp, { path: '/en-US/' })
    expect(wrapper.find('a').text()).toBe('public repository')
  })
})
