import { test, expect } from '@playwright/test';
import { LOCALES, messages, localeUrl } from './helpers.js';

test.use({ locale: 'pt-BR' });

for (const locale of LOCALES) {
  test(`renders the page in ${locale}`, async ({ page }) => {
    const m = messages(locale);
    await page.goto(`/${locale}/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(m.name);
    await expect(page.getByRole('heading', { level: 2, name: m.welcome })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: m.history.title })).toBeVisible();
    await expect(page.getByLabel(m.language)).toHaveValue(locale);
  });
}

test('redirects unsupported locales and unknown paths', async ({ page }) => {
  await page.goto('/de-DE/');
  await expect(page).toHaveURL(localeUrl('pt-BR'));
  await page.goto('/pagina/antiga');
  await expect(page).toHaveURL(localeUrl('pt-BR'));
});

test('keeps the chosen language after a reload', async ({ page }) => {
  await page.goto('/pt-BR/');
  await page.getByLabel('Idioma').selectOption('fr-FR');
  await expect(page).toHaveURL(localeUrl('fr-FR'));
  await page.goto('/');
  await expect(page).toHaveURL(localeUrl('fr-FR'));
  await page.reload();
  await expect(page.getByRole('heading', { level: 2, name: 'Bienvenue' })).toBeVisible();
});

test('browser back button restores the previous language', async ({ page }) => {
  await page.goto('/pt-BR/');
  await page.getByLabel('Idioma').selectOption('es-ES');
  await expect(page).toHaveURL(localeUrl('es-ES'));
  await page.goBack();
  await expect(page).toHaveURL(localeUrl('pt-BR'));
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByLabel('Idioma')).toHaveValue('pt-BR');
});

test.describe('browser in Japanese', () => {
  test.use({ locale: 'ja-JP' });

  test('opens in Japanese by default', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(localeUrl('ja-JP'));
  });
});

test.describe('browser in an unsupported language', () => {
  test.use({ locale: 'de-DE' });

  test('falls back to Portuguese', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(localeUrl('pt-BR'));
  });
});
