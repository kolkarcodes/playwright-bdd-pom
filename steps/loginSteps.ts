import {Given, When,Then,Before,After} from "@cucumber/cucumber"; 
import {chromium,Page, Browser, expect} from "@playwright/test";

let page: Page;
let browser: Browser;

Before(async () => {
    browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    page = await browser.newPage();
} );

After(async () => {
    await browser.close();
} );

 Given('the user is on the login page', async () => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole("link", { name: "Sign In" }).waitFor({ state: "visible" });
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" }); 
 });

 When('the user enters valid credentials',async() => {
  
  await page.getByRole("textbox", { name: "email" }).fill("customer@practicesoftwaretesting.com");
  await page.getByRole("textbox",{ name:"password"}).fill("welcome01");
 } );

 When('clicks the login button', async () => {
    const loginButton = page.locator('[data-test="login-submit"]');
    await loginButton.waitFor({ state: "visible" });
    await loginButton.click();
 } );

 Then('the user should be redirected to the my account page', async () => {
   
    await page.getByRole("heading", { name: "My Account" }).waitFor({ state: "visible" }); 
    const headingText = await page.getByRole("heading", { name: "My Account" }).innerText();
    expect(headingText.trim()).toBe("My account");
     await expect(page).toHaveURL(/.*account/); 
   
 } );
       

