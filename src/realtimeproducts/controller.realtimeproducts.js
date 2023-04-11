const { Router } = require('express')
const ProductManager = require("../dao/ProductManager")
const tienda = new ProductManager('productos.json')
const Products = require("../dao/models/products.model")

const router = Router()

router.get('/', async (req,res)=>{
    // const productos = await tienda.getProducts()
    const productos = await Products.find()
    res.render('realTimeProducts',{productos, style:"css/realTime.css"})
})


module.exports = router