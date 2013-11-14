var assert = require('assert'),
fs = require('fs');

var webdriver = require('browserstack-webdriver')
test = require('browserstack-webdriver/testing');

test.describe('Google Search', function() {
  var driver, server;

  test.before(function() {
    var capabilities = {
      'browserName' : 'firefox', 
      'browserstack.user' : 'USERNAME',
      'browserstack.key' : 'ACCESS_KEY'
    }
    driver = new webdriver.Builder().
      usingServer('http://hub.browserstack.com/wd/hub').
      withCapabilities(capabilities).
      build();
  });
  
  test.it('should append query to title', function() {
    driver.get('http://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
    driver.findElement(webdriver.By.name('btnG')).click();
    driver.wait(function() {
      return driver.getTitle().then(function(title) {
        return 'BrowserStack - Google Search' === title;
      });
    }, 1000);
  });

  test.after(function() { driver.quit(); });
});
