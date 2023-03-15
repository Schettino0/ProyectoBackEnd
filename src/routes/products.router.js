
const ProductManager = require("../ProductManager")
const tienda = new ProductManager('productos.json')
const { Router } = require('express')

const router = Router()



router.post('/',  (req, res) => {
    const product = req.body
    // const id = await tienda.getProducts()
    // product.id = id.length + 1
    const { title, description, price, thumdnail, code, stock, status= true } = product
    tienda.addProduct({title, description, price, thumdnail, code, stock,status})
    res.status(201).json({ messagge: "Producto agreado con Exito!" })
})


router.get('/', async (req, res) => {
    const { limit } = req.query
    if (limit) {
        const products = await tienda.getProducts()
        res.send({ productos: products.slice(0, limit) })

    }
    else {
        const products = await tienda.getProducts()
        res.send({ productos: products })
    }
})


router.get('/:pid', async (req, res) => {
    const productoID = req.params.pid
    const productos = await tienda.getProducts()
    const busqueda = productos.find(p => p.id == productoID)
    if (busqueda) {
        res.send(busqueda)
    }
    else {
        res.send({ error: "ID not found" })
    }

})

router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid
    // const productToUpdate = await tienda.getProductById(parseInt(pid))
    const update = req.body
    tienda.updateProduct(parseInt(pid),update )
    res.send({message: "Producto Modificado"})
})

router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid
    tienda.deleteProduct(parseInt(pid))
    res.send({message: "Producto eliminado"})
})








module.exports = router