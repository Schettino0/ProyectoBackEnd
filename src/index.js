const express = require('express')
const ProductManager = require("./dao/ProductManager")
const tienda = new ProductManager('productos.json')
const app = require("./app");
const { Server } = require('socket.io');
const { port } = require('./config/app.config');
const dbConnect = require('../db');
const Products = require('./dao/models/products.model');
const Messages = require('./dao/models/messages.model');


const httpServer = app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
})

let messages = []


const io = new Server(httpServer)
io.on('connection', async socket => {
    const mensajes = await Messages.find()
    messages = mensajes
    console.log("Cliente Conectado");
    // const productos = await tienda.getProducts()
    const productos = await Products.find()
    socket.emit("productos", productos)

    socket.on('newUser', user => {
        socket.broadcast.emit('userConnected', user)
        socket.emit('messageLogs', messages)
    })
    
        socket.on('message', async data => {
        messages.push(data)
        const {user, message} = data
        await Messages.create(data)
        console.log(data)        
        io.emit('messageLogs', messages)
        })
    
})

dbConnect()