import * as express from 'express'
import pgPool from './database'

const app = express()
const port = 8000
const cors = require('cors')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const passport = require('passport')

app.use(
    cors({
        origin: 'http://localhost:3000', // Allow server to accept request from different origin
        credentials: true,
    })
)

const blog = require('./api/blog')
const items = require('./api/items')
const users = require('./api/users')

app.use(express.json())

// CREATES A SESSION WHEN THE USER GOES ON THE LOCALHOST:8000
app.use(
    session({
        secret: process.env.SECRET_KEY,
        store: new pgSession({
            pool: pgPool,
            tableName: 'session',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            secure: false, // should be true on production, requires https
        },
        resave: true,
        saveUninitialized: true,
        rolling: true, // resets the max age
    })
)

// Passport Init
require('./passport')

app.use(passport.initialize())
app.use(passport.session())

app.use((req: any, res: any, next: any) => {
    // if (req.user) {
    //     console.log(req.user)
    // } else {
    //     console.log('User is not logged in')
    // }
    next()
})

// Importing Routes
app.use('/api', blog)
app.use('/api', items)
app.use('/api', users)

// Starts server
app.listen(port, () => {
    console.log(`Running server on http://localhost:${port}`)
})
