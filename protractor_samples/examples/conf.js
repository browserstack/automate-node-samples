// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'version': '22.0',
    'browserstack.user': '<BrowserStack Username>',
    'browserstack.key': '<BrowserStack Key>'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['example_spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
