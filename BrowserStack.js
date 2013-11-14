var webdriver = require('browserstack-webdriver');

var capabilities = {
	'browserName' : 'firefox', 
	'browserstack.user' : 'USERNAME',
	'browserstack.key' : 'ACCESS_KEY'
}
var driver = new webdriver.Builder().
	usingServer('http://hub.browserstack.com/wd/hub').
	withCapabilities(capabilities).
	build();

driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
driver.findElement(webdriver.By.name('btnG')).click();
driver.wait(function() {
	return driver.getTitle().then(function(title) {
		return title === 'BrowserStack - Google Search';
	});
}, 1000);

driver.quit();
