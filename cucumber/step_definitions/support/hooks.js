const { After, Status } = require("cucumber");
const { browser } = require("protractor");
const fs = require("fs");

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await browser.takeScreenshot();
    writeScreenShot(screenshot, `./cucumber/screenshots/${scenario.pickle.name}.png`);
  }
});

function writeScreenShot(data, filename) {
  let stream = fs.createWriteStream(filename);
  stream.write(Buffer.from(data, "base64"));
  stream.end();
}
