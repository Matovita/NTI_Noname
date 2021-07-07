const express = require('express')
const Post = require("../models/pot")
const Cat = require("../models/category")
const Comment = require('../models/comments')
const router = express.Router()


router.post('/', async (req, res, next)=>{
    req.newcom = new Comment()
    next()
}, savePostAndRedirect('new'))



function savePostAndRedirect(path){
    return async (req, res) =>{
        let pot =req.newcom
        pot.markdown = req.body.markdown
        pot.post = require("./pots")
        pot.createdBy = global.name
        //console.log(pot.post)
        //pot.createdBy = 'me'
        try{
            pot = await pot.save()
            let str = '/pots/'
            str += pot.post
            res.redirect(str)
        }catch(e){
            res.render('./pots/${path}', {post: pot})
        }
    }
}

method="DELETE"
router.delete('/:id', async (req,res) => {
    //var name = require("./categories");
    await Comment.findByIdAndDelete(req.params.id)
    let str = '/pots/'
    var name = require("./pots");
    str += name
    res.redirect(str)
})


module.exports = router