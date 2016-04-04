'use strict';

exports = module.exports = function(app, mongoose){
    var autoIncrement = require('mongoose-auto-increment');

    var postSchema = mongoose.Schema({
        url: String,
        location: String,
        description: String,
        name: String,
        categories: Array,
        price: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    });
    postSchema.plugin(autoIncrement.plugin, {
        model: 'Post',
        field: 'id',
        startAt: 1,
        incrementBy: 1
    });
    app.db.model('Post', postSchema);
}
