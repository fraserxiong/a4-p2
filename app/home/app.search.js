(function(app) {
  app.HomeSearch =
    ng.core.Component({
      selector: 'home-search',
      templateUrl: "app/home/app.search.html"
    })
    .Class({
        constructor: function() {},

        ngAfterViewInit: function(){

            var searchBtn = document.getElementById("searchBtn");
            var input = document.getElementById("searchQuery");

            searchBtn.onclick = function(){
                if (!input.value)
                    return;

                window.location = "search.html?=" + input.value;
            }
        }
    });
})(window.app || (window.app = {}));
