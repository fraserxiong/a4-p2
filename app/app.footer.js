(function(app) {
  app.HomeFooter =
    ng.core.Component({
      selector: 'home-footer',
      templateUrl: "app/app.footer.html"
    })
    .Class({
        constructor: function() {},
    });
})(window.app || (window.app = {}));
