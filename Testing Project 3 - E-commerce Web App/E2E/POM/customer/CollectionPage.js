import { By, until } from 'selenium-webdriver';

/**
 * CollectionPage - Testing POM
 * Defines all elements and actions for product collection page
 */
class CollectionPage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Page Header =====
    this.pageTitle = By.xpath("//*[contains(text(),'COLLECTION') or contains(text(),'Collection')]");
    this.filterSection = By.xpath("//div[contains(@class, 'filter')]");
    
    // ===== Filter Elements =====
    this.categoryFilter = By.xpath("//button[contains(text(),'Category')]");
    this.priceFilter = By.xpath("//button[contains(text(),'Price')]");
    this.sizeFilter = By.xpath("//button[contains(text(),'Size')]");
    this.sortDropdown = By.xpath("//select | //button[contains(text(),'Sort')]");
    
    // ===== Filter Options =====
    this.filterCheckboxes = By.xpath("//input[@type='checkbox']");
    this.filterLabels = By.xpath("//label[contains(@class, 'filter')]");
    this.priceRange = By.xpath("//input[@type='range']");
    this.applyFilterButton = By.xpath("//button[contains(text(),'Apply')]");
    
    // ===== Sort Options =====
    this.sortByNewest = By.xpath("//button[contains(text(),'Newest')] | //*[contains(text(),'Newest')]");
    this.sortByPrice = By.xpath("//button[contains(text(),'Price')] | //*[contains(text(),'Price')]");
    this.sortByPopular = By.xpath("//button[contains(text(),'Popular')] | //*[contains(text(),'Popular')]");
    this.sortByRating = By.xpath("//button[contains(text(),'Rating')] | //*[contains(text(),'Rating')]");
    
    // ===== Product Grid =====
    this.productGrid = By.xpath("//div[contains(@class, 'grid')]");
    this.productCards = By.xpath("//*[contains(@class, 'product-item') or contains(@class, 'product-card')]");
    this.productImage = By.xpath(".//img[@alt]");
    this.productName = By.xpath(".//p[contains(@class, 'font-medium')]");
    this.productPrice = By.xpath(".//p[contains(@class, 'text-sm') and contains(text(), '$')]");
    
    // ===== Product Actions =====
    this.addToCartButton = By.xpath("//button[contains(text(),'ADD TO CART')]");
    this.productLink = By.css('a[href*="/product/"]');
    
    // ===== Pagination =====
    this.paginationContainer = By.xpath("//div[contains(@class, 'pagination')]");
    this.nextPageButton = By.xpath("//button[contains(text(),'Next')] | //a[contains(text(),'>')]");
    this.prevPageButton = By.xpath("//button[contains(text(),'Prev')] | //a[contains(text(),'<')]");
    
    // ===== No Results =====
    this.noResultsMessage = By.xpath("//*[contains(text(),'No products') or contains(text(),'not found')]");
    
    // ===== Search =====
    this.searchInput = By.xpath("//input[@placeholder*='Search' or @placeholder*='search']");
    this.searchButton = By.xpath("//button[contains(text(),'Search')]");
  }

  // ===== Navigation =====
  async navigateToCollection(url = 'http://localhost:5173/collection') {
    await this.driver.get(url);
    console.log(`STEP: Navigated to collection page`);
    await this.driver.sleep(2000);
  }

  // ===== Filter Operations =====
  async applyFilter(filterName) {
    try {
      const checkbox = await this.driver.findElement(
        By.xpath(`//label[contains(text(), '${filterName}')]/..//input[@type='checkbox']`)
      );
      await checkbox.click();
      console.log(`STEP: Filter applied: ${filterName}`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error(`STEP: Error applying filter ${filterName}:`, err.message);
      return false;
    }
  }

  async setPriceRange(minPrice, maxPrice) {
    try {
      const priceInputs = await this.driver.findElements(this.priceRange);
      if (priceInputs.length >= 2) {
        await priceInputs[0].sendKeys(minPrice.toString());
        await priceInputs[1].sendKeys(maxPrice.toString());
        console.log(`STEP: Price range set: $${minPrice} - $${maxPrice}`);
        await this.driver.sleep(1000);
        return true;
      }
    } catch (err) {
      console.error('STEP: Error setting price range:', err.message);
    }
    return false;
  }

  async sortBy(sortOption) {
    try {
      let selector;
      switch(sortOption.toLowerCase()) {
        case 'newest':
          selector = this.sortByNewest;
          break;
        case 'price':
          selector = this.sortByPrice;
          break;
        case 'popular':
          selector = this.sortByPopular;
          break;
        case 'rating':
          selector = this.sortByRating;
          break;
        default:
          selector = this.sortByNewest;
      }
      
      const element = await this.driver.findElement(selector);
      await element.click();
      console.log(`STEP: Sorted by: ${sortOption}`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error(`STEP: Error sorting by ${sortOption}:`, err.message);
      return false;
    }
  }

  // ===== Product Operations =====
  async getProductCount() {
    try {
      const products = await this.driver.findElements(this.productCards);
      console.log(`STEP: Found ${products.length} products`);
      return products.length;
    } catch (err) {
      console.log(`STEP: Error counting products:`, err.message);
      return 0;
    }
  }

  async clickProductByIndex(index) {
    try {
      const products = await this.driver.findElements(this.productCards);
      if (products.length > index) {
        await products[index].click();
        console.log(`STEP: Clicked product at index ${index}`);
        await this.driver.sleep(1500);
        return true;
      }
    } catch (err) {
      console.error(`STEP: Error clicking product:`, err.message);
    }
    return false;
  }

  async clickProductByName(productName) {
    try {
      const product = await this.driver.findElement(
        By.xpath(`//*[contains(text(), '${productName}')]`)
      );
      await product.click();
      console.log(`STEP: Clicked product: ${productName}`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error(`STEP: Error clicking product ${productName}:`, err.message);
      return false;
    }
  }

  async getProductName(index) {
    try {
      const products = await this.driver.findElements(this.productCards);
      if (products.length > index) {
        const nameElement = await products[index].findElement(this.productName);
        const name = await nameElement.getText();
        return name;
      }
    } catch (err) {
      console.error('STEP: Error getting product name:', err.message);
    }
    return null;
  }

  async getProductPrice(index) {
    try {
      const products = await this.driver.findElements(this.productCards);
      if (products.length > index) {
        const priceElement = await products[index].findElement(this.productPrice);
        const price = await priceElement.getText();
        return price;
      }
    } catch (err) {
      console.error('STEP: Error getting product price:', err.message);
    }
    return null;
  }

  async searchProduct(productName) {
    try {
      const searchInput = await this.driver.findElement(this.searchInput);
      await searchInput.sendKeys(productName);
      
      const searchBtn = await this.driver.findElement(this.searchButton);
      await searchBtn.click();
      console.log(`STEP: Searched for: ${productName}`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error(`STEP: Error searching for ${productName}:`, err.message);
      return false;
    }
  }

  // ===== Pagination =====
  async goToNextPage() {
    try {
      const nextBtn = await this.driver.findElement(this.nextPageButton);
      await nextBtn.click();
      console.log(`STEP: Navigated to next page`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error going to next page:', err.message);
      return false;
    }
  }

  async goToPrevPage() {
    try {
      const prevBtn = await this.driver.findElement(this.prevPageButton);
      await prevBtn.click();
      console.log(`STEP: Navigated to previous page`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error going to previous page:', err.message);
      return false;
    }
  }

  // ===== Verification =====
  async isNoResultsShown() {
    try {
      const noResults = await this.driver.findElement(this.noResultsMessage);
      return true;
    } catch (err) {
      return false;
    }
  }

  async isFilterVisible() {
    try {
      const filter = await this.driver.findElement(this.filterSection);
      return await filter.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isProductGridVisible() {
    try {
      const grid = await this.driver.findElement(this.productGrid);
      return await grid.isDisplayed();
    } catch (err) {
      return false;
    }
  }
}

export default CollectionPage;
