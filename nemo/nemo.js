var Nemo = require('nemo');
var nemo = Nemo(__dirname, function (err) {
  //always check for errors!
  if (!!err) {
    return console.error('Error during Nemo setup', err);
  }
  nemo.driver.getCapabilities().
    then(function (caps) {
      console.log("Nemo successfully launched", caps.caps_.browserName);
    });
  nemo.driver.get(nemo.data.baseUrl);
  nemo.view._waitVisible('#header-buttons #ul-btn').click();
  nemo.view._waitVisible('#createAccount').click();
  nemo.view._waitVisible('#personalSignUpForm').click();
  nemo.view._waitVisible('#email').then(function () {
    console.log('loaded the signup form');
    nemo.driver.quit();
  }, function (err) {
    console.log('a funny thing happened on the way to the signup form');
    console.error(err);
    nemo.driver.quit();
  });
});