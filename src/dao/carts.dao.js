const Carts = require("./models/carts.model")



class CartsDao {

    getAllCarts = async () => {
        try {
            const allCarts = await Carts.find()
            return allCarts
        } catch (error) {
            return error
        }
    }
    getCartByID = async (id) => {
        const carts = await Carts.find()
        const busqueda = carts.find(p => p.id == id)
        return busqueda
    }
    createCart = async () => {
        try {
            const info = {
                products: []
            }
            const NewCart = await Carts.create(info)
            return NewCart
        } catch (error) {

        }
    }
    deleteCart = async (id) => {
        try {
            const carrito = await Carts.findOne({ _id: id })
            carrito.set('products', [])
            const response = await Carts.updateOne({ _id: id }, carrito)
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    }

    deleteProductOfCart = async (cid, pid) => {
        const carrito = await Carts.findOne({ _id: cid })
        const productos = carrito.products
        try {
            const respuesta = await Carts.findByIdAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } })
            const carrito = await Carts.findOne({ _id: cid })
            return carrito
        } catch (error) {
            console.log(error)
            return error
        }
    }

    addProduct = async (cid, pid) => {
        try {
            const carrito = await Carts.findOne({ _id: cid })
            carrito.products.push({ product: pid })
            const response = await Carts.updateOne({ _id: cid }, carrito)
            return response
        } catch (error) {
            return error
        }
    }

}



module.exports = CartsDao