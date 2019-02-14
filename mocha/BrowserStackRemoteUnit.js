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
      os: 'Windows',
      build: 'Test Build 01',
      project: 'My Awesome App',
      'browserstack.debug': true,
    };
    driver = new Builder()
      .usingHttpAgent(HttpAgent)
      .withCapabilities(capabilities)
      .usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
      .build();
  });

  it('should append query to title', function (done) {
    this.timeout(30000);
    driver.get('http://www.google.com/ncr').then(() => {
      driver.findElement(By.name('q')).then((element) => {
        element.sendKeys('BrowserStack', Key.RETURN).then(() => {
          driver.wait(until.stalenessOf(element)).then(() => driver.getTitle().then((title) => {
            assert.equal(title, 'BrowserStack - Google Search');
            done();
          }));
        });
      });
    });
  });

  after(function () {
    driver.quit();
  });
});
