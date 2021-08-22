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
   * Gets the text of given element
   * @param {element} selector
   * @returns {promise.Promise<boolean>}
   */
  async getJobElementText(selector) {
    await this.waitForSearchResultList();
    return await selector.getText();
  }

  /**
   *  Checks if the given element is visible
   * @param {element} selector
   * @returns {promise.Promise<void>}
   */
  async isElementVisible(selector) {
    await this.waitForSearchResultList();
    return await selector.isDisplayed();
  }

  /**
   * Clicks the button of job present in the given position
   * @param {number} nthJob the position of the job in the search result list
   * @returns {promise.Promise<void>}
   */
  async clickJobApplyButton(nthJob) {
    return this.jobApplyButton(nthJob).click();
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
