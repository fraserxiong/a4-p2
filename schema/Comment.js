'use strict';

exports = module.exports = function(app, mongoose){
    var autoIncrement = require('mongoose-auto-increment');

    var commentSchema = mongoose.Schema({
        message: String,
        rating: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
        date: String
    });
    commentSchema.plugin(autoIncrement.plugin, {
        model: 'Comment',
        field: 'id',
        startAt: 1,
        incrementBy: 1
    });
    app.db.model('Comment', commentSchema);
}
