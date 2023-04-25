const { Router } = require('express')
const Users = require('../dao/models/users.model')

const router = Router()

router.post('/', async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email: email })
        console.log(user)
        if (!user) return res.status(400).json({
            status: 'error',
            error: 'el usuario y la contraseña no coinciden.'
        })

        if (user.password !== password) return res.status(400).json({
            status: 'error',
            error: 'el usuario y la contraseña no coinciden.'
        })

        // if(email == 'adminCoder@coder.com' && password == 'adminCod3r123'){
        //     req.session.user = {
        //         rol: 'admin',
        //         firts_name: user.first_name,
        //         last_name: user.last_name,
        //         email: user.email
        //     }
        // }

        req.session.user = {
            rol: 'user',
            firts_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        res.json({ status: 'success', message: 'Sesion iniciada' })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 'error', error: 'Internal server error' })

    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.redirect('/')
    })
})

module.exports = router