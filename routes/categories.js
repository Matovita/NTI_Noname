const express = require('express')
const Cat = require("./../models/category")
const router = express.Router()


router.get('/', async (req, res) => {
    const categories = await Cat.find().sort({createdAt: 'desc'})
    res.render('categories/index', {categories: categories})
})

module.exports = router