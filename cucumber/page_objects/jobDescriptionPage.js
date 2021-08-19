class JobDescriptionPage {
  constructor() {
    this.position = element(by.css(".form-component__description div"));
    this.location = element(by.css(".form-component__location"));
  }

  async urlOfJobDescriptionPage() {
    return await browser.getCurrentUrl();
  }

  async getPositionName() {
    return await this.position.getText();
  }

  async getLocation() {
    return await this.location.getText();
  }
}

module.exports = JobDescriptionPage;
