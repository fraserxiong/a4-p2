(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.Home);
  });
})(window.app || (window.app = {}));
