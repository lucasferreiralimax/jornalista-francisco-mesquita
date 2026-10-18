import { describe, it, expect } from 'vitest'

import HeaderApp from '../HeaderApp.vue'
import { mountWithApp } from '../../__tests__/helpers'

describe('HeaderApp', () => {
  it('shows the logo, school name as the page heading and the language select', async () => {
    const { wrapper } = await mountWithApp(HeaderApp)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('E.E.Jornalista Francisco Mesquita')
    expect(wrapper.find('img').attributes('alt')).toBe('E.E.Jornalista Francisco Mesquita - Brasil')
    expect(wrapper.find('select').exists()).toBe(true)
  })
})
