"use strict";

const GLOBAL_TIMEOUT = 40e3;

exports.config = {
  specs: "../specs/*.spec.js",
  multiCapabilities: [
    { browserName: "chrome", shardTestFiles: true, maxInstances: 1 },
    { browserName: "chrome", shardTestFiles: true, maxInstances: 1 },
  ],
  directConnect: true,
  mochaOpts: {
    reporter: "mochawesome-screenshots",
    reporterOptions: {
      reportDir: "mocha/ReportDir",
      reportName: "Report",
      reportTitle: "MochaReport",
      reportPageTitle: "ReportPageTitle",
      takePassedScreenshot: false,
      clearOldScreenshots: true,
      shortScrFileNames: false,
      jsonReport: false,
      multiReport: false,
    },
    timeout: 600000,
  },
  framework: "mocha",
  getPageTimeout: GLOBAL_TIMEOUT,
  onPrepare: async function () {
    global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
    global.ec = protractor.ExpectedConditions;

    const chai = require("chai");
    chai.use(require("chai-as-promised"));
    global.expect = chai.expect;

    await browser.waitForAngularEnabled(false);
    try {
      await browser.manage().window().maximize();
    } catch (e) {
      await browser.manage().window().setSize(1800, 1012);
    }
  },
};
