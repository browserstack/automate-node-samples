var assert = require('assert');

const { Builder, By, Key, until } = require('selenium-webdriver');
const http = require('http');

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY';

let HttpAgent = new http.Agent({
  keepAlive: true,
});

describe('Google Search', function () {
  let driver;

  before(function () {
    let capabilities = {
      browserName: 'Firefox',
      name: 'Firefox Test',
      os: 'Windows'
    };
    driver = new Builder()
      .usingHttpAgent(HttpAgent)
      .withCapabilities(capabilities)
      .usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
      .build();
  });

  it('should append query to title', async function () {
    this.timeout(15000);
    await driver.get('http://www.google.com/ncr');
    let searchElement = await driver.findElement(By.name('q'));
    await searchElement.sendKeys('BrowserStack', Key.RETURN);
    let title = await driver.getTitle();
    assert.equal(title, 'BrowserStack - Google Search');
  });

  after(function () {
    driver.quit();
  });
});
