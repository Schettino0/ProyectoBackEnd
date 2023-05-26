const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'codersecret'

const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'})
    return token
}

module.exports = {
    generateToken,
}
