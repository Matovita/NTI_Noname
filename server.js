const express = require('express')
const mongoose = require('mongoose')
const Cat = require('./models/category')
//const Category = require('./models/category')
const categoriesRouter = require('./routes/categories')
const potRouter = require('./routes/pots')
const comRouter = require('./routes/comments')
// const User = require('./models/user')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const methodOverride = require('method-override')
//const bodyParser = require('body-parser')
const app = express()
global.a = 10;

//const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

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

// app.post('/', async (req, res) => {
// 	const { username, password } = req.body
// 	const user = await User.findOne({ username }).lean()

// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 			{
// 				id: user._id,
// 				username: user.username
// 			},
// 			JWT_SECRET
// 		)

// 		return res.json({ status: 'ok', data: token })
// 	}

// 	res.json({ status: 'error', error: 'Invalid username/password' })
// })

// app.post('/', async (req, res) => {
// 	const { username, password: plainTextPassword } = req.body

// 	if (!username || typeof username !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid username' })
// 	}

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	const password = await bcrypt.hash(plainTextPassword, 10)

// 	try {
// 		const response = await User.create({
// 			username,
// 			password
// 		})
// 		console.log('User created successfully: ', response)
// 	} catch (error) {
// 		if (error.code === 11000) {
// 			// duplicate key
// 			return res.json({ status: 'error', error: 'Username already in use' })
// 		}
// 		throw error
// 	}

// 	res.json({ status: 'ok' })
// })


app.use('/categories', categoriesRouter)
app.use('/pots', potRouter)
app.use('/comments', comRouter)
app.use(express.static(__dirname));

app.listen(5000)