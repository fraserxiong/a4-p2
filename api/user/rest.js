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
  var cur_user = req.app.db.models.Friend.findOne({user:req.user.roles.account.id}, "user friend", function (err, person) {
  if (err) return handleError(err);});
  console.log(cur_user);
};
