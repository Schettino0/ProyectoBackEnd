const { Router } = require('express')
const Users = require('../dao/models/users.model')

const router = Router()

router.post('/', async (req,res)=>{
    try {
        const {first_name , last_name , password , email, age} = req.body
        const newUserInfo = {
            first_name,
            last_name,
            email,
            age,
            password
        }
        const users =await Users.create(newUserInfo)
        res.status(201).json({status: 'success' , message: users})
    }
    catch (error) {
        console.log(error.message)   
        res.status(500).json({status: 'error', error: 'Internal Server error'})

    }
})


module.exports = router