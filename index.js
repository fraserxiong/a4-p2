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



var bodyParser = require("body-parser");
var path = require('path');

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use('/css',express.static(path.resolve(__dirname,'css')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/app', express.static(path.resolve(__dirname,'app')));
app.use('/node_modules', express.static(path.resolve(__dirname,'node_modules')));





















var db = require('./mongodb/mongodb');
/* APIs */
app.get('/posts/recommended', function(req, res){

    console.log("Handling recommended posts\n");
    db.Post.all(onSuccessFactory(res));

});

app.get('/posts/:id', function(req, res){

    console.log("Handling post details\n");
    var id = req.params.id;
    db.Post.find(id, onSuccessFactory(res));
});

app.get('/posts/related/:tags', function(req, res){

    console.log("Handling related posts\n");
    var tags = req.params.tags;
    tags = tags.split(",");
    db.Post.search_by_tag(tags, onSuccessFactory(res))
});

app.get('/posts/search/:query', function(req, res){
    console.log("Handling search\n");
    var query = req.params.query;
    db.Post.fuzzy_search(query, onSuccessFactory(res))
});

app.post('/posts/create', function(req, res){
    console.log(req.body);
    var new_post = db.Post.create(req.body);
    new_post.save(function(err, post){
        if(err)
            console.log(err);
        console.log("Added to db!");
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write("Success!");
        res.end();
    });
});

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

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname +'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
