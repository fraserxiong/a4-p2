'use strict';

exports = module.exports = function(app, mongoose) {
  var friendSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    friend: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
  });
  app.db.model('Friend', friendSchema);
};
