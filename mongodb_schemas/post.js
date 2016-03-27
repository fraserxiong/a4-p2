var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    id: Number,
    url: String,
    location: String,
    description: String,
    name: String,
    categories: Array,
    price: Number
});

var Post = mongoose.model('Post', PostSchema);

exports.create = function(json){
    var post = new Post(json);
    return post;
}

exports.find = function(id, callback){
    Post.findOne({
        id: id
    }).lean().exec(callback);
}

exports.all = function(callback){
    Post.find().limit(12).lean().exec(callback);
}

exports.search_by_tag = function(tags, callback){
    var mapped = tags.map(tag => {
        return {categories: tag};
    });
    console.log(mapped);
    Post.find({
        $or: mapped
    }).limit(4).lean().exec(callback);
}

exports.fuzzy_search = function(query, callback){
    var fuzzy_query = new RegExp(query, 'i');
    Post.find({
        $or: [
            {categories: fuzzy_query},
            {description: fuzzy_query},
            {name: fuzzy_query},
            {location: fuzzy_query}
        ]
    }).lean().exec(callback);
}
