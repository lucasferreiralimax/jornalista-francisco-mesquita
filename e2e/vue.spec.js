import { test, expect } from '@playwright/test';

test.use({ locale: 'pt-BR' });

test('redirects the root url to the browser locale and shows the school name', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/pt-BR\/?$/);
  await expect(page.locator('h1')).toHaveText('E.E.Jornalista Francisco Mesquita');
});

test('changes and remembers the language', async ({ page }) => {
  await page.goto('/pt-BR');
  await page.getByLabel('Idioma').selectOption('en-US');
  await expect(page).toHaveURL(/\/en-US\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.locator('h2')).toHaveText('Welcome');

  await page.goto('/');
  await expect(page).toHaveURL(/\/en-US\/?$/);
});

test.describe('english browser', () => {
  test.use({ locale: 'en-US' });

  test('detects the browser language', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en-US\/?$/);
    await expect(page.locator('h2')).toHaveText('Welcome');
  });
});
