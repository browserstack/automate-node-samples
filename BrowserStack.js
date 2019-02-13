const { Builder, By, Key, until } = require('selenium-webdriver');
const http = require('http');

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY';

let HttpAgent = new http.Agent({
	keepAlive: true,
});

let capabilities = {
	browserName: 'Firefox',
	name: 'Firefox Test',
	os: 'Windows'
};

(async () => {
	let driver = new Builder()
		.usingHttpAgent(HttpAgent)
		.withCapabilities(capabilities)
		.usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
		.build();
	try {
		await driver.get('http://www.google.com/ncr');
		await driver.findElement(By.name('q')).sendKeys('Browserstack', Key.RETURN);
		console.log(await driver.getTitle());
	} finally {
		await driver.quit();
	}
})();