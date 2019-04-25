const { Builder, By, Key, until } = require('selenium-webdriver');
const http = require('http');

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY';

let HttpAgent = new http.Agent({
	keepAlive: true,
});

let capabilities = [
    {
        'browserName': 'Firefox',
        'browserstack.use_w3c': true,
        'bstack:options': {
            'os': 'Windows',
            'osVersion': '7',
            'sessionName': 'Firefox Test',
            'buildName': 'Test Build 01',
            'projectName': 'My Awesome App',
            'debug': true,
        },
    },
    {
        'browserName': 'Chrome',
        'browserstack.use_w3c': true,
        'bstack:options': {
            'os': 'Windows',
            'osVersion': '7',
            'sessionName': 'Chrome Test',
            'buildName': 'Test Build 01',
            'projectName': 'My Awesome App',
            'debug': true,
        },
    },
]
for (let index in capabilities) {
let driver = new Builder()
	.usingHttpAgent(HttpAgent)
	.withCapabilities(capabilities[index])
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
}