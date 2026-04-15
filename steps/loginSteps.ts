import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

Given('the user is on the login page', async function (this: CustomWorld): Promise<void> {

    const baseURL = process.env.BASE_URL;
    await this.page.goto(baseURL!);

    if (!(baseURL!)) {
      throw new Error("BASEURL is not defined in .env");
    }

    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole("link", { name: "Sign In" }).waitFor({ state: "visible" });
    await this.page.getByRole("link", { name: "Sign In" }).click();
    await expect( this.page.getByRole("heading", { name: "Login" })).toBeVisible();

});

When('the user enters credentials with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
    await this.page.getByRole("textbox", { name: "email" }).fill(email);
    await this.page.getByRole("textbox", { name: "password" }).fill(password);
});

When('clicks the login button', async function (this: CustomWorld): Promise<void> {

    const loginButton = this.page.locator('[data-test="login-submit"]');

    await loginButton.waitFor({ state: "visible" });

    await Promise.all([
        this.page.waitForURL(/(account|admin)/, { timeout: 10000 }),
        loginButton.click()
    ]);

});


Then('the user should be redirected to the my account page', async function(this: CustomWorld): Promise<void> {
    
    await this.page.waitForLoadState('networkidle');

    if (this.page.url().includes("account")) {
        const headingText = await this.page.locator('[data-test="page-title"]').innerText();
        expect(headingText.trim()).toBe("My account");
    } else {
        const headingTextadmin = await this.page.locator('[data-test="page-title"]').innerText();
        expect(headingTextadmin.trim()).toBe("Sales over the years");
    }

});
