import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts } from '../fixtures/helpers';

const BASE_URL = 'https://pdf-website-13.preview.emergentagent.com';

test.describe('Core Flows - Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    // Wait for framer-motion header animation to complete (header starts at y:-100)
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await dismissToasts(page);
    // Remove emergent badge
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });
  });

  test('App container and header render correctly', async ({ page }) => {
    await expect(page.getByTestId('app-container')).toBeVisible();
    await expect(page.getByTestId('main-header')).toBeVisible();
    await expect(page.getByTestId('logo-link')).toBeVisible();
    await expect(page.getByTestId('logo-link')).toContainText('CAOJAMBO');
  });

  test('Hero section renders with correct Spanish content', async ({ page }) => {
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toContainText('Cacao Fino de Aroma');
    await expect(page.getByTestId('hero-subtitle')).toContainText('Amazonía Peruana');
    await expect(page.getByTestId('hero-cta')).toBeVisible();
    await expect(page.getByTestId('hero-cta')).toContainText('Solicitar Presupuesto');
  });

  test('Language toggle switches ES to EN', async ({ page }) => {
    const langToggle = page.getByTestId('language-toggle');
    await expect(langToggle).toBeVisible();
    // Should show ES initially
    await expect(langToggle).toContainText('es', { ignoreCase: true });

    // Click to switch to EN
    await langToggle.click({ force: true });

    // Hero content should be in English now
    await expect(page.getByTestId('hero-title')).toContainText('Fine Aroma Cacao');
    await expect(page.getByTestId('hero-subtitle')).toContainText('Peruvian Amazon');
    await expect(page.getByTestId('hero-cta')).toContainText('Request Quote');
  });

  test('Language toggle switches EN back to ES', async ({ page }) => {
    const langToggle = page.getByTestId('language-toggle');
    // Switch to EN
    await langToggle.click({ force: true });
    await expect(page.getByTestId('hero-title')).toContainText('Fine Aroma Cacao');

    // Switch back to ES
    await langToggle.click({ force: true });
    await expect(page.getByTestId('hero-title')).toContainText('Cacao Fino de Aroma');
  });

  test('Desktop navigation items render', async ({ page }) => {
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible();
    await expect(page.getByTestId('nav-about')).toBeVisible();
    await expect(page.getByTestId('nav-contact')).toBeVisible();
    await expect(page.getByTestId('nav-gallery')).toBeVisible();
  });

  test('Mobile menu toggle opens and closes menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.scrollTo(0, 0));

    const mobileToggle = page.getByTestId('mobile-menu-toggle');
    await expect(mobileToggle).toBeVisible();

    // Mobile menu should not be visible initially
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();

    // Open menu
    await mobileToggle.click({ force: true });
    await expect(page.getByTestId('mobile-menu')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-about')).toBeVisible();
    await expect(page.getByTestId('mobile-nav-contact')).toBeVisible();

    // Close menu
    await mobileToggle.click({ force: true });
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });

  test('Scroll indicator button is visible on hero', async ({ page }) => {
    await expect(page.getByTestId('scroll-indicator')).toBeVisible();
  });
});
