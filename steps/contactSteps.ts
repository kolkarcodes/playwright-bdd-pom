import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";


Given('the user is on the Toolshop page', async function (this: CustomWorld): Promise<void> {

    const baseURL = process.env.BASE_URL;
    await this.page.goto(baseURL!);
    if (!(baseURL!)) {
        throw new Error("BASEURL is not defined in .env");
    }
    await this.page.waitForLoadState('networkidle');
    const title = await this.page.title();
    console.log(`Page title: ${title}`);
    await expect(title).toBe("Practice Software Testing - Toolshop - v5.0");
});

When('the user click on Contact link', async function (this: CustomWorld): Promise<void> {

    const contactLink = this.page.getByRole("link", { name: "Contact" });
    await contactLink.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole("heading", { name: "Contact" })).toBeVisible();
});

Then('the user should be navigated to the contact page', async function (this: CustomWorld): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole("heading", { name: "Contact" })).toBeVisible();
});

When('the user fills the contact form with firstname {string}, lastname {string}, email {string} and message {string}', async function (this: CustomWorld, firstname: string, lastname: string, email: string, message: string): Promise<void> {

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator('[data-test="first-name"]').waitFor({ state: "visible" });
    await this.page.locator('[data-test="first-name"]').fill(firstname);
    await this.page.locator('[data-test="last-name"]').fill(lastname);
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="message"]').fill(message);
});

When('set the subject option from the subject dropdown', async function (this: CustomWorld): Promise<void> {
    const subjectDropdown = this.page.locator('[data-test="subject"]');
    await subjectDropdown.click();
    await subjectDropdown.selectOption({ label: "Webmaster" });

});

When('clicks the send button', async function (this: CustomWorld): Promise<void> {

    console.log("Clicking the submit button");

    const sendButton = this.page.getByRole("button", { name: "Send" });

    await Promise.all([
        this.page.waitForURL(/contact/, { timeout: 1000 }),
        sendButton.click()
    ]);
});

Then('the user should be able to see the alert contact message', async function (this: CustomWorld): Promise<void> {
   
    const alertText = this.page.getByRole('alert');

    await expect(alertText).toBeVisible();

    const messageText = await alertText.textContent();
    console.log('Alert message:', messageText);

    expect(messageText?.trim()).toBe("Thanks for your message! We will contact you shortly.");
});