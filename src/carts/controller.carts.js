const ProductManager = require("../dao/ProductManager")
const tienda = new ProductManager('productos.json')
const { Router } = require('express')
const router = Router()
const fs = require('fs')
const Carts = require("../dao/models/carts.model")
const Products = require("../dao/models/products.model")


let cartArray
try {
    const data = fs.readFileSync('./src/dao/carrito.json', 'utf-8')
    cartArray = JSON.parse(data)
}
catch (error) {
    cartArray = []
}

router.post('/', async (req, res) => {
    //FS
    const id = cartArray.length + 1
    const cart = { id, products: [] }
    cartArray.push(cart)
    fs.promises.writeFile('./src/dao/carrito.json', JSON.stringify(cartArray))
    //DB 
    const info = {
        products: []
    }
    const NewCart = await Carts.create(info)
    res.json({ message: NewCart })
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const carts = await Carts.find()
    const busqueda = carts.find(p => p.id == cid)
    // const cartID = cartArray.find(cart => cart.id === parseInt(cid))    
    if (!busqueda) {
        res.status(404).json({ error: "Cart not found" })
    }
    else {
        res.status(200).json({ message: busqueda })
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const carrito = await Carts.findOne({ _id: cid })
    const productos = carrito.products
    try {
        const respuesta = await Carts.findByIdAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } })
        const carrito = await Carts.findOne({ _id: cid })
        res.json({ carrito })
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const carrito = await Carts.findOne({ _id: cid })
        carrito.set('products',[])
        const response = await Carts.updateOne({ _id: cid }, carrito)
        res.send({response})
    } catch (error) {
        console.log(error)
        res.send({error:error})
    }

})


router.patch('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const carrito = await Carts.findOne({ _id: cid })
        console.log(carrito)
        carrito.products.push({ product: pid })
        const response = await Carts.updateOne({ _id: cid }, carrito)

        res.json({ message: response })
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
})




module.exports = router