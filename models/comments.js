const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const comm = new mongoose.Schema({
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
      }
})

comm.pre('validate', function(next){
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
      }

    next()
})

module.exports = mongoose.model('Comments', comm)