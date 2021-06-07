const { response } = require('express')
const express = require('express')
const Cat = require("./../models/category")
const Post = require("./../models/pot")
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('categories/new', {category: new Cat() })
})

router.get('/', async (req, res) => {
    const Category = await Cat.find().sort({createdAt: 'desc'})
    res.render('categories/index', {categories: Category})
})
router.get('/edit/:id', async (req, res)=>{
    const cat = await Cat.findById(req.params.id)
    res.render('categories/edit', {category: cat })
})
router.get('/open/:slug', async (req, res)=>{
    let categoryName = req.params.slug; 
    module.exports = categoryName;
    //console.log(categoryName);
    a = 11
    const post = await Post.find({createdBy: categoryName}).sort({createdAt: 'desc'})
    res.render('pots/index', {pots: post})
})
router.get('/:slug', async (req, res)=>{
    const category = await Cat.findOne({ slug: req.params.slug })
    if(category == null) res.redirect('/')
    res.render('categories/show', {category: category})
})
router.post('/', async (req, res, next)=>{
    req.category = new Cat()
    next()
}, savePostAndRedirect('new'))

router.put('/:id', async (req, res, next)=>{
    req.category = await Cat.findById(req.params.id)
    next()
}, savePostAndRedirect('edit'))

function savePostAndRedirect(path){
    return async (req, res) =>{
        let category =req.category
        category.title = req.body.title
        category.description = req.body.description
         category.createdBy = req.body.createdBy
        try{
            category = await category.save()
            let str = '/categories/'
            str += category.slug
            res.redirect(str)
        }catch(e){
            response.status(500).send(e);
            res.render('categories/${path}', {category: category})
        }
    }
}
method="DELETE"
router.delete('/:id', async (req,res) => {
    await Cat.findByIdAndDelete(req.params.id)
    res.redirect('/categories')
})

module.exports = router