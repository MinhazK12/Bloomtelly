const express = require('express')
const { route } = require('.')
// const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')
const { query } = require('express')
// const uploadPath = path.join('public', Book.coverImageBasePath)
const router = express.Router()
// const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
// const upload = multer({
//     dest: uploadPath,
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMimeTypes.includes(file.mimetype))
//     }
// })

//All books route
router.get('/', async(req, res)=>{
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== ''){
        searchOptions = new RegExp( req.query.title, 'i')
    }
    try{
        const books = await Book.find(searchOptions)
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch (e){
        console.log(e)
        res.redirect('/')
    }
    // const authors = await Book.find({})
    // res.send(authors)
})

//New book route
router.get('/new', async(req, res)=>{
    renderNewPage(res, new Book())
})

//creating book route
router.post('/',  async (req, res) => {
    // const fileName = req.file != null ? req.file.filename : null
    const book = new Book ({
        title: req.body.title,
        author: req.body.author,
        bookUrl: req.body.bookUrl,
        language: req.body.language,
        description: req.body.description
    })
    try{
        const newBook = await book.save()
        res.redirect(`books/${newBook.id}`)
    } catch(e) {
        console.log(e)
        res.render('books/new', {
            book: book,
            errorMessage: 'Error creatin Book'
        })
    }
})

router.get('/:id', async(req, res)=> {
    try {
        const book = await Book.findById(req.params.id).populate('author').exec()
        res.render('books/show', {book:book})
    } catch(e) {
        res.redirect('/')
    }
})

//Edit book route
router.get('/:id/edit', async(req, res)=>{
    try{
        const book = await Book.findById(req.params.id)
        renderEditPage(res, book)
    } catch {
        res.redirect('/')
    }
})

//updating book route
router.put('/:id',  async (req, res) => {
    let book
    try{
        book = await Book.findById(req.params.id)
        book.title = req.body.title
        book.author = req.body.author
        book.language = req.body.language
        book.bookUrl = req.body.bookUrl
        book.description = req.body.description
        await book.save()
        res.redirect(`/books/${book.id}`)
    } catch(e) {
        console.log(e)
        res.render('books/show', {
            book: book,
            errorMessage: 'Error updating Book'
        })
    }
})

//delete book by id
router.delete('/:id', async(req, res)=>{
    let book 
    try{
        book = await Book.findById(req.params.id)
        await book.remove()
        res.redirect('/books')
    } catch{
        if (book != null){
            res.render('/books/show', {
                book: book,
                errorMessage: 'Could not remove book'
            })
        } else {
            res.redirect('/')
        }
    }
})

async function renderNewPage (res, book, hasError = false ) {
    renderFormPage(res, book, 'new', hasError)
}

async function renderEditPage (res, book, hasError = false){
    renderFormPage(res, book, 'edit', hasError)
}

async function renderFormPage (res, book, form, hasError = false ) {
    try{
        const authors = await Author.find({})
        const params = {
            author: authors,
            book: book
        }
        if(hasError) params.errorMessage = 'Error creating book'
        res.render(`books/${form}`, params)
    } catch {
        res.redirect('/books')
    }
}

module.exports = router