'use strict';

exports = module.exports = function(app, mongoose) {
  var friendSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    friend: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  });
  app.db.model('Friend', friendSchema);
};
