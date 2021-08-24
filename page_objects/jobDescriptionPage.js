const Application = require("./application");

class JobDescriptionPage extends Application {
  constructor() {
    super();
    this.position = element(by.css(".form-component__description div"));
    this.location = element(by.css(".form-component__location"));
  }

  /**
   * Returns the current webpage's url
   * @returns {PromiseLike<void>}
   */
  async urlOfJobDescriptionPage() {
    await this.waitForJobDescriptionPageToLoad();
    return await browser.getCurrentUrl();
  }

  /**
   * Gets the text content of the given element
   * @param {element} selector
   * @returns {string}
   */
  async getLabel(selector) {
    await this.waitForJobDescriptionPageToLoad();
    return await selector.getText();
  }

  /**
   * Waits for the page element to be present
   * @returns {WebElementPromise}
   */
  waitForJobDescriptionPageToLoad() {
    return browser.wait(ec.presenceOf(this.position), GLOBAL_TIMEOUT);
  }
}

module.exports = JobDescriptionPage;
