import { By, until } from 'selenium-webdriver';

/**
 * AdminPage - Testing POM
 * Base admin page for login, navigation between pages, and logout
 * Specific page operations handled by: AdminAddPage, AdminListPage, AdminOrdersPage
 */
class AdminPage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Admin Panel =====
    this.adminPanel = By.xpath("//h1[contains(text(),'Admin Panel')]");
    this.dashboard = By.xpath("//*[contains(@class, 'dashboard') or contains(@class, 'admin')]");
    
    // ===== Login Form =====
    this.emailInput = By.css('input[type="email"]');
    this.passwordInput = By.css('input[type="password"]');
    this.loginButton = By.xpath("//button[@type='submit']");
    
    // ===== Navigation =====
    this.addLink = By.xpath("//a[contains(text(),'Add')] | //button[contains(text(),'Add')] | //div[contains(text(),'Add')]");
    this.listLink = By.xpath("//a[contains(text(),'List')] | //button[contains(text(),'List')] | //div[contains(text(),'List')]");
    this.ordersLink = By.xpath("//a[contains(text(),'Orders')] | //button[contains(text(),'Orders')] | //div[contains(text(),'Orders')]");
    
    // ===== Messages =====
    this.successMessage = By.xpath("//*[contains(text(),'successfully') or contains(text(),'Success')]");
    this.errorMessage = By.xpath("//*[contains(text(),'error') or contains(text(),'Error') or contains(text(),'failed')]");
    
    // ===== Logout =====
    this.logoutButton = By.xpath("//button[contains(text(),'Logout')] | //a[contains(text(),'Logout')]");
  }

  // ===== Login =====
  async login(email, password) {
    try {
      const emailField = await this.driver.findElement(this.emailInput);
      await emailField.sendKeys(email);
      console.log(`STEP: Email entered: ${email}`);
      
      const passwordField = await this.driver.findElement(this.passwordInput);
      await passwordField.sendKeys(password);
      console.log(`STEP: Password entered`);
      
      const loginBtn = await this.driver.findElement(this.loginButton);
      await loginBtn.click();
      console.log(`STEP: Login button clicked`);
      
      await this.driver.sleep(2000);
      return true;
    } catch (err) {
      console.error('STEP: Error during login:', err.message);
      return false;
    }
  }

  // ===== Navigation =====
  async navigateToAdmin(adminUrl = 'http://localhost:5174/') {
    try {
      await this.driver.get(adminUrl);
      console.log(`STEP: Navigated to admin panel: ${adminUrl}`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error('STEP: Error navigating to admin:', err.message);
      return false;
    }
  }

  async navigateToAddPage() {
    try {
      const link = await this.driver.findElement(this.addLink);
      await link.click();
      console.log(`STEP: Navigated to Add Product page`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error('STEP: Error navigating to Add page:', err.message);
      return false;
    }
  }

  async navigateToListPage() {
    try {
      const link = await this.driver.findElement(this.listLink);
      await link.click();
      console.log(`STEP: Navigated to Product List page`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error('STEP: Error navigating to List page:', err.message);
      return false;
    }
  }

  async navigateToOrdersPage() {
    try {
      const link = await this.driver.findElement(this.ordersLink);
      await link.click();
      console.log(`STEP: Navigated to Orders page`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error('STEP: Error navigating to Orders page:', err.message);
      return false;
    }
  }

  // ===== Verification =====
  async isAdminPanelVisible() {
    try {
      await this.driver.findElement(this.adminPanel);
      console.log(`STEP: Admin panel is visible`);
      return true;
    } catch (err) {
      console.log(`STEP: Admin panel is not visible`);
      return false;
    }
  }

  async isSuccessMessageDisplayed() {
    try {
      await this.driver.wait(until.elementLocated(this.successMessage), 5000);
      console.log(`STEP: Success message displayed`);
      return true;
    } catch (err) {
      return false;
    }
  }

  async isErrorMessageDisplayed() {
    try {
      await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
      console.log(`STEP: Error message displayed`);
      return true;
    } catch (err) {
      return false;
    }
  }

  // ===== Logout =====
  async logout() {
    try {
      const logoutBtn = await this.driver.findElement(this.logoutButton);
      await logoutBtn.click();
      console.log(`STEP: Logout button clicked`);
      await this.driver.sleep(2000);
      return true;
    } catch (err) {
      console.error('STEP: Error logging out:', err.message);
      return false;
    }
  }
}

export default AdminPage;
