'use-strict'
const Comment = require('../../models/comment');
const httpResponse = require('../responses/httpresponses');

function postComment(req, res){

    let newComment = new Comment(req.body);

    newComment.save(err => {

        if(err){
            res.send(httpResponse.onCouldNotPostComment);
        }
        
        else{
            res.send(httpResponse.onCommentPostSuccess);
        }
    })
}

function getComments(req, res){

    Comment.find({n_id: req.params.userId}, function(err, comments){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }
        
        else{
            res.json({success: true, comments: comments})
        }
    })
}

function deleteComment(req, res){

    Comment.findByIdAndDelete(req.params.commentId, function(err){
        
        if(err){
            res.send(httpResponse.onCouldNotDeleteComment);
        }
        
        else{
            res.send(httpResponse.onDeleteCommentSuccess);
        }
    })
}
module.exports = {
    postComment: postComment,
    getComments: getComments,
    deleteComment: deleteComment
}