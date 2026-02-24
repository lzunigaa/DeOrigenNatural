import { Page, expect } from '@playwright/test';

export async function waitForAppReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

export async function dismissToasts(page: Page) {
  await page.addLocatorHandler(
    page.locator('[data-sonner-toast], .Toastify__toast, [role="status"].toast, .MuiSnackbar-root'),
    async () => {
      const close = page.locator('[data-sonner-toast] [data-close], [data-sonner-toast] button[aria-label="Close"], .Toastify__close-button, .MuiSnackbar-root button');
      await close.first().click({ timeout: 2000 }).catch(() => {});
    },
    { times: 10, noWaitAfter: true }
  );
}

export async function checkForErrors(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const errorElements = Array.from(
      document.querySelectorAll('.error, [class*="error"], [id*="error"]')
    );
    return errorElements.map(el => el.textContent || '').filter(Boolean);
  });
}

export async function scrollToSection(page: Page, sectionId: string) {
  await page.evaluate((id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'instant' });
  }, sectionId);
  await page.waitForLoadState('domcontentloaded');
}

export async function setLanguageToEnglish(page: Page) {
  // Check current language from toggle button text
  const langToggle = page.getByTestId('language-toggle');
  const text = await langToggle.textContent();
  if (text?.includes('es') || text?.includes('ES')) {
    await langToggle.click({ force: true });
    await expect(langToggle).toContainText('en', { ignoreCase: true });
  }
}

export async function setLanguageToSpanish(page: Page) {
  const langToggle = page.getByTestId('language-toggle');
  const text = await langToggle.textContent();
  if (text?.includes('en') || text?.includes('EN')) {
    await langToggle.click({ force: true });
    await expect(langToggle).toContainText('es', { ignoreCase: true });
  }
}
