'use strict';

var msg_api = require('../msg/internal.js');

var renderSettings = function(req, res, next, oauthMessage) {
  var outcome = {};

  var getAccountData = function(callback) {
    req.app.db.models.Account.findById(req.user.roles.account.id, 'name phone zip avatar address').exec(function(err, account) {
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
  req.app.db.models.Account.findById(req.user.roles.account.id)
  .exec(function (err, user) {
    if (err) throw err;
    var result_obj = {
      'name': user.name.full,
      'avatar': user.avatar,
    }
    res.send(JSON.stringify(result_obj));
  });
};

exports.add_friend = function(req, res, next){
  req.app.db.models.Account.findById(req.params.friend_id)
  .exec(function (err, friend_ref) {
    if (err) throw err;
    req.app.db.models.Friend.findOne({user:req.user.roles.account.id, })
    .exec(function (err, friend_obj) {
      if (err) throw err;
      var isInArray = friend_obj.friend.some(function (friend) {
        return friend.equals(friend_ref._id);
      });
      if(friend_obj.friend.length > 0 && isInArray){
        res.status(403).send("Already added");
      }else{
        friend_obj.friend.push(friend_ref);
        friend_obj.save();
        msg_api.friend_request(req.app, friend_ref, friend_obj);
        res.status(200).send("Add friend success");
      }
    });
  });
};

exports.get_basic_user_info = function(req, res, next){
  req.app.db.models.Account.findOne({_id:req.params.user_id})
  .exec(function (err, user) {
    if (err) throw err;
    var result_obj = {
      'name': user.name.full,
      'avatar': user.avatar,
    }
    res.send(JSON.stringify(result_obj));
  });
};


exports.search_user = function(req, res, next){
  var query = new RegExp(req.query.search, 'i');
  req.app.db.models.User.find({'email':query})
  .select('roles')
  .exec(function(err, user_list){
    // console.log(user_list);
    var id_list = [];
    for(var i=0; i<user_list.length; i++){
      id_list.push(user_list[i].roles.account);
    }
    var acc_q = {
        $or: [
            {'name.full': query},
            {'phone': query},
            {'_id': { $in: id_list}}
        ]
    };
    // console.log(id_list);
    req.app.db.models.Account.find(acc_q)
    .exec(function(err, accounts){
      // console.log(accounts);
      if (err) {console.log(err); throw err};
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
      // res.status(200).send("Test pass");
    });
  });
};


exports.del_friend = function(req, res, next){
  // console.log("what? del_friend");
  req.app.db.models.Account.findById(req.params.friend_id)
  .exec(function (err, friend_ref) {
    if (err) throw err;
    req.app.db.models.Friend.findOne({user:req.user.roles.account.id, })
    .exec(function (err, friend_obj) {
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
    if(friend_obj){
      req.app.db.models.Account.find({_id: { $in: friend_obj.friend}})
      .populate('user.id')
      .exec(
        function(err, friend_list){
          if (err) throw err;
          var result = []
          for(var i = 0; i < friend_list.length; i++){
            result.push({
              'id': friend_list[i]._id,
              'name': friend_list[i].name.full,
              'avatar': friend_list[i].avatar,
              'zip': friend_list[i].zip,
              'address': friend_list[i].address,
              'email':friend_list[i].user.id.email
            });
          }
          return res.send(JSON.stringify(result));
        }
      );
    }else{
      res.status(403).send("No Friend");
    }
  });
};
