const { response } = require('express')
const express = require('express')
const Cat = require("./../models/category")
const Post = require("./../models/pot")
const User = require("./../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.get('/new', (req, res)=>{
    res.render('categories/new', {category: new Cat() })
})

router.get('/', async (req, res) => {
    const Category = await Cat.find().sort({createdAt: 'desc'})
    res.render('categories/index', {categories: Category, user: new User()})
})
router.get('/edit/:id', async (req, res)=>{
    const cat = await Cat.findById(req.params.id)
    res.render('categories/edit', {category: cat })
})
router.get('/open/:slug', async (req, res)=>{
    let categoryName = req.params.slug; 
    module.exports = categoryName; 
    const post = await Post.find({category: categoryName}).sort({createdAt: 'desc'})
    const cat = await Cat.findOne({ slug: req.params.slug })
    res.render('pots/index', {pots: post, name: cat})
})
router.get('/:slug', async (req, res)=>{
    const category = await Cat.findOne({ slug: req.params.slug })
    if(category == null) res.redirect('/')
    res.render('categories/show', {category: category})
})
router.post('/register', async (req, res, next)=>{
    req.user = new User()
    next()
}, saveUser('new'))

router.post('/login', async (req, res, next)=>{
    req.user = new User()
    next()
}, logUser('new'))

router.post('/logout', async (req, res, next)=>{
    req.user = new User()
    next()
},logoutUser('new'))

router.post('/', async (req, res, next)=>{
    req.category = new Cat()
    next()
}, savePostAndRedirect('new'))

router.put('/:id', async (req, res, next)=>{
    req.category = await Cat.findById(req.params.id)
    next()
}, savePostAndRedirect('edit'))

function saveUser(path){
    return async (req, res) =>{
        let usr = req.user
        usr.username = req.body.username
        usr.password = await bcrypt.hash(req.body.password, 10)
        usr.isAdmin = false;
        let username = req.body.username

        const serUser = await User.findOne({ username }).lean()
        if (!serUser) {
            try {
                usr = await usr.save()
                let str = '/categories'
                console.log("Zarejestrowano")
                res.redirect(str)
            } catch(e) {
                res.redirect("/categories")
                console.log("Złe hasło lub login")
            }
        }
        else{
            console.log("Użytkownik istnieje")
            res.redirect("/categories")
        }
    }
}

function logUser(path){
    return async (req, res) =>{
        let username = req.body.usernamelog
        let password = req.body.passwordlog

        const serUser = await User.findOne({ username }).lean()
        if (!serUser) {
            console.log("Zły użytkownik")
            global.name = '';
            global.isAdmin = false;
            res.redirect("/categories")
        }
        else {
            if (await bcrypt.compare(password, serUser.password)) {
                const token = jwt.sign(
                    {
                        id: serUser._id,
                        username: serUser.username
                    },
                    JWT_SECRET
                )
                console.log("Zalogowano")
                console.log(serUser.username)
                console.log(serUser.isAdmin)
                global.name = serUser.username
                if(serUser.isAdmin)
                {
                    global.adm = true;
                }
                let str = '/categories'
                res.redirect(str)
            }
            else
            {
                console.log("Złe hasło")
                res.redirect("/categories")
            }
        }
    }
}

function logoutUser(path){
    return async (req, res) =>{
        
        global.name = '';
       
        console.log("Wylogowano")

        global.adm = false;

        let str = '/'
        res.redirect(str)
        
    }
}

function savePostAndRedirect(path){
    return async (req, res) =>{
        let category =req.category
        category.title = req.body.title
        category.description = req.body.description
        category.createdBy = global.name
        try{
            category = await category.save()
            let str = '/categories/open/'
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