'use strict';

var renderSettings = function(req, res, next, oauthMessage) {
  var outcome = {};

  var getAccountData = function(callback) {
    req.app.db.models.Account.findById(req.user.roles.account.id, 'name company phone zip').exec(function(err, account) {
      if (err) {
        return callback(err, null);
      }

      outcome.account = account;
      callback(null, 'done');
    });
  };

  var getUserData = function(callback) {
    req.app.db.models.User.findById(req.user.id, 'username email twitter.id github.id facebook.id google.id tumblr.id').exec(function(err, user) {
      if (err) {
        callback(err, null);
      }

      outcome.user = user;
      return callback(null, 'done');
    });
  };

  var asyncFinally = function(err, results) {
    if (err) {
      return next(err);
    }

    res.send(JSON.stringify({
      data: {
        account: outcome.account,
        user: outcome.user
      },
      oauthMessage: oauthMessage,
      oauthTwitter: !!req.app.config.oauth.twitter.key,
      oauthTwitterActive: outcome.user.twitter ? !!outcome.user.twitter.id : false,
      oauthGitHub: !!req.app.config.oauth.github.key,
      oauthGitHubActive: outcome.user.github ? !!outcome.user.github.id : false,
      oauthFacebook: !!req.app.config.oauth.facebook.key,
      oauthFacebookActive: outcome.user.facebook ? !!outcome.user.facebook.id : false,
      oauthGoogle: !!req.app.config.oauth.google.key,
      oauthGoogleActive: outcome.user.google ? !!outcome.user.google.id : false,
      oauthTumblr: !!req.app.config.oauth.tumblr.key,
      oauthTumblrActive: outcome.user.tumblr ? !!outcome.user.tumblr.id : false
    }));
  };

  require('async').parallel([getAccountData, getUserData], asyncFinally);
};

exports.get_user_settings = function(req, res, next){
  renderSettings(req, res, next, '');
};

exports.get_user = function(req, res, next){
  return res.send(JSON.stringify(res.locals.user));
};

exports.add_friend = function(req, res, next){
  var frined_acc = req.app.db.models.Account.findById(req.params.friend_id);
  frined_acc.exec(function (err, friend_ref) {
    if (err) return handleError(err);
    var cur_user = req.app.db.models.Friend.findOne({user:req.user.roles.account.id, });
    cur_user.exec(function (err, friend_obj) {
      if (err) return handleError(err);
      var isInArray = friend_obj.friend.some(function (friend) {
        return friend.equals(friend_ref._id);
      });
      if(friend_obj.friend.length > 0 && isInArray){
        res.status(403).send("Already added");
      }else{
        friend_obj.friend.push(friend_ref);
        friend_obj.save();
        res.status(200).send("Add friend success");
      }
    });
  });
};

exports.get_basic_user_info = function(req, res, next){
  var user_obj = req.app.db.models.Account.findOne({_id:req.params.user_id});
  user_obj.populate('avatar', 'name');
  user_obj.exec(function (err, user) {
    if (err) return handleError(err);
    var result_obj = {
      'name': user.name.full,
      'avatar': user.avatar
    }
    return res.send(JSON.stringify(result_obj));
  });
};


exports.search_user = function(req, res, next){
  console.log('search_user');
  var query = new RegExp(req.query.search, 'i');
  var acc_q = {
      $or: [
          {'name.full': query},
          {'phone': query},
          {'user.email': query}
      ]
  };
  var acc_obj = req.app.db.models.Account.find(acc_q);
  acc_obj.exec(function(err, accounts){
    console.log(accounts);
    if (err) return handleError(err);
    var result = [];
    for(var i = 0; i < accounts.length; i++){
      var account = accounts[i];
      result.push({
        'id': account._id,
        'name': account.name.full,
        'avatar': account.avatar
      });
    };
    return res.send(JSON.stringify(result));
  })
};
