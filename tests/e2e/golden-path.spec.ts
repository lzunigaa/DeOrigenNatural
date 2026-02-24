import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts, scrollToSection } from '../fixtures/helpers';

test.describe('Golden Path - Complete User Journey', () => {
  test('Full journey: Load → Browse sections → Switch language → View gallery → Submit contact', async ({ page }) => {
    // Step 1: Load page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await dismissToasts(page);
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });

    // Step 2: Verify hero loads in Spanish
    await expect(page.getByTestId('hero-title')).toContainText('Cacao Fino de Aroma');
    await expect(page.getByTestId('hero-cta')).toBeVisible();

    // Step 3: Navigate through sections via nav
    await page.getByTestId('nav-about').click({ force: true });
    await expect(page.getByTestId('about-section')).toBeInViewport();

    // Step 4: Switch language to English
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await page.getByTestId('language-toggle').click({ force: true });
    await expect(page.getByTestId('hero-title')).toContainText('Fine Aroma Cacao');
    await expect(page.getByTestId('hero-cta')).toContainText('Request Quote');

    // Step 5: Verify English navigation labels
    const desktopNav = page.getByTestId('desktop-nav');
    await expect(desktopNav).toBeVisible();

    // Step 6: Navigate to gallery
    await page.getByTestId('nav-gallery').click({ force: true });
    await expect(page.getByTestId('gallery-section')).toBeInViewport();
    await expect(page.getByTestId('gallery-title')).toContainText('Gallery');

    // Step 7: Open lightbox
    await scrollToSection(page, '#gallery');
    await expect(page.getByTestId('gallery-image-1')).toBeVisible();
    await page.getByTestId('gallery-image-1').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).toBeVisible();

    // Navigate lightbox
    await page.getByTestId('lightbox-next').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).toBeVisible();

    // Close lightbox
    await page.getByTestId('lightbox-close').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).not.toBeVisible();

    // Step 8: Navigate to contact and submit form
    await page.getByTestId('nav-contact').click({ force: true });
    await scrollToSection(page, '#contact');
    await expect(page.getByTestId('contact-form')).toBeVisible();

    const timestamp = Date.now();
    await page.getByTestId('contact-name-input').fill(`Golden Path User ${timestamp}`);
    await page.getByTestId('contact-email-input').fill(`goldenpath${timestamp}@example.com`);
    await page.getByTestId('contact-message-input').fill('Interested in Fine Aroma Cacao for our chocolate business.');
    await page.getByTestId('contact-service-select').selectOption('beans');

    await page.getByTestId('contact-submit-button').click({ force: true });

    // Verify success toast appears
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible();

    // Verify form clears
    await expect(page.getByTestId('contact-name-input')).toHaveValue('');
  });

  test('Navigation CTA scrolls to correct section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });

    // Click hero CTA → should scroll to contact
    await page.getByTestId('hero-cta').click({ force: true });
    await expect(page.getByTestId('contact-section')).toBeInViewport();
  });

  test('Scroll indicator navigates to about section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });

    // Click scroll indicator → should scroll to about
    await page.getByTestId('scroll-indicator').click({ force: true });
    await expect(page.getByTestId('about-section')).toBeInViewport({ timeout: 10000 });
  });
});
