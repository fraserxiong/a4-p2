var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

app.use('/css',express.static(path.resolve(__dirname,'css')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/app', express.static(path.resolve(__dirname,'app')));
app.use('/node_modules', express.static(path.resolve(__dirname,'node_modules')));

var db = require('./mongodb/mongodb');

/* APIs */
app.get('/posts/recommended', function(req, res){
    db.Post.all(onSuccessFactory(res));
});

app.get('/posts/:id', function(req, res){
    var id = req.params.id;
    db.Post.find(id, onSuccessFactory(res));
});

app.get('/posts/related/:id/:tags', function(req, res){
    var tags = req.params.tags;
    var id = req.params.id;
    tags = tags.split(",");
    db.Post.search_by_tag(id, tags, onSuccessFactory(res))
});

app.get('/posts/search/:query', function(req, res){
    var query = req.params.query;
    db.Post.fuzzy_search(query, onSuccessFactory(res))
});

app.post('/posts/create', function(req, res){
    var new_post = db.Post.create(req.body);
    new_post.save(function(err, post){
        if(err)
            console.log(err);
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write("Success!");
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

function onSuccessFactory(res){
    return function(err, results){
        if(err)
            return console.err(err);

        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(results));
        res.end();
    }
}
