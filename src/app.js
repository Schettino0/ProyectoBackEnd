const express = require('express')
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')


const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const port = 8080

app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)

app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})
