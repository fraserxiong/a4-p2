'use strict';

exports = module.exports = function(app, mongoose) {
  var msgSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    orderMsg: [{
      order_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
      dish_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
      quantity:{type: Number},
      timeCreated: { type: Date, default: Date.now }
    }],
    friendMsg: [{
      req_acc_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Friend'},
      timeCreated: { type: Date, default: Date.now }
    }]
  });
  app.db.model('Msg', msgSchema);
};
