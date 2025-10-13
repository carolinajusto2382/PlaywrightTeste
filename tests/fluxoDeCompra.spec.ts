import { test, expect } from "@playwright/test";
import { Helpers } from "./support/helpers";

test.describe("Fluxo de compra", () => {
  test.beforeEach(async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauce";

    await page.context().clearCookies();
    await page.context().clearPermissions();

    await Helpers.login(page, username, password);
  });

  test.afterEach(async ({ page, context }) => {
    await page.click("button[id='react-burger-menu-btn']");
    await page.click("a:has-text('Logout')");
    await context.clearCookies();
    await context.clearPermissions();
    await page.close();
  });

  test("Adicionar produto ao carrinho (usuário logado)", async ({ page }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();
  });
  test("Visualizar produto no carrinho (usuário logado)", async ({ page }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();

    await page.locator("data-test=shopping-cart-link").click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();
  });
  test("Remover produto do carrinho (usuário logado)", async ({ page }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();

    await page.locator("data-test=shopping-cart-link").click();

    await page.click("button:has-text('Remove')");
    expect(page.locator("button:has-text('Remove')")).not.toBeVisible();
  });
  test("Tentar finalizar compra sem preencher os campos", async ({ page }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();

    await page.locator("data-test=shopping-cart-link").click();

    await page.click("#checkout");
    await page.click("data-test=continue");

    await expect(
      page.locator("h3:has-text('Error: First Name is required')")
    ).toBeVisible();
  });
  test("Tentar finalizar compra sem preencher o campo de sobrenome", async ({
    page,
  }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();

    await page.locator("data-test=shopping-cart-link").click();

    await page.click("#checkout");
    await page.fill("data-test=firstName", "Carolina");
    await page.fill("data-test=postalCode", "12345");
    await page.click("data-test=continue");

    await expect(
      page.locator("h3:has-text('Error: Last Name is required')")
    ).toBeVisible();
  });
  test("Tentar finalizar compra sem preencher o campo de código postal", async ({
    page,
  }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();

    await page.locator("data-test=shopping-cart-link").click();

    await page.click("#checkout");
    await page.fill("data-test=firstName", "Carolina");
    await page.fill("data-test=lastName", "Justo");
    await page.click("data-test=continue");

    await expect(
      page.locator("h3:has-text('Error: Postal Code is required')")
    ).toBeVisible();
  });
  test("Clicar em 'Cancel' na página de checkout", async ({ page }) => {
    await page
      .locator("data-test=add-to-cart-sauce-labs-backpack")
      .first()
      .click();

    expect(page.locator("button:has-text('Remove')")).toBeVisible();

    await page.locator("data-test=shopping-cart-link").click();

    await page.click("#checkout");
    await page.click("#cancel");

    expect(page.locator("button:has-text('Remove')")).toBeVisible();
  });
});
