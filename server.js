const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/posts')
const app = express()

mongoose.connect('mongodb://localhost/db', {useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    const posts = [{
        title: 'Test post',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test post2',
        createdAt: new Date(),
        description: 'Test description2'
    }]
    res.render('posts/index', {posts: posts})
})

app.use('/posts', postRouter)

app.listen(5000)