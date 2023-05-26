const { Router } = require('express')
const Users = require('../dao/models/users.model')
const { isValidPassword } = require('../utils/cryptPassword.utils')
const passport = require('passport')

const router = Router()

router.post('/', passport.authenticate('login'),
    async (req, res) => {
        try {

            if (!req.user) {
                return res.status(401).json({ status: 'error', error: "Usuario y contraseña no coinciden" })
            }

            req.session.user = {
                rol: 'user',
                firts_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email
            }

            res.json({ status: 'success', message: 'Sesion iniciada' })
        }
        catch (error) {
            res.status(500).json({ status: 'error', error: 'El usuario no ha sido encontrado' })

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

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), 
async (req, res) => {

})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect : '/login' }), 
async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')

})

module.exports = router