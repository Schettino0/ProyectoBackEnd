const mongoose = require('mongoose')

const collectionName = 'products'

const collectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true,
    },
    stock: Number,
    status: {
        type: Boolean,
        defaul: true
    }
})


const Products = mongoose.model(collectionName, collectionSchema)
module.exports = Products 