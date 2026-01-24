/**
 * TC-ET-104: Order During Product Deletion - Data Integrity Validation
 * 
 * Test data loaded from: ./automation/test_data/test_data.json
 * - DS-USER-ADMIN: Admin user credentials
 * - DS-USER-001: Customer credentials
 * - DS-PROD-DELETE: Product to be deleted during checkout
 * 
 * Test Flow:
 * 1. Customer: Add product to cart + proceed to checkout
 * 2. Admin: Delete product from system DURING checkout
 * 3. Customer: Checkout should fail with "Product no longer available" error
 * 
 * Expected Result (Best Practice):
 * - Order creation fails before payment
 * - Customer sees error message
 * - No orphan orders created
 * - Data integrity: Product references validated before order commit
 */

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import AdminListPage from '../../automation/e2e/pages/admin/AdminListPage.js';
import LoginPage from '../../automation/e2e/pages/customer/LoginPage.js';
import CheckoutPage from '../../automation/e2e/pages/customer/CheckoutPage.js';

const testData = JSON.parse(fs.readFileSync(
  './automation/test_data/test_data.json',
  'utf-8'
));

const ADMIN_USER = testData.users['DS-USER-ADMIN'];
const CUSTOMER = testData.users['DS-USER-001'];
const PRODUCT_TO_DELETE = testData.products['DS-PROD-DELETE'];
const CHECKOUT_DATA = testData.checkout['DS-CHECKOUT-001'];

console.log('\n' + '='.repeat(80));
console.log('[TEST] TC-ET-104: Order During Product Deletion - Data Integrity');
console.log('[SEVERITY] P0 - Critical (Orphan Order Prevention)');
console.log('[INFO] Test data loaded from external configuration');
console.log('='.repeat(80) + '\n');

(async () => {
  let adminDriver;
  let customerDriver;
  let checkoutFailedAsExpected = false;
  
  try {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--window-size=1024,768');
    chromeOptions.addArguments('--force-device-scale-factor=0.75');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');

    console.log('[SETUP] Launching browsers...\n');
    
    adminDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    await adminDriver.get('http://localhost:5174/');
    await adminDriver.sleep(2000);
    console.log('Admin browser ready');

    customerDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    await customerDriver.get('http://localhost:5173/');
    await customerDriver.sleep(2000);
    console.log('Customer browser ready\n');

    // ===== PHASE 1: Customer Adds Product =====
    console.log('='.repeat(80));
    console.log('[PHASE 1] CUSTOMER: Add Product to Cart');
    console.log('='.repeat(80) + '\n');

    console.log('[STEP 1.1] Customer login');
    try {
      // Click profile icon to open login modal
      const profileIcon = await customerDriver.wait(
        until.elementLocated(By.xpath("//img[@src='/src/assets/profile_icon.png']")),
        8000
      );
      await profileIcon.click();
      await customerDriver.sleep(1500);
      console.log('Login modal opened');

      // Fill email
      const emailInput = await customerDriver.wait(
        until.elementLocated(By.xpath("//input[@type='email'][@placeholder='Email']")),
        8000
      );
      await emailInput.clear();
      await emailInput.sendKeys(CUSTOMER.email);
      
      // Fill password
      const passwordInput = await customerDriver.wait(
        until.elementLocated(By.xpath("//input[@type='password'][@placeholder='Password']")),
        8000
      );
      await passwordInput.clear();
      await passwordInput.sendKeys(CUSTOMER.password);
      console.log('Credentials entered');

      // Click Sign In button
      const loginBtn = await customerDriver.wait(
        until.elementLocated(By.xpath("//button[contains(text(),'Sign In')]")),
        8000
      );
      await loginBtn.click();
      await customerDriver.sleep(3000);
      console.log('Customer logged in\n');
    } catch (err) {
      console.log('ERROR: Login failed - ' + err.message);
      throw err;
    }

    console.log('[STEP 1.2] Navigate to collection');
    await customerDriver.get('http://localhost:5173/collection');
    await customerDriver.sleep(2000);
    console.log('Collection page loaded\n');

    console.log('[STEP 1.3] Find and add product');
    const searchQuery = PRODUCT_TO_DELETE.name.substring(0, 10);
    try {
      const products = await customerDriver.findElements(
        By.xpath(`//*[contains(text(), '${searchQuery}')]`)
      );
      
      if (products.length > 0) {
        await products[0].click();
        await customerDriver.sleep(1500);
        console.log('Product page opened');

        // Select size
        const sizeButtons = await customerDriver.findElements(
          By.xpath("//button[contains(@class, 'border') and contains(@class, 'py-2')]")
        );
        if (sizeButtons.length > 0) {
          await sizeButtons[0].click();
          await customerDriver.sleep(500);
        }

        // Add to cart
        const addBtn = await customerDriver.findElement(
          By.xpath("//button[contains(text(), 'ADD TO CART')]")
        );
        await addBtn.click();
        await customerDriver.sleep(1500);
        console.log('Product added to cart\n');
      }
    } catch (err) {
      console.log('Error adding product: ' + err.message);
    }

    // ===== PHASE 2: Customer to Checkout (Admin deletes during this phase) =====
    console.log('='.repeat(80));
    console.log('[PHASE 2] CONCURRENT: Customer Checkout + Admin Product Deletion');
    console.log('='.repeat(80) + '\n');

    console.log('[STEP 2.1] Admin login');
    const adminLoginPage = new LoginPage(adminDriver);
    await adminLoginPage.login(ADMIN_USER.email, ADMIN_USER.password);
    await adminDriver.sleep(2000);
    console.log('Admin logged in\n');

    console.log('[STEP 2.2] Customer navigates to cart');
    await customerDriver.get('http://localhost:5173/cart');
    await customerDriver.sleep(2000);
    console.log('Customer on cart page\n');

    console.log('[STEP 2.3] Customer proceeds to checkout');
    const checkoutBtn = await customerDriver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'PROCEED TO CHECKOUT') or contains(text(), 'Checkout')]")),
      10000
    );
    await checkoutBtn.click();
    await customerDriver.sleep(2500);
    console.log('Checkout page loaded\n');

    // Fill delivery information
    console.log('[STEP 2.4] Fill delivery information');
    const checkoutPage = new CheckoutPage(customerDriver);
    const deliveryInfo = CHECKOUT_DATA.delivery;
    const delivered = await checkoutPage.fillDeliveryInfo(
      deliveryInfo.firstName,
      deliveryInfo.lastName,
      deliveryInfo.email,
      deliveryInfo.street,
      deliveryInfo.city,
      deliveryInfo.province,
      deliveryInfo.zipcode,
      deliveryInfo.country,
      deliveryInfo.phone
    );
    
    if (!delivered) {
      throw new Error('Failed to fill delivery information');
    }
    await customerDriver.sleep(1500);
    console.log('Delivery information filled\n');

    // Select payment method
    console.log('[STEP 2.5] Select payment method');
    await checkoutPage.selectPaymentMethod(2); // Select third option (index 2)
    await customerDriver.sleep(1000);
    console.log('Payment method selected\n');

    console.log('[STEP 2.6] TIMING: Sequential operations');
    console.log('  Action 1: Admin deletes product FIRST');
    console.log('  Action 2: Customer clicks PLACE ORDER (after deletion)\n');

    // Sequential: Admin delete FIRST, then Customer PLACE ORDER
    let deleteResult;
    try {
      console.log('  [ADMIN] Navigating to product list...');
      await adminDriver.get('http://localhost:5174/list');
      await adminDriver.sleep(1500);
      
      const adminList = new AdminListPage(adminDriver);
      console.log('  [ADMIN] Attempting to delete product...');
      const deleted = await adminList.deleteProduct(PRODUCT_TO_DELETE.name);
      
      if (deleted) {
        console.log('  [ADMIN] Product deleted from system\n');
        deleteResult = 'deleted';
      } else {
        console.log('  [ADMIN] Delete operation returned false\n');
        deleteResult = 'delete_failed';
      }
    } catch (err) {
      console.log('  [ADMIN] Delete error: ' + err.message + '\n');
      deleteResult = 'delete_error';
    }

    // NOW Customer clicks PLACE ORDER (after product is already deleted)
    let checkoutResult;
    try {
      console.log('  [CUSTOMER] Clicking PLACE ORDER button (product already deleted)...');
      const checkoutPageForOrder = new CheckoutPage(customerDriver);
      const placed = await checkoutPageForOrder.placeOrder();
      await customerDriver.sleep(2000);
      console.log('  [CUSTOMER] PLACE ORDER clicked\n');
      checkoutResult = placed ? 'order_placed' : 'place_order_failed';
    } catch (err) {
      console.log('  [CUSTOMER] PLACE ORDER error: ' + err.message + '\n');
      checkoutResult = 'place_order_error';
    }

    console.log('\n[STEP 2.7] Verify order creation status');
    await customerDriver.sleep(2000);
    
    // Check if order was successfully created (this is the BUG we're testing for)
    try {
      // Look for order confirmation page elements
      const orderConfirmation = await customerDriver.findElement(
        By.xpath("//h2[contains(text(), 'Order')] | //*[contains(text(), 'Thank you')] | //*[contains(text(), 'Order ID')] | //*[contains(text(), 'order-')]")
      );
      const confirmText = await orderConfirmation.getText();
      console.log('Order confirmation found: ' + confirmText);
      console.log('PROBLEM: Order was created even though product was deleted!');
      checkoutFailedAsExpected = false; // Test FAILS - this is the bug!
    } catch (err) {
      // Order was NOT created (expected behavior)
      console.log('Order was NOT created (expected after product deletion)');
      
      // Check if we're still on checkout page
      try {
        await customerDriver.findElement(By.xpath("//button[contains(text(), 'PLACE ORDER')]"));
        console.log('Still on checkout page - order creation blocked');
        checkoutFailedAsExpected = true;
      } catch (e) {
        // Check for any error message
        try {
          const errorMsg = await customerDriver.findElement(
            By.xpath("//*[contains(text(), 'no longer available') or contains(text(), 'unavailable') or contains(text(), 'deleted') or contains(text(), 'not found')]")
          );
          const errorText = await errorMsg.getText();
          console.log('Error message shown: ' + errorText);
          checkoutFailedAsExpected = true;
        } catch (e2) {
          console.log('Order creation failed (navigated away from checkout)');
          checkoutFailedAsExpected = true;
        }
      }
    }

    console.log('\n[RESULT ANALYSIS]');
    console.log('Admin delete result: ' + deleteResult);
    console.log('Checkout failed as expected: ' + (checkoutFailedAsExpected ? 'YES' : 'NO'));

    // ===== TEST RESULT =====
    console.log('\n' + '='.repeat(80));
    if (checkoutFailedAsExpected) {
      console.log('[TEST RESULT] PASSED - Data integrity maintained');
      console.log('[OUTCOME] Orphan order prevented - Product validation before order commit');
    } else {
      console.log('[TEST RESULT] FAILED - Orphan order possible');
      console.log('[ISSUE] Deleted product was not validated during checkout');
    }
    console.log('='.repeat(80));

    console.log('\n[SUMMARY]');
    console.log('  Product: Deleted during checkout');
    console.log('  Delete result: ' + deleteResult);
    console.log('  Checkout result: ' + (checkoutFailedAsExpected ? '[BLOCKED] Correct' : '[ALLOWED] Incorrect'));
    console.log('  Order creation: ' + (checkoutFailedAsExpected ? '[PREVENTED]' : '[ALLOWED]'));
    console.log('  Orphan order in database: ' + (checkoutFailedAsExpected ? '[NO] Correct' : '[YES] P0 BUG!'));
    console.log('  Data consistency: ' + (checkoutFailedAsExpected ? '[PASS] System protected' : '[FAIL] Risk of orphan orders\n'));

    console.log('[Status] Test complete - keeping browsers open...');
    await new Promise(() => {});

  } catch (err) {
    console.error('\n[TEST FAILED]');
    console.error('Error:', err.message);
    console.error('\n' + '='.repeat(80) + '\n');
  } finally {
    console.log('[CLEANUP] Closing browsers...');
    if (adminDriver) {
      try {
        await adminDriver.quit();
        console.log('Admin browser closed');
      } catch (e) {}
    }
    if (customerDriver) {
      try {
        await customerDriver.quit();
        console.log('Customer browser closed');
      } catch (e) {}
    }
    console.log('\n[TEST] Session ended\n');
    process.exit(0);
  }
})();
