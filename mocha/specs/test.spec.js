"use strict";

const { expect } = require("chai");
const data = require("../data/data.json");
const CareerPage = require("../../page_objects/basePage");
const SearchResultPage = require("../../page_objects/searchResultPage");
const JobDescriptionPage = require("../../page_objects/jobDescriptionPage.js");
const careerPage = new CareerPage();
const searchResultPage = new SearchResultPage();
const jobDescriptionPage = new JobDescriptionPage();

data.forEach(testData => {
  describe(`Search for ${testData.positionName} job`, function () {
    this.timeout(GLOBAL_TIMEOUT);

    beforeEach(async () => {
      careerPage.load();
      careerPage.cookieClicker();
    });

    describe("Careers page", () => {
      it("should be opened", () => {
        expect(careerPage.header.logo.isDisplayed()).to.eventually.be.true;
      });
    });

    describe("Search form", () => {
      it("should be displayed", () => {
        expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
      });

      describe("Location Filter Box", () => {
        beforeEach(async () => {
          await careerPage.selectLocation(testData.country, testData.city);
        });

        it(`should be able to select ${testData.city} city and ${testData.country} country`, async () => {
          expect(careerPage.renderedCity.getText()).to.eventually.equal(testData.city);
        });
      });

      describe("Department Filter Box", () => {
        beforeEach(async () => {
          await careerPage.selectDepartment(testData.department);
        });

        it(`should be able to select ${testData.department} department`, () => {
          expect(careerPage.correctDepartment(testData.department)).to.eventually.be.true;
        });
      });

      describe("Searching", () => {
        beforeEach(async () => {
          await careerPage.selectLocation(testData.country, testData.city);
          await careerPage.selectDepartment(testData.department);
          await careerPage.search();
        });

        it(`should have ${testData.positionName} job found`, async () => {
          expect(await searchResultPage.getJobElementText(searchResultPage.jobName(testData.nthJob))).to.equal(
            testData.positionName
          );
        });

        it(`should have ${testData.positionName} job with ${testData.country} location`, async () => {
          expect(await searchResultPage.getJobElementText(searchResultPage.jobLocation(testData.nthJob))).to.include(
            testData.country.toUpperCase()
          );
        });

        it(`should have ${testData.positionName} job with description`, async () => {
          expect(searchResultPage.isElementVisible(searchResultPage.jobDescription(testData.nthJob))).to.eventually.be
            .true;
        });

        it(`should have apply button for ${testData.positionName} job`, async () => {
          expect(searchResultPage.isElementVisible(searchResultPage.jobApplyButton(testData.nthJob))).to.eventually.be
            .true;
        });
      });

      describe(`Applying to ${testData.positionName} position`, () => {
        beforeEach(async () => {
          await careerPage.selectLocation(testData.country, testData.city);
          await careerPage.selectDepartment(testData.department);
          await careerPage.search();
          await searchResultPage.clickJobApplyButton(testData.nthJob);
        });

        it(`should have displayed ${testData.positionName} as the name of the position`, async () => {
          expect(await jobDescriptionPage.getLabel(jobDescriptionPage.position)).to.equal(testData.positionName);
        });

        it(`should have displayed ${testData.country} as the location of the position`, async () => {
          expect(await jobDescriptionPage.getLabel(jobDescriptionPage.location)).to.include(
            testData.country.toUpperCase()
          );
        });
      });
    });
  });
});
