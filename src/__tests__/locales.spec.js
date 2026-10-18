import { describe, it, expect } from 'vitest'

import { SUPPORT_LOCALES, DEFAULT_LOCALE } from '../i18n'

const files = import.meta.glob('../locales/*.json', { eager: true, import: 'default' })
const messages = Object.fromEntries(
  Object.entries(files).map(([path, json]) => [path.match(/([\w-]+)\.json$/)[1], json]),
)

// Shape of a message tree: keys for objects, length + item shape for arrays
function shape(value) {
  if (Array.isArray(value)) return { length: value.length, items: value.map(shape) }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]))
  }
  return typeof value
}

function strings(value, path = '') {
  if (typeof value === 'string') return [[path, value]]
  return Object.entries(value).flatMap(([key, child]) => strings(child, `${path}.${key}`))
}

describe('locale files', () => {
  it('has one file for every supported locale and nothing else', () => {
    expect(Object.keys(messages).sort()).toEqual([...SUPPORT_LOCALES].sort())
  })

  it.each(SUPPORT_LOCALES.filter((l) => l !== DEFAULT_LOCALE))('%s has the same keys and list sizes as pt-BR', (locale) => {
    expect(shape(messages[locale])).toEqual(shape(messages[DEFAULT_LOCALE]))
  })

  it.each(SUPPORT_LOCALES)('%s has no empty texts or vue-i18n syntax characters', (locale) => {
    for (const [path, text] of strings(messages[locale])) {
      expect(text.trim(), path).not.toBe('')
      // `footer` intentionally uses linked message + list interpolation
      if (path !== '.footer') expect(text, `${locale}${path}`).not.toMatch(/[{}@$|]/)
    }
  })

  it('keeps the same timeline years in every language', () => {
    const years = (locale) => messages[locale].history.timeline.map((item) => item.year)
    for (const locale of SUPPORT_LOCALES) expect(years(locale)).toEqual(years(DEFAULT_LOCALE))
  })
})
