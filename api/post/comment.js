'use strict';

exports = module.exports = function(app){
    var Comment = app.db.models.Comment;
    var Post = app.db.models.Post;

    return {
        create: function(json){
            var comment = new Comment(json);
            return comment;
        },

        delete: function(id, callback){
            Comment.findOne({
                _id: id
            }).remove().exec(callback);
        },

        all: function(user, id, callback){
            Post.findOne({id: id})
                .populate("comments")
                .exec(function(err, result){
                    if(err)
                        console.log(err);
                    var comments = result.comments;
                    var copy = JSON.parse(JSON.stringify(comments));
                    for(var i = 0; i < copy.length; i++){
                        copy[i]["deletable"] = (copy[i].user == user);
                    }
                    callback(err, copy);
                });
        },
    }
}
