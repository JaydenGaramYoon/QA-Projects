import { By, until } from 'selenium-webdriver';

/**
 * AboutPage - Testing POM
 * Defines all elements and actions for about page
 */
class AboutPage {
  constructor(driver) {
    this.driver = driver;
    
    // ===== Page Header =====
    this.pageTitle = By.xpath("//*[contains(text(),'ABOUT') or contains(text(),'About Us')]");
    this.heroSection = By.xpath("//div[contains(@class, 'hero') or contains(@class, 'banner')]");
    this.heroImage = By.xpath("//img[contains(@src, 'about') or contains(@alt, 'about')]");
    
    // ===== Company Info Section =====
    this.companyDescription = By.xpath("//*[contains(text(),'company') or contains(text(),'Company')]");
    this.missionStatement = By.xpath("//*[contains(text(),'mission') or contains(text(),'Mission')]");
    this.visionStatement = By.xpath("//*[contains(text(),'vision') or contains(text(),'Vision')]");
    
    // ===== Story Section =====
    this.storyHeading = By.xpath("//*[contains(text(),'Our Story') or contains(text(),'story')]");
    this.storyContent = By.xpath("//p[contains(@class, 'text')]");
    
    // ===== Values Section =====
    this.valuesSection = By.xpath("//*[contains(text(),'Values') or contains(text(),'values')]");
    this.valueCards = By.xpath("//div[contains(@class, 'value') or contains(@class, 'card')]");
    
    // ===== Team Section =====
    this.teamSection = By.xpath("//*[contains(text(),'Team') or contains(text(),'team')]");
    this.teamMembers = By.xpath("//div[contains(@class, 'team-member') or contains(@class, 'member')]");
    this.memberName = By.xpath(".//h3 | .//h4 | .//p[@class*='font-bold']");
    this.memberRole = By.xpath(".//p[contains(@class, 'text-sm') or contains(@class, 'role')]");
    
    // ===== Timeline Section =====
    this.timelineSection = By.xpath("//*[contains(text(),'Timeline') or contains(text(),'History')]");
    this.timelineItems = By.xpath("//div[contains(@class, 'timeline') or contains(@class, 'milestone')]");
    
    // ===== Achievements Section =====
    this.achievementsSection = By.xpath("//*[contains(text(),'Achievements') or contains(text(),'Awards')]");
    this.achievementCards = By.xpath("//div[contains(@class, 'achievement')]");
    
    // ===== Statistics Section =====
    this.statisticsSection = By.xpath("//*[contains(text(),'Years') or contains(text(),'Customers') or contains(text(),'Products')]");
    this.statItems = By.xpath("//div[contains(@class, 'stat') or contains(@class, 'metric')]");
    this.statNumber = By.xpath(".//h2 | .//h3[contains(@class, 'font-bold')]");
    this.statLabel = By.xpath(".//p | .//span");
    
    // ===== Certifications Section =====
    this.certificationsSection = By.xpath("//*[contains(text(),'Certifications') or contains(text(),'Certified')]");
    this.certificationBadges = By.xpath("//img[contains(@src, 'cert') or contains(@alt, 'cert')]");
    
    // ===== Call to Action =====
    this.ctaSection = By.xpath("//div[contains(@class, 'cta') or contains(@class, 'action')]");
    this.contactButton = By.xpath("//button[contains(text(),'Contact') or contains(text(),'Get in Touch')] | //a[contains(text(),'Contact')]");
    this.shopButton = By.xpath("//button[contains(text(),'Shop') or contains(text(),'SHOP')] | //a[contains(text(),'Shop')]");
    
    // ===== Footer Link Navigation =====
    this.footerAboutLink = By.xpath("//a[contains(text(),'About')]");
    this.socialLinks = By.xpath("//a[contains(@href, 'facebook') or contains(@href, 'instagram') or contains(@href, 'twitter')]");
    
    // ===== Breadcrumb =====
    this.breadcrumb = By.xpath("//nav[contains(@class, 'breadcrumb')] | //*[contains(text(),'Home')]");
  }

  // ===== Navigation =====
  async navigateToAbout(url = 'http://localhost:5173/about') {
    await this.driver.get(url);
    console.log(`STEP: Navigated to about page`);
    await this.driver.sleep(2000);
  }

  async navigateFromNavbar() {
    try {
      const aboutLink = await this.driver.findElement(
        By.xpath("//a[contains(text(),'About')] | //button[contains(text(),'About')]")
      );
      await aboutLink.click();
      console.log(`STEP: Clicked About link in navbar`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error clicking About link:', err.message);
      return false;
    }
  }

  // ===== Page Verification =====
  async isPageLoaded() {
    try {
      const title = await this.driver.findElement(this.pageTitle);
      return await title.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isHeroSectionVisible() {
    try {
      const hero = await this.driver.findElement(this.heroSection);
      return await hero.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  // ===== Section Visibility =====
  async isCompanyInfoVisible() {
    try {
      const info = await this.driver.findElement(this.companyDescription);
      return await info.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isStoryVisible() {
    try {
      const story = await this.driver.findElement(this.storyHeading);
      return await story.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isTeamSectionVisible() {
    try {
      const team = await this.driver.findElement(this.teamSection);
      return await team.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isValuesSectionVisible() {
    try {
      const values = await this.driver.findElement(this.valuesSection);
      return await values.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isTimelineSectionVisible() {
    try {
      const timeline = await this.driver.findElement(this.timelineSection);
      return await timeline.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  async isAchievementsSectionVisible() {
    try {
      const achievements = await this.driver.findElement(this.achievementsSection);
      return await achievements.isDisplayed();
    } catch (err) {
      return false;
    }
  }

  // ===== Team Operations =====
  async getTeamMemberCount() {
    try {
      const members = await this.driver.findElements(this.teamMembers);
      console.log(`STEP: Found ${members.length} team members`);
      return members.length;
    } catch (err) {
      console.log(`STEP: Error counting team members:`, err.message);
      return 0;
    }
  }

  async getTeamMemberName(index) {
    try {
      const members = await this.driver.findElements(this.teamMembers);
      if (members.length > index) {
        const nameElement = await members[index].findElement(this.memberName);
        const name = await nameElement.getText();
        return name;
      }
    } catch (err) {
      console.error('STEP: Error getting team member name:', err.message);
    }
    return null;
  }

  async getTeamMemberRole(index) {
    try {
      const members = await this.driver.findElements(this.teamMembers);
      if (members.length > index) {
        const roleElement = await members[index].findElement(this.memberRole);
        const role = await roleElement.getText();
        return role;
      }
    } catch (err) {
      console.error('STEP: Error getting team member role:', err.message);
    }
    return null;
  }

  // ===== Statistics Operations =====
  async getStatisticCount() {
    try {
      const stats = await this.driver.findElements(this.statItems);
      console.log(`STEP: Found ${stats.length} statistics`);
      return stats.length;
    } catch (err) {
      console.log(`STEP: Error counting statistics:`, err.message);
      return 0;
    }
  }

  async getStatisticValue(index) {
    try {
      const stats = await this.driver.findElements(this.statItems);
      if (stats.length > index) {
        const numberElement = await stats[index].findElement(this.statNumber);
        const value = await numberElement.getText();
        return value;
      }
    } catch (err) {
      console.error('STEP: Error getting statistic value:', err.message);
    }
    return null;
  }

  async getStatisticLabel(index) {
    try {
      const stats = await this.driver.findElements(this.statItems);
      if (stats.length > index) {
        const labels = await stats[index].findElements(this.statLabel);
        if (labels.length > 0) {
          const label = await labels[0].getText();
          return label;
        }
      }
    } catch (err) {
      console.error('STEP: Error getting statistic label:', err.message);
    }
    return null;
  }

  // ===== CTA Operations =====
  async clickContactButton() {
    try {
      const button = await this.driver.findElement(this.contactButton);
      await button.click();
      console.log(`STEP: Clicked Contact button`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error clicking Contact button:', err.message);
      return false;
    }
  }

  async clickShopButton() {
    try {
      const button = await this.driver.findElement(this.shopButton);
      await button.click();
      console.log(`STEP: Clicked Shop button`);
      await this.driver.sleep(1500);
      return true;
    } catch (err) {
      console.error('STEP: Error clicking Shop button:', err.message);
      return false;
    }
  }

  // ===== Social Links =====
  async getSocialLinksCount() {
    try {
      const links = await this.driver.findElements(this.socialLinks);
      console.log(`STEP: Found ${links.length} social links`);
      return links.length;
    } catch (err) {
      console.log(`STEP: Error counting social links:`, err.message);
      return 0;
    }
  }

  async clickSocialLink(index) {
    try {
      const links = await this.driver.findElements(this.socialLinks);
      if (links.length > index) {
        await links[index].click();
        console.log(`STEP: Clicked social link at index ${index}`);
        await this.driver.sleep(1000);
        return true;
      }
    } catch (err) {
      console.error('STEP: Error clicking social link:', err.message);
    }
    return false;
  }

  // ===== Content Verification =====
  async getMissionStatement() {
    try {
      const mission = await this.driver.findElement(this.missionStatement);
      const text = await mission.getText();
      return text;
    } catch (err) {
      console.log('STEP: Mission statement not found');
      return null;
    }
  }

  async getVisionStatement() {
    try {
      const vision = await this.driver.findElement(this.visionStatement);
      const text = await vision.getText();
      return text;
    } catch (err) {
      console.log('STEP: Vision statement not found');
      return null;
    }
  }

  // ===== Scroll Operations =====
  async scrollToSection(sectionName) {
    try {
      let selector;
      switch(sectionName.toLowerCase()) {
        case 'story':
          selector = this.storyHeading;
          break;
        case 'team':
          selector = this.teamSection;
          break;
        case 'values':
          selector = this.valuesSection;
          break;
        case 'timeline':
          selector = this.timelineSection;
          break;
        case 'achievements':
          selector = this.achievementsSection;
          break;
        case 'statistics':
          selector = this.statisticsSection;
          break;
        default:
          return false;
      }
      
      const element = await this.driver.findElement(selector);
      await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
      console.log(`STEP: Scrolled to ${sectionName} section`);
      await this.driver.sleep(1000);
      return true;
    } catch (err) {
      console.error(`STEP: Error scrolling to ${sectionName}:`, err.message);
      return false;
    }
  }
}

export default AboutPage;
