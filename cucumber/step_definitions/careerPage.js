"use strict";

const { Given, When, Then, Before, setDefaultTimeout } = require("cucumber");
const { expect } = require("chai");
const { element, browser } = require("protractor");
let i = 0;
setDefaultTimeout(GLOBAL_TIMEOUT);

Before(() => {
  console.log(`\n${++i}. Test:`);
});

Given(/the career page is opened/, async function () {
  return browser.get("https://www.epam.com/careers");
});

When(/the cookie bar is closed/, async function () {
  return cookieClicker();
});
When(/(.*) selected in the department filter box/, async function (department) {
  return selectDepartment(department);
});
When(/(.*) and (.*) selected in the location filter box/, async function (country, city) {
  return selectLocation(country, city);
});
When(/the search button is clicked/, async function () {
  return await element(by.css(".recruiting-search__submit")).click();
});
When(/the apply button for (.*) is clicked/, async function (positionName) {
  const jobFormat = positionName.toLowerCase().split(" ").join("-");
  return applyForJob(jobFormat);
});

Then(/the logo should be visible/, async function () {
  return expect(element(by.css(".header__logo")).isDisplayed()).to.eventually.be.true;
});
Then(/the searchform should be visible/, async function () {
  return expect(element(by.css(".job-search__form")).isDisplayed()).to.eventually.be.true;
});

Then(/the (.*) location should be selected/, async function (city) {
  return expect(element(by.css(".select2-selection__rendered")).getText()).to.eventually.equal(city);
});

Then(/the (.*) department should be selected/, async function (department) {
  return expect(element(by.css(`li[data-value="${department}"]`)).isEnabled()).to.eventually.be.true;
});

Then(/the correct url should be present for the search results page/, async function () {
  const url = await browser.getCurrentUrl();
  expect(url).to.include("job-listings?");
});
Then(/should have a proper job found for (.*) on the (.*). position/, async function (positionName, nthJob) {
  const jobFormat = positionName.toLowerCase().split(" ").join("-");
  return expect(
    element(by.css(`a.search-result__item-name[href*='.${jobFormat}']`)).isDisplayed()
  ).to.eventually.be.true;
});
Then(/the proper location in the (.*). result should be (.*)/, async function (nthJob, country) {
  const location = await element
    .all(by.css(".search-result__item"))
    .get(nthJob - 1)
    .element(by.cssContainingText(".search-result__location", country))
    .getText();
  return expect(location).to.include(country.toUpperCase());
});
Then(/description should be visible in the (.*). result/, async function (nthJob) {
  let desc = await element
    .all(by.css(".search-result__item"))
    .get(nthJob - 1)
    .element(by.css(".search-result__item-description"));
  return expect(desc.isDisplayed()).to.eventually.be.true;
});
Then(/apply button should be visible for the (.*) position/, async function (positionName) {
  const jobFormat = positionName.toLowerCase().split(" ").join("-");
  const button = await element(by.css(`a.search-result__item-apply[href*='.${jobFormat}']`));
  const buttonText = await element(by.css(`a.search-result__item-apply[href*='.${jobFormat}']`)).getText();
  expect(button.isDisplayed()).to.eventually.be.true;
  return expect(buttonText).to.include("VIEW AND APPLY");
});

Then(/the correct url should be present for the job details page/, async function () {
  const url = await browser.getCurrentUrl();
  expect(url).to.include("job-listings/job");
});
Then(/should have (.*) position name in the job description/, async function (positionName) {
  const position = await element(by.css(".form-component__description div")).getText();
  return expect(position).to.equal(positionName);
});
Then(/should have (.*) country in the job description/, async function (country) {
  const location = await element(by.css(".form-component__location")).getText();
  return expect(location).to.include(country.toUpperCase());
});

async function cookieClicker() {
  let isPresent = await browser.isElementPresent(by.css(".cookie-disclaimer__button"));
  if (isPresent) {
    await element(by.css(".cookie-disclaimer__button")).click();
  }
}

async function selectLocation(country, city) {
  if ((await element(by.css(".select2-selection__rendered")).getText()) !== city) {
    await element(by.css(".select2-selection__arrow")).click();
    browser.sleep(1000);
    await element(by.css(`li[aria-label="${country}"]`)).click();
    await element(by.css(`[id*="${city}"]`)).click();
  }
}

async function selectDepartment(department) {
  await element(by.css(".selected-params")).click();
  browser.wait(ec.elementToBeClickable(element(by.css(".multi-select-dropdown-container"))), GLOBAL_TIMEOUT);
  await element(by.cssContainingText("span", `${department}`)).click();
}

async function applyForJob(jobFormat) {
  await element(by.cssContainingText(`a[href*='.${jobFormat}']`, "View and apply")).click();
  browser.wait(ec.presenceOf(element(by.css(".form-component__description div"))), GLOBAL_TIMEOUT);
}
