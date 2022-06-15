const e = require('express');
const express = require('express');
const router = express.Router();
const {User, Tweet, Comment} = require('../../db/models')
const {dateParser} = require('../../helpers/datecalculator')

//updates a comment only if changes were made
router.put('/:id/edit', (async(req, res)=> {
    const id = req.params.id;
    // console.log(req, '********************************')
    const {commentId, newComment} = req.body
    // console.log(tweetId, userId, comment, "helllloo")
    const originalComment = await Comment.findByPk(commentId);
    const oldComment = originalComment.comment;

    if (oldComment !== newComment){
        originalComment['comment'] = newComment
        await originalComment.save()
        const updatedComment  = await Comment.findByPk(commentId)
        return res.json(updatedComment)
    } else {
        return res.json(originalComment)
    }
}))

//deletes a comment and returns the deleted comment
router.delete('/:id/delete', (async(req,res)=> {
    const id = req.params.id;
    console.log(id, 'this is id')
    const comment = await Comment.findByPk(id)
    console.log(comment, 'this is comment')
    // const updatedComment = await Comment.findByPk(id, {include: [Tweet]})
    // console.log(updatedComment, "idk what this is")
    await comment.destroy();
    // const deletedComment = {updatedComment, comment}
    return res.json(comment)
}))




module.exports = router;
