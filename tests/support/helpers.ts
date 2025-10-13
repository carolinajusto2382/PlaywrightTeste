import { Page, expect } from "@playwright/test";

export class Helpers {
  static async login(page: Page, username: string, password: string) {
    await page.goto("https://www.saucedemo.com/");

    await page.fill("data-test=username", username);
    await page.fill("data-test=password", password);
    await page.click("#login-button");

    await expect(page.locator("span:has-text('Products')")).toBeVisible();
  }
}
