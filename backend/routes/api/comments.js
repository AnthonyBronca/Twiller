const e = require('express');
const express = require('express');
const router = express.Router();
const {User, Tweet, Comment} = require('../../db/models')
const {dateParser} = require('../../helpers/datecalculator')

//updates a comment only if changes were made
router.put('/:id', (async(req, res)=> {
    const id = req.params.id;
    const {tweetId, userId, comment} = req.body
    console.log(tweetId, userId, comment, "helllloo")
    const originalComment = await Comment.findByPk(id);
    const oldComment = originalComment.comment;

    if (oldComment !== comment){
        originalComment['comment'] = comment
        await originalComment.save()
        const updatedComment  = await Comment.findByPk(id)
        return res.json(updatedComment)

    } else {
        return res.json(originalComment)
    }
}))

//deletes a comment and returns the deleted comment
router.delete('/:id', (async(req,res)=> {
    const id = req.params.id;
    const comment = await Comment.findByPk(id)
    await comment.destroy();
    return res.json(comment)
}))



module.exports = router;
