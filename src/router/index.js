const cartsController = require('../carts/controller.carts')
const realtimeproductsController = require('../realtimeproducts/controller.realtimeproducts')
const productsController = require('../products/controller.products')
const chatController = require('../chat/controller.chat')
const ProductManager = require("../dao/ProductManager")
const Products = require('../dao/models/products.model')
const Carts = require('../dao/models/carts.model')
const tienda = new ProductManager('productos.json')

const router = app => {

    app.use('/api/carts', cartsController)
    app.use('/api/products', productsController)
    app.use('/realtimeproducts', realtimeproductsController)
    app.use('/chat', chatController)


    //Vista de /products 

    app.get('/products', async (req, res) => {
        const { limit = 10, page = 1, sort, query } = req.query
        const limitValue = Number(limit)
        const pageValue = Number(page)
        const opciones = {
            limit: limitValue,
            page: pageValue,
            sort: { price: sort },
            query: "",
        }
        try {
            const resultado = await Products.paginate({}, opciones)
            const totalPages = resultado.totalPages
            let products = resultado.docs
            products = products.map(item => item.toObject())
            res.render('products', { products, style: "css/style.css ", opciones: opciones, totalPages, sort: req.query.sort })
        } catch (error) {
            res.send({ error: error })
            console.log(error)
        }
    })

    //Visualiar carrito especifico  ej : 643dd6fcd0c0ab8b6a4d4701
    app.get('/carts/:cid', async (req, res) => {
        const { cid } = req.params
        console.log(cid)
        const carrito = await Carts.findOne({ _id: cid }).populate('products.product')
        
        res.json({carrito})
    })
}
//Vista de Carrito

module.exports = router

