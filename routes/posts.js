const express = require('express')
const Post = require("./../models/post")
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('posts/new', {post: new Post() })
})

router.get('/edit/:id', async (req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', {post: post })
})

router.get('/:slug', async (req, res)=>{
    
    const post = await Post.findOne({ slug: req.params.slug })
    if(post == null) {
        //nie wiem czemu nie chce wejsc w /:category - wlasciwie to nawet nie patrzylem jak to sie robi
        //ale tu chetnie wchodzi
        //console.log(req.params.slug);
        const posts = await Post.find({category: req.params.slug}).sort({createdAt: 'desc'})
        res.render('posts/index', {posts: posts})
    }
    else
    res.render('posts/show', {post: post})
})

router.post('/', async (req, res, next)=>{
    req.post = new Post()
    next()
}, savePostAndRedirect('new'))

router.put('/:id', async (req, res, next)=>{
    req.post = await Post.findById(req.params.id)
    next()
}, savePostAndRedirect('edit'))

router.get('/:category', async (req, res) =>{
    //{category: req.params.category}
    const posts = await Post.find().sort({createdAt: 'desc'})
    res.render('posts/index', {posts: posts})
})

function savePostAndRedirect(path){
    return async (req, res) =>{
        let post =req.post
        post.title = req.body.title
        post.description = req.body.description
        post.markdown = req.body.markdown
        post.category = req.body.category
        console.error(req.body.category);
        try{
            post = await post.save()
            let str = '/posts/'
            str += post.slug
            res.redirect(str)
        }catch(e){
            res.render('posts/${path}', {post: post})
        }
    }
}

method="DELETE"
router.delete('/:id', async (req,res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router