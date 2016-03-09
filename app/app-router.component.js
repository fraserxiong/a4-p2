System.register(['angular2/core', 'angular2/router', './home/app-home.component', './admin/admin-main.component', './search/search-display.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, app_home_component_1, admin_main_component_1, search_display_component_1;
    var AppRouterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_home_component_1_1) {
                app_home_component_1 = app_home_component_1_1;
            },
            function (admin_main_component_1_1) {
                admin_main_component_1 = admin_main_component_1_1;
            },
            function (search_display_component_1_1) {
                search_display_component_1 = search_display_component_1_1;
            }],
        execute: function() {
            AppRouterComponent = (function () {
                function AppRouterComponent() {
                }
                AppRouterComponent = __decorate([
                    core_1.Component({
                        selector: "main-app",
                        template: '<router-outlet></router-outlet>',
                        providers: [router_1.ROUTER_PROVIDERS],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/home',
                            name: 'Home',
                            component: app_home_component_1.AppHomeComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/admin',
                            name: 'Admin',
                            component: admin_main_component_1.AdminMainComponent
                        },
                        {
                            path: '/search/:query',
                            name: 'Search',
                            component: search_display_component_1.SearchComponent,
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppRouterComponent);
                return AppRouterComponent;
            }());
            exports_1("AppRouterComponent", AppRouterComponent);
        }
    }
});
//# sourceMappingURL=app-router.component.js.map