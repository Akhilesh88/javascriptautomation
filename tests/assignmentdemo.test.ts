import { _android as android, } from '@playwright/test';
// const { _android: android } = require('playwright');
import { test } from "@playwright/test";
test.beforeAll(async () => {
    // Set timeout for this hook.
    test.setTimeout(60000);
  });
test("Run in Android - Chrome", async () => {
    // Connect to the device.
    test.setTimeout(120000);
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);
    // Take screenshot of the device.
    await device.screenshot({ path: 'device.png' });

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com');
  
    console.log(await page.evaluate(() => window.location.href));
    // await page.screenshot({ path: 'page.png' });
    // await page.click("a[role='button']");
    // await page.click("text=Log in")
    // Click input[name="email"]
    await page.click("//*[@id='user-name']");
    // Fill input[name="email"]
    await page.fill("//*[@id='user-name']", 'standard_user');
      // Press Tab
      await page.press("//*[@id='user-name']", 'Tab');
    // Click input[name="password"]

    await page.click("//*[@id='password']");
    // Fill input[name="email"]
    await page.fill("//*[@id='password']", 'secret_sauce');
   
    await page.press("//*[@id='password']", 'Tab');
    await page.click("//*[@id='login-button']");
    // await Promise.all([
    //     page.waitForNavigation({ timeout: 30000,url:'https://www.saucedemo.com'}),
    //     // page.waitForNavigation({}),
    //     // page.goto('https://letcode.in/'),
    //     page.click("(//button['react-burger-menu-btn'])[1]")
    // ]);
    await page.click("(//button['react-burger-menu-btn'])[1]")
    await page.click("//a[@id='logout_sidebar_link']");
    // await page.click("text=Sign out");

    // close context and device
    await context.close();
    await device.close();
})
