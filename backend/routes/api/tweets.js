const express = require('express');
const router = express.Router();
const {User, Tweet, Comment} = require('../../db/models')
const {dateParser} = require('../../helpers/datecalculator')



//get all tweets
router.get('/', (async(req,res)=>{
    const tweets = await Tweet.findAll()
    return res.json(tweets)
}))
/*

[{
    id: 1,
    userId: 1,
    tweet: message,
    imgUrl: '',
    createdAt: 2022-06-07
    updatedAt: 2022-06-07
}]

*/

//get one tweet and all its coments
router.get('/:id', (async(req,res)=> {
    const id = req.params.id
    const tweet = await Tweet.findByPk(id,{
        include: Comment
    } )
    return res.json(tweet)
}))

//gets all the tweets for one user
router.get('/user/:id', (async(req,res)=> {
    const id = req.params.id
    const tweets = await Tweet.findAll({
       where: {
           'userId': id
       }
    })
    return res.json(tweets)
}))

//post a new tweet
router.post('/new', (async(req,res)=> {
    const {userId, tweet, imgUrl} = req.body
    console.log(userId, tweet, imgUrl)
    const newTweet = await Tweet.create({
        userId,
        tweet,
        imgUrl
    })
    console.log(newTweet)
    return res.send(':)')
}))

//updates an existing tweet based on tweet id. must pass in userId, tweetbody, and imgurl
router.put('/:id/edit', (async(req,res)=>{
    const tweetId = req.params.id
    const {userId, tweet, imgUrl} = req.body
    const originalTweet = await Tweet.findByPk(tweetId)
    const oldTweet = originalTweet.tweet
    const oldImg = originalTweet.imgUrl

    if(oldTweet !== tweet){
        originalTweet.tweet = tweet
        await originalTweet.save();
    }
    if (oldImg !== imgUrl){
        originalTweet.imgUrl = imgUrl;
        await originalTweet.save();
    }
    const updatedTweet = await Tweet.findByPk(tweetId)
    return res.json(updatedTweet)
}))

//deletes an existing tweet
router.delete('/:id', (async(req,res)=> {
    const id = req.params.id;
    console.log(id, "this is id")
    const tweet = await Tweet.findByPk(id)
    await tweet.destroy();
    return res.json(tweet)
}))

//adds a new comment to a specified tweet
router.post('/:id/comment/new', (async(req,res)=>{
    // const id = req.params.id;
    const {tweetId, userId, comment} = req.body
    console.log(tweetId,userId,comment, "tweetId??");
    const newComment = await Comment.create({
        tweetId,
        userId,
        comment
    })
    return res.json(newComment)
    //sends only the new comment
}))



// router.get(':id/comments', (async(req,res)=>{
//     const id = req.params.id;
//     const tweet = await Tweet.findByPk(id, {
//         include: Comment
//     })
//     return res.json(tweet)
// }))







module.exports = router;