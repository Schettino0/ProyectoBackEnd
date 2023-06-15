const { Router } = require('express')
const router = Router()
const Carts = require("../dao/models/carts.model")
const CartsDao = require("../dao/carts.dao")

const Carro = new CartsDao()

router.get('/', async (req, res) => {
    const allCarts = await Carro.getAllCarts()
    res.json(allCarts)
})
router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const busqueda = await Carro.getCartByID(cid)
    if (!busqueda) {
        res.status(404).json({ error: "Cart not found" })
    }
    else {
        res.status(200).json({ message: busqueda })
    }
})

router.post('/', async (req, res) => {
    const NewCart = await Carro.createCart()
    res.json({ message: NewCart })
})

//Limpiar Carro por ID
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const borrado = Carro.deleteCart(cid)
    res.json(borrado)
})


router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const response = Carro.deleteProductOfCart(cid, pid)
    res.json(response)
})

router.patch('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const response = Carro.addProduct(cid, pid)
    res.json(response)
})




module.exports = router