var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    id: Number,
    url: String
});

var Post = mongoose.model('Post', PostSchema);

exports.create = function(id, url){
    var post = new Post({
        id: id,
        url: url
    });

    return post;
}

exports.find = function(id, callback){
    Post.find({
        id: id
    }, callback);
}

exports.all = function(callback){
    Post.find(callback);
}
