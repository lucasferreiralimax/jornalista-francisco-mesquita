import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Third-party embeds (Google Maps, Facebook) are outside our control
const scan = (page) => new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  .exclude('iframe')
  .analyze();

for (const viewport of [{ width: 1440, height: 900 }, { width: 360, height: 740 }]) {
  test(`has no WCAG A/AA violations at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/pt-BR/');
    await expect(page.locator('.levels__item').first()).toBeVisible();
    const { violations } = await scan(page);
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('has no WCAG violations in a non-Latin language', async ({ page }) => {
  await page.goto('/zh-CN/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  const { violations } = await scan(page);
  expect(violations.map((v) => v.id)).toEqual([]);
});

test('uses one h1 and sections labelled by their headings', async ({ page }) => {
  await page.goto('/pt-BR/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const name of ['Sobre a escola', 'Níveis de ensino', 'Onde estamos', 'Nossa história', 'Estrutura', 'Acompanhe no Facebook']) {
    await expect(page.getByRole('region', { name })).toBeVisible();
  }
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
});

test('language select works with the keyboard and shows focus', async ({ page }) => {
  await page.goto('/pt-BR/');
  await page.keyboard.press('Tab');
  const select = page.getByLabel('Idioma');
  await expect(select).toBeFocused();
  const outline = await select.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
  await select.selectOption('it-IT');
  await expect(page.locator('html')).toHaveAttribute('lang', 'it-IT');
});

test('language options are announced in their own language', async ({ page }) => {
  await page.goto('/pt-BR/');
  await expect(page.locator('option[value="ja-JP"]')).toHaveAttribute('lang', 'ja-JP');
  await expect(page.locator('option[value="ja-JP"]')).toHaveText('日本語 (日本)');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('stops the logo animation', async ({ page }) => {
    await page.goto('/pt-BR/');
    const animation = await page.locator('.brand__logo').evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe('none');
  });
});

test.describe('increased contrast', () => {
  test.use({ contrast: 'more' });

  test('uses solid surfaces instead of glass', async ({ page }) => {
    await page.goto('/pt-BR/');
    const card = await page.locator('.card').first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(card).toBe('rgb(255, 255, 255)');
  });
});
