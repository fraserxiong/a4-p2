(function(app) {
    document.addEventListener('DOMContentLoaded', function() {
        ng.platform.browser.bootstrap(app.Search);
    });
})(window.app || (window.app = {}));
