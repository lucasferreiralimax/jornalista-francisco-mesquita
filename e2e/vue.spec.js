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
  await expect(page.getByRole('heading', { level: 2, name: 'Welcome' })).toBeVisible();

  await page.goto('/');
  await expect(page).toHaveURL(/\/en-US\/?$/);
});

test.describe('english browser', () => {
  test.use({ locale: 'en-US' });

  test('detects the browser language', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en-US\/?$/);
    await expect(page.getByRole('heading', { level: 2, name: 'Welcome' })).toBeVisible();
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 360, height: 740 } });

  test('has no horizontal scroll and lists the grade levels', async ({ page }) => {
    await page.goto('/pt-BR');
    await expect(page.locator('.levels__item')).toHaveCount(5);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test('shows school history, contact and facilities in every section', async ({ page }) => {
  await page.goto('/pt-BR');
  for (const name of ['Sobre a escola', 'Níveis de ensino', 'Onde estamos', 'Nossa história', 'Estrutura']) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
  await expect(page.locator('.timeline__item')).toHaveCount(8);
  await expect(page.getByRole('link', { name: '(11) 2943-0800' })).toHaveAttribute('href', 'tel:+551129430800');
});
