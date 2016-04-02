'use strict';

exports = module.exports = function(app){
    var Comment = app.db.models.Comment;
    var Post = app.db.models.Post;

    return {
        create: function(json){
            var comment = new Comment(json);
            return comment;
        },

        // update: function(id, json, callback){
        //     Post.update({id: id}, json, callback);
        // },
        //
        // delete: function(id, callback){
        //     Post.find({id: id}).remove().exec(callback);
        // },
        //
        // find: function(id, callback){
        //     Post.findOne({
        //         id: id
        //     }).lean().exec(callback);
        // },
        //
        all: function(id, callback){
            Post.findOne({id: id})
                .populate("comments")
                .exec(function(err, result){
                    if(err)
                        console.log(err);
                    var comments = result.comments;
                    console.log(result);
                    console.log(comments);
                    callback(err, comments);
                });
        },
        //
        // search_by_tag: function(id, tags, callback){
        //     var mapped = tags.map(tag => {
        //         return {categories: tag};
        //     });
        //     Post.find({
        //         $or: mapped
        //     }).where('id').ne(id).limit(4).lean().exec(callback);
        // },
        //
        // fuzzy_search: function(query, callback){
        //     var fuzzy_query = new RegExp(query, 'i');
        //     Post.find({
        //         $or: [
        //             {categories: fuzzy_query},
        //             {description: fuzzy_query},
        //             {name: fuzzy_query},
        //             {location: fuzzy_query}
        //         ]
        //     }).lean().exec(callback);
        // }
    }
}
