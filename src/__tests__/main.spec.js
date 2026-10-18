import { describe, it, expect, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'

describe('main', () => {
  it('mounts the app on #app in the browser language', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US'])
    localStorage.clear()
    document.body.innerHTML = '<div id="app"></div>'

    await import('../main.js')
    await vi.waitFor(() => expect(document.querySelector('h2')?.textContent).toContain('Welcome'))
    await flushPromises()

    expect(window.location.pathname).toMatch(/^\/en-US\/?$/)
    expect(document.querySelector('h1').textContent).toContain('Jornalista Francisco Mesquita')
    expect(document.querySelector('footer')).not.toBeNull()
    expect(document.documentElement.lang).toBe('en-US')
  })
})
