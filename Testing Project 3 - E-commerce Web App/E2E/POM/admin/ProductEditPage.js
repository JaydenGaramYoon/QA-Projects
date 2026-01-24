import { By, until } from 'selenium-webdriver';

/**
 * ProductEditPage - Admin POM
 * Defines all elements and actions for product editing page
 */
class ProductEditPage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Form Fields =====
    this.productNameInput = By.xpath("//input[@type='text'][@placeholder='Type here']");
    this.productDescriptionInput = By.xpath("//textarea[@placeholder='Write content here']");
    this.productPriceInput = By.xpath("//input[@type='number'][@placeholder='25']");
    
    // ===== Dropdowns =====
    this.categorySelect = By.xpath("//select[1]"); // First select is category
    this.subCategorySelect = By.xpath("//select[2]"); // Second select is sub category
    
    // ===== Category Options =====
    this.optionMen = By.xpath("//option[@value='Men']");
    this.optionWomen = By.xpath("//option[@value='Women']");
    this.optionKids = By.xpath("//option[@value='Kids']");
    
    // ===== Sub Category Options =====
    this.optionTopwear = By.xpath("//option[@value='Topwear']");
    this.optionBottomwear = By.xpath("//option[@value='Bottomwear']");
    this.optionWinterwear = By.xpath("//option[@value='Winterwear']");
    
    // ===== Size Selection =====
    this.sizeButtons = By.xpath("//div[contains(@class, 'bg-pink-100') or contains(@class, 'bg-slate-200')]//p");
    this.sizeS = By.xpath("//p[contains(text(), 'S')]");
    this.sizeM = By.xpath("//p[contains(text(), 'M')]");
    this.sizeL = By.xpath("//p[contains(text(), 'L')]");
    this.sizeXL = By.xpath("//p[contains(text(), 'XL')]");
    this.sizeXXL = By.xpath("//p[contains(text(), 'XXL')]");
    
    // ===== Bestseller Checkbox =====
    this.bestsellerCheckbox = By.xpath("//input[@type='checkbox'][@id='bestseller']");
    
    // ===== Image Upload =====
    this.imageInput1 = By.xpath("//input[@type='file'][@id='image1']");
    this.imageInput2 = By.xpath("//input[@type='file'][@id='image2']");
    this.imageInput3 = By.xpath("//input[@type='file'][@id='image3']");
    this.imageInput4 = By.xpath("//input[@type='file'][@id='image4']");
    
    // ===== Buttons =====
    this.updateButton = By.xpath("//button[@type='submit'][contains(text(), 'UPDATE')]");
  }

  // ===== Navigation =====
  async navigateToProductEdit(productId, url = 'http://localhost:5174/edit') {
    await this.driver.get(`${url}/${productId}`);
    console.log(`STEP: Navigated to product edit page`);
    await this.driver.sleep(2000);
  }

  // ===== Product Name =====
  async getProductName() {
    try {
      const input = await this.driver.findElement(this.productNameInput);
      const value = await input.getAttribute('value');
      return value;
    } catch (err) {
      console.error('STEP: Error getting product name:', err.message);
      return null;
    }
  }

  async setProductName(name) {
    try {
      const input = await this.driver.findElement(this.productNameInput);
      await input.clear();
      await input.sendKeys(name);
      console.log(`STEP: Product name set to: ${name}`);
      return true;
    } catch (err) {
      console.error('STEP: Error setting product name:', err.message);
      return false;
    }
  }

  // ===== Product Description =====
  async getProductDescription() {
    try {
      const textarea = await this.driver.findElement(this.productDescriptionInput);
      const value = await textarea.getAttribute('value');
      return value;
    } catch (err) {
      console.error('STEP: Error getting product description:', err.message);
      return null;
    }
  }

  async setProductDescription(description) {
    try {
      const textarea = await this.driver.findElement(this.productDescriptionInput);
      await textarea.clear();
      await textarea.sendKeys(description);
      console.log(`STEP: Product description set`);
      return true;
    } catch (err) {
      console.error('STEP: Error setting product description:', err.message);
      return false;
    }
  }

  // ===== Product Price =====
  async getProductPrice() {
    try {
      const input = await this.driver.findElement(this.productPriceInput);
      const value = await input.getAttribute('value');
      return parseFloat(value);
    } catch (err) {
      console.error('STEP: Error getting product price:', err.message);
      return null;
    }
  }

  async setProductPrice(price) {
    try {
      const input = await this.driver.findElement(this.productPriceInput);
      await input.clear();
      await input.sendKeys(price.toString());
      console.log(`STEP: Product price set to: $${price}`);
      return true;
    } catch (err) {
      console.error('STEP: Error setting product price:', err.message);
      return false;
    }
  }

  // ===== Category Selection =====
  async setCategory(categoryName) {
    try {
      const select = await this.driver.findElement(this.categorySelect);
      await select.findElement(By.xpath(`//option[@value='${categoryName}']`)).click();
      console.log(`STEP: Category set to: ${categoryName}`);
      return true;
    } catch (err) {
      console.error(`STEP: Error setting category:`, err.message);
      return false;
    }
  }

  async getCategory() {
    try {
      const select = await this.driver.findElement(this.categorySelect);
      const value = await select.getAttribute('value');
      return value;
    } catch (err) {
      console.error('STEP: Error getting category:', err.message);
      return null;
    }
  }

  // ===== Sub Category Selection =====
  async setSubCategory(subCategoryName) {
    try {
      const select = await this.driver.findElement(this.subCategorySelect);
      await select.findElement(By.xpath(`//option[@value='${subCategoryName}']`)).click();
      console.log(`STEP: Sub category set to: ${subCategoryName}`);
      return true;
    } catch (err) {
      console.error(`STEP: Error setting sub category:`, err.message);
      return false;
    }
  }

  async getSubCategory() {
    try {
      const select = await this.driver.findElement(this.subCategorySelect);
      const value = await select.getAttribute('value');
      return value;
    } catch (err) {
      console.error('STEP: Error getting sub category:', err.message);
      return null;
    }
  }

  // ===== Size Selection =====
  async selectSize(size) {
    try {
      let sizeSelector;
      switch(size.toUpperCase()) {
        case 'S':
          sizeSelector = this.sizeS;
          break;
        case 'M':
          sizeSelector = this.sizeM;
          break;
        case 'L':
          sizeSelector = this.sizeL;
          break;
        case 'XL':
          sizeSelector = this.sizeXL;
          break;
        case 'XXL':
          sizeSelector = this.sizeXXL;
          break;
        default:
          return false;
      }
      
      const sizeButton = await this.driver.findElement(sizeSelector);
      await sizeButton.click();
      console.log(`STEP: Size selected: ${size}`);
      await this.driver.sleep(500);
      return true;
    } catch (err) {
      console.error(`STEP: Error selecting size ${size}:`, err.message);
      return false;
    }
  }

  async getSelectedSizes() {
    try {
      const buttons = await this.driver.findElements(this.sizeButtons);
      const selected = [];
      
      for (let button of buttons) {
        const className = await button.getAttribute('class');
        if (className.includes('bg-pink-100')) {
          const text = await button.getText();
          selected.push(text);
        }
      }
      
      console.log(`STEP: Selected sizes: ${selected.join(', ')}`);
      return selected;
    } catch (err) {
      console.error('STEP: Error getting selected sizes:', err.message);
      return [];
    }
  }

  // ===== Bestseller Checkbox =====
  async setBestseller(value) {
    try {
      const checkbox = await this.driver.findElement(this.bestsellerCheckbox);
      const isChecked = await checkbox.isSelected();
      
      if (value && !isChecked) {
        await checkbox.click();
        console.log(`STEP: Bestseller checkbox checked`);
      } else if (!value && isChecked) {
        await checkbox.click();
        console.log(`STEP: Bestseller checkbox unchecked`);
      }
      
      return true;
    } catch (err) {
      console.error('STEP: Error setting bestseller:', err.message);
      return false;
    }
  }

  async isBestsellerChecked() {
    try {
      const checkbox = await this.driver.findElement(this.bestsellerCheckbox);
      const isChecked = await checkbox.isSelected();
      return isChecked;
    } catch (err) {
      console.error('STEP: Error checking bestseller status:', err.message);
      return false;
    }
  }

  // ===== Image Upload =====
  async uploadImage(imageIndex, filePath) {
    try {
      let imageInput;
      switch(imageIndex) {
        case 1:
          imageInput = this.imageInput1;
          break;
        case 2:
          imageInput = this.imageInput2;
          break;
        case 3:
          imageInput = this.imageInput3;
          break;
        case 4:
          imageInput = this.imageInput4;
          break;
        default:
          return false;
      }
      
      const input = await this.driver.findElement(imageInput);
      await input.sendKeys(filePath);
      console.log(`STEP: Image ${imageIndex} uploaded from ${filePath}`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error(`STEP: Error uploading image ${imageIndex}:`, err.message);
      return false;
    }
  }

  // ===== Form Submission =====
  async updateProduct() {
    try {
      const button = await this.driver.findElement(this.updateButton);
      await button.click();
      console.log(`STEP: UPDATE button clicked`);
      await this.driver.sleep(2000);
      return true;
    } catch (err) {
      console.error('STEP: Error clicking UPDATE button:', err.message);
      return false;
    }
  }

  // ===== Bulk Operations =====
  async updateProductDetails(productData) {
    try {
      if (productData.name) {
        await this.setProductName(productData.name);
      }
      
      if (productData.description) {
        await this.setProductDescription(productData.description);
      }
      
      if (productData.price) {
        await this.setProductPrice(productData.price);
      }
      
      if (productData.category) {
        await this.setCategory(productData.category);
      }
      
      if (productData.subCategory) {
        await this.setSubCategory(productData.subCategory);
      }
      
      if (productData.sizes && Array.isArray(productData.sizes)) {
        for (let size of productData.sizes) {
          await this.selectSize(size);
        }
      }
      
      if (productData.bestseller !== undefined) {
        await this.setBestseller(productData.bestseller);
      }
      
      console.log(`STEP: All product details updated`);
      return true;
    } catch (err) {
      console.error('STEP: Error updating product details:', err.message);
      return false;
    }
  }

  // ===== Verification =====
  async isPageLoaded() {
    try {
      const input = await this.driver.findElement(this.productNameInput);
      return await input.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isUpdateButtonVisible() {
    try {
      const button = await this.driver.findElement(this.updateButton);
      return await button.isDisplayed();
    } catch (err) {
      return false;
    }
  }
}

export default ProductEditPage;
