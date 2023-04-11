const mongoose = require('mongoose')

const collectionName = 'carts'

const collectionSchema = new mongoose.Schema({
    products: Array,
})

const Carts = mongoose.model(collectionName, collectionSchema)
module.exports = Carts 