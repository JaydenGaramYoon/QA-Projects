import { By, until } from 'selenium-webdriver';

/**
 * AdminAddPage - Testing POM
 * Defines all elements and actions for admin product add/edit page
 */
class AdminAddPage {
  constructor(driver) {
    this.driver = driver;

    // ===== Image Upload =====
    this.imageLabel1 = By.css('label[for="image1"]');
    this.imageLabel2 = By.css('label[for="image2"]');
    this.imageLabel3 = By.css('label[for="image3"]');
    this.imageLabel4 = By.css('label[for="image4"]');
    this.imageInput1 = By.css('input[id="image1"]');
    this.imageInput2 = By.css('input[id="image2"]');
    this.imageInput3 = By.css('input[id="image3"]');
    this.imageInput4 = By.css('input[id="image4"]');

    // ===== Product Information =====
    this.productNameInput = By.xpath("//input[@type='text' and @placeholder='Type here']");
    this.productDescriptionInput = By.xpath("//textarea[@placeholder='Write content here']");

    // ===== Category & Subcategory =====
    this.categorySelect = By.xpath("//select[contains(@class, 'px-3')]")[0]; // First select
    this.subCategorySelect = By.xpath("//select[contains(@class, 'px-3')]")[1]; // Second select
    this.categoryOptionMen = By.xpath("//option[@value='Men']");
    this.categoryOptionWomen = By.xpath("//option[@value='Women']");
    this.categoryOptionKids = By.xpath("//option[@value='Kids']");

    // ===== Price =====
    this.priceInput = By.xpath("//input[@type='number' and @placeholder='25']");

    // ===== Product Sizes =====
    this.sizeS = By.xpath("//p[text()='S' and contains(@class, 'px-3')]");
    this.sizeM = By.xpath("//p[text()='M' and contains(@class, 'px-3')]");
    this.sizeL = By.xpath("//p[text()='L' and contains(@class, 'px-3')]");
    this.sizeXL = By.xpath("//p[text()='XL' and contains(@class, 'px-3')]");
    this.sizeXXL = By.xpath("//p[text()='XXL' and contains(@class, 'px-3')]");

    // ===== Bestseller Checkbox =====
    this.bestsellCheckbox = By.css('input[id="bestseller"]');
    this.bestsellLabel = By.css('label[for="bestseller"]');

    // ===== Submit Button =====
    this.submitButton = By.xpath("//button[@type='submit']");

    // ===== Success/Error Messages =====
    this.successMessage = By.xpath("//*[contains(text(),'successfully')]");
    this.errorMessage = By.xpath("//*[contains(text(),'error')]");
  }

  // ===== Navigation =====
  async navigateToAddProduct(url = 'http://localhost:5174/add') {
    await this.driver.get(url);
    console.log(`STEP: Navigated to add product page`);
    await this.driver.sleep(1500);
  }

  // ===== Image Upload =====
  async uploadImage1(imagePath) {
    try {
      const input = await this.driver.findElement(this.imageInput1);
      await input.sendKeys(imagePath);
      console.log(`STEP: Image 1 uploaded`);
      await this.driver.sleep(500);
      return true;
    } catch (err) {
      console.error('STEP: Error uploading image 1:', err.message);
      return false;
    }
  }

  // ===== Product Information =====
  async enterProductName(name) {
    try {
      const input = await this.driver.findElement(this.productNameInput);
      await input.clear();
      await input.sendKeys(name);
      console.log(`STEP: Product name entered: ${name}`);
      await this.driver.sleep(300);
      return true;
    } catch (err) {
      console.error('STEP: Error entering product name:', err.message);
      return false;
    }
  }

  async enterProductDescription(description) {
    try {
      const input = await this.driver.findElement(this.productDescriptionInput);
      await input.clear();
      await input.sendKeys(description);
      console.log(`STEP: Product description entered`);
      await this.driver.sleep(300);
      return true;
    } catch (err) {
      console.error('STEP: Error entering description:', err.message);
      return false;
    }
  }

  // ===== Price =====
  async enterPrice(price) {
    try {
      const input = await this.driver.findElement(this.priceInput);
      await input.clear();
      await input.sendKeys(price.toString());
      console.log(`STEP: Price entered: ${price}`);
      await this.driver.sleep(300);
      return true;
    } catch (err) {
      console.error('STEP: Error entering price:', err.message);
      return false;
    }
  }

  // ===== Category =====
  async selectCategory(category) {
    try {
      const select = await this.driver.findElement(By.xpath("//select"));
      const option = await this.driver.findElement(By.xpath(`//option[@value='${category}']`));
      await option.click();
      console.log(`STEP: Category selected: ${category}`);
      await this.driver.sleep(300);
      return true;
    } catch (err) {
      console.error('STEP: Error selecting category:', err.message);
      return false;
    }
  }

  // ===== Sizes =====
  async selectSize(size) {
    try {
      const sizeButton = await this.driver.findElement(
        By.xpath(`//p[text()='${size}' and contains(@class, 'px-3') and contains(@class, 'cursor-pointer')]`)
      );
      await sizeButton.click();
      console.log(`STEP: Size selected: ${size}`);
      await this.driver.sleep(300);
      return true;
    } catch (err) {
      console.error('STEP: Error selecting size:', err.message);
      return false;
    }
  }

  async selectMultipleSizes(sizes) {
    try {
      for (const size of sizes) {
        await this.selectSize(size);
      }
      return true;
    } catch (err) {
      console.error('STEP: Error selecting multiple sizes:', err.message);
      return false;
    }
  }

  // ===== Bestseller =====
  async setBestseller(value) {
    try {
      const checkbox = await this.driver.findElement(this.bestsellCheckbox);
      const isChecked = await checkbox.isSelected();
      
      if ((value && !isChecked) || (!value && isChecked)) {
        await checkbox.click();
        await this.driver.sleep(300);
      }
      
      console.log(`STEP: Bestseller set to: ${value}`);
      return true;
    } catch (err) {
      console.error('STEP: Error setting bestseller:', err.message);
      return false;
    }
  }

  // ===== Submit =====
  async submitForm() {
    try {
      const button = await this.driver.findElement(this.submitButton);
      await button.click();
      console.log(`STEP: Form submitted`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error submitting form:', err.message);
      return false;
    }
  }

  // ===== Verification =====
  async isSuccessMessageVisible() {
    try {
      await this.driver.wait(until.elementLocated(this.successMessage), 5000);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default AdminAddPage;
