const express = require('express')
const Post = require("./../models/post")
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('posts/new', {post: new Post() })
})

router.get('/:id', async (req, res)=>{
    const post = await Post.findById(req.params.id)
    if(post == null) res.redirect('/')
    res.render('articles.show', {post: post})
})

router.post('/', async (req, res)=>{
    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        post = await post.save()
        res.redirect('/posts/${post.id}')
    }catch(e){
        res.render('posts/new', {post: post})
    }
    
})

module.exports = router