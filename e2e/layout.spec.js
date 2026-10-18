import { test, expect } from '@playwright/test';

const VIEWPORTS = {
  phone: { width: 360, height: 740 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1440, height: 900 },
};

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`${name} (${viewport.width}px)`, () => {
    test.use({ viewport });

    test('has no horizontal scroll', async ({ page }) => {
      await page.goto('/pt-BR/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test('keeps the header on top while scrolling', async ({ page }) => {
      await page.goto('/pt-BR/');
      await page.mouse.wheel(0, 1500);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
      const box = await page.locator('header').boundingBox();
      expect(box.y).toBe(0);
      await expect(page.getByLabel('Idioma')).toBeInViewport();
    });
  });
}

test.describe('desktop grid', () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test('places "about" and "levels" side by side', async ({ page }) => {
    await page.goto('/pt-BR/');
    const about = await page.locator('.about').boundingBox();
    const levels = await page.locator('.levels').boundingBox();
    expect(Math.abs(about.y - levels.y)).toBeLessThan(2);
    expect(levels.x).toBeGreaterThan(about.x + about.width);
  });
});

test.describe('phone grid', () => {
  test.use({ viewport: VIEWPORTS.phone });

  test('stacks the sections in reading order', async ({ page }) => {
    await page.goto('/pt-BR/');
    const order = ['.intro', '.about', '.levels', '.location', '.history', '.structure', '.social'];
    const tops = [];
    for (const selector of order) tops.push((await page.locator(selector).boundingBox()).y);
    expect(tops).toEqual([...tops].sort((a, b) => a - b));
  });
});
