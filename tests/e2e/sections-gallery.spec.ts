import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts, scrollToSection } from '../fixtures/helpers';

test.describe('Sections - All Content Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await dismissToasts(page);
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });
  });

  test('About section renders with correct content', async ({ page }) => {
    await scrollToSection(page, '#about');
    const aboutSection = page.getByTestId('about-section');
    await expect(aboutSection).toBeVisible();
    await expect(page.getByTestId('about-title')).toBeVisible();
    await expect(page.getByTestId('about-title')).toContainText('Quiénes Somos');
  });

  test('Processes section renders', async ({ page }) => {
    await scrollToSection(page, '#processes');
    const processesSection = page.getByTestId('processes-section');
    await expect(processesSection).toBeVisible();
    await expect(page.getByTestId('processes-title')).toContainText('Procesos');
  });

  test('Values section renders', async ({ page }) => {
    await scrollToSection(page, '#values');
    const valuesSection = page.getByTestId('values-section');
    await expect(valuesSection).toBeVisible();
    await expect(page.getByTestId('values-title')).toContainText('Esencia');
  });

  test('Varieties section renders', async ({ page }) => {
    await scrollToSection(page, '#varieties');
    const varietiesSection = page.getByTestId('varieties-section');
    await expect(varietiesSection).toBeVisible();
    await expect(page.getByTestId('varieties-title')).toContainText('Variedades');
  });

  test('Services section renders', async ({ page }) => {
    await scrollToSection(page, '#services');
    const servicesSection = page.getByTestId('services-section');
    await expect(servicesSection).toBeVisible();
    await expect(page.getByTestId('services-title')).toContainText('Servicios');
  });

  test('Sustainability section renders', async ({ page }) => {
    await scrollToSection(page, '#sustainability');
    const sustainabilitySection = page.getByTestId('sustainability-section');
    await expect(sustainabilitySection).toBeVisible();
    await expect(page.getByTestId('sustainability-title')).toContainText('Sostenibilidad');
  });

  test('Gallery section renders with images', async ({ page }) => {
    await scrollToSection(page, '#gallery');
    const gallerySection = page.getByTestId('gallery-section');
    await expect(gallerySection).toBeVisible();
    await expect(page.getByTestId('gallery-title')).toContainText('Galería');
    // Wait for gallery images to load (fetched from API)
    await expect(page.getByTestId('gallery-image-1')).toBeVisible();
  });

  test('Contact section renders with form', async ({ page }) => {
    await scrollToSection(page, '#contact');
    await expect(page.getByTestId('contact-section')).toBeVisible();
    await expect(page.getByTestId('contact-title')).toContainText('Contacto');
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });
});

test.describe('Gallery - Lightbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await dismissToasts(page);
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });
    // Scroll to gallery
    await scrollToSection(page, '#gallery');
    await expect(page.getByTestId('gallery-image-1')).toBeVisible();
  });

  test('Gallery lightbox opens on image click', async ({ page }) => {
    await page.getByTestId('gallery-image-1').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).toBeVisible();
    await expect(page.getByTestId('lightbox-close')).toBeVisible();
    await expect(page.getByTestId('lightbox-prev')).toBeVisible();
    await expect(page.getByTestId('lightbox-next')).toBeVisible();
  });

  test('Gallery lightbox closes on close button click', async ({ page }) => {
    await page.getByTestId('gallery-image-1').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).toBeVisible();

    await page.getByTestId('lightbox-close').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).not.toBeVisible();
  });

  test('Gallery lightbox navigates to next image', async ({ page }) => {
    await page.getByTestId('gallery-image-1').click({ force: true });
    await expect(page.getByTestId('gallery-lightbox')).toBeVisible();

    await page.getByTestId('lightbox-next').click({ force: true });
    // Lightbox should still be open with next image
    await expect(page.getByTestId('gallery-lightbox')).toBeVisible();
  });

  test('Gallery shows bilingual titles in EN', async ({ page }) => {
    // Switch to English
    await page.evaluate(() => window.scrollTo(0, 0));
    const langToggle = page.getByTestId('language-toggle');
    await expect(langToggle).toBeInViewport();
    await langToggle.click({ force: true });

    // Scroll back to gallery
    await scrollToSection(page, '#gallery');
    await expect(page.getByTestId('gallery-title')).toContainText('Gallery');
  });
});
