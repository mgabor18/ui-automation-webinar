"use strict";

const { expect } = require("chai");
const { element, browser } = require("protractor");
const data = require("../data/data.json");

data.forEach(testData => {
  describe("Search for job", function () {
    this.timeout(GLOBAL_TIMEOUT);

    const jobFormat = testData.positionName.toLowerCase().split(" ").join("-");

    beforeEach(async () => {
      await load();
    });

    describe("Careers page", () => {
      it("should be opened", () => {
        expect(element(by.css(".header__logo")).isDisplayed()).to.eventually.be.true;
      });
    });

    describe("Search form", () => {
      it("should be displayed", () => {
        expect(element(by.css(".job-search__form")).isDisplayed()).to.eventually.be.true;
      });

      describe("Location Filter Box", () => {
        beforeEach(async () => {
          await selectLocation(testData);
        });

        it("should be able to select city and country", async () => {
          expect(element(by.css(".select2-selection__rendered")).getText()).to.eventually.equal(testData.city);
        });
      });

      describe("Department Filter Box", () => {
        beforeEach(async () => {
          await selectDepartment(testData);
        });

        it("should be able to select department ", () => {
          expect(element(by.css(`li[data-value="${testData.department}"]`)).isEnabled()).to.eventually.be.true;
        });
      });

      describe("Searching", () => {
        beforeEach(async () => {
          await searchJob(testData);
        });

        it("should have proper job found ", async () => {
          expect(element(by.css(`a.search-result__item-name[href*='.${jobFormat}']`)).isDisplayed()).to.eventually.be
            .true;
        });

        it("should have jobs with proper location", async () => {
          const location = await element
            .all(by.css(".search-result__item"))
            .get(0)
            .element(by.cssContainingText(".search-result__location", testData.country))
            .getText();
          expect(location).to.include(testData.country.toUpperCase());
        });

        it("should have jobs with description", async () => {
          let desc = await element
            .all(by.css(".search-result__item"))
            .get(0)
            .element(by.css(".search-result__item-description"));
          expect(desc.isDisplayed()).to.eventually.be.true;
        });

        it("should have apply button for job", async () => {
          const button = await element(by.css(`a.search-result__item-apply[href*='.${jobFormat}']`));
          const buttonText = await element(by.css(`a.search-result__item-apply[href*='.${jobFormat}']`)).getText();
          expect(button.isDisplayed()).to.eventually.be.true;
          expect(buttonText).to.include("VIEW AND APPLY");
        });
      });

      describe("Applying to position", () => {
        beforeEach(async () => {
          await applyForJob(testData);
        });

        it("should have displayed the name of the position", async () => {
          const position = await element(by.css(".form-component__description div")).getText();
          expect(position).to.equal(testData.positionName);
        });

        it("should have displayed the city of the position", async () => {
          const location = await element(by.css(".form-component__location")).getText();
          expect(location).to.include(testData.country.toUpperCase());
        });
      });
    });
  });
});

async function load() {
  await browser.get("https://www.epam.com/careers");
  await browser.wait(ec.elementToBeClickable(element(by.css(".header__logo"))), GLOBAL_TIMEOUT);
  await cookieClicker();
}

async function cookieClicker() {
  let isPresent = await browser.isElementPresent(by.css(".cookie-disclaimer__button"));
  if (isPresent) {
    await element(by.css(".cookie-disclaimer__button")).click();
  }
}

async function applyForJob(data) {
  await searchJob(data);
  const jobFormat = data.positionName.toLowerCase().split(" ").join("-");
  browser.wait(
    ec.elementToBeClickable(element(by.cssContainingText(`a[href*='.${jobFormat}']`, "View and apply"))),
    GLOBAL_TIMEOUT
  );
  await element(by.cssContainingText(`a[href*='.${jobFormat}']`, "View and apply")).click();
  await browser.wait(ec.presenceOf(element(by.css(".form-component__description div"))), GLOBAL_TIMEOUT);
}

async function searchJob(data) {
  await selectLocation(data);
  await selectDepartment(data);
  await element(by.css(".recruiting-search__submit")).click();
}

async function selectLocation(data) {
  if ((await element(by.css(".select2-selection__rendered")).getText()) !== data.city) {
    await element(by.css(".select2-selection__arrow")).click();
    browser.sleep(1000);
    await element(by.css(`li[aria-label="${data.country}"]`)).click();
    await element(by.css(`[id*="${data.city}"]`)).click();
  }
}

async function selectDepartment(data) {
  await element(by.css(".selected-params")).click();
  browser.wait(ec.elementToBeClickable(element(by.css(".multi-select-dropdown-container"))), GLOBAL_TIMEOUT);
  await element(by.xpath(`//span[contains(text(),'${data.department}')]`)).click();
}
