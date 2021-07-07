const express = require('express')
const Post = require("../models/pot")
const Cat = require("../models/category")
const Comment = require('../models/comments')
const router = express.Router()
var msg = require("./categories")

router.get('/new', (req, res)=>{
    res.render('pots/new', {post: new Post() })
})
router.get('/', async (req, res) => {
    var name = require("./categories");
    const categories = await Post.find({category: name}).sort({createdAt: 'desc'})
    const cat = await Cat.findOne({ slug: name})
    res.render('pots/index', {pots: categories, name: cat})
})

router.get('/edit/:id', async (req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render('pots/edit', {post: post })
})

router.get('/:slug', async (req, res)=>{
    const post = await Post.findOne({ slug: req.params.slug })
    const comments = await Comment.find({post: req.params.slug}).sort({createdAt: 'asc'})
    if(post == null) res.redirect('/')
    let postName = req.params.slug; 
    module.exports = postName;
    res.render('comments/show', {post: post, comments: comments, newcom: new Comment()})
})


router.post('/', async (req, res, next)=>{
    req.post = new Post()
    next()
}, savePostAndRedirect('new'))


router.put('/:id', async (req, res, next)=>{
    req.post = await Post.findById(req.params.id)
    next()
}, savePostAndRedirect('edit'))



function savePostAndRedirect(path){
    return async (req, res) =>{
        let pot =req.post
        pot.title = req.body.title
        pot.description = req.body.description
        pot.createdBy = global.name
        var name = require("./categories");
        pot.category = name
        try{
            pot = await pot.save()
            let str = '/pots/'
            str += pot.slug
            res.redirect(str)
        }catch(e){
            res.render('pots/${path}', {post: pot})
        }
    }
}

method="DELETE"
router.delete('/:id', async (req,res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/pots')
})


module.exports = router