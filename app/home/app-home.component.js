System.register(['angular2/core', './app-gallery.component', './app-offer.component', './app-search.component', '../app-footer.component'], function(exports_1, context_1) {
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
    var core_1, app_gallery_component_1, app_offer_component_1, app_search_component_1, app_footer_component_1;
    var AppHomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_gallery_component_1_1) {
                app_gallery_component_1 = app_gallery_component_1_1;
            },
            function (app_offer_component_1_1) {
                app_offer_component_1 = app_offer_component_1_1;
            },
            function (app_search_component_1_1) {
                app_search_component_1 = app_search_component_1_1;
            },
            function (app_footer_component_1_1) {
                app_footer_component_1 = app_footer_component_1_1;
            }],
        execute: function() {
            AppHomeComponent = (function () {
                function AppHomeComponent() {
                }
                AppHomeComponent = __decorate([
                    core_1.Component({
                        selector: "home",
                        templateUrl: "app/home/app-home.component.html",
                        styleUrls: ["css/style.css"],
                        directives: [app_gallery_component_1.AppGalleryComponent, app_offer_component_1.AppOfferComponent, app_search_component_1.AppSearchComponent, app_footer_component_1.AppFooterComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppHomeComponent);
                return AppHomeComponent;
            }());
            exports_1("AppHomeComponent", AppHomeComponent);
        }
    }
});
//# sourceMappingURL=app-home.component.js.map