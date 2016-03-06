(function(app) {
  app.HomeNew =
    ng.core.Component({
      selector: 'home-new',
      templateUrl: "app/app.new.html"
    })
    .Class({
        constructor: function() {},

        ngAfterViewInit: function(){
            var offerings = get_hotest_offers();

            var offer_one = document.getElementById("offer1");
            offer_one.src = offerings[0].url;
            var offer_two = document.getElementById("offer2");
            offer_two.src = offerings[1].url;
            var offer_three = document.getElementById("offer3");
            offer_three.src = offerings[2].url;
        }

    });
})(window.app || (window.app = {}));
