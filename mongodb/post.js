var mongoose = require('mongoose');
var Schemas = require('./schemas/schemas');
var Post = Schemas.Post;

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

exports.search_by_tag = function(id, tags, callback){
    var mapped = tags.map(tag => {
        return {categories: tag};
    });
    Post.find({
        $or: mapped
    }).where('id').ne(id).limit(4).lean().exec(callback);
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
