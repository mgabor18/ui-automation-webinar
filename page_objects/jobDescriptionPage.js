class JobDescriptionPage {
  constructor() {
    this.position = element(by.css(".form-component__description div"));
    this.location = element(by.css(".form-component__location"));
  }

  async urlOfJobDescriptionPage() {
    return await browser.getCurrentUrl();
  }

  async getLabel(selector) {
    return await selector.getText();
  }
}

module.exports = JobDescriptionPage;
