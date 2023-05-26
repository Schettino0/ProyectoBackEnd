const bcrypt = require('bcrypt')

function createHash(password) {
    const salt = bcrypt.genSaltSync(10)
    const passEncrypted = bcrypt.hashSync(password, salt)
    return passEncrypted
}

const isValidPassword = (password, user) => {
    const response = bcrypt.compareSync(password, user.password)
    return response
}

module.exports =  {
    createHash,
    isValidPassword,
}