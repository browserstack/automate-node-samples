module.exports = function helloBrowserStack(browser, cb) {
  browser.title(function(err, title) {
    console.log("Title for the page: "+title)
    browser.elementByName('q', function(err, el) {
      el.sendKeys("BrowserStack", function() {
        browser.elementByName("btnG", function(err,el) {
          el.click(function() {
            browser.quit();
          })
        })
      })
    })
  })
};
