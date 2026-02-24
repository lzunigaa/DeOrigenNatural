import { test, expect } from '@playwright/test';
import { waitForAppReady, dismissToasts, scrollToSection } from '../fixtures/helpers';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForAppReady(page);
    await expect(page.getByTestId('language-toggle')).toBeInViewport();
    await dismissToasts(page);
    await page.evaluate(() => {
      const badge = document.querySelector('[class*="emergent"], [id*="emergent-badge"]');
      if (badge) (badge as HTMLElement).remove();
    });
    await scrollToSection(page, '#contact');
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });

  test('Contact form fields are visible and interactable', async ({ page }) => {
    await expect(page.getByTestId('contact-name-input')).toBeVisible();
    await expect(page.getByTestId('contact-company-input')).toBeVisible();
    await expect(page.getByTestId('contact-email-input')).toBeVisible();
    await expect(page.getByTestId('contact-phone-input')).toBeVisible();
    await expect(page.getByTestId('contact-service-select')).toBeVisible();
    await expect(page.getByTestId('contact-message-input')).toBeVisible();
    await expect(page.getByTestId('contact-submit-button')).toBeVisible();
  });

  test('Contact form accepts user input', async ({ page }) => {
    await page.getByTestId('contact-name-input').fill('Juan García');
    await page.getByTestId('contact-company-input').fill('Chocolatería Premium');
    await page.getByTestId('contact-email-input').fill('juan@chocolateria.com');
    await page.getByTestId('contact-phone-input').fill('+51 987 654 321');

    await expect(page.getByTestId('contact-name-input')).toHaveValue('Juan García');
    await expect(page.getByTestId('contact-company-input')).toHaveValue('Chocolatería Premium');
    await expect(page.getByTestId('contact-email-input')).toHaveValue('juan@chocolateria.com');
  });

  test('Contact service select has options', async ({ page }) => {
    const select = page.getByTestId('contact-service-select');
    await select.selectOption('beans');
    await expect(select).toHaveValue('beans');

    await select.selectOption('export');
    await expect(select).toHaveValue('export');
  });

  test('Contact form submit button has correct text', async ({ page }) => {
    await expect(page.getByTestId('contact-submit-button')).toContainText('Enviar Mensaje');
  });

  test('Contact form submits successfully with valid data', async ({ page }) => {
    const timestamp = Date.now();
    await page.getByTestId('contact-name-input').fill(`Test User ${timestamp}`);
    await page.getByTestId('contact-email-input').fill(`test${timestamp}@example.com`);
    await page.getByTestId('contact-message-input').fill('This is a test message for automated testing');
    await page.getByTestId('contact-service-select').selectOption('beans');

    await page.getByTestId('contact-submit-button').click({ force: true });

    // Wait for success toast notification
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible();

    // Form should be cleared after successful submission
    await expect(page.getByTestId('contact-name-input')).toHaveValue('');
    await expect(page.getByTestId('contact-email-input')).toHaveValue('');
    await expect(page.getByTestId('contact-message-input')).toHaveValue('');
  });

  test('Contact form in English shows correct labels', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 0));
    const langToggle = page.getByTestId('language-toggle');
    await expect(langToggle).toBeInViewport();
    await langToggle.click({ force: true });

    await scrollToSection(page, '#contact');
    await expect(page.getByTestId('contact-title')).toContainText('Contact');
    await expect(page.getByTestId('contact-submit-button')).toContainText('Send Message');
  });
});
