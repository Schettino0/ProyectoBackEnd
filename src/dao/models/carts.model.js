const mongoose = require('mongoose')

const collectionName = 'carts'

const collectionSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
            },
        ],
        default: [],
    }
})

collectionSchema.pre('find', function () {
this.populate('products.product')
})
const Carts = mongoose.model(collectionName, collectionSchema)
module.exports = Carts 