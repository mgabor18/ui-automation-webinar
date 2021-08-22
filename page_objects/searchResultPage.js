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

  /**
   * Returns the current webpage's url
   * @returns {PromiseLike<void>}
   */
  async urlOfSearchResultPage() {
    return await browser.getCurrentUrl();
  }

  /**
   * Gets the name of the job on the given position
   * @param {number} nthJob the position of the job in the search result list
   * @returns {string}
   */
  async getJobName(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobName(nthJob).getText();
  }

  /**
   * Gets the location of the job on the given position
   * @param {number} nthJob the position of the job in the search result list
   * @returns {string}
   */
  async getJobLocation(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobLocation(nthJob).getText();
  }

  /**
   * Checks if the description of a search result is visible on the given position
   * @param {number} nthJob the position of the job in the search result list
   * @returns {promise.Promise<boolean>}
   */
  async isJobDescriptionVisible(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobDescription(nthJob).isDisplayed();
  }

  /**
   * Checks if the description of a search result is visible on the given position
   * @param {number} nthJob the position of the job in the search result list
   * @returns {promise.Promise<boolean>}
   */
  async isJobApplyButtonVisible(nthJob) {
    await this.waitForSearchResultList();
    return await this.jobApplyButton(nthJob).isDisplayed();
  }

  /**
   * Clicks the button of job present in the given position
   * @param {number} nthJob the position of the job in the search result list
   * @returns {promise.Promise<void>}
   */
  async clickJobApplyButton(nthJob) {
    return await this.jobApplyButton(nthJob).click();
  }

  /**
   * Waits for the page element to be present
   * @returns {WebElementPromise}
   */
  async waitForSearchResultList() {
    return browser.wait(ec.presenceOf(this.searchResults), GLOBAL_TIMEOUT);
  }
}

module.exports = SearchResultPage;
