'use strict';

exports.get_friend_msg = function(req, res, next){
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
