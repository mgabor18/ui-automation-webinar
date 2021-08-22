class JobDescriptionPage {
  constructor() {
    this.position = element(by.css(".form-component__description div"));
    this.location = element(by.css(".form-component__location"));
  }

  async urlOfJobDescriptionPage() {
    await this.waitForJobDescriptionPageToLoad();
    return await browser.getCurrentUrl();
  }

  async getLabel(selector) {
    await this.waitForJobDescriptionPageToLoad();
    return await selector.getText();
  }

  waitForJobDescriptionPageToLoad() {
    return browser.wait(ec.presenceOf(this.position), GLOBAL_TIMEOUT);
  }
}

module.exports = JobDescriptionPage;
