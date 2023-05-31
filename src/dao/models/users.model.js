const mongoose = require('mongoose')

const collectionName = 'users'

const collectionSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type:String,
        unique:true
    },
    age: Number,
    password: String,
    googleId: String

})

collectionSchema.pre('find', function () {
this.populate('products.product')
})
const Users = mongoose.model(collectionName, collectionSchema)
module.exports = Users 