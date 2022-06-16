const express = require('express');
const router = express.Router();
const {User, Tweet, Comment} = require('../../db/models')
const {dateParser} = require('../../helpers/datecalculator')
const asyncHandler = require('express-async-handler')
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')
//get all tweets
router.get('/', (async(req,res)=>{
    const tweets = await Tweet.findAll({
        include: [User, Comment]
    })
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

router.get('/:id/comments', (async(req,res)=> {
    const id = req.params.id
    const comments = await Comment.findAll({
        where: {tweetId:id}, include: [User]
    })
    console.log('am i here??')
    return res.json(comments)

}))

//get one tweet
router.get('/:id', (async(req,res)=> {
    const id = req.params.id
    const tweet = await Tweet.findByPk(id,{
        include: [User, {model:Comment, include: User}]
    })
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


//aws test post a new tweet image
router.post('/new', singleMulterUpload('image'),asyncHandler(async(req,res)=> {
    const {userId, tweet} = req.body
    // console.log('1')
    // console.log(req)
    if(req.file){
        // console.log('2')
        const imgUrl = await singlePublicFileUpload(req.file); //converts data from form
        const newT = await Tweet.create({
            userId,
            tweet,
            imgUrl
        })
        const newTweet = await Tweet.findByPk(newT.id,{
            include: [User]
        })
        return res.json(newTweet)
    }else {
        // console.log('3')
        const newT = await Tweet.create({
            userId,
            tweet,
        })
        const newTweet = await Tweet.findByPk(newT.id,{
            include: [User]
        })
        return res.json(newTweet)
    }
    // console.log(req, '****************** This is req *************', req.body.image)


    // setTokenCookie(res, newT); //is this needed????
}))

//post a new tweet
// router.post('/new', (async(req,res)=> {
//     const {userId, tweet, imgUrl} = req.body
//     const newT = await Tweet.create({
//         userId,
//         tweet,
//         imgUrl
//     })
//     const newTweet = await Tweet.findByPk(newT.id,{
//         include: [User]
//     })
//     return res.json(newTweet)
// }))

//updates an existing tweet based on tweet id. must pass in userId, tweetbody, and imgurl
router.put('/:id/edit', (async(req,res)=>{
    // const id = req.params.id
    const {id, updatedTweet} = req.body
    console.log(req.body, "this is req.body")
    // console.log(id, tweet, 'this is req.body from PUT')
    const originalTweet = await Tweet.findByPk(id)
    const oldTweet = originalTweet.tweet
    const oldImg = originalTweet.imgUrl

    if(oldTweet !== updatedTweet){
        originalTweet.tweet = updatedTweet
         await originalTweet.save();
    }
    // if (oldImg !== imgUrl){
    //     originalTweet.imgUrl = imgUrl;
    //     await originalTweet.save();
    // }
    const newTweet = await Tweet.findByPk(id)
    return res.json(newTweet)
    // return res.send(';)')
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
    console.log('hellllo???')
    const {tweetId, userId, reply} = req.body
    const comment = reply
    console.log(tweetId,userId,reply, "tweetId??");
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
