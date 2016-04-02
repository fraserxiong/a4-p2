var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var postSchema = mongoose.Schema({
    url: String,
    location: String,
    description: String,
    name: String,
    categories: Array,
    price: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
postSchema.plugin(autoIncrement.plugin, {
    model: 'Post',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});
exports.Post = mongoose.model('Post', postSchema);
