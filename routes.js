'use strict';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.set('X-Auth-Required', 'true');
  req.session.returnUrl = req.originalUrl;
  res.redirect('/login/');
}

function apiEnsureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.set('X-Auth-Required', 'true');
  req.session.returnUrl = req.originalUrl;
  res.status(403).send("You have no permission");
}

function ensureAdmin(req, res, next) {
  if (req.user.canPlayRoleOf('admin')) {
    return next();
  }
  res.redirect('/');
}

function ensureAccount(req, res, next) {
  if (req.user.canPlayRoleOf('account')) {
    if (req.app.config.requireAccountVerification) {
      if (req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(req.url)) {
        return res.redirect('/account/verification/');
      }
    }
    return next();
  }
  res.redirect('/');
}

function apiEnsureAccount(req, res, next) {
  if (req.user.canPlayRoleOf('account')) {
    if (req.app.config.requireAccountVerification) {
      if (req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(req.url)) {
        return res.redirect('/account/verification/');
      }
    }
    return next();
  }
  res.status(404).send("Account Error");
}

exports = module.exports = function (app, passport) {
  //front end
  app.get('/', require('./views/index').init);
  app.get('/about/', require('./views/about/index').init);
  app.get('/contact/', require('./views/contact/index').init);
  app.post('/contact/', require('./views/contact/index').sendMessage);

  // User info
  app.get('/unauth/api/account/user/:user_id/', require("./api/user/rest").get_basic_user_info);
  app.all('/api/account*', apiEnsureAuthenticated);
  app.all('/api/account*', apiEnsureAccount);
  app.get('/api/account/user/settings', require('./api/user/rest').get_user_settings);
  app.get('/api/account/user/friend/', require("./api/user/rest").get_friend_list);
  app.put('/api/account/user/add_friend/:friend_id/', require('./api/user/rest').add_friend);
  app.delete('/api/account/user/del_friend/:friend_id/', require("./api/user/rest").del_friend);
  app.get('/api/account/user', require('./api/user/rest').get_user);
  app.get('/api/account/', require("./api/user/rest").search_user);

  app.all('/api/msg*', apiEnsureAuthenticated);
  app.all('/api/msg*', apiEnsureAccount);
  app.get('/api/msg/friend/', require("./api/msg/rest").get_friend_msg);

  //sign up
  app.get('/signup/', require('./views/signup/index').init);
  app.post('/signup/', require('./views/signup/index').signup);

  //social sign up
  app.post('/signup/social/', require('./views/signup/index').signupSocial);
  app.get('/signup/twitter/', passport.authenticate('twitter', { callbackURL: '/signup/twitter/callback/' }));
  app.get('/signup/twitter/callback/', require('./views/signup/index').signupTwitter);
  app.get('/signup/github/', passport.authenticate('github', { callbackURL: '/signup/github/callback/', scope: ['user:email'] }));
  app.get('/signup/github/callback/', require('./views/signup/index').signupGitHub);
  app.get('/signup/facebook/', passport.authenticate('facebook', { callbackURL: '/signup/facebook/callback/', scope: ['email'] }));
  app.get('/signup/facebook/callback/', require('./views/signup/index').signupFacebook);
  app.get('/signup/google/', passport.authenticate('google', { callbackURL: '/signup/google/callback/', scope: ['profile email'] }));
  app.get('/signup/google/callback/', require('./views/signup/index').signupGoogle);
  app.get('/signup/tumblr/', passport.authenticate('tumblr', { callbackURL: '/signup/tumblr/callback/' }));
  app.get('/signup/tumblr/callback/', require('./views/signup/index').signupTumblr);

  //login/out
  app.get('/login/', require('./views/login/index').init);
  app.post('/login/', require('./views/login/index').login);
  app.get('/login/forgot/', require('./views/login/forgot/index').init);
  app.post('/login/forgot/', require('./views/login/forgot/index').send);
  app.get('/login/reset/', require('./views/login/reset/index').init);
  app.get('/login/reset/:email/:token/', require('./views/login/reset/index').init);
  app.put('/login/reset/:email/:token/', require('./views/login/reset/index').set);
  app.get('/logout/', require('./views/logout/index').init);

  //social login
  app.get('/login/twitter/', passport.authenticate('twitter', { callbackURL: '/login/twitter/callback/' }));
  app.get('/login/twitter/callback/', require('./views/login/index').loginTwitter);
  app.get('/login/github/', passport.authenticate('github', { callbackURL: '/login/github/callback/' }));
  app.get('/login/github/callback/', require('./views/login/index').loginGitHub);
  app.get('/login/facebook/', passport.authenticate('facebook', { callbackURL: '/login/facebook/callback/' }));
  app.get('/login/facebook/callback/', require('./views/login/index').loginFacebook);
  app.get('/login/google/', passport.authenticate('google', { callbackURL: '/login/google/callback/', scope: ['profile email'] }));
  app.get('/login/google/callback/', require('./views/login/index').loginGoogle);
  app.get('/login/tumblr/', passport.authenticate('tumblr', { callbackURL: '/login/tumblr/callback/', scope: ['profile email'] }));
  app.get('/login/tumblr/callback/', require('./views/login/index').loginTumblr);

  //admin
  app.all('/admin*', ensureAuthenticated);
  app.all('/admin*', ensureAdmin);
  app.get('/admin/', require('./views/admin/index').init);

  //admin > users
  app.get('/admin/users/', require('./views/admin/users/index').find);
  app.post('/admin/users/', require('./views/admin/users/index').create);
  app.get('/admin/users/:id/', require('./views/admin/users/index').read);
  app.put('/admin/users/:id/', require('./views/admin/users/index').update);
  app.put('/admin/users/:id/password/', require('./views/admin/users/index').password);
  app.put('/admin/users/:id/role-admin/', require('./views/admin/users/index').linkAdmin);
  app.delete('/admin/users/:id/role-admin/', require('./views/admin/users/index').unlinkAdmin);
  app.put('/admin/users/:id/role-account/', require('./views/admin/users/index').linkAccount);
  app.delete('/admin/users/:id/role-account/', require('./views/admin/users/index').unlinkAccount);
  app.delete('/admin/users/:id/', require('./views/admin/users/index').delete);

  //admin > administrators
  app.get('/admin/administrators/', require('./views/admin/administrators/index').find);
  app.post('/admin/administrators/', require('./views/admin/administrators/index').create);
  app.get('/admin/administrators/:id/', require('./views/admin/administrators/index').read);
  app.put('/admin/administrators/:id/', require('./views/admin/administrators/index').update);
  app.put('/admin/administrators/:id/permissions/', require('./views/admin/administrators/index').permissions);
  app.put('/admin/administrators/:id/groups/', require('./views/admin/administrators/index').groups);
  app.put('/admin/administrators/:id/user/', require('./views/admin/administrators/index').linkUser);
  app.delete('/admin/administrators/:id/user/', require('./views/admin/administrators/index').unlinkUser);
  app.delete('/admin/administrators/:id/', require('./views/admin/administrators/index').delete);

  //admin > admin groups
  app.get('/admin/admin-groups/', require('./views/admin/admin-groups/index').find);
  app.post('/admin/admin-groups/', require('./views/admin/admin-groups/index').create);
  app.get('/admin/admin-groups/:id/', require('./views/admin/admin-groups/index').read);
  app.put('/admin/admin-groups/:id/', require('./views/admin/admin-groups/index').update);
  app.put('/admin/admin-groups/:id/permissions/', require('./views/admin/admin-groups/index').permissions);
  app.delete('/admin/admin-groups/:id/', require('./views/admin/admin-groups/index').delete);

  //admin > accounts
  app.get('/admin/accounts/', require('./views/admin/accounts/index').find);
  app.post('/admin/accounts/', require('./views/admin/accounts/index').create);
  app.get('/admin/accounts/:id/', require('./views/admin/accounts/index').read);
  app.put('/admin/accounts/:id/', require('./views/admin/accounts/index').update);
  app.put('/admin/accounts/:id/user/', require('./views/admin/accounts/index').linkUser);
  app.delete('/admin/accounts/:id/user/', require('./views/admin/accounts/index').unlinkUser);
  app.post('/admin/accounts/:id/notes/', require('./views/admin/accounts/index').newNote);
  app.post('/admin/accounts/:id/status/', require('./views/admin/accounts/index').newStatus);
  app.delete('/admin/accounts/:id/', require('./views/admin/accounts/index').delete);

  //admin > statuses
  app.get('/admin/statuses/', require('./views/admin/statuses/index').find);
  app.post('/admin/statuses/', require('./views/admin/statuses/index').create);
  app.get('/admin/statuses/:id/', require('./views/admin/statuses/index').read);
  app.put('/admin/statuses/:id/', require('./views/admin/statuses/index').update);
  app.delete('/admin/statuses/:id/', require('./views/admin/statuses/index').delete);

  //admin > categories
  app.get('/admin/categories/', require('./views/admin/categories/index').find);
  app.post('/admin/categories/', require('./views/admin/categories/index').create);
  app.get('/admin/categories/:id/', require('./views/admin/categories/index').read);
  app.put('/admin/categories/:id/', require('./views/admin/categories/index').update);
  app.delete('/admin/categories/:id/', require('./views/admin/categories/index').delete);

  //admin > search
  app.get('/admin/search/', require('./views/admin/search/index').find);

  //account
  app.all('/account*', ensureAuthenticated);
  app.all('/account*', ensureAccount);
  app.get('/account/', require('./views/account/index').init);

  //account > verification
  app.get('/account/verification/', require('./views/account/verification/index').init);
  app.post('/account/verification/', require('./views/account/verification/index').resendVerification);
  app.get('/account/verification/:token/', require('./views/account/verification/index').verify);

  //account > settings
  app.get('/account/settings/', require('./views/account/settings/index').init);
  app.put('/account/settings/', require('./views/account/settings/index').update);
  app.put('/account/settings/identity/', require('./views/account/settings/index').identity);
  app.put('/account/settings/password/', require('./views/account/settings/index').password);

  //account > settings > social
  app.get('/account/settings/twitter/', passport.authenticate('twitter', { callbackURL: '/account/settings/twitter/callback/' }));
  app.get('/account/settings/twitter/callback/', require('./views/account/settings/index').connectTwitter);
  app.get('/account/settings/twitter/disconnect/', require('./views/account/settings/index').disconnectTwitter);
  app.get('/account/settings/github/', passport.authenticate('github', { callbackURL: '/account/settings/github/callback/' }));
  app.get('/account/settings/github/callback/', require('./views/account/settings/index').connectGitHub);
  app.get('/account/settings/github/disconnect/', require('./views/account/settings/index').disconnectGitHub);
  app.get('/account/settings/facebook/', passport.authenticate('facebook', { callbackURL: '/account/settings/facebook/callback/' }));
  app.get('/account/settings/facebook/callback/', require('./views/account/settings/index').connectFacebook);
  app.get('/account/settings/facebook/disconnect/', require('./views/account/settings/index').disconnectFacebook);
  app.get('/account/settings/google/', passport.authenticate('google', { callbackURL: '/account/settings/google/callback/', scope: ['profile email'] }));
  app.get('/account/settings/google/callback/', require('./views/account/settings/index').connectGoogle);
  app.get('/account/settings/google/disconnect/', require('./views/account/settings/index').disconnectGoogle);
  app.get('/account/settings/tumblr/', passport.authenticate('tumblr', { callbackURL: '/account/settings/tumblr/callback/' }));
  app.get('/account/settings/tumblr/callback/', require('./views/account/settings/index').connectTumblr);
  app.get('/account/settings/tumblr/disconnect/', require('./views/account/settings/index').disconnectTumblr);

  // posts
  var post_api = require('./api/post/post')(app);

  app.get('/posts/recommended', function(req, res){
      post_api.all(onSuccessWithReturnFactory(res));
  });

  app.get('/posts/:id', function(req, res){
      var id = req.params.id;
      post_api.find(id, onSuccessWithReturnFactory(res));
  });

  app.get('/posts/related/:id/:tags', function(req, res){
      var tags = req.params.tags;
      var id = req.params.id;
      tags = tags.split(",");
      post_api.search_by_tag(id, tags, onSuccessWithReturnFactory(res))
  });

  app.get('/posts/search/:query', function(req, res){
      var query = req.params.query;
      post_api.fuzzy_search(query, onSuccessWithReturnFactory(res))
  });

  app.all('/posts/*', ensureAuthenticated);
  app.all('/posts/*', ensureAccount);

  app.post('/posts/create', function(req, res){
      var payload = req.body; //Payload is the json object representing a post
      var post = post_api.create({url: payload.url,
                      location: payload.location,
                      description: payload.description,
                      name: payload.name,
                      categories: payload.categories,
                      user: req.user.roles.account.id,
                      price:payload.price});

      post.save().then(function createPostSuccess(message){
          app.db.models.Account
               .findOne(req.user.roles.account.id)
               .populate("dishes")
               .exec(function(err, account){
                   if(err)
                      console.log(err);
                   account.dishes.push(post);
                   account.save(function(err, result){
                      if (err)routers
                          console.log(err);
                      res.writeHead(200, {'Content-type': 'text/plain'});
                      res.end('Success!' + message);
                   });
               });
      }).catch(function createPostError(error){
          res.writeHead(403, {'Content-type' : 'text/plain'});
          res.end('Error!' + error);
      });
  });

  app.put('/posts/update/:id', function(req, res){
      var id = req.params.id;
      post_api.update(id, req.body, onSuccessFactory(res));
  });

  app.delete('/posts/delete/:id', function(req, res){
      var id = req.params.id;
      post_api.delete(id, onSuccessFactory(res));
  });

  app.get('/posts/auth/posts_by_user', function(req, res){
      console.log("Handling post by user request");
      console.log(req.user.roles.account.id);
      post_api.find_by_user(req.user.roles.account.id, onSuccessWithReturnFactory(res));
  });

  //comments
  var comment_api = require('./api/post/comment')(app);

  app.get('/comments/get_all/:id', function(req, res){
      var id = req.params.id;
      var user;
      if(req.user)
        user = req.user.roles.account.id;
      else
        user = null;
      comment_api.all(user, id, onSuccessWithReturnFactory(res));
  });

  app.all('/comments/*', ensureAuthenticated);
  app.all('/comments/*', ensureAccount);

  app.post('/comments/create', function(req, res){
      var payload = req.body; //Payload is the json object representing a post
      var comment = comment_api.create({
                      message: payload.message,
                      rating: payload.rating,
                      date: payload.date,
                      user: req.user.roles.account.id});

      comment.save().then(function(message){
          app.db.models.Post
               .findOne({id: payload.target_id})
               .populate("comments")
               .exec(function(err, post){
                   if(err)
                      console.log(err);
                   post.comments.push(comment);
                   post.save(function(err, result){
                      if (err)
                          console.log(err);
                      res.writeHead(200, {'Content-type': 'text/plain'});
                      res.end('Success!' + message);
                   });
               });
      }).catch(function createPostError(error){
          res.writeHead(403, {'Content-type' : 'text/plain'});
          res.end('Error!' + error);
      });
  });

  app.delete('/comments/delete/:id', function(req, res){
     var id = req.params.id;
     comment_api.delete(id, onSuccessFactory(res));
  });

    //orders
  var Order = require('./api/order/order')(app).Order;
  app.all('/orders/*', ensureAuthenticated);
  app.all('/orders/*', ensureAccount);

  var MessageInternal = require('./api/msg/internal');
  app.post('/orders', function(req, res){
    var payload = req.body; //Body is already parsed as an json object thanks to body-parser.json() middleware
    var dishes = payload.dishes;
    var userId = req.user.roles.account.id;
    var address = payload.address;
    var order = new Order({user: userId, address: address});

    //Logic Behind: Searches all dishes(posts) in db (parallelly) and add its _id into the order
    Promise.all(dishes.map(function postSearchIterator(dish){
      var dishId = dish.dish.id;
      return new Promise(function(resolve, reject){
        app.db.models.Post.findOne({'id': dishId})
              .then(function(post){
                resolve(post);
              })
              .catch(function(error){
                reject(error);
              })
      })
      .then(function(post){
        order.dishes.push({dish: post._id, quantity: dish.quantity});
      })
    }))
    .then(function orderSave(){
      return order.save()
          .then(function(order){
            res.writeHead(200, {'Content-type': 'application/json'});
            res.write(JSON.stringify(order));
            res.end();
            return order;
        })
    })
    .then(function orderMsg(order){
      var orderId = order._id;
      var clientId = order.user;
      var address = order.address;
      return Promise.all(order.dishes.map(function orderDishesIterator(dishInfo){
        return app.db.models.Post.findOne({'_id': dishInfo.dish})
              .then(function(post){
                return MessageInternal.add_order_msg(app, post.user, orderId, post._id, clientId, dishInfo.quantity);
              })
      }));
    })
    .catch(function(error){
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('Order Creation Error: ' + error);
        res.end();
    });
  });

  app.get('/accounts/:account_id/orders', function(req, res){
    var accountId = req.params.account_id;
    Order.find({'user': accountId}, {'user': 0})
      .populate('dishes.dish')
      .then(function orderRetrieval (orders){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(orders));
        res.end();
      })
      .catch(function(error){
        res.writeHead(404, {'Content-type' : 'text/plain'});
        res.write("Can't Find Orders: " + error);
        res.end();
      });
    });


};

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
            console.log(err);

        console.log(results);
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(results));
        res.end();
    }
}
