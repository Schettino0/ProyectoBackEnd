const { Router } = require('express')

const router = Router()

router.get('/',  (req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    }
    else{
        req.session.counter= 1  
        res.send('Bienvenido!')
    }
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.send('Logout OK!')
        else res.send({status: 'Logout Error',body: err})
    })
})

router.get('/login' , (req,res)=>{
    const {username , password} = req.query
    if(username !== 'admin' || password !== 'adminpass'){
        return res.send('Login Failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})

router.get('/register',(req,res)=>{
    res.render('signup', { style : "../../css/register.css"})
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.json({status: 'Logout ERROR', body: err})
        }
        res.send('Logout OK')
    })
})

function auth(req,res,next){
    if(req.session?.user == 'admin' && req.session?.admin){
        console.log("bien")
        return next()
    }
    return res.status(401).send('error de autorizacion.')
}

router.get('/privado', auth , (req,res)=>{
    res.send('Si estas viendo esto es porque ya te logeaste')
})

module.exports = router