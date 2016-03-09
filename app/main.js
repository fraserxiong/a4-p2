System.register(['angular2/platform/browser', './app-router.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_router_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_router_component_1_1) {
                app_router_component_1 = app_router_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_router_component_1.AppRouterComponent);
        }
    }
});
//# sourceMappingURL=main.js.map