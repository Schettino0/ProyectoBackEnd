const { Router } = require('express')
const privateAccess = require('../middlewares/privateAccess.middlewares')
const publicAccess = require('../middlewares/publicAccess.middlewares')
const Products = require('../dao/models/products.model')
const router = Router()

router.get('/signup', publicAccess, (req, res) => {
    res.render('signup', { style: "../../css/register.css" })

})

router.get('/login', publicAccess, (req, res) => {
    res.render('login', { style: "../../css/register.css" })
})

router.get('/', privateAccess, (req, res) => {
    const { user } = req.session
    res.redirect('/products')
})


router.get('/products', privateAccess, async (req, res) => {
    const { user } = req.session
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
        res.render('products', { products, style: "css/style.css ", opciones: opciones, totalPages, sort: req.query.sort, user })
    } catch (error) {
        res.send({ error: error })
        console.log(error)
    }
})


module.exports = router
