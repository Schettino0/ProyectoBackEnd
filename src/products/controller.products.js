const ProductManager = require("../dao/ProductManager")
const tienda = new ProductManager('productos.json')
const { Router } = require('express')
const Products = require("../dao/models/products.model")
const privateAccess = require("../middlewares/privateAccess.middlewares")
const Product = require("../dao/products.dao")

const router = Router()

const ProductDao = new Product()


router.post('/', async (req, res) => {
    ProductDao.createProduct(req)
})


router.get('/', privateAccess, async (req, res) => {
    ProductDao.getProducts(req, res)
})

router.get('/:pid', async (req, res) => {
    const productoID = req.params.pid
    const producto = await ProductDao.getProductByID(productoID)
    res.json({ producto })
})

router.put('/:pid', async (req, res) => {
    //AGREGAR EL PUT PERO CON MONGO
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    ProductDao.deleteProduct(id, res)
}
)


module.exports = router