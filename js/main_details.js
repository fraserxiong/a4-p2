(function(app) {
    document.addEventListener('DOMContentLoaded', function() {
        ng.platform.browser.bootstrap(app.Details);
    });
})(window.app || (window.app = {}));
