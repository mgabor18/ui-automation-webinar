const { browser } = require("protractor");

class CarrerPage {
  constructor() {
    this.url = "https://www.epam.com/careers";
    this.logo = element(by.css(".header__logo"));
    this.cookieButton = ".cookie-disclaimer__button";
    this.cookieButtonElement = element(by.css(".cookie-disclaimer__button"));
    this.searchForm = element(by.css(".job-search__form"));
    this.renderedCity = element(by.css(".select2-selection__rendered"));
    this.locationFilterArrow = element(by.css(".select2-selection__arrow"));
    this.departmentFilterArrow = element(by.css(".selected-params"));
    this.departmentContainer = element(by.css(".multi-select-dropdown-container"));
    this.searchButton = element(by.css(".recruiting-search__submit"));
  }

  async load() {
    return browser.get(this.url);
  }

  async cookieClicker() {
    let isPresent = await browser.isElementPresent(by.css(this.cookieButton));
    if (isPresent) {
      await this.cookieButtonElement.click();
    }
  }

  async selectLocation(country, city) {
    if ((await this.renderedCity.getText()) !== city) {
      await this.locationFilterArrow.click();
      browser.sleep(1000);
      const selectCountry = element(by.css(`li[aria-label="${country}"]`));
      const selectCity = element(by.css(`[id*="${city}"]`));
      await selectCountry.click();
      browser.wait(ec.elementToBeClickable(selectCity), GLOBAL_TIMEOUT);
      await selectCity.click();
    }
  }

  async selectDepartment(department) {
    await this.departmentFilterArrow.click();
    browser.wait(ec.elementToBeClickable(this.departmentContainer), GLOBAL_TIMEOUT);
    const departmentCheckbox = element(by.cssContainingText("span", `${department}`));
    await departmentCheckbox.click();
  }

  async correctDepartment(department) {
    return element(by.css(`li[data-value="${department}"]`)).isEnabled();
  }

  async search() {
    return await this.searchButton.click();
  }
}

module.exports = CarrerPage;
