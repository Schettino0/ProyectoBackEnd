const { Router } = require('express')
const ProductManager = require("../ProductManager")
const tienda = new ProductManager('productos.json')

const router = Router()

router.get('/', async (req,res)=>{
    const productos = await tienda.getProducts()
    res.render('realTimeProducts',{productos, style:"css/realTime.css"})
})


module.exports = router