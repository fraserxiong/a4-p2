var express = require('express');
var path = require('path');
var app = express();

/* Mongo db schemas */
var Post = require('./mongodb_schemas/post');

/* Mongo db setup */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/posts');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to Mongodb\n");
});

app.set('port', (process.env.PORT || 5000));

app.use('/css',express.static(path.resolve(__dirname,'css')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/app', express.static(path.resolve(__dirname,'app')));
app.use('/node_modules', express.static(path.resolve(__dirname,'node_modules')));

/* APIs */
app.get('/posts/recommended', function(req, res){

    console.log("Handling recommended posts\n");
    Post.all(onSuccessFactory(res));

});

app.get('/posts/:id', function(req, res){

    console.log("Handling post details\n");
    var id = req.params.id;
    Post.find(id, onSuccessFactory(res));
});

app.get('/posts/related/:tags', function(req, res){

    console.log("Handling related posts\n");
    var tags = req.params.tags;
    tags = tags.split(",");
    Post.search_by_tag(tags, onSuccessFactory(res))
});

app.get('/posts/search/:query', function(req, res){
    console.log("Handling search\n");
    var query = req.params.query;
    Post.fuzzy_search(query, onSuccessFactory(res))
})

function onSuccessFactory(res){
    return function(err, results){
        if(err)
            return console.err(err);

        console.log(results);
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(results));
        res.end();
    }
}
// views is directory for all template files
app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname +'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// var dummy = [
//     {
//         id: 1,
//         url: "images/offer1.jpg",
//         location: "40 St. George Street.",
//         description: "St George Homemade Burgers",
//         name: "Burgers and Fries!",
//         categories: ["Fast", "Cheap"],
//         price: 4.99
//     },
//     {
//         id: 2,
//         url: "images/offer2.jpg",
//         location: "1001 Bay Street.",
//         description: "Homemade cheesecake for Valentine's!",
//         name: "Best Cheesecake in history",
//         categories: ["Sweet", "Desert"],
//         price: 7.99
//     },
//     {
//         id: 3,
//         url: "images/offer3.jpg",
//         location: "35 Hayden Street.",
//         description: "Fish and Chips! The Perfect Combo!",
//         name: "British tranditional food",
//         categories: ["Main", "Perfect combo"],
//         price: 10.50
//     },
//     {
//         id: 4,
//         url: "images/offer4.jpg",
//         location: "35 Hayden Street.",
//         description: "For a full on omega-3 fix, this bento is ideal. Marinate cooked shrimp overnight in an onion, garlic, oregano, and olive oil mixture. A starberry cake is aside and the meal’s done! A bed of salad greens adds a little color (and, well, good-for-you stuff including vitamins A, C, K, and folate).",
//         name: "Marinated Shrimp Salad",
//         categories: ["Lunch", "Perfect combo"],
//         price: 8.99
//     },
//     {
//         id: 5,
//         url: "images/offer5.jpg",
//         location: "1001 bay Street.",
//         description: "The perfect comfort food for cold winter days, these little nuggets of deliciousness will pack the perfect punch for you, whether you eat them straight up, with a side of vinegar, doused in soy sauce, or dipped in hot chilli sauce.",
//         name: "Delicious dumpling",
//         categories: ["Lunch", "Quick"],
//         price: 7.49
//     },
//     {
//         id: 6,
//         url: "images/offer6.jpg",
//         location: "38 elm Street.",
//         description: "We make all our burgers fresh giving them the homemade taste that we all love. Try our original burger, cheese burger, bacon burger, chicken burger, fish burger or the Tat burger signature super burger. We also serve chicken, steaks, sandwiches, salads and much more.",
//         name: "super Hamburger",
//         categories: ["Lunch", "Perfect combo"],
//         price: 10.50
//     },
//     {
//         id: 7,
//         url: "images/offer7.jpg",
//         location: "777 bay Street.",
//         description: "We offer a selection of French Macarons, ranging from our signature flavours to our limited edition macarons. Build a box using our roster of more than 50 fun flavours!",
//         name: "Macarons",
//         categories: ["French", "Desert"],
//         price: 4.00
//     },
//     {
//         id: 8,
//         url: "images/offer8.jpeg",
//         location: "832 bay Street.",
//         description: "Italian Plum Tomato Sauce, Cheese, Proscuitto, Slow Roasted Roma Tomatoes, Black Olives, Asiago Cheese, Roasted Garlic and sprinkled with Parsley.",
//         name: "Yummy Pizza",
//         categories: ["Italian", "Pizza"],
//         price: 12.00
//     },
//     {
//         id: 9,
//         url: "images/offer9.jpg",
//         location: "222 elm Street.",
//         description: "Somewhere over the rainbow… is the spectacular Rainbow Cake! Far from a baking fantasy, this multi-coloured marvel of moist sponge layers and lightly whipped white frosting is no illusion. Perfect for birthdays, celebrations and parties, this cake is available in a selection of sizes and comes topped with your choice of chocolate-flavoured, straberry-flavoured or vanilla-flavoured frosting.",
//         name: "Rainbow Cakes",
//         categories: ["Desert","Party"],
//         price: 30.00
//     },
//     {
//         id: 10,
//         url: "images/offer10.jpg",
//         location: "1 bloor Street.",
//         description: "Made with a tasty Japanese soy sauce to create a tangy and savoury, yet light taste. Topped off with our famous roasted pork. Seasonal toping: marinated bamboo shoot.",
//         name: "Shoyu Ramen",
//         categories: ["Japanese"],
//         price: 12.99
//     },
//     {
//         id: 11,
//         url: "images/offer11.jpg",
//         location: "1 bloor Street.",
//         description: "Stir-Fried Shanghai Noodles made with stir-fried pork, Napa cabbage, garlic and a rich and flavorful sauce.",
//         name: "Stir-fried shanghai noodles",
//         categories: ["Chinese","Noodle"],
//         price: 9.99
//     },
//     {
//         id: 12,
//         url: "images/offer12.jpg",
//         location: "8 Park Road.",
//         description: "Spaghetti topped with house-made sauce with beef, pork, onions, Romano cheese, tomatoes. Traditional or spicy. ",
//         name: "Traditional Spaghetti",
//         categories: ["Italian","Spaghetti"],
//         price: 13.00
//     },
//     {
//         id: 13,
//         url: "images/offer13.jpg",
//         location: "8 Park Road.",
//         description: "We believe that the secret of good sushi is to always select best ingredients, and never compromise on quality. Our Japanese supplier flies fish from Tokyo bay within 24 hours after it has been taken from the water. we serve fish in the evening that we has purchased the same morning, never keeping fish overnight.",
//         name: "Sushi King",
//         categories: ["Janpanese","Sushi"],
//         price: 20
//     }
//
// ]
// for(var i = 0; i < dummy.length; i++){
//     var p = Post.create(dummy[i]);
//     p.save(function(err, p){
//         if(err)
//             console.log(err);
//         console.log("Added dummy data!");
//     });
// }
