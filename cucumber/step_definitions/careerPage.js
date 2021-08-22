"use strict";

const { Given, When, Then, Before, setDefaultTimeout } = require("cucumber");
const { expect } = require("chai");
const { element, browser } = require("protractor");
const CareerPage = require("../../page_objects/basePage");
const SearchResultPage = require("../../page_objects/searchResultPage");
const JobDescriptionPage = require("../../page_objects/jobDescriptionPage.js");
const careerPage = new CareerPage();
const searchResultPage = new SearchResultPage();
const jobDescriptionPage = new JobDescriptionPage();
let i = 0;
setDefaultTimeout(GLOBAL_TIMEOUT);

Before(() => {
  console.log(`\n${++i}. Test:`);
});

Given(/the career page is opened/, async function () {
  return careerPage.load();
});

When(/the cookie bar is closed/, async function () {
  return careerPage.cookieClicker();
});

When(/(.*) and (.*) selected in the location filter box/, async function (country, city) {
  return careerPage.selectLocation(country, city);
});

When(/(.*) selected in the department filter box/, async function (department) {
  return careerPage.selectDepartment(department);
});

When(/the search button is clicked/, async function () {
  return careerPage.search();
});

When(/the apply button on the (.*) is clicked/, async function (nthJob) {
  return searchResultPage.clickJobApplyButton(nthJob);
});

Then(/the logo should be visible/, async function () {
  return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
});

Then(/the searchform should be visible/, async function () {
  return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
});

Then(/the (.*) location should be selected/, async function (city) {
  return expect(careerPage.renderedCity.getText()).to.eventually.equal(city);
});

Then(/the (.*) department should be selected/, async function (department) {
  return expect(careerPage.correctDepartment(department)).to.eventually.be.true;
});

Then(/the correct url should be present for the search results page/, async function () {
  return expect(await searchResultPage.urlOfSearchResultPage()).to.include("job-listings?");
});

Then(/should have a proper job found for (.*) on the (.*). position/, async function (positionName, nthJob) {
  return expect(await searchResultPage.getJobElementText(searchResultPage.jobName(nthJob))).to.equal(positionName);
});

Then(/the proper location in the (.*). result should be (.*)/, async function (nthJob, country) {
  return expect(await searchResultPage.getJobElementText(searchResultPage.jobLocation(nthJob))).to.include(
    country.toUpperCase()
  );
});

Then(/description should be visible in the (.*). result/, async function (nthJob) {
  return expect(searchResultPage.isElementVisible(searchResultPage.jobDescription(nthJob))).to.eventually.be.true;
});

Then(/apply button should be visible on the (.*). result/, async function (nthJob) {
  return expect(searchResultPage.isElementVisible(searchResultPage.jobApplyButton(nthJob))).to.eventually.be.true;
});

Then(/the correct url should be present for the job details page/, async function () {
  return expect(await jobDescriptionPage.urlOfJobDescriptionPage()).to.include("job-listings/job");
});

Then(/should have (.*) position name in the job description/, async function (positionName) {
  return expect(await jobDescriptionPage.getLabel(jobDescriptionPage.position)).to.equal(positionName);
});

Then(/should have (.*) country in the job description/, async function (country) {
  return expect(await jobDescriptionPage.getLabel(jobDescriptionPage.location)).to.include(country.toUpperCase());
});
