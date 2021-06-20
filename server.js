const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/post')
const Cat = require('./models/category')
const postRouter = require('./routes/posts')
//const Category = require('./models/category')
const categoriesRouter = require('./routes/categories')
const potRouter = require('./routes/pots')
const comRouter = require('./routes/comments')
const loginRouter = require('./routes/login')
const methodOverride = require('method-override')
const app = express()
global.a = 10;

var url = "mongodb://localhost/db"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const connection = mongoose.connection;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) =>{
    const Category = await Cat.find().sort({createdAt: 'desc'})
    res.render('categories/index', {categories: Category})
})

app.use('/posts', postRouter)
app.use('/categories', categoriesRouter)
app.use('/pots', potRouter)
app.use('/comments', comRouter)
app.use('/login', loginRouter)

app.listen(5000)