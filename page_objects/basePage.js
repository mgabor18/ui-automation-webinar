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

  /**
   * Loads the webpage
   * @returns {PromiseLike<void>}
   */
  async load() {
    return browser.get(this.url);
  }

  /**
   * Clicks the cookie bar button
   */
  async cookieClicker() {
    let isPresent = await this.cookieButtonElement.isPresent();
    if (isPresent) {
      await this.cookieButtonElement.click();
    }
  }

  /**
   * Selects the location in the searchforms dropdown menu
   * @param {string} country Name of the country we search for
   * @param {string} city Name of the city we search for
   */
  async selectLocation(country, city) {
    if ((await this.renderedCity.getText()) !== city) {
      await this.locationFilterArrow.click();
      browser.sleep(1000);
      await this.selectCountry(country).click();
      browser.wait(ec.elementToBeClickable(this.selectCity(city)), GLOBAL_TIMEOUT);
      await this.selectCity(city).click();
    }
  }

  /**
   * Selects the department in the searchforms department checkbox menu
   * @param {string} department Name of the department we search for
   */
  async selectDepartment(department) {
    await this.departmentFilterArrow.click();
    browser.wait(ec.elementToBeClickable(this.departmentContainer), GLOBAL_TIMEOUT);
    await this.departmentCheckbox(department).click();
  }

  /**
   * Checks if the correct department checkbox is checked
   * @param {string} department Name of the department we search for
   * @returns {promise.Promise<boolean>}
   */
  async correctDepartment(department) {
    return this.departmentInput(department).isEnabled();
  }

  /**
   * Clicks the searchforms search button
   * @returns {promise.Promise<void>}
   */
  async search() {
    return await this.searchButton.click();
  }
}

module.exports = CarrerPage;
