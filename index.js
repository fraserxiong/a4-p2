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

for(var i = 1; i <= 3; i++){
    var p = Post.create(i, "images/offer" + i + ".jpg");
    p.save(function(err, p){
        if(err)
            console.log(err);
        console.log("Added dummy data!");
    });
}

app.set('port', (process.env.PORT || 5000));

app.use('/css',express.static(path.resolve(__dirname,'css')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/app', express.static(path.resolve(__dirname,'app')));
app.use('/node_modules', express.static(path.resolve(__dirname,'node_modules')));

app.get('/posts/recommended', function(req, res){

    console.log("Handling recommended posts\n");
    Post.all(function(err, posts){

        if (err)
            return console.err(err);

        var result = [];
        posts.forEach(function(p){
            result.push(p);
        });
        console.log("Post all callback: " + err + ", " + result);
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(result));
        res.end();
    });

});
// views is directory for all template files
app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname +'/index.html'));
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
