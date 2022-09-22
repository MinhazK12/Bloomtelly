const express = require('express')
const Book = require('../models/book')
const router = express.Router()

router.get('/', async(req, res)=>{
    const shorts = await Book.find({})
    res.send(shorts)
})

module.exports = router