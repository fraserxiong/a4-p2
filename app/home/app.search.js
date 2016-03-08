(function(app) {
  app.HomeSearch =
    ng.core.Component({
      selector: 'home-search',
      templateUrl: "app/home/app.search.html"
    })
    .Class({
        constructor: function() {},
    });
})(window.app || (window.app = {}));
