const { By, until } = require('selenium-webdriver');

/**
 * HomePage - Testing POM
 * Defines all sections and elements for home page
 */
class HomePage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Hero Section =====
    this.heroSection = By.css('div.flex.flex-col.sm\\:flex-row.border.border-gray-400');
    this.bestSellersText = By.xpath("//*[contains(text(),'OUR BESTSELLERS')]");
    this.latestArrivalsText = By.xpath("//*[contains(text(),'Latest Arrivals')]");
    
    // ===== Latest Collection Section =====
    this.latestText = By.xpath("//*[contains(text(),'LATEST')]");
    this.collectionsText = By.xpath("//*[contains(text(),'COLLECTIONS')]");
    this.collectionDescription = By.xpath("//*[contains(text(),'Step into style with our latest collection!')]");
    
    // ===== Best Sellers Section =====
    this.bestSellersTitle = By.xpath("//*[contains(text(),'BEST') and contains(text(),'SELLERS')]");
    this.bestSellersDescription = By.xpath("//*[contains(text(),'Hot right now! Discover the pieces everyone')]");
    
    // ===== Our Policy Section =====
    this.exchangePolicy = By.xpath("//*[contains(text(),'Easy Exchange Policy')]");
    this.returnPolicy = By.xpath("//*[contains(text(),'7 Days Return Policy')]");
    this.customerSupport = By.xpath("//*[contains(text(),'Best customer support')]");
    
    // ===== Newsletter Section =====
    this.newsletterText = By.xpath("//*[contains(text(),'Subscribe now & get 20% off')]");
    this.emailSubscription = By.xpath("//*[contains(text(),'Don')]");
  }

  // ===== Navigation =====
  async navigateToHome(url) {
    await this.driver.get(url);
    console.log(`STEP: Navigated to home page: ${url}`);
    // Wait for hero section to load
    await this.driver.wait(until.elementLocated(this.heroSection), 15000);
  }

  // ===== Hero Section Verification =====
  async verifyHeroSection() {
    try {
      const heroSection = await this.driver.findElement(this.heroSection);
      await this.driver.executeScript('arguments[0].scrollIntoView(true);', heroSection);
      await this.driver.findElement(this.bestSellersText);
      await this.driver.findElement(this.latestArrivalsText);
      console.log('STEP: Hero section verified');
      return true;
    } catch (err) {
      console.error('STEP: Error verifying Hero section:', err.message);
      return false;
    }
  }

  // ===== Latest Collection Verification =====
  async verifyLatestCollection() {
    try {
      await this.driver.findElement(this.latestText);
      await this.driver.findElement(this.collectionsText);
      await this.driver.findElement(this.collectionDescription);
      console.log('STEP: Latest collection section verified');
      return true;
    } catch (err) {
      console.error('STEP: Error verifying Latest Collection:', err.message);
      return false;
    }
  }

  // ===== Best Sellers Verification =====
  async verifyBestSellers() {
    try {
      await this.driver.findElement(this.bestSellersTitle);
      await this.driver.findElement(this.bestSellersDescription);
      console.log('STEP: Best sellers section verified');
      return true;
    } catch (err) {
      console.error('STEP: Error verifying Best Sellers:', err.message);
      return false;
    }
  }

  // ===== Our Policy Verification =====
  async verifyOurPolicy() {
    try {
      await this.driver.findElement(this.exchangePolicy);
      await this.driver.findElement(this.returnPolicy);
      await this.driver.findElement(this.customerSupport);
      console.log('STEP: Our policy section verified');
      return true;
    } catch (err) {
      console.error('STEP: Error verifying Our Policy:', err.message);
      return false;
    }
  }

  // ===== Newsletter Verification =====
  async verifyNewsletter() {
    try {
      await this.driver.findElement(this.newsletterText);
      await this.driver.findElement(this.emailSubscription);
      console.log('STEP: Newsletter section verified');
      return true;
    } catch (err) {
      console.error('STEP: Error verifying Newsletter:', err.message);
      return false;
    }
  }

  // ===== All Sections Verification =====
  async verifyAllSections() {
    console.log('STEP: Starting full homepage verification');
    const results = {
      hero: await this.verifyHeroSection(),
      latestCollection: await this.verifyLatestCollection(),
      bestSellers: await this.verifyBestSellers(),
      policy: await this.verifyOurPolicy(),
      newsletter: await this.verifyNewsletter()
    };
    
    const allPassed = Object.values(results).every(val => val === true);
    console.log(`STEP: Homepage verification result: ${allPassed ? 'PASS' : 'FAIL'}`);
    return allPassed;
  }

  // ===== Performance =====
  async measurePageLoadTime() {
    const startTime = Date.now();
    await this.navigateToHome('https://unistyle-main.onrender.com/');
    const endTime = Date.now();
    const loadTime = (endTime - startTime) / 1000;
    console.log(`STEP: Page load time: ${loadTime}s`);
    return loadTime;
  }
}

module.exports = HomePage;
