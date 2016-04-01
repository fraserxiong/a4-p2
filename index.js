'use strict';


var config = require('./config'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    helmet = require('helmet'),
    csrf = require('csurf');

//create express app
var app = express();

//keep reference to config
app.config = config;

//setup the web server
app.server = http.createServer(app);

//setup mongoose
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  //and... we have a data store
});

//config data models
require('./models')(app, mongoose);

//settings
app.disable('x-powered-by');
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(require('morgan')('dev'));
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, 'public')));
app.use(require('method-override')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cryptoKey));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.cryptoKey,
  store: new mongoStore({ url: config.mongodb.uri })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf({ cookie: { signed: true } }));
helmet(app);

//response locals
app.use(function(req, res, next) {
  res.cookie('_csrfToken', req.csrfToken());
  res.locals.user = {};
  res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  next();
});

//global locals
app.locals.projectName = app.config.projectName;
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = app.config.companyName;
app.locals.cacheBreaker = 'br34k-01';

//setup passport
require('./passport')(app, passport);

//setup routes
require('./routes')(app, passport);

//custom (friendly) error handler
app.use(require('./views/http/index').http500);

//setup utilities
app.utility = {};
app.utility.sendmail = require('./util/sendmail');
app.utility.slugify = require('./util/slugify');
app.utility.workflow = require('./util/workflow');


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

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname +'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
