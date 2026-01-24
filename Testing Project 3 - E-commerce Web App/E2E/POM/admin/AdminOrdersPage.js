import { By, until } from 'selenium-webdriver';

/**
 * AdminOrdersPage - Testing POM
 * Defines all elements and actions for admin orders page
 */
class AdminOrdersPage {
  constructor(driver) {
    this.driver = driver;

    // ===== Page Title =====
    this.pageTitle = By.xpath("//h3[text()='Order Page']");

    // ===== Order Container =====
    this.orderContainers = By.xpath("//div[contains(@class, 'grid') and contains(@class, 'border-2')]");

    // ===== Order Information =====
    this.orderItemsCount = By.xpath("//p[contains(text(), 'Items :')]");
    this.orderPaymentMethod = By.xpath("//p[contains(text(), 'Method :')]");
    this.orderPaymentStatus = By.xpath("//p[contains(text(), 'Payment :')]");
    this.orderDate = By.xpath("//p[contains(text(), 'Date :')]");
    this.orderAmount = By.xpath("//p[starts-with(text(), '₹')]");
    this.orderAddress = By.xpath("//p[contains(text(), ',')]"); // Address lines

    // ===== Order Status Dropdown =====
    this.statusDropdown = By.xpath("//select[contains(@class, 'p-2')]");
    this.statusOptionOrderPlaced = By.xpath("//option[@value='Order Placed']");
    this.statusOptionPacking = By.xpath("//option[@value='Packing']");
    this.statusOptionShipped = By.xpath("//option[@value='Shipped']");
    this.statusOptionOutForDelivery = By.xpath("//option[@value='Out for delivery']");
    this.statusOptionDelivered = By.xpath("//option[@value='Delivered']");

    // ===== Parcel Icon =====
    this.parcelIcon = By.xpath("//img[@alt='']"); // Parcel icon

    // ===== Messages =====
    this.successMessage = By.xpath("//*[contains(text(),'successfully')]");
    this.errorMessage = By.xpath("//*[contains(text(),'error')]");
  }

  // ===== Navigation =====
  async navigateToOrders(url = 'http://localhost:5174/orders') {
    await this.driver.get(url);
    console.log(`STEP: Navigated to orders page`);
    await this.driver.sleep(2000);
  }

  // ===== Get Orders =====
  async getAllOrders() {
    try {
      const orders = await this.driver.findElements(this.orderContainers);
      console.log(`STEP: Found ${orders.length} orders`);
      return orders;
    } catch (err) {
      console.error('STEP: Error getting orders:', err.message);
      return [];
    }
  }

  async getOrderCount() {
    try {
      const orders = await this.getAllOrders();
      const count = orders.length;
      console.log(`STEP: Total orders: ${count}`);
      return count;
    } catch (err) {
      console.error('STEP: Error getting order count:', err.message);
      return 0;
    }
  }

  // ===== Get Order Details =====
  async getOrderItemCount(orderIndex = 0) {
    try {
      const orders = await this.getAllOrders();
      if (orderIndex < orders.length) {
        const itemText = await orders[orderIndex].getText();
        const itemMatch = itemText.match(/Items\s*:\s*(\d+)/);
        const count = itemMatch ? parseInt(itemMatch[1]) : 0;
        console.log(`STEP: Order ${orderIndex} has ${count} items`);
        return count;
      }
      return 0;
    } catch (err) {
      console.error('STEP: Error getting item count:', err.message);
      return 0;
    }
  }

  async getOrderAmount(orderIndex = 0) {
    try {
      const orders = await this.getAllOrders();
      if (orderIndex < orders.length) {
        const amountText = await orders[orderIndex].getText();
        const amountMatch = amountText.match(/₹([\d.]+)/);
        const amount = amountMatch ? amountMatch[1] : '0';
        console.log(`STEP: Order ${orderIndex} amount: ${amount}`);
        return amount;
      }
      return '0';
    } catch (err) {
      console.error('STEP: Error getting order amount:', err.message);
      return '0';
    }
  }

  async getOrderStatus(orderIndex = 0) {
    try {
      const orders = await this.getAllOrders();
      if (orderIndex < orders.length) {
        const dropdown = await orders[orderIndex].findElement(this.statusDropdown);
        const selectedValue = await dropdown.getAttribute('value');
        console.log(`STEP: Order ${orderIndex} status: ${selectedValue}`);
        return selectedValue;
      }
      return null;
    } catch (err) {
      console.error('STEP: Error getting order status:', err.message);
      return null;
    }
  }

  // ===== Update Order Status =====
  async updateOrderStatus(orderIndex, newStatus) {
    try {
      const orders = await this.getAllOrders();
      if (orderIndex < orders.length) {
        const dropdown = await orders[orderIndex].findElement(this.statusDropdown);
        await dropdown.sendKeys(newStatus);
        console.log(`STEP: Order ${orderIndex} status updated to: ${newStatus}`);
        await this.driver.sleep(1000);
        return true;
      }
      return false;
    } catch (err) {
      console.error('STEP: Error updating order status:', err.message);
      return false;
    }
  }

  // ===== Search Order =====
  async findOrderByCustomerName(customerName) {
    try {
      const orders = await this.getAllOrders();
      for (const order of orders) {
        const text = await order.getText();
        if (text.includes(customerName)) {
          console.log(`STEP: Order found for customer: ${customerName}`);
          return order;
        }
      }
      console.log(`STEP: Order not found for customer: ${customerName}`);
      return null;
    } catch (err) {
      console.error('STEP: Error finding order:', err.message);
      return null;
    }
  }

  // ===== Verification =====
  async isOrdersPageVisible() {
    try {
      await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
      return true;
    } catch (err) {
      return false;
    }
  }

  async hasOrders() {
    try {
      const count = await this.getOrderCount();
      return count > 0;
    } catch (err) {
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

  // ===== Wait for Order Updates =====
  async waitForOrderStatusUpdate(orderIndex, expectedStatus, timeout = 10000) {
    try {
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        const status = await this.getOrderStatus(orderIndex);
        if (status === expectedStatus) {
          console.log(`STEP: Order status updated to: ${expectedStatus}`);
          return true;
        }
        await this.driver.sleep(500);
      }
      console.log(`STEP: Timeout waiting for status update to: ${expectedStatus}`);
      return false;
    } catch (err) {
      console.error('STEP: Error waiting for status update:', err.message);
      return false;
    }
  }
}

export default AdminOrdersPage;
