import { By, until } from 'selenium-webdriver';

/**
 * LoginPage - Testing POM
 * Defines all elements and actions for login page
 */
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Email Input =====
    this.emailInput = By.css('input[type="email"]');
    
    // ===== Password Input =====
    this.passwordInput = By.css('input[type="password"]');
    
    // ===== Login Button =====
    this.loginButton = By.xpath("//button[contains(text(),'Login')]");
    
    // ===== Error Message =====
    this.errorMessage = By.xpath("//*[contains(text(),'Invalid') or contains(text(),'Error') or contains(text(),'Failed')]");
    
    // ===== Success Message =====
    this.successMessage = By.xpath("//*[contains(text(),'Welcome') or contains(text(),'Successfully')]");
    
    // ===== Login Form Container =====
    this.loginForm = By.css('form');
  }

  // ===== Navigation =====
  async navigateToLogin(url) {
    await this.driver.get(url);
    console.log(`STEP: Navigated to login page: ${url}`);
    // Wait for form to load
    await this.driver.wait(until.elementLocated(this.emailInput), 10000);
  }

  // ===== User Actions =====
  async enterEmail(email) {
    try {
      const element = await this.driver.wait(until.elementLocated(this.emailInput), 10000);
      await element.clear();
      await element.sendKeys(email);
      console.log(`STEP: Email entered: ${email}`);
    } catch (err) {
      console.log(`ERROR: Could not enter email: ${err.message}`);
      throw err;
    }
  }

  async enterPassword(password) {
    try {
      // Try multiple selectors for password input
      let element;
      try {
        element = await this.driver.wait(until.elementLocated(this.passwordInput), 5000);
      } catch (e) {
        // Fallback: try XPath
        element = await this.driver.wait(until.elementLocated(By.xpath("//input[contains(@type, 'password') or contains(@placeholder, 'password') or contains(@placeholder, 'Password')]")), 5000);
      }
      await element.clear();
      await element.sendKeys(password);
      console.log(`STEP: Password entered`);
    } catch (err) {
      console.log(`ERROR: Could not enter password: ${err.message}`);
      throw err;
    }
  }

  async clickLoginButton() {
    try {
      let button;
      try {
        button = await this.driver.findElement(this.loginButton);
      } catch (e) {
        // Fallback: try other button selectors
        button = await this.driver.findElement(By.xpath("//button[contains(text(), 'Sign in') or contains(text(), 'Login') or contains(text(), 'SIGN IN')]"));
      }
      await button.click();
      console.log(`STEP: Login button clicked`);
      await this.driver.sleep(2000); // Wait for response
    } catch (err) {
      console.log(`ERROR: Could not click login button: ${err.message}`);
      throw err;
    }
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
    console.log(`STEP: Login flow completed for: ${email}`);
  }

  // ===== Assertions =====
  async isErrorDisplayed() {
    try {
      await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
      console.log(`STEP: Error message detected`);
      return true;
    } catch (err) {
      return false;
    }
  }

  async isSuccessDisplayed() {
    try {
      await this.driver.wait(until.elementLocated(this.successMessage), 5000);
      console.log(`STEP: Success message detected`);
      return true;
    } catch (err) {
      return false;
    }
  }

  async isLoginFormVisible() {
    try {
      await this.driver.findElement(this.emailInput);
      console.log(`STEP: Login form is visible`);
      return true;
    } catch (err) {
      console.log(`STEP: Login form is not visible`);
      return false;
    }
  }

  async getCurrentURL() {
    return await this.driver.getCurrentUrl();
  }
}

export default LoginPage;
