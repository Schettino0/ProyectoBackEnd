const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const router = require('./router')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { dbAdmin, dbPassword ,dbHost } = require('../src/config/db.config')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use(cookieParser("CoderS3cR3tC0D3"))
app.use(session({
    store:MongoStore.create({
        mongoUrl: `mongodb+srv://${dbAdmin}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`,
        mongoOption: {useNewUrlParser:true, useUnifiedTopology:true},
        ttl:25,
    }),
    secret: 'secretcoder',
    resave:true,
    saveUninitialized:true
}))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

router(app)

module.exports = app 