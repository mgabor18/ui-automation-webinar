class SearchResultPage {
  constructor() {
    this.searchResults = element.all(by.css(".search-result__item"));
  }

  async urlOfSearchResultPage() {
    return await browser.getCurrentUrl();
  }

  async getJobName(positionName, nthJob) {
    return await this.searchResults
      .get(nthJob - 1)
      .element(by.cssContainingText(".search-result__item-name", positionName))
      .getText();
  }
  async getJobLocation(nthJob, country) {
    return await this.searchResults
      .get(nthJob - 1)
      .element(by.cssContainingText(".search-result__location", country))
      .getText();
  }
  async getJobDescription(nthJob) {
    return await this.searchResults
      .get(nthJob - 1)
      .element(by.css(".search-result__item-description"))
      .isDisplayed();
  }

  async getJobApplyButton(nthJob) {
    return await this.searchResults
      .get(nthJob - 1)
      .element(by.css(".search-result__item-apply"))
      .isDisplayed();
  }

  async clickJobApplyButton(positionName) {
    const jobFormat = positionName.toLowerCase().split(" ").join("-");
    await element(by.cssContainingText(`a[href*='.${jobFormat}']`, "View and apply")).click();
    browser.wait(ec.presenceOf(element(by.css(".form-component__description div"))), GLOBAL_TIMEOUT);
  }
}

module.exports = SearchResultPage;
