function get_hotest_offers(){

    return new Promise(function(resolve, reject){
        var offers = [];
        offers.push({
            "url": "images/offer1.jpg",
            "id": "1"
        });

        offers.push({
            "url": "images/offer2.jpg",
            "id": "2"
        });

        offers.push({
            "url": "images/offer3.jpg",
            "id": "3"
        });

        resolve(offers);

    });
}

function get_post_details(){

    return new Promise(function(resolve, reject){


    });
}
