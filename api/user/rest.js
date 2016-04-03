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
  console.log("what?");
  var frined_acc = req.app.db.models.Account.findById(req.params.friend_id);
  frined_acc.exec(function (err, friend_ref) {
    if (err) throw err;
    var cur_user = req.app.db.models.Friend.findOne({user:req.user.roles.account.id, });
    cur_user.exec(function (err, friend_obj) {
      if (err) throw err;
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
  user_obj.exec(function (err, user) {
    if (err) throw err;
    var result_obj = {
      'name': user.name.full,
      'avatar': user.avatar
    }
    res.send(JSON.stringify(result_obj));
  });
};


exports.search_user = function(req, res, next){
  var query = new RegExp(req.query.search, 'i');
  var acc_q = {
      $or: [
          {'name.full': query},
          {'phone': query}
          // {'user.id.email': query}
      ]
  };
  var acc_obj = req.app.db.models.Account.find(acc_q);
  acc_obj.exec(function(err, accounts){
    console.log(accounts);
    if (err) throw err;
    var result = [];
    for(var i = 0; i < accounts.length; i++){
      var account = accounts[i];
      result.push({
        'id': account._id,
        'name': account.name.full,
        'avatar': account.avatar
      });
    };
    res.send(JSON.stringify(result));
  })
};


exports.del_friend = function(req, res, next){
  console.log("what? del_friend");
  var frined_acc = req.app.db.models.Account.findById(req.params.friend_id);
  frined_acc.exec(function (err, friend_ref) {
    if (err) throw err;
    var cur_user = req.app.db.models.Friend.findOne({user:req.user.roles.account.id, });
    cur_user.exec(function (err, friend_obj) {
      if (err) throw err;
      if(friend_obj){
        var isInArray = friend_obj.friend.some(function (friend) {
          return friend.equals(friend_ref._id);
        });
        if(friend_obj.friend.length  == 0 || !isInArray){
          res.status(403).send("Friend not exist");
        }else{
          friend_obj.friend.pull(friend_ref);
          friend_obj.save();
          res.status(200).send("Delete friend success");
        }
      }else{
        res.status(403).send("Friend not exist");
      }
    });
  });
};


exports.get_friend_list = function(req, res, next){
  var cur_user = req.app.db.models.Friend.findOne({user:req.user.roles.account.id });
  cur_user.populate('frined user');
  cur_user.exec(function (err, friend_obj) {
    if (err) throw err;
    var friend_find = req.app.db.models.Account.find({_id: { $in: friend_obj.friend}});
    friend_find.exec(
      function(err, friend_list){
        if (err) throw err;
        var result = []
        for(var i = 0; i < friend_list.length; i++){
          result.push({
            'id': friend_list[i]._id,
            'name': friend_list[i].name.full,
            'avatar': friend_list[i].avatar
          });
        }
        return res.send(JSON.stringify(result));
      }
    );
  });
};
