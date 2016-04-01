'use strict';

exports = module.exports = function(app, mongoose) {
  var friendSchema = new mongoose.Schema({
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' }
    },
    friend: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' }
    }
  });
  friendSchema.index('user.name':1);
  friendSchema.add_friend = function(){
    
  };
  friendSchema.del_friend = function(){

  };
  app.db.model('Friend', friendSchema);
};
