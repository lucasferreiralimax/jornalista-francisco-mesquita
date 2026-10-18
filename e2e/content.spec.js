import { test, expect } from '@playwright/test';
import { messages } from './helpers.js';

const pt = messages('pt-BR');

test.beforeEach(async ({ page }) => {
  await page.goto('/pt-BR/');
});

test('lists every grade level, history milestone and facility', async ({ page }) => {
  const levels = page.locator('.levels__item');
  await expect(levels).toHaveCount(pt.levels.length);
  for (const [i, level] of pt.levels.entries()) {
    await expect(levels.nth(i)).toContainText(level.name);
    await expect(levels.nth(i)).toContainText(level.grades);
  }

  const years = page.locator('.timeline__year');
  await expect(years).toHaveText(pt.history.timeline.map((item) => item.year));

  await expect(page.locator('.facilities__item')).toHaveText(pt.structure.items);
});

test('shows the school facts', async ({ page }) => {
  const about = page.getByRole('region', { name: pt.about.title });
  await expect(about).toContainText('35036766');
  await expect(about).toContainText('Francisco Mesquita (1893');
});

test('contact links call, email and open the map', async ({ page }) => {
  const location = page.getByRole('region', { name: pt.locationTitle });
  await expect(location.locator('address')).toHaveText(/Rua Wenceslau Guimarães, 581.*03823-000/);
  await expect(location.getByRole('link', { name: '(11) 2943-0800' })).toHaveAttribute('href', 'tel:+551129430800');
  await expect(location.getByRole('link', { name: '(11) 2546-7448' })).toHaveAttribute('href', 'tel:+551125467448');
  await expect(location.getByRole('link', { name: 'e036766a@educacao.sp.gov.br' })).toHaveAttribute('href', 'mailto:e036766a@educacao.sp.gov.br');

  const maps = location.getByRole('link', { name: pt.openMap });
  await expect(maps).toHaveAttribute('href', /google\.com\/maps/);
  await expect(maps).toHaveAttribute('target', '_blank');
  await expect(maps).toHaveAttribute('rel', 'noopener noreferrer');
});

test('embeds the map and the Facebook page with titles', async ({ page }) => {
  await expect(page.locator(`iframe[title="${pt.mapTitle}"]`)).toHaveAttribute('src', /google\.com\/maps\/embed/);
  await expect(page.locator(`iframe[title="${pt.facebookTitle}"]`)).toHaveAttribute('src', /facebook\.com\/plugins\/page/);
});

test('footer links to the public repository', async ({ page }) => {
  const link = page.getByRole('contentinfo').getByRole('link', { name: pt.repo });
  await expect(link).toHaveAttribute('href', 'https://github.com/lucasferreiralimax/jornalista-francisco-mesquita');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('has SEO metadata and valid School structured data', async ({ page }) => {
  await expect(page).toHaveTitle('E.E.Jornalista Francisco Mesquita');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Parque Císper/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://jornalista-francisco-mesquita.web.app/');

  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(data['@type']).toBe('School');
  expect(data.address.postalCode).toBe('03823-000');
  expect(data.email).toBe('e036766a@educacao.sp.gov.br');
});
