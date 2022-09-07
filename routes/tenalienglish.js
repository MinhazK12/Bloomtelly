const express = require('express')
const Book = require('../models/book')
const Author = require('../models/author')
const router = express.Router()

router.get('/', async(req, res)=>{
    const shorts = await Book.find({})
    let arr = []
    shorts.map((i)=>{
        if (i.author == "6317472c1f05da63df63fdd7") {
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