const ProductManager = require("./ProductManager")
const tienda = new ProductManager('productos.json')
const express = require('express')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})
app.use(express.urlencoded({ extended: true }))
app.get('/products', async (req, resp) => {
    const { limit } = req.query
    if (limit) {
        const products = await tienda.getProducts()
        resp.send({ productos: products.slice(0, limit) })

    }
    else {
        const products = await tienda.getProducts()
        resp.send({ productos: products })
    }
})

app.get('/products/:pid', async (req, resp) => {
    const productoID = req.params.pid
    const productos = await tienda.getProducts()
    const busqueda = productos.find(p => p.id == productoID)
    if(busqueda){
        resp.send(busqueda)
    }
    else{
        resp.send({error:"ID not found"})
    }

})