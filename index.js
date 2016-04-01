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

/*  Get recommendation for home page
    Returns 12 at most, no params required.
*/
app.get('/posts/recommended', function(req, res){
    db.Post.all(onSuccessWithReturnFactory(res));
});

/*  Get recommendation for home page
    Returns 12 at most, needs id of post in pathname.
*/
app.get('/posts/:id', function(req, res){
    var id = req.params.id;
    db.Post.find(id, onSuccessWithReturnFactory(res));
});

/*  Get recommendation for home page
    Returns 12 at most, need id and tags (separated by comma) in pathname.
*/
app.get('/posts/related/:id/:tags', function(req, res){
    var tags = req.params.tags;
    var id = req.params.id;
    tags = tags.split(",");
    db.Post.search_by_tag(id, tags, onSuccessWithReturnFactory(res))
});

/*  Get recommendation for home page
    Returns 12 at most, need query in pathname.
*/
app.get('/posts/search/:query', function(req, res){
    var query = req.params.query;
    db.Post.fuzzy_search(query, onSuccessWithReturnFactory(res))
});

/*  Get recommendation for home page
    Returns 12 at most, need post json as PAYLOAD.
*/
app.post('/posts/create', function(req, res){
    var payload = req.body; //Payload is the json object representing a post
    var post = db.Post.create({url: payload.url, 
                    location: payload.location, 
                    description: payload.description, 
                    name: payload.name, 
                    categories: payload.categories,
                    url: payload.url});
    post.save().then(function createPostSuccess(message){
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end('Success!' + message);
    }).catch(function createPostError(error){
        res.writeHead(403, {'Content-type' : 'text/plain'});
        res.end('Error!' + error);
    });
});

/*  Get recommendation for home page
    Returns 12 at most, need id in pathname and post json as PAYLOAD.
*/
app.put('/posts/update/:id', function(req, res){
    var id = req.params.id;
    db.Post.update(id, req.body, onSuccessFactory(res));
});

/*  Get recommendation for home page
    Returns 12 at most, need id in pathname.
*/
app.get('/posts/delete/:id', function(req, res){
    var id = req.params.id;
    db.Post.delete(id, onSuccessFactory(res));
});

// views is directory for all template files
app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname +'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function onSuccessFactory(res){
    return function(err, result){
        if(err)
            console.log(err);
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write("Success!");
        res.end();
    }
}

function onErrorFactory(err){
    res.writeHead(500, {'Content-type': 'text/plain'});
    res.write('Error!' + err);
    res.end();
}

function onSuccessWithReturnFactory(res){
    return function(err, results){
        if(err)
            return console.err(err);

        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(results));
        res.end();
    }
}
