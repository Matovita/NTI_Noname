const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const posts = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
})

postSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    next()
})

module.exports = mongoose.model('Posts', posts)