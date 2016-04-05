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
        'email':friMsg_list[i].req_acc_id.user.id.email,
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
  .sort({'friendMsg.timeCreated': -1})
  .exec(function (err, msg_obj) {
    console.log(msg_obj);
    if (err) throw err;
    res.send(JSON.stringify({}));
  });
};

exports.decline_friend_msg = function(req, res, next){
  req.app.db.models.Msg.findOne({user:req.user.roles.account.id})
  .populate('friendMsg.req_acc_id')
  .sort({'friendMsg.timeCreated': -1})
  .exec(function (err, msg_obj) {
    console.log(msg_obj);
    if (err) throw err;
    res.send(JSON.stringify({}));
  });
};


exports.get_order_msg = function(req, res, next){
  req.app.db.models.Msg.findOne({user:req.user.roles.account.id})
  .exec(function (err, msg_obj) {
    if (err) throw err;
    res.send(JSON.stringify(result_obj));
  });
};
