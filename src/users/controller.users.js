const { Router } = require('express')
const Users = require('../dao/models/users.model')
const passport = require('passport')

const router = Router()

router.post('/', passport.authenticate('register', { failureRedirect: '/users/failregister' }), async (req, res) => {
    try {
        res.status(201).json({ status: 'success', message: "Usuario registrado" })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 'error', error: 'Internal Server error' })

    }
})

router.get('/failregister', (req, res) => {
    res.json({ error: "fail login" })

})


module.exports = router