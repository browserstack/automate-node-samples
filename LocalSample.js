var webdriver = require('browserstack-webdriver'),remote = require('browserstack-webdriver/remote');
var fs = require('fs');

if (process.argv.length !== 3) {
	console.log('Usage: node ' + __filename + ' selenium_server_jar');
	process.exit(1);
}
var jar = process.argv[2];
if (!fs.existsSync(jar)) {
	throw Error('The specified jar does not exist: ' + jar);
}
var server = new remote.SeleniumServer(jar, {port:4444});
server.start();
var driver = new webdriver.Builder().
	usingServer(server.address()).
	withCapabilities({'browserName': 'firefox'}).
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
server.stop();
