System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AppOfferService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppOfferService = (function () {
                function AppOfferService() {
                }
                AppOfferService.prototype.get_hotest_offers = function () {
                    var images = [
                        { id: 1, url: "images/offer1.jpg" },
                        { id: 2, url: "images/offer2.jpg" },
                        { id: 3, url: "images/offer3.jpg" },
                    ];
                    return Promise.resolve(images);
                };
                AppOfferService.prototype.get_post_details = function () {
                    return Promise.resolve(null);
                };
                AppOfferService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AppOfferService);
                return AppOfferService;
            }());
            exports_1("AppOfferService", AppOfferService);
        }
    }
});
//# sourceMappingURL=app-offer.service.js.map