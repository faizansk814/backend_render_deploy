const express = require('express')
const BookModel = require('../models/book.model')

const bookrouter = express.Router()
bookrouter.get("/get", async (req, res) => {
    try {
        const allbooks = await BookModel.find()
        return res.status(200).send(allbooks)
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})
bookrouter.post("/add", async (req, res) => {
    try {
        const { title, author, genre, description, price } = req.body
        const newBook = new BookModel({ title, author, genre, description, price })
        await newBook.save()
        return res.status(200).send({ msg: "New Book added" })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

bookrouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const Deleteabook = await BookModel.findByIdAndDelete({ _id: id })
        return res.status(200).send({ msg: "Book Deleted" })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

bookrouter.get("/selected/:genre", async (req, res) => {
    try {
        const { genre } = req.params
        const filterdata = await BookModel.find({ genre })
        return res.status(200).send(filterdata)
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }

})

bookrouter.get("/sortasc",async ()=>{
    try {
        const data=await BookModel.find().sort({price:1})
        return res.status(200).send(data)
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

bookrouter.get("/sortdesc",async ()=>{
    try {
        const data=await BookModel.find().sort({price:-1})
        return res.status(200).send(data)
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

module.exports = bookrouter