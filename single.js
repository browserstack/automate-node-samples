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
	os: 'Windows',
	build: 'Test Build 01',
	project: 'My Awesome App',
	'browserstack.debug': true,
};

let driver = new Builder()
	.usingHttpAgent(HttpAgent)
	.withCapabilities(capabilities)
	.usingServer(`http://${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
	.build();

driver.get('http://www.google.com/ncr').then(() => {
	driver.findElement(By.name('q')).then((element) => {
		element.sendKeys('BrowserStack', Key.RETURN).then(() => {
			driver.wait(until.titleContains('BrowserStack')).then(() => driver.getTitle().then((title) => {
				console.log(title);
				driver.quit();
			}));
		})
	});
});

