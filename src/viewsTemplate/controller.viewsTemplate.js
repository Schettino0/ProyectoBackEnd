const { Router } = require('express')
const privateAccess = require('../middlewares/privateAccess.middlewares')
const publicAccess = require('../middlewares/publicAccess.middlewares')

const router = Router()

router.get('/signup', publicAccess, (req, res) => {
    res.render('signup', { style: "../../css/register.css" })

})

router.get('/login', publicAccess, (req, res) => {
    res.render('login', { style: "../../css/register.css" })
})

router.get('/', privateAccess, (req, res) => {
    const { user } = req.session
    console.log(user)
    res.render('profile', { style: "../../css/profile.css", user })
})


module.exports = router
