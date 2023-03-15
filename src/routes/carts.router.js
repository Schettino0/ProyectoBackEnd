const ProductManager = require("../ProductManager")
const tienda = new ProductManager('productos.json')
const { Router } = require('express')
const router = Router()
const fs = require('fs')

let cartArray
try {
    const data = fs.readFileSync('carrito.json', 'utf-8')
    cartArray = JSON.parse(data)
}
catch (error) {
    cartArray = []
}

router.post('/', async (req, res) => {
    const id = cartArray.length + 1
    const cart = { id, products: [] }
    cartArray.push(cart)
    res.status(201).json({ message: "Carrito creado" })
    fs.promises.writeFile('carrito.json', JSON.stringify(cartArray))

})

router.get('/:cid', (req, res) => {
    const cid = req.params.cid
    const cartID = cartArray.find(cart => cart.id === parseInt(cid))
    if (!cartID) {
        res.status(404).json({ error: "Cart not found" })
    }
    else {
        res.status(200).json({ message: cartID })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const productoID = await tienda.getProductById(parseInt(pid))
    const cartID = cartArray.find(cart => cart.id === parseInt(cid))
    if (!productoID || !cartID) {
        res.status(404).json({ error: " not found" })
    }
    else {
        const repetido = cartID.products.find(el => el.id === parseInt(pid))
        if (repetido) {
            const index = cartID.products.indexOf(repetido)
            ++cartID.products[index].quantity
            fs.promises.writeFile('carrito.json', JSON.stringify(cartArray))

        }
        else {
            const producto = { id: productoID.id, quantity: 1 }
            cartID.products.push(producto)
            fs.promises.writeFile('carrito.json', JSON.stringify(cartArray))

        }
        res.status(200).json({ cart: cartID })
    }


})

module.exports = router