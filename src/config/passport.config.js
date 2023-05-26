const passport = require("passport");
const local = require('passport-local');
const Users = require("../dao/models/users.model");
const { createHash, isValidPassword } = require("../utils/cryptPassword.utils");
const LocalStrategy = local.Strategy
const GitHubStrategy = require('passport-github2')



const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, password, email, age } = req.body
            const user = await Users.findOne({ email: username })
            if (user) {
                console.log("EL usuario ya existe")
                return done(null, false)
            }
            const newUserInfo = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            const users = await Users.create(newUserInfo)
            done(null, users)
        } catch (error) {
            done(error)
        }
    }))
    passport.use('login', new LocalStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await Users.findOne({ email: username })
                if (!user) {
                    return done(null, false)
                }
                if (!isValidPassword(password, user)) {
                    return done(null, null)
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }))

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.7ed053636a63679b",
        clientSecret: "dc7cca05ae74b1c308b4c5595532f8f7476be1e9",
        callbackURL: "http://localhost:8080/auth/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await Users.findOne({ email: profile._json.email })
            if (!user) {
                const newUserInfo = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile._json.email,
                    password: ""
                }
                const newUser = await Users.create(newUserInfo)
                return done(null, newUser)
            }
            done(null, user)
        } catch (error) {

        }
    }
    ));


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await Users.findById(id)
        done(null, user)
    })
}


module.exports = initializePassport
