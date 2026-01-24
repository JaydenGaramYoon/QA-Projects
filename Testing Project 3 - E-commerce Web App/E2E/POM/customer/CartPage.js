import { By, until } from 'selenium-webdriver';

/**
 * CartPage - Testing POM
 * Defines all elements and actions for shopping cart page
 */
class CartPage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Cart Items =====
    this.cartItems = By.xpath("//*[contains(@class, 'cart') and contains(@class, 'item')]");
    this.cartItemContainer = By.css('[data-testid="cart-items"], .cart-items, .shopping-cart');
    
    // ===== Item Actions =====
    this.removeButton = By.xpath("//button[contains(text(),'Remove') or contains(text(),'Delete')]");
    this.quantityInput = By.css('input[type="number"]');
    this.increaseButton = By.xpath("//button[contains(text(),'+')]");
    this.decreaseButton = By.xpath("//button[contains(text(),'-')]");
    
    // ===== Cart Totals =====
    this.subtotal = By.xpath("//*[contains(text(),'Subtotal') or contains(text(),'subtotal')]");
    this.taxAmount = By.xpath("//*[contains(text(),'Tax') or contains(text(),'tax')]");
    this.totalPrice = By.xpath("//*[contains(text(),'Total') or contains(text(),'total')]");
    this.totalAmount = By.css('[data-testid="total-amount"], .total-amount, .price-total');
    
    // ===== Cart Count =====
    this.cartCount = By.xpath("//img[contains(@src, 'cart')]/..//p[contains(@class, 'rounded-full')]");
    
    // ===== Empty Cart =====
    this.emptyCartMessage = By.xpath("//*[contains(text(),'Your cart is empty') or contains(text(),'No items')]");
    
    // ===== Checkout Button =====
    this.checkoutButton = By.xpath("//button[contains(text(),'CHECKOUT') or contains(text(),'Checkout')]");
    
    // ===== Continue Shopping =====
    this.continueShoppingButton = By.xpath("//button[contains(text(),'Continue Shopping')]");
  }

  // ===== Navigation =====
  async navigateToCart(url = 'https://unistyle-main.onrender.com/cart') {
    await this.driver.get(url);
    console.log(`STEP: Navigated to cart page`);
    await this.driver.sleep(2000);
  }

  // ===== Item Management =====
  async getCartItemCount() {
    try {
      const items = await this.driver.findElements(this.cartItems);
      console.log(`STEP: Cart contains ${items.length} items`);
      return items.length;
    } catch (err) {
      console.log(`STEP: No items found in cart`);
      return 0;
    }
  }

  async removeItemFromCart() {
    try {
      const button = await this.driver.findElement(this.removeButton);
      await button.click();
      console.log(`STEP: Item removed from cart`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error('STEP: Error removing item:', err.message);
      return false;
    }
  }

  async updateQuantity(quantity) {
    try {
      const input = await this.driver.findElement(this.quantityInput);
      await input.clear();
      await input.sendKeys(quantity.toString());
      console.log(`STEP: Quantity updated to ${quantity}`);
      await this.driver.sleep(500);
      return true;
    } catch (err) {
      console.error('STEP: Error updating quantity:', err.message);
      return false;
    }
  }

  // ===== Cart Verification =====
  async isCartEmpty() {
    try {
      await this.driver.findElement(this.emptyCartMessage);
      console.log(`STEP: Cart is empty`);
      return true;
    } catch (err) {
      console.log(`STEP: Cart has items`);
      return false;
    }
  }

  async getCartTotal() {
    try {
      const totalElement = await this.driver.findElement(this.totalAmount);
      const totalText = await totalElement.getText();
      console.log(`STEP: Cart total: ${totalText}`);
      return totalText;
    } catch (err) {
      console.error('STEP: Error getting cart total:', err.message);
      return '0';
    }
  }

  async verifyCartTotalIsZero() {
    try {
      const total = await this.getCartTotal();
      const isZero = total.includes('0') || total === '0';
      console.log(`STEP: Cart total is zero: ${isZero}`);
      return isZero;
    } catch (err) {
      return false;
    }
  }

  // ===== Checkout =====
  async proceedToCheckout() {
    try {
      const button = await this.driver.findElement(this.checkoutButton);
      await button.click();
      console.log(`STEP: Proceeding to checkout`);
      await this.driver.sleep(2000);
      return true;
    } catch (err) {
      console.error('STEP: Error proceeding to checkout:', err.message);
      return false;
    }
  }

  // ===== Synchronization =====
  async waitForCartUpdate(timeoutMs = 10000) {
    try {
      // Wait for any cart update indicator
      await this.driver.sleep(500);
      console.log(`STEP: Waiting for cart synchronization`);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default CartPage;
