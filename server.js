const express = require('express')
const postRouter = require('./routes/posts')
const app = express()

app.set('view engine', 'ejs')

app.use('/posts', postRouter)

app.get('/', (req, res) =>{
    const posts = [{
        title: 'Test post',
        createdAt: Date.now(),
        description: 'Test description'
    }]
    res.render('index', {posts: posts})
})

app.listen(5000)