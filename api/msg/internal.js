'use strict';

exports.add_order_msg = function(app, account, dish, order, quantity){
  app.db.models.Msg.findOne({user:account})
  .exec(function (err, msg_obj) {
    if (err) {throw err; return false};
    msg_obj.orderMsg.push({
      order_id: order,
      dish_id: dish,
      quantity: quantity
    });
    msg_obj.save();
    return true;
  });
  return false;
};

exports.friend_request = function(app, account, friend_account){
  // account: account obj added by friend_account
  app.db.models.Msg.findOne({user:account})
  .exec(function (err, msg_obj) {
    if (err) {throw err; return false};
    console.log(msg_obj);
    msg_obj.friendMsg.push({
      req_acc_id: friend_account
    });
    msg_obj.save();
    return true;
  });
  return false;
};
