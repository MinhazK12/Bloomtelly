const express = require('express')
const Author = require('../models/author')
const router = express.Router()

router.get('/', async(req, res)=>{
    const shorts = await Author.find({})
    res.send(shorts)
})

module.exports = router