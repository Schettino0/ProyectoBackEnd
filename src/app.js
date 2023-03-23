const ProductManager = require("./ProductManager")
const tienda = new ProductManager('productos.json')
const express = require('express')
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const handlebars = require('express-handlebars')
const viewsRouter = require('./routes/views.router')
const { Server } = require('socket.io')
const app = express()



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


const port = 8080


app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/realtimeproducts', viewsRouter)

app.get('/', async (req, res) => {
const productos =await tienda.getProducts()
    res.render('home', {productos,style: "css/style.css "})
})


const httpServer = app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})


const io = new Server(httpServer)
io.on('connection', async socket => {
    console.log("Cliente Conectado");
    const productos = await tienda.getProducts()
    socket.emit("productos", productos)
})

