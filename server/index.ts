import * as express from 'express'
import pgPool from './database'

const app = express()
const port = 8000
const cors = require('cors')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

const blog = require('./api/blog')
const items = require('./api/items')
const users = require('./api/users')

app.use(express.json())

app.use('/api', blog)
app.use('/api', items)
app.use('/api', users)

app.use(
    session({
        secret: process.env.SECRET_KEY,
        store: new pgSession({
            pool: pgPool,
            tableName: 'session',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
        resave: false,
        saveUninitialized: true,
    })
)

app.get('/', (res: any, req: any) => {
    res.json('Session init')
})

app.listen(port, () => {
    console.log(`Running server on http://localhost:${port}`)
})
