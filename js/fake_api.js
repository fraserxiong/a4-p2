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

function search_by_query(query){

    return new Promise(function(resolve, reject){
        var posts = [];

        posts.push({
            "url": "images/offer1.jpg",
            "location": "40 St. George Street.",
            "description": "St George Homemade Burgers",
            "name": "Burgers and Fries!",
            "tags": ["Fast", "Cheap"],
            "price": "$4.99"
        });

        posts.push({
            "url": "images/offer2.jpg",
            "location": "1001 Bay Street.",
            "description": "Homemade cheesecake for Valentine's!",
            "name": "Best Cheesecake in history",
            "tags": ["Sweet", "Desert"],
            "price": "$7.99"
        });

        posts.push({
            "url": "images/offer3.jpg",
            "location": "35 Hayden Street.",
            "description": "Fish and Chips! The Perfect Combo!",
            "name": "British tranditional food",
            "tags": ["Main", "Perfect combo"],
            "price": "$10.50"
        });

        resolve(posts);
    });
}
