const { browser } = require("protractor");

class CarrerPage {
  constructor() {
    this.url = "https://www.epam.com/careers";
    this.logo = element(by.css(".header__logo"));
    this.cookieButtonElement = element(by.css(".cookie-disclaimer__button"));
    this.searchForm = element(by.css(".job-search__form"));
    this.renderedCity = element(by.css(".select2-selection__rendered"));
    this.locationFilterArrow = element(by.css(".select2-selection__arrow"));
    this.departmentFilterArrow = element(by.css(".selected-params"));
    this.departmentContainer = element(by.css(".multi-select-dropdown-container"));
    this.searchButton = element(by.css(".recruiting-search__submit"));
    this.selectCountry = country => {
      return element(by.css(`li[aria-label="${country}"]`));
    };
    this.selectCity = city => {
      return element(by.css(`[id*="${city}"]`));
    };
    this.departmentCheckbox = department => {
      return element(by.cssContainingText("span", `${department}`));
    };
    this.departmentInput = department => {
      return element(by.css(`li[data-value="${department}"]`));
    };
  }

  async load() {
    return browser.get(this.url);
  }

  async cookieClicker() {
    let isPresent = await this.cookieButtonElement.isPresent();
    if (isPresent) {
      await this.cookieButtonElement.click();
    }
  }

  async selectLocation(country, city) {
    if ((await this.renderedCity.getText()) !== city) {
      await this.locationFilterArrow.click();
      browser.sleep(1000);
      await this.selectCountry(country).click();
      browser.wait(ec.elementToBeClickable(this.selectCity(city)), GLOBAL_TIMEOUT);
      await this.selectCity(city).click();
    }
  }

  async selectDepartment(department) {
    await this.departmentFilterArrow.click();
    browser.wait(ec.elementToBeClickable(this.departmentContainer), GLOBAL_TIMEOUT);
    await this.departmentCheckbox(department).click();
  }

  async correctDepartment(department) {
    return this.departmentInput(department).isEnabled();
  }

  async search() {
    return await this.searchButton.click();
  }
}

module.exports = CarrerPage;
