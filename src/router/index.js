const cartsController = require('../carts/controller.carts')
const realtimeproductsController = require('../realtimeproducts/controller.realtimeproducts')
const productsController = require('../products/controller.products')
const ProductManager = require("../dao/ProductManager")
const Products = require('../dao/models/products.model')
const tienda = new ProductManager('productos.json')

const router = app => {

    app.use('/api/carts', cartsController)
    app.use('/api/products', productsController)
    app.use('/realtimeproducts', realtimeproductsController)

    app.get('/', async (req, res) => {

        // const productos = await tienda.getProducts()
        const productos = await Products.find()
        const products = productos.map(item=>item.toObject())
        console.log(products)
        res.render('home', { products, style: "css/style.css " })
    })
}

module.exports = router