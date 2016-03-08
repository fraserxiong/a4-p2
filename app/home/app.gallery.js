(function(app) {
  app.HomeGallery =
    ng.core.Component({
      selector: 'home-gallery',
      templateUrl: "app/home/app.gallery.html"
    })
    .Class({
      constructor: function() {
      }
    });
})(window.app || (window.app = {}));
