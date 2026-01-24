import { By, until } from 'selenium-webdriver';

/**
 * AdminListPage - Testing POM
 * Defines all elements and actions for admin product list page
 */
class AdminListPage {
  constructor(driver) {
    this.driver = driver;

    // ===== Table Headers =====
    this.tableHeader = By.xpath("//div[contains(@class, 'grid') and contains(@class, 'bg-gray-100')]");
    
    // ===== Product Rows =====
    this.productRows = By.xpath("//div[contains(@class, 'grid') and contains(@class, 'border')]");
    this.productImage = By.xpath("//img[@src and contains(@class, 'w-12')]");
    this.productName = By.xpath("//p[contains(text(), '')]"); // Product names in rows
    this.productCategory = By.xpath("//p[contains(text(), 'Men') or contains(text(), 'Women') or contains(text(), 'Kids')]");
    this.productPrice = By.xpath("//p[starts-with(text(), '₹')]");

    // ===== Action Buttons =====
    this.editIcon = By.xpath("//img[@alt='edit']");
    this.deleteButton = By.xpath("//p[text()='X' and contains(@class, 'cursor-pointer')]");

    // ===== Page Title =====
    this.pageTitle = By.xpath("//p[contains(text(), 'All Products List')]");

    // ===== Success/Error Messages =====
    this.successMessage = By.xpath("//*[contains(text(),'successfully')]");
    this.errorMessage = By.xpath("//*[contains(text(),'error')]");
  }

  // ===== Navigation =====
  async navigateToList(url = 'http://localhost:5174/list') {
    await this.driver.get(url);
    console.log(`STEP: Navigated to product list page`);
    await this.driver.sleep(2000);
  }

  // ===== Get Products =====
  async getAllProducts() {
    try {
      const rows = await this.driver.findElements(this.productRows);
      console.log(`STEP: Found ${rows.length} products`);
      return rows;
    } catch (err) {
      console.error('STEP: Error getting products:', err.message);
      return [];
    }
  }

  async getProductCount() {
    try {
      const products = await this.getAllProducts();
      const count = products.length;
      console.log(`STEP: Total products: ${count}`);
      return count;
    } catch (err) {
      console.error('STEP: Error getting product count:', err.message);
      return 0;
    }
  }

  // ===== Search/Find Product =====
  async findProductByName(productName) {
    try {
      const element = await this.driver.findElement(
        By.xpath(`//p[contains(text(), '${productName}')]`)
      );
      console.log(`STEP: Product found: ${productName}`);
      return element;
    } catch (err) {
      console.error('STEP: Product not found:', productName);
      return null;
    }
  }

  async findProductRowByName(productName) {
    try {
      const row = await this.driver.findElement(
        By.xpath(`//div[contains(@class, 'grid')]//p[contains(text(), '${productName}')]/../..`)
      );
      console.log(`STEP: Product row found: ${productName}`);
      return row;
    } catch (err) {
      console.error('STEP: Product row not found:', productName);
      return null;
    }
  }

  // ===== Edit Product =====
  async clickEditButton(productName) {
    try {
      const row = await this.findProductRowByName(productName);
      const editIcon = await row.findElement(this.editIcon);
      await editIcon.click();
      console.log(`STEP: Edit clicked for product: ${productName}`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error clicking edit button:', err.message);
      return false;
    }
  }

  // ===== Delete Product =====
  async deleteProduct(productName) {
    try {
      const row = await this.findProductRowByName(productName);
      const deleteBtn = await row.findElement(By.xpath(".//*[text()='X' and contains(@class, 'cursor-pointer')]"));
      await deleteBtn.click();
      console.log(`STEP: Delete clicked for product: ${productName}`);
      await this.driver.sleep(800);
      return true;
    } catch (err) {
      console.error('STEP: Error clicking delete button:', err.message);
      return false;
    }
  }

  async deleteProductByIndex(index) {
    try {
      const deleteButtons = await this.driver.findElements(this.deleteButton);
      if (index < deleteButtons.length) {
        await deleteButtons[index].click();
        console.log(`STEP: Delete clicked for product at index: ${index}`);
        await this.driver.sleep(800);
        return true;
      }
      return false;
    } catch (err) {
      console.error('STEP: Error deleting product by index:', err.message);
      return false;
    }
  }

  // ===== Verification =====
  async isProductVisible(productName) {
    try {
      const product = await this.findProductByName(productName);
      return product !== null;
    } catch (err) {
      return false;
    }
  }

  async isProductDeleted(productName) {
    try {
      await this.driver.wait(
        until.stalenessOf(await this.findProductByName(productName)),
        5000
      );
      console.log(`STEP: Product deleted: ${productName}`);
      return true;
    } catch (err) {
      console.log(`STEP: Product still visible: ${productName}`);
      return false;
    }
  }

  async isSuccessMessageVisible() {
    try {
      await this.driver.wait(until.elementLocated(this.successMessage), 5000);
      return true;
    } catch (err) {
      return false;
    }
  }

  async waitForProductToDisappear(productName, timeout = 10000) {
    try {
      const productElement = await this.driver.findElement(
        By.xpath(`//p[contains(text(), '${productName}')]`)
      );
      await this.driver.wait(until.stalenessOf(productElement), timeout);
      console.log(`STEP: Product disappeared: ${productName}`);
      return true;
    } catch (err) {
      console.error('STEP: Product still visible or timeout:', err.message);
      return false;
    }
  }
}

export default AdminListPage;
