const express = require('express')
const ProductManager = require("./dao/ProductManager")
const tienda = new ProductManager('productos.json')
const app = require("./app");
const { Server } = require('socket.io');
const { port } = require('./config/app.config');
const dbConnect = require('../db');


const httpServer = app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})


const io = new Server(httpServer)
io.on('connection', async socket => {
    console.log("Cliente Conectado");
    const productos = await tienda.getProducts()
    socket.emit("productos", productos)
})

dbConnect()