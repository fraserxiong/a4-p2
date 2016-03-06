(function(app) {
  app.Home =
    ng.core.Component({
      selector: 'home',
      templateUrl: "app/app.home.html"
    })
    .Class({
      constructor: function() {
          ng.platform.browser.bootstrap(app.HomeGallery);
          ng.platform.browser.bootstrap(app.HomeNew);
          ng.platform.browser.bootstrap(app.HomeSearch);
          ng.platform.browser.bootstrap(app.HomeFooter);
      }
    });
})(window.app || (window.app = {}));
