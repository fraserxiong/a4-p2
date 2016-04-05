'use strict';

exports.add_order_msg = function(app, account, order, dish, client, quantity){
  return app.db.models.Msg.findOne({user: account})
      .then(function (message){
        message.orderMsg.push({
            order_id: order,
            dish_id: dish,
            client_id: client,
            quantity: quantity
        });
        return message.save();
      });
  // app.db.models.Msg.findOne({user:account})
  // .exec(function (err, msg_obj) {
  //   if (err) {throw err; return false};
  //   msg_obj.orderMsg.push({
  //     order_id: order,
  //     dish_id: dish,
  //     client_id: client,
  //     quantity: quantity
  //   });
  //   msg_obj.save();
  //   return true;
  // });
  // return false;
};

exports.friend_request = function(app, account, friend_account){
  // account: account obj added by friend_account
  app.db.models.Msg.findOne({user:account})
  .exec(function (err, msg_obj) {
    if (err) {throw err; return false};
    if(msg_obj){
      // console.log(msg_obj);
      msg_obj.friendMsg.push({
        req_acc_id: friend_account
      });
      msg_obj.save();
      return true;
    }else{
      return false;
    }
  });
  return false;
};
