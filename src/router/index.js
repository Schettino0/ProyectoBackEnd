const cartsController = require('../carts/controller.carts')
const realtimeproductsController = require('../realtimeproducts/controller.realtimeproducts')
const productsController = require('../products/controller.products')
const chatController = require('../chat/controller.chat')
const usersController = require('../users/controller.users')
const viewsTemplateController = require('../viewsTemplate/controller.viewsTemplate')
const authController = require('../auth/controller.auth')

const router = app => {

    
    app.use('/',viewsTemplateController)
    app.use('/api/carts', cartsController)
    app.use('/api/products', productsController)
    // app.use('api/orders', orderController)
    
    app.use('/realtimeproducts', realtimeproductsController)
    app.use('/chat', chatController)

    // app.use('/api/sessions', sessionController )
    app.use('/users', usersController)
    app.use('/auth', authController)


}

module.exports = router

