BrowserStack-nightwatch
=========

Sample for using nightwatch with BrowserStack Automate.

###Install nightwatch.js
*Starting and pre-requite: [nightwatch]*
- `npm install -g nightwatch`

###Configuring the json
 - Open `settings.json`
 - Add `browserstack.user` and `browserstack.key` with your BrowserStack credentials. Don't have one? Get one on BrowserStack [dashboard]
 - Add / customise more [capabilities] to `desiredCapabilities` in `settings.json`

###Sample test
 - Path: `tests/google/googleTest.js`
 - To run: `nightwatch -t ./tests/google/googleTest.js -c ./settings.json`

[nightwatch]:http://nightwatchjs.org/guide
[capabilities]:http://www.browserstack.com/automate/capabilities
[dashboard]:https://www.browserstack.com/automate
