'use strict';

exports.get_friend_msg = function(req, res, next){
  req.app.db.models.Msg.findOne({user:req.user.roles.account.id})
  .populate('friendMsg.req_acc_id')
  .exec(function (err, msg_obj) {
    if (err) throw err;
    var friMsg_list = msg_obj.friendMsg;
    friMsg_list.sort(function(before, after){
      if(before.timeCreated < after.timeCreated){
        return 1;
      }else if (before.timeCreated == after.timeCreated) {
        return 0;
      }else{
        return -1;
      }
    })
    var friMsg = [];
    for(var i = 0; i<friMsg_list.length; i++){
      // console.log(friMsg_list[i]);
      friMsg.push({
        'avatar': friMsg_list[i].req_acc_id.avatar,
        'id': friMsg_list[i].req_acc_id._id,
        'name': friMsg_list[i].req_acc_id.name.full,
        // 'zip': friMsg_list[i].req_acc_id.zip,
        // 'address': friMsg_list[i].req_acc_id.address,
        'email':friMsg_list[i].req_acc_id.user.id.email
        // 'phone':friMsg_list[i].req_acc_id.phone
      });
    }
    // console.log(friMsg);
    res.send(JSON.stringify(friMsg));
  });
};

exports.accept_friend_msg = function(req, res, next){
  req.app.db.models.Msg.findOne({user:req.user.roles.account.id})
  .populate('friendMsg.req_acc_id')
  .exec(function (err, msg_obj) {
    console.log(msg_obj);
    if (err) throw err;
    if(msg_obj){
      var isInArray = msg_obj.friendMsg.some(function (friend) {
        if(friend.req_acc_id.equals(req.params.acc_id)){
          msg_obj.friendMsg.pull(friend);
          msg_obj.save();
          return true;
        }else{
          return false;
        }
      });
      if(msg_obj.friendMsg.length  == 0 || !isInArray){
        res.status(403).send("Friend request not exist");
      }else{
        req.app.db.models.Account.findById(req.params.acc_id)
        .populate('user.id')
        .exec(function (err, friend_ref) {
          if (err) throw err;
          req.app.db.models.Friend.findOne({user:req.user.roles.account.id, })
          .populate('user')
          .exec(function (err, friend_obj) {
            if (err) throw err;
            if(friend_ref && friend_obj){
              var isInArray = friend_obj.friend.some(function (friend) {
                return friend.equals(friend_ref._id);
              });
              if(friend_obj.friend.length > 0 && isInArray){
                res.status(200).send("Success But Already added");
              }else{
                friend_obj.friend.push(friend_ref);
                friend_obj.save();
                // console.log(friend_obj);
                res.status(200).send("Add friend success");
              }
            }else{
              res.status(403).send("User error");
            }
        });
      });
      }
    }else{
      res.status(403).send("User error");
    }
  });
};

exports.decline_friend_msg = function(req, res, next){
  req.app.db.models.Msg.findOne({user:req.user.roles.account.id})
  .populate('friendMsg.req_acc_id')
  .exec(function (err, msg_obj) {
    console.log(msg_obj);
    if (err) throw err;
    if(msg_obj.friendMsg){
      var isInArray = msg_obj.friendMsg.some(function (friend) {
        if(friend.req_acc_id.equals(req.params.acc_id)){
          msg_obj.friendMsg.pull(friend);
          msg_obj.save();
          return true;
        }else{
          return false;
        }
      });
      if(isInArray){
        res.status(200).send("Accept friend success");
      }else{
        res.status(403).send("Request not exist");
      }
    }else{
      res.status(403).send("User error");
    }
  });
};


exports.get_order_msg = function(req, res, next){
  req.app.db.models.Msg.findOne({user:req.user.roles.account.id})
  .populate('orderMsg.order_id')
  .populate('orderMsg.dish_id')
  .populate('orderMsg.client_id')
  .exec(function (err, msg_obj) {
    if (err) throw err;
    var ordMsg_list = msg_obj.orderMsg;
    if(ordMsg_list.length > 0){
      ordMsg_list.sort(function(before, after){
        if(before.timeCreated < after.timeCreated){
          return 1;
        }else if (before.timeCreated == after.timeCreated) {
          return 0;
        }else{
          return -1;
        }
      })
      var ordMsg = [];
      for(var i = 0; i<ordMsg_list.length; i++){
        // console.log(friMsg_list[i]);
        ordMsg.push({
          'image':ordMsg_list[i].dish_id.url,
          'dish_name':ordMsg_list[i].dish_id.name,
          'client_name':ordMsg_list[i].client_id.name.full,
          'address':ordMsg_list[i].order_id.address,
          'phone':ordMsg_list[i].client_id.phone
        });
      }
      // console.log(friMsg);
      res.send(JSON.stringify(ordMsg));
    }else{
      res.send(JSON.stringify([]));
    }
  });
};
