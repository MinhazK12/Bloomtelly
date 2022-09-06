const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/bookCovers' 
const path = require('path')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    language: {
        type: String,
        required: true
    },
    bookUrl: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

// bookSchema.virtual('coverImagePath').get(function(){
//     if(this.coverImageName != null){
//         return path.join('/', coverImageBasePath, this.coverImageName)
//     }
// })

module.exports = mongoose.model('Book', bookSchema)
// module.exports.coverImageBasePath = coverImageBasePath