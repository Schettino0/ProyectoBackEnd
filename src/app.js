const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const router = require('./router')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

module.exports = app 