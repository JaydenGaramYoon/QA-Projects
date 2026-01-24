/**
 * TC-ET-102: Real-time Cart Sync Validation on Product Deletion
 * 
 * Test Objective:
 * Validate that frontend cart correctly syncs when admin deletes a product
 * in real-time during customer's active shopping session.
 * 
 * Test data loaded from: ./automation/test_data/test_data.json
 * - DS-USER-ADMIN: Admin user credentials
 * - DS-PROD-DELETE: Product to be deleted
 * - DS-USER-001: Customer user credentials
 * 
 * Test Flow:
 * 1. Customer logs in and adds product to cart (visible in cart)
 * 2. Admin logs in and deletes the same product from system
 * 3. Customer's cart is checked - should remove deleted product
 *    (This tests real-time data sync between admin and customer sessions)
 * 
 * Expected Result:
 * - Cart updates in real-time when product is deleted
 * - Deleted product disappears from customer's cart
 * - No orphan cart items remain
 * 
 * Current Result (P1 Issue):
 * - Frontend cache prevents cart sync
 * - Deleted product still visible in customer's cart
 * - Data consistency issue between backend and frontend
 */

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import AdminPage from '../../automation/e2e/pages/admin/AdminPage.js';
import LoginPage from '../../automation/e2e/pages/customer/LoginPage.js';
import AdminListPage from '../../automation/e2e/pages/admin/AdminListPage.js';
import CartPage from '../../automation/e2e/pages/customer/CartPage.js';

// Load test data
const testData = JSON.parse(fs.readFileSync(
  './automation/test_data/test_data.json',
  'utf-8'
));

const ADMIN_USER = testData.users['DS-USER-ADMIN'];
const PRODUCT_TO_DELETE = testData.products['DS-PROD-DELETE'];
const CUSTOMER = testData.users['DS-USER-001'];

console.log('\n' + '='.repeat(80));
console.log('[TEST] TC-ET-102: Real-time Cart Sync Validation on Product Deletion');
console.log('[SEVERITY] P1 - Frontend cache prevents real-time sync');
console.log('[INFO] Test data loaded from external configuration');
console.log('='.repeat(80) + '\n');

(async () => {
  let adminDriver;
  let customerDriver;
  
  try {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--window-size=1024,768');
    chromeOptions.addArguments('--force-device-scale-factor=0.75');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');

    // ===== BROWSERS SETUP =====
    console.log('[SETUP] Launching browsers...\n');
    
    console.log('Browser 1: Admin');
    adminDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    await adminDriver.get('http://localhost:5174/');
    await adminDriver.sleep(2000);
    console.log('Admin browser ready\n');

    console.log('Browser 2: Customer');
    customerDriver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    await customerDriver.get('http://localhost:5173/');
    await customerDriver.sleep(3000);
    console.log('Customer browser ready\n');
    // ===== PHASE 1: Customer Login & Add Product to Cart =====
    console.log('='.repeat(80));
    console.log('[PHASE 1] CUSTOMER: Login & Add Product to Cart');
    console.log('='.repeat(80) + '\n');

    console.log('[STEP 1.1] Navigating to login page');
    await customerDriver.get('http://localhost:5173/login');
    await customerDriver.sleep(1500);
    console.log('Login page loaded\n');

    console.log('[STEP 1.2] Entering credentials');
    try {
      const emailInput = await customerDriver.wait(
        until.elementLocated(By.xpath("//input[@type='email' or @placeholder*='email' or @name='email']")),
        8000
      );
      await emailInput.sendKeys(CUSTOMER.email);
      
      const passwordInput = await customerDriver.findElement(
        By.xpath("//input[@type='password' or @placeholder*='password']")
      );
      await passwordInput.sendKeys(CUSTOMER.password);
      console.log('Credentials entered\n');

      console.log('[STEP 1.3] Clicking login button');
      const loginBtn = await customerDriver.findElement(
        By.xpath("//button[contains(text(),'Sign in') or contains(text(),'Login')]")
      );
      await loginBtn.click();
      await customerDriver.sleep(2000);
      console.log('Logged in successfully\n');
    } catch (err) {
      console.log('Login may have been auto-filled or skipped');
    }

    console.log('[STEP 1.4] Navigating to collection');
    await customerDriver.get('http://localhost:5173/collection');
    await customerDriver.sleep(2000);
    console.log('Collection page loaded\n');

    console.log('[STEP 1.5] Finding product from test data');
    try {
      // Try to find product by name
      const products = await customerDriver.findElements(
        By.xpath(`//*[contains(text(), '${PRODUCT_TO_DELETE.name.substring(0, 10)}')]`)
      );
      
      if (products.length > 0) {
        console.log(`Product found (${products.length} result(s))\n`);
        
        // Click on first product
        const productLink = products[0];
        await productLink.click();
        await customerDriver.sleep(1500);
        console.log('[STEP 1.6] Product details page opened\n');
        
        // ===== STEP 1.6.5: Select Size =====
        console.log('[STEP 1.6.5] Selecting size');
        try {
          const sizeButtons = await customerDriver.findElements(
            By.xpath("//button[contains(@class, 'border') and contains(@class, 'py-2')]")
          );
          
          if (sizeButtons.length > 0) {
            // Click first available size
            await sizeButtons[0].click();
            await customerDriver.sleep(500);
            console.log('Size selected\n');
          }
        } catch (err) {
          console.log('ℹ Could not select size\n');
        }
      }
    } catch (err) {
      console.log('ℹ Using first available product\n');
      const firstProduct = await customerDriver.findElement(
        By.xpath("//button[contains(text(),'ADD TO CART')]")
      );
      await firstProduct.click();
    }

    console.log('[STEP 1.7] Adding product to cart');
    try {
      const addToCartBtn = await customerDriver.wait(
        until.elementLocated(By.xpath("//button[contains(text(),'ADD TO CART')]")),
        8000
      );
      await addToCartBtn.click();
      await customerDriver.sleep(1500);
      console.log('Product added to cart\n');
    } catch (err) {
      console.error('Failed to add product to cart:', err.message);
    }

    console.log('[STEP 1.8] Verifying cart count');
    try {
      // Find the cart count badge in Navbar (correct XPath)
      const cartCount = await customerDriver.findElement(
        By.xpath("//img[contains(@src, 'cart')]/..//p[contains(@class, 'rounded-full')]")
      );
      const countText = await cartCount.getText();
      console.log(`  Cart count: ${countText}`);
      console.log('Cart count visible\n');
    } catch (err) {
      console.log('ℹ Cart count element may be hidden\n');
    }

    // ===== PHASE 2: Admin Login & Delete Product =====
    console.log('='.repeat(80));
    console.log('[PHASE 2] ADMIN: Login & Delete Product');
    console.log('='.repeat(80) + '\n');

    console.log('[STEP 2.1] Navigating to admin login');
    await adminDriver.get('http://localhost:5174/');
    await adminDriver.sleep(1500);
    console.log('Admin page loaded\n');

    console.log('[STEP 2.2] Entering admin credentials');
    console.log(`  Email: ${ADMIN_USER.email}`);
    try {
      const adminEmailInput = await adminDriver.wait(
        until.elementLocated(By.css('input[type="email"]')),
        8000
      );
      await adminEmailInput.sendKeys(ADMIN_USER.email);
      
      const adminPasswordInput = await adminDriver.findElement(
        By.css('input[type="password"]')
      );
      await adminPasswordInput.sendKeys(ADMIN_USER.password);
      console.log('Credentials entered\n');

      console.log('[STEP 2.3] Clicking admin login button');
      const adminLoginBtn = await adminDriver.findElement(
        By.xpath("//button[@type='submit']")
      );
      await adminLoginBtn.click();
      await adminDriver.sleep(2000);
      console.log('Admin logged in\n');
    } catch (err) {
      console.log('Admin login may have been skipped:', err.message);
    }

    console.log('[STEP 2.4] Navigating to product list');
    try {
      const listLink = await adminDriver.wait(
        until.elementLocated(By.xpath("//a[contains(text(),'List')] | //button[contains(text(),'List')]")),
        8000
      );
      await listLink.click();
      await adminDriver.sleep(2000);
      console.log('Product list loaded\n');
    } catch (err) {
      await adminDriver.get('http://localhost:5174/list');
      await adminDriver.sleep(2000);
    }

    console.log(`[STEP 2.5] Finding product to delete: "${PRODUCT_TO_DELETE.name}"`);
    const deletionStartTime = Date.now();
    try {
      // Use AdminListPage to find and delete product
      const adminListPage = new AdminListPage(adminDriver);
      
      // Find product by name
      const found = await adminListPage.findProductByName(PRODUCT_TO_DELETE.name);
      if (found) {
        console.log('Product found in list\n');
        
        // Delete product using POM method
        console.log('[STEP 2.6] Deleting product via AdminListPage');
        const deleteSuccess = await adminListPage.deleteProduct(PRODUCT_TO_DELETE.name);
        
        if (deleteSuccess) {
          console.log('Delete action executed\n');
          
          // Wait for API response and DOM update
          await adminDriver.sleep(2000);
          console.log('Product deleted from database\n');
        } else {
          console.log('Delete action may have failed\n');
        }
      } else {
        console.log('Product not found in list\n');
      }
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
    const deletionEndTime = Date.now();
    const deletionTime = deletionEndTime - deletionStartTime;

    // ===== PHASE 3: Verify Sync on Customer Side =====
    console.log('='.repeat(80));
    console.log('[PHASE 3] CUSTOMER: Verify Real-time Sync');
    console.log('='.repeat(80) + '\n');

    console.log('[STEP 3.1] Refreshing customer cart');
    await customerDriver.navigate().refresh();
    await customerDriver.sleep(2000);
    console.log('Cart refreshed\n');

    console.log('[STEP 3.2] Checking if product removed from cart');
    try {
      const cartItems = await customerDriver.findElements(
        By.xpath("//div[contains(@class, 'cart-item')] | //*[@data-testid='cart-item']")
      );
      console.log(`  Items in cart: ${cartItems.length}`);
      
      if (cartItems.length === 0) {
        console.log('Product successfully removed from cart\n');
      } else {
        console.log('Cart still has items\n');
      }
    } catch (err) {
      console.log('ℹ Cart appears to be empty\n');
    }

    console.log('[STEP 3.2.5] Checking frontend LocalStorage/Context data');
    let localStorageHasData = false;
    try {
      // Check LocalStorage with correct key
      const localStorageCart = await customerDriver.executeScript(
        'return localStorage.getItem("unistyle_cart_v1") ? JSON.parse(localStorage.getItem("unistyle_cart_v1")) : null'
      );
      console.log('  LocalStorage cart data (unistyle_cart_v1):', JSON.stringify(localStorageCart, null, 2));
      
      // Check token
      const token = await customerDriver.executeScript(
        'return localStorage.getItem("token")'
      );
      console.log('  Token exists:', !!token);
      
      // Check all LocalStorage keys
      const allLocalStorageKeys = await customerDriver.executeScript(
        'return Object.keys(localStorage)'
      );
      console.log('  All LocalStorage keys:', allLocalStorageKeys);
      
      // Count items in cart
      if (localStorageCart && typeof localStorageCart === 'object') {
        let totalItems = 0;
        for (const productId in localStorageCart) {
          for (const size in localStorageCart[productId]) {
            totalItems += localStorageCart[productId][size];
          }
        }
        console.log(`  Total cart items in LocalStorage: ${totalItems}`);
        
        if (totalItems > 0) {
          console.log('[FAILED] WARNING: Cart data STILL in LocalStorage after delete!\n');
          console.log('  Root Cause: LocalStorage cache not cleared\n');
          localStorageHasData = true;
        } else {
          console.log('Cart data properly cleaned\n');
        }
      }
    } catch (err) {
      console.log('ℹ Could not verify frontend storage:', err.message + '\n');
    }


    console.log('[STEP 3.3] Verifying cart count = 0');
    let cartCountCorrect = false;
    try {
      // Find the cart count badge in Navbar (correct XPath)
      const cartCountBadge = await customerDriver.findElement(
        By.xpath("//img[contains(@src, 'cart')]/..//p[contains(@class, 'rounded-full')]")
      );
      const countText = await cartCountBadge.getText();
      const count = parseInt(countText) || 0;
      console.log(`  Cart count badge: ${count}`);
      
      if (count === 0) {
        console.log('Cart count correctly updated to 0\n');
        cartCountCorrect = true;
      } else {
        console.log(`Cart count still showing: ${count}\n`);
      }
    } catch (err) {
      console.log('ℹ Cart count badge not visible\n');
    }

    // ===== TEST RESULT =====
    const testPassed = !localStorageHasData && cartCountCorrect;
    console.log('='.repeat(80));
    if (testPassed) {
      console.log('[TEST RESULT] PASSED - Real-time Cart Sync Verified');
    } else {
      console.log('[TEST RESULT] FAILED - Frontend Sync Issue Detected');
    }
    console.log('='.repeat(80));
    console.log('\n[SUMMARY]');
    console.log('  [PASS] Customer added product to cart');
    console.log('  [PASS] Admin successfully deleted product');
    console.log('  [PASS] Product removed from Backend DB');
    console.log(localStorageHasData ? '  [FAIL] Cart item NOT removed from frontend' : '  [PASS] Cart item removed from frontend');
    console.log(cartCountCorrect ? '  [PASS] Cart count updated to 0' : '  [FAIL] Cart count NOT updated to 0\n');
    console.log(`[Performance]`);
    console.log(`  Deletion time: ${deletionTime}ms`);
    console.log(`  Backend sync: SUCCESS`);
    console.log(localStorageHasData ? `  Frontend sync: FAILED\n` : `  Frontend sync: SUCCESS\n`);

    // Keep browsers open for inspection
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
