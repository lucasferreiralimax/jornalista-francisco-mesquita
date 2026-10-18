import { describe, it, expect } from 'vitest'

import HomeView from '../HomeView.vue'
import { mountWithApp } from '../../__tests__/helpers'
import ptBR from '../../locales/pt-BR.json'

describe('HomeView', () => {
  it('renders every section with a labelled heading', async () => {
    const { wrapper } = await mountWithApp(HomeView)
    const sections = wrapper.findAll('section[aria-labelledby]')
    expect(sections).toHaveLength(6)
    for (const section of sections) {
      const heading = wrapper.find(`#${section.attributes('aria-labelledby')}`)
      expect(heading.exists()).toBe(true)
      expect(heading.text()).not.toBe('')
    }
  })

  it('lists grade levels, history and facilities from the locale file', async () => {
    const { wrapper } = await mountWithApp(HomeView)
    const levels = wrapper.findAll('.levels__item')
    expect(levels).toHaveLength(ptBR.levels.length)
    expect(levels[0].text()).toContain(ptBR.levels[0].name)
    expect(levels[0].text()).toContain(ptBR.levels[0].grades)

    const timeline = wrapper.findAll('.timeline__item')
    expect(timeline).toHaveLength(ptBR.history.timeline.length)
    expect(timeline[0].find('.timeline__year').text()).toBe('1893')

    expect(wrapper.findAll('.facilities__item').map((li) => li.text())).toEqual(ptBR.structure.items)
  })

  it('shows the school facts', async () => {
    const { wrapper } = await mountWithApp(HomeView)
    const facts = Object.fromEntries(wrapper.findAll('.facts__item').map((item) => [item.find('dt').text(), item.find('dd').text()]))
    expect(facts['Código INEP']).toBe('35036766')
    expect(facts.Patrono).toContain('Francisco Mesquita')
    expect(facts['Períodos']).toBe('Diurno e noturno')
  })

  it('has working contact links', async () => {
    const { wrapper } = await mountWithApp(HomeView)
    const hrefs = wrapper.findAll('.contact__list a').map((a) => a.attributes('href'))
    expect(hrefs).toEqual([
      'tel:+551129430800',
      'tel:+551125467448',
      'mailto:e036766a@educacao.sp.gov.br',
    ])
    expect(wrapper.find('address').text()).toContain('Rua Wenceslau Guimarães, 581')

    const maps = wrapper.find('a.button')
    expect(maps.attributes('href')).toContain('google.com/maps')
    expect(maps.attributes('target')).toBe('_blank')
    expect(maps.attributes('rel')).toBe('noopener noreferrer')
  })

  it('gives the embeds accessible titles and lazy loading', async () => {
    const { wrapper } = await mountWithApp(HomeView)
    const iframes = wrapper.findAll('iframe')
    expect(iframes.map((f) => f.attributes('title'))).toEqual([ptBR.mapTitle, ptBR.facebookTitle])
    for (const iframe of iframes) expect(iframe.attributes('loading')).toBe('lazy')
  })

  it('renders in another language', async () => {
    const { wrapper } = await mountWithApp(HomeView, { path: '/ja-JP/' })
    expect(wrapper.find('.intro__title').text()).toBe('ようこそ')
    expect(wrapper.find('#history-title').text()).toBe('学校の歴史')
  })
})
