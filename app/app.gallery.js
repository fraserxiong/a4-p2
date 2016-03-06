(function(app) {
  app.HomeGallery =
    ng.core.Component({
      selector: 'home-gallery',
      templateUrl: "app/app.gallery.html"
    })
    .Class({
      constructor: function() {
      }
    });
})(window.app || (window.app = {}));
