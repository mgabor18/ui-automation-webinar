class SearchResultPage {
  constructor() {
    this.searchResults = element.all(by.css(".search-result__item"));
    this.jobName = nthJob => {
      return this.searchResults.get(nthJob - 1).element(by.css(".search-result__item-name"));
    };
    this.jobLocation = nthJob => {
      return this.searchResults.get(nthJob - 1).element(by.css(".search-result__location"));
    };
    this.jobDescription = nthJob => {
      return this.searchResults.get(nthJob - 1).element(by.css(".search-result__item-description"));
    };
    this.jobApplyButton = nthJob => {
      return this.searchResults.get(nthJob - 1).element(by.css(".search-result__item-apply"));
    };
  }

  async urlOfSearchResultPage() {
    return await browser.getCurrentUrl();
  }

  async getJobName(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobName(nthJob).getText();
  }

  async getJobLocation(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobLocation(nthJob).getText();
  }

  async isJobDescriptionVisible(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobDescription(nthJob).isDisplayed();
  }

  async isJobApplyButtonVisible(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobApplyButton(nthJob).isDisplayed();
  }

  async clickJobApplyButton(nthJob) {
    return await this.jobApplyButton(nthJob).click();
  }

  async waitForSearchResultList() {
    return browser.wait(ec.presenceOf(this.searchResults), GLOBAL_TIMEOUT);
  }
}

module.exports = SearchResultPage;
