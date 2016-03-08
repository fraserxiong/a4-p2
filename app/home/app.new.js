(function(app) {
  app.HomeNew =
    ng.core.Component({
        selector: 'home-new',
        templateUrl: "app/home/app.new.html"
    })
    .Class({
        constructor: function() {},

        ngAfterViewInit: function(){

            get_hotest_offers().then(function(offerings){

                var nodes = [];
                nodes.push(document.getElementById("offer1"));
                nodes.push(document.getElementById("offer2"));
                nodes.push(document.getElementById("offer3"));

                setDisplayImage(nodes, offerings);
                setOnclick(nodes, offerings);

            }, function(err){
                console.log(err);
            });
        }

    });
})(window.app || (window.app = {}));

function setDisplayImage(nodes, offerings){
    for(var i = 0; i < nodes.length; i++){
        nodes[i].src = offerings[i].url;
    }
}

function setOnclick(nodes, offerings){

    for(var i = 0; i < nodes.length; i++){
        nodes[i].raw = offerings[i];
        nodes[i].onclick = function(e){
            window.location="details.html?id=" + this.raw.id;
        }
    }
}
