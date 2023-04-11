const ProductManager = require("../dao/ProductManager")
const tienda = new ProductManager('productos.json')
const { Router } = require('express')
const Products = require("../dao/models/products.model")


const router = Router()


router.post('/', async (req, res) => {
    const product = req.body
    const { title, description, price, thumbnail, code, stock } = product
    const añadir = await tienda.addProduct({ title, description, price, thumbnail, code, stock })

    if (title && description && price && thumbnail && code && stock) {
        try {
            const newProducts = await Products.create(product)
            return res.status(201).json({ product: newProducts })

        } catch (error) {
            return res.status(401).json({ error: error })
        }
    }

    // if (añadir === "Creado con exito") {
    //     res.status(201).json({ message: añadir })
    // }
    // else {
    //     res.status(400).json({ error: añadir })
    // }
})


router.get('/', async (req, res) => {
    // res.send({message: "hola"})
    const { limit } = req.query
    if (limit) {
        const productsDB = await Products.find()
        // const products = await tienda.getProducts()
        res.send({ productos: productsDB.slice(0, limit) })
    }
    else {
        // const products = await tienda.getProducts()
        const productsDB = await Products.find()
        return res.send({ productos: productsDB })
    }
})



router.get('/:pid', async (req, res) => {
    const productoID = req.params.pid
    // const productos = await tienda.getProducts()
    // const busqueda = await Products.findById(productoID)
    const productos = await Products.find()
    const busqueda = productos.find(p => p.id == productoID)
    if (busqueda) {
        return res.send.json(busqueda)
    }
    else {
        return res.send.json({ error: "ID not found" })
    }


})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    // const productToUpdate = await tienda.getProductById(parseInt(pid))
    const update = req.body
    tienda.updateProduct(parseInt(pid), update)
    res.send.json({ message: "Producto Modificado" })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    tienda.deleteProduct(parseInt(pid))
    try {
        await Products.deleteOne({_id: pid})
        res.send({message : "Eliminado con exito"})
    } catch (error) {
        res.send({error: error})
    }
})








module.exports = router