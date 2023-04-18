const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
        default: true
    }
})


collectionSchema.plugin(mongoosePaginate)
const Products = mongoose.model(collectionName, collectionSchema)

module.exports = Products 