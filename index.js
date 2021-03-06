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
    // compress  = require('compression'),
    // csrf = require('csurf');
    autoIncrement = require('mongoose-auto-increment');

//create express app
var app = express();

//keep reference to config
app.config = config;

//setup the web server
app.server = http.createServer(app);

//setup mongoose
mongoose.connect(config.mongodb.uri);
app.db = mongoose.connection;
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  //and... we have a data store
});
autoIncrement.initialize(app.db);

//config data models
require('./models')(app, mongoose);

//settings
app.disable('x-powered-by');
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
// app.use(compress());  
app.use(require('compression')());
app.use(require('morgan')('dev'));
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
// app.use(csrf({ cookie: { signed: true } }));
app.use(helmet());

//response locals
app.use(function(req, res, next) {
  // res.cookie('_csrfToken', req.csrfToken());
  res.locals.user = {};
  res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  next();
});


// upload stuff
var multiparty = require('multiparty');
var fs = require('fs');
app.post('/uploadFile', function(req, res) {
    var form = new multiparty.Form();
    form.on('file', function(name,file){
        console.log(file.path);
        console.log(__dirname);
        var tmp_path = file.path
        var target_path = './uploads/' + path.parse(file.path).base;
        fs.rename(tmp_path, target_path, function(err) {
            if(err) console.error(err.stack);

            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write('/uploads/' + path.parse(file.path).base);
            res.end();
        });
    });
    form.on('error', function(err){
        console.log(err);
    });
    form.parse(req);
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
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/app', express.static(path.resolve(__dirname,'app')));
app.use('/node_modules', express.static(path.resolve(__dirname,'node_modules')));

//Let angular handle routing from now on
app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname +'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
