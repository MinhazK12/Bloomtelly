//631747921f05da63df63fdff
const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')
const router = express.Router()

router.get('/', async(req, res)=>{
    const shorts = await Book.find({})
    let arr = []
    shorts.map((i)=>{
        if (i.author == "631747921f05da63df63fdff") {
            arr.push(i)
            // res.send(i)
        }
    }) 
    // if (arr !== null){
    //     res.send("No Shorts found")
    // } else {
        res.send(arr)
    // }
})

module.exports = router